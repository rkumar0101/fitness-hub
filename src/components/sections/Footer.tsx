import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BRAND, BRANCHES, NAV_LINKS, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";

const AREAS = BRANCHES.map((branch) => branch.area);

export default function Footer() {
  const year = new Date().getFullYear();
  const whatsappHref = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <footer className="relative overflow-hidden bg-[#07111F] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(225,29,46,0.18),transparent_32rem),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.16),transparent_28rem)]" />
      <Container>
        <div className="relative py-14">
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:p-8 lg:grid-cols-[1.15fr_0.85fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/15 bg-white">
                  <Image
                    src="/samz-fitness-hub.jpeg"
                    alt={`${BRAND.name} logo`}
                    fill
                    className="object-contain"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="text-xl font-extrabold tracking-tight">
                    {BRAND.name}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/45">
                    Siliguri fitness network
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
                Area-wise gyms, membership plans, personal training, and
                morning-evening slots for members across Siliguri.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  WhatsApp now
                </a>
                <a
                  href="#plans"
                  className="inline-flex rounded-2xl border border-white/15 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                  View memberships
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-extrabold">Explore</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/70 transition hover:bg-white/[0.08] hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-extrabold">Contact</p>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                <a href="tel:+919832589366" className="block hover:text-white">
                  +91 9832589366
                </a>
                <a href={`mailto:${BRAND.email}`} className="block break-all hover:text-white">
                  {BRAND.email}
                </a>
                <p className="leading-6">{BRAND.addressLine}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {AREAS.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/65"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col gap-3 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {BRAND.name}. All rights reserved.
            </p>
            <p>Admission charge nil till offer. Sunday closed.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
