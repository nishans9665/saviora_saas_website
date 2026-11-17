import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { EPFCalculatorView } from "@/components/calculators/epf/EPFCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Pension & Retirement Calculator | 401(k), Super, CPF, EPF Contributions – Saviora",
  },
  description: "Calculate employee deductions and employer contributions for 401(k), Superannuation, CPF, CPP, and EPF. Includes compound interest growth forecasting.",
  alternates: {
    canonical: "https://saviora.app/free-tools/epf-calculator",
  },
  openGraph: {
    title: "Pension & Retirement Calculator | 401(k), Super, CPF, EPF Contributions – Saviora",
    description: "Calculate employee deductions and employer contributions for 401(k), Superannuation, CPF, CPP, and EPF. Includes compound interest growth forecasting.",
    url: "https://saviora.app/free-tools/epf-calculator",
    siteName: "Saviora",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Saviora Epf Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { "@type": "Offer", price: "0.00", priceCurrency: "USD" },
    description: "Calculate employee deductions and employer contributions for 401(k), Superannuation, CPF, CPP, and EPF. Includes compound interest growth forecasting.",
    url: "https://saviora.app/free-tools/epf-calculator",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://saviora.app" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://saviora.app/free-tools" },
      { "@type": "ListItem", position: 3, name: "Epf Calculator", item: "https://saviora.app/free-tools/epf-calculator" },
    ],
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <EPFCalculatorView />
      </main>
      <Footer />
    </>
  );
}
