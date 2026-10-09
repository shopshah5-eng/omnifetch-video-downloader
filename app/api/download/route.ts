import { NextRequest } from 'next/server';
import { spawn } from 'child_process';
import { extractYouTubeId } from '@/lib/youtube';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get('url');
  const formatId = searchParams.get('fmt') || 'best';
  const customTitle = searchParams.get('title') || 'video';
  const ext = searchParams.get('ext') || 'mp4';

  if (!videoUrl) {
    return new Response('Missing video URL', { status: 400 });
  }

  const id = extractYouTubeId(videoUrl);
  if (!id) {
    return new Response('Invalid YouTube URL', { status: 400 });
  }

  const cleanUrl = `https://www.youtube.com/watch?v=${id}`;
  const safeFilename = `${customTitle.replace(/[/\\?%*:|"<>]/g, '_')}.${ext}`;

  const isAudioOnly = ext === 'mp3' || formatId === 'audio' || formatId === '140';
  const formatSpec = isAudioOnly
    ? 'bestaudio/best'
    : (formatId && formatId !== 'best' ? `${formatId}+bestaudio/best` : 'bv*+ba/b');

  // Spawn yt-dlp to stream output directly to response stream
  const args = [
    cleanUrl,
    '-f',
    formatSpec,
    '-o',
    '-',
  ];

  if (isAudioOnly && ext === 'mp3') {
    args.push('-x', '--audio-format', 'mp3');
  }

  const ytProcess = spawn('yt-dlp', args);

  const stream = new ReadableStream({
    start(controller) {
      ytProcess.stdout.on('data', (chunk) => {
        controller.enqueue(chunk);
      });
      ytProcess.stdout.on('end', () => {
        controller.close();
      });
      ytProcess.stderr.on('data', (err) => {
        console.error('yt-dlp stderr:', err.toString());
      });
      ytProcess.on('error', (err) => {
        controller.error(err);
      });
    },
    cancel() {
      ytProcess.kill();
    },
  });

  const contentType = ext === 'mp3' ? 'audio/mpeg' : ext === 'webm' ? 'video/webm' : 'video/mp4';

  return new Response(stream, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(safeFilename)}"`,
      'Cache-Control': 'no-cache',
    },
  });
}
