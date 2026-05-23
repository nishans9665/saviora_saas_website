"use client";

import React from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "Saviora completely changed how I look at my finances. The AI insights helped me find $400 in unused subscriptions in the first month!",
    author: "Sarah Jenkins",
    role: "Freelance Designer",
    rating: 5,
  },
  {
    content: "The dashboard is beautiful and intuitive. I've tried dozens of finance apps, but this is the only one that actually motivates me to save.",
    author: "Michael Chen",
    role: "Software Engineer",
    rating: 5,
  },
  {
    content: "As a small business owner, tracking personal and business expenses was a nightmare. Saviora made it seamless and stress-free.",
    author: "Elena Rodriguez",
    role: "Startup Founder",
    rating: 5,
  }
];

export function Testimonials() {
  return (
    <section className="py-24 relative bg-slate-50 dark:bg-slate-900/20">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Loved by <span className="text-gradient">thousands</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Don&apos;t just take our word for it. Here&apos;s what our community has to say about their financial transformation.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="glass-card rounded-3xl p-8 h-full flex flex-col relative">
                <div className="text-6xl text-primary-200 dark:text-primary-900/40 absolute top-4 right-6 font-serif leading-none">
                  &quot;
                </div>
                
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-500 text-accent-500" />
                  ))}
                </div>
                
                <p className="text-slate-700 dark:text-slate-300 mb-8 flex-grow relative z-10 text-lg">
                  &quot;{testimonial.content}&quot;
                </p>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 text-xl">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{testimonial.author}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
