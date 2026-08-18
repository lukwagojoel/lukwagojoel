"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiCopy, FiSend } from "react-icons/fi";
import { ScrambleText } from "../kprstyle/Effects/scrumble";


interface ContactFormProps {
  email: string;
  phone: string;
  formattedPhone: string;
}

export const ContactForm = ({ email, phone, formattedPhone }: ContactFormProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "PROJECT INQUIRY",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
      {/* Direct Info & Actions Column */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-5 space-y-10"
      >
        <div className="space-y-6">
          <h2 className="text-gray-400 text-xs tracking-widest uppercase font-bold">
            ■ DIRECT CHANNELS
          </h2>

          {/* Email Card */}
          <div className="p-6 bg-zinc-950 border border-white/10 space-y-3 relative group hover:border-fuchsia-400/50 transition-colors">
            <span className="text-xs text-gray-500 uppercase">PRIMARY EMAIL</span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                {email}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(email, "email")}
                className="p-2 border border-white/20 hover:border-fuchsia-400 text-gray-400 hover:text-fuchsia-400 transition-colors"
                aria-label="Copy Email"
              >
                {copiedField === "email" ? <FiCheck className="text-fuchsia-400" /> : <FiCopy />}
              </button>
            </div>
          </div>

          {/* Phone Card */}
          <div className="p-6 bg-zinc-950 border border-white/10 space-y-3 relative group hover:border-fuchsia-400/50 transition-colors">
            <span className="text-xs text-gray-500 uppercase">PHONE / WHATSAPP</span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                {formattedPhone}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(phone, "phone")}
                className="p-2 border border-white/20 hover:border-fuchsia-400 text-gray-400 hover:text-fuchsia-400 transition-colors"
                aria-label="Copy Phone"
              >
                {copiedField === "phone" ? <FiCheck className="text-fuchsia-400" /> : <FiCopy />}
              </button>
            </div>
          </div>
        </div>

        {/* Availability Badge */}
        <div className="p-6 border border-fuchsia-400/20 bg-fuchsia-400/5 space-y-2">
          <div className="flex items-center gap-2 text-fuchsia-400 text-xs font-bold tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
            </span>
            LOCATION & TIME
          </div>
          <p className="text-xs text-gray-300">KAMPALA, UGANDA (UTC +3)</p>
          <p className="text-xs text-gray-500">
            CURRENT AVAILABILITY: ACCEPTING NEW PROJECTS AND FULL-STACK ENGAGEMENTS.
          </p>
        </div>
      </motion.div>

      {/* Interactive Form Column */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-7 bg-zinc-950 border border-white/10 p-6 sm:p-10 relative"
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <span className="text-xs text-fuchsia-400 font-bold uppercase tracking-widest">
                  // TRANSMIT MESSAGE
                </span>
                <span className="text-xs text-gray-600">SECURE END-TO-END</span>
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-bold tracking-widest text-gray-400 group-focus-within:text-fuchsia-400 transition-colors uppercase">
                  01. YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="JOHN DOE"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-black border border-white/20 p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-fuchsia-400 transition-colors"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-bold tracking-widest text-gray-400 group-focus-within:text-fuchsia-400 transition-colors uppercase">
                  02. YOUR EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="JOHN@EXAMPLE.COM"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-black border border-white/20 p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-fuchsia-400 transition-colors"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-bold tracking-widest text-gray-400 group-focus-within:text-fuchsia-400 transition-colors uppercase">
                  03. PROJECT DETAILS *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="TELL ME ABOUT YOUR PROJECT GOALS, TIMELINE, AND SCOPE..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-black border border-white/20 p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-fuchsia-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-extrabold p-5 uppercase tracking-wider text-sm flex items-center justify-center gap-3 hover:bg-fuchsia-400 transition-colors disabled:opacity-50 group"
              >
                {isSubmitting ? (
                  <span className="animate-pulse flex items-center gap-2">
                    TRANSMITTING...
                  </span>
                ) : (
                  <>
                    <ScrambleText text="SEND TRANSMISSION" />
                    <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="py-16 text-center space-y-6"
            >
              <div className="inline-flex p-4 border border-fuchsia-400 rounded-full bg-fuchsia-400/10 text-fuchsia-400">
                <FiCheck className="text-3xl" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                  TRANSMISSION RECEIVED.
                </h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  Thank you for reaching out, {formState.name}. Your message has been logged, and I will respond within 24 hours.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({ name: "", email: "", subject: "PROJECT INQUIRY", message: "" });
                }}
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-fuchsia-400 hover:text-white transition-colors uppercase pt-4"
              >
                SEND ANOTHER MESSAGE <FiArrowUpRight />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};