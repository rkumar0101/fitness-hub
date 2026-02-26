"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";
import { useState } from "react";

const FAQS = [
  { q: "Do you offer a free trial?", a: "Yes. WhatsApp us and we’ll schedule it based on your preferred time." },
  { q: "Beginner friendly hai?", a: "Yes. We guide basic form and a simple routine you can follow." },
  { q: "Personal training available?", a: "Yes. Goal-based trainer support available." },
  { q: "Day 1 me kya lana hai?", a: "Water bottle, towel, and comfortable shoes. Any injury history ho to bata dena." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Quick answers before you join"
          subtitle="Still unsure? WhatsApp us, we’ll reply fast."
        />

        <Reveal>
          <div className="mt-10 space-y-3">
            {FAQS.map((f, idx) => {
              const isOpen = open === idx;
              return (
                <div key={f.q} className="rounded-3xl border border-black/10 bg-white p-5">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() => setOpen(isOpen ? null : idx)}
                  >
                    <span className="text-sm font-bold">{f.q}</span>
                    <span className="text-sm font-bold text-black/50">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen ? (
                    <p className="mt-3 text-sm leading-6 text-black/70">{f.a}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}