import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

const STEPS = [
  { title: "WhatsApp us", desc: "Tell us your goal and preferred timing." },
  { title: "Take a trial", desc: "Quick orientation so you feel comfortable." },
  { title: "Start your plan", desc: "A routine you can actually follow." },
];

export default function HowToStart() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="How to start"
          title="3 steps. Zero drama."
          subtitle="Simple onboarding so you don’t overthink it."
        />

        <Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-3xl border border-black/10 bg-white p-7">
                <div className="text-xs font-bold text-black/60">Step {i + 1}</div>
                <h3 className="mt-2 text-sm font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}