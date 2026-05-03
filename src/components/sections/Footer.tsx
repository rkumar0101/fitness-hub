import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BRAND, BRANCHES } from "@/lib/constants";

const LINKS = [
  { label: "Plans", href: "#plans" },
  { label: "Branches", href: "#branches" },
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
            <div>
              <div className="inline-flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-black/10 bg-white">
                  <Image
                    src="/samz-fitness-hub.jpeg"
                    alt={`${BRAND.name} logo`}
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-sm font-extrabold tracking-tight text-black">
                    {BRAND.name}
                  </p>
                  <p className="text-xs text-black/60">
                    {BRANCHES.length} branches in Siliguri
                  </p>
                </div>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-6 text-black/70">
                Branch-wise memberships, personal training, and morning-evening
                training slots. Admission charge is nil till offer.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs text-blue-700 ring-1 ring-blue-600/15">
                  Mon-Sat
                </span>
                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-700 ring-1 ring-red-500/15">
                  Sunday closed
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-black">Quick links</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-black/70 transition hover:text-black"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-black">Contact</p>
              <div className="mt-4 space-y-2 text-sm text-black/70">
                <p>
                  Phone:{" "}
                  <a
                    className="font-semibold text-black/80 hover:text-black"
                    href={`tel:${BRAND.phoneE164}`}
                  >
                    +91 9832589366
                  </a>
                </p>
                <p>
                  WhatsApp:{" "}
                  <a
                    className="font-semibold text-black/80 hover:text-black"
                    href={`https://wa.me/${BRAND.phoneE164}`}
                  >
                    Message us
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    className="font-semibold text-black/80 hover:text-black"
                    href={`mailto:${BRAND.email}`}
                  >
                    {BRAND.email}
                  </a>
                </p>
              </div>

              <div className="mt-5 rounded-3xl border border-black/10 bg-black/[0.02] p-5">
                <p className="text-sm font-semibold text-black">Registered address</p>
                <p className="mt-2 text-sm leading-6 text-black/70">
                  {BRAND.addressLine}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-black/55">
              © {year} {BRAND.name}. All rights reserved.
            </p>
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
