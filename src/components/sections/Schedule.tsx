"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

const SLOTS = {
  morning: [
    { time: "6:00 AM", label: "General training" },
    { time: "7:30 AM", label: "Strength focus" },
    { time: "9:00 AM", label: "Cardio + core" },
  ],
  evening: [
    { time: "5:30 PM", label: "General training" },
    { time: "7:00 PM", label: "Fat loss focus" },
    { time: "8:30 PM", label: "Strength focus" },
  ],
};

export default function Schedule() {
  const [tab, setTab] = useState<"morning" | "evening">("morning");

  return (
    <section id="schedule" className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Schedule"
          title="Pick a time you can stick to"
          subtitle="Morning or evening, we’ll help you stay consistent."
        />

        <Reveal>
          <div className="mt-8 inline-flex rounded-2xl border border-black/10 bg-white p-1">
            <button
              onClick={() => setTab("morning")}
              className={[
                "rounded-xl px-4 py-2 text-sm font-semibold",
                tab === "morning" ? "bg-blue-500/10 text-black" : "text-black/60",
              ].join(" ")}
              type="button"
            >
              Morning
            </button>
            <button
              onClick={() => setTab("evening")}
              className={[
                "rounded-xl px-4 py-2 text-sm font-semibold",
                tab === "evening" ? "bg-blue-500/10 text-black" : "text-black/60",
              ].join(" ")}
              type="button"
            >
              Evening
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {SLOTS[tab].map((s) => (
              <div key={s.time} className="rounded-3xl border border-black/10 bg-white p-6">
                <p className="text-sm font-bold">{s.time}</p>
                <p className="mt-2 text-sm text-black/70">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}