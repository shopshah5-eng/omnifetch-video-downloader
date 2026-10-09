import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const CANONICAL_BASE = 'https://omnifetch-video-downloader.vercel.app';

const ROUTES = [
  {
    path: 'youtube-downloader',
    title: 'YouTube Video & Shorts Downloader (HD & MP3) | OmniFetch',
    description: 'Download YouTube videos, Shorts, and music in HD, 1080p, or MP3 audio. Free, fast, and easy to use.',
    canonical: `${CANONICAL_BASE}/youtube-downloader`,
  },
  {
    path: 'tiktok-downloader',
    title: 'TikTok Downloader Without Watermark (HD & MP3) | OmniFetch',
    description: 'Download TikTok videos without any watermark in HD. Save original TikTok sound and music as MP3 for free.',
    canonical: `${CANONICAL_BASE}/tiktok-downloader`,
  },
  {
    path: 'instagram-downloader',
    title: 'Instagram Reels & Video Downloader | OmniFetch',
    description: 'Save Instagram Reels, videos, and photos in original high quality. Free, fast, and no login required.',
    canonical: `${CANONICAL_BASE}/instagram-downloader`,
  },
  {
    path: 'facebook-downloader',
    title: 'Facebook Video & Reels Downloader | OmniFetch',
    description: 'Download public Facebook videos and Reels in Full HD 1080p or 720p. Free and simple.',
    canonical: `${CANONICAL_BASE}/facebook-downloader`,
  },
  {
    path: 'twitter-downloader',
    title: 'Twitter / X Video & GIF Downloader | OmniFetch',
    description: 'Download videos and GIFs from Twitter (X) tweets in MP4 format. Free, fast, and crystal clear.',
    canonical: `${CANONICAL_BASE}/twitter-downloader`,
  },
  {
    path: 'reddit-downloader',
    title: 'Reddit Video Downloader with Sound | OmniFetch',
    description: 'Download Reddit videos with clear audio included. No more muted videos.',
    canonical: `${CANONICAL_BASE}/reddit-downloader`,
  },
  {
    path: 'pinterest-downloader',
    title: 'Pinterest Video & GIF Downloader | OmniFetch',
    description: 'Download Pinterest videos, idea pins, and animated GIFs in original high quality.',
    canonical: `${CANONICAL_BASE}/pinterest-downloader`,
  },
  {
    path: 'threads-downloader',
    title: 'Threads Video & Photo Downloader | OmniFetch',
    description: 'Download videos and photos from Threads in high quality. Simple, free, and private.',
    canonical: `${CANONICAL_BASE}/threads-downloader`,
  },
  {
    path: 'dailymotion-downloader',
    title: 'Dailymotion Video Downloader (1080p HD) | OmniFetch',
    description: 'Save Dailymotion videos in 1080p Full HD or MP3 audio fast and free.',
    canonical: `${CANONICAL_BASE}/dailymotion-downloader`,
  },
  {
    path: 'youtube-shorts-downloader',
    title: 'YouTube Shorts Downloader | OmniFetch',
    description: 'Save vertical YouTube Shorts in high quality MP4 video and MP3 audio for free.',
    canonical: `${CANONICAL_BASE}/youtube-shorts-downloader`,
  },
  {
    path: 'youtube-to-mp3',
    title: 'YouTube to MP3 Audio Converter & Music Downloader | OmniFetch',
    description: 'Convert and download clear MP3 audio from any YouTube video in seconds. Free and simple.',
    canonical: `${CANONICAL_BASE}/youtube-to-mp3`,
  },
  {
    path: 'privacy',
    title: 'Privacy Policy | OmniFetch',
    description: 'OmniFetch does not store your downloads, search history, or personal information.',
    canonical: `${CANONICAL_BASE}/privacy`,
  },
  {
    path: 'terms',
    title: 'Terms of Service | OmniFetch',
    description: 'Terms of use and guidelines for downloading public videos with OmniFetch.',
    canonical: `${CANONICAL_BASE}/terms`,
  },
  {
    path: 'contact',
    title: 'Contact Us & DMCA Notice | OmniFetch',
    description: 'Get in touch with the OmniFetch team or submit a DMCA copyright inquiry.',
    canonical: `${CANONICAL_BASE}/contact`,
  },
  {
    path: 'about',
    title: 'About OmniFetch — Fast Video Downloader',
    description: 'OmniFetch is a free web tool created to help people save videos quickly and easily without annoying pop-ups or wait times.',
    canonical: `${CANONICAL_BASE}/about`,
  },
];

async function prerender() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf8');

  for (const route of ROUTES) {
    const routeDir = path.join(distDir, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    let pageHtml = template;
    // Replace Title
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
    // Replace Meta Description
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );
    // Replace Canonical
    pageHtml = pageHtml.replace(
      /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i,
      `<link rel="canonical" href="${route.canonical}" />`
    );
    // Replace OG Title & Description
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:url" content="${route.canonical}" />`
    );

    const outPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(outPath, pageHtml, 'utf8');
    console.log(`Prerendered: /${route.path} -> ${outPath}`);
  }

  console.log(`Successfully prerendered ${ROUTES.length} static routes.`);
}

prerender();
