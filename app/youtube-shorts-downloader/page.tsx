'use client';

import React, { useState } from 'react';
import HeroInput from '@/components/HeroInput';
import VideoPreviewCard from '@/components/VideoPreviewCard';
import NavigationChips from '@/components/NavigationChips';
import FeatureSections from '@/components/FeatureSections';
import DevicesAndGuides from '@/components/DevicesAndGuides';
import FaqSection from '@/components/FaqSection';
import ComplianceSection from '@/components/ComplianceSection';
import { VideoMetadata } from '@/lib/types';

export default function YouTubeShortsDownloaderPage() {
  const [loadedVideo, setLoadedVideo] = useState<VideoMetadata | null>(null);

  return (
    <div className="w-full">
      <HeroInput
        onVideoLoaded={(video) => setLoadedVideo(video)}
        title="YouTube Shorts Downloader"
        subtitle="Save YouTube Shorts fast with SnapYT: paste a Shorts link to get MP4 or audio. HD/4K when available. Private, no login; works on mobile & desktop."
        eyebrow="YouTube Shorts Downloader"
        placeholder="Paste a YouTube Shorts link"
      />

      {loadedVideo && (
        <div id="video-preview-section" className="animate-in fade-in duration-300">
          <VideoPreviewCard video={loadedVideo} onReset={() => setLoadedVideo(null)} />
        </div>
      )}

      <NavigationChips />
      <FeatureSections />
      <DevicesAndGuides />
      <FaqSection />
      <ComplianceSection />
    </div>
  );
}
