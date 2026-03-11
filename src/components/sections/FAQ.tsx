"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

const FAQS = [
  {
    q: "Do you offer a free trial?",
    a: "Yes. Message us on WhatsApp to book a trial slot. We’ll also suggest a simple starter routine for your goal.",
  },
  {
    q: "I’m a beginner. Will someone guide me?",
    a: "Yes. We help you with setup, basic form cues, and a plan you can follow without confusion.",
  },
  {
    q: "What time is best to avoid crowds?",
    a: "Usually late morning and after 8:30 PM are calmer. Peak time is early morning and early evening.",
  },
  {
    q: "Do you have strength + cardio equipment?",
    a: "Yes. Strength area + cardio machines. If something is busy, we’ll suggest alternatives on the spot.",
  },
  {
    q: "Can you help with fat loss or muscle gain plans?",
    a: "Yes. Tell us your goal, schedule, and any injuries. We’ll recommend a plan you can stick to.",
  },
  {
    q: "Is there a monthly plan or long-term membership?",
    a: "Both. You can start monthly and switch later based on your routine and results.",
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={["h-5 w-5 transition", open ? "rotate-180 text-blue-600" : "text-black/50"].join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section id="faq" className="bg-black/[0.02] py-16">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Quick answers, no confusion"
          subtitle="If you still have questions, WhatsApp is the fastest."
        />

        <Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_420px]">
            {/* left: accordion */}
            <div className="space-y-3">
              {FAQS.map((f, i) => {
                const open = i === openIdx;
                return (
                  <div key={f.q} className="rounded-3xl border border-black/10 bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenIdx((prev) => (prev === i ? -1 : i))}
                      className="flex w-full items-center justify-between gap-3 rounded-3xl p-5 text-left
                                 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      aria-expanded={open}
                    >
                      <p className="text-sm font-semibold text-black">{f.q}</p>
                      <Chevron open={open} />
                    </button>

                    <div
                      className={[
                        "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                        open ? "[grid-template-rows:1fr] opacity-100" : "[grid-template-rows:0fr] opacity-0",
                      ].join(" ")}
                    >
                      <div className="min-h-0 overflow-hidden px-5 pb-5">
                        <p className="text-sm leading-6 text-black/70">{f.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* right: helper card */}
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <p className="text-sm font-semibold text-black">Still not sure where to start?</p>
              <p className="mt-2 text-sm text-black/70">
                Tell us your goal and preferred time. We’ll suggest a simple Week 1 plan and the best slot.
              </p>

              <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                <p className="text-xs font-semibold text-black/70">Good starter approach</p>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                  <li>• 3 days/week at the same time</li>
                  <li>• Focus on form for 7 days</li>
                  <li>• Track reps and add slowly</li>
                </ul>
              </div>

              <p className="mt-4 text-xs text-black/55">
                We keep it simple on purpose. That’s how people stay consistent.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}