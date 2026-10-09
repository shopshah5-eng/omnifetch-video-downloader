import React from 'react';
import { Check, X, Zap, Shield, Gauge, Cpu } from 'lucide-react';

export default function SpeedBenchmark() {
  const rows = [
    {
      feature: 'Time-to-First-Byte (TTFB)',
      omnifetch: '< 200 ms (Instant Pipe)',
      competitors: '15 – 45 seconds (Re-encoding queue)',
      cloudTools: '20 – 60 seconds (Wait timer / Captcha)',
    },
    {
      feature: 'Download Pipeline',
      omnifetch: 'Direct Multi-Fragment Stream',
      competitors: 'Single-thread proxy bottleneck',
      cloudTools: 'Intermediary server disk caching',
    },
    {
      feature: 'TikTok Watermark Scrubbing',
      omnifetch: 'Lossless Raw Multiplexing',
      competitors: 'Degraded re-compression',
      cloudTools: 'Visible crop or logo blur',
    },
    {
      feature: 'Reddit Audio & Video Sync',
      omnifetch: 'Synchronized DASH Merge',
      competitors: 'Muted video (No audio)',
      cloudTools: 'Out-of-sync audio offset',
    },
    {
      feature: 'YouTube 4K & 60FPS Support',
      omnifetch: 'Native AV1 / VP9 / H.264',
      competitors: 'Capped at 720p',
      cloudTools: 'Requires paid VIP subscription',
    },
    {
      feature: 'Privacy & Data Logging',
      omnifetch: '100% Transient / Zero-Log',
      competitors: 'IP tracking & analytics cookies',
      cloudTools: 'File retention on disk for 24h',
    },
  ];

  return (
    <section className="py-14 sm:py-20 max-w-[1100px] mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F4F5] dark:bg-[#121215] border border-[#E4E4E7] dark:border-[#27272A] text-[11px] font-mono-tech text-[#52525B] dark:text-[#A1A1AA] mb-4">
          <Gauge className="w-3.5 h-3.5 text-emerald-500" />
          <span>Performance Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#09090B] dark:text-white tracking-tight">
          Engineered for Maximum Speed
        </h2>
        <p className="mt-2 text-sm text-[#52525B] dark:text-[#A1A1AA]">
          Why OmniFetch extracts and downloads media files up to 10x faster than traditional web downloaders.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#E4E4E7] dark:border-[#1F1F23] bg-white dark:bg-[#08080A]">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#E4E4E7] dark:border-[#1F1F23] bg-[#F8F9FA] dark:bg-[#0E0E12]">
              <th className="py-4 px-5 font-semibold text-[#52525B] dark:text-[#A1A1AA]">Architecture Metric</th>
              <th className="py-4 px-5 font-bold text-[#09090B] dark:text-white">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>OmniFetch Direct Pipe</span>
                </span>
              </th>
              <th className="py-4 px-5 font-medium text-[#71717A]">Legacy Downloaders</th>
              <th className="py-4 px-5 font-medium text-[#71717A]">Ad-Heavy Web Tools</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E4E7] dark:divide-[#1F1F23] font-mono-tech text-[12px] sm:text-[13px]">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#F9FAFB] dark:hover:bg-[#0F0F13] transition-colors">
                <td className="py-3.5 px-5 font-sans font-medium text-[#09090B] dark:text-white">
                  {row.feature}
                </td>
                <td className="py-3.5 px-5 font-bold text-emerald-600 dark:text-emerald-400">
                  {row.omnifetch}
                </td>
                <td className="py-3.5 px-5 text-[#71717A]">
                  {row.competitors}
                </td>
                <td className="py-3.5 px-5 text-[#71717A]">
                  {row.cloudTools}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
