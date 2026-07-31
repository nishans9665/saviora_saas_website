"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { 
  Rocket, 
  Sparkles, 
  ArrowLeft, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Smartphone,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
  category?: string;
}

export function ComingSoon({
  title = "We're Crafting Something Extraordinary",
  subtitle = "Our team is hard at work building this feature to help you master your finances. Stay tuned for our upcoming launch!",
  category = "Coming Soon",
}: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
        {/* Background Gradients & Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] max-w-[1200px] opacity-30 pointer-events-none z-0">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary-500/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl my-auto">
          {/* Top Back Navigation */}
          <div className="mb-8 flex justify-start">
            <Button asChild variant="outline" size="sm" className="gap-2 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
              <Link href="/">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
            </Button>
          </div>

          {/* Main Hero Card */}
          <div className="glass-card rounded-3xl p-8 md:p-14 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl relative overflow-hidden text-center">
            
            {/* Top Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs md:text-sm font-semibold mb-6 border border-emerald-200 dark:border-emerald-800/60 shadow-xs"
            >
              <Rocket className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-bounce" />
              <span>{category}</span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight max-w-3xl mx-auto"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {subtitle}
            </motion.p>

            {/* Early Access Email Subscription Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-md mx-auto mb-12"
            >
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center justify-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span className="text-sm font-semibold">Thank you! You&apos;ll be the first to know when we launch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for early access"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-xs"
                    />
                  </div>
                  <Button type="submit" className="py-3 px-6 rounded-xl font-semibold shadow-md whitespace-nowrap">
                    Notify Me <Sparkles className="w-4 h-4 ml-1" />
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Feature Sneak Peek Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-slate-200/80 dark:border-slate-800/80 text-left"
            >
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                <div className="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-950/60 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Real-Time Insights</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Automated financial intelligence and intuitive budget tracking.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Bank-Grade Protection</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  256-bit encryption ensuring your data stays private and safe.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Cross-Platform Sync</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Seamless experience across mobile, tablet, and desktop apps.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
