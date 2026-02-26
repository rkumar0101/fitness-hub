"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type Inputs = {
  goal: string;
  experience: string;
  daysPerWeek: string;
  sessionTime: string;
  equipment: string;
  injuries: string;
  diet: string;
  schedulePref: string;
};

type Plan = {
  headline: string;
  summary: string;
  weeklySplit: { day: string; focus: string; workout: string }[];
  workoutRules: string[];
  nutritionBasics: string[];
  recovery: string[];
  progression4Weeks: { week: string; whatToDo: string }[];
  safetyNotes: string[];
  whatToTellTrainer: string[];
};

function classNames(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

export default function PlanBuilder() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [inputs, setInputs] = useState<Inputs>({
    goal: "Fat loss",
    experience: "Beginner",
    daysPerWeek: "4",
    sessionTime: "45 min",
    equipment: "Full gym",
    injuries: "None",
    diet: "No preference",
    schedulePref: "Evening",
  });

  // lead gate
  const [gateOpen, setGateOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const progress = useMemo(() => (step / 3) * 100, [step]);

  function update<K extends keyof Inputs>(k: K, val: Inputs[K]) {
    setInputs((p) => ({ ...p, [k]: val }));
  }

  async function generatePlan() {
    setLoading(true);
    setError(null);
    setPlan(null);

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed");

      setPlan(data.plan);
      setStep(3);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function openGate() {
    setLeadError(null);
    setGateOpen(true);
  }

  async function submitLeadAndDownload() {
    setLeadError(null);

    const cleanedPhone = phone.replace(/\s+/g, "");
    if (!cleanedPhone || cleanedPhone.length < 10) {
      setLeadError("Enter a valid phone number.");
      return;
    }
    if (!consent) {
      setLeadError("Please tick consent to download.");
      return;
    }
    if (!plan) {
      setLeadError("Plan missing. Generate again.");
      return;
    }

    // send lead (v1 logs on server)
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: cleanedPhone,
          consent,
          goal: inputs.goal,
        }),
      });
    } catch {
      // even if lead capture fails, allow download (don’t block UX)
    }

    // create printable report and trigger print (user can save as PDF)
    const w = window.open("", "_blank");
    if (!w) {
      setLeadError("Popup blocked. Allow popups and try again.");
      return;
    }

    const safe = (s: string) =>
      s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

    const list = (arr: string[]) =>
      `<ul>${arr.map((x) => `<li>${safe(x)}</li>`).join("")}</ul>`;

    const table = plan.weeklySplit
      .map(
        (x) => `
        <tr>
          <td><b>${safe(x.day)}</b><br/><span class="muted">${safe(x.focus)}</span></td>
          <td>${safe(x.workout)}</td>
        </tr>`
      )
      .join("");

    const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${safe(plan.headline)} - Fitness Hub</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; }
    .top { display:flex; justify-content:space-between; align-items:center; gap:16px; }
    .brand { font-weight:800; letter-spacing:-0.02em; }
    .chip { display:inline-block; padding:6px 10px; border-radius:999px; background:#0b1220; color:#fff; font-size:12px; }
    h1 { margin:16px 0 6px; font-size:26px; }
    p { margin: 8px 0; line-height: 1.5; }
    .muted { color:#475569; font-size:12px; }
    .section { margin-top:18px; padding-top:14px; border-top:1px solid #e2e8f0; }
    table { width:100%; border-collapse:collapse; margin-top:10px; }
    td { border:1px solid #e2e8f0; padding:10px; vertical-align:top; }
    ul { margin: 8px 0 0 18px; }
    li { margin: 6px 0; }
    .grid { display:grid; grid-template-columns: 1fr 1fr; gap:14px; }
    @media print {
      .no-print { display:none; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="top">
    <div>
      <div class="brand">Fitness Hub</div>
      <div class="muted">Personalized plan report</div>
    </div>
    <div class="chip">${safe(inputs.goal)} • ${safe(inputs.experience)}</div>
  </div>

  <h1>${safe(plan.headline)}</h1>
  <p>${safe(plan.summary)}</p>
  <p class="muted">Generated for: ${safe(name || "Member")} • Phone: ${safe(phone)}</p>

  <div class="section">
    <h2>Weekly Split</h2>
    <table>
      <tr><td><b>Day</b></td><td><b>Workout</b></td></tr>
      ${table}
    </table>
  </div>

  <div class="section grid">
    <div>
      <h2>Workout Rules</h2>
      ${list(plan.workoutRules)}
    </div>
    <div>
      <h2>Nutrition Basics</h2>
      ${list(plan.nutritionBasics)}
    </div>
  </div>

  <div class="section grid">
    <div>
      <h2>Recovery</h2>
      ${list(plan.recovery)}
    </div>
    <div>
      <h2>Safety Notes</h2>
      ${list(plan.safetyNotes)}
    </div>
  </div>

  <div class="section">
    <h2>4-Week Progression</h2>
    <ul>
      ${plan.progression4Weeks
        .map((x) => `<li><b>${safe(x.week)}:</b> ${safe(x.whatToDo)}</li>`)
        .join("")}
    </ul>
  </div>

  <div class="section">
    <h2>What to tell your trainer</h2>
    ${list(plan.whatToTellTrainer)}
  </div>

  <div class="section no-print">
    <p class="muted">Use your browser print dialog → “Save as PDF”.</p>
    <button onclick="window.print()" style="padding:10px 14px;border-radius:10px;border:1px solid #e2e8f0;background:#0b1220;color:#fff;font-weight:700;cursor:pointer;">
      Print / Save as PDF
    </button>
  </div>

  <script>
    setTimeout(() => window.print(), 400);
  </script>
</body>
</html>
`;

    w.document.open();
    w.document.write(html);
    w.document.close();

    setGateOpen(false);
  }

  return (
    <section id="plan-builder" className="bg-white py-16">
      <Container>
        <SectionHeading
          eyebrow="AI Plan Builder"
          title="Answer a few questions. Get your plan."
          subtitle="Quick inputs → personalized weekly split + guide. Downloadable report."
        />

        <div className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-white">
          {/* progress bar */}
          <div className="border-b border-black/10 bg-black/[0.02] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-black/60">Step {step}/3</p>
              <div className="flex gap-2">
                <span className={classNames("rounded-full px-3 py-1 text-xs font-semibold", step >= 1 ? "bg-blue-500/10 text-blue-700" : "bg-black/5 text-black/50")}>
                  Questions
                </span>
                <span className={classNames("rounded-full px-3 py-1 text-xs font-semibold", step >= 2 ? "bg-red-500/10 text-red-700" : "bg-black/5 text-black/50")}>
                  Generate
                </span>
                <span className={classNames("rounded-full px-3 py-1 text-xs font-semibold", step >= 3 ? "bg-black/10 text-black/70" : "bg-black/5 text-black/50")}>
                  Preview
                </span>
              </div>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/5">
              <motion.div
                className="h-full rounded-full bg-[color:var(--fh-blue)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-12">
            {/* left panel */}
            <div className="lg:col-span-6 p-6">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-sm font-bold">Your basics</p>
                    <p className="mt-1 text-xs text-black/60">
                      Short answers. We’ll keep it practical.
                    </p>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <Field label="Goal">
                        <Select
                          value={inputs.goal}
                          onChange={(v) => update("goal", v)}
                          options={["Fat loss", "Muscle gain", "Strength", "General fitness", "Mobility & recovery"]}
                        />
                      </Field>

                      <Field label="Experience">
                        <Select
                          value={inputs.experience}
                          onChange={(v) => update("experience", v)}
                          options={["Beginner", "Intermediate", "Advanced"]}
                        />
                      </Field>

                      <Field label="Days per week">
                        <Select
                          value={inputs.daysPerWeek}
                          onChange={(v) => update("daysPerWeek", v)}
                          options={["3", "4", "5", "6"]}
                        />
                      </Field>

                      <Field label="Session time">
                        <Select
                          value={inputs.sessionTime}
                          onChange={(v) => update("sessionTime", v)}
                          options={["30 min", "45 min", "60 min"]}
                        />
                      </Field>

                      <Field label="Equipment access">
                        <Select
                          value={inputs.equipment}
                          onChange={(v) => update("equipment", v)}
                          options={["Full gym", "Basic dumbbells", "Bodyweight only"]}
                        />
                      </Field>

                      <Field label="Injuries (if any)">
                        <Select
                          value={inputs.injuries}
                          onChange={(v) => update("injuries", v)}
                          options={["None", "Knee", "Back", "Shoulder", "Other / Not sure"]}
                        />
                      </Field>

                      <Field label="Diet preference">
                        <Select
                          value={inputs.diet}
                          onChange={(v) => update("diet", v)}
                          options={["No preference", "Veg", "Non-veg", "High protein focus"]}
                        />
                      </Field>

                      <Field label="Preferred time">
                        <Select
                          value={inputs.schedulePref}
                          onChange={(v) => update("schedulePref", v)}
                          options={["Morning", "Evening", "Anytime"]}
                        />
                      </Field>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Button onClick={() => setStep(2)}>Next</Button>
                      <Button variant="secondary" href="#plans">
                        Pricing
                      </Button>
                    </div>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-sm font-bold">Generate your plan</p>
                    <p className="mt-1 text-xs text-black/60">
                      We’ll build a weekly split and a simple guide.
                    </p>

                    <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                      <p className="text-xs font-semibold text-black/60">Your inputs</p>
                      <div className="mt-3 grid gap-2 text-xs text-black/70 sm:grid-cols-2">
                        <Row k="Goal" v={inputs.goal} />
                        <Row k="Experience" v={inputs.experience} />
                        <Row k="Days/week" v={inputs.daysPerWeek} />
                        <Row k="Time" v={inputs.sessionTime} />
                        <Row k="Equipment" v={inputs.equipment} />
                        <Row k="Injuries" v={inputs.injuries} />
                        <Row k="Diet" v={inputs.diet} />
                        <Row k="Schedule" v={inputs.schedulePref} />
                      </div>
                    </div>

                    {error ? (
                      <p className="mt-4 text-sm font-semibold text-red-600">
                        {error}
                      </p>
                    ) : null}

                    <div className="mt-6 flex gap-3">
                      <Button variant="secondary" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <button
  onClick={generatePlan}
  disabled={loading}
  className="rounded-xl bg-[color:var(--fh-blue)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
>
  {loading ? "Generating..." : "Generate plan"}
</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-sm font-bold">Preview</p>
                    <p className="mt-1 text-xs text-black/60">
                      Looks good? Download the full report.
                    </p>

                    <div className="mt-6 flex gap-3">
                      <Button variant="secondary" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button onClick={openGate} className="bg-[color:var(--fh-red)] hover:opacity-95">
                        Download report (PDF)
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* right panel: plan preview */}
            <div className="lg:col-span-6 border-t border-black/10 lg:border-l lg:border-t-0 p-6 bg-black/[0.02]">
              {!plan ? (
                <div className="rounded-2xl border border-black/10 bg-white p-5">
                  <p className="text-sm font-bold">Plan preview</p>
                  <p className="mt-2 text-sm text-black/70">
                    Generate your plan to see the weekly split here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-black/10 bg-white p-5">
                    <p className="text-sm font-bold">{plan.headline}</p>
                    <p className="mt-2 text-sm leading-6 text-black/70">{plan.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs font-semibold text-black/70">
                        {inputs.goal}
                      </span>
                      <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs font-semibold text-black/70">
                        {inputs.daysPerWeek} days/week
                      </span>
                      <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs font-semibold text-black/70">
                        {inputs.sessionTime}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-white p-5">
                    <p className="text-xs font-bold text-black/70">Weekly split</p>
                    <div className="mt-3 space-y-2">
                      {plan.weeklySplit?.slice(0, 5).map((d) => (
                        <div key={d.day} className="rounded-xl border border-black/10 bg-white p-3">
                          <p className="text-xs font-bold">{d.day} • {d.focus}</p>
                          <p className="mt-1 text-xs text-black/70">{d.workout}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-black/50">
                      Full report includes rules, nutrition basics, recovery, and 4-week progression.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lead gate modal */}
        <AnimatePresence>
          {gateOpen ? (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGateOpen(false)}
            >
              <motion.div
                className="w-full max-w-lg rounded-3xl border border-black/10 bg-white p-6"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-sm font-bold">Download your plan</p>
                <p className="mt-1 text-xs text-black/60">
                  Enter phone number to download. (We’ll use this for WhatsApp follow-up if you agree.)
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Field label="Name (optional)">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Phone (required)">
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500/20"
                      placeholder="10-digit number"
                      inputMode="numeric"
                    />
                  </Field>
                </div>

                <label className="mt-4 flex items-start gap-2 text-xs text-black/70">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    I agree to be contacted on WhatsApp for plan follow-up and offers.
                  </span>
                </label>

                {leadError ? (
                  <p className="mt-3 text-sm font-semibold text-red-600">{leadError}</p>
                ) : null}

                <div className="mt-5 flex gap-3">
                  <Button variant="secondary" onClick={() => setGateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={submitLeadAndDownload} className="bg-[color:var(--fh-red)] hover:opacity-95">
                    Download now
                  </Button>
                </div>

                <p className="mt-3 text-xs text-black/50">
                  Tip: A new tab opens and prints automatically. Choose “Save as PDF”.
                </p>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-black/60">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-black/10 bg-white px-3 py-2">
      <span className="text-black/60">{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}