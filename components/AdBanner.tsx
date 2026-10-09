'use client';

import React from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { GLOBAL_AD_SETTINGS, AD_SLOTS, AdSlotConfig } from '../lib/adConfig';

interface AdBannerProps {
  slotId: 'heroUnderInput' | 'videoPreview' | 'midPage' | 'aboveFooter';
  format?: 'responsive-leaderboard' | 'rectangle'; // 'responsive-leaderboard' is 728x90 desktop / 300x250 mobile
  className?: string;
}

export default function AdBanner({
  slotId,
  format = 'responsive-leaderboard',
  className = '',
}: AdBannerProps) {
  if (!GLOBAL_AD_SETTINGS.showAds) {
    return null;
  }

  const slotConfig: AdSlotConfig = AD_SLOTS[slotId] || {
    enabled: true,
    type: 'placeholder',
  };

  if (!slotConfig.enabled) {
    return null;
  }

  // 1. If custom HTML/Ad Network Script is supplied
  if (slotConfig.type === 'custom' && slotConfig.customHtml) {
    return (
      <div className={`flex flex-col items-center justify-center my-6 ${className}`}>
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#A1A1AA] dark:text-[#52525B] mb-1">
          Advertisement
        </span>
        <div
          dangerouslySetInnerHTML={{ __html: slotConfig.customHtml }}
          className="overflow-hidden flex items-center justify-center"
        />
      </div>
    );
  }

  // 2. Standard Responsive 728x90 (Desktop) / 300x250 (Mobile) Slot
  return (
    <div className={`w-full flex flex-col items-center justify-center my-6 sm:my-8 px-4 ${className}`}>
      {/* Subtle Compliance Label */}
      <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#71717A] dark:text-[#52525B]">
        <span>Sponsored</span>
        <span>·</span>
        <span className="font-normal lowercase text-[9px] opacity-75">
          {format === 'responsive-leaderboard' ? '728×90 / 300×250' : '300×250'}
        </span>
      </div>

      {/* Responsive Container */}
      <div
        className={`w-full max-w-[728px] rounded-2xl bg-white dark:bg-[#0C0C0E] border border-dashed border-[#D4D4D8] dark:border-[#27272A] hover:border-black dark:hover:border-white transition-all shadow-sm overflow-hidden flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 gap-3.5 group`}
      >
        {/* Left: Content */}
        <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] dark:bg-[#18181B] flex-shrink-0 flex items-center justify-center text-black dark:text-white group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-[#09090B] dark:text-white truncate">
                {slotConfig.affiliateTitle || 'Fast & Secure Browsing Partner'}
              </h4>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                PROMO
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#71717A] dark:text-[#A1A1AA] line-clamp-1 sm:line-clamp-2 leading-relaxed">
              {slotConfig.affiliateDesc || 'Special offer for video downloader users. Verified safe and private.'}
            </p>
          </div>
        </div>

        {/* Right: CTA Button */}
        <a
          href={slotConfig.affiliateLink || '#'}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-90 transition-opacity whitespace-nowrap btn-press"
        >
          <span>{slotConfig.affiliateCta || 'Learn More'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
        </a>
      </div>
    </div>
  );
}
