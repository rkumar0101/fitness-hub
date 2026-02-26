import { Container } from "@/components/ui/Container";
import { BRAND } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white py-10">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              FH
            </span>
            <span>{BRAND.name}</span>
          </div>

          <p className="text-xs text-black/60">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>

        <div className="mt-4 text-xs text-black/60">
          <p>{BRAND.addressLine}</p>
          <p className="mt-1">
            {BRAND.hours.weekdays} • {BRAND.hours.sunday}
          </p>
        </div>
      </Container>
    </footer>
  );
}