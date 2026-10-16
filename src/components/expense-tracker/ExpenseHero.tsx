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
  BarChart2,
  PieChart, 
  Target, 
  Settings, 
  Sparkles,
  ShoppingBag,
  Utensils,
  Car
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import logoSaviora from "@/assets/logo/logo-saviora-web-tag.svg";

const monthlyExpenseBars = [
  { month: "Jan", height: "45%" },
  { month: "Feb", height: "58%" },
  { month: "Mar", height: "50%" },
  { month: "Apr", height: "72%" },
  { month: "May", height: "64%" },
  { month: "Jun", height: "88%" },
];

const recentExpenses = [
  {
    title: "Groceries",
    category: "Whole Foods",
    date: "Today",
    amount: "-$86.20",
    icon: ShoppingBag,
    iconColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    title: "Restaurant",
    category: "Starbucks",
    date: "Yesterday",
    amount: "-$12.50",
    icon: Utensils,
    iconColor: "bg-rose-50 text-rose-500 border-rose-100",
  },
  {
    title: "Transport",
    category: "Uber",
    date: "Oct 15, 2026",
    amount: "-$18.30",
    icon: Car,
    iconColor: "bg-sky-50 text-sky-600 border-sky-100",
  },
];

export function ExpenseHero() {
  const handlePrimaryCtaClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, (action: string, eventName: string, params: Record<string, string>) => void>).gtag;
      gtag("event", "expense_tracker_trial_click", {
        event_category: "conversion",
        event_label: "hero_cta",
      });
    }
  };

  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#ea580c]/5 via-slate-50/50 to-white">
      {/* Ambient background aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[560px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(234,88,12,0.12),transparent_75%)]" />
        <div className="absolute top-20 right-[-100px] w-96 h-96 bg-[#ea580c]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-48 left-[-120px] w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Copy & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 text-left flex flex-col items-start">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea580c]/10 border border-[#ea580c]/25 text-[#ea580c] text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0" />
              <span>EXPENSE TRACKING</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.14] mb-6">
              Track Your Expenses and Understand{" "}
              <span className="text-[#ea580c] relative inline-block">
                Where Your Money Goes
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              Record your daily expenses, organize transactions into categories, and review your spending history with Saviora. Get a clearer view of your spending habits and make more informed financial decisions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <Button
                asChild
                size="lg"
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-[#ea580c]/25 hover:shadow-lg hover:shadow-[#ea580c]/35 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer"
                onClick={handlePrimaryCtaClick}
              >
                <Link href="https://cloud.saviora.app/register" target="_blank" className="flex items-center justify-center">
                  <span>Start Your 90-Day Pro Trial</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-full px-7 py-3.5 shadow-xs transition-all duration-300 justify-center cursor-pointer"
              >
                <Link href="/features">
                  Explore All Features
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                <span>Simple and easy to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                <span>Works across your devices</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                <span>No credit card required</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean, Premium Saviora Expense Mockup (Matching Reference 3) */}
          <div className="lg:col-span-6 xl:col-span-6 w-full">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              
              {/* Subtle background ambient aura under card */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#ea580c]/15 to-amber-500/15 rounded-3xl blur-xl opacity-75 pointer-events-none" />

              {/* Main Card Frame */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 overflow-hidden flex flex-col sm:flex-row text-left">
                
                {/* Left Mini Sidebar */}
                <div className="hidden sm:flex flex-col w-44 bg-slate-50/70 border-r border-slate-100 p-3.5 justify-between flex-shrink-0 select-none">
                  <div>
                    {/* Brand Header */}
                    <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-slate-200/60">
                      <Image src={logoSaviora} alt="Saviora" className="h-6 w-auto object-contain" priority />
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    {/* Nav List */}
                    <nav className="space-y-1">
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                        <span>Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                        <span>Income</span>
                      </div>
                      {/* Active Expenses Nav Item */}
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#ea580c] bg-[#ea580c]/15 border border-[#ea580c]/25 transition-colors">
                        <CreditCard className="w-3.5 h-3.5 text-[#ea580c]" />
                        <span>Expenses</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <PieChart className="w-3.5 h-3.5 text-slate-400" />
                        <span>Budgets</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <Target className="w-3.5 h-3.5 text-slate-400" />
                        <span>Savings Goals</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Reports</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>Settings</span>
                      </div>
                    </nav>
                  </div>

                  {/* Sidebar Bottom: Plan Badge */}
                  <div className="pt-3 border-t border-slate-200/60">
                    <div className="text-[10px] text-slate-400 font-medium">Saviora Pro Trial</div>
                    <div className="text-[11px] font-bold text-[#ea580c]">80 Days Remaining</div>
                  </div>
                </div>

                {/* Main Workspace Area */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between bg-white min-w-0">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 gap-2">
                    <div>
                      <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Expenses</div>
                      <p className="text-[11px] text-slate-400">Track and manage your daily expenses</p>
                    </div>
                    <button 
                    type="button"
                    onClick={() => {
                      const formEl = document.getElementById("add-expense-showcase");
                      if (formEl) {
                        formEl.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
                    aria-label="Add Expense button"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Expense</span>
                  </button>
                  </div>

                  {/* Total Expenses Card with Monthly Chart */}
                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5 mb-3.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-medium text-slate-500">Total Expenses</span>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-white border border-slate-200 text-slate-600 shadow-2xs">
                        <span>This Month</span>
                        <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">$2,340.50</span>
                      <span className="inline-flex items-center text-[11px] font-bold text-[#ea580c] bg-[#ea580c]/10 px-2 py-0.5 rounded-full border border-[#ea580c]/20">
                        ↑ 12%
                      </span>
                    </div>

                    {/* Clean Monthly Bar Chart (Reference 3) */}
                    <div className="pt-2">
                      <div className="h-24 flex items-end justify-between gap-2.5 px-1">
                        {monthlyExpenseBars.map((bar, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center gap-1.5 group">
                            <div className="w-full h-20 bg-slate-100 rounded-t-md flex items-end overflow-hidden">
                              <div 
                                className={`w-full rounded-t-md transition-all duration-500 ${
                                  index === monthlyExpenseBars.length - 1 
                                    ? "bg-[#ea580c]" 
                                    : "bg-[#ea580c]/70 group-hover:bg-[#ea580c]"
                                }`}
                                style={{ height: bar.height }}
                              />
                            </div>
                            <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                              {bar.month}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Expenses List (Reference 3) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800">Recent Expenses</span>
                      <span 
                        onClick={() => {
                          const formEl = document.getElementById("add-expense-showcase");
                          if (formEl) {
                            formEl.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="text-[11px] font-semibold text-[#ea580c] hover:text-[#c2410c] cursor-pointer"
                      >
                        View all →
                      </span>
                    </div>

                    <div className="space-y-2">
                      {recentExpenses.map((tx, idx) => {
                        const Icon = tx.icon;
                        return (
                          <div 
                            key={idx}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/60 hover:bg-slate-50 border border-slate-100 transition-colors"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${tx.iconColor}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <p className="text-xs font-bold text-slate-900 truncate leading-tight">{tx.title}</p>
                                <p className="text-[10px] text-slate-400 truncate">{tx.category}</p>
                              </div>
                            </div>

                            <div className="text-right flex-shrink-0">
                              <p className="text-xs font-extrabold text-rose-600">{tx.amount}</p>
                              <p className="text-[10px] text-slate-400">{tx.date}</p>
                            </div>
                          </div>
                        );
                      })}
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
