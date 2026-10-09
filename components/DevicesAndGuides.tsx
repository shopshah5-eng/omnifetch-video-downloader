'use client';

import React from 'react';
import { Smartphone, Laptop, Apple, CheckCircle2 } from 'lucide-react';

export default function DevicesAndGuides() {
  const steps = [
    {
      num: '1',
      title: 'Copy the link',
      desc: 'Open YouTube, TikTok, or Instagram, tap Share, and copy the video link.',
    },
    {
      num: '2',
      title: 'Paste it here',
      desc: 'Paste the link into the search box at the top of the page.',
    },
    {
      num: '3',
      title: 'Download and save',
      desc: 'Choose your quality (HD, 4K, or MP3) and click Download.',
    },
  ];

  const devices = [
    {
      icon: <Apple className="w-4 h-4 text-[#09090B] dark:text-white" />,
      title: 'iPhone & iPad',
      desc: 'Open in Safari, tap Download, then tap the download icon in your address bar and choose "Save Video" to keep it in your Photos app.',
    },
    {
      icon: <Smartphone className="w-4 h-4 text-[#09090B] dark:text-white" />,
      title: 'Android',
      desc: 'Works in Google Chrome or any browser. Files download directly to your Downloads folder and show up in your Gallery.',
    },
    {
      icon: <Laptop className="w-4 h-4 text-[#09090B] dark:text-white" />,
      title: 'Windows & Mac',
      desc: 'Works in Chrome, Safari, Edge, or Firefox. Just click Download to save the MP4 video or MP3 audio file directly to your computer.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* 3-Step Guide */}
      <div className="mb-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-[#09090B] dark:text-white tracking-tight mb-3">
            How to Download in 3 Steps
          </h2>
          <p className="text-sm sm:text-base text-[#71717A] dark:text-[#A1A1AA]">
            It takes less than 10 seconds to save your favorite videos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0C0C0E] border border-[#E4E4E7] dark:border-[#27272A] shadow-sm hover:shadow-md transition-all relative"
            >
              <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black font-black text-sm flex items-center justify-center mb-5">
                {step.num}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#09090B] dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Device Support */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-10">
          <h3 className="text-xl sm:text-3xl font-black text-[#09090B] dark:text-white tracking-tight mb-2">
            Works on Any Device
          </h3>
          <p className="text-sm sm:text-base text-[#71717A] dark:text-[#A1A1AA]">
            No extra software or extensions needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {devices.map((dev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#0C0C0E] border border-[#E4E4E7] dark:border-[#27272A] shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#F4F4F5] dark:bg-[#18181B] flex items-center justify-center">
                  {dev.icon}
                </div>
                <h4 className="font-bold text-sm sm:text-base text-[#09090B] dark:text-white">
                  {dev.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                {dev.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
