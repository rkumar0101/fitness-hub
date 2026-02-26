import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

const TRAINERS = [
  { name: "Trainer A", role: "Strength & form", exp: "3+ years" },
  { name: "Trainer B", role: "Fat loss", exp: "4+ years" },
  { name: "Trainer C", role: "Beginner coaching", exp: "2+ years" },
  { name: "Trainer D", role: "Mobility", exp: "3+ years" },
];

export default function Trainers() {
  return (
    <section id="trainers" className="bg-black/[0.02] py-16">
      <Container>
        <SectionHeading
          eyebrow="Trainers"
          title="Real guidance, when you need it"
          subtitle="Form, progression, consistency. Bas."
        />

        <Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TRAINERS.map((t) => (
              <div key={t.name} className="rounded-3xl border border-black/10 bg-white p-6">
                <div className="h-12 w-12 rounded-2xl bg-red-500/10" />
                <p className="mt-4 text-sm font-bold">{t.name}</p>
                <p className="mt-1 text-sm text-black/70">{t.role}</p>
                <p className="mt-3 text-xs text-black/60">{t.exp}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}