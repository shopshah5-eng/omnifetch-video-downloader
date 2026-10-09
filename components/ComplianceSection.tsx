'use client';

import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function ComplianceSection() {
  return (
    <div className="space-y-12 max-w-[1100px] mx-auto px-4 sm:px-6 pt-10">
      
      {/* ================== Legal & Ethical Use ================== */}
      <section id="legal">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white pl-4 border-l-4 border-[#FF0033] bg-gradient-to-r from-red-500/10 to-transparent py-2.5 rounded-r-xl mb-3">
          Legal &amp; Ethical Use
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          SnapYT is designed for personal, permissioned use. Always follow YouTube’s Terms, respect creators’ rights, and use downloads only where allowed. This page is informational and not legal advice.
        </p>
      </section>

      {/* ================== Compliance Notice ================== */}
      <section id="disclaimer">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white pl-4 border-l-4 border-[#FF0033] bg-gradient-to-r from-red-500/10 to-transparent py-2.5 rounded-r-xl mb-4">
          Compliance Notice — Please Read
        </h2>

        <div className="p-5 sm:p-6 bg-white dark:bg-[#14161E] border border-gray-200 dark:border-[#232737] rounded-2xl shadow-sm text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-3 leading-relaxed">
          <ul className="list-disc list-outside pl-4 space-y-2.5">
            <li>
              <strong>Follow YouTube’s Terms of Service:</strong> Do <em>not</em> download content unless you own it, have explicit permission from the rightsholder, or YouTube itself provides a download button/link for that item.
            </li>
            <li>
              <strong>No circumvention of DRM or technical protections:</strong> Do not attempt to break encryption or bypass safeguards on HLS/DASH or similar protected streams.
            </li>
            <li>
              <strong>No private, paywalled, rental/subscription, paid courses, members-only, age-restricted (where prohibited), live TV/sports, or otherwise restricted/licensed content.</strong>
            </li>
            <li>
              <strong>Playlists:</strong> <em>Not supported.</em> To stay compliant, copy the link of each video and download them one by one. No automated bulk downloading, scraping, or crawling.
            </li>
            <li>
              <strong>Personal, permissioned use only:</strong> No redistribution, public performance, re-uploading, commercial exploitation, or monetization without rights.
            </li>
            <li>
              <strong>Availability varies:</strong> Options depend on the source, your region, and rights. Some content or qualities may be unavailable.
            </li>
            <li>
              <strong>No hosting or storing:</strong> We do not host or store user videos. Media is processed transiently on request—no preloading or indexing of third-party content.
            </li>
            <li>
              <strong>Not affiliated with YouTube/Google:</strong> SnapYT is independent. YouTube™ and Google™ are trademarks of their respective owners.
            </li>
            <li>
              <strong>Contact:</strong> Report concerns or send takedown requests via our{' '}
              <a href="/contact" className="text-[#FF0033] font-bold underline">
                contact page
              </a>. See{' '}
              <a href="/terms" className="text-[#FF0033] font-bold underline">
                Terms
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-[#FF0033] font-bold underline">
                Privacy
              </a>{' '}
              for details.
            </li>
            <li>
              <strong>Not legal advice:</strong> You are responsible for ensuring lawful use in your jurisdiction. To stay safe, get written permission when needed, keep proof of rights, avoid re-uploads/monetization without licenses, and always credit creators where required.
            </li>
          </ul>
        </div>
      </section>

      {/* ================== Final Call To Action ================== */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white to-red-50/40 dark:from-[#14161E] dark:to-red-950/20 border border-gray-200 dark:border-[#232737] shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

        <h2 className="text-2xl sm:text-3xl font-black text-gray-950 dark:text-white tracking-tight mb-2">
          Start Using the Best YouTube Video Downloader
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
          Paste a link to start or try a keyword/@handle/#hashtag search. <em>Playlists aren’t supported—copy each video link to download one by one.</em>
        </p>

        <a
          href="#video-input"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF0033] to-[#D90028] text-white font-black text-sm sm:text-base shadow-lg shadow-red-500/25 hover:shadow-red-500/35 hover:-translate-y-0.5 transition-all"
        >
          <span>Start now — paste your YouTube link</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          No login • Mirrors source quality • Works worldwide
        </p>
      </section>

    </div>
  );
}
