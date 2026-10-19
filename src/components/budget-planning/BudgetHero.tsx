"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Plus,
  ChevronDown,
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  PieChart,
  Target,
  BarChart2,
  Settings,
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  Wallet,
  Activity,
  Calendar,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import logoSaviora from "@/assets/logo/logo-saviora-web-tag.svg";

export function BudgetHero() {
  const handlePrimaryCtaClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, (action: string, eventName: string, params: Record<string, string>) => void>).gtag;
      gtag("event", "budget_planning_trial_click", {
        event_category: "conversion",
        event_label: "hero_cta",
      });
    }
  };

  const scrollToOverview = () => {
    const el = document.getElementById("budget-overview");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-emerald-500/5 via-slate-50/50 to-white">
      {/* Ambient background aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[560px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(21,128,61,0.12),transparent_75%)]" />
        <div className="absolute top-20 right-[-100px] w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-48 left-[-120px] w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Heading, Copy & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 text-left flex flex-col items-start">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>SMART MONTHLY BUDGETING</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.14] mb-6">
              Monthly Budget Planning{" "}
              <span className="text-emerald-700 relative inline-block">
                Made Simple
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              Take control of your money with Saviora&apos;s monthly budget planner. Create category-wise budgets, set personalized spending limits, monitor expenses, and see how much money remains throughout the month.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <Button
                asChild
                size="lg"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-emerald-700/25 hover:shadow-lg hover:shadow-emerald-700/35 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer"
                onClick={handlePrimaryCtaClick}
              >
                <Link
                  href="https://cloud.saviora.app/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <span>Start Planning Your Budget</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-full px-7 py-3.5 shadow-xs transition-all duration-300 justify-center cursor-pointer"
                onClick={scrollToOverview}
              >
                <a href="#budget-overview">Explore Budget Features</a>
              </Button>
            </div>

            {/* Supporting Benefits */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-600 pt-2 border-t border-slate-100 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Category-Based Budgeting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Clear Spending Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Flexible Spending Limits</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Saviora Budget Management Product Mockup */}
          <div className="lg:col-span-6 xl:col-span-6 w-full">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Subtle background ambient aura under card */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-amber-500/15 rounded-3xl blur-xl opacity-80 pointer-events-none" />

              {/* Main Card Frame */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 overflow-hidden flex flex-col sm:flex-row text-left">
                {/* Left Mini Sidebar */}
                <div className="hidden sm:flex flex-col w-40 bg-slate-50/70 border-r border-slate-100 p-3 justify-between flex-shrink-0 select-none">
                  <div>
                    {/* Brand Header */}
                    <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-200/60">
                      <Image
                        src={logoSaviora}
                        alt="Saviora"
                        className="h-5 w-auto object-contain"
                        priority
                      />
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    {/* Nav List */}
                    <nav className="space-y-1">
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                        <span>Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                        <span>Income</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                        <span>Expenses</span>
                      </div>
                      {/* Active Budgets Nav Item */}
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/70 transition-colors">
                        <PieChart className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Budgets</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <Target className="w-3.5 h-3.5 text-slate-400" />
                        <span>Savings Goals</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Analytics</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>Settings</span>
                      </div>
                    </nav>
                  </div>

                  {/* Sidebar Bottom: Plan Badge */}
                  <div className="pt-2.5 border-t border-slate-200/60">
                    <div className="text-[10px] text-slate-400 font-medium">Saviora Pro Trial</div>
                    <div className="text-[11px] font-bold text-emerald-700">77 Days Remaining</div>
                  </div>
                </div>

                {/* Main Dashboard Area */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between bg-white min-w-0">
                  {/* Top Bar matching Screenshot 3 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-100 gap-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                          Budget Management
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Plan, track, and optimize your monthly spending
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <div className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-500 font-medium">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>Close</span>
                      </div>
                      <div className="inline-flex items-center gap-1 bg-emerald-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-2xs">
                        <Plus className="w-3 h-3" />
                        <span>Create</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Stat Cards */}
                  <div className="grid grid-cols-2 gap-2 mb-3.5">
                    {/* Stat 1: Total Budget */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2.5">
                      <div className="flex items-center justify-between text-slate-400 mb-0.5">
                        <span className="text-[10px] font-medium text-slate-500">Total Budget</span>
                        <Wallet className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900">$4,850.00</div>
                      <div className="text-[10px] text-emerald-600 font-medium">6 Active Budgets</div>
                    </div>

                    {/* Stat 2: Total Spent */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2.5">
                      <div className="flex items-center justify-between text-slate-400 mb-0.5">
                        <span className="text-[10px] font-medium text-slate-500">Total Spent</span>
                        <Activity className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900">$3,640.00</div>
                      <div className="text-[10px] text-slate-500 font-medium">75.1% Usage</div>
                    </div>

                    {/* Stat 3: Remaining Balance */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2.5">
                      <div className="flex items-center justify-between text-slate-400 mb-0.5">
                        <span className="text-[10px] font-medium text-slate-500">Remaining</span>
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                      </div>
                      <div className="text-sm sm:text-base font-bold text-emerald-700">$1,210.00</div>
                      <div className="text-[10px] text-slate-400 font-medium">Available to spend</div>
                    </div>

                    {/* Stat 4: Overspent Categories */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2.5">
                      <div className="flex items-center justify-between text-slate-400 mb-0.5">
                        <span className="text-[10px] font-medium text-slate-500">Overspent</span>
                        <AlertTriangle className="w-3 h-3 text-rose-500" />
                      </div>
                      <div className="text-sm sm:text-base font-bold text-rose-600">1 Category</div>
                      <div className="text-[10px] text-rose-500 font-medium">Requires attention</div>
                    </div>
                  </div>

                  {/* Category Budget Previews (Matching Screenshot 3) */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 px-0.5">
                      <span>Monthly Budgets</span>
                      <div className="flex items-center gap-1 text-[10px] font-normal text-slate-400">
                        <span className="text-emerald-700 font-medium">Safe</span> •
                        <span className="text-[#ea580c] font-medium">Warning</span> •
                        <span className="text-rose-600 font-medium">Overspent</span>
                      </div>
                    </div>

                    {/* Card 1: Food (Overspent State) */}
                    <div className="border border-rose-200/80 bg-rose-50/30 rounded-xl p-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">Food &amp; Dining</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                            OVERSPENT
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-800">
                          $920.00 <span className="font-normal text-slate-400 text-[10px]">of $850.00</span>
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="bg-rose-500 h-1.5 rounded-full w-full" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="text-rose-600 font-medium">108.2% Used</span>
                        <span className="text-rose-600 font-semibold">-$70.00 remaining</span>
                      </div>
                    </div>

                    {/* Card 2: Transportation (Warning State with Strict Limit) */}
                    <div className="border border-amber-200/80 bg-amber-50/30 rounded-xl p-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">Transportation</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                            WARNING
                          </span>
                          <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-white text-emerald-700 border border-emerald-200">
                            <ShieldAlert className="w-2.5 h-2.5" />
                            <span>Strict Limit</span>
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-800">
                          $465.00 <span className="font-normal text-slate-400 text-[10px]">of $500.00</span>
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="bg-[#ea580c] h-1.5 rounded-full w-[93%]" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="text-amber-700 font-medium">93.0% Used</span>
                        <span className="text-emerald-700 font-semibold">$35.00 remaining</span>
                      </div>
                    </div>

                    {/* Card 3: Housing & Utilities (Safe State) */}
                    <div className="border border-emerald-200/80 bg-emerald-50/20 rounded-xl p-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">Insurance &amp; Housing</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                            SAFE
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-800">
                          $1,420.00 <span className="font-normal text-slate-400 text-[10px]">of $1,800.00</span>
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="bg-emerald-600 h-1.5 rounded-full w-[78.8%]" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="text-emerald-700 font-medium">78.8% Used</span>
                        <span className="text-emerald-700 font-semibold">$380.00 remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
