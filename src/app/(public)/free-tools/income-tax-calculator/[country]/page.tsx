import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { IncomeTaxCalculatorView } from "@/components/calculators/income-tax/IncomeTaxCalculatorView";
import { ALL_COUNTRY_IDS, getCountryProfile } from "@/lib/calculators/rules/countryRegistry";
import { SupportedCountryId } from "@/lib/calculators/types";

interface PageProps {
  params: Promise<{ country: string }>;
}

export function generateStaticParams() {
  return ALL_COUNTRY_IDS.map((country) => ({ country }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  if (!ALL_COUNTRY_IDS.includes(country as SupportedCountryId)) {
    return { title: "Calculator Not Found – Saviora" };
  }
  const profile = getCountryProfile(country as SupportedCountryId);

  return {
    title: {
      absolute: `${profile.name} Income Tax Calculator | Free Calculator – Saviora`,
    },
    description: `Free ${profile.name} Income Tax Calculator. Calculate figures under official ${profile.taxAuthorityName} statutory regulations in ${profile.defaultCurrency}.`,
    alternates: {
      canonical: `https://saviora.app/free-tools/income-tax-calculator/${country}`,
    },
    openGraph: {
      title: `${profile.name} Income Tax Calculator | Saviora`,
      description: `Free browser-based Income Tax Calculator for ${profile.name}. 100% private.`,
      url: `https://saviora.app/free-tools/income-tax-calculator/${country}`,
      siteName: "Saviora",
      type: "website",
    },
  };
}

export default async function CountryToolPage({ params }: PageProps) {
  const { country } = await params;
  if (!ALL_COUNTRY_IDS.includes(country as SupportedCountryId)) {
    notFound();
  }
  const countryId = country as SupportedCountryId;
  const profile = getCountryProfile(countryId);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `Saviora ${profile.name} Income Tax Calculator`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web, iOS, Android",
      offers: { "@type": "Offer", price: "0.00", priceCurrency: profile.defaultCurrency },
      description: `Interactive Income Tax Calculator for ${profile.name}.`,
      url: `https://saviora.app/free-tools/income-tax-calculator/${country}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://saviora.app" },
        { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://saviora.app/free-tools" },
        { "@type": "ListItem", position: 3, name: "Income Tax Calculator", item: "https://saviora.app/free-tools/income-tax-calculator" },
        { "@type": "ListItem", position: 4, name: profile.name, item: `https://saviora.app/free-tools/income-tax-calculator/${country}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <IncomeTaxCalculatorView initialCountry={countryId} />
      </main>
      <Footer />
    </>
  );
}
