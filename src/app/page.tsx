import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Features } from "@/components/sections/Features";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { SmartFeatures } from "@/components/sections/SmartFeatures";
import { Showcases } from "@/components/sections/Showcases";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <TrustedBy />
        <Features />
        <DashboardShowcase />
        <SmartFeatures />
        <Showcases />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
