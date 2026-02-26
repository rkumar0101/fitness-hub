"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

type Slide =
  | {
      type: "image";
      src: string; // must be a direct image URL
      title?: string;
      subtitle?: string;
    }
  | {
      type: "lead";
      title: string;
      subtitle: string;
      ctaText: string;
      ctaHref: string;
      secondaryText?: string;
      secondaryHref?: string;
      bgSrc?: string; // optional background image for lead slide
    };

function clampIndex(i: number, len: number) {
  return (i + len) % len;
}

function SlideImage({
  src,
  alt,
  className,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-full w-full">
      {/* skeleton */}
      {!loaded && !failed ? (
        <div className="absolute inset-0 animate-pulse bg-white/5" />
      ) : null}

      {!failed ? (
        <img
          src={src}
          alt={alt}
          className={className}
          loading={eager ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        // fallback if image hotlink fails
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.25),transparent_55%),radial-gradient(circle_at_70%_40%,rgba(220,38,38,0.18),transparent_55%)]" />
      )}

      {/* subtle shine */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
    </div>
  );
}

export default function HeroCarousel({ whatsappHref }: { whatsappHref: string }) {
  const slides: Slide[] = useMemo(
    () => [
      // ✅ Lead capture slide (ONLY slide with WhatsApp button)
      // {
      //   type: "lead",
      //   title: "Join Fitness Hub",
      //   subtitle:
      //     "Train smart, stay consistent, and get visible results. Start with a free trial on WhatsApp.",
      //   ctaText: "WhatsApp • Free Trial",
      //   ctaHref: whatsappHref,
      //   secondaryText: "View plans",
      //   secondaryHref: "#plans",
      //   bgSrc:
      //     "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1600&q=80",
      // },

      // ✅ 10–12 stock gym images (DIRECT image URLs)
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",
        title: "Strength zone",
        subtitle: "Racks, benches, free weights",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?auto=format&fit=crop&w=1600&q=80",
        title: "Coaching support",
        subtitle: "Form, progression, consistency",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1600&q=80",
        title: "Progress you can feel",
        subtitle: "Structured routine, better lifts",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
        title: "Cardio zone",
        subtitle: "Conditioning that builds stamina",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=1600&q=80",
        title: "Fat loss routines",
        subtitle: "Simple plan, consistent effort",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1600&q=80",
        title: "Serious equipment",
        subtitle: "Clean, maintained, ready",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1600&q=80",
        title: "High energy sessions",
        subtitle: "Workouts that push you",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&w=1600&q=80",
        title: "Mobility & recovery",
        subtitle: "Warm-up, cool-down, repeat",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1521805103424-d8f8430e8933?auto=format&fit=crop&w=1600&q=80",
        title: "Modern space",
        subtitle: "A vibe that keeps you coming",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=1600&q=80",
        title: "Trainer guidance",
        subtitle: "Get help when you need it",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1600&q=80",
        title: "Community feel",
        subtitle: "Consistency is easier together",
      },
    ],
    [whatsappHref]
  );

  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const isHovering = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (isHovering.current) return;
      goNext();
    }, 4500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  function goNext() {
    setDir(1);
    setIndex((i) => clampIndex(i + 1, total));
  }

  function goPrev() {
    setDir(-1);
    setIndex((i) => clampIndex(i - 1, total));
  }

  const active = slides[index];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-lg"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="relative h-[360px] w-full sm:h-[420px]"
          initial={{ opacity: 0, x: dir * 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -dir * 24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) goNext();
            else if (info.offset.x > 60) goPrev();
          }}
        >
          {active.type === "lead" ? (
            <div className="flex h-full w-full items-end">
              <div className="absolute inset-0">
                <SlideImage
                  src={
                    active.bgSrc ??
                    "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1600&q=80"
                  }
                  alt="Fitness Hub promo"
                  className="h-full w-full object-cover opacity-70"
                  eager
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.35),transparent_55%),radial-gradient(circle_at_70%_40%,rgba(220,38,38,0.28),transparent_55%)]" />
              </div>

              <div className="relative z-10 w-full p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                  Free trial • WhatsApp booking
                </div>

                <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/80">
                  {active.subtitle}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button
                    href={active.ctaHref}
                    target="_blank"
                    className="bg-[color:var(--fh-red)] hover:opacity-95"
                  >
                    {active.ctaText}
                  </Button>

                  {active.secondaryHref ? (
                    <Button variant="secondary" href={active.secondaryHref}>
                      {active.secondaryText ?? "Learn more"}
                    </Button>
                  ) : null}
                </div>

                <p className="mt-3 text-xs text-white/70">
                  Tip: WhatsApp message me goal + preferred time likh do.
                </p>
              </div>
            </div>
          ) : (
            <div className="relative h-full w-full">
              <SlideImage
                src={active.src}
                alt={active.title ?? "Gym image"}
                className="h-full w-full object-cover"
                eager={index <= 1}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    {active.title ? (
                      <p className="text-sm font-bold text-white">
                        {active.title}
                      </p>
                    ) : null}
                    {active.subtitle ? (
                      <p className="mt-1 text-xs text-white/75">
                        {active.subtitle}
                      </p>
                    ) : null}
                  </div>

                  {/* ✅ Removed WhatsApp button from every image slide */}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute left-3 top-3 flex gap-2">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-xs font-semibold text-white hover:bg-black/45"
          aria-label="Previous"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={goNext}
          className="rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-xs font-semibold text-white hover:bg-black/45"
          aria-label="Next"
        >
          Next
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setDir(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={[
              "h-2 rounded-full transition",
              i === index
                ? "w-6 bg-white/90"
                : "w-2 bg-white/35 hover:bg-white/55",
            ].join(" ")}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}