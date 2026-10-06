"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  X, 
  Sparkles, 
  TrendingUp, 
  TrendingDown,
  Wallet, 
  CheckCircle2, 
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
  { name: "Jan", income: 5200, expenses: 3100 },
  { name: "Feb", income: 5500, expenses: 2900 },
  { name: "Mar", income: 5800, expenses: 3400 },
  { name: "Apr", income: 6400, expenses: 3200 },
  { name: "May", income: 7100, expenses: 3600 },
  { name: "Jun", income: 8500, expenses: 4350 },
];

export function Hero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: dashboardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.85, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.75], [0.96, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.75], [36, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-36 pb-16 sm:pb-24 overflow-hidden bg-white dark:bg-slate-950">
      
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Soft Radial Ambient Aura Centered at Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[580px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(34,197,94,0.12),transparent_75%)] dark:bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(34,197,94,0.16),transparent_75%)]" />
        {/* Very Subtle Ambient Side Glows */}
        <div className="absolute top-10 -left-20 w-[450px] h-[450px] bg-emerald-400/8 dark:bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-10 -right-20 w-[450px] h-[450px] bg-emerald-300/8 dark:bg-emerald-400/10 rounded-full blur-[110px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* CENTERED HERO CONTENT */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 sm:mb-6"
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#16a34a] dark:text-emerald-400 text-xs sm:text-sm font-semibold border border-[#22c55e]/25 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#22c55e] flex-shrink-0" />
              <span>Your All-in-One Personal Finance App</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} 
          >
            Take Control of Your <br className="hidden sm:inline" />{" "}Money
            with{" "}
            <span className="text-[#22c55e] dark:text-emerald-400 relative inline-block">
              Saviora
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#22c55e]/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Track your income and expenses, manage monthly budgets, and achieve your savings goals with Saviora - your simple, all-in-one personal finance app.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-8 w-full sm:w-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold shadow-lg shadow-[#22c55e]/25 hover:shadow-xl hover:shadow-[#22c55e]/35 hover:-translate-y-0.5 px-7 py-3.5 sm:py-4 rounded-full transition-all duration-300 cursor-pointer justify-center"
            >
              <Link href="https://cloud.saviora.app/register" target="_blank" className="flex items-center justify-center">
                <span>Start 90 Days Free</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsDemoOpen(true)}
              className="w-full sm:w-auto text-sm sm:text-base bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 px-6 py-3.5 sm:py-4 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-[#22c55e]/15 text-[#22c55e] dark:text-emerald-400 flex items-center justify-center mr-2 flex-shrink-0">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </span>
              <span className="font-semibold">See How It Works</span>
            </Button>
          </motion.div>

          {/* Micro Trust Indicators Row */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-12 sm:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
              <span>90 days Pro access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
              <span>Secure &amp; private</span>
            </div>
          </motion.div>

        </div>

        {/* DASHBOARD PREVIEW SHOWCASE WITH SCROLL ANIMATION */}
        <div ref={dashboardRef} className="w-full max-w-6xl mx-auto">
          <motion.div
            style={shouldReduceMotion ? {} : { opacity, scale, y: translateY }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full overflow-x-auto no-scrollbar py-2"
          >
            <div className="min-w-[840px] lg:min-w-0">
              <div className="w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl shadow-slate-900/10 overflow-hidden relative z-10 flex flex-col lg:flex-row h-auto">
                
                {/* Sidebar Mockup (Visible on Desktop lg+) */}
                <div className="hidden lg:flex flex-col w-52 xl:w-56 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800 p-4 justify-between flex-shrink-0">
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
                      <p className="text-[10px] text-slate-400 mb-2">Renew Date: 30/08/2026</p>
                      <button className="w-full text-center py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs transition-colors">
                        Manage Plan
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-500 hover:text-rose-600 cursor-pointer text-xs font-medium px-1 py-1 transition-colors">
                      <LogOut className="w-3.5 h-3.5" />
                      Logout
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col bg-slate-50/60 dark:bg-slate-900/10 min-w-0">
                  {/* Header Bar */}
                  <div className="bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 px-4 py-3 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
                    <div className="flex-shrink-0">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Financial Overview</h3>
                      <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400">Welcome back! Here&apos;s what&apos;s happening with your money today.</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>June 2026</span>
                        <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
                      </div>
                      <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/20 text-[#16a34a] dark:text-emerald-400 px-2 py-1 rounded-lg text-[10px] font-bold border border-emerald-100 dark:border-emerald-900/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                        Live
                      </div>
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
                  <div className="p-4 space-y-3.5">
                    
                    {/* Stat Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { title: "Monthly Balance", value: "$4,150.00", badge: "↑ 12% from last month", isPos: true, icon: Wallet, color: "text-[#16a34a] bg-emerald-50 dark:bg-emerald-950/30" },
                        { title: "Monthly Income", value: "$8,500.00", badge: "↑ 8% from last month", isPos: true, icon: TrendingUp, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
                        { title: "Monthly Expenses", value: "$4,350.00", badge: "↓ 5% from last month", isPos: false, icon: TrendingDown, color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30" },
                        { title: "Total Savings", value: "$8,200.00", badge: "↑ 15% from last month", isPos: true, icon: Target, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" },
                      ].map((card, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-3 rounded-xl flex flex-col justify-between shadow-xs min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate">{card.title}</span>
                            <div className={`p-1 rounded-md flex-shrink-0 ${card.color}`}>
                              <card.icon className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight whitespace-nowrap">{card.value}</h4>
                            <span className={`text-[9px] font-semibold block mt-0.5 truncate ${card.isPos ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-500'}`}>
                              {card.badge}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Main Grid: Income vs Expenses & Financial Health */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      
                      {/* Left 2 Cols: Income vs Expenses Chart */}
                      <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-3.5 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white">Income vs Expenses</h4>
                          <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block" /> Income</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" /> Expenses</span>
                          </div>
                        </div>
                        <div className="h-[155px] w-full">
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
                      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-3.5 rounded-xl flex flex-col items-center justify-between">
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
                        
                        <p className="text-[9px] text-slate-400 text-center leading-tight mt-1">
                          You&apos;re doing great! Keep consistent spending and saving to reach your goals.
                        </p>
                      </div>

                    </div>

                    {/* Bottom Row: Recent Transactions & Active Budgets */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      
                      {/* Recent Transactions (2 cols) */}
                      <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-3.5 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white">Recent Transactions</h4>
                          <span className="text-[9px] text-[#16a34a] hover:underline cursor-pointer font-semibold">View All &rarr;</span>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                          {[
                            { name: "Food", desc: "3 Jun 2026 - 4:02 PM", amount: "-$185.00", isIncome: false },
                            { name: "Salary", desc: "1 Jun 2026 - 10:30 AM", amount: "+$3,500.00", isIncome: true },
                            { name: "Netflix", desc: "28 May 2026 - 8:15 PM", amount: "-$14.99", isIncome: false },
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
                            <span className="text-[8px] text-[#16a34a] font-semibold hover:underline cursor-pointer">View All &rarr;</span>
                          </div>
                          <div className="space-y-1.5">
                            {[
                              { name: "Food & Groceries", spent: 320, total: 500, color: "bg-[#22c55e]" },
                              { name: "Entertainment", spent: 120, total: 300, color: "bg-orange-500" },
                            ].map((bgt, idx) => {
                              const percent = Math.min(100, Math.round((bgt.spent / bgt.total) * 100));
                              return (
                                <div key={idx} className="space-y-0.5">
                                  <div className="flex justify-between text-[8px] font-semibold">
                                    <span className="text-slate-600 dark:text-slate-350">{bgt.name}</span>
                                    <span className="text-slate-400">${bgt.spent} / ${bgt.total} <span className="ml-1 text-slate-500">{percent}%</span></span>
                                  </div>
                                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${bgt.color} rounded-full`} style={{ width: `${percent}%` }} />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-2.5 rounded-xl">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-[11px] text-slate-900 dark:text-white">Savings Goal</h4>
                            <span className="text-[8px] text-[#16a34a] font-semibold hover:underline cursor-pointer">View All &rarr;</span>
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex justify-between text-[8px] font-semibold">
                              <span className="text-slate-600 dark:text-slate-350">New Laptop</span>
                              <span className="text-slate-400">$800 / $1,200 <span className="ml-1 text-slate-500">67%</span></span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-[#22c55e] rounded-full" style={{ width: "67%" }} />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>

        {/* FEATURE CARDS BELOW DASHBOARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto"
        >
          {/* Card 1: Track Your Expenses */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-[#22c55e]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Track Your Expenses
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Easily record income and expenses and see where your money goes.
              </p>
            </div>
          </div>

          {/* Card 2: Plan Your Budget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-[#22c55e]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Plan Your Budget
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Set monthly budgets, monitor your spending, and stay on track.
              </p>
            </div>
          </div>

          {/* Card 3: Reach Your Savings Goals */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#22c55e]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Reach Your Savings Goals
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Set savings targets, track your progress, and build better money habits.
              </p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Interactive Demo Showcase Video Modal */}
      <AnimatePresence>
        {isDemoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md"
            onClick={() => setIsDemoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 border-b border-slate-800 bg-slate-950/80">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs text-slate-300 font-semibold hidden sm:inline-block">Saviora Product Demo &amp; Overview</span>
                </div>
                <button
                  onClick={() => setIsDemoOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* YouTube Video Container */}
              <div className="relative w-full aspect-video bg-black overflow-hidden">
                <iframe
                  className="w-full h-full border-0"
                  src="https://www.youtube.com/embed/BrjOOE1rbAU?autoplay=1&si=gZUQOXvrGPaSN7e3"
                  title="Saviora - YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
