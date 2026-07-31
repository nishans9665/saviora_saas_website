import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import logoSaviora from "@/assets/logo/logo-saviora-web-tag.svg";
import stripeSecureImg from "@/assets/stripe-secure-img2.svg";

export function Footer() {
  const currentYear = 2026;

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/savioraofficial/",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <path d="M2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/savioraglobal/",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/savioraglobal/",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    },
    {
      name: "X",
      href: "https://x.com/SavioraOfficial",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    // {
    //   name: "YouTube",
    //   href: "#",
    //   icon: (
    //     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //       <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    //       <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    //     </svg>
    //   ) 
    // },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@savioraofficial",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-white border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src={logoSaviora} alt="Saviora" width={250} height={80} unoptimized priority className="h-15 w-auto object-contain" />
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-4">
              Take control of your finances with smart budgeting, expense tracking, savings goals, and powerful financial insights - all in one secure platform.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <span className="text-emerald-500 font-bold">✓</span> Secure Payments
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <span className="text-emerald-500 font-bold">✓</span> 30-Day Free Trial
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <span className="text-emerald-500 font-bold">✓</span> Cancel Anytime
              </div>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white transition-all flex items-center justify-center"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/savings" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Savings Goals</Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link href="/changelog" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Changelog</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Legal</h3>
            <ul className="space-y-3 mb-4">
              <li>
                <Link href="/privacy-policy" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Returns & Refunds Policy</Link>
              </li>
            </ul>
            <div className="pt-2">
              <Image
                src={stripeSecureImg}
                alt="Stripe Secure Payments"
                width={200}
                height={70}
                className="h-auto w-44 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <p>
            © {currentYear} Saviora. All rights reserved.
          </p>
          <p>
            Powered by{" "}
            <a
              href="http://codefoxit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-700 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 decoration-slate-300 dark:decoration-slate-700 underline-offset-4 transition-colors"
            >
              CodefoxIT
            </a>
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Your financial data is protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
