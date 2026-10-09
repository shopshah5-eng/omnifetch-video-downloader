'use client';

import React from 'react';
import { Zap, Sparkles, Film, ShieldCheck } from 'lucide-react';

export default function FeatureSections() {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: 'Fast Downloads',
      desc: 'No waiting or countdown timers. Your video starts downloading right away at top speed.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
      title: 'No Watermarks',
      desc: 'Download clean TikTok videos and Instagram Reels without annoying logos or stamps.',
    },
    {
      icon: <Film className="w-5 h-5 text-blue-500" />,
      title: 'Full HD & 4K',
      desc: 'Save videos in their original crisp quality, or convert them into clear MP3 music files.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-500" />,
      title: '100% Free & Safe',
      desc: 'No sign-up, no credit card, and no app to install. Completely private and safe to use.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-4xl font-black text-[#09090B] dark:text-white tracking-tight mb-3">
          Why Use This Downloader
        </h2>
        <p className="text-sm sm:text-base text-[#71717A] dark:text-[#A1A1AA]">
          Simple, fast, and works on all your devices.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0C0C0E] border border-[#E4E4E7] dark:border-[#27272A] hover:border-black dark:hover:border-white transition-all shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-xl bg-[#F4F4F5] dark:bg-[#18181B] flex items-center justify-center mb-5">
              {feat.icon}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#09090B] dark:text-white mb-2">
              {feat.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
