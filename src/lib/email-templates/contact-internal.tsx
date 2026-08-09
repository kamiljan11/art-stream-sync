import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const ADMIN_URL = "https://art-stream-sync.lovable.app/admin";

interface Props {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  needsDesigner?: boolean;
  submissionId?: string;
}

export const ContactInternalEmail = ({
  name,
  email,
  phone,
  message,
  needsDesigner,
  submissionId,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact form submission from {name || "a visitor"}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>📨 New contact request</Heading>
        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="Email" value={email} />
          <Row label="Phone" value={phone} />
          <Row label="Needs designer" value={needsDesigner ? "Yes" : "No"} />
          {submissionId ? <Row label="Submission ID" value={submissionId} /> : null}
        </Section>
        <Heading style={h2}>Message</Heading>
        <Section style={messageBox}>
          <Text style={messageText}>{message || "(no message)"}</Text>
        </Section>
        <Section style={{ textAlign: "center", margin: "28px 0 8px" }}>
          <Button href={ADMIN_URL} style={btn}>
            Open admin panel →
          </Button>
        </Section>
      </Container>
    </Body>
  </Html>
);

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <Text style={rowText}>
      <span style={rowLabel}>{label}: </span>
      <span>{value || "—"}</span>
    </Text>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Inter, Arial, sans-serif",
  margin: 0,
  padding: 0,
};
const container = { padding: "28px", maxWidth: "600px", margin: "0 auto" };
const h1 = { fontSize: "20px", fontWeight: 800 as const, color: "#111", margin: "0 0 20px" };
const h2 = {
  fontSize: "14px",
  fontWeight: 800 as const,
  color: "#111",
  margin: "20px 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};
const card = { backgroundColor: "#f7f7f7", borderRadius: "10px", padding: "16px 20px" };
const rowText = { fontSize: "14px", color: "#222", margin: "6px 0", lineHeight: 1.5 };
const rowLabel = { color: "#666", fontWeight: 700 as const };
const messageBox = {
  backgroundColor: "#fafafa",
  border: "1px solid #eee",
  borderRadius: "10px",
  padding: "16px 20px",
};
const messageText = {
  fontSize: "14px",
  color: "#222",
  lineHeight: 1.6,
  margin: 0,
  whiteSpace: "pre-wrap" as const,
};
const btn = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "12px 22px",
  borderRadius: "8px",
  fontWeight: 800 as const,
  fontSize: "14px",
  textDecoration: "none",
  display: "inline-block",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};
