'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/LangContext';

const ValueStatement = () => {
  const { t, lang } = useLang();
  const [visibleCards, setVisibleCards] = useState<number[]>([0, 1, 2]); // Hep görünür
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    { title: t('vs_1_title'), description: t('vs_1_desc') },
    { title: t('vs_2_title'), description: t('vs_2_desc') },
    { title: t('vs_3_title'), description: t('vs_3_desc') },
  ];

  useEffect(() => {
    setVisibleCards([]);
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleCards(prev => prev.includes(index) ? prev : [...prev, index]), index * 100);
            observer.unobserve(ref);
          }
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
        observer.observe(ref);
        observers.push(observer);
      }
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, [lang]);

  return (
    <section className="py-20 sm:py-24 bg-[#0A0A0A]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F0F0F0] leading-tight">
              {t('tagline').split('. ').map((line, i, arr) => (
                <span key={i} className="block mb-2">{line}{i < arr.length - 1 ? '.' : ''}</span>
              ))}
            </h2>
          </div>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={feature.title}
                ref={el => { cardRefs.current[index] = el; }}
                className={`p-5 sm:p-6 bg-[#141414] border border-[#1F1F1F] transition-all duration-700 ${
                  visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h3 className="text-base sm:text-lg font-medium text-[#F0F0F0] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#7A7A7E] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueStatement;
