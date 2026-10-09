import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-8">
        <Link href="/" className="text-xs font-bold text-[#FF0033] hover:underline mb-2 inline-block">
          ← Back to SnapYT Downloader
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed bg-white dark:bg-[#14161E] border border-gray-200 dark:border-[#232737] rounded-3xl p-6 sm:p-10 shadow-sm">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Overview</h2>
          <p>
            SnapYT (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy. This Privacy Policy describes how we handle information when you visit and use our online tool located at SnapYT.app.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. No Personal Data Collection or Storage</h2>
          <p>
            SnapYT is an anonymous, browser-based tool. We do not require registration, login, email addresses, or payment details. Media files requested by users are processed transiently on demand and are never permanently stored, indexed, or archived on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Logs and Usage Data</h2>
          <p>
            Like most websites, our web servers may log standard technical parameters (such as IP addresses, browser user agent, referral URL, and timestamps) solely for DDoS mitigation, security auditing, and operational stability. These logs are automatically purged on a regular cycle.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">4. Cookies and Local Storage</h2>
          <p>
            We use local storage strictly to remember your preferences (such as your chosen dark/light color theme and selected language). We do not use persistent tracking cookies or track user behavior across third-party websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">5. Contact Information</h2>
          <p>
            If you have questions about our privacy practices, you can contact us through our dedicated{' '}
            <Link href="/contact" className="text-[#FF0033] font-bold underline">
              Contact Page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
