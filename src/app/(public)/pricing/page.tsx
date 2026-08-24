import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Pricing & 90-Day Launch Offer | Saviora Pro",
  description:
    "Try Saviora Pro free for 90 days with full access. Simple, transparent pricing starting at $2.99/month or $29.99/year. No credit card required.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing & 90-Day Launch Offer | Saviora Pro",
    description:
      "Try Saviora Pro free for 90 days with full access. Simple, transparent pricing starting at $2.99/month or $29.99/year. No credit card required.",
    url: "https://saviora.app/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
