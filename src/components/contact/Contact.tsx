"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Mail,
  Send,
  MapPin,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import {
  CONTACT_INFO,
  SOCIAL_PROFILES,
  INQUIRY_TYPES,
} from "@/data/contact";
import SocialIcon from "@/components/common/SocialIcon";

interface FormState {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  hp: string;
}

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    inquiryType: INQUIRY_TYPES[0],
    message: "",
    hp: "",
  });

  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [submittedName, setSubmittedName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback
      setCopiedEmail(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formState.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formState.email.trim() || !formState.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formState.message.trim() || formState.message.trim().length < 8) {
      setErrorMessage("Please write a message (at least 8 characters).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          inquiryType: formState.inquiryType,
          message: formState.message,
          hp: formState.hp,
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setSubmittedName(formState.name.trim());
        setIsSuccess(true);
        // Clear form values only after confirmed success
        setFormState({
          name: "",
          email: "",
          inquiryType: INQUIRY_TYPES[0],
          message: "",
          hp: "",
        });
        setErrorMessage("");
      } else {
        // Preserve entered form data so the user doesn't lose their input
        setErrorMessage(
          result?.error ||
            "Failed to send your message. Please try again or write directly to wsandesh560@gmail.com."
        );
      }
    } catch (err) {
      console.error("[Contact Form] Request error:", err);
      setErrorMessage(
        "A network error occurred while sending your message. Please check your internet connection or email wsandesh560@gmail.com directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    setSubmittedName("");
    setErrorMessage("");
    setFormState({
      name: "",
      email: "",
      inquiryType: INQUIRY_TYPES[0],
      message: "",
      hp: "",
    });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Social Profiles"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Warm Brown & Orange Flowing Background Graphics */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Soft radial illumination behind form (right) and status info (left) */}
        <div className="absolute top-[25%] right-[8%] w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(90,45,12,0.18)_0%,rgba(58,33,15,0.10)_45%,transparent_70%)] blur-2xl" />
        <div className="absolute top-[30%] right-[12%] w-[320px] h-[320px] bg-[#FF8A00]/[0.03] blur-[90px] rounded-full" />
        <div className="absolute bottom-[15%] left-[8%] w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(58,33,15,0.15)_0%,transparent_70%)] blur-3xl" />

        {/* Abstract upward contour curve behind message form */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 1000"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="contact-curve-grad" x1="0%" y1="100%" x2="100%" y2="20%">
              <stop offset="0%" stopColor="#3A210F" stopOpacity="0" />
              <stop offset="30%" stopColor="#4A260D" stopOpacity="0.28" />
              <stop offset="65%" stopColor="#5A2D0C" stopOpacity="0.40" />
              <stop offset="85%" stopColor="#7A3B0B" stopOpacity="0.35" />
              <stop offset="95%" stopColor="rgba(255, 138, 0, 0.20)" />
              <stop offset="100%" stopColor="rgba(255, 138, 0, 0)" />
            </linearGradient>

            <linearGradient id="contact-whisper-grad" x1="10%" y1="90%" x2="90%" y2="10%">
              <stop offset="0%" stopColor="#3A210F" stopOpacity="0" />
              <stop offset="40%" stopColor="#4A260D" stopOpacity="0.20" />
              <stop offset="80%" stopColor="#5A2D0C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7A3B0B" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Upward Sweeping Curve */}
          <path
            d="M 300 950 C 650 900, 950 720, 1200 480 C 1350 340, 1450 240, 1500 180"
            stroke="url(#contact-curve-grad)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />

          {/* Whisper Harmonic Curve */}
          <path
            d="M 280 990 C 630 940, 930 760, 1180 520 C 1330 380, 1430 280, 1500 220"
            stroke="url(#contact-whisper-grad)"
            strokeWidth="0.85"
            strokeDasharray="8 6"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-16 sm:space-y-20">
        {/* ========================================================= */}
        {/* Section Header                                            */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 text-[#FFB020] text-xs sm:text-sm font-mono tracking-widest uppercase backdrop-blur-md">
            <MessageSquare className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>07 &bull; LET&apos;S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Start a Conversation &amp;{" "}
            <span className="bg-gradient-to-r from-[#FF8A00] via-[#FFB020] to-[#FF9F1C] bg-clip-text text-transparent">
              Collaborate
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Whether you have a web development project, an internship opportunity,
            a technical question, or simply want to connect—I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* Contact Layout: Left Info & Profiles | Right Form         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Status, Direct Email, Social Links, Location */}
          {/* ========================================================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Availability Status Card */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl sm:rounded-3xl bg-[#15181B] border border-[#292D32] backdrop-blur-md relative overflow-hidden"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-400">
                  {CONTACT_INFO.status}
                </span>
              </div>
              <p className="text-sm text-zinc-300 mt-2.5 leading-relaxed">
                {CONTACT_INFO.statusDetail}
              </p>
            </motion.div>

            {/* Direct Email Card with One-Click Copy */}
            <motion.div
              variants={itemVariants}
              className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#15181B] border border-[#292D32] hover:border-[#FF8A00]/40 transition-all backdrop-blur-md space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#FFB020] font-semibold">
                  Direct Inquiries
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#FF8A00]/10 border border-[#FF8A00]/20 flex items-center justify-center text-[#FF8A00]">
                  <Mail className="w-4 h-4" />
                </div>
              </div>

              <div>
                <p className="text-xs text-zinc-400">Primary Email Address</p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  aria-label="Email Sandesh Waghmare"
                  title="Email Sandesh Waghmare"
                  className="text-lg sm:text-xl font-bold text-white hover:text-[#FFB020] transition-colors break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] rounded-md"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy Sandesh Waghmare's email address"
                  title="Copy email address"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#191C20] hover:bg-[#292D32] border border-[#292D32] text-zinc-200 hover:text-white transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#FF8A00]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  aria-label="Email Sandesh Waghmare"
                  title="Email Sandesh Waghmare"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FF8A00]/10 hover:bg-[#FF8A00]/20 border border-[#FF8A00]/30 text-[#FFB020] transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00]"
                >
                  <span>Open Mail Client</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Social Profiles Grid */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold px-1">
                Professional &amp; Social Channels
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SOCIAL_PROFILES.map((social) => {
                  const isExternal = !social.href.startsWith("mailto:");
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      aria-label={social.ariaLabel}
                      title={social.ariaLabel}
                      className="group p-4 rounded-xl sm:rounded-2xl bg-[#15181B] hover:bg-[#191C20] border border-[#292D32] hover:border-[#FF8A00]/40 transition-all duration-200 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-[#191C20] border border-[#292D32] flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:border-[#FF8A00]/40 shrink-0 transition-colors">
                          <SocialIcon icon={social.icon} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white group-hover:text-[#FFB020] transition-colors truncate">
                            {social.name}
                          </p>
                          <p className="text-[11px] text-zinc-400 truncate">
                            {social.username}
                          </p>
                        </div>
                      </div>
                      {isExternal ? (
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FF8A00] transition-colors shrink-0 ml-2" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FF8A00] transition-colors shrink-0 ml-2" />
                      )}
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Location & Timezone info */}
            <motion.div
              variants={itemVariants}
              className="p-4 rounded-xl sm:rounded-2xl bg-[#15181B] border border-[#292D32] flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF8A00] shrink-0" />
                <span>{CONTACT_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FFB020] shrink-0" />
                <span>{CONTACT_INFO.timezone}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Clean Contact Form UI Ready for Integration */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#15181B] border border-[#292D32] backdrop-blur-xl shadow-xl space-y-6">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* Form Submission Success Card */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 sm:p-10 rounded-2xl bg-[#191C20] border border-[#292D32] text-center space-y-5"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="font-semibold text-[#FFB020]">{submittedName || "there"}</span>. Your message has been delivered directly to Sandesh. You will receive a response at your email address within 24–48 hours.
                      </p>
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white bg-[#15181B] hover:bg-[#101214] border border-[#292D32] hover:border-[#FF8A00]/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4 text-[#FF8A00]" />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Interactive Clean Contact Form */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                    noValidate
                  >
                    {/* Bot prevention honeypot (hidden from visitors) */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="contact-hp">Leave this empty</label>
                      <input
                        id="contact-hp"
                        type="text"
                        name="hp"
                        value={formState.hp}
                        onChange={handleInputChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-400"
                        >
                          Your Name <span className="text-[#FF8A00]">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Alex Johnson"
                          className="w-full px-4 py-3 rounded-xl bg-[#101214] border border-[#292D32] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] transition-all"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-400"
                        >
                          Your Email <span className="text-[#FF8A00]">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={handleInputChange}
                          placeholder="e.g. alex@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#101214] border border-[#292D32] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] transition-all"
                        />
                      </div>
                    </div>

                    {/* Inquiry Type / Subject */}
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-inquiry"
                        className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-400"
                      >
                        Inquiry Topic
                      </label>
                      <select
                        id="contact-inquiry"
                        name="inquiryType"
                        value={formState.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#101214] border border-[#292D32] text-sm text-white focus:outline-none focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] transition-all cursor-pointer"
                      >
                        {INQUIRY_TYPES.map((type) => (
                          <option key={type} value={type} className="bg-[#15181B] text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-400"
                      >
                        Your Message <span className="text-[#FF8A00]">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder="Share a brief overview of your project, timeline, or inquiry..."
                        className="w-full px-4 py-3 rounded-xl bg-[#101214] border border-[#292D32] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] transition-all resize-y min-h-[110px]"
                      />
                    </div>

                    {/* Submit Button & Micro Disclaimer */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#0B0D0F] bg-[#FF8A00] hover:bg-[#E86F00] shadow-[0_0_20px_rgba(255,138,0,0.3)] hover:shadow-[0_0_30px_rgba(232,111,0,0.45)] transition-all duration-200 active:scale-95 border border-[#FFB020]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] disabled:opacity-60 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-[#0B0D0F]/30 border-t-[#0B0D0F] rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-zinc-500 sm:text-right">
                        Typically responds within 24–48 hours
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
