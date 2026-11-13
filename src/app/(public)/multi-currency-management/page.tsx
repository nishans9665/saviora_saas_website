import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CurrencyHero } from "@/components/multi-currency/CurrencyHero";
import { CurrencySelection } from "@/components/multi-currency/CurrencySelection";
import { RegionalPreferences } from "@/components/multi-currency/RegionalPreferences";
import { FinancialOverviewSection } from "@/components/multi-currency/FinancialOverviewSection";
import { GlobalPreferencesSection } from "@/components/multi-currency/GlobalPreferencesSection";
import { CurrencySetupSteps } from "@/components/multi-currency/CurrencySetupSteps";
import { CurrencyRelatedFeatures } from "@/components/multi-currency/CurrencyRelatedFeatures";
import { CurrencyFAQ } from "@/components/multi-currency/CurrencyFAQ";
import { currencyFaqData } from "@/components/multi-currency/faq-data";
import { CurrencyFinalCTA } from "@/components/multi-currency/CurrencyFinalCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Multi-Currency Management for Personal Finance | Saviora",
  },
  description:
    "Choose your preferred main currency and personalize your financial settings with Saviora. Organize income, expenses, budgets, and savings in one place.",
  keywords: [
    "multi-currency personal finance app",
    "currency settings",
    "personal finance app",
    "money management app",
    "currency selection",
    "multi-currency budgeting",
    "track expenses in preferred currency",
    "personal finance localization",
    "Saviora multi-currency",
  ],
  alternates: {
    canonical: "https://saviora.app/multi-currency-management",
  },
  openGraph: {
    title: "Multi-Currency Management for Personal Finance | Saviora",
    description:
      "Choose your preferred main currency and personalize your financial settings with Saviora. Organize income, expenses, budgets, and savings in one place.",
    url: "https://saviora.app/multi-currency-management",
    siteName: "Saviora",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Multi-Currency Management for Personal Finance | Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi-Currency Management for Personal Finance | Saviora",
    description:
      "Choose your preferred main currency and personalize your financial settings with Saviora. Organize income, expenses, budgets, and savings in one place.",
    images: ["https://saviora.app/images/og-image.png"],
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/multi-currency-management#webpage",
    url: "https://saviora.app/multi-currency-management",
    name: "Multi-Currency Management for Personal Finance | Saviora",
    description:
      "Choose your preferred main currency and personalize your financial settings with Saviora. Organize income, expenses, budgets, and savings in one place.",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://saviora.app/#website",
      name: "Saviora",
      url: "https://saviora.app",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://saviora.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Features",
          item: "https://saviora.app/features",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Multi-Currency Management",
          item: "https://saviora.app/multi-currency-management",
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Saviora Multi-Currency Management",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    url: "https://saviora.app/multi-currency-management",
    description:
      "Choose your preferred main currency and personalize your financial settings with Saviora. Organize income, expenses, budgets, and savings in one place.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "90-day free trial with full Pro access, no credit card required.",
    },
    featureList: [
      "Select Main Currency from Supported Global Currencies (USD, EUR, GBP, CAD, AUD, and more)",
      "Unified Currency Formatting Across Dashboard, Income, Expenses, Budgets, and Savings",
      "Independent Country and Currency Configuration",
      "Custom Timezone and Language Controls",
      "Configurable Financial Year (e.g. January - December) and Budget Cycle Options",
      "Real Localization Settings Screen Integration",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: currencyFaqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function MultiCurrencyManagementPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      {/* Section 1: Header and Navigation */}
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Section 1: Hero */}
        <CurrencyHero />

        {/* Section 2: Currency Selection */}
        <CurrencySelection />

        {/* Section 3: Regional Preferences */}
        <RegionalPreferences />

        {/* Section 4: Financial Overview */}
        <FinancialOverviewSection />

        {/* Section 5: Designed for Different Financial Preferences */}
        <GlobalPreferencesSection />

        {/* Section 6: How to Change Your Main Currency */}
        <CurrencySetupSteps />

        {/* Section: Explore More Saviora Features (Internal Linking) */}
        <CurrencyRelatedFeatures />

        {/* Section 7: FAQs */}
        <CurrencyFAQ />

        {/* Section 8: Final Call to Action */}
        <CurrencyFinalCTA />
      </main>

      {/* Section 9: Footer */}
      <Footer />
    </>
  );
}
