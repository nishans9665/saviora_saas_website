"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2, ShieldCheck, X } from "lucide-react";
import heroMobileImg from "@/assets/hero/Saviora-mobile-screen.png";
import heroLaptopImg from "@/assets/hero/Saviora_Financial_Dashboard.png";
import googlePlayBadgeImg from "@/assets/hero/google-play.png";

export function Hero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-38 pb-16 lg:pb-24 overflow-hidden bg-white dark:bg-slate-950">
      
      {/* Subtle Background Radial Glow */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[520px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(34,197,94,0.10),transparent_75%)] dark:bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(34,197,94,0.14),transparent_75%)]" />
        <div className="absolute top-10 -left-20 w-[420px] h-[420px] bg-emerald-400/8 dark:bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* ==================================================== */}
          {/* LEFT COLUMN: Headline, copy, CTAs & Trust Badges */}
          {/* ==================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 xl:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#16a34a] dark:text-emerald-400 text-xs sm:text-sm font-semibold border border-[#22c55e]/25 shadow-xs mb-5 sm:mb-6">
              <svg className="w-4 h-4 text-[#22c55e] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.12 12 8.12s-3.5902.2916-5.1368.8307L4.8409 5.4477a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
              </svg>
              <span>Smart Personal Finance &amp; Budget Tracking</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-4xl lg:text-[40px] xl:text-[50px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14] mb-5">
              Take Control of Your <br className="hidden sm:inline" />
              Money with{" "}
              <span className="text-[#22c55e] dark:text-emerald-400 relative inline-block">
                Saviora
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#22c55e]/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-7 sm:mb-8 max-w-xl font-normal">
              Track income and expenses, plan monthly budgets, monitor savings goals, and achieve your financial goals with a simple, all-in-one app.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 mb-7 sm:mb-8 w-full sm:w-auto">
              {/* Google Play Store Badge Image Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.saviora.finance&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] drop-shadow-sm flex-shrink-0 cursor-pointer"
                aria-label="Get it on Google Play"
              >
                <Image
                  src={googlePlayBadgeImg}
                  alt="Get it on Google Play"
                  width={505}
                  height={148}
                  priority
                  className="h-[46px] sm:h-[50px] w-auto object-contain select-none"
                />
              </a>

              {/* See How It Works Button */}
              <button
                type="button"
                onClick={() => setIsDemoOpen(true)}
                className="h-[46px] sm:h-[50px] inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xs px-5 sm:px-6 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#16a34a] dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Play className="w-3 h-3 fill-emerald-600 dark:fill-emerald-400 ml-0.5" />
                </span>
                <span>See How It Works</span>
              </button>
            </div>

            {/* Trust Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>No credit card required</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>90 days Pro access</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Secure &amp; private</span>
              </span>
            </div>
          </motion.div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: Mobile + Laptop Devices Smart View */}
          {/* ==================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center lg:justify-end mt-4 lg:mt-0"
          >
            {/* Soft Organic Green Blob Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[48%] w-[320px] sm:w-[460px] md:w-[540px] lg:w-[500px] xl:w-[580px] h-[300px] sm:h-[400px] md:h-[460px] lg:h-[430px] xl:h-[490px] bg-gradient-to-tr from-emerald-100/70 via-emerald-50/50 to-transparent dark:from-emerald-950/40 dark:via-emerald-900/20 dark:to-transparent rounded-[50px] sm:rounded-[80px] lg:rounded-[90px] rotate-[-6deg] pointer-events-none -z-0" />

            {/* Devices Composite Row */}
            <div className="relative z-10 flex items-center justify-center">
              {/* Foreground: Mobile Phone Screen */}
              <div className="relative z-20 w-[160px] sm:w-[220px] md:w-[260px] lg:w-[240px] xl:w-[285px] flex-shrink-0 -mr-12 sm:-mr-20 md:-mr-24 lg:-mr-22 xl:-mr-26 drop-shadow-2xl">
                <Image
                  src={heroMobileImg}
                  alt="Saviora Mobile App Screen"
                  width={887}
                  height={1774}
                  priority
                  className="w-full h-auto object-contain select-none pointer-events-none"
                />
              </div>

              {/* Background / Right: Laptop Financial Dashboard */}
              <div className="relative z-10 w-[290px] sm:w-[420px] md:w-[500px] lg:w-[460px] xl:w-[540px] flex-shrink-0 drop-shadow-2xl">
                <Image
                  src={heroLaptopImg}
                  alt="Saviora Financial Dashboard on Laptop"
                  width={1491}
                  height={1055}
                  priority
                  className="w-full h-auto object-contain select-none pointer-events-none"
                />
              </div>
            </div>
          </motion.div>

        </div>
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
