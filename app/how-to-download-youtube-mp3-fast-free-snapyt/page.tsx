import React from 'react';
import Link from 'next/link';

export default function HowToDownloadMp3Page() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-8">
        <Link href="/" className="text-xs font-bold text-[#FF0033] hover:underline mb-2 inline-block">
          ← Back to SnapYT Downloader
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          How to Download YouTube MP3 Audio Fast &amp; Free
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Extract crystal clear 320kbps and 128kbps audio files in seconds.
        </p>
      </div>

      <div className="bg-white dark:bg-[#14161E] border border-gray-200 dark:border-[#232737] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            1. Copy the Video Link
          </h2>
          <p>
            Find any YouTube music video, speech, podcast, or tutorial you have permission to download. Copy its full web link or share URL.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            2. Paste on SnapYT MP3 Downloader
          </h2>
          <p>
            Open our <Link href="/youtube-mp3-downloader" className="text-[#FF0033] font-bold underline">YouTube MP3 Downloader</Link>, paste the link into the box, and click Download.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            3. Choose Audio Bitrate &amp; Save
          </h2>
          <p>
            Select the <strong>Audio-only</strong> option (MP3 or M4A) and click Download to save the audio file to your music library.
          </p>
        </section>
      </div>
    </div>
  );
}
