import React from 'react';
import Link from 'next/link';

export default function HowToDownloadVideosPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-8">
        <Link href="/" className="text-xs font-bold text-[#FF0033] hover:underline mb-2 inline-block">
          ← Back to SnapYT Downloader
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          How to Download YouTube Videos Fast &amp; Free with SnapYT
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Step-by-step guide for Windows, Mac, iPhone, and Android.
        </p>
      </div>

      <div className="bg-white dark:bg-[#14161E] border border-gray-200 dark:border-[#232737] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            Step 1: Copy the YouTube Video URL
          </h2>
          <p>
            Go to YouTube on your desktop browser or mobile app. Locate the video you wish to save, click or tap the <strong>Share</strong> button, and choose <strong>Copy link</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            Step 2: Paste the URL into SnapYT
          </h2>
          <p>
            Visit <Link href="/" className="text-[#FF0033] font-bold underline">SnapYT.app</Link>. Click the <strong>Paste</strong> button to automatically paste the link into the search box, or press Ctrl+V (Command+V on Mac).
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            Step 3: Choose Format &amp; Download
          </h2>
          <p>
            Click <strong>Download</strong>. Once the video formats are loaded, select your desired video resolution (1080p Full HD, 720p HD, 4K, or 360p) and tap Download to save the file directly to your device.
          </p>
        </section>

        <div className="pt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF0033] to-[#D90028] text-white font-extrabold shadow-md hover:shadow-lg transition-all"
          >
            Start Downloading Now
          </Link>
        </div>
      </div>
    </div>
  );
}
