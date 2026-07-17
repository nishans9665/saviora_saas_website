"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, LineChart, PieChart, ShieldCheck, Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
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
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6 border border-primary-100 dark:border-primary-800/50">
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
            Take control of your money with smart budgeting, expense tracking, savings goals, and financial insights - all in one secure platform.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" className="w-full sm:w-auto text-base">
              Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
              <Play className="w-5 h-5 mr-2" /> Watch Demo
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
              <p className="text-sm text-slate-500 dark:text-slate-400">Categorize and monitor your daily expenses with AI assistance.</p>
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
    </section>
  );
}
