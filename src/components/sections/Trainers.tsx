"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

type Trainer = {
  id: string;
  name: string;
  role: string;
  expYears: number;
  gender: "male" | "female";
  photo: string;
  bio: string;
  specialties: string[];
  certs: string[];
  availability: string;
};

const TRAINERS: Trainer[] = [
  {
    id: "arjun",
    name: "Arjun Verma",
    gender: "male",
    role: "Strength & technique",
    expYears: 6,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Form-first coaching. Simple tracking. Consistent overload without injury.",
    specialties: ["Squat / deadlift", "Beginner form", "Progression"],
    certs: ["CPT", "Strength coach"],
    availability: "Mornings • Mon–Sat",
  },
  {
    id: "riya",
    name: "Riya Singh",
    gender: "female",
    role: "Fat loss & conditioning",
    expYears: 5,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Doable sessions. Better stamina + habits that actually stick.",
    specialties: ["Fat loss", "HIIT (low-risk)", "Cardio plan"],
    certs: ["CPT", "Nutrition basics"],
    availability: "Evenings • Mon–Fri",
  },
  {
    id: "karan",
    name: "Karan Mehta",
    gender: "male",
    role: "Muscle gain",
    expYears: 7,
    photo: "https://randomuser.me/api/portraits/men/46.jpg",
    bio: "Hypertrophy fundamentals: volume, recovery, and clean technique cues.",
    specialties: ["Hypertrophy", "Upper/lower split", "Accessories"],
    certs: ["CPT", "Hypertrophy methods"],
    availability: "Flexible • Wed–Sun",
  },
  {
    id: "neha",
    name: "Neha Sharma",
    gender: "female",
    role: "Mobility & recovery",
    expYears: 4,
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Move better to lift better. Mobility that supports your training, not replaces it.",
    specialties: ["Mobility", "Warm-up flows", "Core & posture"],
    certs: ["Mobility coach", "Injury-aware training"],
    availability: "Mornings • Tue–Sun",
  },
];

function ExpPill({ years }: { years: number }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
      {years}+ yrs
    </span>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "blue" | "red" | "neutral";
  children: React.ReactNode;
}) {
  const cls =
    tone === "blue"
      ? "bg-blue-600/10 text-blue-700 ring-blue-600/15"
      : tone === "red"
      ? "bg-red-500/10 text-red-700 ring-red-500/15"
      : "bg-black/[0.04] text-black/70 ring-black/10";

  return <span className={`rounded-full px-3 py-1 text-xs ring-1 ${cls}`}>{children}</span>;
}

function Icon({ name }: { name: "shield" | "clock" | "bolt" }) {
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
  if (name === "bolt") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2 3 14h7l-1 8 12-14h-7l-1-6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // shield
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 20 6v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Trainers() {
  const [activeId, setActiveId] = useState(TRAINERS[0]!.id);
  const [lockedId, setLockedId] = useState<string | null>(null);

  const active = useMemo(() => {
    const id = lockedId ?? activeId;
    return TRAINERS.find((t) => t.id === id) ?? TRAINERS[0]!;
  }, [activeId, lockedId]);

  return (
    <section id="trainers" className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Trainers"
          title="Pick a trainer, get real guidance"
          subtitle="Hover to preview. Click to lock. Tap on mobile to expand."
        />

        <Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-[380px_1fr]">
            {/* LEFT: stacked list */}
            <div className="space-y-3">
              {TRAINERS.map((t) => {
                const isSelected = (lockedId ?? activeId) === t.id;

                return (
                  <div key={t.id} className="rounded-3xl border border-black/10 bg-white">
                    <button
                      type="button"
                      onMouseEnter={() => {
                        if (!lockedId) setActiveId(t.id);
                      }}
                      onClick={() => setLockedId((prev) => (prev === t.id ? null : t.id))}
                      className={[
                        "flex w-full items-center gap-4 rounded-3xl p-4 text-left transition",
                        "hover:bg-black/[0.02] focus:outline-none focus:ring-2 focus:ring-blue-500/30",
                        isSelected ? "ring-2 ring-blue-600/20" : "",
                      ].join(" ")}
                      aria-expanded={isSelected}
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-blue-600/15">
                        <Image
                          src={t.photo}
                          alt={`${t.name} profile`}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-black">{t.name}</p>
                        <p className="mt-0.5 truncate text-xs text-black/65">{t.role}</p>
                      </div>

                      <ExpPill years={t.expYears} />
                    </button>

                    {/* MOBILE: expand details under selected */}
                    <div className={["lg:hidden px-4 pb-4", isSelected ? "block" : "hidden"].join(" ")}>
                      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                        <p className="text-sm text-black/75">{t.bio}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {t.specialties.map((s) => (
                            <Badge key={s} tone="neutral">
                              {s}
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-3 space-y-1.5 text-sm text-black/70">
                          <p>
                            <span className="font-semibold text-black/80">Certs:</span>{" "}
                            {t.certs.join(" • ")}
                          </p>
                          <p>
                            <span className="font-semibold text-black/80">Availability:</span>{" "}
                            {t.availability}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* tiny helper line */}
              <p className="px-1 text-xs text-black/50">
                Tip: Click a trainer to lock selection. Click again to unlock.
              </p>
            </div>

            {/* RIGHT: desktop preview */}
            <div className="hidden lg:block">
              <div className="sticky top-24 rounded-3xl border border-black/10 bg-white p-3">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-blue-600/15">
                    <Image
                      src={active.photo}
                      alt={`${active.name} profile`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold text-black">{active.name}</p>
                    <p className="mt-0.5 truncate text-sm text-black/65">{active.role}</p>
                  </div>

                  <ExpPill years={active.expYears} />
                </div>

                <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.02] p-5">
                  <p className="text-sm text-black/75">{active.bio}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.specialties.map((s, idx) => (
                      <Badge key={s} tone={idx === 0 ? "blue" : "neutral"}>
                        {s}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-black/70">
                    <p className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
                        <Icon name="shield" />
                      </span>
                      <span>
                        <span className="font-semibold text-black/80">Certs:</span>{" "}
                        {active.certs.join(" • ")}
                      </span>
                    </p>

                    <p className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-red-500/10 text-red-600">
                        <Icon name="clock" />
                      </span>
                      <span>
                        <span className="font-semibold text-black/80">Availability:</span>{" "}
                        {active.availability}
                      </span>
                    </p>

                    <p className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-black/[0.04] text-black/70">
                        <Icon name="bolt" />
                      </span>
                      <span>
                        <span className="font-semibold text-black/80">Best for:</span>{" "}
                        {active.specialties.slice(0, 2).join(" • ")}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge tone="blue">Hover to preview</Badge>
                  <Badge tone="red">Click to lock</Badge>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}