import React, { useState } from 'react';
import { Download, Copy, Check, Video, RefreshCw, Music, CheckCircle2, AlertCircle } from 'lucide-react';
import { VideoMetadata, VideoFormat } from '@/lib/types';
import { detectPlatform } from '@/lib/platforms';
import AdBanner from './AdBanner';

interface VideoPreviewCardProps {
  video: VideoMetadata;
  onReset: () => void;
}

export default function VideoPreviewCard({ video, onReset }: VideoPreviewCardProps) {
  const [selectedFormatIndex, setSelectedFormatIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const platformInfo = detectPlatform(video.url);

  const videoFormats = video.formats.filter((f) => f.kind === 'video+audio' || f.kind === 'video-only');
  const audioFormats = video.formats.filter((f) => f.kind === 'audio-only');

  const displayedFormats = activeTab === 'video'
    ? (videoFormats.length > 0 ? videoFormats : video.formats)
    : (audioFormats.length > 0 ? audioFormats : video.formats);

  const selectedFormat: VideoFormat | undefined = displayedFormats[selectedFormatIndex] || displayedFormats[0] || video.formats[0];

  const triggerDownload = async (format?: VideoFormat) => {
    const targetFormat = format || selectedFormat;
    if (!targetFormat) return;

    setIsDownloading(true);
    setDownloadStarted(false);
    setDownloadError(null);

    const targetUrl = `/api/download?url=${encodeURIComponent(video.url)}&fmt=${encodeURIComponent(targetFormat.id || 'best')}&title=${encodeURIComponent(video.title)}&ext=${encodeURIComponent(targetFormat.ext || 'mp4')}`;

    try {
      // Test server response first to avoid silent 404 failure
      const checkRes = await fetch(targetUrl, { method: 'HEAD' }).catch(() => null);

      if (!checkRes || !checkRes.ok) {
        throw new Error('Download backend server is currently offline (HTTP ' + (checkRes ? checkRes.status : 'Offline') + '). Please ensure the backend service or container is running.');
      }

      // If server responded OK, trigger native browser file download
      const link = document.createElement('a');
      link.href = targetUrl;
      link.setAttribute('download', `${video.title}.${targetFormat.ext || 'mp4'}`);
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) document.body.removeChild(link);
      }, 1000);

      setDownloadStarted(true);
      setTimeout(() => {
        setIsDownloading(false);
      }, 4000);
    } catch (err: any) {
      setDownloadError(err.message || 'Download service unavailable. Please try again later.');
      setIsDownloading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(video.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Video Info & Thumbnail */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0A0A0A] border border-[#E4E4E7] dark:border-[#27272A] rounded-2xl p-5 shadow-sm">
          
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Ready to Download</span>
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded border border-[#E4E4E7] dark:border-[#27272A] text-[#71717A] dark:text-[#A1A1AA]">
              {platformInfo.name}
            </span>
          </div>

          {/* Thumbnail */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4 border border-[#E4E4E7] dark:border-[#27272A]">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {video.duration && video.duration !== '0:00' && (
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-medium">
                {video.duration}
              </div>
            )}
          </div>

          {/* Title & Author */}
          <h2 className="text-sm sm:text-base font-bold text-[#09090B] dark:text-white line-clamp-2 leading-snug mb-1">
            {video.title}
          </h2>
          <div className="flex items-center justify-between text-xs text-[#71717A] dark:text-[#A1A1AA] pb-4 border-b border-[#E4E4E7] dark:border-[#27272A]">
            <span>{video.uploader}</span>
            {video.views && <span>{video.views.toLocaleString()} views</span>}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 py-2 px-3 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] hover:bg-[#F4F4F5] dark:hover:bg-[#141417] text-xs font-semibold text-[#09090B] dark:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="py-2 px-3 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] hover:bg-[#F4F4F5] dark:hover:bg-[#141417] text-xs font-semibold text-[#71717A] dark:text-[#A1A1AA] transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Link</span>
            </button>
          </div>
        </div>

        {/* Right: Quality Options */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0A0A0A] border border-[#E4E4E7] dark:border-[#27272A] rounded-2xl p-5 sm:p-6 shadow-sm">
          
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#09090B] dark:text-white">Choose Quality</h3>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA]">Select video format or sound file</p>
            </div>

            {/* Video vs Audio Tabs */}
            <div className="flex items-center p-0.5 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] bg-[#F4F4F5] dark:bg-[#121215]">
              <button
                type="button"
                onClick={() => { setActiveTab('video'); setSelectedFormatIndex(0); }}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'video'
                    ? 'bg-white dark:bg-[#0A0A0A] text-[#09090B] dark:text-white shadow-xs'
                    : 'text-[#71717A] dark:text-[#A1A1AA]'
                }`}
              >
                Video (MP4)
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('audio'); setSelectedFormatIndex(0); }}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'audio'
                    ? 'bg-white dark:bg-[#0A0A0A] text-[#09090B] dark:text-white shadow-xs'
                    : 'text-[#71717A] dark:text-[#A1A1AA]'
                }`}
              >
                Audio (MP3)
              </button>
            </div>
          </div>

          {/* Formats List */}
          <div className="space-y-2 mb-6 max-h-[280px] overflow-y-auto pr-1">
            {displayedFormats.map((format, idx) => {
              const isSelected = idx === selectedFormatIndex;
              const isAudio = format.kind === 'audio-only';
              return (
                <div
                  key={format.id + idx}
                  onClick={() => setSelectedFormatIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-black dark:border-white bg-[#F4F4F5] dark:bg-[#121215]'
                      : 'border-[#E4E4E7] dark:border-[#27272A] hover:border-[#A1A1AA] dark:hover:border-[#52525B]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#F4F4F5] dark:bg-[#141417] flex items-center justify-center text-[#52525B] dark:text-[#A1A1AA]">
                      {isAudio ? <Music className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-[#09090B] dark:text-white">
                          {format.quality}
                        </span>
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#E4E4E7] dark:bg-[#27272A] text-[#52525B] dark:text-[#A1A1AA]">
                          {format.ext}
                        </span>
                      </div>
                      <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-0.5">
                        {format.sizeFormatted !== 'Unknown' ? format.sizeFormatted : 'High Quality'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerDownload(format);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-85 text-xs font-semibold btn-press"
                  >
                    Download
                  </button>
                </div>
              );
            })}
          </div>

          {/* Big Download Button */}
          <button
            type="button"
            onClick={() => triggerDownload()}
            disabled={isDownloading || !selectedFormat}
            className="w-full py-3.5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 font-bold text-sm tracking-tight flex items-center justify-center gap-2 btn-press transition-all disabled:opacity-75"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>
                  {downloadStarted
                    ? 'Download Initiated'
                    : `Contacting Server for ${selectedFormat?.quality}...`}
                </span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download {selectedFormat?.quality} ({selectedFormat?.ext?.toUpperCase()})</span>
              </>
            )}
          </button>

          {/* Download status / error feedback */}
          <div role="status" aria-live="polite" className="mt-3">
            {downloadError && (
              <div className="p-3 rounded-xl bg-[#FEF2F2] dark:bg-[#180C0E] border border-[#FCA5A5] dark:border-[#7F1D1D] flex items-center gap-2.5 text-left text-xs text-[#B91C1C] dark:text-[#F87171]">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{downloadError}</span>
              </div>
            )}

            {downloadStarted && !downloadError && (
              <div className="p-2.5 rounded-lg bg-[#F0FDF4] dark:bg-[#0C1A10] border border-[#86EFAC] dark:border-[#1E3A24] text-center text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Download file stream requested. Look for the file in your downloads.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* High-CTR Ad Slot inside Preview */}
      <AdBanner slotId="videoPreview" className="mt-8" />
    </section>
  );
}
