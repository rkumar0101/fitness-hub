import { Container } from "@/components/ui/Container";
import { BRAND } from "@/lib/constants";

const LINKS = [
  { label: "Facilities", href: "#facilities" },
  { label: "Programs", href: "#programs" },
  { label: "Plans", href: "#plans" },
  { label: "Trainers", href: "#trainers" },
  { label: "Schedule", href: "#schedule" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-white">
      <Container>
        <div className="py-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <div className="inline-flex items-center gap-2">
                <div className="h-10 w-10 rounded-2xl bg-blue-600/10 ring-1 ring-blue-600/15" />
                <div>
                  <p className="text-sm font-extrabold tracking-tight text-black">Fitness Hub</p>
                  <p className="text-xs text-black/60">Train smart. Stay consistent.</p>
                </div>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-6 text-black/70">
                A clean gym with practical coaching. No confusion, no ego, just results you can repeat.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs text-blue-700 ring-1 ring-blue-600/15">
                  Open 6 AM – 10 PM
                </span>
                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-700 ring-1 ring-red-500/15">
                  Mon–Sat
                </span>
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="text-sm font-semibold text-black">Quick links</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-sm text-black/70 transition hover:text-black"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-sm font-semibold text-black">Contact</p>
              <div className="mt-4 space-y-2 text-sm text-black/70">
                <p>
                  Phone:{" "}
                  <a className="font-semibold text-black/80 hover:text-black" href={`tel:${BRAND.phoneE164}`}>
                    {BRAND.phoneE164}
                  </a>
                </p>
                <p>
                  WhatsApp:{" "}
                  <a className="font-semibold text-black/80 hover:text-black" href={`https://wa.me/${BRAND.phoneE164.replace("+", "")}`}>
                    Message us
                  </a>
                </p>
                {BRAND.email ? (
                  <p>
                    Email:{" "}
                    <a className="font-semibold text-black/80 hover:text-black" href={`mailto:${BRAND.email}`}>
                      {BRAND.email}
                    </a>
                  </p>
                ) : null}
              </div>

              <div className="mt-5 rounded-3xl border border-black/10 bg-black/[0.02] p-5">
                <p className="text-sm font-semibold text-black">New member tip</p>
                <p className="mt-2 text-sm text-black/70">
                  Pick a time slot you can repeat. Your routine becomes automatic after 2–3 weeks.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-black/55">© {year} Fitness Hub. All rights reserved.</p>
            <div className="flex flex-wrap gap-3 text-xs text-black/55">
              <a href="#contact" className="hover:text-black">
                Privacy
              </a>
              <a href="#contact" className="hover:text-black">
                Terms
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}