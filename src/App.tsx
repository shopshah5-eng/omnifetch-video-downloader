import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import PlatformSelector from '../components/PlatformSelector';
import HeroInput from '../components/HeroInput';
import VideoPreviewCard from '../components/VideoPreviewCard';
import SupportedPlatformsGrid from '../components/SupportedPlatformsGrid';
import FeatureSections from '../components/FeatureSections';
import DevicesAndGuides from '../components/DevicesAndGuides';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';
import { VideoMetadata } from '../lib/types';
import { PLATFORMS } from '../lib/platforms';

const CANONICAL_BASE = 'https://omnifetch-video-downloader.vercel.app';

const SEO_DATA: Record<string, { title: string; description: string; canonical: string; keywords?: string }> = {
  home: {
    title: 'Free Video Downloader — Save YouTube, TikTok, Instagram & More',
    description: 'Download videos, reels, and music from YouTube, TikTok without watermark, Instagram, and Facebook in HD, 1080p, or MP3. Fast, free, and no sign-up.',
    canonical: `${CANONICAL_BASE}/`,
    keywords: 'youtube video downloader, tiktok downloader no watermark, instagram reels downloader, youtube to mp3, facebook video downloader, reddit video downloader with sound',
  },
  youtube: {
    title: 'YouTube Video & Shorts Downloader (HD & MP3) | OmniFetch',
    description: 'Download YouTube videos, Shorts, and music in HD, 1080p, or MP3 audio. Free, fast, and easy to use.',
    canonical: `${CANONICAL_BASE}/youtube-downloader`,
    keywords: 'youtube video downloader, download youtube shorts, youtube to mp3, save youtube video, youtube 1080p download',
  },
  instagram: {
    title: 'Instagram Reels & Video Downloader | OmniFetch',
    description: 'Save Instagram Reels, videos, and photos in original high quality. Free, fast, and no login required.',
    canonical: `${CANONICAL_BASE}/instagram-downloader`,
    keywords: 'instagram downloader, download instagram reels, save instagram video, instagram story saver',
  },
  tiktok: {
    title: 'TikTok Downloader Without Watermark (HD & MP3) | OmniFetch',
    description: 'Download TikTok videos without any watermark in HD. Save original TikTok sound and music as MP3 for free.',
    canonical: `${CANONICAL_BASE}/tiktok-downloader`,
    keywords: 'tiktok downloader, tiktok without watermark, download tiktok to mp3, tiktok sound extractor, tiktok video download',
  },
  facebook: {
    title: 'Facebook Video & Reels Downloader | OmniFetch',
    description: 'Download public Facebook videos and Reels in Full HD 1080p or 720p. Free and simple.',
    canonical: `${CANONICAL_BASE}/facebook-downloader`,
    keywords: 'facebook video downloader, fb reels download, save facebook video, facebook watch mp4',
  },
  twitter: {
    title: 'Twitter / X Video & GIF Downloader | OmniFetch',
    description: 'Download videos and GIFs from Twitter (X) tweets in MP4 format. Free, fast, and crystal clear.',
    canonical: `${CANONICAL_BASE}/twitter-downloader`,
    keywords: 'twitter video downloader, x video downloader, download twitter gif, tweet to mp4',
  },
  reddit: {
    title: 'Reddit Video Downloader with Sound | OmniFetch',
    description: 'Download Reddit videos with clear audio included. No more muted videos.',
    canonical: `${CANONICAL_BASE}/reddit-downloader`,
    keywords: 'reddit video downloader, reddit video with sound, download v.redd.it, reddit to mp4',
  },
  pinterest: {
    title: 'Pinterest Video & GIF Downloader | OmniFetch',
    description: 'Download Pinterest videos, idea pins, and animated GIFs in original high quality.',
    canonical: `${CANONICAL_BASE}/pinterest-downloader`,
    keywords: 'pinterest downloader, pinterest video downloader, download pin video, pinterest gif download',
  },
  threads: {
    title: 'Threads Video & Photo Downloader | OmniFetch',
    description: 'Download videos and photos from Threads in high quality. Simple, free, and private.',
    canonical: `${CANONICAL_BASE}/threads-downloader`,
    keywords: 'threads video downloader, download threads video, save threads post',
  },
  dailymotion: {
    title: 'Dailymotion Video Downloader (1080p HD) | OmniFetch',
    description: 'Save Dailymotion videos in 1080p Full HD or MP3 audio fast and free.',
    canonical: `${CANONICAL_BASE}/dailymotion-downloader`,
    keywords: 'dailymotion downloader, download dailymotion video, dailymotion to mp4',
  },
  shorts: {
    title: 'YouTube Shorts Downloader | OmniFetch',
    description: 'Save vertical YouTube Shorts in high quality MP4 video and MP3 audio for free.',
    canonical: `${CANONICAL_BASE}/youtube-shorts-downloader`,
  },
  mp3: {
    title: 'YouTube to MP3 Audio Converter & Music Downloader | OmniFetch',
    description: 'Convert and download clear MP3 audio from any YouTube video in seconds. Free and simple.',
    canonical: `${CANONICAL_BASE}/youtube-to-mp3`,
  },
  privacy: {
    title: 'Privacy Policy | OmniFetch',
    description: 'OmniFetch does not store your downloads, search history, or personal information.',
    canonical: `${CANONICAL_BASE}/privacy`,
  },
  terms: {
    title: 'Terms of Service | OmniFetch',
    description: 'Terms of use and guidelines for downloading public videos with OmniFetch.',
    canonical: `${CANONICAL_BASE}/terms`,
  },
  contact: {
    title: 'Contact Us & DMCA Notice | OmniFetch',
    description: 'Get in touch with the OmniFetch team or submit a DMCA copyright inquiry.',
    canonical: `${CANONICAL_BASE}/contact`,
  },
  about: {
    title: 'About OmniFetch — Fast Video Downloader',
    description: 'OmniFetch is a free web tool created to help people save videos quickly and easily without annoying pop-ups or wait times.',
    canonical: `${CANONICAL_BASE}/about`,
  },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [loadedVideo, setLoadedVideo] = useState<VideoMetadata | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('youtube-shorts')) {
        setCurrentPage('shorts');
        setSelectedPlatform('youtube');
      } else if (path.includes('mp3') || path.includes('audio')) {
        setCurrentPage('mp3');
        setSelectedPlatform('youtube');
      } else if (path.includes('youtube')) {
        setCurrentPage('youtube');
        setSelectedPlatform('youtube');
      } else if (path.includes('tiktok')) {
        setCurrentPage('tiktok');
        setSelectedPlatform('tiktok');
      } else if (path.includes('instagram') || path.includes('ins')) {
        setCurrentPage('instagram');
        setSelectedPlatform('instagram');
      } else if (path.includes('facebook') || path.includes('fb')) {
        setCurrentPage('facebook');
        setSelectedPlatform('facebook');
      } else if (path.includes('twitter') || path.includes('x-down')) {
        setCurrentPage('twitter');
        setSelectedPlatform('twitter');
      } else if (path.includes('reddit')) {
        setCurrentPage('reddit');
        setSelectedPlatform('reddit');
      } else if (path.includes('pinterest') || path.includes('pin')) {
        setCurrentPage('pinterest');
        setSelectedPlatform('pinterest');
      } else if (path.includes('threads')) {
        setCurrentPage('threads');
        setSelectedPlatform('threads');
      } else if (path.includes('dailymotion') || path.includes('dai.ly')) {
        setCurrentPage('dailymotion');
        setSelectedPlatform('dailymotion');
      } else if (path.includes('privacy')) {
        setCurrentPage('privacy');
      } else if (path.includes('terms')) {
        setCurrentPage('terms');
      } else if (path.includes('contact')) {
        setCurrentPage('contact');
      } else if (path.includes('about')) {
        setCurrentPage('about');
      } else {
        setCurrentPage('home');
        setSelectedPlatform('all');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const seoKey = selectedPlatform !== 'all' && SEO_DATA[selectedPlatform] ? selectedPlatform : currentPage;
    const data = SEO_DATA[seoKey] || SEO_DATA.home;
    document.title = data.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.description);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', data.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', data.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', data.canonical);
  }, [currentPage, selectedPlatform]);

  const navigateTo = (page: string, href?: string) => {
    setCurrentPage(page);
    setLoadedVideo(null);
    if (href) {
      window.history.pushState({}, '', href);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlatform = (platformId: string) => {
    setSelectedPlatform(platformId);
    setLoadedVideo(null);
    if (platformId === 'all') {
      setCurrentPage('home');
      window.history.pushState({}, '', '/');
    } else {
      setCurrentPage(platformId);
      window.history.pushState({}, '', `/${platformId}-downloader`);
    }
  };

  const handleVideoLoaded = (video: VideoMetadata) => {
    setLoadedVideo(video);
    setTimeout(() => {
      window.scrollTo({
        top: 240,
        behavior: 'smooth',
      });
    }, 100);
  };

  const currentPlatformInfo = PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[0];

  return (
    <div className="relative min-h-screen flex flex-col bg-white dark:bg-[#070709] text-[#09090B] dark:text-white transition-colors antialiased overflow-x-hidden">
      {/* Ambient Radial Glow for Wide Screens */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(120,119,198,0.14),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(120,119,198,0.10),rgba(0,0,0,0))]" />
      </div>

      <Header
        currentPlatform={selectedPlatform}
        onSelectPlatform={handleSelectPlatform}
        onNavigate={navigateTo}
      />

      <main className="flex-1 w-full" id="main-content">
        {/* Simple Legal Pages */}
        {currentPage === 'privacy' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <button
              onClick={() => navigateTo('home', '/')}
              className="text-xs sm:text-sm font-semibold text-[#71717A] hover:text-black dark:hover:text-white mb-6 inline-block"
            >
              ← Back to Downloader
            </button>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
              Privacy Policy
            </h1>
            <div className="space-y-6 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed border-t border-[#E4E4E7] dark:border-[#27272A] pt-6">
              <section>
                <h2 className="font-bold text-[#09090B] dark:text-white mb-1.5 text-sm">1. Transient In-Memory Processing</h2>
                <p>When you submit a link, OmniFetch processes it transiently in-memory solely to retrieve publicly available metadata and stream parameters. We do not store or host user-downloaded media on our servers.</p>
              </section>
              <section>
                <h2 className="font-bold text-[#09090B] dark:text-white mb-1.5 text-sm">2. No Account or Personal Identity Required</h2>
                <p>You never need to create an account, provide an email address, or log in to use OmniFetch. We do not collect names, payment details, or personal contact information for downloads.</p>
              </section>
              <section>
                <h2 className="font-bold text-[#09090B] dark:text-white mb-1.5 text-sm">3. Local Storage Preferences</h2>
                <p>We use standard client-side browser local storage strictly to remember basic UI settings (such as your light or dark mode theme selection). No persistent tracking identifiers are placed in local storage.</p>
              </section>
              <section>
                <h2 className="font-bold text-[#09090B] dark:text-white mb-1.5 text-sm">4. Hosting Infrastructure</h2>
                <p>OmniFetch is served via secure cloud infrastructure (Vercel). Standard server logs (e.g. IP addresses, request timestamps) are handled transiently by upstream infrastructure strictly for security, DDoS protection, and rate limiting.</p>
              </section>
              <section>
                <h2 className="font-bold text-[#09090B] dark:text-white mb-1.5 text-sm">5. Third-Party Links &amp; Disclosures</h2>
                <p>Any promotional partner links are marked with &quot;Sponsored&quot; or &quot;Promo&quot; badges. We do not share or sell user search logs to advertisers.</p>
              </section>
            </div>
          </div>
        )}

        {currentPage === 'terms' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <button
              onClick={() => navigateTo('home', '/')}
              className="text-xs sm:text-sm font-semibold text-[#71717A] hover:text-black dark:hover:text-white mb-6 inline-block"
            >
              ← Back to Downloader
            </button>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
              Terms of Service
            </h1>
            <div className="space-y-6 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed border-t border-[#E4E4E7] dark:border-[#27272A] pt-6">
              <section>
                <h2 className="font-bold text-[#09090B] dark:text-white mb-1.5 text-sm">1. Personal &amp; Fair Use</h2>
                <p>OmniFetch is made for personal, offline playback, research, and educational purposes. Please only download videos that you have permission to access.</p>
              </section>
              <section>
                <h2 className="font-bold text-[#09090B] dark:text-white mb-1.5 text-sm">2. Trademarks</h2>
                <p>YouTube, TikTok, Instagram, Facebook, Twitter, and Reddit are trademarks of their respective owners. OmniFetch is an independent tool and is not affiliated with any of them.</p>
              </section>
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <button
              onClick={() => navigateTo('home', '/')}
              className="text-xs sm:text-sm font-semibold text-[#71717A] hover:text-black dark:hover:text-white mb-6 inline-block"
            >
              ← Back to Downloader
            </button>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              Contact &amp; DMCA
            </h1>
            <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mb-6">
              Have a question or need to send a copyright request? Fill out the quick form below.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for contacting us. We will get back to you shortly.');
              }}
              className="space-y-4 border-t border-[#E4E4E7] dark:border-[#27272A] pt-6"
            >
              <div>
                <label className="block text-xs font-semibold text-[#52525B] dark:text-[#A1A1AA] mb-1">Your Name</label>
                <input required className="w-full bg-[#F4F4F5] dark:bg-[#121215] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#52525B] dark:text-[#A1A1AA] mb-1">Email Address</label>
                <input required type="email" className="w-full bg-[#F4F4F5] dark:bg-[#121215] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#52525B] dark:text-[#A1A1AA] mb-1">Message or Link Details</label>
                <textarea required rows={4} className="w-full bg-[#F4F4F5] dark:bg-[#121215] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none" />
              </div>
              <button type="submit" className="py-2.5 px-6 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs sm:text-sm btn-press">
                Send Message
              </button>
            </form>
          </div>
        )}

        {currentPage === 'about' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <button
              onClick={() => navigateTo('home', '/')}
              className="text-xs sm:text-sm font-semibold text-[#71717A] hover:text-black dark:hover:text-white mb-6 inline-block"
            >
              ← Back to Downloader
            </button>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
              About OmniFetch
            </h1>
            <div className="space-y-4 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed border-t border-[#E4E4E7] dark:border-[#27272A] pt-6">
              <p>
                <strong>OmniFetch</strong> was built to make downloading videos simple, fast, and clean. Most video download websites are packed with intrusive pop-up ads, fake download buttons, and long wait timers.
              </p>
              <p>
                Our goal is to give you a clean, minimal, and lightning-fast tool to save your favorite clips, reels, tutorials, and music in original quality.
              </p>
            </div>
          </div>
        )}

        {/* Main Downloader Page */}
        {['home', 'youtube', 'tiktok', 'instagram', 'facebook', 'twitter', 'reddit', 'pinterest', 'threads', 'dailymotion', 'shorts', 'mp3'].includes(currentPage) && (
          <>
            {/* Minimal Platform Selector */}
            <div className="pt-4 px-4">
              <PlatformSelector
                selectedPlatform={selectedPlatform}
                onSelectPlatform={handleSelectPlatform}
              />
            </div>

            {/* Clean Hero Input */}
            <HeroInput
              onVideoLoaded={handleVideoLoaded}
              title={currentPlatformInfo.title}
              subtitle={currentPlatformInfo.description}
              eyebrow={currentPlatformInfo.name}
              placeholder={currentPlatformInfo.placeholder}
              activePlatformId={selectedPlatform}
            />

            {/* Ad Banner Slot 1: Under Hero Input (728x90 desktop / 300x250 mobile) */}
            <AdBanner slotId="heroUnderInput" />

            {/* Video Preview & Download Options */}
            {loadedVideo && (
              <VideoPreviewCard
                video={loadedVideo}
                onReset={() => setLoadedVideo(null)}
              />
            )}

            {/* Simple Feature Highlights */}
            <FeatureSections />

            {/* Ad Banner Slot 2: Mid-Page Grid */}
            <AdBanner slotId="midPage" />

            {/* Supported Networks */}
            <SupportedPlatformsGrid onSelectPlatform={handleSelectPlatform} />

            {/* Simple 3-Step Guide & Devices */}
            <DevicesAndGuides />

            {/* Simple FAQ */}
            <FaqSection />

            {/* Ad Banner Slot 3: Above Footer */}
            <AdBanner slotId="aboveFooter" />
          </>
        )}
      </main>

      <Footer
        onSelectPlatform={handleSelectPlatform}
        onNavigate={navigateTo}
      />
    </div>
  );
}
