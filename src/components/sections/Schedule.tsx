"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

type Goal = "Strength" | "Fat loss" | "Cardio" | "Beginner";
type Crowd = "Quiet" | "Normal" | "Peak";

type Slot = {
  id: string;
  time: string;
  label: string;
  bestFor: Goal[];
  crowd: Crowd;
  note?: string;
};

const OPEN_HOURS = { value: "6:00 AM – 10:00 PM", hint: "Mon–Sat" };

const SLOTS: Record<"morning" | "evening", Slot[]> = {
  morning: [
    {
      id: "m-600",
      time: "6:00 AM",
      label: "General training",
      bestFor: ["Beginner", "Strength"],
      crowd: "Normal",
      note: "Good time to start if you’re building consistency.",
    },
    {
      id: "m-730",
      time: "7:30 AM",
      label: "Strength focus",
      bestFor: ["Strength"],
      crowd: "Peak",
      note: "Racks get busy. If you’re serious about lifting, come prepared.",
    },
    {
      id: "m-900",
      time: "9:00 AM",
      label: "Cardio + core",
      bestFor: ["Cardio", "Fat loss"],
      crowd: "Quiet",
      note: "Less crowded. Great for steady cardio and focused core work.",
    },
  ],
  evening: [
    {
      id: "e-530",
      time: "5:30 PM",
      label: "General training",
      bestFor: ["Beginner", "Fat loss"],
      crowd: "Peak",
      note: "Busy hours. Good energy, but plan your exercises in advance.",
    },
    {
      id: "e-700",
      time: "7:00 PM",
      label: "Fat loss focus",
      bestFor: ["Fat loss", "Cardio"],
      crowd: "Peak",
      note: "Best for conditioning. Expect queues for cardio machines.",
    },
    {
      id: "e-830",
      time: "8:30 PM",
      label: "Strength focus",
      bestFor: ["Strength"],
      crowd: "Normal",
      note: "Still active, but easier to get equipment than earlier evening.",
    },
  ],
};

function Icon({ name }: { name: "clock" | "target" | "crowd" }) {
  const cls = "h-5 w-5";
  if (name === "clock") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  }
  if (name === "target") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 20a8 8 0 1 0-8-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 12l7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 5h3v3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 12a3 3 0 1 0-3-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  // crowd
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none">
      <path
        d="M16 21v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M22 21v-1a3.5 3.5 0 0 0-2.2-3.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 4.2a4 4 0 0 1 0 7.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function crowdBadge(crowd: Crowd) {
  if (crowd === "Quiet") return "bg-blue-600/10 text-blue-700 ring-blue-600/15";
  if (crowd === "Peak") return "bg-red-500/10 text-red-700 ring-red-500/15";
  return "bg-black/[0.04] text-black/70 ring-black/10";
}

function goalChip(goal: Goal, active: boolean) {
  const base =
    "rounded-full px-3 py-1 text-xs font-semibold ring-1 transition";
  if (active) return `${base} bg-blue-600/10 text-blue-700 ring-blue-600/20`;
  return `${base} bg-white text-black/70 ring-black/10 hover:bg-black/[0.02]`;
}

