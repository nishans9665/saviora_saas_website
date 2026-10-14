import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { SmartFeatures } from "@/components/sections/SmartFeatures";
import { Showcases } from "@/components/sections/Showcases";
import { FAQ } from "@/components/sections/FAQ";
import { faqs } from "@/lib/faqs";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Free Expense Tracker & Budget Planner App | Saviora",
  description:
    "Track income and expenses, plan monthly budgets, and monitor savings goals with Saviora, your personal finance app. Start your 90-day Pro trial today.",
  alternates: {
    canonical: "https://saviora.app/",
  },
  openGraph: {
    title: "Free Expense Tracker & Budget Planner App | Saviora",
    description:
      "Track income and expenses, plan monthly budgets, and monitor savings goals with Saviora, your personal finance app. Start your 90-day Pro trial today.",
    url: "https://saviora.app/",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saviora personal finance app for expense tracking and budgeting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Expense Tracker & Budget Planner App | Saviora",
    description:
      "Track income and expenses, plan monthly budgets, and monitor savings goals with Saviora, your personal finance app. Start your 90-day Pro trial today.",
    images: ["https://saviora.app/assets/logo/social-share-logo.png"],
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Saviora",
    url: "https://saviora.app",
    logo: "https://saviora.app/icon.png",
    description:
      "Saviora provides an all-in-one personal finance app for expense tracking, monthly budgeting, and savings goal planning.",
    sameAs: [
      "https://x.com/SavioraOfficial",
      "https://www.linkedin.com/company/savioraofficial/",
      "https://www.facebook.com/savioraglobal/",
      "https://www.instagram.com/savioraglobal/",
      "https://www.tiktok.com/@savioraofficial",
      "https://www.pinterest.com/savioraapp/",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Saviora",
    url: "https://saviora.app",
    description: "Personal Finance & Budget Tracker",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Saviora",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://saviora.app",
    description:
      "Saviora is an intuitive personal finance and budget tracking application. Track daily income and expenses, plan monthly budgets, and reach savings goals.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "90-day free trial with full Pro access, no credit card required.",
    },
    featureList: [
      "Income Tracking",
      "Expense Tracking",
      "Monthly Budget Planning",
      "Savings Goal Tracker",
      "Financial Health Analytics",
      "Multi-Currency Support",
      "Exportable PDF and CSV Reports",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function Home() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <Features />
        <SmartFeatures />
        <Showcases />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
