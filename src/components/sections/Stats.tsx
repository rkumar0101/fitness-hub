import { Container } from "@/components/ui/Container";
import { BRAND, BRANCHES } from "@/lib/constants";

const minMonthly = Math.min(...BRANCHES.map((branch) => branch.pricing.monthly));
const minPt = Math.min(...BRANCHES.map((branch) => branch.pricing.ptMonthly));

const STATS = [
  {
    label: "Branches",
    value: `${BRANCHES.length}`,
    hint: "Across Siliguri",
  },
  {
    label: "Admission",
    value: "Nil",
    hint: "Till offer",
  },
  {
    label: "Monthly plans",
    value: `Rs. ${minMonthly}`,
    hint: "Starting price",
  },
  {
    label: "Personal training",
    value: `Rs. ${minPt}`,
    hint: "Starting per month",
  },
];

export default function Stats() {
  return (
    <section className="border-y border-black/10 bg-white">
      <Container>
        <div className="grid gap-4 py-10 sm:grid-cols-2 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold text-black/55">
                {stat.label}
              </p>
              <p className="mt-3 text-2xl font-extrabold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-black/60">{stat.hint}</p>
            </div>
          ))}
        </div>
        <p className="-mt-4 pb-8 text-center text-xs text-black/50">
          For more information kindly contact{" "}
          {BRAND.phoneE164.replace(/^91/, "+91 ")}.
        </p>
      </Container>
    </section>
  );
}
