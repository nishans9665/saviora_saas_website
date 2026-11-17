import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SalaryCalculatorView } from "@/components/calculators/salary/SalaryCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Global Salary Calculator | Calculate Gross to Net Pay by Country – Saviora",
  },
  description: "Free multi-country salary calculator. Calculate monthly gross salary, pension deductions, income tax, net take-home pay, and Cost to Company (CTC) across US, UK, Australia, Canada, India, Sri Lanka, Singapore, and UAE.",
  alternates: {
    canonical: "https://saviora.app/free-tools/salary-calculator",
  },
  openGraph: {
    title: "Global Salary Calculator | Calculate Gross to Net Pay by Country – Saviora",
    description: "Free multi-country salary calculator. Calculate monthly gross salary, pension deductions, income tax, net take-home pay, and Cost to Company (CTC) across US, UK, Australia, Canada, India, Sri Lanka, Singapore, and UAE.",
    url: "https://saviora.app/free-tools/salary-calculator",
    siteName: "Saviora",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Saviora Salary Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { "@type": "Offer", price: "0.00", priceCurrency: "USD" },
    description: "Free multi-country salary calculator. Calculate monthly gross salary, pension deductions, income tax, net take-home pay, and Cost to Company (CTC) across US, UK, Australia, Canada, India, Sri Lanka, Singapore, and UAE.",
    url: "https://saviora.app/free-tools/salary-calculator",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://saviora.app" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://saviora.app/free-tools" },
      { "@type": "ListItem", position: 3, name: "Salary Calculator", item: "https://saviora.app/free-tools/salary-calculator" },
    ],
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <SalaryCalculatorView />
      </main>
      <Footer />
    </>
  );
}
