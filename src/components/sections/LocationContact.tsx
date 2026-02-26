import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BRAND, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Motion";

export default function LocationContact() {
  const href = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <section id="location" className="bg-black/[0.02] py-16">
      <Container>
        <SectionHeading
          eyebrow="Location & contact"
          title="Visit Fitness Hub"
          subtitle="Message us for a trial. We’ll guide you based on your goal."
        />

        <Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <p className="text-sm font-bold">{BRAND.cityLine}</p>
              <p className="mt-2 text-sm text-black/70">{BRAND.addressLine}</p>

              <div className="mt-5 space-y-1 text-sm text-black/70">
                <p>{BRAND.hours.weekdays}</p>
                <p>{BRAND.hours.sunday}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={href} target="_blank">
                  WhatsApp for trial
                </Button>
                <Button variant="secondary" href="#plans">
                  View plans
                </Button>
              </div>

              <p className="mt-3 text-xs text-black/60">
                Tip: WhatsApp message me apna goal + preferred time likh dena.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
              <iframe
                title="Gym location map"
                src={BRAND.mapEmbedUrl}
                className="h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}