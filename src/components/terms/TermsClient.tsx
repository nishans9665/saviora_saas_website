"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import {
  FileText,
  ShieldCheck,
  Lock,
  UserCheck,
  UserX,
  Scale,
  AlertTriangle,
  Info,
  Calendar,
  Clock,
  Shield,
  Mail,
  Smartphone,
  Wifi,
  RefreshCw,
  ChevronRight,
  ArrowRight,
  Trash2,
  Archive,
  Copyright,
  Sparkles,
  Server,
  Menu,
  X,
  Zap,
  Sliders,
  CheckSquare,
  Layers,
} from "lucide-react";

interface SectionItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SECTIONS: SectionItem[] = [
  { id: "introduction", title: "1. Introduction", icon: FileText },
  { id: "accounts", title: "2. Accounts", icon: UserCheck },
  { id: "intellectual-property", title: "3. Intellectual Property", icon: Copyright },
  { id: "limitation-of-liability", title: "4. Limitation of Liability", icon: AlertTriangle },
  { id: "disclaimer", title: "5. Disclaimer", icon: Shield },
  { id: "governing-law", title: "6. Governing Law", icon: Scale },
  { id: "availability", title: "7. Availability", icon: Smartphone },
  { id: "inactive-accounts", title: "8. Inactive Accounts", icon: Clock },
  { id: "changes-to-terms", title: "9. Changes to Terms", icon: RefreshCw },
  { id: "contact-us", title: "10. Contact Us", icon: Mail },
];

