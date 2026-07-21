"use client";

import React, { useState, useEffect } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Target, 
  Settings, 
  LogOut, 
  Bell, 
  ChevronDown, 
  Calendar, 
  Wallet, 
  Sparkles 
} from "lucide-react";
import Image from "next/image";
import logoSaviora from "@/assets/logo/logo-saviora-web.svg";

const chartData = [
  { name: "Jan", income: 85000, expenses: 62000 },
  { name: "Feb", income: 90000, expenses: 58000 },
  { name: "Mar", income: 95000, expenses: 64000 },
  { name: "Apr", income: 110000, expenses: 75000 },
  { name: "May", income: 115000, expenses: 80000 },
  { name: "Jun", income: 125000, expenses: 99500 },
];

export function DashboardShowcase() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900/20">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Watch Your Money Grow, One Smart <span className="text-gradient">Decision at a Time</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            From daily spending to long - term savings, Saviora transforms your financial data into clear, actionable insights - helping you stay in control and grow your financial future with confidence.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative mx-auto max-w-6xl">
            {/* Main Dashboard Wrapper */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-2xl overflow-hidden relative z-10 flex flex-col lg:flex-row h-auto lg:h-[750px]">
              
              {/* Sidebar Mockup (Left Side) */}
              <div className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800 p-5 justify-between flex-shrink-0">
                <div>
                  {/* Logo */}
                  <div className="flex items-center gap-2 mb-8">
                    <Image src={logoSaviora} alt="Saviora logo" className="h-10 w-auto dark:brightness-110" />
                  </div>
                  
                  {/* Navigation Links */}
                  <nav className="space-y-1.5">
                    {[
                      { name: "Dashboard", icon: LayoutDashboard, active: true },
                      { name: "Income", icon: TrendingUp, active: false },
                      { name: "Expenses", icon: TrendingDown, active: false },
                      { name: "Analytics", icon: PieChart, active: false },
                      { name: "Budgets", icon: Wallet, active: false },
                      { name: "Savings Goals", icon: Target, active: false },
                      { name: "Settings", icon: Settings, active: false },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                          item.active
                            ? "bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400"
                            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </div>
                    ))}
                  </nav>
                </div>
                
                {/* Plan Card & Dark Mode */}
                <div className="space-y-4">
                  {/* Pro Plan Card */}
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Current Plan</span>
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold">PRO MONTHLY</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2">Renew Date: 8/18/2026</p>
                    <button className="w-full text-center py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-colors">
                      Manage Plan
                    </button>
                  </div>
                  
                  {/* Light / Dark Mode Toggle Mockup */}
                  <div className="flex gap-2">
                    <div className="flex-1 flex bg-slate-100 dark:bg-slate-950 rounded-lg p-1 text-xs">
                      <div className="flex-1 py-1 text-center font-medium bg-white dark:bg-slate-900 rounded-md text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer">
                        Light
                      </div>
                      <div className="flex-1 py-1 text-center font-medium text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-700">
                        Dark
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-500 hover:text-rose-600 cursor-pointer text-sm font-medium px-2 py-1 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900/10 overflow-visible lg:overflow-hidden">
                {/* Top Header Mockup */}
                <div className="bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row gap-3 justify-between sm:items-center flex-shrink-0">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">Financial Overview</h3>
                    <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">Welcome back! Here&apos;s what&apos;s happening with your money today.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-shrink-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>June 2026</span>
                      <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5 sm:ml-1" />
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 px-2 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold border border-emerald-100 dark:border-emerald-900/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      OPEN
                    </div>
                    <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs px-3 py-2 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap">
                      Close Month
                    </button>
                    <div className="relative w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex-shrink-0">
                      <Bell className="w-4 h-4" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
                    </div>
                    <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-2.5 sm:pl-3 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                        JD
                      </div>
                      <span className="hidden md:inline text-xs font-semibold text-slate-700 dark:text-slate-300">John Doe</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Widgets Scroll Container */}
                <div className="p-4 space-y-4 flex-grow overflow-y-auto">
                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { title: "Monthly Balance", value: "$25,500.00", subtitle: "Net for June 2026", icon: Wallet, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" },
                      { title: "Monthly Income", value: "$125,000.00", subtitle: "Current month earnings", icon: TrendingUp, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
                      { title: "Monthly Expenses", value: "$99,500.00", subtitle: "Current month spending", icon: TrendingDown, color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30" },
                      { title: "Total Savings", value: "$45,000.00", subtitle: "Total goal contributions", icon: Target, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" },
                    ].map((card, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-4 rounded-xl flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 font-medium">{card.title}</span>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{card.value}</h4>
                          <span className="text-[9px] text-slate-400 block">{card.subtitle}</span>
                        </div>
                        <div className={`p-2 rounded-lg flex-shrink-0 ${card.color}`}>
                          <card.icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Main Grid: Left Column & Right Column */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    
                    {/* Left Column (Chart & Transactions) */}
                    <div className="lg:col-span-2 space-y-4">
                      
                      {/* Chart Widget */}
                      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white">Income vs Expenses</h4>
                          <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Income</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" /> Expenses</span>
                          </div>
                        </div>
                        <div className="h-[180px] w-full">
                          {mounted && (
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <defs>
                                  <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                  </linearGradient>
                                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(val) => `$${val/1000}k`} />
                                <Tooltip 
                                  contentStyle={{ 
                                    borderRadius: '8px', 
                                    border: '1px solid rgba(148, 163, 184, 0.1)', 
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                                  }}
                                />
                                <Area type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorInc)" />
                                <Area type="monotone" dataKey="expenses" stroke="#F97316" strokeWidth={2} fillOpacity={1} fill="url(#colorExp)" />
                              </AreaChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>

                      {/* Recent Transactions */}
                      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white">Recent Transactions</h4>
                          <span className="text-[10px] text-primary-500 hover:underline cursor-pointer font-semibold">View Statement</span>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                          {[
                            { name: "food", desc: "Jul 1 - FOOD & GROCERIES", amount: "-$1,000.00", isIncome: false },
                            { name: "Salary", desc: "Jun 30 - INCOME", amount: "+$125,000.00", isIncome: true },
                            { name: "Netflix", desc: "Jun 28 - SUBSCRIPTIONS", amount: "-$1,490.00", isIncome: false },
                          ].map((tx, idx) => (
                            <div key={idx} className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                  tx.isIncome 
                                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                                    : "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400"
                                }`}>
                                  {tx.name.substring(0, 1).toUpperCase()}
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{tx.name}</p>
                                  <p className="text-[9px] text-slate-400">{tx.desc}</p>
                                </div>
                              </div>
                              <span className={`text-xs font-bold ${
                                tx.isIncome ? "text-emerald-500" : "text-slate-800 dark:text-slate-200"
                              }`}>
                                {tx.amount}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right Column (Financial Health, Budgets & Insights) */}
                    <div className="space-y-4">
                      
                      {/* Financial Health Widget */}
                      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-4 rounded-xl flex flex-col items-center">
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white self-start mb-3">Financial Health</h4>
                        
                        <div className="relative w-20 h-20 flex items-center justify-center">
                          {/* Circular Progress Gauge */}
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-slate-100 dark:text-slate-800"
                              strokeWidth="3.5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-emerald-500"
                              strokeWidth="3.5"
                              strokeDasharray="94, 100"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <div className="absolute text-center">
                            <span className="text-base font-black text-slate-900 dark:text-white">94</span>
                            <p className="text-[7px] text-slate-400 font-semibold tracking-wider uppercase">SCORE</p>
                          </div>
                        </div>
                        
                        <span className="mt-2 text-[8px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-center">
                          EXCELLENT
                        </span>
                        
                        <p className="mt-1.5 text-[9px] text-slate-400 text-center leading-relaxed">
                          Your health score is calculated based on your monthly savings vs expenses ratio.
                        </p>
                      </div>

                      {/* Active Budgets Widget */}
                      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2.5">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white">Active Budgets</h4>
                          <span className="text-[9px] text-primary-500 font-semibold hover:underline cursor-pointer">VIEW ALL</span>
                        </div>
                        <div className="space-y-2.5">
                          {[
                            { name: "Food & Groceries", spent: 8500, total: 15000, color: "bg-emerald-500" },
                            { name: "Rent & Utilities", spent: 45000, total: 45000, color: "bg-orange-500" },
                          ].map((bgt, idx) => {
                            const percent = Math.min(100, Math.round((bgt.spent / bgt.total) * 100));
                            return (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-[9px] font-semibold">
                                  <span className="text-slate-600 dark:text-slate-350">{bgt.name}</span>
                                  <span className="text-slate-500">${bgt.spent.toLocaleString()} / ${bgt.total.toLocaleString()}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div className={`h-full ${bgt.color} rounded-full`} style={{ width: `${percent}%` }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Smart Insights Widget */}
                      <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30 p-3 rounded-xl flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400">Savings Improved</p>
                          <p className="text-[8px] text-emerald-600 dark:text-emerald-500 leading-relaxed mt-0.5">
                            Your savings goal contributions are up 12% from last month. Keep it up!
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
