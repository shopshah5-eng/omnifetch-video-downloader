export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { url, title = 'download', ext = 'mp4' } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing video URL parameter' });
  }

  // If a dedicated worker service URL is configured via environment variable
  const workerBaseUrl = process.env.DOWNLOAD_WORKER_URL || process.env.API_URL;

  if (workerBaseUrl) {
    try {
      const workerUrl = `${workerBaseUrl.replace(/\/$/, '')}/api/download?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&ext=${encodeURIComponent(ext)}`;
      return res.redirect(307, workerUrl);
    } catch (_) {
      return res.status(502).json({ error: 'Failed redirecting to download worker' });
    }
  }

  // Serverless functions on Vercel do not have bundled yt-dlp/ffmpeg binaries.
  // Return HTTP 503 so the frontend accurately reports the backend status instead of faking.
  return res.status(503).json({
    error: 'Direct media stream conversion requires an external download worker (DOWNLOAD_WORKER_URL). Please run the backend container or worker server.',
    service: 'OmniFetch Downloader Gateway',
    status: 'worker_unconfigured'
  });
}
