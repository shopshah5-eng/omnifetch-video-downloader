// Centralized Ad & Monetization Configuration
// Easily toggle ads ON/OFF or swap network scripts across the whole website

export interface AdSlotConfig {
  enabled: boolean;
  type: 'placeholder' | 'adsterra' | 'monetag' | 'adsense' | 'custom' | 'affiliate';
  scriptUrl?: string;
  adUnitId?: string;
  customHtml?: string;
  affiliateTitle?: string;
  affiliateDesc?: string;
  affiliateLink?: string;
  affiliateCta?: string;
}

export const GLOBAL_AD_SETTINGS = {
  // Master switch: Set to true to show ads/placeholders, false to hide all ad slots completely
  showAds: true,
  // Show clean placeholder badges when no real ad script is supplied
  showPlaceholdersWhenEmpty: true,
};

export const AD_SLOTS: Record<string, AdSlotConfig> = {
  // 1. Primary Under-Input Slot (728x90 desktop / 300x250 mobile) - Highest Impressions
  heroUnderInput: {
    enabled: true,
    type: 'placeholder',
    affiliateTitle: 'Protect Your Online Privacy While Downloading',
    affiliateDesc: 'Browse anonymously and avoid ISP throttling with NordVPN (Special 74% Off + 3 Months Free).',
    affiliateLink: 'https://nordvpn.com/',
    affiliateCta: 'Get 74% Off VPN',
  },

  // 2. Video Preview Card Slot (300x250 or 728x90) - Highest Click-Through Rate (CTR)
  videoPreview: {
    enabled: true,
    type: 'placeholder',
    affiliateTitle: 'Need to Edit or Trim This Video?',
    affiliateDesc: 'Cut, add subtitles, or extract clips for YouTube Shorts & TikTok in 1 click.',
    affiliateLink: 'https://www.capcut.com/',
    affiliateCta: 'Try Free Editor',
  },

  // 3. Mid-Page Grid Slot (728x90 desktop / 300x250 mobile)
  midPage: {
    enabled: true,
    type: 'placeholder',
    affiliateTitle: 'Cloud Backup & Video Storage',
    affiliateDesc: 'Back up your downloaded videos safely in the cloud with 1024 GB free storage.',
    affiliateLink: 'https://www.terabox.com/',
    affiliateCta: 'Claim Free 1TB',
  },

  // 4. Above Footer Slot (728x90 desktop / 300x250 mobile)
  aboveFooter: {
    enabled: true,
    type: 'placeholder',
    affiliateTitle: 'Fast & Clean Video Downloads',
    affiliateDesc: 'Thank you for using OmniFetch. Bookmark this page (Ctrl + D) for fast media access anytime.',
    affiliateLink: '#',
    affiliateCta: 'Bookmark Page',
  },
};
