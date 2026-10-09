'use client';

import React, { useState, useRef } from 'react';
import { Download, Clipboard, X, AlertCircle, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import { processMediaUrl } from '@/lib/youtube-client';
import { detectPlatform } from '@/lib/platforms';
import { VideoMetadata } from '@/lib/types';

interface HeroInputProps {
  onVideoLoaded: (video: VideoMetadata) => void;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  placeholder?: string;
  activePlatformId?: string;
}

export default function HeroInput({
  onVideoLoaded,
  title = 'Download Any Video in Seconds',
  subtitle = 'Paste any link from YouTube, TikTok, Instagram, or Facebook. Choose HD or MP3, and save it directly to your phone or computer.',
  eyebrow = 'Fast & Free Video Downloader',
  placeholder = 'Paste video or music link here...',
  activePlatformId = 'all',
}: HeroInputProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const detectedPlatform = detectPlatform(url);

  const handlePaste = async () => {
    setError(null);
    try {
      if (!navigator.clipboard || !navigator.clipboard.readText) {
        setError('Please paste your link directly into the box.');
        inputRef.current?.focus();
        return;
      }
      const text = await navigator.clipboard.readText();
      const trimmed = text.trim();
      if (!trimmed) {
        setError('Your clipboard is empty. Please copy a video link first.');
        return;
      }
      setUrl(trimmed);
      inputRef.current?.focus();
      handleProcessUrl(trimmed);
    } catch {
      setError('Please paste your link directly into the box.');
      inputRef.current?.focus();
    }
  };

  const handleClear = () => {
    setUrl('');
    setError(null);
    inputRef.current?.focus();
  };

  const handleProcessUrl = async (targetUrl?: string) => {
    const raw = (targetUrl || url).trim();
    if (!raw) {
      setError('Please paste a link first.');
      inputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await processMediaUrl(raw);
      if (result.success && result.data) {
        onVideoLoaded(result.data);
      } else {
        throw new Error(result.error || 'Could not find video. Please check the link and try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Could not load video. Please check your link.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleProcessUrl();
  };

  const loadSample = (sampleUrl: string) => {
    setUrl(sampleUrl);
    handleProcessUrl(sampleUrl);
  };

  return (
    <section className="pt-8 sm:pt-16 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-4xl lg:max-w-5xl mx-auto text-center">
        
        {/* Simple Minimal Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F4F5] dark:bg-[#121215] border border-[#E4E4E7] dark:border-[#27272A] text-xs sm:text-sm font-medium text-[#52525B] dark:text-[#A1A1AA] mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-[#09090B] dark:text-white">{eyebrow}</span>
          <span className="text-[#A1A1AA] dark:text-[#52525B]">·</span>
          <span>100% Free · No Sign-up</span>
        </div>

        {/* Clean Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#09090B] dark:text-white leading-[1.12] mb-5">
          {title}
        </h1>

        {/* Simple Subtitle */}
        <p className="text-base sm:text-lg text-[#52525B] dark:text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>

        {/* Spacious Search & Download Box */}
        <div className="w-full max-w-3xl sm:max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-0 p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-[#0C0C0E] border border-[#E4E4E7] dark:border-[#27272A] shadow-sm hover:border-[#D4D4D8] dark:hover:border-[#3F3F46] focus-within:border-black dark:focus-within:border-white focus-within:shadow-xl transition-all duration-200"
          >
            {/* Input field */}
            <div className="relative flex-1 flex items-center min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={placeholder}
                className="w-full pl-4 sm:pl-5 pr-20 py-3.5 sm:py-4 bg-transparent text-[#09090B] dark:text-white placeholder-[#A1A1AA] dark:placeholder-[#52525B] text-base sm:text-lg outline-none font-medium"
                disabled={isLoading}
              />

              <div className="absolute right-3 flex items-center gap-1.5">
                {url ? (
                  <button
                    type="button"
                    onClick={handleClear}
                    title="Clear"
                    className="p-1.5 rounded-lg text-[#71717A] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181B] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F4F5] dark:bg-[#18181B] hover:bg-[#E4E4E7] dark:hover:bg-[#27272A] text-[#52525B] dark:text-[#A1A1AA] text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>Paste</span>
                  </button>
                )}
              </div>
            </div>

            {/* Download Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 font-bold text-sm sm:text-base tracking-tight btn-press transition-all disabled:opacity-50 shadow-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Download</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Detected platform notification */}
          {url && detectedPlatform.id !== 'all' && (
            <div className="mt-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Found:</span>
              <span className="font-bold text-[#09090B] dark:text-white">
                {detectedPlatform.name} video
              </span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3.5 rounded-xl bg-[#FEF2F2] dark:bg-[#180C0E] border border-[#FCA5A5] dark:border-[#7F1D1D] flex items-center gap-2.5 text-left text-xs sm:text-sm text-[#B91C1C] dark:text-[#F87171]">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Try sample buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-[#71717A]">
            <span>Try sample:</span>
            <button
              type="button"
              onClick={() => loadSample('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
              className="px-2.5 py-1 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#A1A1AA] dark:hover:border-[#52525B] transition-colors"
            >
              YouTube HD
            </button>
            <button
              type="button"
              onClick={() => loadSample('https://www.tiktok.com/@tiktok/video/7000000000000000000')}
              className="px-2.5 py-1 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#A1A1AA] dark:hover:border-[#52525B] transition-colors"
            >
              TikTok (No Watermark)
            </button>
            <button
              type="button"
              onClick={() => loadSample('https://www.instagram.com/reel/C-sample/')}
              className="px-2.5 py-1 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#A1A1AA] dark:hover:border-[#52525B] transition-colors"
            >
              Instagram Reel
            </button>
          </div>

          {/* Simple Trust Points */}
          <div className="mt-10 pt-6 border-t border-[#E4E4E7] dark:border-[#1F1F23] grid grid-cols-3 gap-4 text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA]">
            <div className="flex items-center justify-center gap-1.5">⚡ Fast Download</div>
            <div className="flex items-center justify-center gap-1.5">✨ No Watermark</div>
            <div className="flex items-center justify-center gap-1.5">🔒 100% Free &amp; Private</div>
          </div>
        </div>
      </div>
    </section>
  );
}
