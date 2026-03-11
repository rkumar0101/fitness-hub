"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";
import { BRAND, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";

type LeadState = "idle" | "loading" | "success" | "error";

const ADDRESS = "Fitness Hub, Your Area, Kolkata"; // change this
const MAP_QUERY = "Fitness Hub Kolkata"; // change this

export default function LocationContact() {
  const [status, setStatus] = useState<LeadState>("idle");
  const [form, setForm] = useState({ name: "", phone: "", goal: "General", message: "" });

  const whatsappHref = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);

  const mapHref = useMemo(() => {
    const q = encodeURIComponent(MAP_QUERY);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus("error");
      return;
    }

    try {
      setStatus("loading");
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          goal: form.goal,
          message: form.message,
          source: "location-contact",
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setForm({ name: "", phone: "", goal: "General", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Location & contact"
          title="Visit once. Decide after."
          subtitle="Find us on the map or share your details. We’ll reach out quickly."
        />

        <Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">
            {/* Left: Map + details */}
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-black">Address</p>
                  <p className="mt-1 text-sm text-black/70">{ADDRESS}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs text-blue-700 ring-1 ring-blue-600/15">
                      Open {`6 AM – 10 PM`}
                    </span>
                    <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-700 ring-1 ring-red-500/15">
                      Mon–Sat
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white
                               transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  >
                    Open in Maps
                  </a>
                  <a
                    href={whatsappHref}
                    className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black/80
                               transition hover:bg-black/[0.02] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Embedded map (safe, no styled-jsx) */}
              <div className="mt-6 overflow-hidden rounded-3xl border border-black/10">
                <iframe
                  title="Google map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
                  className="h-[320px] w-full"
                  loading="lazy"
                />
              </div>

              <p className="mt-4 text-xs text-black/55">
                Tip: Come 10 minutes early on your first day for a quick walkthrough.
              </p>
            </div>

            {/* Right: lead form */}
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <p className="text-sm font-semibold text-black">Get a call back</p>
              <p className="mt-1 text-sm text-black/70">
                Share your details. We’ll help you pick a plan and a time slot.
              </p>

              <form onSubmit={submit} className="mt-5 space-y-3">
                <div>
                  <label className="text-xs font-semibold text-black/70">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm
                               outline-none focus:ring-2 focus:ring-blue-500/30"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-black/70">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm
                               outline-none focus:ring-2 focus:ring-blue-500/30"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-black/70">Goal</label>
                  <select
                    value={form.goal}
                    onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value }))}
                    className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm
                               outline-none focus:ring-2 focus:ring-blue-500/30"
                  >
                    <option>General</option>
                    <option>Fat loss</option>
                    <option>Strength</option>
                    <option>Muscle gain</option>
                    <option>Beginner</option>
                    <option>Mobility</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-black/70">Message (optional)</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="mt-1 min-h-[110px] w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm
                               outline-none focus:ring-2 focus:ring-blue-500/30"
                    placeholder="Preferred time, any injuries, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white
                             transition hover:bg-blue-700 disabled:opacity-60
                             focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  {status === "loading" ? "Submitting..." : "Request call back"}
                </button>

                {status === "success" && (
                  <p className="text-sm text-blue-700">Done. We’ll contact you shortly.</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-700">Please enter your name and phone number.</p>
                )}

                <p className="pt-2 text-xs text-black/55">
                  Or message directly on WhatsApp for the fastest reply.
                </p>
              </form>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}