import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { GratuityCalculatorView } from "@/components/calculators/gratuity/GratuityCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Gratuity & Severance Calculator | Statutory Payout by Country – Saviora",
  },
  description: "Estimate statutory end-of-service gratuity, redundancy pay, or severance based on service tenure and last drawn basic salary under national labour acts.",
  alternates: {
    canonical: "https://saviora.app/free-tools/gratuity-calculator",
  },
  openGraph: {
    title: "Gratuity & Severance Calculator | Statutory Payout by Country – Saviora",
    description: "Estimate statutory end-of-service gratuity, redundancy pay, or severance based on service tenure and last drawn basic salary under national labour acts.",
    url: "https://saviora.app/free-tools/gratuity-calculator",
    siteName: "Saviora",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Saviora Gratuity Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { "@type": "Offer", price: "0.00", priceCurrency: "USD" },
    description: "Estimate statutory end-of-service gratuity, redundancy pay, or severance based on service tenure and last drawn basic salary under national labour acts.",
    url: "https://saviora.app/free-tools/gratuity-calculator",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://saviora.app" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://saviora.app/free-tools" },
      { "@type": "ListItem", position: 3, name: "Gratuity Calculator", item: "https://saviora.app/free-tools/gratuity-calculator" },
    ],
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <GratuityCalculatorView />
      </main>
      <Footer />
    </>
  );
}