export function TermsClient() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  // ScrollSpy & Progress Indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      const sectionElements = SECTIONS.map((sec) => document.getElementById(sec.id));
      const scrollPosition = window.scrollY + 220;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileTocOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-primary-500 to-emerald-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="flex flex-col min-h-screen pt-28 pb-24 relative overflow-clip bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] max-w-[1200px] opacity-25 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          {/* HERO SECTION */}
          <section className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs md:text-sm font-semibold mb-6 border border-emerald-200 dark:border-emerald-800/60 shadow-xs">
                <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Legal Terms of Agreement
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                Terms & <span className="text-gradient">Conditions</span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">
                Please read these Terms & Conditions carefully before using Saviora. By accessing or using our platform, you agree to comply with these terms.
              </p>

              {/* Meta Stats Badges */}
              <div className="inline-flex flex-wrap items-center justify-center gap-4 p-3 md:p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-xs text-xs md:text-sm">
                <div className="flex items-center gap-2 px-3 py-1 text-slate-600 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-primary-500" />
                  <span>Last Updated: <strong className="text-slate-900 dark:text-white font-medium">July 24, 2026</strong></span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center gap-2 px-3 py-1 text-slate-600 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-primary-500" />
                  <span>Estimated Read: <strong className="text-slate-900 dark:text-white font-medium">7 minutes</strong></span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center gap-2 px-3 py-1 text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Official Agreement</span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Mobile TOC Toggle Bar */}
          <div className="lg:hidden sticky top-20 z-30 mb-8">
            <div className="glass-card rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                <FileText className="w-4 h-4 text-primary-500" />
                <span className="truncate max-w-[200px]">
                  {SECTIONS.find((s) => s.id === activeSection)?.title || "Table of Contents"}
                </span>
              </div>
              <button
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 text-xs font-semibold hover:bg-primary-100 transition-colors"
                aria-label="Toggle Table of Contents"
              >
                {mobileTocOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span>{mobileTocOpen ? "Close" : "Contents"}</span>
              </button>
            </div>

            {/* Mobile TOC Drawer Dropdown */}
            {mobileTocOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 glass-card rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 space-y-1 max-h-[60vh] overflow-y-auto"
              >
                {SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-sm transition-all ${
                        isActive
                          ? "bg-primary-500 text-white font-medium shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                        <span>{section.title}</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* MAIN TWO-COLUMN CONTENT LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* DESKTOP STICKY TABLE OF CONTENTS SIDEBAR */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 max-h-[calc(100vh-7rem)] flex flex-col space-y-4 z-20">
              <div className="glass-card rounded-2xl p-4 md:p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col max-h-full overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm tracking-wide uppercase">
                      Table of Contents
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    10 Sections
                  </span>
                </div>

                <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-16rem)] pr-1 scrollbar-thin">
                  {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs md:text-sm transition-all group ${
                          isActive
                            ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold border-l-4 border-emerald-500 pl-2.5 shadow-2xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon
                            className={`w-4 h-4 flex-shrink-0 transition-colors ${
                              isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                            }`}
                          />
                          <span className="truncate">{section.title}</span>
                        </div>
                        {isActive && <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
                  <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Reading Progress</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{Math.round(scrollProgress)}%</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* CONTENT CONTAINERS (MAX-WIDTH ~900px AREA) */}
            <div className="lg:col-span-8 space-y-10">

              {/* SECTION 1: INTRODUCTION */}
              <section id="introduction" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/60 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                        Section 1
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Introduction
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Welcome to <strong>Saviora</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms & Conditions (&quot;Terms&quot;) govern your access to and use of Saviora&apos;s personal finance application, web platform, mobile applications, software, tools, and related financial tracking services (collectively, the &quot;Services&quot;).
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    By creating an account, downloading our application, or accessing any part of our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must immediately cease accessing and using Saviora.
                  </p>

                  <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/60 text-sm text-primary-900 dark:text-primary-200 flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Important Notice:</strong> Please review these Terms thoroughly before using Saviora. Your continued use of the platform constitutes ongoing legal acceptance of these Terms and any subsequent revisions.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 2: ACCOUNTS */}
              <section id="accounts" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Section 2
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Accounts & User Responsibilities
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    To access Saviora&apos;s personal finance budgeting tools, you must register and maintain an active account. You agree to uphold the following account standards and security responsibilities:
                  </p>

                  {/* Checklist Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: "Accurate Information", desc: "Provide truthful, current, and complete registration information during account onboarding." },
                      { title: "Keep Data Updated", desc: "Promptly update your profile and email details whenever changes occur." },
                      { title: "Protect Login Credentials", desc: "Maintain absolute confidentiality over your password and account authentication tokens." },
                      { title: "No Password Sharing", desc: "Do not transfer, sell, or permit third parties to access or utilize your account credentials." },
                      { title: "Report Security Breaches", desc: "Notify support@saviora.com immediately if you suspect unauthorized access or credential compromise." },
                      { title: "No Impersonation", desc: "Do not create accounts using misleading usernames, fake identities, or unauthorized business names." },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Termination Notice */}
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs md:text-sm text-rose-900 dark:text-rose-200 flex items-start gap-3">
                    <UserX className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Account Suspension & Termination:</strong> Saviora reserves the right to suspend, restrict, or permanently terminate accounts that violate these Terms, engage in fraudulent activities, or disrupt system stability, without prior notice or liability.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 3: INTELLECTUAL PROPERTY */}
              <section id="intellectual-property" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Copyright className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Section 3
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Intellectual Property
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    The Saviora platform, including all underlying source code, algorithms, software architectures, user interfaces, branding assets, graphic designs, copy, and documentation, is the exclusive intellectual property of Saviora and its licensors:
                  </p>

                  {/* 6 Icon Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { title: "Copyright", desc: "All original platform content, documentation, and user interfaces are protected under global copyright laws." },
                      { title: "Trademarks", desc: "The 'Saviora' name, logo, taglines, and associated brand icons are proprietary registered trademarks." },
                      { title: "Software Code", desc: "Proprietary financial calculation algorithms and mobile app source codes belong exclusively to Saviora." },
                      { title: "Branding", desc: "Visual aesthetics, color systems, typography combinations, and UI layouts remain fully protected." },
                      { title: "Designs", desc: "Custom financial dashboards, budget visualization charts, and interactive widgets are proprietary." },
                      { title: "Content", desc: "Financial guides, tooltips, analytical reports, and system messages are protected assets." },
                    ].map((card, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-400/50 transition-colors">
                        <Copyright className="w-4 h-4 text-blue-500 mb-2" />
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{card.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{card.desc}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    Note: Users are granted a limited, non-exclusive, non-transferable, revocable license to access Saviora solely for personal financial management purposes.
                  </p>
                </div>
              </section>

              {/* SECTION 4: LIMITATION OF LIABILITY */}
              <section id="limitation-of-liability" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Section 4
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Limitation of Liability
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    To the maximum extent permitted by applicable law, Saviora, its officers, directors, employees, partners, suppliers, or licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages:
                  </p>

                  {/* Highlighted Warning Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-300 dark:border-amber-800/60 space-y-3">
                    <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>Exclusion of Specific Damages</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                      <li>Loss of profits or revenue</li>
                      <li>Loss of personal or financial data</li>
                      <li>Loss of business opportunities</li>
                      <li>Financial investment decisions</li>
                      <li>Unauthorized third-party access</li>
                      <li>Third-party service interruptions</li>
                    </ul>
                    <p className="text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-amber-200 dark:border-amber-800/60">
                      In no event shall Saviora&apos;s aggregate liability exceed the total amount paid by you to Saviora during the twelve (12) months preceding the claim, or $100 USD, whichever is lower.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 5: DISCLAIMER */}
              <section id="disclaimer" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                        Section 5
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Disclaimer &quot;AS IS&quot; &amp; &quot;AS AVAILABLE&quot;
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Saviora provides personal budgeting and financial organization tools. The platform is provided strictly on an <strong>&quot;AS IS&quot;</strong> and <strong>&quot;AS AVAILABLE&quot;</strong> basis without warranties of any kind, whether express, implied, or statutory.
                  </p>

                  {/* 5 Disclaimer Feature Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { icon: Zap, title: "No Continuous Guarantee", desc: "No warranty that platform access will be uninterrupted or operating without temporary downtime." },
                      { icon: Shield, title: "No Error-Free Guarantee", desc: "No guarantee that software calculations or feature displays will be completely error-free." },
                      { icon: RefreshCw, title: "Defects Correction", desc: "While we fix reported bugs, we do not warrant that all software defects will be instantly corrected." },
                      { icon: Lock, title: "Virus & Threat Safety", desc: "Users are advised to maintain device security; we do not warrant complete immunity from external threats." },
                      { icon: Sliders, title: "User Expectations", desc: "No guarantee that Saviora will meet every individual's unique financial management expectations." },
                    ].map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/60 space-y-1.5">
                          <ItemIcon className="w-4 h-4 text-purple-500" />
                          <h4 className="font-semibold text-slate-900 dark:text-white text-xs md:text-sm">{item.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-xs text-purple-900 dark:text-purple-200 flex items-center gap-2.5">
                    <Info className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <span>
                      <strong>Financial Advice Disclaimer:</strong> Saviora is a software budgeting tool and does not provide professional legal, tax, accounting, or financial investment advice.
                    </span>
                  </div>
                </div>
              </section>

              {/* SECTION 6: GOVERNING LAW */}
              <section id="governing-law" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        Section 6
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Governing Law & Legal Provisions
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    These Terms shall be governed, construed, and enforced in accordance with the applicable laws of the jurisdiction in which Saviora is legally established, without regard to conflict of law principles.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs md:text-sm">
                    <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                      <strong className="text-slate-900 dark:text-white block font-semibold">Severability</strong>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">
                        If any provision of these Terms is held invalid or unenforceable, that provision will be severed, and remaining provisions will remain in full effect.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                      <strong className="text-slate-900 dark:text-white block font-semibold">Entire Agreement</strong>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">
                        These Terms and Privacy Policy constitute the complete and exclusive agreement between you and Saviora regarding platform usage.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                      <strong className="text-slate-900 dark:text-white block font-semibold">No Waiver</strong>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">
                        Our failure to enforce any right or provision of these Terms shall not be deemed a waiver of such rights or future enforcement.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 7: AVAILABILITY */}
              <section id="availability" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Section 7
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Platform Availability & Technical Requirements
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Saviora strives to maintain optimal availability across supported operating systems and mobile devices. Platform operations rely on the following technical conditions:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { icon: Smartphone, title: "Android & iOS Support", desc: "Compatible with modern Android (8.0+) and iOS (14.0+) mobile operating systems." },
                      { icon: Wifi, title: "Internet Connection", desc: "Requires stable Wi-Fi or mobile data connectivity to sync budget databases." },
                      { icon: Server, title: "Network Dependency", desc: "Data synchronization speeds depend on local Internet Service Provider performance." },
                      { icon: Layers, title: "Device Compatibility", desc: "Features may vary based on hardware specifications and OS permissions." },
                      { icon: Clock, title: "Planned Maintenance", desc: "Occasional scheduled downtime for security patches and cloud upgrades." },
                      { icon: Sparkles, title: "Feature Updates", desc: "Regular feature enhancements, UI improvements, and performance upgrades." },
                    ].map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/60 space-y-1">
                          <ItemIcon className="w-4 h-4 text-indigo-500" />
                          <h4 className="font-semibold text-slate-900 dark:text-white text-xs md:text-sm">{item.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs md:text-sm text-indigo-900 dark:text-indigo-200 flex items-start gap-3">
                    <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Service Modifications:</strong> Saviora reserves the right to modify, suspend, or discontinue any platform feature at any time without prior notice. Support and SLA response times may be limited for free or trial account tiers.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 8: INACTIVE ACCOUNTS */}
              <section id="inactive-accounts" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                        Section 8
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Inactive Accounts Timeline
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    To maintain database optimization and system efficiency, Saviora manages inactive accounts according to a structured 3-stage lifecycle timeline:
                  </p>

                  {/* Visual Retention Timeline */}
                  <div className="relative py-4 space-y-6 before:absolute before:left-6 md:before:left-1/2 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                    
                    {/* Stage 1 */}
                    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pl-14 md:pl-0">
                      <div className="md:w-5/12 text-left md:text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-1">
                          Stage 1
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">Active Account</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Full active access. All financial records and settings are encrypted and instantly synchronized across your devices.
                        </p>
                      </div>
                      <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md ring-4 ring-slate-50 dark:ring-slate-950 z-10">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div className="md:w-5/12 hidden md:block" />
                    </div>

                    {/* Stage 2 */}
                    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pl-14 md:pl-0">
                      <div className="md:w-5/12 hidden md:block" />
                      <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md ring-4 ring-slate-50 dark:ring-slate-950 z-10">
                        <Archive className="w-5 h-5" />
                      </div>
                      <div className="md:w-5/12 text-left">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-xs font-bold mb-1">
                          Stage 2
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">18 Months Inactive</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          If no login activity occurs for 18 consecutive months, personal account data may be securely archived in encrypted cold storage.
                        </p>
                      </div>
                    </div>

                    {/* Stage 3 */}
                    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pl-14 md:pl-0">
                      <div className="md:w-5/12 text-left md:text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 text-xs font-bold mb-1">
                          Stage 3
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">24+ Months Inactive</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Accounts remaining inactive past 24 months are queued for permanent deletion and cryptographic data purging.
                        </p>
                      </div>
                      <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md ring-4 ring-slate-50 dark:ring-slate-950 z-10">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div className="md:w-5/12 hidden md:block" />
                    </div>
                  </div>

                  {/* Recovery Notice */}
                  <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-xs md:text-sm text-orange-900 dark:text-orange-200 flex items-start gap-3">
                    <Info className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Archive Data Recovery Feasibility:</strong> Archived data from Stage 2 may be recoverable upon request, subject to technical feasibility and applicable service or data restoration processing fees.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 9: CHANGES TO TERMS */}
              <section id="changes-to-terms" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 dark:text-teal-400">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        Section 9
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Changes to Terms &amp; Conditions
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Saviora reserves the right to amend, update, or replace these Terms &amp; Conditions at any time. Updates may reflect legal requirements, feature additions, or operational adjustments.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs md:text-sm">
                    We will notify users of significant changes by updating the &quot;Last Updated&quot; date on this page and, where appropriate, displaying in-app banner announcements or emailing registered users. Your continued use of Saviora after any updates become effective constitutes acceptance of the revised Terms.
                  </p>
                </div>
              </section>

              {/* SECTION 10: CONTACT US */}
              <section id="contact-us" className="scroll-mt-28">
                <div className="glass-card rounded-3xl p-8 md:p-12 border border-primary-200 dark:border-primary-900/60 bg-gradient-to-b from-white via-primary-50/20 to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-primary-950/20 shadow-lg text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-500 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <Mail className="w-8 h-8" />
                  </div>

                  <div className="space-y-2 max-w-xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                      Section 10
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      Have Questions About These Terms?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                      If you have questions, inquiries, or feedback regarding these Terms &amp; Conditions, please reach out to our legal and support team.
                    </p>
                  </div>

                  {/* Centered Email Button */}
                  <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <a
                      href="mailto:support@saviora.com"
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <Mail className="w-4 h-4" />
                      <span>support@saviora.com</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                    Saviora Legal & Compliance Department &bull; Response window: 24-48 business hours
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
