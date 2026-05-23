"use client";

import React from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="bg-slate-950 border border-slate-800/60 rounded-3xl p-8 md:p-16 text-center max-w-5xl mx-auto relative overflow-hidden shadow-2xl">
            {/* Clean Background Glows */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-500/20 rounded-full filter blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Building Your <br className="hidden md:block" />
                <span className="text-gradient">
                  Financial Future Today
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                Join thousands of users who have transformed their finances with Saviora. Get started for free, no credit card required.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto text-base">
                  Create Free Account <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base text-white border-slate-700 hover:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-800">
                  Contact Sales
                </Button>
              </div>
              <p className="text-sm text-slate-400 mt-6">
                Fully functional 14-day trial for Pro features.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
