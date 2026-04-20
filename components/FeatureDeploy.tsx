'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Window } from '@/components/Window';
import { useLang } from '@/lib/LangContext';

const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
const BARS = [
  { label: 'Process audit',      start: 1, span: 1, bg: 'bg-green-500/25',  border: 'border-green-500/35',  text: 'text-green-200' },
  { label: 'System architecture',start: 2, span: 1, bg: 'bg-green-500/25',  border: 'border-green-500/35',  text: 'text-green-200' },
  { label: 'Build & test',       start: 3, span: 2, bg: 'bg-[#5E6AD2]/35',  border: 'border-[#5E6AD2]/50',  text: 'text-white' },
  { label: 'Deploy & handover',  start: 5, span: 1, bg: 'bg-[#1f1f1f]',     border: 'border-[#2a2a2a]',     text: 'text-[#a0a0a5]' },
  { label: 'Monitor & maintain', start: 6, span: 3, bg: 'bg-[#141414]',     border: 'border-[#1f1f1f]',     text: 'text-[#555558]' },
];

const subFeatures = [
  { id: '2.1', key: 'Process mapping' },
  { id: '2.2', key: 'Custom build' },
  { id: '2.3', key: 'Zero-footprint deployment' },
  { id: '2.4', key: 'Ongoing management' },
];

export function FeatureDeploy() {
  const [activeTab, setActiveTab] = useState('2.1');
  const { t } = useLang();

  return (
    <section id="deploy" className="py-20 sm:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Window — mobilde tam genişlik, overflow hidden */}
          <div className="relative order-2 lg:order-1 w-full overflow-hidden">
            <div className="absolute inset-0 -top-6 bg-gradient-to-b from-[#5E6AD2]/8 to-transparent blur-3xl pointer-events-none" />
            <Window rightSlot={<span className="text-[#7A7A7E]">Custom scope · 8 weeks</span>}>
              <div className="flex">
                {/* Phases sidebar — sadece sm+ */}
                <div className="hidden sm:block w-[130px] shrink-0 bg-[#0b0b0b] border-r border-[#1f1f1f] py-3 px-2">
                  <p className="text-[9.5px] text-[#333] uppercase tracking-wider px-2 mb-2">Phases</p>
                  {[
                    { label: 'Phase 1 · Audit',  active: false },
                    { label: 'Phase 2 · Design', active: false },
                    { label: 'Phase 3 · Build',  active: true  },
                    { label: 'Phase 4 · Deploy', active: false },
                    { label: 'Ongoing',          active: false },
                  ].map(({ label, active }) => (
                    <div key={label} className={`px-2 py-1.5 text-[11px] rounded cursor-pointer transition-colors ${active ? 'bg-[#141414] text-[#f0f0f0]' : 'text-[#a0a0a5] hover:bg-[#1a1a1a]'}`}>
                      {label}
                    </div>
                  ))}
                </div>

                {/* Gantt */}
                <div className="flex-1 min-w-0 p-3">
                  <div className="grid grid-cols-8 border-b border-[#1f1f1f] pb-2 mb-3">
                    {WEEKS.map((w, i) => (
                      <div key={w} className={`text-[9px] sm:text-[10px] text-center font-mono ${i === 2 || i === 3 ? 'text-[#5E6AD2]' : 'text-[#555558]'}`}>{w}</div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <div className="absolute top-0 bottom-0 w-px bg-[#5E6AD2]/40 pointer-events-none z-10" style={{ left: 'calc(37.5% + 1px)' }}>
                      <div className="absolute -top-1 -left-[3px] w-1.5 h-1.5 rounded-full bg-[#5E6AD2]" />
                    </div>
                    {BARS.map(({ label, start, span, bg, border, text }) => (
                      <div key={label} className="grid grid-cols-8 h-7 items-center">
                        <div
                          className={`${bg} ${border} border rounded px-1 sm:px-2 flex items-center h-6 text-[9px] sm:text-[10px] ${text} truncate cursor-pointer`}
                          style={{ gridColumnStart: start, gridColumnEnd: `span ${span}` }}
                        >
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 pt-4 mt-3 border-t border-[#1f1f1f]">
                    {[
                      { color: 'bg-green-500/50', label: 'Completed' },
                      { color: 'bg-[#5E6AD2]/60', label: 'In progress' },
                      { color: 'bg-[#1f1f1f] border border-[#2a2a2a]', label: 'Pending' },
                    ].map(({ color, label }) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-sm ${color}`} />
                        <span className="text-[9px] sm:text-[10px] text-[#7A7A7E]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Window>
          </div>

          {/* Text */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-2 text-sm text-[#7A7A7E]">
              <span className="text-xs font-mono text-[#5E6AD2]">2.0</span>
              <span>{t('deploy_label')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#f0f0f0] leading-tight tracking-tight">
              {t('deploy_title')}
            </h2>
            <p className="text-base sm:text-lg text-[#7A7A7E] leading-relaxed">
              {t('deploy_desc')}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {subFeatures.map(f => (
                <button key={f.id} onClick={() => setActiveTab(f.id)}
                  className={`flex items-center gap-2 text-sm text-left transition-colors duration-150 ${activeTab === f.id ? 'text-[#f0f0f0]' : 'text-[#7A7A7E] hover:text-[#f0f0f0]'}`}>
                  <span className="text-xs font-mono text-[#7A7A7E]">{f.id}</span>
                  {f.key}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
