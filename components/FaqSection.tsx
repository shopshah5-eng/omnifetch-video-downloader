'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Is this video downloader completely free?',
    a: 'Yes, it is 100% free forever. You don’t need to create an account, enter a credit card, or pay any fees. There are no daily limits.',
  },
  {
    q: 'Does it remove the watermark from TikTok videos?',
    a: 'Yes. When you download a TikTok video, it downloads without the bouncing TikTok logo or watermark, giving you a clean, high-quality video.',
  },
  {
    q: 'Can I download just the music or audio as MP3?',
    a: 'Yes. Simply paste the link, choose the "Audio (MP3)" tab, and click Download. You will get a high-quality MP3 file of the sound or music.',
  },
  {
    q: 'How do I save videos on my iPhone or iPad?',
    a: 'Open this website in Safari on your iPhone, paste the video link, and tap Download. Safari will ask you to confirm. After downloading, tap the download icon in Safari and select "Save Video" to save it directly into your Photos app.',
  },
  {
    q: 'Does it work with Reddit videos with sound?',
    a: 'Yes. Many downloaders only save Reddit video without sound. Our tool automatically includes the audio so your downloaded video plays with full sound.',
  },
  {
    q: 'Can I download Instagram Reels and Stories?',
    a: 'Yes. You can download public Instagram Reels, videos, and photos in high resolution. You don’t need to log into Instagram.',
  },
  {
    q: 'Is my download history private?',
    a: 'Yes. We do not save your download history, keep copies of your videos, or track what you download. Your downloads are completely private.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-4xl font-black text-[#09090B] dark:text-white tracking-tight mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-[#71717A] dark:text-[#A1A1AA]">
          Everything you need to know about downloading videos.
        </p>
      </div>

      <div className="divide-y divide-[#E4E4E7] dark:divide-[#27272A] border-t border-b border-[#E4E4E7] dark:border-[#27272A]">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-5">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left gap-4 group"
              >
                <span className="font-bold text-sm sm:text-base text-[#09090B] dark:text-white group-hover:opacity-75 transition-opacity">
                  {item.q}
                </span>
                <span className="text-[#71717A] dark:text-[#A1A1AA] flex-shrink-0">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="mt-3 text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] leading-relaxed pr-6">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
