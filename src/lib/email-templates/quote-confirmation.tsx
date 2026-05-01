import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  type?: 'new' | 'audit'
}

const QuoteConfirmationEmail = ({ name, type }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We got your quote request — fixed ISK quote within 24 hours</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={brand}>MAS PRINTS</Heading>
        <Hr style={accent} />
        <Heading style={h1}>{name ? `Takk, ${name}!` : 'Takk for your request!'}</Heading>
        <Text style={text}>
          We've received your {type === 'audit' ? 'price match audit' : 'project'} request.
          Our Icelandic brokerage team is reviewing it now.
        </Text>
        <Section style={card}>
          <Text style={cardTitle}>What happens next</Text>
          <Text style={cardText}>
            ✓ Fixed ISK quote within 24 hours<br />
            ✓ No contract, no commitment<br />
            ✓ We handle production, customs &amp; delivery
          </Text>
        </Section>
        <Text style={text}>
          If anything's urgent, reply to this email or call <strong>+354 779 0000</strong>.
        </Text>
        <Text style={footer}>
          Mountain All Service ehf. · Kennitala 690725-0450<br />
          Njarðarbraut 3i, 260 Njarðvík, Ísland
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: QuoteConfirmationEmail,
  subject: 'We got your quote request — MAS Prints',
  displayName: 'Quote request confirmation',
  previewData: { name: 'Jane', type: 'new' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', margin: 0, padding: 0 }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const brand = { fontSize: '14px', fontWeight: 800 as const, letterSpacing: '0.15em', color: '#000', margin: '0 0 12px' }
const accent = { borderColor: '#EC008C', borderWidth: '2px', borderStyle: 'solid', margin: '0 0 24px', width: '40px' }
const h1 = { fontSize: '24px', fontWeight: 800 as const, color: '#111', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#444', lineHeight: 1.6, margin: '0 0 20px' }
const card = { backgroundColor: '#f7f7f7', borderRadius: '12px', padding: '20px 22px', margin: '0 0 24px' }
const cardTitle = { fontSize: '12px', fontWeight: 800 as const, letterSpacing: '0.1em', color: '#00AEEF', margin: '0 0 10px', textTransform: 'uppercase' as const }
const cardText = { fontSize: '14px', color: '#222', lineHeight: 1.8, margin: 0 }
const footer = { fontSize: '12px', color: '#888', lineHeight: 1.6, margin: '32px 0 0' }