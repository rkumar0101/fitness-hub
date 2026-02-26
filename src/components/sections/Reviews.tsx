import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

const REVIEWS = [
  { name: "Member A", text: "Good trainers and clean equipment. Easy to stay consistent." },
  { name: "Member B", text: "Guidance is the best part. Feels premium, not crowded." },
  { name: "Member C", text: "Great vibe. Simple plans and helpful staff." },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-black/[0.02] py-16">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="People stay because results feel real"
          subtitle="Later we’ll swap these with Google reviews."
        />

        <Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-3xl border border-black/10 bg-white p-7">
                <p className="text-sm leading-6 text-black/80">“{r.text}”</p>
                <p className="mt-4 text-xs font-bold">{r.name}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}