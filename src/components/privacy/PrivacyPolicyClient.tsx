"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import {
  Shield,
  ShieldCheck,
  Lock,
  FileText,
  Clock,
  User,
  Mail,
  Cookie,
  Server,
  Globe,
  Calendar,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Info,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Trash2,
  Archive,
  UserX,
  Activity,
  Key,
  Smartphone,
  HardDrive,
  Cpu,
  Layers,
  Menu,
  X,
} from "lucide-react";

interface SectionItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SECTIONS: SectionItem[] = [
  { id: "introduction", title: "1. Introduction", icon: FileText },
  { id: "information-we-collect", title: "2. Information We Collect", icon: User },
  { id: "log-data", title: "3. Log Data", icon: Activity },
  { id: "cookies", title: "4. Cookies & Similar Tech", icon: Cookie },
  { id: "service-providers", title: "5. Service Providers", icon: Server },
  { id: "security", title: "6. Security", icon: Lock },
  { id: "international-transfers", title: "7. International Data Transfers", icon: Globe },
  { id: "data-retention", title: "8. Data Retention", icon: Clock },
  { id: "third-party-links", title: "9. Third-Party Links", icon: ExternalLink },
  { id: "childrens-privacy", title: "10. Children's Privacy", icon: UserX },
  { id: "policy-changes", title: "11. Changes to this Policy", icon: Info },
  { id: "contact-us", title: "12. Contact Us", icon: Mail },
];

