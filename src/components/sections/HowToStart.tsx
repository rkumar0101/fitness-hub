import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";
import { BRAND, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";

const STEPS = [
  {
    title: "Show up at the same time",
    desc: "Pick a slot you can repeat 3 days a week. Same time = easier habit.",
    accent: "blue" as const,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Start with a simple plan",
    desc: "No confusion. A clean routine built around your goal, not random workouts.",
    accent: "red" as const,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 4h12v16H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Get your form locked in",
    desc: "First week is technique. Once form is right, progress becomes automatic.",
    accent: "blue" as const,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20 6 9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Track small wins",
    desc: "Add 1–2 reps or a little weight. Boring progress is the best progress.",
    accent: "red" as const,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M8 15l3-3 3 2 5-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function AccentIcon({
  accent,
  children,
}: {
  accent: "blue" | "red";
  children: React.ReactNode;
}) {
  const cls = accent === "blue" ? "bg-blue-500/10 text-blue-600" : "bg-red-500/10 text-red-600";
  return <div className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${cls}`}>{children}</div>;
}

export default function HowToStart() {
  const whatsappHref = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <section id="how-to-start" className="py-16">
      <Container>
        <SectionHeading
          eyebrow="How to start"
          title="Start strong. Keep it simple."
          subtitle="A good gym plan is easy to follow. Here’s how we do it."
        />

        <Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.title}
                className="rounded-3xl border border-black/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <AccentIcon accent={s.accent}>{s.icon}</AccentIcon>
                <p className="mt-4 text-sm font-bold text-black">{s.title}</p>
                <p className="mt-2 text-sm leading-6 text-black/70">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-black/10 bg-black/[0.02] p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-sm font-semibold text-black">New here?</p>
                <p className="mt-1 text-sm text-black/70">
                  Message your goal and your preferred time. We’ll tell you exactly what to do in Week 1.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappHref}
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white
                             transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  WhatsApp us
                </a>

                <a
                  href={`tel:${BRAND.phoneE164}`}
                  className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black/80
                             transition hover:bg-black/[0.02] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  Call
                </a>
              </div>
            </div>

            <p className="mt-4 text-xs text-black/55">
              If you can only do 3 days/week, that’s perfect. Just don’t change timings every week.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}