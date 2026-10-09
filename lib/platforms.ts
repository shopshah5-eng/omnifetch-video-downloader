export interface PlatformInfo {
  id: string;
  name: string;
  slug: string;
  badge: string;
  color: string;
  gradient: string;
  icon: string;
  domainPattern: RegExp;
  placeholder: string;
  title: string;
  description: string;
  seoKeywords: string;
  supportedFormats: string[];
  features: string[];
  howToSteps: { title: string; desc: string }[];
}

export const PLATFORMS: PlatformInfo[] = [
  {
    id: 'all',
    name: 'All Sites',
    slug: '',
    badge: 'All in One',
    color: '#000000',
    gradient: 'from-neutral-900 to-black',
    icon: 'Sparkles',
    domainPattern: /.*/,
    placeholder: 'Paste any video link here (YouTube, TikTok, Instagram...)',
    title: 'Free Video Downloader — Fast, Easy & HD',
    description: 'Download videos, reels, shorts, and music from YouTube, TikTok, Instagram, and Facebook in seconds. Free, simple, and high quality.',
    seoKeywords: 'video downloader, free video download, youtube video downloader, download tiktok no watermark, instagram reels download, mp3 download',
    supportedFormats: ['1080p Full HD', '4K Ultra HD', 'MP3 Audio', '720p HD'],
    features: ['No watermark on TikTok', 'Fast downloads', 'Works on phone & PC', '100% free with no sign-up'],
    howToSteps: [
      { title: 'Copy link', desc: 'Copy the link of the video you want to save.' },
      { title: 'Paste here', desc: 'Paste the link into the box above.' },
      { title: 'Pick quality', desc: 'Choose 1080p, 4K, or MP3 audio.' },
      { title: 'Download', desc: 'Click Download and your file saves right away.' },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    slug: 'youtube-downloader',
    badge: 'Videos & Shorts',
    color: '#FF0000',
    gradient: 'from-red-600 to-rose-700',
    icon: 'Youtube',
    domainPattern: /(youtube\.com|youtu\.be|youtube-nocookie\.com)/i,
    placeholder: 'Paste YouTube video or Shorts link here...',
    title: 'YouTube Video & Shorts Downloader',
    description: 'Save YouTube videos, Shorts, and music in HD, 4K, or MP3. Fast, free, and works on any device.',
    seoKeywords: 'youtube video downloader, download youtube shorts, youtube to mp3, save youtube video, youtube 1080p download',
    supportedFormats: ['1080p Full HD', '4K Ultra HD', '720p HD', 'MP3 Music'],
    features: ['Full HD & 4K', 'Save Shorts easily', 'Convert to MP3 audio', 'No wait time'],
    howToSteps: [
      { title: 'Copy YouTube link', desc: 'Tap Share on YouTube and choose Copy Link.' },
      { title: 'Paste link', desc: 'Paste the URL into the box above.' },
      { title: 'Choose format', desc: 'Select video quality or MP3 audio.' },
      { title: 'Save', desc: 'Your video downloads directly to your device.' },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    slug: 'tiktok-downloader',
    badge: 'No Watermark',
    color: '#00F2FE',
    gradient: 'from-cyan-400 via-teal-500 to-black',
    icon: 'Music2',
    domainPattern: /(tiktok\.com|douyin\.com)/i,
    placeholder: 'Paste TikTok video link here...',
    title: 'TikTok Downloader Without Watermark',
    description: 'Download TikTok videos without the watermark in HD. You can also save just the audio as an MP3.',
    seoKeywords: 'tiktok downloader, tiktok video download without watermark, download tiktok audio, tiktok to mp3',
    supportedFormats: ['Clean HD MP4 (No Logo)', 'Original MP3 Audio', 'Fast Download'],
    features: ['No watermark logo', 'Save original sounds', 'Full HD quality', 'Instant download'],
    howToSteps: [
      { title: 'Copy link', desc: 'In TikTok, tap Share and then Copy Link.' },
      { title: 'Paste here', desc: 'Paste the link in the box above.' },
      { title: 'Pick video or audio', desc: 'Choose clean MP4 or MP3 sound.' },
      { title: 'Save', desc: 'Enjoy your clean video with no logo.' },
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    slug: 'instagram-downloader',
    badge: 'Reels & Stories',
    color: '#E1306C',
    gradient: 'from-pink-600 via-purple-600 to-amber-500',
    icon: 'Instagram',
    domainPattern: /instagram\.com/i,
    placeholder: 'Paste Instagram Reel or Post link here...',
    title: 'Instagram Reels & Video Downloader',
    description: 'Save Instagram Reels, videos, and photos in original high quality. No login required.',
    seoKeywords: 'instagram downloader, download instagram reels, save instagram video, instagram story saver',
    supportedFormats: ['1080p HD Video', 'High Quality Photos', 'Audio Only'],
    features: ['Works with Reels', 'Download photos & slides', 'No login needed', 'High quality'],
    howToSteps: [
      { title: 'Copy Instagram link', desc: 'Tap the three dots on the post and tap Copy Link.' },
      { title: 'Paste link', desc: 'Paste it into the search box.' },
      { title: 'Pick quality', desc: 'Select video or photo format.' },
      { title: 'Download', desc: 'Saves directly to your Photos or Downloads.' },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    slug: 'facebook-downloader',
    badge: 'HD Videos',
    color: '#1877F2',
    gradient: 'from-blue-700 to-indigo-800',
    icon: 'Facebook',
    domainPattern: /(facebook\.com|fb\.watch|fb\.com)/i,
    placeholder: 'Paste Facebook video or Reel link here...',
    title: 'Facebook Video Downloader',
    description: 'Download public Facebook videos and Reels in Full HD 1080p or 720p. Free and simple.',
    seoKeywords: 'facebook video downloader, download facebook reels, save fb video, fb to mp4',
    supportedFormats: ['1080p Full HD', '720p Standard', 'MP3 Audio'],
    features: ['Reels and long videos', 'Full HD quality', 'Fast & simple', 'No account needed'],
    howToSteps: [
      { title: 'Copy link', desc: 'Click Share on Facebook and choose Copy Link.' },
      { title: 'Paste here', desc: 'Paste into the download box above.' },
      { title: 'Choose HD', desc: 'Select 1080p or 720p quality.' },
      { title: 'Download', desc: 'Video saves with clear sound.' },
    ],
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    slug: 'twitter-downloader',
    badge: 'Videos & GIFs',
    color: '#1DA1F2',
    gradient: 'from-sky-500 to-slate-900',
    icon: 'Twitter',
    domainPattern: /(twitter\.com|x\.com)/i,
    placeholder: 'Paste Twitter or X tweet link here...',
    title: 'Twitter / X Video Downloader',
    description: 'Download videos and GIFs from Twitter (X) tweets in MP4. Fast, free, and crystal clear.',
    seoKeywords: 'twitter video downloader, x video downloader, save twitter video, download twitter gif',
    supportedFormats: ['1080p MP4', '720p MP4', 'Animated GIF'],
    features: ['Save tweet videos', 'Download GIFs as MP4', 'No limits', 'High speed'],
    howToSteps: [
      { title: 'Copy link', desc: 'Tap Share on the tweet and select Copy Link.' },
      { title: 'Paste link', desc: 'Paste it into the search box above.' },
      { title: 'Pick resolution', desc: 'Choose 1080p or 720p.' },
      { title: 'Save', desc: 'File downloads in seconds.' },
    ],
  },
  {
    id: 'reddit',
    name: 'Reddit',
    slug: 'reddit-downloader',
    badge: 'With Sound',
    color: '#FF4500',
    gradient: 'from-orange-600 to-amber-700',
    icon: 'Share2',
    domainPattern: /(reddit\.com|redd\.it)/i,
    placeholder: 'Paste Reddit post link here...',
    title: 'Reddit Video Downloader (With Sound)',
    description: 'Download Reddit videos with the audio included. No more muted videos.',
    seoKeywords: 'reddit video downloader, reddit video with sound, download reddit video, save reddit video',
    supportedFormats: ['1080p MP4 with sound', '720p MP4', 'Audio MP3'],
    features: ['Sound is always included', 'Full HD quality', 'Works with v.redd.it', 'Free and fast'],
    howToSteps: [
      { title: 'Copy link', desc: 'Tap Share on the Reddit post and copy the link.' },
      { title: 'Paste here', desc: 'Paste the link in the box above.' },
      { title: 'Choose quality', desc: 'Select your preferred resolution.' },
      { title: 'Download', desc: 'Get your clean video with full audio.' },
    ],
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    slug: 'pinterest-downloader',
    badge: 'Pins & GIFs',
    color: '#E60023',
    gradient: 'from-red-700 to-rose-900',
    icon: 'Pin',
    domainPattern: /(pinterest\.com|pin\.it)/i,
    placeholder: 'Paste Pinterest Pin or Video link here...',
    title: 'Pinterest Video Downloader',
    description: 'Save Pinterest videos, idea pins, and animated GIFs in original high quality.',
    seoKeywords: 'pinterest downloader, pinterest video download, save pinterest pins, pinterest gif download',
    supportedFormats: ['HD Video MP4', 'Animated GIF', 'High Quality Image'],
    features: ['Works with pin.it links', 'Save videos and GIFs', 'Original resolution', '1-click download'],
    howToSteps: [
      { title: 'Copy link', desc: 'Tap Share on the Pin and select Copy Link.' },
      { title: 'Paste here', desc: 'Paste into the search field.' },
      { title: 'Pick format', desc: 'Choose video or photo.' },
      { title: 'Save', desc: 'Saves directly to your device.' },
    ],
  },
  {
    id: 'threads',
    name: 'Threads',
    slug: 'threads-downloader',
    badge: 'Threads Video',
    color: '#000000',
    gradient: 'from-neutral-800 to-black',
    icon: 'MessageSquare',
    domainPattern: /threads\.net/i,
    placeholder: 'Paste Threads video or photo link here...',
    title: 'Threads Video Downloader',
    description: 'Download videos and photos from Threads in high quality. Simple, free, and private.',
    seoKeywords: 'threads video downloader, download threads video, save threads post',
    supportedFormats: ['1080p HD MP4', 'High Quality Photos'],
    features: ['Direct downloads', 'No account needed', 'Fast and clean', 'Unlimited'],
    howToSteps: [
      { title: 'Copy link', desc: 'Tap Share on the Threads post and copy link.' },
      { title: 'Paste here', desc: 'Paste the link in the box.' },
      { title: 'Choose quality', desc: 'Select HD video.' },
      { title: 'Download', desc: 'Saves right away.' },
    ],
  },
  {
    id: 'dailymotion',
    name: 'Dailymotion',
    slug: 'dailymotion-downloader',
    badge: '1080p HD',
    color: '#0066DC',
    gradient: 'from-blue-600 to-sky-700',
    icon: 'Tv',
    domainPattern: /(dailymotion\.com|dai\.ly)/i,
    placeholder: 'Paste Dailymotion video link here...',
    title: 'Dailymotion Video Downloader',
    description: 'Save Dailymotion videos in 1080p Full HD or MP3 audio fast and free.',
    seoKeywords: 'dailymotion downloader, download dailymotion video, dailymotion to mp4',
    supportedFormats: ['1080p Full HD', '720p HD', 'MP3 Audio'],
    features: ['Full HD support', 'dai.ly links work', 'Fast downloads', 'No limits'],
    howToSteps: [
      { title: 'Copy link', desc: 'Copy the video link from Dailymotion.' },
      { title: 'Paste here', desc: 'Paste it in the search box.' },
      { title: 'Select quality', desc: 'Choose 1080p or 720p.' },
      { title: 'Download', desc: 'Video downloads instantly.' },
    ],
  },
];

export function detectPlatform(url: string): PlatformInfo {
  if (!url) return PLATFORMS[0];
  for (const p of PLATFORMS) {
    if (p.id !== 'all' && p.domainPattern.test(url)) {
      return p;
    }
  }
  return PLATFORMS[0];
}
