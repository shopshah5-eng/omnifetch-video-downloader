import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'YouTube Video Downloader — SnapYT',
  description:
    'Save YouTube videos fast with SnapYT: paste a link to get MP4 or audio. HD/4K when available. Private, no login; works on mobile & desktop.',
  keywords: [
    'YouTube video downloader',
    'download youtube video',
    'youtube shorts downloader',
    'youtube mp3 downloader',
    'snapyt',
    'youtube 4k downloader',
    'youtube to mp4',
    'save youtube video',
  ],
  authors: [{ name: 'SnapYT' }],
  openGraph: {
    title: 'YouTube Video Downloader — SnapYT',
    description:
      'Save YouTube videos fast with SnapYT: paste a link to get MP4 or audio. HD/4K when available. Private, no login; works on mobile & desktop.',
    url: 'https://www.snapyt.app/',
    siteName: 'SnapYT.App',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Video Downloader — SnapYT',
    description:
      'Save YouTube videos fast with SnapYT: paste a link to get MP4 or audio. HD/4K when available. Private, no login; works on mobile & desktop.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('ytx_theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'dark') document.documentElement.classList.add('dark');
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F7F7FA] dark:bg-[#0B0C12] text-[#1A1A1F] dark:text-[#ECEDF2] antialiased">
        <Header />
        <main className="flex-1" id="video-input">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