export default function Schedule() {
  const [tab, setTab] = useState<"morning" | "evening">("morning");
  const [goal, setGoal] = useState<Goal>("Beginner");
  const [lockedId, setLockedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const slots = SLOTS[tab];

  const recommendedId = useMemo(() => {
    // pick a "best" slot for the selected goal, prefer Quiet/Normal over Peak
    const priority = (c: Crowd) => (c === "Quiet" ? 0 : c === "Normal" ? 1 : 2);

    const matching = slots
      .filter((s) => s.bestFor.includes(goal))
      .sort((a, b) => priority(a.crowd) - priority(b.crowd));

    return (matching[0] ?? slots[0])?.id ?? null;
  }, [goal, slots]);

  const activeId = lockedId ?? hoverId ?? recommendedId ?? slots[0]?.id;
  const active = slots.find((s) => s.id === activeId) ?? slots[0];

  return (
    <section id="schedule" className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Schedule"
          title="Pick a time you can stick to"
          subtitle="Choose your goal. We’ll show you the best slot to start."
        />

        <Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
            {/* LEFT: choices */}
            <div className="rounded-3xl border border-black/10 bg-white p-5">
              {/* Open hours strip */}
              <div className="flex items-start justify-between gap-4 rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
                    <Icon name="clock" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-black/70">Open hours</p>
                    <p className="text-sm font-bold">{OPEN_HOURS.value}</p>
                    <p className="text-xs text-black/60">{OPEN_HOURS.hint}</p>
                  </div>
                </div>
              </div>

              {/* Morning / Evening toggle */}
              <div className="mt-4 inline-flex w-full rounded-2xl border border-black/10 bg-white p-1">
                <button
                  type="button"
                  onClick={() => {
                    setTab("morning");
                    setLockedId(null);
                    setHoverId(null);
                  }}
                  className={[
                    "flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition",
                    tab === "morning" ? "bg-blue-500/10 text-black" : "text-black/60 hover:bg-black/[0.02]",
                  ].join(" ")}
                >
                  Morning
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab("evening");
                    setLockedId(null);
                    setHoverId(null);
                  }}
                  className={[
                    "flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition",
                    tab === "evening" ? "bg-blue-500/10 text-black" : "text-black/60 hover:bg-black/[0.02]",
                  ].join(" ")}
                >
                  Evening
                </button>
              </div>

              {/* Goal chips */}
              <div className="mt-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-black/[0.04] text-black/70">
                    <Icon name="target" />
                  </span>
                  <span>What’s your focus?</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(["Beginner", "Strength", "Fat loss", "Cardio"] as Goal[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        setGoal(g);
                        setLockedId(null); // let recommendation update cleanly
                      }}
                      className={goalChip(g, goal === g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Crowd legend */}
              <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-black/[0.04] text-black/70">
                    <Icon name="crowd" />
                  </span>
                  <span>Crowd levels</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs ring-1 ${crowdBadge("Quiet")}`}>
                    Quiet
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs ring-1 ${crowdBadge("Normal")}`}>
                    Normal
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs ring-1 ${crowdBadge("Peak")}`}>
                    Peak
                  </span>
                </div>

                <p className="mt-3 text-xs text-black/55">
                  Tip: If you’re new, start with <span className="font-semibold">Quiet/Normal</span> slots.
                </p>
              </div>
            </div>

            {/* RIGHT: results + preview */}
            <div className="rounded-3xl border border-black/10 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">
                  Recommended slot for: <span className="text-blue-700">{goal}</span>
                </p>

                {lockedId ? (
                  <button
                    type="button"
                    onClick={() => setLockedId(null)}
                    className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-semibold text-black/70 hover:bg-black/[0.06]"
                  >
                    Clear selection
                  </button>
                ) : (
                  <span className="rounded-full bg-black/[0.02] px-3 py-1 text-xs font-semibold text-black/60 ring-1 ring-black/10">
                    Hover to preview • Click to lock
                  </span>
                )}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
                {/* Slot list */}
                <div className="space-y-3">
                  {slots.map((s) => {
                    const isActive = s.id === activeId;
                    const isRecommended = s.id === recommendedId;

                    return (
                      <button
                        key={s.id}
                        type="button"
                        onMouseEnter={() => setHoverId(s.id)}
                        onMouseLeave={() => setHoverId(null)}
                        onClick={() => setLockedId((prev) => (prev === s.id ? null : s.id))}
                        className={[
                          "w-full rounded-2xl border p-4 text-left transition",
                          "hover:-translate-y-0.5 hover:shadow-sm",
                          isActive ? "border-blue-500/30 bg-blue-500/5" : "border-black/10 bg-white",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold">{s.time}</p>
                            <p className="mt-1 text-sm text-black/70">{s.label}</p>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <span className={`rounded-full px-3 py-1 text-xs ring-1 ${crowdBadge(s.crowd)}`}>
                              {s.crowd}
                            </span>

                            {isRecommended && (
                              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                                Recommended
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {s.bestFor.map((g) => (
                            <span
                              key={g}
                              className={[
                                "rounded-full px-3 py-1 text-xs ring-1",
                                g === goal
                                  ? "bg-blue-600/10 text-blue-700 ring-blue-600/20"
                                  : "bg-black/[0.04] text-black/65 ring-black/10",
                              ].join(" ")}
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Preview panel (desktop) */}
                <div className="hidden lg:block">
                  <div className="sticky top-24 rounded-2xl border border-black/10 bg-black/[0.02] p-5">
                    <p className="text-xs font-semibold text-black/60">Slot preview</p>
                    <p className="mt-2 text-lg font-extrabold tracking-tight">{active.time}</p>
                    <p className="mt-1 text-sm text-black/70">{active.label}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs ring-1 ${crowdBadge(active.crowd)}`}>
                        {active.crowd}
                      </span>
                      {active.id === recommendedId && (
                        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                          Recommended for {goal}
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-sm text-black/75">
                      {active.note ?? "A solid slot to build consistency."}
                    </p>

                    <div className="mt-4 rounded-xl border border-black/10 bg-white p-4">
                      <p className="text-xs font-semibold text-black/70">Quick suggestion</p>
                      <p className="mt-2 text-sm text-black/70">
                        If you can’t make it 4–5 days/week, pick the <span className="font-semibold">same time</span> 3
                        days/week. Consistency wins.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preview (mobile) */}
                <div className="lg:hidden rounded-2xl border border-black/10 bg-black/[0.02] p-5">
                  <p className="text-xs font-semibold text-black/60">Selected slot</p>
                  <p className="mt-2 text-lg font-extrabold tracking-tight">{active.time}</p>
                  <p className="mt-1 text-sm text-black/70">{active.label}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs ring-1 ${crowdBadge(active.crowd)}`}>
                      {active.crowd}
                    </span>
                    {active.id === recommendedId && (
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                        Recommended for {goal}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-black/75">
                    {active.note ?? "A solid slot to build consistency."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}