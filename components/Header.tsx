'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, ChevronDown, Globe, ArrowUpRight } from 'lucide-react';
import { YouTubeIcon, InstagramIcon, TikTokIcon } from './BrandIcons';
import { LANGUAGES } from '@/lib/i18n';

interface HeaderProps {
  onSelectPlatform?: (platformId: string) => void;
  onNavigate?: (page: string) => void;
  currentPlatform?: string;
}

export default function Header({
  onSelectPlatform,
  onNavigate,
  currentPlatform = 'all',
}: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem('omnifetch_theme') as 'light' | 'dark') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('omnifetch_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNavClick = (platformId: string, page = 'home') => {
    if (onSelectPlatform) onSelectPlatform(platformId);
    if (onNavigate) onNavigate(page);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#070709]/95 backdrop-blur-md border-b border-[#E4E4E7] dark:border-[#1F1F23] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Brand Logo - Minimal & Modern */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('all', 'home');
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm tracking-tight shadow-sm transition-transform group-hover:scale-105">
            OF
          </div>
          <span className="text-lg sm:text-xl font-black tracking-tight text-[#09090B] dark:text-white">
            OmniFetch
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleNavClick('all', 'home')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentPlatform === 'all'
                ? 'bg-[#F4F4F5] dark:bg-[#18181B] text-[#09090B] dark:text-white'
                : 'text-[#71717A] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]'
            }`}
          >
            All Sites
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('youtube', 'home')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentPlatform === 'youtube'
                ? 'bg-[#F4F4F5] dark:bg-[#18181B] text-[#09090B] dark:text-white'
                : 'text-[#71717A] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]'
            }`}
          >
            <YouTubeIcon className="w-3.5 h-3.5" />
            <span>YouTube</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('tiktok', 'home')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentPlatform === 'tiktok'
                ? 'bg-[#F4F4F5] dark:bg-[#18181B] text-[#09090B] dark:text-white'
                : 'text-[#71717A] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]'
            }`}
          >
            <TikTokIcon className="w-3.5 h-3.5" />
            <span>TikTok</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('instagram', 'home')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentPlatform === 'instagram'
                ? 'bg-[#F4F4F5] dark:bg-[#18181B] text-[#09090B] dark:text-white'
                : 'text-[#71717A] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]'
            }`}
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </button>

          {/* More Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#71717A] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181B] transition-colors"
            >
              <span>More</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {toolsDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setToolsDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 p-1.5 rounded-xl bg-white dark:bg-[#0A0A0A] border border-[#E4E4E7] dark:border-[#27272A] shadow-xl z-50 space-y-0.5">
                  <button
                    onClick={() => handleNavClick('facebook')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]"
                  >
                    <span>Facebook</span>
                    <ArrowUpRight className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onClick={() => handleNavClick('twitter')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]"
                  >
                    <span>Twitter (X)</span>
                    <ArrowUpRight className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onClick={() => handleNavClick('reddit')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]"
                  >
                    <span>Reddit</span>
                    <ArrowUpRight className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onClick={() => handleNavClick('pinterest')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]"
                  >
                    <span>Pinterest</span>
                    <ArrowUpRight className="w-3 h-3 opacity-40" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative ml-1">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] transition-all"
            >
              <Globe className="w-3 h-3 opacity-70" />
              <span>{currentLang.name}</span>
            </button>

            {langMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 max-h-72 overflow-y-auto z-50 bg-white dark:bg-[#0A0A0A] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl shadow-2xl p-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-left transition-colors ${
                        currentLang.code === lang.code
                          ? 'bg-[#F4F4F5] dark:bg-[#18181B] font-bold text-[#09090B] dark:text-white'
                          : 'text-[#71717A] hover:text-[#09090B] dark:hover:text-white hover:bg-[#FAFAFA] dark:hover:bg-[#141417]'
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[10px] text-[#A1A1AA]">{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="ml-1 w-8 h-8 rounded-lg flex items-center justify-center border border-[#E4E4E7] dark:border-[#27272A] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181B] transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[#09090B]" />
            )}
          </button>
        </nav>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#E4E4E7] dark:border-[#27272A] text-[#52525B] dark:text-[#A1A1AA]"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-[#09090B]" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-[#52525B] dark:text-[#A1A1AA]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-black px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
            <button
              onClick={() => handleNavClick('all')}
              className="py-2.5 px-3 rounded-xl bg-[#F4F4F5] dark:bg-[#18181B] text-xs font-semibold text-left"
            >
              All Sites
            </button>
            <button
              onClick={() => handleNavClick('youtube')}
              className="py-2.5 px-3 rounded-xl bg-[#F4F4F5] dark:bg-[#18181B] text-xs font-semibold text-left flex items-center gap-1.5"
            >
              <YouTubeIcon className="w-3.5 h-3.5" />
              <span>YouTube</span>
            </button>
            <button
              onClick={() => handleNavClick('tiktok')}
              className="py-2.5 px-3 rounded-xl bg-[#F4F4F5] dark:bg-[#18181B] text-xs font-semibold text-left flex items-center gap-1.5"
            >
              <TikTokIcon className="w-3.5 h-3.5" />
              <span>TikTok</span>
            </button>
            <button
              onClick={() => handleNavClick('instagram')}
              className="py-2.5 px-3 rounded-xl bg-[#F4F4F5] dark:bg-[#18181B] text-xs font-semibold text-left flex items-center gap-1.5"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
