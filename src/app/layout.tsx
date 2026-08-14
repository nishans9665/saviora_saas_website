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
    default: "Saviora - Smart Personal Finance & Budget App",
    template: "%s | Saviora",
  },

  description:
    "Saviora is a smart personal finance app to track income and expenses, manage budgets, set savings goals, and take control of your financial future.",

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
    "Saviora",
    "personal finance app",
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
    // Next.js App Router auto-serves src/app/icon.svg as /icon.svg
    // We also expose it via /favicon.svg in public/ for broad browser support
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
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
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-5QRMZ7FN8M" />
      </body>
    </html>
  );
}