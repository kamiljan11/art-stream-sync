import type { ComponentType } from 'react'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

import { template as quoteConfirmation } from './quote-confirmation'
import { template as quoteInternal } from './quote-internal'
import { template as contactConfirmation } from './contact-confirmation'
import { template as contactInternal } from './contact-internal'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'quote-confirmation': quoteConfirmation,
  'quote-internal': quoteInternal,
  'contact-confirmation': contactConfirmation,
  'contact-internal': contactInternal,
}
