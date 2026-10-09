import React from 'react';
import { Layers, FileCode2, Cpu, Radio, ShieldCheck, Zap } from 'lucide-react';

export default function TechnicalGuide() {
  const guides = [
    {
      icon: <Radio className="w-4 h-4 text-emerald-500" />,
      title: 'How Adaptive DASH / HLS Streaming Works',
      content: 'Modern video hosts like YouTube and Reddit do not store 1080p and 4K videos as single standalone files. Instead, they slice media into 2-to-10 second chunks delivered over Dynamic Adaptive Streaming over HTTP (DASH) or HTTP Live Streaming (HLS). Video and audio tracks are transmitted over completely separate channels. OmniFetch inspects the master manifest file (`.mpd` or `.m3u8`), fetches the highest-bitrate video stream and uncompressed audio stream simultaneously, and multiplexes them in real-time into an MP4 container.',
    },
    {
      icon: <Cpu className="w-4 h-4 text-blue-500" />,
      title: 'Video Codec Hierarchy: AV1 vs VP9 vs H.264',
      content: 'When downloading 1080p and 4K content, you will encounter multiple codec formats. H.264 (AVC) provides universal hardware decoding across older smartphones, smart TVs, and editing suites like Final Cut and Premiere. VP9 offers superior compression developed by Google for high-framerate 60FPS content. AV1 (AOMedia Video 1) is the cutting-edge open royalty-free standard delivering 30% higher visual fidelity at identical bitrates. OmniFetch defaults to universal MP4 (H.264/AAC) for maximum playback compatibility while preserving original resolution.',
    },
    {
      icon: <Layers className="w-4 h-4 text-purple-500" />,
      title: 'Clean TikTok Video Scrubbing Without Degradation',
      content: 'Many TikTok downloaders capture videos by screen-recording or applying a blurry crop mask over the bouncing logo. OmniFetch queries the official CDN stream manifest directly to locate the raw, pristine MP4 master file before the TikTok client watermark overlay is composited. This guarantees 100% full-frame resolution, zero logo artifacts, and crystal-clear stereo audio.',
    },
    {
      icon: <FileCode2 className="w-4 h-4 text-amber-500" />,
      title: 'Lossless Audio Extraction to 320kbps MP3',
      content: 'When you extract audio with OmniFetch, our audio pipeline extracts the native Opus or AAC audio stream directly from the container. It parses sample frequencies (up to 48,000 Hz) and outputs studio-grade MP3 or M4A audio files with full ID3 metadata support, ideal for podcasts, music production, and offline listening.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 max-w-[1100px] mx-auto px-4 sm:px-6 border-t border-[#E4E4E7] dark:border-[#1F1F23]">
      <div className="max-w-2xl mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F4F5] dark:bg-[#121215] border border-[#E4E4E7] dark:border-[#27272A] text-[11px] font-mono-tech text-[#52525B] dark:text-[#A1A1AA] mb-4">
          <FileCode2 className="w-3.5 h-3.5" />
          <span>Technical Whitepaper &amp; Standards</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#09090B] dark:text-white tracking-tight">
          How Media Extraction Works
        </h2>
        <p className="mt-2 text-sm text-[#52525B] dark:text-[#A1A1AA]">
          A comprehensive breakdown of stream multiplexing, adaptive bitrates, and lossless containerization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-[#08080A] border border-[#E4E4E7] dark:border-[#1F1F23] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#F4F4F5] dark:bg-[#141417] flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#09090B] dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                {item.content}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-[#E4E4E7] dark:border-[#18181B] text-[11px] font-mono-tech text-[#71717A]">
              RFC 8216 / ISO/IEC 23009-1 Standard
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
