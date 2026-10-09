'use client';

import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function NavigationChips() {
  const navItems = [
    { label: 'Overview', href: '#intro' },
    { label: 'How to', href: '#how' },
    { label: 'Copy Link', href: '#help' },
    { label: 'Features', href: '#features' },
    { label: 'Use cases', href: '#use-cases' },
    { label: 'Devices', href: '#devices' },
    { label: 'Limits', href: '#limits' },
    { label: 'Pro tips', href: '#pro' },
    { label: 'Guide', href: '#guide' },
    { label: 'Link formats', href: '#formats' },
    { label: 'Troubleshooting', href: '#troubleshoot' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Legal', href: '#legal' },
  ];

  return (
    <section id="intro" className="max-w-[1100px] mx-auto px-4 py-8">
      {/* Section Head */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight snapyt-title-underline">
          Best YouTube Video Downloader — Save Videos &amp; Audio (When Available)
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-semibold max-w-3xl mx-auto">
          Paste a link or search by keyword/@handle/#hashtag. Playlists aren’t supported—copy each video link to download one by one.
        </p>
        <p className="mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          <strong className="text-gray-800 dark:text-gray-200">SnapYT</strong> is a professional, compliance-first <strong className="text-gray-800 dark:text-gray-200">YouTube downloader online</strong>. Paste a link to download YouTube video or search YouTube by keyword, @handle or #hashtag to find a result. <em>Playlists are not supported</em>—to save a playlist, open it on YouTube, copy the link of each video, and download them one by one.
        </p>
      </div>

      {/* Jump Navigation Pills */}
      <nav aria-label="On this page" className="flex flex-wrap gap-2 justify-center my-6">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-[#14161E] border border-gray-200 dark:border-[#232737] text-gray-700 dark:text-gray-300 hover:border-red-500 hover:text-[#FF0033] shadow-sm hover:shadow transition-all"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Important Quality Note Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs sm:text-sm my-6">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Important:</strong> SnapYT mirrors the source quality. If the original is SD, HD, 2K or 4K, you can save the same when it’s available. We never upscale or add watermarks.
        </p>
      </div>

      {/* Advantage Chips */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {['Best-in-class UX', 'Playlists: copy each video link', 'No registration • Browser-based'].map((text, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#14161E] border border-gray-200 dark:border-[#232737] text-xs font-bold text-gray-700 dark:text-gray-300 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF0033]" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
