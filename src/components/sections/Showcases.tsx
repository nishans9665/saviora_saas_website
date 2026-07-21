"use client";

import React from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Target, TrendingUp, HeartPulse } from "lucide-react";

const expenseData = [
  { name: "Housing", value: 400 },
  { name: "Food", value: 300 },
  { name: "Transport", value: 300 },
  { name: "Entertainment", value: 200 },
];
const COLORS = ["#16A34A", "#F97316", "#3B82F6", "#8B5CF6"];

export function Showcases() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900/20">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Everything You Need, <span className="text-gradient">All in One Place</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            From savings goals to expense breakdowns and financial health monitoring, Saviora has you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Savings Goal Showcase */}
          <AnimatedSection delay={0.1} className="h-full">
            <div className="glass-card rounded-2xl p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Savings Goals</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow">
                Visualize your progress towards major life milestones with smart projections.
              </p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-900 dark:text-white">New Car</span>
                    <span className="text-slate-500">$8,500 / $10,000</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-900 dark:text-white">Vacation</span>
                    <span className="text-slate-500">$1,200 / $3,000</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[40%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Expense Analytics Showcase */}
          <AnimatedSection delay={0.2} className="h-full">
            <div className="glass-card rounded-2xl p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/50 flex items-center justify-center text-accent-600 dark:text-accent-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Expense Analytics</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Understand exactly where your money goes every month with beautiful charts.
              </p>
              
              <div className="h-[180px] w-full mt-auto relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
                {/* Center text for donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-500 font-medium mt-1">Total</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">$1,200</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Financial Health Showcase */}
          <AnimatedSection delay={0.3} className="h-full">
            <div className="glass-card rounded-2xl p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Financial Health</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow">
                Get an instant read on your financial stability with our proprietary health score.
              </p>
              
              <div className="flex flex-col items-center justify-center mt-auto">
                <div className="relative w-32 h-32 mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="10" />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="currentColor" 
                      className="text-primary-500" 
                      strokeWidth="10" 
                      strokeDasharray="283" 
                      strokeDashoffset="42.45" /* 85% of 283 */
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">85</span>
                    <span className="text-xs font-medium text-emerald-500">Excellent</span>
                  </div>
                </div>
                <p className="text-sm text-center text-slate-500 dark:text-slate-400">
                  Your score went up 5 points this month!
                </p>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
