'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { HeroWindow } from '@/components/HeroWindow';
import { FeatureIntake } from '@/components/FeatureIntake';
import { FeatureDeploy } from '@/components/FeatureDeploy';
import { FeatureSystem } from '@/components/FeatureSystem';
import { FeatureMonitor } from '@/components/FeatureMonitor';
import ValueStatement from '@/components/ValueStatement';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LangContext';

export default function Home() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const headlines = [
    { line1: t('headline_1_1'), line2: t('headline_1_2'), line3: t('headline_1_3') },
    { line1: t('headline_2_1'), line2: t('headline_2_2'), line3: t('headline_2_3') },
    { line1: t('headline_3_1'), line2: t('headline_3_2'), line3: t('headline_3_3') },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % headlines.length);
        setAnimating(false);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const h = headlines[current];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-[#080808] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5E6AD2]/8 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 relative z-10 w-full">

          {/* Announcement bar */}
          <button onClick={() => scrollTo('system')}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#141414] border border-[#1f1f1f] rounded-full text-xs sm:text-sm text-[#7A7A7E] hover:text-[#f0f0f0] transition-colors mb-6 sm:mb-8 group cursor-pointer border-none max-w-full overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-[#5E6AD2] animate-pulse flex-shrink-0" />
            <span className="truncate">{t('announce')}</span>
            <span className="text-[#7A7A7E] group-hover:text-[#f0f0f0] transition-colors flex-shrink-0">{t('announce_cta')}</span>
          </button>

          {/* Dönen başlık — mobilde küçük */}
          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-[#f0f0f0] leading-[1.08] tracking-[-0.03em] mb-4 sm:mb-5"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(-12px)' : 'translateY(0)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <span className="block">{h.line1}</span>
            <span className="block">{h.line2}</span>
            <span className="block">{h.line3}</span>
          </h1>

          <p className="text-base sm:text-lg text-[#7A7A7E] max-w-md mb-7 sm:mb-9 leading-relaxed font-light">
            {t('hero_sub')}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10 sm:mb-16">
            <button onClick={() => scrollTo('quote')}
              className="px-5 py-2.5 text-sm font-medium text-[#0a0a0a] bg-[#f0f0f0] rounded-[6px] hover:bg-white transition-colors cursor-pointer border-none">
              {t('hero_cta_primary')}
            </button>
            <button onClick={() => scrollTo('system')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#f0f0f0] bg-[#141414] border border-[#1f1f1f] rounded-[6px] hover:bg-[#1a1a1a] transition-colors cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              {t('hero_cta_secondary')}
            </button>
          </div>

          {/* Hero Window — mobilde tam genişlik, scroll yok */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute inset-0 -top-10 bg-gradient-to-b from-[#5E6AD2]/10 via-[#5E6AD2]/5 to-transparent blur-3xl pointer-events-none" />
            <HeroWindow />
          </div>
        </div>
      </section>

      <div className="h-px bg-white/[0.06]" />
      <ValueStatement />
      <div className="h-px bg-white/[0.06]" />
      <div id="intake"><FeatureIntake /></div>
      <div className="h-px bg-white/[0.06]" />
      <FeatureDeploy />
      <div className="h-px bg-white/[0.06]" />
      <div id="system"><FeatureSystem /></div>
      <div className="h-px bg-white/[0.06]" />
      <FeatureMonitor />
      <div className="h-px bg-white/[0.06]" />
      <CTA />
      <Footer />
    </main>
  );
}
