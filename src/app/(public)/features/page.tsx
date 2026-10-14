import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Features } from "@/components/sections/Features";
import { SmartFeatures } from "@/components/sections/SmartFeatures";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Features - Personal Finance & Budget Tracker | Saviora",
  description:
    "Explore Saviora features: smart expense tracking, interactive budget planning, savings goals, cash flow projections, and data security.",
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "Features | Saviora",
    description:
      "Explore Saviora features: smart expense tracking, interactive budget planning, savings goals, and data security.",
    url: "https://saviora.app/features",
  },
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
      <Navbar />
      <div className="pt-24 pb-16">
        <Features />
        <SmartFeatures />
        <FinalCTA />
      </div>
      <Footer />
    </main>
  );
}
