import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Facilities from "@/components/sections/Facilities";
// import Programs from "@/components/sections/Programs";
import Plans from "@/components/sections/Plans";
import Trainers from "@/components/sections/Trainers";
import Schedule from "@/components/sections/Schedule";
import Reviews from "@/components/sections/Reviews";
import HowToStart from "@/components/sections/HowToStart";
import LocationContact from "@/components/sections/LocationContact";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import PlanBuilder from "@/components/sections/PlanBuilder";
// import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Facilities />
        <PlanBuilder />
        {/* <Programs /> */}
        <Plans />
        <Trainers />
        <Schedule />
        <Reviews />
        <HowToStart />
        <LocationContact />
        <FAQ />
      </main>
      <Footer />
      {/* <FloatingWhatsApp /> */}
    </>
  );
}