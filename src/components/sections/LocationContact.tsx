"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BRAND, BRANCHES } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";

type LeadState = "idle" | "loading" | "success" | "error";

export default function LocationContact() {
  const [activeId, setActiveId] = useState(BRANCHES[0].id);
  const [status, setStatus] = useState<LeadState>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const active = BRANCHES.find((branch) => branch.id === activeId) ?? BRANCHES[0];
  const href = waLink(
    BRAND.phoneE164,
    `Hi ${BRAND.name}, I want details for ${active.area}.`
  );

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
          goal: active.area,
          message: form.message,
          source: "branch-contact",
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setForm({
        name: "",
        phone: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="branches" className="scroll-mt-24 bg-[#F7FAFC] py-16">
      <Container>
        <SectionHeading
          eyebrow="Branches"
          title="Find your nearest branch"
          subtitle="Switch between areas, view the exact details, and contact the team directly."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm">
            <div className="grid gap-3">
              {BRANCHES.map((branch, index) => {
                const selected = branch.id === active.id;
                return (
                  <button
                    key={branch.id}
                    type="button"
                    onMouseEnter={() => setActiveId(branch.id)}
                    onClick={() => {
                      setActiveId(branch.id);
                    }}
                    className={[
                      "grid grid-cols-[86px_1fr] gap-4 rounded-3xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md",
                      selected
                        ? "border-blue-500 bg-blue-600/5"
                        : "border-black/10 bg-white",
                    ].join(" ")}
                  >
                    <div className="relative h-24 overflow-hidden rounded-2xl bg-black">
                      <Image
                        src={branch.images[(index + 1) % branch.images.length]}
                        alt={`${branch.area} branch`}
                        fill
                        className="object-cover"
                        sizes="86px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-extrabold">
                        {branch.area}
                      </p>
                      <p className="mt-1 truncate text-sm text-black/60">
                        {branch.landmark}
                      </p>
                      <p className="mt-3 text-xs font-semibold text-red-700">
                        Admission {branch.admission}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.article
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-xl shadow-black/5"
          >
            <div className="grid md:grid-cols-[0.88fr_1.12fr]">
              <div className="relative min-h-[420px] bg-black">
                <Image
                  src={active.images[active.images.length - 1]}
                  alt={`${active.area} selected branch`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-sm font-semibold uppercase text-white/60">
                    Selected branch
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold tracking-tight">
                    {active.area}
                  </h3>
                  <p className="mt-2 text-sm text-white/75">
                    {active.landmark}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm font-extrabold text-black">Address</p>
                <p className="mt-2 text-sm leading-6 text-black/68">
                  {active.address}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {active.timings.slice(0, 2).map((time) => (
                    <div
                      key={time}
                      className="rounded-2xl bg-black/[0.04] px-4 py-3"
                    >
                      <p className="text-xs font-semibold text-black/45">
                        Training slot
                      </p>
                      <p className="mt-1 text-sm font-extrabold">{time}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href={href} target="_blank">
                    WhatsApp
                  </Button>
                  <Button variant="secondary" href={active.mapLink} target="_blank">
                    Open map
                  </Button>
                </div>

                <div
                  id="contact"
                  className="mt-6 scroll-mt-24 rounded-3xl border border-black/10 bg-[#F7FAFC] p-5"
                >
                  <p className="text-sm font-extrabold">Request a call back</p>
                  <p className="mt-1 text-xs text-black/55">
                    Selected area: <span className="font-semibold">{active.area}</span>
                  </p>
                  <form onSubmit={submit} className="mt-4 grid gap-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                        placeholder="Name"
                      />
                      <input
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                        placeholder="Phone"
                      />
                    </div>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      className="min-h-24 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="Preferred plan, timing, or PT enquiry..."
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                    >
                      {status === "loading" ? "Submitting..." : "Request call back"}
                    </button>
                    {status === "success" ? (
                      <p className="text-sm text-blue-700">
                        Done. We will contact you shortly.
                      </p>
                    ) : null}
                    {status === "error" ? (
                      <p className="text-sm text-red-700">
                        Please enter your name and phone number.
                      </p>
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </Container>
    </section>
  );
}
