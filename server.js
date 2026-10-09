import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execFileAsync = promisify(execFile);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');
const DOWNLOAD_DIR = path.join(os.tmpdir(), 'omnifetch_downloads');

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
};

function detectPlatformFromUrl(raw) {
  const s = (raw || '').toLowerCase();
  if (s.includes('youtu.be') || s.includes('youtube.com')) return 'youtube';
  if (s.includes('instagram.com')) return 'instagram';
  if (s.includes('tiktok.com') || s.includes('douyin.com')) return 'tiktok';
  if (s.includes('facebook.com') || s.includes('fb.watch') || s.includes('fb.com')) return 'facebook';
  if (s.includes('twitter.com') || s.includes('x.com')) return 'twitter';
  if (s.includes('pinterest.com') || s.includes('pin.it')) return 'pinterest';
  if (s.includes('reddit.com') || s.includes('redd.it')) return 'reddit';
  if (s.includes('threads.net')) return 'threads';
  if (s.includes('dailymotion.com') || s.includes('dai.ly')) return 'dailymotion';
  return 'general';
}

async function getVideoInfo(rawUrl) {
  let cleanUrl = rawUrl.trim();
  if (!/^https?:\/\//i.test(cleanUrl)) cleanUrl = 'https://' + cleanUrl;
  const platform = detectPlatformFromUrl(cleanUrl);

  if (platform === 'youtube') {
    const ytMatch = cleanUrl.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|live\/)([^#&?]+)/i);
    const videoId = ytMatch ? ytMatch[1] : null;
    let title = 'YouTube Video';
    let uploader = 'YouTube Creator';
    let thumbnail = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(cleanUrl)}&format=json`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const oe = await res.json();
        title = oe.title || title;
        uploader = oe.author_name || uploader;
        if (oe.thumbnail_url) thumbnail = oe.thumbnail_url;
      }
    } catch (_) {}

    return {
      id: videoId || 'yt-' + Date.now(),
      url: cleanUrl,
      platform: 'youtube',
      title,
      uploader,
      duration: 'HD Video',
      thumbnail,
      thumbnails: [{ url: thumbnail }],
      formats: [
        { id: '1080p', format_id: '1080p', quality: '1080p Full HD', ext: 'mp4', kind: 'video+audio', sizeFormatted: 'Fast HD' },
        { id: '720p', format_id: '720p', quality: '720p HD', ext: 'mp4', kind: 'video+audio', sizeFormatted: 'Balanced' },
        { id: '360p', format_id: '360p', quality: '360p Fast', ext: 'mp4', kind: 'video+audio', sizeFormatted: 'Fast' },
        { id: 'mp3', format_id: 'mp3', quality: 'MP3 High Quality', ext: 'mp3', kind: 'audio-only', sizeFormatted: 'Audio 320k' },
      ],
    };
  }

  // General fallback using yt-dlp
  const { stdout } = await execFileAsync('yt-dlp', ['--dump-single-json', '--no-warnings', '--no-check-certificates', cleanUrl], { timeout: 15000 });
  const raw = JSON.parse(stdout);
  return {
    id: raw.id || 'video-' + Date.now(),
    url: cleanUrl,
    platform,
    title: raw.title || 'Downloaded Video',
    uploader: raw.uploader || 'Creator',
    duration: raw.duration_string || 'HD',
    thumbnail: raw.thumbnail || '',
    thumbnails: [{ url: raw.thumbnail || '' }],
    formats: [
      { id: 'best', format_id: 'best', quality: 'Original High Quality', ext: 'mp4', kind: 'video+audio', sizeFormatted: 'HD' },
      { id: 'mp3', format_id: 'mp3', quality: 'MP3 Audio', ext: 'mp3', kind: 'audio-only', sizeFormatted: 'Audio' },
    ],
  };
}

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = reqUrl.pathname;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // 1. API: Extract Video Metadata
  if (pathname === '/api/extract') {
    let targetUrl = reqUrl.searchParams.get('url');
    if (!targetUrl && req.method === 'POST') {
      try {
        const body = await new Promise((resolve) => {
          let b = '';
          req.on('data', (c) => (b += c));
          req.on('end', () => resolve(b));
        });
        const parsed = JSON.parse(body || '{}');
        targetUrl = parsed.url;
      } catch (_) {}
    }

    if (!targetUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: 'URL is required' }));
    }

    try {
      const data = await getVideoInfo(targetUrl);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, data }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message || 'Extraction failed' }));
    }
  }

  // 2. API: Download Video / Audio
  if (pathname === '/api/download') {
    const videoUrl = reqUrl.searchParams.get('url');
    const fmt = reqUrl.searchParams.get('fmt') || 'best';
    const isAudio = fmt === 'mp3' || reqUrl.searchParams.get('ext') === 'mp3';
    const ext = isAudio ? 'mp3' : 'mp4';
    const filenameParam = reqUrl.searchParams.get('title') || 'video';
    const cleanFilename = filenameParam.replace(/[/\\?%*:|"<>]/g, '_').trim() || 'download';

    if (!videoUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'URL parameter is required' }));
    }

    const uniqueId = Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const outputPath = path.join(DOWNLOAD_DIR, `${uniqueId}.${ext}`);

    const args = ['--no-warnings', '--no-check-certificates', '--no-part', '--windows-filenames'];
    if (isAudio) {
      args.push('-x', '--audio-format', 'mp3', '--audio-quality', '0');
    } else if (fmt === '1080p') {
      args.push('-f', 'bestvideo[height<=1080]+bestaudio/best[height<=1080]/best', '--merge-output-format', 'mp4');
    } else if (fmt === '720p') {
      args.push('-f', 'bestvideo[height<=720]+bestaudio/best[height<=720]/best', '--merge-output-format', 'mp4');
    } else {
      args.push('-f', 'bestvideo+bestaudio/best', '--merge-output-format', 'mp4');
    }
    args.push('-o', outputPath, videoUrl);

    try {
      await execFileAsync('yt-dlp', args, { timeout: 120000 });
      let finalPath = outputPath;
      if (!fs.existsSync(finalPath)) {
        const found = fs.readdirSync(DOWNLOAD_DIR).find((f) => f.startsWith(uniqueId));
        if (found) finalPath = path.join(DOWNLOAD_DIR, found);
      }

      if (!fs.existsSync(finalPath)) throw new Error('Download processing error');

      const stat = fs.statSync(finalPath);
      res.writeHead(200, {
        'Content-Type': isAudio ? 'audio/mpeg' : 'video/mp4',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(cleanFilename)}.${ext}"`,
        'Content-Length': stat.size,
      });

      const readStream = fs.createReadStream(finalPath);
      readStream.pipe(res);
      readStream.on('close', () => {
        try { fs.unlinkSync(finalPath); } catch (_) {}
      });
      return;
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: err.message || 'Download failed' }));
    }
  }

  // 3. Static Files & SPA Routing
  let filePath = path.join(DIST_DIR, pathname === '/' ? 'index.html' : pathname);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Please run "npm run build" first to generate the production bundle.');
  }
});

server.listen(PORT, () => {
  console.log(`[OmniFetch] Production Server running on port ${PORT}`);
});
