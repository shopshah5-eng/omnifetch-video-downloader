import React from 'react';
import { PLATFORMS } from '../lib/platforms';
import { ArrowUpRight } from 'lucide-react';
import { 
  YouTubeIcon, 
  InstagramIcon, 
  TikTokIcon, 
  FacebookIcon, 
  TwitterIcon, 
  RedditIcon, 
  PinterestIcon, 
  ThreadsIcon, 
  DailymotionIcon 
} from './BrandIcons';

interface SupportedPlatformsGridProps {
  onSelectPlatform: (platformId: string) => void;
}

export default function SupportedPlatformsGrid({ onSelectPlatform }: SupportedPlatformsGridProps) {
  const getIcon = (id: string) => {
    const iconClass = 'w-5 h-5 text-[#09090B] dark:text-white';
    switch (id) {
      case 'youtube': return <YouTubeIcon className={iconClass} />;
      case 'instagram': return <InstagramIcon className={iconClass} />;
      case 'tiktok': return <TikTokIcon className={iconClass} />;
      case 'facebook': return <FacebookIcon className={iconClass} />;
      case 'twitter': return <TwitterIcon className={iconClass} />;
      case 'reddit': return <RedditIcon className={iconClass} />;
      case 'pinterest': return <PinterestIcon className={iconClass} />;
      case 'threads': return <ThreadsIcon className={iconClass} />;
      case 'dailymotion': return <DailymotionIcon className={iconClass} />;
      default: return null;
    }
  };

  const platforms = PLATFORMS.filter((p) => p.id !== 'all');

  return (
    <section className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-4xl font-black text-[#09090B] dark:text-white tracking-tight mb-3">
          Supported Sites &amp; Apps
        </h2>
        <p className="text-sm sm:text-base text-[#71717A] dark:text-[#A1A1AA]">
          Download videos, reels, and music in HD quality from any of these platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            onClick={() => {
              onSelectPlatform(platform.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group p-6 rounded-2xl bg-white dark:bg-[#0C0C0E] border border-[#E4E4E7] dark:border-[#27272A] hover:border-black dark:hover:border-white transition-all shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#F4F4F5] dark:bg-[#18181B] flex items-center justify-center">
                  {getIcon(platform.id)}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F4F4F5] dark:bg-[#18181B] text-[#52525B] dark:text-[#A1A1AA]">
                  {platform.badge}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#09090B] dark:text-white mb-1.5">
                {platform.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] line-clamp-2 leading-relaxed">
                {platform.description}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-[#E4E4E7] dark:border-[#1F1F23] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#09090B] dark:text-white">
              <span>Use {platform.name}</span>
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
