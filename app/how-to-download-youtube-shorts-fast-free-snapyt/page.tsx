import React from 'react';
import Link from 'next/link';

export default function HowToDownloadShortsPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-8">
        <Link href="/" className="text-xs font-bold text-[#FF0033] hover:underline mb-2 inline-block">
          ← Back to SnapYT Downloader
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          How to Download YouTube Shorts Fast &amp; Free
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Save vertical short-form videos with original audio in highest quality.
        </p>
      </div>

      <div className="bg-white dark:bg-[#14161E] border border-gray-200 dark:border-[#232737] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            1. Copy the YouTube Shorts Link
          </h2>
          <p>
            When viewing a Short in the YouTube app or on the website, tap the <strong>Share</strong> icon and select <strong>Copy link</strong>. The URL format will look like <code>https://youtube.com/shorts/...</code>.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            2. Paste on SnapYT Shorts Downloader
          </h2>
          <p>
            Navigate to our <Link href="/youtube-shorts-downloader" className="text-[#FF0033] font-bold underline">YouTube Shorts Downloader</Link> and paste your copied URL into the search box.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            3. Save as High Definition MP4
          </h2>
          <p>
            Click Download, select the highest available quality, and save the Short without watermarks to your gallery or downloads folder.
          </p>
        </section>
      </div>
    </div>
  );
}
