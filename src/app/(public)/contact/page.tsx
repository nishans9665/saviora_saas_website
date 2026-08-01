"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { Mail, Clock, BookOpen, ShieldCheck, MessageSquare, Send, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setIsSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen pt-32 pb-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] max-w-[1200px] opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" /> Get in touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
              Have questions about Saviora? Want to explore features or get support? Our team is here to help you grow your financial future.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Details */}
            <AnimatedSection delay={0.1} direction="right" className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Information</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Fill out the form and our dedicated support team will get back to you promptly. You can also reach us via direct support emails below.
                </p>
              </div>

              <div className="space-y-6">
                {/* Email Support */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0 text-primary-600 dark:text-primary-400 shadow-2xs">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Email Us</h4>
                    <a href="mailto:info@saviora.app" className="block text-slate-600 dark:text-slate-400 text-sm hover:text-primary-600 dark:hover:text-primary-400 transition-colors">info@saviora.app</a>
                    <a href="mailto:support@saviora.com" className="block text-slate-600 dark:text-slate-400 text-sm hover:text-primary-600 dark:hover:text-primary-400 transition-colors">support@saviora.com</a>
                  </div>
                </div>  

                {/* Response Time */} 
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-100 dark:bg-accent-900/50 flex items-center justify-center flex-shrink-0 text-accent-600 dark:text-accent-400 shadow-2xs">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Response Time</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">24/7 Global Customer Support</p>
                    <p className="text-slate-500 text-xs mt-1">Average response time: 2 to 4 hours</p>
                  </div>
                </div>

                {/* Help Center */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400 shadow-2xs">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Help Center &amp; Guides</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Instant answers, tutorials, and FAQs</p>
                    <p className="text-slate-500 text-xs mt-1">Self-service resources available anytime</p>
                  </div>
                </div>

                {/* Security Guarantee */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0 text-emerald-600 dark:text-emerald-400 shadow-2xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Data Privacy Protected</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Your communications and data are 256-bit SSL encrypted.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={0.2} direction="left">
              <div className="glass-card rounded-3xl p-8 shadow-xl border border-slate-200/80 dark:border-slate-800/80">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                  >
                    <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-500 mb-6">
                      <Send className="w-10 h-10 ml-1" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                      Thank you for reaching out. Our team will get back to you shortly.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMessage && (
                      <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                        <div>{errorMessage}</div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white resize-none"
                        placeholder="Tell us a little more about what you need..."
                      ></textarea>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
