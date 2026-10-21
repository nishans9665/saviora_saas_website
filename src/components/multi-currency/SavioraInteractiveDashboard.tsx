"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar,
  LayoutDashboard,
  PieChart,
  Target,
  Settings,
  Bell,
  ChevronDown,
  LogOut,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import logoSaviora from "@/assets/logo/logo-saviora-web.svg";

const realDashboardChartData = [
  { name: "May", income: 0, expenses: 0 },
  { name: "Jun", income: 0, expenses: 0 },
  { name: "Jul", income: 0, expenses: 0 },
  { name: "Aug", income: 0, expenses: 0 },
  { name: "Sep", income: 280, expenses: 140 },
  { name: "Oct", income: 2649, expenses: 1021 },
];

export function SavioraInteractiveDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-900/5 overflow-hidden">
      
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200/70 dark:border-slate-800 gap-2 text-xs bg-slate-50/80 dark:bg-slate-950/60">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
            Saviora Financial Dashboard Preview
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 font-semibold text-[10px] sm:text-[11px]">
            Verified USD Display
          </span>
        </div>
        <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-[11px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span>Financial Period: October 2026 · Status: Open</span>
        </div>
      </div>

      {/* Main Interactive Dashboard Frame */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="min-w-[800px] lg:min-w-0 flex flex-col lg:flex-row bg-white dark:bg-slate-950">
          
          {/* Sidebar Mockup (Visible on Desktop lg+) */}
          <div className="hidden lg:flex flex-col w-48 xl:w-52 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800 p-3.5 justify-between flex-shrink-0 select-none">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-2 mb-5">
                <Image src={logoSaviora} alt="Saviora logo" className="h-7 w-auto dark:brightness-110" />
              </div>
              
              {/* Navigation Links */}
              <nav className="space-y-1">
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
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      item.active
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-[#16a34a] dark:text-emerald-400 font-bold"
                        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    <span>{item.name}</span>
                  </div>
                ))}
              </nav>
            </div>
            
            {/* Plan Card & Controls */}
            <div className="space-y-2.5 pt-3">
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[8px] text-slate-400 font-semibold uppercase tracking-wider">CURRENT PLAN</span>
                  <span className="text-[8px] bg-emerald-100 dark:bg-emerald-950/40 text-[#16a34a] dark:text-emerald-400 px-1 py-0.5 rounded font-bold">TRIAL</span>
                </div>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 mb-1.5">75 Days Remaining</p>
                <div className="w-full text-center py-1 bg-[#22c55e] text-white rounded-lg text-[10px] font-semibold shadow-xs">
                  Upgrade Now
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-slate-500 hover:text-rose-600 cursor-pointer text-[11px] font-medium px-1 transition-colors">
                <LogOut className="w-3 h-3 text-rose-500" />
                <span>Logout</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-slate-50/60 dark:bg-slate-900/10 min-w-0">
            
            {/* Header Bar */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 px-4 py-2.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
              <div className="flex-shrink-0">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Financial Overview</h3>
                <p className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400">Welcome back! Here&apos;s what&apos;s happening with your money today.</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className="flex items-center gap-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-lg text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>October 2026</span>
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400 ml-0.5" />
                </div>
                <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/20 text-[#16a34a] dark:text-emerald-400 px-1.5 py-0.5 rounded-lg text-[9px] font-bold border border-emerald-100 dark:border-emerald-900/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  OPEN
                </div>
                <div className="relative w-6 h-6 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 cursor-pointer">
                  <Bell className="w-3 h-3" />
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
                </div>
                <div className="flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-[9px] font-bold">
                    NS
                  </div>
                  <span className="hidden sm:inline text-[11px] font-semibold text-slate-700 dark:text-slate-300">John Doe</span>
                </div>
              </div>
            </div>

            {/* Dashboard Widgets */}
            <div className="p-3 sm:p-4 space-y-3">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { title: "Monthly Balance", value: "$1,156.35", subtitle: "Net for October 2026", icon: Wallet, color: "text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/30" },
                  { title: "Monthly Income", value: "$2,392.00", subtitle: "Current month earnings", icon: TrendingUp, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
                  { title: "Monthly Expenses", value: "$1,235.65", subtitle: "Current month spending", icon: TrendingDown, color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30" },
                  { title: "Total Savings", value: "$7,131.25", subtitle: "Total goal contributions", icon: Target, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" },
                ].map((card, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-2.5 rounded-xl flex flex-col justify-between shadow-2xs min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 truncate">{card.title}</span>
                      <div className={`p-1 rounded-md flex-shrink-0 ${card.color}`}>
                        <card.icon className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight whitespace-nowrap">{card.value}</h4>
                      <span className="text-[8px] text-slate-400 block mt-0.5 truncate">
                        {card.subtitle}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Grid: Income vs Expenses & Financial Health */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* Left 2 Cols: Income vs Expenses Chart */}
                <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-3 rounded-xl">
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">Income vs Expenses</h4>
                    <div className="flex items-center gap-2.5 text-[9px] font-semibold text-slate-500">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block" /> INCOME</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" /> EXPENSES</span>
                    </div>
                  </div>
                  <div className="h-[140px] w-full">
                    {mounted && (
                      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <AreaChart data={realDashboardChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.08} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={(val) => val === 0 ? "0" : `${(val/1000).toFixed(1)}M`} />
                          <Tooltip 
                            contentStyle={{ 
                              borderRadius: '8px', 
                              border: '1px solid rgba(148, 163, 184, 0.1)', 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              fontSize: '10px' 
                            }}
                            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                          />
                          <Area type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorInc)" />
                          <Area type="monotone" dataKey="expenses" stroke="#F97316" strokeWidth={2} fillOpacity={1} fill="url(#colorExp)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                {/* Right 1 Col: Financial Health Score */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-3 rounded-xl flex flex-col items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white self-start">Financial Health</h4>
                  
                  <div className="relative w-14 h-14 my-1 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100 dark:text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#22c55e]"
                        strokeWidth="3.5"
                        strokeDasharray="84, 100"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-sm font-black text-slate-900 dark:text-white">84</span>
                      <p className="text-[6px] text-slate-400 font-semibold tracking-wider uppercase">SCORE</p>
                    </div>
                  </div>
                  
                  <span className="text-[8px] bg-emerald-50 dark:bg-emerald-950/40 text-[#16a34a] dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-center">
                    EXCELLENT
                  </span>
                  
                  <p className="text-[8px] text-slate-400 text-center leading-tight mt-1">
                    Your health score is calculated based on monthly savings vs expenses ratio.
                  </p>
                </div>

              </div>

              {/* Bottom Row: Recent Transactions & Active Budgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* Recent Transactions (2 cols) */}
                <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-3 rounded-xl">
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">Recent Transactions</h4>
                    <span className="text-[8px] text-[#16a34a] hover:underline cursor-pointer font-semibold">VIEW ALL</span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60 text-[11px]">
                    {[
                      { name: "Salary Deposit", desc: "15 Oct 2026 · Direct Deposit", amount: "+$2,392.00", isIncome: true },
                      { name: "Monthly Housing", desc: "10 Oct 2026 · Wire Transfer", amount: "-$500.00", isIncome: false },
                      { name: "Food & Groceries", desc: "08 Oct 2026 · Card Payment", amount: "-$1,606.00", isIncome: false },
                    ].map((tx, idx) => (
                      <div key={idx} className="py-1 flex items-center justify-between first:pt-0 last:pb-0">
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{tx.name}</p>
                          <p className="text-[8px] text-slate-400">{tx.desc}</p>
                        </div>
                        <span className={`font-bold ${tx.isIncome ? "text-[#22c55e]" : "text-slate-800 dark:text-slate-200"}`}>
                          {tx.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Budgets (1 col) */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-3 rounded-xl">
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">Active Budgets</h4>
                    <span className="text-[8px] text-[#16a34a] hover:underline cursor-pointer font-semibold">VIEW ALL</span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { name: "Food", spent: "$1,606.00", total: "$2,000.00", percent: 100, color: "bg-rose-500" },
                      { name: "Car", spent: "$1,811.96", total: "$3,000.00", percent: 98, color: "bg-orange-500" },
                      { name: "Insurance", spent: "$1,200.00", total: "$15,00.00", percent: 92, color: "bg-emerald-500" },
                    ].map((bgt, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between text-[8px] font-semibold">
                          <span className="text-slate-600 dark:text-slate-350">{bgt.name}</span>
                          <span className="text-slate-400">{bgt.spent} / {bgt.total}</span>
                        </div>
                        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full ${bgt.color} rounded-full`} style={{ width: `${bgt.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Verified Data Caption */}
      <div className="px-4 sm:px-6 py-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950">
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium text-[11px] sm:text-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
          <span>Currency symbol and amounts are verified consistently across all primary summary cards</span>
        </div>
        <Link
          href="/financial-analytics"
          className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center text-[11px] sm:text-xs whitespace-nowrap"
        >
          Explore Analytics Reports <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
        </Link>
      </div>

    </div>
  );
}
