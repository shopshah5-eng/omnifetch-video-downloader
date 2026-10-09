import React from 'react';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-8">
        <Link href="/" className="text-xs font-bold text-[#FF0033] hover:underline mb-2 inline-block">
          ← Back to SnapYT Downloader
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed bg-white dark:bg-[#14161E] border border-gray-200 dark:border-[#232737] rounded-3xl p-6 sm:p-10 shadow-sm">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using SnapYT (SnapYT.app), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Personal and Non-Commercial Use Only</h2>
          <p>
            SnapYT is intended solely for personal, non-commercial purposes. You may only download audio or video material that you own, have explicit permission from the rights holder to download, or where YouTube provides an authorized download button. You agree not to distribute, resell, commercially exploit, broadcast, or publicly perform any downloaded material without proper licensing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Prohibited Conduct</h2>
          <ul className="list-disc list-outside pl-4 space-y-2">
            <li>Attempting to bypass DRM, encryption, or technical copyright protection measures.</li>
            <li>Downloading private, members-only, rental, or paywalled media.</li>
            <li>Automated bulk downloading, crawling, scraping, or load testing of our services.</li>
            <li>Using the service in violation of YouTube’s Terms of Service or local intellectual property laws.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">4. Trademark and Disclaimer</h2>
          <p>
            SnapYT is an independent web tool and is not endorsed by, sponsored by, or affiliated with YouTube, LLC or Google LLC. YouTube™ and Google™ are registered trademarks of their respective owners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">5. Disclaimer of Warranties and Limitation of Liability</h2>
          <p>
            SnapYT is provided &quot;as is&quot; without any warranty of any kind. In no event shall SnapYT or its operators be liable for any damages arising out of the use or inability to use the service.
          </p>
        </section>
      </div>
    </div>
  );
}
