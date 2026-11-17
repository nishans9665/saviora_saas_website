import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { TakeHomeCalculatorView } from "@/components/calculators/take-home/TakeHomeCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Take-Home Salary Calculator | In-Hand Pay Estimator by Country – Saviora",
  },
  description: "Calculate your exact in-hand salary after retirement deductions, progressive income tax, and employer contributions. Free browser calculator.",
  alternates: {
    canonical: "https://saviora.app/free-tools/take-home-salary-calculator",
  },
  openGraph: {
    title: "Take-Home Salary Calculator | In-Hand Pay Estimator by Country – Saviora",
    description: "Calculate your exact in-hand salary after retirement deductions, progressive income tax, and employer contributions. Free browser calculator.",
    url: "https://saviora.app/free-tools/take-home-salary-calculator",
    siteName: "Saviora",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Saviora Take Home Salary Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { "@type": "Offer", price: "0.00", priceCurrency: "USD" },
    description: "Calculate your exact in-hand salary after retirement deductions, progressive income tax, and employer contributions. Free browser calculator.",
    url: "https://saviora.app/free-tools/take-home-salary-calculator",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://saviora.app" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://saviora.app/free-tools" },
      { "@type": "ListItem", position: 3, name: "Take Home Salary Calculator", item: "https://saviora.app/free-tools/take-home-salary-calculator" },
    ],
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <TakeHomeCalculatorView />
      </main>
      <Footer />
    </>
  );
}
