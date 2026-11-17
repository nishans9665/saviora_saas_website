import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { MainFreeToolsDirectoryView } from "@/components/free-tools/MainFreeToolsDirectoryView";

export const metadata: Metadata = {
  title: {
    absolute: "Free Financial Calculators & Money Tools | Saviora",
  },
  description:
    "Explore free online financial calculators by Saviora. Calculate salary, income tax, loan payments, investment returns, savings goals, and more. No registration required.",
  keywords: [
    "free financial calculators",
    "financial planning tools",
    "money management tools",
    "personal finance calculators",
    "online loan calculator",
    "salary calculator",
    "investment calculator",
    "savings calculator",
    "free online calculators",
    "EMI calculator",
  ],
  alternates: {
    canonical: "https://saviora.app/free-tools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Free Financial Calculators & Money Tools | Saviora",
    description:
      "Explore free online financial calculators by Saviora. Calculate salary, income tax, loan payments, investment returns, savings goals, and more. No registration required.",
    url: "https://saviora.app/free-tools",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Financial Calculators & Money Management Tools – Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Financial Calculators & Money Tools | Saviora",
    description:
      "Explore free online financial calculators by Saviora. Calculate salary, income tax, loan payments, investment returns, savings goals, and more. No registration required.",
    images: ["https://saviora.app/images/og-image.png"],
    creator: "@Saviora",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/free-tools#webpage",
    url: "https://saviora.app/free-tools",
    name: "Free Financial Calculators & Money Management Tools | Saviora",
    description:
      "Explore free online financial calculators by Saviora. Calculate salary, income tax, loan payments, investment returns, savings goals, and more. No registration required.",
    publisher: {
      "@type": "Organization",
      name: "Saviora",
      url: "https://saviora.app",
      logo: {
        "@type": "ImageObject",
        url: "https://saviora.app/icon.png",
      },
    },
  },
  {
    "@context": "https://schema.org",
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
        name: "Free Tools",
        item: "https://saviora.app/free-tools",
      },
    ],
  },
];

export default function FreeToolsDirectoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <MainFreeToolsDirectoryView />
      </main>
      <Footer />
    </>
  );
}
