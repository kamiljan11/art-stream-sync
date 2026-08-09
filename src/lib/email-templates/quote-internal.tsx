import * as React from "react";
import { TYPE_META } from "./quote-meta";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const ADMIN_URL = "https://art-stream-sync.lovable.app/admin";

interface Props {
  type?: "new" | "audit" | "brief" | "sample" | string;
  name?: string;
  email?: string;
  phone?: string;
  productType?: string;
  quantity?: string;
  projectDetails?: string;
  designLink?: string;
  needsDesigner?: boolean;
  currentCost?: string;
  submissionId?: string;
  calculator?: {
    result?: {
      totalISK?: number;
      totalPLN?: number;
      totalEUR?: number;
      productsPLN?: number;
      commissionPLN?: number;
      shippingPLN?: number;
      dhlOversizeFeePLN?: number;
      weightKg?: number;
      dhlFuelSurcharge?: number;
    };
    notes?: { dhlFuelSurcharge?: string; [key: string]: unknown };
    [key: string]: unknown;
  };
  attachments?: Array<{ name: string; url: string; size?: number; type?: string }>;
}

export const QuoteInternalEmail = (p: Props) => {
  const meta = TYPE_META[p.type || "new"] || TYPE_META.new;
  const rows: Array<[string, string | undefined]> = [
    ["Name / Company", p.name],
    ["Email", p.email],
    ["Phone", p.phone],
    ["Product type", p.productType],
    ["Quantity", p.quantity],
    ["Current cost", p.currentCost],
    ["Design link", p.designLink],
    ["Needs designer", p.needsDesigner ? "Yes" : undefined],
    ["Submission ID", p.submissionId],
  ].filter(([, v]) => v && String(v).trim().length > 0) as Array<[string, string]>;
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        New {meta.label} from {p.name || "website"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {meta.emoji} New {meta.label}
          </Heading>
          <Section style={card}>
            {rows.map(([label, value]) => (
              <Row key={label} label={label} value={value} />
            ))}
          </Section>
          {p.projectDetails ? (
            <>
              <Heading style={h2}>Project details</Heading>
              <Section style={messageBox}>
                <Text style={messageText}>{p.projectDetails}</Text>
              </Section>
            </>
          ) : null}
          {p.attachments && p.attachments.length > 0 ? (
            <>
              <Heading style={h2}>📎 Attached files</Heading>
              <Section style={messageBox}>
                {p.attachments.map((a, i) => (
                  <Text key={i} style={rowText}>
                    <Link href={a.url} style={fileLink}>
                      {a.name}
                    </Link>
                    {a.size ? (
                      <span style={fileMeta}> ({Math.round(a.size / 1024)} KB)</span>
                    ) : null}
                  </Text>
                ))}
              </Section>
            </>
          ) : null}
          {p.calculator?.result ? (
            <>
              <Heading style={h2}>🧮 AI Calculator estimate</Heading>
              <Section style={estimateBox}>
                <Text style={estimateBig}>
                  {Number(p.calculator.result.totalISK || 0).toLocaleString()} ISK
                </Text>
                <Text style={estimateSub}>
                  ≈ {Number(p.calculator.result.totalPLN || 0).toLocaleString()} PLN ·{" "}
                  {Number(p.calculator.result.totalEUR || 0).toFixed(2)} EUR
                </Text>
                <Text style={rowText}>
                  <span style={rowLabel}>Products: </span>
                  {Number(p.calculator.result.productsPLN || 0).toLocaleString()} PLN
                  {p.calculator.result.commissionPLN
                    ? ` (incl. commission ${Number(p.calculator.result.commissionPLN).toLocaleString()} PLN)`
                    : ""}
                </Text>
                <Text style={rowText}>
                  <span style={rowLabel}>
                    Shipping ({String(p.calculator.shipping || "").toUpperCase()}):{" "}
                  </span>
                  {Number(p.calculator.result.shippingPLN || 0).toLocaleString()} PLN
                  {p.calculator.result.dhlOversizeFeePLN
                    ? ` (+ ${Number(p.calculator.result.dhlOversizeFeePLN).toLocaleString()} PLN oversize)`
                    : ""}
                </Text>
                <Text style={rowText}>
                  <span style={rowLabel}>Weight: </span>
                  {p.calculator.result.weightKg} kg
                </Text>
                {p.calculator.notes?.dhlFuelSurcharge ? (
                  <Text style={noteText}>{p.calculator.notes.dhlFuelSurcharge}</Text>
                ) : null}
                <Text style={noteText}>
                  Auto-generated from public calculator. Verify before sending the final ISK quote.
                </Text>
              </Section>
            </>
          ) : null}
          <Section style={{ textAlign: "center", margin: "28px 0 8px" }}>
            <Button href={ADMIN_URL} style={btn}>
              Open admin panel →
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

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
const estimateBox = {
  backgroundColor: "#fff8e1",
  border: "2px solid #ffab00",
  borderRadius: "10px",
  padding: "16px 20px",
};
const estimateBig = {
  fontSize: "28px",
  fontWeight: 800 as const,
  color: "#7a5000",
  margin: "0 0 4px",
};
const estimateSub = { fontSize: "13px", color: "#7a5000", margin: "0 0 12px" };
const noteText = {
  fontSize: "12px",
  color: "#7a5000",
  fontStyle: "italic" as const,
  margin: "8px 0 0",
};
const fileLink = { color: "#00AEEF", fontWeight: 700 as const, textDecoration: "underline" };
const fileMeta = { color: "#888", fontSize: "12px" };
