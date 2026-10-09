export interface VideoFormat {
  id: string;
  format_id: string;
  quality: string;
  ext: string;
  kind: 'video+audio' | 'video-only' | 'audio-only' | 'image';
  sizeFormatted: string;
  bytes: number;
  url: string;
  recommended?: boolean;
  label: string;
  vcodec?: string;
  acodec?: string;
  fps?: number;
  width?: number;
  height?: number;
}

export interface VideoMetadata {
  id: string;
  url: string;
  platform: string;
  title: string;
  uploader: string;
  uploader_url?: string;
  duration: string;
  durationSeconds: number;
  thumbnail: string;
  thumbnails: { url: string; width?: number; height?: number }[];
  views?: number;
  likes?: number;
  formats: VideoFormat[];
  hasAudio: boolean;
  hasVideo: boolean;
  isImage?: boolean;
  description?: string;
}

export interface ProcessVideoResponse {
  success: boolean;
  data?: VideoMetadata;
  error?: string;
}
