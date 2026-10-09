import React from 'react';

interface FooterProps {
  onSelectPlatform?: (platformId: string) => void;
  onNavigate?: (page: string) => void;
}

export default function Footer({ onSelectPlatform, onNavigate }: FooterProps) {
  const handleNav = (page: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlatformClick = (platformId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelectPlatform) onSelectPlatform(platformId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E4E4E7] dark:border-[#1F1F23] bg-white dark:bg-[#070709] text-[#71717A] dark:text-[#A1A1AA] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        
        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-12 border-b border-[#E4E4E7] dark:border-[#1F1F23] text-xs sm:text-sm">
          
          {/* Col 1 */}
          <div>
            <div className="font-bold text-[#09090B] dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Popular Sites
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="/youtube-downloader" onClick={(e) => handlePlatformClick('youtube', e)} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  YouTube Downloader
                </a>
              </li>
              <li>
                <a href="/tiktok-downloader" onClick={(e) => handlePlatformClick('tiktok', e)} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  TikTok (No Watermark)
                </a>
              </li>
              <li>
                <a href="/instagram-downloader" onClick={(e) => handlePlatformClick('instagram', e)} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  Instagram Reels
                </a>
              </li>
              <li>
                <a href="/facebook-downloader" onClick={(e) => handlePlatformClick('facebook', e)} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  Facebook Video
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <div className="font-bold text-[#09090B] dark:text-white uppercase tracking-wider text-[11px] mb-3">
              More Tools
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="/youtube-to-mp3" onClick={(e) => handleNav('mp3', e)} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  YouTube to MP3
                </a>
              </li>
              <li>
                <a href="/youtube-shorts-downloader" onClick={(e) => handleNav('shorts', e)} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  YouTube Shorts
                </a>
              </li>
              <li>
                <a href="/twitter-downloader" onClick={(e) => handlePlatformClick('twitter', e)} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  Twitter / X Video
                </a>
              </li>
              <li>
                <a href="/reddit-downloader" onClick={(e) => handlePlatformClick('reddit', e)} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  Reddit Video with Sound
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <div className="font-bold text-[#09090B] dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Help &amp; Guide
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="#main-content" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  How to Download
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => { e.preventDefault(); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleNav('about', e)} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <div className="font-bold text-[#09090B] dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Legal
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="/privacy" onClick={(e) => handleNav('privacy', e)} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" onClick={(e) => handleNav('terms', e)} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleNav('contact', e)} className="hover:text-[#09090B] dark:hover:text-white transition-colors">
                  Contact &amp; DMCA
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#71717A]">
          <div>
            © {new Date().getFullYear()} OmniFetch. Free video downloader tool.
          </div>
          <div>
            Not affiliated with YouTube, TikTok, Instagram, Meta, or Reddit.
          </div>
        </div>

      </div>
    </footer>
  );
}
