import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Saviora Pricing | Plans & 90-Day Free Trial",
  },
  description:
    "Explore Saviora pricing and features. Try Saviora Pro free for 90 days, then choose the monthly or yearly plan that fits your needs.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Saviora Pricing | Plans & 90-Day Free Trial",
    description:
      "Explore Saviora pricing and features. Try Saviora Pro free for 90 days, then choose the monthly or yearly plan that fits your needs.",
    url: "https://saviora.app/pricing",
    siteName: "Saviora",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Saviora personal finance app for expense tracking and budgeting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saviora Pricing | Plans & 90-Day Free Trial",
    description:
      "Explore Saviora pricing and features. Try Saviora Pro free for 90 days, then choose the monthly or yearly plan that fits your needs.",
    images: ["https://saviora.app/images/android-chrome-512x512.png"],
  },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
