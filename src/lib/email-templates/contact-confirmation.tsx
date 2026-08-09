import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

const SITE_NAME = "MAS Prints";

interface Props {
  name?: string;
}

export const ContactConfirmationEmail = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We got your message — {SITE_NAME} will be in touch soon</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={brand}>MAS PRINTS</Heading>
        <Hr style={accent} />
        <Heading style={h1}>{name ? `Thanks, ${name}!` : "Thanks for reaching out!"}</Heading>
        <Text style={text}>
          We've received your message and our Icelandic brokerage team will get back to you shortly
          with a quote or next steps.
        </Text>
        <Section style={card}>
          <Text style={cardTitle}>What happens next</Text>
          <Text style={cardText}>
            • We review your request
            <br />• You'll get an ISK quote within 24 hours
          </Text>
        </Section>
        <Text style={footer}>
          Mountain All Service ehf. · Kennitala 690725-0450
          <br />
          Njarðarbraut 3i, 260 Njarðvík, Ísland
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Inter, Arial, sans-serif",
  margin: 0,
  padding: 0,
};
const container = { padding: "32px 28px", maxWidth: "560px", margin: "0 auto" };
const brand = {
  fontSize: "14px",
  fontWeight: 800 as const,
  letterSpacing: "0.15em",
  color: "#000",
  margin: "0 0 12px",
};
const accent = {
  borderColor: "#00AEEF",
  borderWidth: "2px",
  borderStyle: "solid",
  margin: "0 0 24px",
  width: "40px",
};
const h1 = { fontSize: "24px", fontWeight: 800 as const, color: "#111", margin: "0 0 16px" };
const text = { fontSize: "15px", color: "#444", lineHeight: 1.6, margin: "0 0 20px" };
const card = {
  backgroundColor: "#f7f7f7",
  borderRadius: "12px",
  padding: "20px 22px",
  margin: "0 0 24px",
};
const cardTitle = {
  fontSize: "12px",
  fontWeight: 800 as const,
  letterSpacing: "0.1em",
  color: "#EC008C",
  margin: "0 0 10px",
  textTransform: "uppercase" as const,
};
const cardText = { fontSize: "14px", color: "#222", lineHeight: 1.8, margin: 0 };
const footer = { fontSize: "12px", color: "#888", lineHeight: 1.6, margin: "32px 0 0" };
