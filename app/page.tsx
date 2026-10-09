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

export default function Home() {
  const [loadedVideo, setLoadedVideo] = useState<VideoMetadata | null>(null);

  const handleVideoLoaded = (video: VideoMetadata) => {
    setLoadedVideo(video);
    // Smooth scroll down to video preview card
    setTimeout(() => {
      window.scrollTo({
        top: 280,
        behavior: 'smooth',
      });
    }, 100);
  };

  const handleReset = () => {
    setLoadedVideo(null);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroInput
        onVideoLoaded={handleVideoLoaded}
        title="YouTube Video Downloader"
        subtitle="Paste a YouTube video or Shorts link, choose your preferred quality, and save the video or audio in seconds."
        eyebrow="YouTube Video Downloader"
        placeholder="Paste a YouTube video or Shorts link"
      />

      {/* Video Preview Card (Rendered when video is fetched) */}
      {loadedVideo && (
        <div id="video-preview-section" className="animate-in fade-in duration-300">
          <VideoPreviewCard video={loadedVideo} onReset={handleReset} />
        </div>
      )}

      {/* Navigation Jump Chips & Quality Notice */}
      <NavigationChips />

      {/* Main Feature Sections (Glance, Why SnapYT, How to, Copy link, Bento features, Use cases) */}
      <FeatureSections />

      {/* Device Guides, Limits, Best Practices, Link Formats, Troubleshooting */}
      <DevicesAndGuides />

      {/* Interactive 15-Question FAQ */}
      <FaqSection />

      {/* Legal & Ethical Use, Compliance Notice, and Final CTA */}
      <ComplianceSection />
    </div>
  );
}
