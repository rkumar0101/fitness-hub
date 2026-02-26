"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Motion";

type Billing = "monthly" | "quarterly" | "yearly";
type Category = "gym" | "gym_pt" | "transform";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  highlight?: boolean;
  category: Category;
  features: string[];
  perks: { label: string; value: string }[];
  prices: Record<Billing, number>; // in INR
  bestFor: string[];
};

const currency = (n: number) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

function savingsText(billing: Billing, prices: Record<Billing, number>) {
  // simple savings: compare against monthly * months
  const monthly = prices.monthly;
  if (billing === "monthly") return null;
  const months = billing === "quarterly" ? 3 : 12;
  const base = monthly * months;
  const now = prices[billing];
  const diff = base - now;
  if (diff <= 0) return null;
  const pct = Math.round((diff / base) * 100);
  return `Save ₹${currency(diff)} (${pct}%)`;
}

export default function Plans() {
  const [category, setCategory] = useState<Category>("gym");
  const [billing, setBilling] = useState<Billing>("quarterly");
  const [compareOpen, setCompareOpen] = useState(false);

  const plans: Plan[] = useMemo(
    () => [
      // Category: Gym
      {
        id: "gym-basic",
        name: "Starter",
        tagline: "Gym access + simple structure",
        category: "gym",
        prices: { monthly: 999, quarterly: 2699, yearly: 8999 },
        highlight: false,
        features: [
          "Full gym access",
          "Beginner-friendly starter routine",
          "Cardio + strength guidance",
          "Flexible timing support",
        ],
        perks: [
          { label: "Check-ins", value: "Monthly" },
          { label: "Routine", value: "Basic" },
          { label: "Support", value: "WhatsApp" },
        ],
        bestFor: ["Getting started", "Fat loss basics", "Consistency build"],
      },
      {
        id: "gym-plus",
        name: "Value",
        tagline: "Best value for consistency",
        category: "gym",
        prices: { monthly: 1299, quarterly: 3299, yearly: 10999 },
        highlight: true,
        features: [
          "Everything in Starter",
          "Progress check-ins",
          "Priority slot suggestions",
          "Form tips + tweaks",
          "Goal tracking sheet",
        ],
        perks: [
          { label: "Check-ins", value: "2× / month" },
          { label: "Routine", value: "Updated" },
          { label: "Support", value: "Priority" },
        ],
        bestFor: ["Steady fat loss", "Strength basics", "Busy schedules"],
      },
      {
        id: "gym-pro",
        name: "Pro",
        tagline: "Structured plan + tracking",
        category: "gym",
        prices: { monthly: 1699, quarterly: 4299, yearly: 13999 },
        highlight: false,
        features: [
          "Everything in Value",
          "Better split planning (4–6 weeks)",
          "Warm-up + mobility add-on",
          "Weekly progression targets",
          "Diet basics (simple rules)",
        ],
        perks: [
          { label: "Check-ins", value: "Weekly" },
          { label: "Routine", value: "Detailed" },
          { label: "Support", value: "High" },
        ],
        bestFor: ["Muscle gain", "Strength push", "Intermediate lifters"],
      },

      // Category: Gym + PT
      {
        id: "pt-2",
        name: "PT Lite",
        tagline: "2 PT sessions/month",
        category: "gym_pt",
        prices: { monthly: 2499, quarterly: 6999, yearly: 23999 },
        highlight: false,
        features: [
          "Gym access included",
          "2 PT sessions/month",
          "Form correction (key lifts)",
          "Customized weekly split",
          "WhatsApp support",
        ],
        perks: [
          { label: "PT", value: "2 / month" },
          { label: "Routine", value: "Custom" },
          { label: "Tracking", value: "Included" },
        ],
        bestFor: ["Beginners who need form help", "Safe training", "Back to gym"],
      },
      {
        id: "pt-4",
        name: "PT Plus",
        tagline: "Most popular coaching pack",
        category: "gym_pt",
        prices: { monthly: 3499, quarterly: 9799, yearly: 32999 },
        highlight: true,
        features: [
          "Gym access included",
          "4 PT sessions/month",
          "Technique + intensity planning",
          "Progression plan (4 weeks)",
          "Nutrition basics checklist",
        ],
        perks: [
          { label: "PT", value: "4 / month" },
          { label: "Routine", value: "Progressive" },
          { label: "Support", value: "Priority" },
        ],
        bestFor: ["Fat loss + strength", "Muscle gain", "Plateau break"],
      },
      {
        id: "pt-8",
        name: "PT Pro",
        tagline: "For serious progress",
        category: "gym_pt",
        prices: { monthly: 5999, quarterly: 16999, yearly: 56999 },
        highlight: false,
        features: [
          "Gym access included",
          "8 PT sessions/month",
          "Weekly progression updates",
          "Form + volume guidance",
          "Recovery + mobility plan",
        ],
        perks: [
          { label: "PT", value: "8 / month" },
          { label: "Routine", value: "High detail" },
          { label: "Tracking", value: "Weekly" },
        ],
        bestFor: ["Transformation mode", "Intermediate to advanced", "Fast results"],
      },

      // Category: Transformation
      {
        id: "tx-28",
        name: "28-Day Reset",
        tagline: "Short, strict, doable",
        category: "transform",
        prices: { monthly: 3999, quarterly: 3999, yearly: 3999 }, // fixed program price
        highlight: false,
        features: [
          "4-week plan + weekly milestones",
          "Beginner-friendly strength + cardio",
          "Food rules (simple + Indian options)",
          "Daily habit checklist",
          "Weekly check-in message",
        ],
        perks: [
          { label: "Duration", value: "28 days" },
          { label: "Check-ins", value: "Weekly" },
          { label: "Goal", value: "Fat loss" },
        ],
        bestFor: ["Kickstart fat loss", "Routine reset", "Discipline build"],
      },
      {
        id: "tx-90",
        name: "90-Day Transform",
        tagline: "Best for body recomposition",
        category: "transform",
        prices: { monthly: 7999, quarterly: 19999, yearly: 19999 }, // sold as quarterly program
        highlight: true,
        features: [
          "12-week training plan (3 phases)",
          "Strength + cardio periodization",
          "Progress tracking sheet",
          "Nutrition basics + protein targets",
          "Weekly check-ins + adjustments",
        ],
        perks: [
          { label: "Duration", value: "90 days" },
          { label: "Check-ins", value: "Weekly" },
          { label: "Updates", value: "Phase-wise" },
        ],
        bestFor: ["Recomp", "Muscle + fat loss", "Serious consistency"],
      },
      {
        id: "tx-180",
        name: "6-Month Build",
        tagline: "Long-term strength + physique",
        category: "transform",
        prices: { monthly: 9999, quarterly: 26999, yearly: 49999 },
        highlight: false,
        features: [
          "24-week plan with deloads",
          "Strength focus + accessory work",
          "Monthly goal recalibration",
          "Recovery + mobility structure",
          "Nutrition basics + adjustments",
        ],
        perks: [
          { label: "Duration", value: "6 months" },
          { label: "Check-ins", value: "2× / month" },
          { label: "Tracking", value: "Included" },
        ],
        bestFor: ["Strength build", "Lean muscle gain", "Long-term progress"],
      },
    ],
    []
  );

  const visiblePlans = plans.filter((p) => p.category === category);

  const categoryLabel: Record<Category, string> = {
    gym: "Gym",
    gym_pt: "Gym + PT",
    transform: "Transformation",
  };

  const billingLabel: Record<Billing, string> = {
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
  };

  return (
    <section id="plans" className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Plans"
          title="Simple pricing. No confusion."
          subtitle="Pick a plan and message us. We’ll confirm best fit in 2 minutes."
        />

        {/* Controls */}
        <Reveal>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Category tabs */}
            <div className="inline-flex w-full max-w-xl rounded-2xl border border-black/10 bg-white p-1">
              {(["gym", "gym_pt", "transform"] as Category[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={[
                    "flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition",
                    c === category
                      ? "bg-black text-white"
                      : "text-black/70 hover:bg-black/5",
                  ].join(" ")}
                >
                  {categoryLabel[c]}
                </button>
              ))}
            </div>

            {/* Billing toggle */}
            <div className="flex items-center justify-between gap-2 rounded-2xl border border-black/10 bg-white p-1 md:w-auto">
              {(["monthly", "quarterly", "yearly"] as Billing[]).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBilling(b)}
                  className={[
                    "rounded-xl px-3 py-2 text-sm font-semibold transition",
                    b === billing
                      ? "bg-[color:var(--fh-blue)] text-white"
                      : "text-black/70 hover:bg-black/5",
                  ].join(" ")}
                >
                  {billingLabel[b]}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Cards */}
        <Reveal>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {visiblePlans.map((p) => {
              const price = p.prices[billing];
              const save = savingsText(billing, p.prices);

              const msg = `Hi Fitness Hub! I want the "${p.name}" plan (${categoryLabel[p.category]} • ${billingLabel[billing]}). Price shown: ₹${currency(
                price
              )}. Please suggest best timing and next steps.`;

              const href = waLink(BRAND.phoneE164, msg);

              return (
                <div
                  key={p.id}
                  className={[
                    "relative overflow-hidden rounded-3xl border bg-white p-7 shadow-sm transition",
                    p.highlight
                      ? "border-[color:var(--fh-blue)] ring-1 ring-[color:var(--fh-blue)]"
                      : "border-black/10 hover:-translate-y-0.5",
                  ].join(" ")}
                >
                  {/* subtle glow */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-red-500/10 blur-3xl" />
                  </div>

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-extrabold">{p.name}</p>
                        <p className="mt-1 text-xs text-black/60">{p.tagline}</p>
                      </div>

                      {p.highlight ? (
                        <span className="rounded-full bg-[color:var(--fh-red)] px-3 py-1 text-xs font-bold text-white">
                          Most Popular
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-3xl font-extrabold tracking-tight">
                          ₹{currency(price)}
                        </p>
                        <p className="mt-1 text-xs text-black/60">
                          {billingLabel[billing]}
                        </p>
                      </div>

                      {save ? (
                        <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                          {save}
                        </span>
                      ) : null}
                    </div>

                    {/* Perks */}
                    <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-black/10 bg-black/[0.02] p-3">
                      {p.perks.map((x) => (
                        <div key={x.label} className="text-center">
                          <p className="text-[10px] font-semibold text-black/55">
                            {x.label}
                          </p>
                          <p className="mt-1 text-xs font-bold">{x.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className="mt-5 space-y-2 text-sm text-black/75">
                      {p.features.map((pt) => (
                        <li key={pt} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--fh-blue)]" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Best for */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.bestFor.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Button href={href} target="_blank" className="w-full">
                        WhatsApp for {p.name}
                      </Button>
                      <p className="mt-2 text-center text-xs text-black/60">
                        We’ll confirm price + timing on chat.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compare */}
          <div className="mt-6 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setCompareOpen((s) => !s)}
              className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/70 hover:bg-black/5"
            >
              {compareOpen ? "Hide comparison" : "Compare plans"}
            </button>
          </div>

          {compareOpen ? (
            <div className="mt-4 overflow-hidden rounded-3xl border border-black/10 bg-white">
              <div className="grid gap-0 lg:grid-cols-3">
                {visiblePlans.map((p) => (
                  <div key={p.id} className="border-b border-black/10 p-5 lg:border-b-0 lg:border-r lg:last:border-r-0">
                    <p className="text-sm font-extrabold">{p.name}</p>
                    <p className="mt-1 text-xs text-black/60">{p.tagline}</p>
                    <p className="mt-3 text-lg font-extrabold">
                      ₹{currency(p.prices[billing])}{" "}
                      <span className="text-xs font-semibold text-black/50">
                        / {billingLabel[billing]}
                      </span>
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-black/70">
                      {p.features.slice(0, 6).map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--fh-blue)]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </Reveal>

        {/* Small trust note */}
        <p className="mt-8 text-center text-xs text-black/55">
          Tip: Quarterly usually feels best for results because you stick longer.
        </p>
      </Container>
    </section>
  );
}