"use client";

import React from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Sparkles, BellRing, Activity, FileText } from "lucide-react";
import { motion } from "framer-motion";

export function SmartFeatures() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <AnimatedSection direction="right">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" /> Financial Clarity &amp; Analytics
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  Actionable Insights for <span className="text-gradient-accent">Smarter Money Management</span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Gain a clear understanding of your finances with spending analysis, category tracking, savings milestones, and detailed exportable reports. Monitor your financial health and make informed decisions with confidence.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Activity, title: "Financial Health Score", desc: "A clear visual indicator that reflects your overall spending discipline and savings progress." },
                  { icon: BellRing, title: "Budget Limit Awareness", desc: "Monitor category spending thresholds so you know how much you have left to spend before exceeding your limits." },
                  { icon: FileText, title: "Exportable Reports", desc: "Export clean PDF and CSV summaries of your transactions, budgets, and savings for accounting or tax preparation." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-700 dark:text-slate-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.2}>
            <div className="relative">
              {/* Background Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-accent-500/20 to-primary-500/20 rounded-full blur-3xl -z-10"></div>
              
              {/* Mockup Card */}
              <div className="glass-card rounded-2xl p-8 border-t border-l border-white/40 dark:border-white/10 shadow-2xl relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Financial Insights</h3>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded font-medium">Sample Preview</span>
                  </div>
                  <Sparkles className="w-5 h-5 text-accent-500" />
                </div>
                
                <div className="space-y-4">
                  <motion.div 
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex gap-3 mb-2">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Dining Budget: 68% used this month
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-5">
                      You have $128 remaining of your $400 monthly dining allocation with 12 days to go.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex gap-3 mb-2">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Recurring Subscriptions: $44.97 / mo
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-5">
                      3 recurring entertainment subscriptions currently logged in your expenses.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex gap-3 mb-2">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Emergency Fund Milestone Reached! 🎉
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-5">
                      You reached your $10,000 target with steady monthly contributions.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
