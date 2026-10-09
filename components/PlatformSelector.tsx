import React from 'react';
import { PLATFORMS } from '../lib/platforms';
import { Sparkles } from 'lucide-react';
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

interface PlatformSelectorProps {
  selectedPlatform: string;
  onSelectPlatform: (platformId: string) => void;
}

export default function PlatformSelector({
  selectedPlatform,
  onSelectPlatform,
}: PlatformSelectorProps) {
  const getIcon = (id: string, isSelected: boolean) => {
    const iconClass = `w-3.5 h-3.5 ${
      isSelected 
        ? 'text-white dark:text-black' 
        : 'text-[#71717A] dark:text-[#A1A1AA]'
    }`;

    switch (id) {
      case 'all': return <Sparkles className={iconClass} />;
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

  return (
    <div className="w-full max-w-6xl mx-auto mb-6 px-4">
      <div className="flex items-center justify-center flex-wrap gap-2 py-1">
        {PLATFORMS.map((platform) => {
          const isSelected = selectedPlatform === platform.id;
          return (
            <button
              key={platform.id}
              onClick={() => onSelectPlatform(platform.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 border ${
                isSelected
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-sm scale-[1.02]'
                  : 'bg-transparent hover:bg-[#F4F4F5] dark:hover:bg-[#18181B] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white border-[#E4E4E7] dark:border-[#27272A]'
              }`}
            >
              {getIcon(platform.id, isSelected)}
              <span>{platform.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
