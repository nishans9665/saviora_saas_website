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
  TrendingDown, 
  Wallet, 
  Target, 
  BarChart3, 
  Settings, 
  Briefcase, 
  Laptop, 
  PieChart,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import logoSaviora from "@/assets/logo/logo-saviora-web.svg";

const monthlyData = [
  { month: "Jan", height: "45%", value: "$3,800" },
  { month: "Feb", height: "55%", value: "$4,100" },
  { month: "Mar", height: "65%", value: "$4,650" },
  { month: "Apr", height: "72%", value: "$4,900" },
  { month: "May", height: "82%", value: "$5,150" },
  { month: "Jun", height: "96%", value: "$5,420" },
];

export function IncomeHero() {
  const handlePrimaryCtaClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, (action: string, eventName: string, params: Record<string, string>) => void>).gtag;
      gtag("event", "income_tracker_trial_click", {
        event_category: "conversion",
        event_label: "hero_cta",
      });
    }
  };

  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-emerald-50/30 via-slate-50/50 to-white">
      {/* Ambient background aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(34,197,94,0.14),transparent_75%)]" />
        <div className="absolute top-20 right-[-100px] w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Copy & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 text-left flex flex-col items-start">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>INCOME TRACKING</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.14] mb-6">
              Track Your Income in{" "}
              <span className="text-emerald-500 relative inline-block">
                One Simple Place
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              Keep track of the money you earn with Saviora. Record income from different sources, organize your earnings, and review your income history to get a clearer picture of your finances.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <Button
                asChild
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer"
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
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Simple and easy to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Works across all your devices</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>No credit card required</span>
              </div>
            </div>

          </div>

          {/* Right Column: Saviora Income Dashboard Mockup */}
          <div className="lg:col-span-6 xl:col-span-6 w-full">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              
              {/* Subtle background glow under card */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/15 to-emerald-300/15 rounded-3xl blur-xl opacity-70 pointer-events-none" />

              {/* Main Card */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 overflow-hidden flex flex-col md:flex-row">
                
                {/* Mini Sidebar */}
                <div className="hidden sm:flex flex-col w-44 bg-slate-50/70 border-r border-slate-100 p-3.5 justify-between flex-shrink-0">
                  <div>
                    {/* Brand header */}
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/60">
                      <div className="flex items-center gap-1.5">
                        <Image src={logoSaviora} alt="Saviora" className="h-6 w-auto object-contain" />
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    {/* Nav Items */}
                    <nav className="space-y-1">
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-100/60 transition-colors">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Income</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span>Expenses</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <Wallet className="w-3.5 h-3.5" />
                        <span>Budgets</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <Target className="w-3.5 h-3.5" />
                        <span>Savings Goals</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>Reports</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <Settings className="w-3.5 h-3.5" />
                        <span>Settings</span>
                      </div>
                    </nav>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60">
                    <div className="text-[10px] text-slate-400 font-medium">Saviora Pro Trial</div>
                    <div className="text-[11px] font-semibold text-emerald-600">89 Days Remaining</div>
                  </div>
                </div>

                {/* Dashboard Main Workspace */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between bg-white min-w-0">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 gap-2">
                    <div>
                      <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Income</div>
                      <p className="text-[11px] text-slate-400">Track and manage your income sources</p>
                    </div>
                    <button 
                      type="button"
                      className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors"
                      aria-label="Add Income button mockup"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Income</span>
                    </button>
                  </div>

                  {/* Total Income Metric Box with Chart */}
                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5 mb-3.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-medium text-slate-500">Total Income</span>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-white border border-slate-200 text-slate-600 shadow-2xs">
                        <span>This Month</span>
                        <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">$5,420.00</span>
                      <span className="inline-flex items-center text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100">
                        ↑ 15%
                      </span>
                    </div>

                    {/* Monthly Bar Chart */}
                    <div className="pt-2">
                      <div className="h-24 flex items-end justify-between gap-2 px-1">
                        {monthlyData.map((item, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center gap-1.5 group">
                            <div className="w-full h-20 bg-slate-100 rounded-t-sm flex items-end overflow-hidden relative">
                              <div 
                                className={`w-full rounded-t-sm transition-all duration-500 ${
                                  index === monthlyData.length - 1 
                                    ? "bg-emerald-500" 
                                    : "bg-emerald-400/80 group-hover:bg-emerald-500/90"
                                }`}
                                style={{ height: item.height }}
                              />
                            </div>
                            <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                              {item.month}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Income List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800">Recent Income</span>
                      <span className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                        View all →
                      </span>
                    </div>

                    <div className="space-y-2">
                      {/* Item 1 */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50/50 hover:bg-slate-50 border border-slate-100/80 transition-colors">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-slate-200/80 text-slate-700 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-3.5 h-3.5" />
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-semibold text-slate-900 truncate">Salary</p>
                            <p className="text-[10px] text-slate-400 truncate">Main Job</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-bold text-emerald-600">+ $3,000.00</p>
                          <p className="text-[10px] text-slate-400">Jun 1, 2024</p>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50/50 hover:bg-slate-50 border border-slate-100/80 transition-colors">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                            <Laptop className="w-3.5 h-3.5" />
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-semibold text-slate-900 truncate">Freelance Project</p>
                            <p className="text-[10px] text-slate-400 truncate">Freelance</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-bold text-emerald-600">+ $1,200.00</p>
                          <p className="text-[10px] text-slate-400">May 28, 2024</p>
                        </div>
                      </div>

                      {/* Item 3 */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50/50 hover:bg-slate-50 border border-slate-100/80 transition-colors">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                            <PieChart className="w-3.5 h-3.5" />
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-semibold text-slate-900 truncate">Investment Dividend</p>
                            <p className="text-[10px] text-slate-400 truncate">Investment</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-bold text-emerald-600">+ $250.00</p>
                          <p className="text-[10px] text-slate-400">May 15, 2024</p>
                        </div>
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
