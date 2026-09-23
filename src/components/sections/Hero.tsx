"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Rocket, 
  X, 
  Sparkles, 
  TrendingUp, 
  TrendingDown,
  Wallet, 
  CheckCircle2, 
  Gift, 
  CreditCard, 
  Calendar,
  LayoutDashboard,
  PieChart,
  Target,
  Settings,
  Bell,
  ChevronDown,
  LogOut
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/Button";
import logoSaviora from "@/assets/logo/logo-saviora-web.svg";

const realDashboardChartData = [
  { name: "Jan", income: 70000, expenses: 62000 },
  { name: "Feb", income: 75000, expenses: 58000 },
  { name: "Mar", income: 82000, expenses: 64000 },
  { name: "Apr", income: 95000, expenses: 75000 },
  { name: "May", income: 105000, expenses: 80000 },
  { name: "Jun", income: 125000, expenses: 99500 },
];

export function Hero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-32 sm:pt-36 md:pt-36 lg:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Ultra-Smooth Full-Bleed Ambient Background Glows */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Soft Radial Ambient Aura Centered at Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-[650px] bg-[radial-gradient(ellipse_75%_60%_at_50%_0%,rgba(34,197,94,0.08),transparent_80%)] dark:bg-[radial-gradient(ellipse_75%_60%_at_50%_0%,rgba(34,197,94,0.14),transparent_80%)]" />

        {/* Soft Ambient Glow Behind Left Content */}
        <motion.div 
          className="absolute -top-24 -left-20 w-[650px] h-[650px] bg-emerald-400/08 dark:bg-emerald-500/10 rounded-full filter blur-[120px]"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Soft Orange Glow Overlay Behind Right Dashboard */}
        <motion.div 
          className="absolute -top-10 -right-20 w-[650px] h-[650px] bg-amber-400/15 dark:bg-amber-500/15 rounded-full filter blur-[120px]"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 30, -20, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          
          {/* LEFT COLUMN: Copywriting & CTAs */}
          <motion.div 
            className="lg:col-span-5 text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 sm:mb-5"
            >
              <span className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-emerald-50/80 dark:bg-emerald-950/50 text-[#16a34a] dark:text-emerald-400 text-xs sm:text-sm font-semibold border border-[#22c55e]/20 shadow-sm">
                <Rocket className="w-4 h-4 text-[#22c55e] animate-bounce-slow" />
                <span>Your All-in-One Personal Finance App</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Take Control of Your Money with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-emerald-400 underline decoration-[#22c55e]/30 underline-offset-8">Saviora</span>
            </motion.h1>

            {/* Description Paragraph */}
            <motion.p
              className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mb-6 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Track your income and expenses, manage monthly budgets, and achieve your savings goals with Saviora - your simple, all-in-one personal finance app.
            </motion.p>

            {/* Saviora Pro 90 Days Free Seamless Glass Callout Box */}
            <motion.div
              className="mb-7 p-3.5 sm:p-4 max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl flex items-center gap-3.5 shadow-sm shadow-emerald-500/5 transition-all hover:border-[#22c55e]/30 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 text-[#22c55e] dark:text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold shadow-inner">
                <Gift className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  Get Saviora Pro <span className="text-[#16a34a] dark:text-emerald-400">FREE for 90 Days</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  No credit card required
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden text-base bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold shadow-lg shadow-[#22c55e]/25 hover:shadow-xl hover:shadow-[#22c55e]/35 hover:-translate-y-0.5 active:translate-y-0 px-8 py-4 rounded-full transition-all duration-300 cursor-pointer text-center"
              >
                <Link href="https://cloud.saviora.app/register" target="_blank" className="flex items-center justify-center">
                  <span>Start 90 Days Free</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsDemoOpen(true)}
                className="group text-base bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 px-6 py-4 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                <span className="w-7 h-7 rounded-full bg-[#22c55e]/15 text-[#22c55e] dark:text-emerald-400 flex items-center justify-center mr-2.5 transition-all duration-300 group-hover:bg-[#22c55e] group-hover:text-white group-hover:scale-110">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </span>
                <span className="font-semibold">See How It Works</span>
              </Button>
            </motion.div>

            {/* Micro Trust Badges Row */}
            <motion.div 
              className="flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-500 dark:text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#22c55e]" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#22c55e]" />
                <span>90 days Pro access</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                <span>Secure &amp; private</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Full Real Interactive Dashboard Mockup */}
          <motion.div
            className="lg:col-span-7 relative mt-4 lg:mt-0"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* MAIN REAL DASHBOARD CONTAINER */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl shadow-slate-900/10 overflow-hidden relative z-10 flex flex-col xl:flex-row h-auto">
              
              {/* Sidebar Mockup (Left Side) */}
              <div className="hidden xl:flex flex-col w-56 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800 p-4 justify-between flex-shrink-0">
                <div>
                  {/* Logo */}
                  <div className="flex items-center gap-2 mb-6">
                    <Image src={logoSaviora} alt="Saviora logo" className="h-8 w-auto dark:brightness-110" />
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
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                          item.active
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-[#16a34a] dark:text-emerald-400 font-bold"
                            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </div>
                    ))}
                  </nav>
                </div>
                
                {/* Plan Card & Controls */}
                <div className="space-y-3 pt-3">
                  <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">CURRENT PLAN</span>
                      <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/40 text-[#16a34a] dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold">PRO MONTHLY</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mb-2">Renew Date: 8/18/2026</p>
                    <button className="w-full text-center py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-colors">
                      Manage Plan
                    </button>
                  </div>
                  
                  {/* Light / Dark Mode Toggle */}
                  <div className="flex bg-slate-100 dark:bg-slate-950 rounded-lg p-1 text-[11px]">
                    <div className="flex-1 py-1 text-center font-semibold bg-white dark:bg-slate-900 rounded-md text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer">
                      Light
                    </div>
                    <div className="flex-1 py-1 text-center font-medium text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-700">
                      Dark
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-500 hover:text-rose-600 cursor-pointer text-xs font-medium px-1 py-1 transition-colors">
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col bg-slate-50/60 dark:bg-slate-900/10">
                {/* Header Bar */}
                <div className="bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 px-4 py-3 flex flex-wrap gap-2 justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Financial Overview</h3>
                    <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400">Welcome back! Here&apos;s what&apos;s happening with your money today.</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>June 2026</span>
                      <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/20 text-[#16a34a] dark:text-emerald-400 px-2 py-1 rounded-lg text-[10px] font-bold border border-emerald-100 dark:border-emerald-900/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                      OPEN
                    </div>
                    <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-xs px-2.5 py-1 rounded-lg shadow-sm transition-colors">
                      Close Month
                    </button>
                    <div className="relative w-7 h-7 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 cursor-pointer">
                      <Bell className="w-3.5 h-3.5" />
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full" />
                    </div>
                    <div className="flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">
                        JD
                      </div>
                      <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-300">John Doe</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Widgets */}
                <div className="p-3.5 sm:p-4 space-y-3.5">
                  {/* Stat Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { title: "Monthly Balance", value: "$25,500.00", subtitle: "Net for June 2026", icon: Wallet, color: "text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/30" },
                      { title: "Monthly Income", value: "$125,000.00", subtitle: "Current month earnings", icon: TrendingUp, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
                      { title: "Monthly Expenses", value: "$99,500.00", subtitle: "Current month spending", icon: TrendingDown, color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30" },
                      { title: "Total Savings", value: "$45,000.00", subtitle: "Total goal contributions", icon: Target, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" },
                    ].map((card, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-3 rounded-xl flex justify-between items-start">
                        <div>
                          <span className="text-[9px] text-slate-400 font-medium block">{card.title}</span>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">{card.value}</h4>
                          <span className="text-[8px] text-slate-400 block mt-0.5">{card.subtitle}</span>
                        </div>
                        <div className={`p-1.5 rounded-lg flex-shrink-0 ${card.color}`}>
                          <card.icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Main Grid: Income vs Expenses & Financial Health */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    
                    {/* Left 2 Cols: Income vs Expenses Area Chart */}
                    <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-3 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">Income vs Expenses</h4>
                        <div className="flex items-center gap-3 text-[9px] font-semibold text-slate-500">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block" /> Income</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" /> Expenses</span>
                        </div>
                      </div>
                      <div className="h-[145px] w-full">
                        {mounted && (
                          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <AreaChart data={realDashboardChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorRealInc" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorRealExp" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.25} />
                                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={(val) => `$${val/1000}k`} />
                              <Tooltip 
                                contentStyle={{ 
                                  borderRadius: '8px', 
                                  border: '1px solid rgba(148, 163, 184, 0.1)', 
                                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                  fontSize: '11px' 
                                }}
                              />
                              <Area type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorRealInc)" />
                              <Area type="monotone" dataKey="expenses" stroke="#F97316" strokeWidth={2} fillOpacity={1} fill="url(#colorRealExp)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>

                    {/* Right 1 Col: Financial Health Score */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-3 rounded-xl flex flex-col items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white self-start">Financial Health</h4>
                      
                      <div className="relative w-16 h-16 my-1 flex items-center justify-center">
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
                            strokeDasharray="94, 100"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-sm font-black text-slate-900 dark:text-white">94</span>
                          <p className="text-[6px] text-slate-400 font-semibold tracking-wider uppercase">SCORE</p>
                        </div>
                      </div>
                      
                      <span className="text-[8px] bg-emerald-50 dark:bg-emerald-950/40 text-[#16a34a] dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-center">
                        EXCELLENT
                      </span>
                      
                      <p className="text-[8px] text-slate-400 text-center leading-tight mt-1">
                        Your health score is calculated based on your monthly savings vs expenses ratio.
                      </p>
                    </div>

                  </div>

                  {/* Bottom Row: Recent Transactions & Active Budgets */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    
                    {/* Recent Transactions (2 cols) */}
                    <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-3 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">Recent Transactions</h4>
                        <span className="text-[9px] text-[#16a34a] hover:underline cursor-pointer font-semibold">View Statement</span>
                      </div>
                      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                        {[
                          { name: "food", desc: "Jul 1 - FOOD & GROCERIES", amount: "-$1,000.00", isIncome: false },
                          { name: "Salary", desc: "Jun 30 - INCOME", amount: "+$125,000.00", isIncome: true },
                          { name: "Netflix", desc: "Jun 28 - SUBSCRIPTIONS", amount: "-$1,490.00", isIncome: false },
                        ].map((tx, idx) => (
                          <div key={idx} className="py-1.5 flex items-center justify-between first:pt-0 last:pb-0">
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                                tx.isIncome 
                                  ? "bg-emerald-50 text-[#16a34a] dark:bg-emerald-950/40 dark:text-emerald-400"
                                  : "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400"
                              }`}>
                                {tx.name.substring(0, 1).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">{tx.name}</p>
                                <p className="text-[8px] text-slate-400">{tx.desc}</p>
                              </div>
                            </div>
                            <span className={`text-xs font-bold ${
                              tx.isIncome ? "text-[#22c55e]" : "text-slate-800 dark:text-slate-200"
                            }`}>
                              {tx.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active Budgets & Savings Alert (1 col) */}
                    <div className="space-y-2">
                      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-3 rounded-xl">
                        <div className="flex justify-between items-center mb-1.5">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white">Active Budgets</h4>
                          <span className="text-[8px] text-[#16a34a] font-semibold hover:underline cursor-pointer">VIEW ALL</span>
                        </div>
                        <div className="space-y-1.5">
                          {[
                            { name: "Food & Groceries", spent: 8500, total: 15000, color: "bg-[#22c55e]" },
                            { name: "Rent & Utilities", spent: 45000, total: 45000, color: "bg-orange-500" },
                          ].map((bgt, idx) => {
                            const percent = Math.min(100, Math.round((bgt.spent / bgt.total) * 100));
                            return (
                              <div key={idx} className="space-y-0.5">
                                <div className="flex justify-between text-[8px] font-semibold">
                                  <span className="text-slate-600 dark:text-slate-350">{bgt.name}</span>
                                  <span className="text-slate-400">${bgt.spent.toLocaleString()} / ${bgt.total.toLocaleString()}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div className={`h-full ${bgt.color} rounded-full`} style={{ width: `${percent}%` }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30 p-2 rounded-xl flex items-start gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#22c55e] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[9px] font-bold text-[#16a34a] dark:text-emerald-400">Savings Improved</p>
                          <p className="text-[8px] text-emerald-600 dark:text-emerald-500 leading-tight mt-0.5">
                            Your savings goal contributions are up 12% from last month. Keep it up!
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </motion.div>

        </div>
      </div>

      {/* Interactive Demo Showcase Modal */}
      <AnimatePresence>
        {isDemoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setIsDemoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">Saviora App Tour &amp; Live Preview</span>
                </div>
                <button
                  onClick={() => setIsDemoOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Demo Showcase Body */}
              <div className="p-6 sm:p-10 bg-slate-900 text-left">
                <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> Saviora Platform Showcase
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  See How Saviora Simplifies Money Management
                </h3>
                <p className="text-slate-400 text-sm sm:text-base mb-8 max-w-2xl">
                  Explore how Saviora combines income tracking, budget alerts, and AI-driven expense insights into one clean dashboard.
                </p>

                {/* Simulated Dashboard Demo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-semibold text-base mb-1">Income &amp; Expenses</h4>
                    <p className="text-xs text-slate-400">Track every transaction with intelligent auto-categorization.</p>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-semibold text-base mb-1">Smart Budgets</h4>
                    <p className="text-xs text-slate-400">Set monthly limits and get real-time warnings before overspending.</p>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-semibold text-base mb-1">Savings Goals</h4>
                    <p className="text-xs text-slate-400">Monitor savings progress towards your target milestones.</p>
                  </div>
                </div>

                {/* CTA inside Modal */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/50 to-slate-950 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white font-semibold text-base">Ready to transform your finances?</h4>
                    <p className="text-xs sm:text-sm text-slate-400">Start your 90-day free trial today. No credit card required.</p>
                  </div>
                  <Button asChild size="lg" className="w-full sm:w-auto text-sm px-6 bg-[#22c55e] hover:bg-[#16a34a] text-white">
                    <Link href="https://cloud.saviora.app/register" target="_blank">
                      Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
