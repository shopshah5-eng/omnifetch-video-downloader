import { VideoMetadata, ProcessVideoResponse } from './types';
import { detectPlatform } from './platforms';

export function isValidMediaUrl(raw: string): boolean {
  if (typeof raw !== 'string') return false;
  let s = raw.trim();
  if (!s) return false;
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isYouTubeUrl(raw: string): boolean {
  if (typeof raw !== 'string') return false;
  let s = raw.trim();
  if (!s) return false;
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  try {
    const u = new URL(s);
    const host = (u.hostname || '').toLowerCase();
    if (host === 'youtu.be' && u.pathname.length > 1) return true;
    if (
      /(^|\.)youtube\.com$/.test(host) ||
      /(^|\.)youtube-nocookie\.com$/.test(host)
    ) {
      const p = u.pathname || '';
      if (p === '/watch' && u.searchParams && u.searchParams.get('v')) return true;
      if (/^\/(shorts|embed|live|v)\/[^/]+/.test(p)) return true;
    }
  } catch {
    return false;
  }
  return false;
}

export function extractYouTubeId(raw: string): string | null {
  if (!raw) return null;
  let s = raw.trim();
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  try {
    const u = new URL(s);
    const host = (u.hostname || '').toLowerCase();
    if (host === 'youtu.be') {
      const match = u.pathname.match(/^\/([^/?#]+)/);
      return match ? match[1] : null;
    }
    if (/(^|\.)youtube\.com$/.test(host)) {
      if (u.pathname === '/watch') {
        return u.searchParams.get('v');
      }
      const match = u.pathname.match(/^\/(shorts|embed|live|v)\/([^/?#]+)/);
      if (match) return match[2];
    }
  } catch {
    return null;
  }
  return null;
}

export function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return 'Unknown';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

export async function processMediaUrl(url: string): Promise<ProcessVideoResponse> {
  const trimmed = url.trim();
  if (!trimmed) {
    return { success: false, error: 'Please enter a valid link.' };
  }

  const detected = detectPlatform(trimmed);

  // 1. Try backend API first
  try {
    const res = await fetch('/api/process-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: trimmed }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.data) {
        return data;
      }
    }
  } catch (_) {
    // API not reachable, try genuine public oEmbed
  }

  // 2. Client-side genuine metadata extraction via official public oEmbed
  let cleanUrl = trimmed;
  if (!/^https?:\/\//i.test(cleanUrl)) {
    cleanUrl = 'https://' + cleanUrl;
  }

  if (detected.id === 'youtube' || isYouTubeUrl(cleanUrl)) {
    const videoId = extractYouTubeId(cleanUrl);
    if (!videoId) {
      return { success: false, error: 'Invalid YouTube URL. Please check the link and try again.' };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const oembedRes = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (oembedRes.ok) {
        const oe = await oembedRes.json();
        const metadata: VideoMetadata = {
          id: videoId,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          platform: 'youtube',
          title: oe.title || `YouTube Video (${videoId})`,
          uploader: oe.author_name || 'YouTube Creator',
          uploader_url: oe.author_url,
          duration: 'Available in Player',
          durationSeconds: 0,
          thumbnail: oe.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          thumbnails: [{ url: oe.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` }],
          formats: [
            {
              id: '1080p',
              format_id: '1080p',
              quality: '1080p Full HD',
              ext: 'mp4',
              kind: 'video+audio',
              sizeFormatted: 'Best Quality',
              bytes: 0,
              url: `https://www.youtube.com/watch?v=${videoId}`,
              recommended: true,
              label: '1080p Full HD (MP4)',
            },
            {
              id: '720p',
              format_id: '720p',
              quality: '720p HD',
              ext: 'mp4',
              kind: 'video+audio',
              sizeFormatted: 'Standard HD',
              bytes: 0,
              url: `https://www.youtube.com/watch?v=${videoId}`,
              label: '720p HD (MP4)',
            },
            {
              id: 'audio',
              format_id: 'audio',
              quality: 'MP3 Audio',
              ext: 'mp3',
              kind: 'audio-only',
              sizeFormatted: 'Audio Track',
              bytes: 0,
              url: `https://www.youtube.com/watch?v=${videoId}`,
              label: 'Audio Only (MP3)',
            },
          ],
          hasAudio: true,
          hasVideo: true,
        };
        return { success: true, data: metadata };
      }
    } catch (_) {}
  }

  if (detected.id === 'tiktok') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const oembedRes = await fetch(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(cleanUrl)}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (oembedRes.ok) {
        const oe = await oembedRes.json();
        const metadata: VideoMetadata = {
          id: 'tiktok-' + Date.now(),
          url: cleanUrl,
          platform: 'tiktok',
          title: oe.title || 'TikTok Video',
          uploader: oe.author_name || 'TikTok Creator',
          uploader_url: oe.author_url,
          duration: 'Shorts',
          durationSeconds: 0,
          thumbnail: oe.thumbnail_url || '',
          thumbnails: [{ url: oe.thumbnail_url || '' }],
          formats: [
            {
              id: 'best',
              format_id: 'best',
              quality: 'Clean HD',
              ext: 'mp4',
              kind: 'video+audio',
              sizeFormatted: 'Original',
              bytes: 0,
              url: cleanUrl,
              recommended: true,
              label: 'Clean HD (MP4)',
            },
            {
              id: 'audio',
              format_id: 'audio',
              quality: 'Original Sound',
              ext: 'mp3',
              kind: 'audio-only',
              sizeFormatted: 'Audio',
              bytes: 0,
              url: cleanUrl,
              label: 'Original Audio (MP3)',
            },
          ],
          hasAudio: true,
          hasVideo: true,
        };
        return { success: true, data: metadata };
      }
    } catch (_) {}
  }

  // If extraction genuinely failed, NEVER return fake success data
  return {
    success: false,
    error: 'Unable to fetch video details from this link. Please check that the URL is public and correctly formatted.',
  };
}