export function PrivacyPolicyClient() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  // ScrollSpy & Progress Indicator
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Intersection detection for TOC active highlight
      const sectionElements = SECTIONS.map((sec) => document.getElementById(sec.id));
      const scrollPosition = window.scrollY + 220; // Offset for header & banner

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileTocOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110; // Sticky header offset
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
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Legal & Data Protection
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                Privacy <span className="text-gradient">Policy</span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">
                Your privacy matters to us. Learn how Saviora collects, uses, stores, and protects your personal information.
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
                  <span>Estimated Read: <strong className="text-slate-900 dark:text-white font-medium">6 minutes</strong></span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center gap-2 px-3 py-1 text-slate-600 dark:text-slate-300">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">AES-256 Encrypted</span>
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
                    <ShieldCheck className="w-5 h-5 text-primary-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm tracking-wide uppercase">
                      Table of Contents
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    12 Sections
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
                    Welcome to <strong>Saviora</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). Saviora is a comprehensive personal finance platform engineered to help individuals track income, manage expenses, construct monthly budgets, reach long-term savings goals, and build a resilient financial future.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    We recognize that when you entrust Saviora with your personal financial management, you are sharing confidential data. We treat your privacy with paramount importance. This Privacy Policy details the policies and procedures governing how we collect, use, process, disclose, and safeguard your personal information when you access or use our web platform, mobile applications, and associated financial management tools (collectively, the &quot;Services&quot;).
                  </p>

                  <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/60 text-sm text-primary-900 dark:text-primary-200 flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Agreement:</strong> By accessing or creating an account on Saviora, you acknowledge that you have read, understood, and agreed to the practices described in this Privacy Policy.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 2: INFORMATION WE COLLECT */}
              <section id="information-we-collect" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Section 2
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Information We Collect
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    To deliver our personal finance features, verify account authenticity, and personalize your experience, we collect specific categories of personal information provided directly by you during registration or app usage:
                  </p>

                  {/* Checklist Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Full Name</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Used to identify account ownership, personalize dashboards, and manage profile security settings.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Email Address</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Used for authentication, sending account verification, password resets, budget alerts, and support responses.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Phone Number</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Used for optional multi-factor authentication (MFA) and urgent security alert notifications.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Voluntarily Provided Data</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Includes feedback, support ticket attachments, user survey responses, profile images, and custom category labels.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: LOG DATA */}
              <section id="log-data" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Section 3
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Log Data
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Whenever you use Saviora on your web browser or mobile application, our servers automatically collect technical diagnostic information sent by your device:
                  </p>

                  {/* Icon Bullet Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { icon: Globe, title: "IP Address", desc: "For geolocation verification, DDOS mitigation, and fraud prevention." },
                      { icon: Smartphone, title: "Device Information", desc: "Hardware specifications, device model, and display resolution." },
                      { icon: Cpu, title: "Operating System", desc: "Platform version details (iOS, Android, Windows, macOS, Linux)." },
                      { icon: Layers, title: "App Version", desc: "Current Saviora software build and client release version." },
                      { icon: Key, title: "Device Identifiers", desc: "Encrypted device UUID tokens for session persistence." },
                      { icon: Activity, title: "Usage Statistics", desc: "Feature interactions, session durations, and screen transitions." },
                      { icon: HardDrive, title: "Session Information", desc: "API response latency, connection speed, and system error events." },
                    ].map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/60">
                          <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <ItemIcon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white text-xs md:text-sm">{item.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Highlighted Analytics Notice */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-primary-500/10 border border-blue-200 dark:border-blue-800/60 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                      <strong className="text-slate-900 dark:text-white block font-semibold">
                        Analytics Services (e.g., Firebase Analytics)
                      </strong>
                      <p>
                        We use privacy-preserving analytics services (such as Firebase Analytics) to analyze system health and aggregate app stability. These tools process anonymized performance indicators to help us resolve crashes and optimize platform responsiveness.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 4: COOKIES & SIMILAR TECHNOLOGIES */}
              <section id="cookies" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Cookie className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Section 4
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Cookies & Similar Technologies
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Saviora uses cookies, browser local storage, mobile SDKs, and similar tracking mechanisms to keep your session secure, remember user preferences, and assess feature popularity:
                  </p>

                  {/* Feature Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { title: "Cookies", desc: "Small data files placed on your browser to verify session tokens and prevent unauthorized access." },
                      { title: "Local Storage", desc: "HTML5 web storage used for offline state caching and theme mode preferences." },
                      { title: "SDKs", desc: "Mobile software kits enabling secure push alerts and background background sync." },
                      { title: "Device Identifiers", desc: "Encrypted device signatures used to verify multi-device authorizations." },
                      { title: "Preference Storage", desc: "Saves default currency, dashboard layout, and customized expense categories." },
                      { title: "Analytics Tokens", desc: "Pseudonymized telemetry tokens used to measure page load speeds." },
                    ].map((card, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 hover:border-amber-400/50 transition-colors">
                        <Cookie className="w-4 h-4 text-amber-500 mb-2" />
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{card.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{card.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Device Note */}
                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2.5">
                    <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Managing Cookies:</strong> You can modify your web browser or mobile OS settings to block or delete cookies. Please note that disabling essential cookies may restrict your access to key Saviora features.
                    </span>
                  </div>
                </div>
              </section>

              {/* SECTION 5: SERVICE PROVIDERS */}
              <section id="service-providers" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                        Section 5
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Service Providers
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    We may engage vetted third-party vendors and contractors to assist in maintaining our platform infrastructure, executing specialized services, and analyzing app performance. These providers include:
                  </p>

                  {/* Callout Box */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/5 to-primary-500/5 border border-purple-200 dark:border-purple-800/60 space-y-4">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-wide uppercase">
                      Third-Party Provider Categories
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
                      {[
                        { title: "Cloud Hosting & Datacenters", desc: "Scalable server infrastructure (e.g. Vercel, Contabo)." },
                        { title: "Analytics & Monitoring", desc: "Aggregated user telemetry & error diagnostics." },
                        { title: "Customer Support Tools", desc: "Secure helpdesk & ticketing support software." },
                        { title: "Security & Firewall", desc: "WAF protection, intrusion defense, & DDOS mitigation." },
                        { title: "Performance Monitoring", desc: "Real-time latency & application uptime tracking." },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60">
                          <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-900 dark:text-white block text-xs">{item.title}</strong>
                            <span className="text-slate-500 text-xs">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-purple-100/70 dark:bg-purple-950/60 text-xs text-purple-900 dark:text-purple-200 font-medium">
                      🔒 <strong>Strict Protection Contract:</strong> All third-party providers are legally bound by non-disclosure agreements and are prohibited from accessing, sharing, or using your personal information for any purpose other than executing authorized services on our behalf.
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 6: SECURITY */}
              <section id="security" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Section 6
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Security
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    The security of your personal data is fundamental to our platform engineering. Saviora incorporates defense-in-depth security mechanisms to protect your financial and personal data:
                  </p>

                  {/* Two-Column Security Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Lock className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">Encryption Standards</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Data in transit is protected using TLS 1.3 encryption. All static database storage is protected with AES-256 military-grade encryption.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Server className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">Secure Infrastructure</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Hosted in SOC 2 Type II compliant cloud datacenters featuring round-the-clock monitoring, network isolation, and automated backups.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">Administrative Controls</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Strict role-based permissions, multi-factor authentication for employees, and audit log tracking prevent internal unauthorized access.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Activity className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">Industry Best Practices</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Continuous automated security vulnerability scans, dependency audits, and routine third-party penetration testing.
                      </p>
                    </div>
                  </div>

                  {/* Security Disclaimer Notice */}
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Security Notice:</strong> While we employ commercial best practices to protect your data, no method of transmission over the Internet or method of electronic storage can be guaranteed to be 100% secure. We encourage users to maintain strong passwords and enable two-factor authentication.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 7: INTERNATIONAL DATA TRANSFERS */}
              <section id="international-transfers" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        Section 7
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        International Data Transfers
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-12 h-12 stroke-[1.5]" />
                    </div>
                    <div className="space-y-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                      <p>
                        Saviora operates globally. Your information may be processed or stored on cloud servers located outside of your state, province, or country, where data protection legislation may differ from your local jurisdiction.
                      </p>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                        When transferring data across international borders, Saviora implements appropriate contractual safeguards—including European Commission Standard Contractual Clauses (SCCs)—to ensure your personal information remains thoroughly protected regardless of geographical location.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 8: DATA RETENTION TIMELINE */}
              <section id="data-retention" className="scroll-mt-28">
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
                        Data Retention Timeline
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    We retain personal data only for as long as necessary to fulfill the purposes for which it was collected or to comply with legal, accounting, or reporting obligations. Below is our standard account retention timeline:
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
                        <User className="w-5 h-5" />
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
                          If no login activity occurs for 18 consecutive months, personal data is securely archived into encrypted cold storage.
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

                  {/* Deletion Request Highlight Box */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-primary-500/10 border border-orange-200 dark:border-orange-800/60 flex items-start gap-3">
                    <Trash2 className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-white block font-semibold mb-1">
                        Instant Account Deletion Request
                      </strong>
                      <p>
                        You do not need to wait for inactivity timelines. You have the right to request complete account and data deletion at any time via Saviora Account Settings or by emailing <a href="mailto:support@saviora.com" className="text-primary-600 dark:text-primary-400 underline font-medium">support@saviora.com</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 9: THIRD-PARTY LINKS */}
              <section id="third-party-links" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Section 9
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Third-Party Links
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Our Services may contain hyperlinked connections to external websites, services, or partner integrations that are not owned or controlled by Saviora. Clicking on a third-party link will redirect you to that third party&apos;s site.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs md:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Informational Warning:</strong> Saviora has no control over, and assumes no responsibility for, the content, privacy statements, policies, or practices of any third-party websites or services. We encourage you to read the privacy policies of any third-party platform you visit.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 10: CHILDREN'S PRIVACY */}
              <section id="childrens-privacy" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400">
                      <UserX className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        Section 10
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Children&apos;s Privacy
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Saviora is designed for adults and young adults legally authorized to enter binding agreements. Saviora does not knowingly target, market to, or collect personal information from children under the age of 13.
                  </p>

                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs md:text-sm text-rose-900 dark:text-rose-200 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                    <p>
                      If you are a parent or legal guardian and discover that your child under 13 has provided personal data to Saviora, please contact us immediately at <a href="mailto:support@saviora.com" className="underline font-semibold">support@saviora.com</a> so we can delete the information promptly.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 11: CHANGES TO THIS POLICY */}
              <section id="policy-changes" className="scroll-mt-28">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Info className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Section 11
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Changes to this Privacy Policy
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    We may update our Privacy Policy periodically to reflect enhancements in platform security, feature developments, or statutory changes.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs md:text-sm">
                    When material changes occur, we will post the updated policy on this page and revise the &quot;Last Updated&quot; timestamp at the top of the policy. For major modifications, we will issue prominent notifications via email or app interface alerts prior to the changes taking effect.
                  </p>
                </div>
              </section>

              {/* SECTION 12: CONTACT US */}
              <section id="contact-us" className="scroll-mt-28">
                <div className="glass-card rounded-3xl p-8 md:p-12 border border-primary-200 dark:border-primary-900/60 bg-gradient-to-b from-white via-primary-50/20 to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-primary-950/20 shadow-lg text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-500 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <Mail className="w-8 h-8" />
                  </div>

                  <div className="space-y-2 max-w-xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                      Section 12
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      Questions About This Privacy Policy?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                      If you have questions, data correction requests, or concerns regarding your privacy at Saviora, our compliance team is here to assist.
                    </p>
                  </div>

                  {/* Centered Email Card */}
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
                    Saviora Security & Compliance Office &bull; Response window: 24-48 business hours
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
