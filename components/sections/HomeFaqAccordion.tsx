"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface HomeFaqAccordionProps {
  faqs: FAQItem[];
}

export default function HomeFaqAccordion({ faqs }: HomeFaqAccordionProps) {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  return (
    <div style={{ maxWidth: 760, margin: "48px auto 0", display: "flex", flexDirection: "column", gap: 16 }}>
      {faqs.map((faq) => {
        const isOpen = activeFaqId === faq.id;
        return (
          <Reveal key={faq.id}>
            <div
              style={{
                background: "var(--surface)",
                border: `1px solid ${isOpen ? "var(--blue)" : "var(--border-soft)"}`,
                borderRadius: 12,
                overflow: "hidden",
                transition: "border-color 0.25s ease",
              }}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  background: "none",
                  border: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "left",
                  cursor: "pointer",
                  color: "var(--text)",
                }}
                aria-expanded={isOpen}
              >
                <span className="font-display" style={{ fontSize: 16, fontWeight: 600 }}>
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                    color: isOpen ? "var(--blue)" : "var(--muted)",
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                />
              </button>
              {isOpen && (
                <div
                  style={{
                    padding: "0 24px 20px 24px",
                    color: "var(--muted)",
                    fontSize: 14.5,
                    lineHeight: 1.65,
                    borderTop: "1px solid var(--border-soft)",
                    paddingTop: 16,
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
