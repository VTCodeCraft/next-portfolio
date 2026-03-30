import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
};

export default function ContactFormEmail({
  message,
  senderEmail,
}: ContactFormEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
          * { box-sizing: border-box; }
        `}</style>
      </Head>
      <Preview>✦ New contact message from your portfolio</Preview>
      <Tailwind>
        <Body
          style={{
            backgroundColor: "#f4f3f8",
            fontFamily: "'DM Sans', sans-serif",
            margin: 0,
            padding: 0,
          }}
        >
          <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 16px" }}>

            {/* Top brand bar */}
            <Section style={{ marginBottom: "0" }}>
              <Row>
                <Column style={{ textAlign: "center", paddingBottom: "28px" }}>
                  <Text
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase" as const,
                      color: "#7c3aed",
                      margin: "0 0 10px 0",
                    }}
                  >
                    ✦ Portfolio Notification
                  </Text>
                  <Hr
                    style={{
                      borderColor: "#ddd9ee",
                      borderTopWidth: "1px",
                      margin: "0",
                    }}
                  />
                </Column>
              </Row>
            </Section>

            {/* Main card */}
            <Section
              style={{
                background: "#ffffff",
                border: "1px solid #e4e0f4",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 4px 32px rgba(124, 58, 237, 0.07)",
              }}
            >
              {/* Card top accent line */}
              <div
                style={{
                  background: "linear-gradient(90deg, #7c3aed, #a78bfa, #7c3aed)",
                  height: "3px",
                  width: "100%",
                }}
              />

              {/* Header */}
              <Section style={{ padding: "40px 44px 0 44px" }}>
                <Text
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase" as const,
                    color: "#a09abf",
                    margin: "0 0 16px 0",
                  }}
                >
                  Incoming Message
                </Text>
                <Heading
                  style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: "32px",
                    fontWeight: "400",
                    color: "#1a1628",
                    lineHeight: "1.25",
                    margin: "0 0 8px 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  You've got a new <br />
                  <span style={{ color: "#7c3aed", fontStyle: "italic" }}>
                    message waiting.
                  </span>
                </Heading>
                <Text
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    color: "#8880a8",
                    margin: "12px 0 32px 0",
                    lineHeight: "1.6",
                    fontWeight: "300",
                  }}
                >
                  Someone reached out through your portfolio contact form.
                  Here's what they had to say.
                </Text>
              </Section>

              {/* Divider */}
              <Hr style={{ borderColor: "#eeeaf8", margin: "0 44px" }} />

              {/* Message content */}
              <Section style={{ padding: "32px 44px" }}>
                <Text
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    color: "#a09abf",
                    margin: "0 0 14px 0",
                  }}
                >
                  Their Message
                </Text>

                {/* Message bubble */}
                <Section
                  style={{
                    background: "#faf9ff",
                    border: "1px solid #e4e0f4",
                    borderLeft: "3px solid #7c3aed",
                    borderRadius: "12px",
                    padding: "24px 28px",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "15px",
                      color: "#3b3460",
                      lineHeight: "1.8",
                      margin: "0",
                      fontWeight: "300",
                    }}
                  >
                    {message}
                  </Text>
                </Section>
              </Section>

              {/* Divider */}
              <Hr style={{ borderColor: "#eeeaf8", margin: "0 44px" }} />

              {/* Sender info */}
              <Section style={{ padding: "28px 44px 40px 44px" }}>
                <Text
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    color: "#a09abf",
                    margin: "0 0 14px 0",
                  }}
                >
                  Reply To
                </Text>

                <Row>
                  <Column>
                    <Section
                      style={{
                        background: "linear-gradient(135deg, #f3f0ff 0%, #ede9fe 100%)",
                        border: "1px solid #ddd6fe",
                        borderRadius: "12px",
                        padding: "16px 24px",
                        display: "inline-block",
                      }}
                    >
                      <Row>
                        <Column style={{ width: "36px", verticalAlign: "middle" }}>
                          <div
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                              fontSize: "15px",
                              color: "#fff",
                              fontWeight: "600",
                              textAlign: "center" as const,
                              lineHeight: "36px",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            {senderEmail.charAt(0).toUpperCase()}
                          </div>
                        </Column>
                        <Column style={{ paddingLeft: "14px", verticalAlign: "middle" }}>
                          <Text
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#5b21b6",
                              margin: "0",
                              letterSpacing: "0.01em",
                            }}
                          >
                            {senderEmail}
                          </Text>
                          <Text
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "11px",
                              color: "#a09abf",
                              margin: "3px 0 0 0",
                              fontWeight: "300",
                            }}
                          >
                            Click to start a reply
                          </Text>
                        </Column>
                      </Row>
                    </Section>
                  </Column>
                </Row>
              </Section>

              {/* Bottom fade line */}
              <div
                style={{
                  background: "linear-gradient(90deg, transparent, #c4b5fd, transparent)",
                  height: "1px",
                  width: "100%",
                  opacity: 0.6,
                }}
              />
            </Section>

            {/* Footer */}
            <Section style={{ padding: "28px 0 0 0", textAlign: "center" }}>
              <Text
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  color: "#c4bedd",
                  margin: "0 0 6px 0",
                  letterSpacing: "0.08em",
                }}
              >
                Delivered from your portfolio contact form
              </Text>
              <Text
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  color: "#d8d3ed",
                  margin: "0",
                  letterSpacing: "0.1em",
                }}
              >
                ✦ ✦ ✦
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}