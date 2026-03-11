import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

type Review = {
  name: string;
  tag: "Strength" | "Fat loss" | "Beginner" | "Mobility";
  rating: 5 | 4;
  text: string;
  when: string;
  avatar: string;
  accent: "blue" | "red";
};

const REVIEWS: Review[] = [
  {
    name: "Aman S.",
    tag: "Strength",
    rating: 5,
    text: "Form correction here is real. I stopped ego lifting and my numbers started going up without pain.",
    when: "2 weeks ago",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    accent: "blue",
  },
  {
    name: "Priya K.",
    tag: "Fat loss",
    rating: 5,
    text: "The best part is consistency. They helped me pick a time slot that I can actually follow.",
    when: "1 month ago",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    accent: "red",
  },
  {
    name: "Rohit V.",
    tag: "Beginner",
    rating: 5,
    text: "As a beginner I was nervous, but trainers are chill. Clean gym, good crowd, no judgement vibe.",
    when: "3 weeks ago",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    accent: "blue",
  },
  {
    name: "Neha R.",
    tag: "Mobility",
    rating: 5,
    text: "Mobility work + lifting plan changed everything. My shoulder feels better and workouts feel smoother.",
    when: "6 days ago",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    accent: "red",
  },
  {
    name: "Siddharth P.",
    tag: "Strength",
    rating: 4,
    text: "Equipment is solid and the place stays organized. Peak hours are busy but manageable.",
    when: "2 months ago",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    accent: "blue",
  },
  {
    name: "Isha M.",
    tag: "Fat loss",
    rating: 5,
    text: "Simple plans, no fancy talk. I’m down 4 kg and I feel more energetic through the day.",
    when: "5 weeks ago",
    avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    accent: "red",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={["h-4 w-4", i < rating ? "text-blue-600" : "text-black/15"].join(" ")}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TagPill({ tag, accent }: { tag: Review["tag"]; accent: Review["accent"] }) {
  const cls =
    accent === "blue"
      ? "bg-blue-600/10 text-blue-700 ring-blue-600/15"
      : "bg-red-500/10 text-red-700 ring-red-500/15";
  return <span className={`rounded-full px-3 py-1 text-xs ring-1 ${cls}`}>{tag}</span>;
}

function Verified() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-3 py-1 text-xs text-black/70 ring-1 ring-black/10">
      <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20 6 9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Verified member
    </span>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-black/[0.02] py-16">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="People stay because results feel real"
          subtitle="Real member feedback. We can swap these with Google reviews later."
        />

        <Reveal>
          {/* top strip */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path d="M8 9h8M8 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <div>
                <p className="text-sm font-semibold text-black">Member stories</p>
                <p className="text-xs text-black/60">Short, practical feedback from regulars</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Verified />
              <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-700 ring-1 ring-red-500/15">
                Updated weekly
              </span>
            </div>
          </div>

          {/* Desktop grid */}
          <div className="mt-6 hidden gap-4 lg:grid lg:grid-cols-3">
            {REVIEWS.slice(0, 6).map((r) => (
              <article
                key={r.name}
                className="rounded-3xl border border-black/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-blue-600/15">
                      <Image src={r.avatar} alt={`${r.name} avatar`} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{r.name}</p>
                      <p className="text-xs text-black/55">{r.when}</p>
                    </div>
                  </div>
                  <TagPill tag={r.tag} accent={r.accent} />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <Stars rating={r.rating} />
                  <span className="text-xs text-black/50">{r.rating}.0</span>
                </div>

                <p className="mt-3 text-sm leading-6 text-black/80">"{r.text}"</p>
              </article>
            ))}
          </div>

          {/* Mobile/tablet slider (native scroll) */}
          <div className="mt-6 lg:hidden">
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
              {REVIEWS.slice(0, 6).map((r) => (
                <article
                  key={r.name}
                  className="min-w-[280px] snap-start rounded-3xl border border-black/10 bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-blue-600/15">
                        <Image src={r.avatar} alt={`${r.name} avatar`} fill className="object-cover" sizes="40px" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{r.name}</p>
                        <p className="text-xs text-black/55">{r.when}</p>
                      </div>
                    </div>
                    <TagPill tag={r.tag} accent={r.accent} />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <Stars rating={r.rating} />
                    <span className="text-xs text-black/50">{r.rating}.0</span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-black/80">"{r.text}"</p>
                </article>
              ))}
            </div>

            <p className="mt-3 text-center text-xs text-black/50">Swipe to read more</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}