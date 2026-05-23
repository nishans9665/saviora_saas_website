import React from "react";
import Link from "next/link";
import { MessageCircle, Globe, Share2, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Saviora</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
              Track your income, manage expenses, create budgets, and grow your savings with a modern AI-powered personal finance platform.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                <Globe className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                <Mail className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
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
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies" className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {currentYear} Saviora Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-slate-500 dark:text-slate-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
