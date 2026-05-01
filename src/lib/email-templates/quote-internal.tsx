import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  type?: string
  name?: string
  email?: string
  phone?: string
  productType?: string
  quantity?: string
  projectDetails?: string
  designLink?: string
  needsDesigner?: boolean
  currentCost?: string
}

const QuoteInternalEmail = (p: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New {p.type === 'audit' ? 'audit' : 'quote'} request from {p.name || 'website'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          🎯 New {p.type === 'audit' ? 'price match audit' : 'quote'} request
        </Heading>
        <Section style={card}>
          <Row label="Name / Company" value={p.name} />
          <Row label="Email" value={p.email} />
          <Row label="Phone" value={p.phone} />
          <Row label="Product type" value={p.productType} />
          <Row label="Quantity" value={p.quantity} />
          <Row label="Current cost" value={p.currentCost} />
          <Row label="Design link" value={p.designLink} />
          <Row label="Needs designer" value={p.needsDesigner ? 'Yes' : 'No'} />
        </Section>
        {p.projectDetails ? (
          <>
            <Heading style={h2}>Project details</Heading>
            <Section style={messageBox}>
              <Text style={messageText}>{p.projectDetails}</Text>
            </Section>
          </>
        ) : null}
      </Container>
    </Body>
  </Html>
)

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <Text style={rowText}>
      <span style={rowLabel}>{label}: </span>
      <span>{value || '—'}</span>
    </Text>
  )
}

export const template = {
  component: QuoteInternalEmail,
  subject: (data: Record<string, any>) => `New ${data?.type === 'audit' ? 'audit' : 'quote'} request from ${data?.name || 'website'}`,
  displayName: 'Quote request — internal notification',
  previewData: { type: 'new', name: 'Acme ehf.', email: 'jane@acme.is', phone: '+354 555 1212', productType: 'Hoodies', quantity: '200', projectDetails: 'Logo on chest, full back print', needsDesigner: false },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', margin: 0, padding: 0 }
const container = { padding: '28px', maxWidth: '600px', margin: '0 auto' }
const h1 = { fontSize: '20px', fontWeight: 800 as const, color: '#111', margin: '0 0 20px' }
const h2 = { fontSize: '14px', fontWeight: 800 as const, color: '#111', margin: '20px 0 8px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }
const card = { backgroundColor: '#f7f7f7', borderRadius: '10px', padding: '16px 20px' }
const rowText = { fontSize: '14px', color: '#222', margin: '6px 0', lineHeight: 1.5 }
const rowLabel = { color: '#666', fontWeight: 700 as const }
const messageBox = { backgroundColor: '#fafafa', border: '1px solid #eee', borderRadius: '10px', padding: '16px 20px' }
const messageText = { fontSize: '14px', color: '#222', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' as const }