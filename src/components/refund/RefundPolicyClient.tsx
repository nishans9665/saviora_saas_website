"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Clock,
  ShieldCheck,
  Mail,
  Smartphone,
  Wifi,
  Layers,
  Download,
  CreditCard,
  Lock,
  Wrench,
  ChevronRight,
  ArrowRight,
  XCircle,
  LifeBuoy,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

interface SectionItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SECTIONS: SectionItem[] = [
  { id: "overview", title: "1. Overview", icon: Info },
  { id: "refund-eligibility", title: "2. Refund Eligibility", icon: CheckCircle2 },
  { id: "technical-issues", title: "3. Technical Issues", icon: Wrench },
  { id: "device-compatibility", title: "4. Device Compatibility", icon: Smartphone },
  { id: "non-refundable", title: "5. Non-Refundable Situations", icon: XCircle },
  { id: "contact-support", title: "6. Contact Support", icon: Mail },
];

export function RefundPolicyClient() {
  const [activeSection, setActiveSection] = useState<string>("overview");
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
                <RotateCcw className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Customer Satisfaction Policy
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                Returns &amp; <span className="text-gradient">Refunds Policy</span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">
                We are committed to providing a reliable experience with Saviora. Please review our refund policy to understand your eligibility and how refund requests are handled.
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
                  <span>Estimated Read: <strong className="text-slate-900 dark:text-white font-medium">4 minutes</strong></span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center gap-2 px-3 py-1 text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">14-Day Guarantee</span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Mobile TOC Toggle Bar */}
          <div className="lg:hidden sticky top-20 z-30 mb-8">
            <div className="glass-card rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                <RotateCcw className="w-4 h-4 text-primary-500" />
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
                    <RotateCcw className="w-5 h-5 text-primary-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm tracking-wide uppercase">
                      Table of Contents
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    6 Sections
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

              {/* SECTION 1: OVERVIEW */}
              <section id="overview" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/60 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <Info className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                        Section 1
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Overview
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Saviora offers refunds for eligible digital software subscriptions under specific conditions. We aim to ensure a fair, transparent billing process while supporting users facing technical or account management difficulties.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Before requesting a formal refund, we strongly encourage users to reach out to our dedicated support team. Most technical issues, account synchronization delays, or billing questions can be resolved quickly without requiring a subscription cancellation.
                  </p>

                  <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/60 text-sm text-primary-900 dark:text-primary-200 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Support First Policy:</strong> If you experience any feature friction or billing confusion, please contact us at <a href="mailto:support@saviora.com" className="underline font-semibold">support@saviora.com</a>. Our technical specialists are standing by to help.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 2: REFUND ELIGIBILITY */}
              <section id="refund-eligibility" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Section 2
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Refund Eligibility
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Saviora maintains a 14-day money-back guarantee for qualifying digital subscription purchases:
                  </p>

                  {/* Green Success-Style Info Card */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-primary-500/10 border border-emerald-300 dark:border-emerald-800/60 space-y-4">
                    <div className="flex items-center gap-2.5 text-emerald-900 dark:text-emerald-200 font-bold text-base">
                      <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Eligible Refund Conditions</span>
                    </div>

                    <ul className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-200">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span><strong>14-Day Request Window:</strong> Refund requests must be formally submitted within <strong>14 calendar days</strong> of the original purchase or subscription renewal date.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Strict 14-Day Cutoff:</strong> Refund requests submitted after the 14-day grace period are not eligible for reimbursement under any circumstances.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Qualifying Purchases:</strong> Eligibility applies exclusively to valid digital subscriptions purchased directly through Saviora&apos;s web app or official billing channels.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* SECTION 3: TECHNICAL ISSUES */}
              <section id="technical-issues" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Section 3
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Technical Issues &amp; Support First
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    If you are experiencing technical difficulties, please contact Saviora Support prior to requesting a refund. Our team can quickly assist with:
                  </p>

                  {/* Responsive Icon Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { icon: Lock, title: "Account Access", desc: "Troubleshooting password resets, multi-factor login failures, or session lockouts." },
                      { icon: Wrench, title: "App Functionality", desc: "Resolving unexpected errors, calculations discrepancies, or UI loading issues." },
                      { icon: CheckCircle2, title: "Subscription Activation", desc: "Fixing delayed subscription upgrades or license verification issues." },
                      { icon: Download, title: "Download Issues", desc: "Assisting with mobile app installations or data export file generation." },
                      { icon: CreditCard, title: "Payment Confirmation", desc: "Clarifying duplicate billing charges, receipt delivery, or invoice questions." },
                      { icon: Layers, title: "Feature Availability", desc: "Guiding users through budget tracking tools, expense categorization, and charts." },
                    ].map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/60 space-y-1">
                          <ItemIcon className="w-4 h-4 text-blue-500" />
                          <h4 className="font-semibold text-slate-900 dark:text-white text-xs md:text-sm">{item.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* SECTION 4: DEVICE COMPATIBILITY */}
              <section id="device-compatibility" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Section 4
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Device Compatibility
                      </h2>
                    </div>
                  </div>

                  {/* Warning-Style Information Card */}
                  <div className="p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 space-y-3">
                    <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>Compatibility Standards</span>
                    </div>
                    <ul className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                      <li>Saviora is designed for supported mobile devices (Android 8.0+, iOS 14.0+) and modern web browsers (Chrome, Safari, Firefox, Edge).</li>
                      <li>Compatibility with legacy operating systems or third-party modifications is not guaranteed.</li>
                      <li>Refunds will not be issued solely due to an unsupported device or environment unless Saviora fails to meet its published system requirements.</li>
                    </ul>
                  </div>

                  {/* Compatibility Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <span className="text-xs text-slate-700 dark:text-slate-300">Android 8.0+ &amp; iOS 14.0+</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
                      <Wifi className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <span className="text-xs text-slate-700 dark:text-slate-300">Stable Internet Data</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <span className="text-xs text-slate-700 dark:text-slate-300">Modern Browser Engine</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 5: NON-REFUNDABLE SITUATIONS */}
              <section id="non-refundable" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400">
                      <XCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        Section 5
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Non-Refundable Situations
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Refunds are generally not granted under the following circumstances:
                  </p>

                  {/* Warning Card with Icon Bullet Scenarios */}
                  <div className="p-5 rounded-2xl bg-rose-500/10 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 space-y-3">
                    {[
                      "Requests submitted after the 14-day refund window has elapsed.",
                      "Attempting to run Saviora on unsupported hardware or deprecated operating systems.",
                      "Compatibility issues caused by third-party browser extensions or non-standard software modifications.",
                      "External hardware limitations or physical device malfunction.",
                      "Network, cellular, or ISP connectivity outages outside Saviora's control.",
                    ].map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700 dark:text-slate-200">
                        <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 6: CONTACT SUPPORT */}
              <section id="contact-support" className="scroll-mt-28">
                <div className="glass-card rounded-3xl p-8 md:p-12 border border-primary-200 dark:border-primary-900/60 bg-gradient-to-b from-white via-primary-50/20 to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-primary-950/20 shadow-lg text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-500 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <Mail className="w-8 h-8" />
                  </div>

                  <div className="space-y-2 max-w-xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                      Section 6
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      Need Help With a Refund?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                      Our support team is available to assist you with billing questions, technical issues, and eligible refund requests.
                    </p>
                  </div>

                  {/* Email & Contact Action */}
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
                </div>
              </section>

              {/* CALL-TO-ACTION SECTION: WE'RE HERE TO HELP */}
              <section className="glass-card rounded-3xl p-8 md:p-10 border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-primary-500/10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <LifeBuoy className="w-8 h-8 stroke-[1.75]" />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    We&apos;re Here to Help
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    If you&apos;re experiencing any issues with Saviora, our support team is happy to assist. Many problems can be resolved quickly without the need for a refund.
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
