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
          <div className="bg-gradient-to-br from-primary-900 to-slate-900 rounded-3xl p-8 md:p-16 text-center max-w-5xl mx-auto relative overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Building Your <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-300">
                  Financial Future Today
                </span>
              </h2>
              <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10">
                Join thousands of users who have transformed their finances with Saviora. Get started for free, no credit card required.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto text-base bg-white text-slate-900 hover:bg-slate-100">
                  Create Free Account <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base text-white border-white/20 hover:bg-white/10 dark:hover:bg-white/10">
                  Contact Sales
                </Button>
              </div>
              <p className="text-sm text-primary-200 mt-6 opacity-80">
                Fully functional 14-day trial for Pro features.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
