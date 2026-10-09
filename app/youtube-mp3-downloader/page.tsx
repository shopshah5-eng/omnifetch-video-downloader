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

export default function YouTubeMp3DownloaderPage() {
  const [loadedVideo, setLoadedVideo] = useState<VideoMetadata | null>(null);

  return (
    <div className="w-full">
      <HeroInput
        onVideoLoaded={(video) => setLoadedVideo(video)}
        title="YouTube mp3 Downloader"
        subtitle="Save YouTube audio fast with SnapYT: paste a link to get MP3 (or M4A when available). Private, no login; works on mobile & desktop."
        eyebrow="YouTube mp3 Downloader"
        placeholder="Paste a YouTube video or Shorts link to extract MP3"
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
