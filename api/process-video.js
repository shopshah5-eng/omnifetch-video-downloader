export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    let targetUrl = (body.url || body.video_url || '').trim();

    if (!targetUrl) {
      return res.status(400).json({ success: false, error: 'Please provide a valid video link.' });
    }

    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    // SSRF Protection: Parse URL and disallow local/private ranges
    const parsed = new URL(targetUrl);
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host.endsWith('.local') ||
      host.endsWith('.internal') ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)
    ) {
      return res.status(400).json({ success: false, error: 'Invalid URL host.' });
    }

    // 1. YouTube Extraction via Official oEmbed
    if (
      host === 'youtu.be' ||
      host.endsWith('youtube.com') ||
      host.endsWith('youtube-nocookie.com')
    ) {
      let videoId = null;
      if (host === 'youtu.be') {
        videoId = parsed.pathname.slice(1).split('/')[0].split('?')[0];
      } else if (parsed.pathname === '/watch') {
        videoId = parsed.searchParams.get('v');
      } else {
        const match = parsed.pathname.match(/^\/(shorts|embed|live|v)\/([^/?#]+)/);
        if (match) videoId = match[2];
      }

      if (!videoId) {
        return res.status(400).json({ success: false, error: 'Could not find a valid YouTube video ID.' });
      }

      const cleanYtUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const oembedRes = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(cleanYtUrl)}&format=json`
      );

      if (!oembedRes.ok) {
        return res.status(404).json({
          success: false,
          error: 'Video not found or may be private. Please check the YouTube link.',
        });
      }

      const oe = await oembedRes.json();
      return res.status(200).json({
        success: true,
        data: {
          id: videoId,
          url: cleanYtUrl,
          platform: 'youtube',
          title: oe.title || `YouTube Video (${videoId})`,
          uploader: oe.author_name || 'YouTube Creator',
          uploader_url: oe.author_url,
          duration: 'Available in Player',
          thumbnail: oe.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          thumbnails: [{ url: oe.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` }],
          formats: [
            {
              id: '1080p',
              format_id: '1080p',
              quality: '1080p Full HD',
              ext: 'mp4',
              kind: 'video+audio',
              sizeFormatted: 'High Quality',
              bytes: 0,
              url: cleanYtUrl,
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
              url: cleanYtUrl,
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
              url: cleanYtUrl,
              label: 'Audio Only (MP3)',
            },
          ],
          hasAudio: true,
          hasVideo: true,
        },
      });
    }

    // 2. TikTok Extraction via Official oEmbed
    if (host.endsWith('tiktok.com') || host.endsWith('douyin.com')) {
      const oembedRes = await fetch(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(targetUrl)}`
      );

      if (!oembedRes.ok) {
        return res.status(404).json({
          success: false,
          error: 'TikTok video not found. Please verify the URL is public.',
        });
      }

      const oe = await oembedRes.json();
      return res.status(200).json({
        success: true,
        data: {
          id: 'tiktok-' + Date.now(),
          url: targetUrl,
          platform: 'tiktok',
          title: oe.title || 'TikTok Video',
          uploader: oe.author_name || 'TikTok Creator',
          uploader_url: oe.author_url,
          duration: 'Shorts',
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
              url: targetUrl,
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
              url: targetUrl,
              label: 'Original Audio (MP3)',
            },
          ],
          hasAudio: true,
          hasVideo: true,
        },
      });
    }

    // Unsupported or unknown platform
    return res.status(400).json({
      success: false,
      error: 'Platform not supported directly via serverless parser. Please check the URL.',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'Server processing error',
    });
  }
}
