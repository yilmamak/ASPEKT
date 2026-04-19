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

const headlines = [
  { line1: 'The operations system', line2: 'for businesses',    line3: 'running without you.' },
  { line1: 'The automation layer',  line2: 'your business',     line3: 'has been missing.'    },
  { line1: 'Your processes.',       line2: 'Running.',          line3: 'Without you.'         },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

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
    <main className="bg-[#080808] min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5E6AD2]/8 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 relative z-10">

          {/* Announcement bar — tıklayınca system (3.0) a git */}
          <button
            onClick={() => scrollTo('system')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#1f1f1f] rounded-full text-sm text-[#7A7A7E] hover:text-[#f0f0f0] transition-colors mb-8 group cursor-pointer border-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#5E6AD2] animate-pulse" />
            Built for the future. Deployed today.
            <span className="text-[#7A7A7E] group-hover:text-[#f0f0f0] transition-colors">See how it works →</span>
          </button>

          {/* Dönen başlık */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#f0f0f0] leading-[1.08] tracking-[-0.03em] mb-5"
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

          <p className="text-lg text-[#7A7A7E] max-w-md mb-9 leading-relaxed font-light">
            Built for businesses that are done managing what should manage itself.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-16">
            <button
              onClick={() => scrollTo('quote')}
              className="px-6 py-2.5 text-sm font-medium text-[#0a0a0a] bg-[#f0f0f0] rounded-[6px] hover:bg-white transition-colors cursor-pointer border-none"
            >
              Get started
            </button>
            {/* See how it works — 3.0 system'e scroll */}
            <button
              onClick={() => scrollTo('system')}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-[#f0f0f0] bg-[#141414] border border-[#1f1f1f] rounded-[6px] hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              See how it works
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -top-10 bg-gradient-to-b from-[#5E6AD2]/10 via-[#5E6AD2]/5 to-transparent blur-3xl pointer-events-none" />
            <HeroWindow />
          </div>
        </div>
      </section>

      <div className="h-px bg-white/[0.06]" />
      <ValueStatement />
      <div className="h-px bg-white/[0.06]" />
      {/* id="intake" — Services ve Sectors navda buraya scroll eder */}
      <div id="intake">
        <FeatureIntake />
      </div>
      <div className="h-px bg-white/[0.06]" />
      <FeatureDeploy />
      <div className="h-px bg-white/[0.06]" />
      {/* id="system" — See how it works buraya scroll eder */}
      <div id="system">
        <FeatureSystem />
      </div>
      <div className="h-px bg-white/[0.06]" />
      <FeatureMonitor />
      <div className="h-px bg-white/[0.06]" />
      <CTA />
      <Footer />
    </main>
  );
}
