"use client";

import React from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Sparkles, BellRing, Activity, FileText } from "lucide-react";
import { motion } from "framer-motion";

export function SmartFeatures() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <AnimatedSection direction="right">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" /> Smart Assistant Insights
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  Smarter Insights for Better <span className="text-gradient-accent">Financial Health</span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Gain a clear understanding of your finances with spending analysis, budget tracking, savings progress, and detailed reports. Monitor your financial health and make informed decisions to grow your financial future.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Activity, title: "Financial Health Score", desc: "Get a unified score that represents your overall financial wellbeing." },
                  { icon: BellRing, title: "Smart Budget Alerts", desc: "Receive predictive alerts before you overspend in a specific category." },
                  { icon: FileText, title: "Advanced Reporting", desc: "Export detailed reports for your accountant or tax preparation." }
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
                  <h3 className="font-semibold text-slate-900 dark:text-white">Financial Insights</h3>
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
                        You&apos;re spending 15% more on dining this month.
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-5">
                      Consider cooking at home for the next week to stay within your $400 budget.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex gap-3 mb-2">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Great job! You saved $250 on subscriptions.
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-5">
                      We automatically identified and helped you cancel 3 unused subscriptions.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex gap-3 mb-2">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Emergency Fund Goal reached! 🎉
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-5">
                      You&apos;ve hit your $10,000 milestone 2 months earlier than predicted.
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
