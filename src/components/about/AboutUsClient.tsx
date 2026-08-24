"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  PiggyBank,
  Compass,
  Wallet,
  PieChart,
  Target,
  BarChart3,
  Globe,
  ShieldCheck,
  Lock,
  Smartphone,
  Laptop,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Code2,
  Layers,
  Activity,
  ArrowDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AboutUsClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqList = [
    {
      question: "What is Saviora?",
      answer:
        "Saviora is a personal finance and money management platform that helps you track income and expenses, create monthly budgets, set savings goals, and understand your financial progress effortlessly.",
    },
    {
      question: "Who is Saviora for?",
      answer:
        "Saviora is designed for individuals, freelancers, families, and professionals who want a simpler, clearer way to organize their finances, manage spending, build savings habits, and work toward long-term financial goals.",
    },
    {
      question: "What can I manage with Saviora?",
      answer:
        "You can manage income streams, daily and recurring expenses, monthly category budgets, goal-oriented savings milestones, financial analytics, cash flow reports, and personal financial accounts in multi-currency supported environments.",
    },
    {
      question: "Is Saviora a financial advisor?",
      answer:
        "No. Saviora is a personal finance organization, tracking, and budgeting software tool. It does not replace professional financial, investment, tax, or legal advice.",
    },
    {
      question: "Is Saviora available on mobile?",
      answer:
        "Yes! Saviora is engineered for both web browser workspaces and mobile device screens, enabling you to keep your financial life organized wherever you go.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen pt-24 sm:pt-28 relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] sm:h-[900px] max-w-[1400px] opacity-25 pointer-events-none overflow-hidden">
          <div className="absolute top-6 sm:top-12 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px]"></div>
          <div className="absolute top-20 sm:top-32 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px]"></div>
        </div>

        {/* 1. HERO SECTION */}
        <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 md:pt-16 md:pb-28">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-5 sm:mb-6 border border-emerald-200/80 dark:border-emerald-800/60 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                About Saviora
              </span>

              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-6 leading-[1.15]">
                Take Control of Your Money. <br className="hidden sm:block" />
                <span className="text-gradient">Build Your Future.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal px-2">
                Saviora is a modern personal finance platform designed to make managing money simpler, clearer, and more intentional. Track your income, manage expenses, plan your budgets, build savings goals, and understand your financial progress - all in one secure place.
              </p>

              {/* Mobile & Desktop Responsive Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto mb-12 sm:mb-16">
                <a
                  href="https://cloud.saviora.app/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-emerald-600/20 text-sm sm:text-base font-semibold px-6 sm:px-8 py-3.5 rounded-xl justify-center">
                    Start Free
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                  </Button>
                </a>
                <Link href="/#features" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base font-semibold px-6 sm:px-8 py-3.5 rounded-xl border-slate-300 dark:border-slate-800 justify-center">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            {/* Product UI Visual Mockup */}
            <AnimatedSection delay={0.2} direction="up" className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-slate-200/80 to-slate-100/40 dark:from-slate-800/80 dark:to-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-2xl">
                <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 overflow-hidden border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 md:p-8">
                  {/* Header Bar */}
                  <div className="flex items-center justify-between pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-slate-100 dark:border-slate-800 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400"></div>
                      </div>
                      <span className="hidden sm:inline-block text-[11px] sm:text-xs font-mono text-slate-400 dark:text-slate-500 truncate">
                        app.saviora.com/overview
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-medium border border-emerald-200/40 whitespace-nowrap flex-shrink-0">
                      Live Demo
                    </span>
                  </div>

                  {/* Visual Dashboard Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-2">
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Net Balance</span>
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                          <Wallet className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">$24,850.00</div>
                      <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                        <TrendingUp className="w-3.5 h-3.5" /> +12.4% vs last month
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Monthly Budget</span>
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                          <PieChart className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">$3,200.00</div>
                      <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[65%] rounded-full"></div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Savings Goal</span>
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                          <PiggyBank className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">$12,000.00</div>
                      <div className="mt-2 text-xs text-purple-600 dark:text-purple-400 font-medium">
                        80% of $15,000 Goal Reached
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 2. THE PROBLEM / PURPOSE */}
        <section className="py-14 sm:py-20 md:py-24 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection className="text-center mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                  Money Management Should Feel Simple
                </h2>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Managing your money shouldn&apos;t require spreadsheets, scattered notes, multiple apps, and complicated calculations. Saviora brings the essential parts of personal finance together in one organized platform, helping you understand where your money goes, plan where it should go next, and make better financial decisions along the way.
                </p>
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 inline-block text-emerald-800 dark:text-emerald-300 font-semibold text-xs sm:text-sm md:text-base">
                  Our purpose is simple: <span className="underline decoration-emerald-500 underline-offset-4">make personal finance easier to understand and easier to manage.</span>
                </div>
              </AnimatedSection>

              {/* Transformation Visual Diagram */}
              <AnimatedSection delay={0.2} className="mt-10 sm:mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center">
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
                      ✕
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1.5 text-sm sm:text-base">Scattered Finances</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Multiple spreadsheets, missing receipts, and zero visibility into monthly cash flow.</p>
                  </div>

                  <div className="flex flex-col items-center justify-center py-2 sm:py-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-600/30 mb-2">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Saviora Platform</span>
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1.5 text-sm sm:text-base">Clearer Financial Picture</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Unified tracking, automated budget limits, and confident financial growth.</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* 3. SAVIORA PHILOSOPHY */}
        <section className="py-14 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2.5 block">
                THE SAVIORA APPROACH
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                Track. Save. Grow.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
                Everything we build around Saviora follows three simple ideas: understand your money, build better financial habits, and work toward a stronger financial future.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* TRACK */}
              <AnimatedSection delay={0.1} direction="up">
                <div className="h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 sm:mb-6 shadow-sm">
                      <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase mb-1.5 block">
                      PHILOSOPHY 01
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">TRACK</h3>
                    <h4 className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3 sm:mb-4">
                      Know where your money goes.
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Keep your income, expenses, transactions, and spending activity organized so you always have a clearer picture of your finances.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* SAVE */}
              <AnimatedSection delay={0.2} direction="up">
                <div className="h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 sm:mb-6 shadow-sm">
                      <PiggyBank className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-1.5 block">
                      PHILOSOPHY 02
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">SAVE</h3>
                    <h4 className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-400 mb-3 sm:mb-4">
                      Give your money a purpose.
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Create budgets and savings goals, monitor your progress, and build consistent habits that move you closer to what matters.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* GROW */}
              <AnimatedSection delay={0.3} direction="up">
                <div className="h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 sm:mb-6 shadow-sm">
                      <Compass className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-widest uppercase mb-1.5 block">
                      PHILOSOPHY 03
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">GROW</h3>
                    <h4 className="text-xs sm:text-sm font-semibold text-purple-700 dark:text-purple-400 mb-3 sm:mb-4">
                      Make smarter financial decisions.
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Understand your financial health, discover meaningful patterns, and use your financial information to make more informed decisions.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* 4. WHAT SAVIORA HELPS YOU DO */}
        <section className="py-14 sm:py-20 md:py-24 bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                Everything You Need to Manage Your Money
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
                From everyday spending to long-term goals, Saviora brings your essential financial tools together in one place.
              </p>
            </AnimatedSection>

            {/* 2 x 3 Card Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* Card 01 */}
              <AnimatedSection delay={0.1}>
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-lg transition-all h-full">
                  <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-3">01</div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-emerald-600 flex-shrink-0" /> Track Income
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Keep your income sources organized and understand your earnings over time.
                  </p>
                </div>
              </AnimatedSection>

              {/* Card 02 */}
              <AnimatedSection delay={0.15}>
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-lg transition-all h-full">
                  <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-3">02</div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-600 flex-shrink-0" /> Manage Expenses
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Record and categorize everyday spending so you know exactly where your money goes.
                  </p>
                </div>
              </AnimatedSection>

              {/* Card 03 */}
              <AnimatedSection delay={0.2}>
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-lg transition-all h-full">
                  <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-3">03</div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600 flex-shrink-0" /> Plan Your Budget
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Set monthly budgets, monitor spending, and stay ahead of your financial limits.
                  </p>
                </div>
              </AnimatedSection>

              {/* Card 04 */}
              <AnimatedSection delay={0.25}>
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-lg transition-all h-full">
                  <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-3">04</div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <PiggyBank className="w-5 h-5 text-purple-600 flex-shrink-0" /> Build Savings Goals
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Set meaningful goals, track milestones, and build consistent saving habits.
                  </p>
                </div>
              </AnimatedSection>

              {/* Card 05 */}
              <AnimatedSection delay={0.3}>
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-lg transition-all h-full">
                  <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-3">05</div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-amber-600 flex-shrink-0" /> Understand Your Finances
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Explore financial analytics, spending trends, and reports to see the bigger picture.
                  </p>
                </div>
              </AnimatedSection>

              {/* Card 06 */}
              <AnimatedSection delay={0.35}>
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-lg transition-all h-full">
                  <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-3">06</div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-teal-600 flex-shrink-0" /> Manage Your Financial Life
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Keep your financial information organized across supported devices and currencies.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* 5. HOW SAVIORA WORKS */}
        <section className="py-14 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2.5 block">
                A SIMPLE APPROACH
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                From Tracking Money to Understanding It
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
                Saviora turns everyday financial activity into a clearer picture of your financial progress.
              </p>
            </AnimatedSection>

            {/* Pipeline Process Flow */}
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Step 01 */}
                <AnimatedSection delay={0.1}>
                  <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg text-center h-full flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center mb-3 sm:mb-4 text-sm sm:text-base">
                      01
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg mb-1.5">Track</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Record your income and expenses and keep your financial activity organized.
                    </p>
                  </div>
                </AnimatedSection>

                {/* Step 02 */}
                <AnimatedSection delay={0.2}>
                  <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg text-center h-full flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center mb-3 sm:mb-4 text-sm sm:text-base">
                      02
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg mb-1.5">Plan</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Create budgets and savings goals based on your priorities.
                    </p>
                  </div>
                </AnimatedSection>

                {/* Step 03 */}
                <AnimatedSection delay={0.3}>
                  <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg text-center h-full flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center mb-3 sm:mb-4 text-sm sm:text-base">
                      03
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg mb-1.5">Understand</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Review spending patterns, financial trends, and progress.
                    </p>
                  </div>
                </AnimatedSection>

                {/* Step 04 */}
                <AnimatedSection delay={0.4}>
                  <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg text-center h-full flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center mb-3 sm:mb-4 text-sm sm:text-base">
                      04
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg mb-1.5">Grow</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Use what you learn to build better financial habits and make more confident decisions.
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BUILT FOR REAL LIFE */}
        <section className="py-14 sm:py-20 md:py-24 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                Your Money. Your Goals. Your Way.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
                Everyone manages money differently. Saviora is designed to adapt to your financial life—not the other way around.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              <AnimatedSection delay={0.1}>
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 h-full">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-2">Everyday Spending</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Keep daily expenses organized and understand your spending habits.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 h-full">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-2">Monthly Planning</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Build realistic budgets and keep your spending on track.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 h-full">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-2">Saving for the Future</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Turn financial goals into measurable progress.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 h-full">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-2">Financial Awareness</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    See the bigger picture and make decisions with greater confidence.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* 7. FINANCIAL INSIGHTS SECTION */}
        <section className="py-14 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2.5 block">
                SMART FINANCIAL INSIGHTS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                See More Clearly. Decide More Confidently.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
                Saviora helps turn your financial activity into useful information. Understand spending patterns, monitor your financial health, review your progress, and identify opportunities to improve your money habits.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              <AnimatedSection delay={0.1}>
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 sm:mb-6">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">Financial Health</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Get a clearer view of your overall financial position and progress.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 sm:mb-6">
                    <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">Spending Insights</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Understand where your money is going and identify meaningful spending patterns.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 sm:mb-6">
                    <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">Financial Reports</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Review organized reports that help you understand your financial activity over time.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* 8. SECURITY & PRIVACY */}
        <section className="py-14 sm:py-20 md:py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-800">
                <ShieldCheck className="w-4 h-4" /> Bank-Grade Security
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Your Financial Information Matters
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                Your financial information is personal. Saviora is designed with privacy and security in mind so you can manage your finances with confidence.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-10 sm:mb-12">
              <AnimatedSection delay={0.1}>
                <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 h-full">
                  <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-base sm:text-lg mb-2">Secure Account Access</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Keep your account protected with secure authentication and account controls.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 h-full">
                  <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-base sm:text-lg mb-2">Protected Financial Data</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Your financial information is handled within a secure application environment.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 h-full">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-base sm:text-lg mb-2">Privacy First</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    We respect the privacy of your personal financial information and explain how your data is handled through our privacy policies.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link href="/privacy-policy" className="text-emerald-400 hover:underline flex items-center gap-1 font-medium">
                Privacy Policy <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <Link href="/terms-and-conditions" className="text-emerald-400 hover:underline flex items-center gap-1 font-medium">
                Terms &amp; Conditions <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <Link href="/refund-policy" className="text-emerald-400 hover:underline flex items-center gap-1 font-medium">
                Refund Policy <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 9. WEB + MOBILE */}
        <section className="py-14 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                Your Finances, Wherever You Go
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
                Manage your financial life from the web or your mobile device and keep your money management tools within reach.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
              <AnimatedSection delay={0.1}>
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between h-full">
                  <div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 sm:mb-6">
                      <Laptop className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">Saviora Web</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      A complete workspace for managing income, expenses, budgets, savings goals, analytics, and financial activity on any desktop browser.
                    </p>
                  </div>
                  <a href="https://cloud.saviora.app/register" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full justify-center">
                      Launch Web App <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between h-full">
                  <div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 sm:mb-6">
                      <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">Saviora Mobile</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      Track and manage your finances on the go with the Saviora mobile experience. Seamlessly synced across all your personal devices.
                    </p>
                  </div>
                  <a href="https://cloud.saviora.app/register" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full justify-center">
                      Get Saviora <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* 10. OUR MISSION & OUR VISION */}
        <section className="py-16 sm:py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
          {/* Ambient Lighting & Mesh Glows */}
          <div className="absolute top-0 left-1/4 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-emerald-500/15 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-blue-500/15 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-800/80 shadow-inner">
                <Compass className="w-4 h-4 text-emerald-400" /> Our Purpose &amp; Direction
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
                Driven by Mission. <span className="text-gradient">Guided by Vision.</span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Empowering everyday individuals to master their finances today, while shaping a simpler, smarter financial future for tomorrow.
              </p>
            </AnimatedSection>

            {/* Dual Side-by-Side Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16">
              {/* OUR MISSION CARD */}
              <AnimatedSection delay={0.1} direction="right">
                <div className="h-full p-6 sm:p-8 md:p-10 rounded-3xl overflow-hidden bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl flex flex-col justify-between relative group hover:border-emerald-500/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-28 sm:w-36 h-28 sm:h-36 bg-emerald-500/10 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-110"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-inner">
                        <Target className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-800">
                        OUR MISSION
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-snug">
                      Make Personal Finance Simpler for Everyone
                    </h3>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      Our mission is to make personal finance easier to understand and easier to manage. Saviora brings everyday money tracking, budgeting, savings goals, and financial insights together in one simple platform—helping people manage their money with greater clarity and confidence.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* OUR VISION CARD */}
              <AnimatedSection delay={0.2} direction="left">
                <div className="h-full p-6 sm:p-8 md:p-10 rounded-3xl overflow-hidden bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl flex flex-col justify-between relative group hover:border-blue-500/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-28 sm:w-36 h-28 sm:h-36 bg-blue-500/10 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-110"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shadow-inner">
                        <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-blue-950/90 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-800">
                        OUR VISION
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-snug">
                      A Future Where Financial Progress Starts With Understanding
                    </h3>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      We believe financial progress starts with understanding the money you already have. Saviora&apos;s vision is to make personal finance more accessible, transparent, and practical—helping people build better habits, make informed decisions, and move confidently toward their financial goals.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Core Philosophy Quote Banner */}
            <AnimatedSection delay={0.3} className="max-w-3xl mx-auto text-center">
              <div className="p-5 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-900/60 via-slate-800 to-blue-900/60 backdrop-blur-xl border border-emerald-500/30 text-white shadow-xl relative">
                <p className="text-base sm:text-lg md:text-xl font-bold tracking-wide text-emerald-300 mb-2">
                  &ldquo;Understand your money. Improve your habits. Build your future.&rdquo;
                </p>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-widest">
                  — SAVIORA PHILOSOPHY
                </span>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 11. CODEFOX IT SECTION */}
        <section className="py-14 sm:py-20 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="max-w-4xl mx-auto">
              <div className="p-6 sm:p-10 md:p-12 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 shadow-lg">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
                  <div className="space-y-3 sm:space-y-4 max-w-2xl">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      BUILT BY CODEFOX IT
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                      Technology Behind Saviora
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Saviora is a product developed and maintained by <strong className="text-slate-900 dark:text-white font-semibold">Codefox IT</strong>. Codefox IT combines modern software engineering, thoughtful product design, and technology to create digital solutions that solve real-world problems. Saviora represents that approach in personal finance - bringing practical financial tools together in a simple, modern, and accessible platform.
                    </p>
                    <div className="pt-1 sm:pt-2 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <Code2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      Saviora - A product of Codefox IT
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-full md:w-auto">
                    <a
                      href="http://codefoxit.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto block"
                    >
                      <Button size="lg" className="w-full md:w-auto justify-center whitespace-nowrap shadow-md text-sm sm:text-base">
                        Visit Codefox IT
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 12. FAQ SECTION */}
        <section className="py-14 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                Have questions about Saviora? Find quick answers below.
              </p>
            </AnimatedSection>

            <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
              {faqList.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-4 sm:p-6 font-bold text-slate-900 dark:text-white flex items-center justify-between gap-3 text-sm sm:text-base hover:text-emerald-600 transition-colors cursor-pointer"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                          openFaq === index ? "rotate-180 text-emerald-600" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3 sm:pt-4">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* 13. FINAL CTA SECTION */}
        <section className="py-14 sm:py-20 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-t border-slate-200/80 dark:border-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="max-w-4xl mx-auto text-center">
              <div className="p-6 sm:p-10 md:p-14 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6">
                  Start Building Your Financial Future
                </h2>
                <p className="text-slate-300 text-xs sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
                  Take control of your money today. Track your finances, build better habits, and work toward your goals with Saviora.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto mb-6">
                  <a href="https://cloud.saviora.app/register" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base font-semibold px-6 sm:px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 justify-center">
                      Start Free
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                    </Button>
                  </a>
                  <Link href="/#features" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base font-semibold px-6 sm:px-8 py-3.5 rounded-xl border-slate-700 text-slate-200 hover:bg-slate-800 justify-center">
                      Explore Saviora
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
-                  <span>90-day free trial • No credit card required</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
