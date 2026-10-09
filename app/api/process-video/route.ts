import { NextRequest, NextResponse } from 'next/server';
import { isYouTubeUrl, getVideoInfo } from '@/lib/youtube';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const videoUrl = body.video_url || body.url;

    if (!videoUrl || typeof videoUrl !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please paste a YouTube link first.' },
        { status: 400 }
      );
    }

    if (!isYouTubeUrl(videoUrl)) {
      return NextResponse.json(
        { success: false, error: 'Please paste a valid YouTube video or Shorts link.' },
        { status: 400 }
      );
    }

    const metadata = await getVideoInfo(videoUrl);

    return NextResponse.json({
      success: true,
      data: metadata,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
