import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const siteUrl = "https://saviora.app";

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: { 
    default: "Free Expense Tracker & Budget Planning App | Saviora",
    template: "%s | Saviora",
  },

  description:
    "Saviora is a free personal finance management system. Track daily expenses, plan budgets, manage income, and reach your savings goals effortlessly.",

  applicationName: "Saviora",

  authors: [
    {
      name: "Saviora",
      url: siteUrl,
    },
  ],

  creator: "Saviora",

  publisher: "Saviora",

  keywords: [
    "Saviora Free",
    "Free Expense Tracker",
    "Budget Planning App",
    "Personal Finance Management System",
    "budget app",
    "budget planner",
    "tracking expenses",
    "Expense Tracker",
    "Income Tracker",
    "Savings Goals",
    "expense tracker app",
    "Money Manager",
    "Financial Planning",
    "personal budget app",
    "Personal Budget",
    "Budget Management",
    "Expense Management",
    "Finance Dashboard",
    "Monthly Budget",
    "Cash Flow",
    "Financial Reports",
    "Money Management App",
    "Finance Software",
    "Budget App",
    "savings goal tracker",
    "Personal Finance Software",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Saviora - Grow Your Financial Future",
    description:
      "Saviora is a smart personal finance app to track income and expenses, manage budgets, set savings goals, and take control of your financial future.",
    url: siteUrl,
    siteName: "Saviora",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: `${siteUrl}/assets/logo/social-share-logo.png`,
        width: 600,
        height: 600,
        alt: "Saviora - Grow Your Financial Future",
        type: "image/png",
      },
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Saviora - Grow Your Financial Future",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Saviora - Grow Your Financial Future",
    description:
      "Saviora is a smart personal finance app to track income and expenses, manage budgets, set savings goals, and take control of your financial future.",
    images: [`${siteUrl}/assets/logo/social-share-logo.png`],
    creator: "@Saviora",
  },

  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico", "/favicon-48x48.png"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png",
      },
    ],
  },

  manifest: "/site.webmanifest",

  category: "Finance",

  appleWebApp: {
    capable: true,
    title: "Saviora",
    statusBarStyle: "default",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  verification: {
    other: {
      "p:domain_verify": "d1f19d7c6085d9fca56614f1f4bb3e3f",
    },
  },
};

import { CookieConsent } from "@/components/ui/CookieConsent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                var clean = function() {
                  try {
                    var els = document.querySelectorAll('[bis_skin_checked]');
                    for (var i = 0; i < els.length; i++) {
                      els[i].removeAttribute('bis_skin_checked');
                    }
                  } catch (e) {}
                };
                clean();
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', clean);
                }
                if (window.MutationObserver) {
                  var observer = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.attributeName === 'bis_skin_checked') {
                        m.target.removeAttribute('bis_skin_checked');
                      }
                    }
                  });
                  if (document.documentElement) {
                    observer.observe(document.documentElement, {
                      attributes: true,
                      subtree: true,
                      attributeFilter: ['bis_skin_checked']
                    });
                  }
                  setTimeout(function() {
                    clean();
                    observer.disconnect();
                  }, 3000);
                }
              })();
            `,
          }}
        />
        <link rel="dns-prefetch" href="https://cloud.saviora.app" />
        <link rel="preconnect" href="https://cloud.saviora.app" crossOrigin="anonymous" />
        {/* Google Search Favicon Crawler requirements */}
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/favicon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        {children}
        <CookieConsent />
        <Analytics />
        <GoogleAnalytics gaId="G-5QRMZ7FN8M" />
      </body>
    </html>
  );
}