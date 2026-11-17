import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { OvertimeCalculatorView } from "@/components/calculators/overtime/OvertimeCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Overtime Pay Calculator | 1.5x & 2.0x Overtime Wage Calculator – Saviora",
  },
  description: "Calculate standard hourly rates, 1.5x normal overtime, and double-time holiday pay under governing employment standards and labour acts.",
  alternates: {
    canonical: "https://saviora.app/free-tools/overtime-calculator",
  },
  openGraph: {
    title: "Overtime Pay Calculator | 1.5x & 2.0x Overtime Wage Calculator – Saviora",
    description: "Calculate standard hourly rates, 1.5x normal overtime, and double-time holiday pay under governing employment standards and labour acts.",
    url: "https://saviora.app/free-tools/overtime-calculator",
    siteName: "Saviora",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Saviora Overtime Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { "@type": "Offer", price: "0.00", priceCurrency: "USD" },
    description: "Calculate standard hourly rates, 1.5x normal overtime, and double-time holiday pay under governing employment standards and labour acts.",
    url: "https://saviora.app/free-tools/overtime-calculator",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://saviora.app" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://saviora.app/free-tools" },
      { "@type": "ListItem", position: 3, name: "Overtime Calculator", item: "https://saviora.app/free-tools/overtime-calculator" },
    ],
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <OvertimeCalculatorView />
      </main>
      <Footer />
    </>
  );
}
