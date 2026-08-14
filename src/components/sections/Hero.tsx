"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, LineChart, PieChart, ShieldCheck, Rocket, X, Sparkles, TrendingUp, Wallet, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] max-w-[1200px] opacity-30 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 50, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-8 left-1/3 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 30, -50, 0],
            y: [0, 50, -20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6 border border-accent-900/30 dark:border-accent-500/20">
              <Rocket className="w-4 h-4 animate-bounce-slow" />
              <span>Introducing a Smarter Way to Manage Money</span>
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Take Control of Your <br className="hidden md:block" />
            <span className="text-gradient">Financial Future</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Track income and expenses, manage monthly budgets, set savings goals, and understand your financial health - all in one secure platform.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden w-full sm:w-auto text-base bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-md shadow-primary-500/30 hover:shadow-lg hover:shadow-primary-500/50 hover:-translate-y-0.5 active:translate-y-0 px-8 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
            >
              <Link href="https://cloud.saviora.app/register" target="_blank" className="flex items-center justify-center">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsDemoOpen(true)}
              className="group w-full sm:w-auto text-base bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 px-7 py-3.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center mr-2.5 transition-all duration-300 group-hover:bg-primary-500 group-hover:text-white group-hover:scale-110 shadow-sm">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </span>
              <span className="font-semibold">Watch Demo</span>
            </Button>
          </motion.div>
        </div>

        {/* Floating Features - Hero Bottom */}
        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0 text-primary-600 dark:text-primary-400">
              <LineChart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Smart Analytics</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Real-time insights into your financial health and spending patterns.</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-900/50 flex items-center justify-center flex-shrink-0 text-accent-600 dark:text-accent-400">
              <PieChart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Expense Tracking</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Track multiple income streams with real-time analytics and predictive forecasting.</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Bank-level Security</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Your financial data is encrypted and completely secure.</p>
            </div>
          </div>
        </motion.div>
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
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">Saviora App Tour & Live Preview</span>
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
                    <h4 className="text-white font-semibold text-base mb-1">Income & Expenses</h4>
                    <p className="text-xs text-slate-400">Track every transaction with intelligent auto-categorization.</p>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-primary-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-3">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-semibold text-base mb-1">Smart Budgets</h4>
                    <p className="text-xs text-slate-400">Set monthly limits and get real-time warnings before overspending.</p>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-accent-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-accent-500/10 text-accent-400 flex items-center justify-center mb-3">
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
                    <p className="text-xs sm:text-sm text-slate-400">Start your 30-day free trial today. No credit card required.</p>
                  </div>
                  <Button asChild size="lg" className="w-full sm:w-auto text-sm px-6 bg-primary-500 hover:bg-primary-600 text-white">
                    <Link href="https://cloud.saviora.app/register" target="_blank">
                      Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
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
