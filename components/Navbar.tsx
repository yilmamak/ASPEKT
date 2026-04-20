'use client';

import { useState, useEffect, useRef } from 'react';
import { useLang } from '@/lib/LangContext';

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY < 10) {
            setVisible(true);
            setScrolled(false);
          } else {
            setScrolled(true);
            if (currentY < lastScrollY.current - 5) {
              // yukarı scroll → göster
              setVisible(true);
            } else if (currentY > lastScrollY.current + 8) {
              // aşağı scroll → gizle
              setVisible(false);
            }
          }
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: t('nav_services'), action: () => scrollTo('intake') },
    { label: t('nav_sectors'),  action: () => scrollTo('intake') },
    { label: t('nav_quote'),    action: () => scrollTo('quote') },
    { label: t('nav_contact'),  action: () => scrollTo('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'glass-nav border-b border-[#1F1F1F]' : 'bg-transparent'}`}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease',
      }}
    >
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-2.5 hover-opacity">
            <img src="/favicon.svg" alt="ASPEKT" className="w-6 h-6" />
            <span className="text-[#F0F0F0] font-semibold text-lg tracking-tight">ASPEKT</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button key={link.label} onClick={link.action}
                className="px-3 py-1.5 text-sm text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors duration-150 bg-transparent border-none cursor-pointer">
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
              className="px-2.5 py-1 text-xs font-medium border border-[#1F1F1F] text-[#7A7A7E] hover:text-[#F0F0F0] hover:border-[#5E6AD2] transition-colors rounded-[4px] bg-transparent cursor-pointer">
              {lang === 'en' ? 'TR' : 'EN'}
            </button>
            <button onClick={() => scrollTo('quote')}
              className="px-4 py-2 text-sm font-medium text-[#0A0A0A] bg-[#F0F0F0] rounded-[6px] hover:bg-white transition-colors duration-150 cursor-pointer border-none">
              {t('nav_get_started')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
