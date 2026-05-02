// Server-only helper to render a React Email template and enqueue it
// directly into the transactional_emails pgmq queue using the service role.
// Bypasses the JWT-protected /lovable/email/transactional/send route so
// public form submissions can trigger emails without an authenticated user.

import * as React from 'react'
import { render } from '@react-email/components'
import { TEMPLATES } from '@/lib/email-templates/registry'
import { supabaseAdmin } from '@/integrations/supabase/client.server'

const SITE_NAME = 'MAS Prints'
const SENDER_DOMAIN = 'notify.prints.masgroup.is'
const FROM_DOMAIN = 'prints.masgroup.is'
const FROM_LOCAL = 'hello'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export interface EnqueueArgs {
  templateName: string
  to: string
  templateData?: Record<string, any>
  idempotencyKey?: string
  /** When true, skip suppression + unsubscribe token (use for internal/team notifications). */
  internal?: boolean
}

export async function enqueueTemplateEmail(args: EnqueueArgs): Promise<{ ok: boolean; error?: string }> {
  const { templateName, to, templateData = {}, internal } = args
  const template = TEMPLATES[templateName]
  if (!template) return { ok: false, error: `Template '${templateName}' not found` }

  const recipient = (template.to || to).trim().toLowerCase()
  if (!recipient) return { ok: false, error: 'Recipient required' }

  const messageId = crypto.randomUUID()
  const idempotencyKey = args.idempotencyKey || messageId
  const supabase = supabaseAdmin

  // Suppression check (skip for internal team notifications)
  if (!internal) {
    const { data: suppressed } = await supabase
      .from('suppressed_emails')
      .select('email')
      .eq('email', recipient)
      .maybeSingle()
    if (suppressed) {
      return { ok: false, error: 'Email suppressed' }
    }
  }

  // Get or create unsubscribe token (skip for internal)
  let unsubscribeToken: string | null = null
  if (!internal) {
    const { data: existing } = await supabase
      .from('email_unsubscribe_tokens')
      .select('token, used_at')
      .eq('email', recipient)
      .maybeSingle()
    if (existing && !existing.used_at) {
      unsubscribeToken = existing.token
    } else if (!existing) {
      const newToken = generateToken()
      const { data: created } = await supabase
        .from('email_unsubscribe_tokens')
        .insert({ email: recipient, token: newToken } as any)
        .select('token')
        .single()
      unsubscribeToken = created?.token ?? newToken
    }
  }

  // Render template
  let html: string
  let plainText: string
  try {
    const element = React.createElement(template.component, templateData)
    html = await render(element)
    plainText = await render(element, { plainText: true })
  } catch (err) {
    console.error('[enqueueTemplateEmail] render failed', { templateName, err })
    return { ok: false, error: 'Render failed' }
  }

  const resolvedSubject =
    typeof template.subject === 'function' ? template.subject(templateData) : template.subject

  // Log pending
  await supabase.from('email_send_log').insert({
    message_id: messageId,
    template_name: templateName,
    recipient_email: recipient,
    status: 'pending',
  } as any)

  const { error: enqueueError } = await supabase.rpc('enqueue_email' as any, {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to: recipient,
      from: `${SITE_NAME} <${FROM_LOCAL}@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject: resolvedSubject,
      html,
      text: plainText,
      purpose: 'transactional',
      label: templateName,
      idempotency_key: idempotencyKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  } as any)

  if (enqueueError) {
    console.error('[enqueueTemplateEmail] enqueue failed', { templateName, enqueueError })
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: recipient,
      status: 'failed',
      error_message: 'Failed to enqueue email',
    } as any)
    return { ok: false, error: 'Enqueue failed' }
  }

  return { ok: true }
}