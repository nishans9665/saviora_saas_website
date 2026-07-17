"use client";

import React, { useState, useEffect } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const data = [
  { name: "Jan", balance: 4000, expenses: 2400 },
  { name: "Feb", balance: 3000, expenses: 1398 },
  { name: "Mar", balance: 2000, expenses: 9800 },
  { name: "Apr", balance: 2780, expenses: 3908 },
  { name: "May", balance: 1890, expenses: 4800 },
  { name: "Jun", balance: 2390, expenses: 3800 },
  { name: "Jul", balance: 3490, expenses: 4300 },
  { name: "Aug", balance: 4490, expenses: 2300 },
  { name: "Sep", balance: 5490, expenses: 1300 },
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
            Watch Your Wealth Grow, One Smart <span className="text-gradient">Decision at a Time</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            From daily spending to long - term savings, Saviora transforms your financial data into clear, actionable insights - helping you stay in control and grow your financial future with confidence.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative mx-auto max-w-5xl">
            {/* Main Dashboard Mockup */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl overflow-hidden relative z-10">
              {/* Dashboard Header Mockup */}
              <div className="h-14 border-b border-slate-100 dark:border-slate-800 flex items-center px-6 justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>

              {/* Dashboard Content Mockup */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  {/* Balance Card */}
                  <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-6 flex justify-between items-end">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Balance</p>
                      <h3 className="text-4xl font-bold text-slate-900 dark:text-white">$24,590.00</h3>
                    </div>
                    <div className="flex items-center text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md text-sm font-medium">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      +14.5%
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-6">
                    <div className="mb-4 flex justify-between items-center">
                      <h4 className="font-semibold text-slate-900 dark:text-white">Cash Flow</h4>
                    </div>
                    <div className="h-[250px] w-full">
                      {mounted && (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip 
                              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area type="monotone" dataKey="balance" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Recent Transactions */}
                  <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-6 h-full">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-6">Recent Activity</h4>
                    <div className="space-y-4">
                      {[
                        { name: "Apple Store", amount: "-$999.00", date: "Today", icon: CreditCard, color: "text-slate-900 dark:text-white" },
                        { name: "Salary", amount: "+$4,500.00", date: "Yesterday", icon: ArrowUpRight, color: "text-emerald-500" },
                        { name: "Netflix", amount: "-$15.99", date: "May 12", icon: CreditCard, color: "text-slate-900 dark:text-white" },
                        { name: "Coffee Shop", amount: "-$4.50", date: "May 12", icon: ArrowDownRight, color: "text-rose-500" },
                      ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <tx.icon className="w-5 h-5 text-slate-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900 dark:text-white">{tx.name}</p>
                              <p className="text-xs text-slate-500">{tx.date}</p>
                            </div>
                          </div>
                          <span className={`text-sm font-medium ${tx.color}`}>{tx.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements (Decorative) */}
            <motion.div 
              className="absolute -right-12 top-20 glass-card p-4 rounded-xl z-20 hidden lg:flex items-center gap-4 w-64"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-500">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Savings Goal Met</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Emergency Fund: 100%</p>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Target(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
