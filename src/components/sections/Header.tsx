"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BRAND, NAV_LINKS, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappHref = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b",
        scrolled ? "bg-white/80 backdrop-blur border-black/10" : "bg-white border-transparent",
      ].join(" ")}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-bold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              FH
            </span>
            <span>{BRAND.name}</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="text-sm font-semibold text-black/70 hover:text-black"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href={whatsappHref} target="_blank" className="hidden sm:inline-flex">
              WhatsApp
            </Button>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden"
            >
              <div className="pb-4">
                <div className="mt-2 grid gap-2 rounded-2xl border border-black/10 bg-white p-3">
                  {NAV_LINKS.map((l) => (
                    <a
                      key={l.id}
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-2 text-sm font-semibold text-black/80 hover:bg-black/5"
                    >
                      {l.label}
                    </a>
                  ))}
                  <Button href={whatsappHref} target="_blank" className="w-full">
                    WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </header>
  );
}