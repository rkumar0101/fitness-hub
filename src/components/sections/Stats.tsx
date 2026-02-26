"use client";

import { Container } from "@/components/ui/Container";
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Stat = {
  label: string;
  value: string; // e.g. "6 AM – 10 PM", "50+"
  hint?: string; // small line (optional)
  accent?: "blue" | "red";
  icon: "clock" | "dumbbell" | "users" | "spark";
};

const STATS: Stat[] = [
  { label: "Open hours", value: "6 AM – 10 PM", hint: "Mon–Sat", accent: "blue", icon: "clock" },
  { label: "Equipment", value: "50+", hint: "Strength + cardio", accent: "red", icon: "dumbbell" },
  { label: "Trainers", value: "10+", hint: "Guidance available", accent: "blue", icon: "users" },
  { label: "Trial", value: "Free", hint: "WhatsApp to book", accent: "red", icon: "spark" },
];

// --- tiny inline icons (no extra libraries) ---
function Icon({ name }: { name: Stat["icon"] }) {
  const cls = "h-5 w-5";
  if (name === "clock")
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

  if (name === "dumbbell")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M7 10v4M17 10v4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 12h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 9v6M19 9v6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );

  if (name === "users")
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

  // spark
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l1.2 4.3L18 7.5l-4.1 2.5L12 14l-1.9-4-4.1-2.5 4.8-1.2L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M5 14l.6 2.2L8 17l-2.1 1.2L5 20l-0.9-1.8L2 17l2.4-.8L5 14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// --- count-up (only for values like 50+ / 10+) ---
function parseNumberPrefix(value: string) {
  const m = value.match(/^(\d+)\+$/);
  if (!m) return null;
  return Number(m[1]);
}

function CountUp({
  value,
  active,
}: {
  value: string;
  active: boolean;
}) {
  const n = parseNumberPrefix(value);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!active) return;

    if (n === null) {
      setShown(value);
      return;
    }

    const duration = 700;
    const start = performance.now();

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const current = Math.floor(p * n);
      setShown(`${current}+`);
      if (p < 1) requestAnimationFrame(tick);
      else setShown(`${n}+`);
    };

    requestAnimationFrame(tick);
  }, [active, n, value]);

  return <span>{shown}</span>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px", once: true });

  const accentGlow = useMemo(
    () => ({
      blue: "shadow-[0_0_0_1px_rgba(37,99,235,0.18),0_12px_30px_-16px_rgba(37,99,235,0.55)]",
      red: "shadow-[0_0_0_1px_rgba(220,38,38,0.18),0_12px_30px_-16px_rgba(220,38,38,0.55)]",
    }),
    []
  );

  const accentChip = {
    blue: "bg-blue-500/10 text-blue-600",
    red: "bg-red-500/10 text-red-600",
  } as const;

  return (
    <section className="border-y border-black/10 bg-white">
      <Container>
        <div ref={ref} className="py-10">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-5",
                  s.accent ? accentGlow[s.accent] : "",
                ].join(" ")}
              >
                {/* scan line */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -left-10 top-0 h-full w-24 rotate-12 bg-white/10 blur-md" />
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div
                    className={[
                      "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                      s.accent ? accentChip[s.accent] : "bg-black/5 text-black/60",
                    ].join(" ")}
                  >
                    <Icon name={s.icon} />
                  </div>

                  <span
                    className={[
                      "rounded-full border border-black/10 px-3 py-1 text-xs font-semibold",
                      "bg-black/[0.02] text-black/70",
                    ].join(" ")}
                  >
                    {s.label}
                  </span>
                </div>

                <p className="mt-5 text-2xl font-extrabold tracking-tight">
                  <CountUp value={s.value} active={inView} />
                </p>

                <p className="mt-2 text-xs text-black/60">
                  {s.hint ?? " "}
                </p>
              </motion.div>
            ))}
          </div>

          {/* small unique micro-line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="mt-5 text-center text-xs text-black/50"
          >
            Consistency beats intensity. Start small. Show up. Repeat.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}