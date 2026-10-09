'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Shield, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-8">
        <Link href="/" className="text-xs font-bold text-[#FF0033] hover:underline mb-2 inline-block">
          ← Back to SnapYT Downloader
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Contact &amp; DMCA Takedown
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Get in touch with the SnapYT team or submit intellectual property concerns.
        </p>
      </div>

      <div className="bg-white dark:bg-[#14161E] border border-gray-200 dark:border-[#232737] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 text-xs sm:text-sm text-red-900 dark:text-red-200">
          <Shield className="w-5 h-5 flex-shrink-0 text-[#FF0033] mt-0.5" />
          <p className="leading-relaxed">
            SnapYT complies with the Digital Millennium Copyright Act (DMCA). If you are a copyright owner and want to request blocking or removal of content, please include proof of ownership and the exact URLs.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Message Received
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Thank you for contacting us. We review inquiries and copyright notices within 24-48 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
                Your Name
              </label>
              <input
                required
                type="text"
                placeholder="John Doe"
                className="w-full bg-gray-50 dark:bg-[#1A1D27] border border-gray-200 dark:border-[#232737] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#FF0033]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                className="w-full bg-gray-50 dark:bg-[#1A1D27] border border-gray-200 dark:border-[#232737] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#FF0033]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
                Subject
              </label>
              <select className="w-full bg-gray-50 dark:bg-[#1A1D27] border border-gray-200 dark:border-[#232737] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#FF0033]">
                <option value="dmca">DMCA / Copyright Takedown Request</option>
                <option value="feedback">General Feedback / Bug Report</option>
                <option value="partnership">Business / Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
                Message &amp; Evidence
              </label>
              <textarea
                required
                rows={5}
                placeholder="Provide detailed description and relevant URLs..."
                className="w-full bg-gray-50 dark:bg-[#1A1D27] border border-gray-200 dark:border-[#232737] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#FF0033]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF0033] to-[#D90028] text-white font-black text-sm sm:text-base shadow-lg shadow-red-500/25 hover:shadow-red-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
