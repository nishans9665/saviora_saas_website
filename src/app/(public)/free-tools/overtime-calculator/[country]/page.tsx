import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { OvertimeCalculatorView } from "@/components/calculators/overtime/OvertimeCalculatorView";
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
      absolute: `${profile.name} Overtime Pay Calculator | Free Calculator – Saviora`,
    },
    description: `Free ${profile.name} Overtime Pay Calculator. Calculate figures under official ${profile.taxAuthorityName} statutory regulations in ${profile.defaultCurrency}.`,
    alternates: {
      canonical: `https://saviora.app/free-tools/overtime-calculator/${country}`,
    },
    openGraph: {
      title: `${profile.name} Overtime Pay Calculator | Saviora`,
      description: `Free browser-based Overtime Pay Calculator for ${profile.name}. 100% private.`,
      url: `https://saviora.app/free-tools/overtime-calculator/${country}`,
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
      name: `Saviora ${profile.name} Overtime Pay Calculator`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web, iOS, Android",
      offers: { "@type": "Offer", price: "0.00", priceCurrency: profile.defaultCurrency },
      description: `Interactive Overtime Pay Calculator for ${profile.name}.`,
      url: `https://saviora.app/free-tools/overtime-calculator/${country}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://saviora.app" },
        { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://saviora.app/free-tools" },
        { "@type": "ListItem", position: 3, name: "Overtime Pay Calculator", item: "https://saviora.app/free-tools/overtime-calculator" },
        { "@type": "ListItem", position: 4, name: profile.name, item: `https://saviora.app/free-tools/overtime-calculator/${country}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <OvertimeCalculatorView initialCountry={countryId} />
      </main>
      <Footer />
    </>
  );
}
