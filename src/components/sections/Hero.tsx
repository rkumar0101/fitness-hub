"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BRAND, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import HeroCarousel from "@/components/sections/HeroCarousel";

export default function Hero() {
  const whatsappHref = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Dark gym vibe background */}
      <div className="absolute inset-0 -z-10 bg-[#070B12]" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-40 right-[-60px] h-96 w-96 rounded-full bg-red-500/15 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-80px] h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge>Fitness Hub • Stronger every week</Badge>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Train hard. Stay consistent.{" "}
              <span className="text-[color:var(--fh-blue)]">Get results.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/75">
              Clean equipment, real coaching, flexible plans. Start with a free trial and
              we’ll suggest a routine based on your goal and timing.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href={whatsappHref}
                target="_blank"
                className="bg-[color:var(--fh-red)] hover:opacity-95"
              >
                Start on WhatsApp
              </Button>
              <Button variant="secondary" href="#plans">
                View plans
              </Button>
            </div>

            <p className="mt-3 text-xs text-white/60">
              Fast reply on WhatsApp • Trial first • No pressure
            </p>

            {/* Mini trust chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                Strength + Cardio
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                Beginner-friendly
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                Trainer guidance
              </span>
            </div>
          </motion.div>

          {/* Right carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="relative"
          >
            <HeroCarousel whatsappHref={whatsappHref} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}