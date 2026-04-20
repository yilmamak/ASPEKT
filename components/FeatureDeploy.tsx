'use client';

import { useState } from 'react';
import { Window } from '@/components/Window';
import { useLang } from '@/lib/LangContext';

export function FeatureDeploy() {
  const [activeTab, setActiveTab] = useState('2.1');
  const { t } = useLang();
  const isTR = t('deploy_label') === 'Kurulum';

  const WEEKS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'];

  const BARS = [
    { labelEN: 'Audit',       labelTR: 'Analiz',       start: 1, span: 1, bg: 'bg-green-500/25',  border: 'border-green-500/35',  text: 'text-green-200' },
    { labelEN: 'Design',      labelTR: 'Tasarım',      start: 2, span: 1, bg: 'bg-green-500/25',  border: 'border-green-500/35',  text: 'text-green-200' },
    { labelEN: 'Build & test',labelTR: 'Geliştirme',   start: 3, span: 2, bg: 'bg-[#5E6AD2]/35',  border: 'border-[#5E6AD2]/50',  text: 'text-white' },
    { labelEN: 'Deploy',      labelTR: 'Kurulum',      start: 5, span: 1, bg: 'bg-[#1f1f1f]',     border: 'border-[#2a2a2a]',     text: 'text-[#a0a0a5]' },
    { labelEN: 'Monitoring',  labelTR: 'İzleme',       start: 6, span: 3, bg: 'bg-[#141414]',     border: 'border-[#1f1f1f]',     text: 'text-[#555558]' },
  ];

  const PHASES = [
    { labelEN: 'Phase 1 · Audit',   labelTR: 'Aşama 1 · Analiz',   active: false },
    { labelEN: 'Phase 2 · Design',  labelTR: 'Aşama 2 · Tasarım',  active: false },
    { labelEN: 'Phase 3 · Build',   labelTR: 'Aşama 3 · Geliştir', active: true  },
    { labelEN: 'Phase 4 · Deploy',  labelTR: 'Aşama 4 · Kurulum',  active: false },
    { labelEN: 'Ongoing',           labelTR: 'Sürekli',             active: false },
  ];

  const STATUS = [
    { labelEN: 'Completed', labelTR: 'Tamamlandı', value: '2', color: 'text-green-400' },
    { labelEN: 'Active',    labelTR: 'Aktif',       value: '1', color: 'text-[#8b97ff]' },
    { labelEN: 'Pending',   labelTR: 'Bekliyor',    value: '2', color: 'text-[#555558]' },
  ];

  const LEGEND = [
    { color: 'bg-green-500/50',  labelEN: 'Completed',   labelTR: 'Tamamlandı' },
    { color: 'bg-[#5E6AD2]/60',  labelEN: 'In progress', labelTR: 'Devam ediyor' },
    { color: 'bg-[#1f1f1f] border border-[#2a2a2a]', labelEN: 'Pending', labelTR: 'Bekliyor' },
  ];

  const subFeatures = [
    { id: '2.1', labelEN: 'Process mapping',           labelTR: 'Süreç haritalama' },
    { id: '2.2', labelEN: 'Custom build',              labelTR: 'Özel geliştirme' },
    { id: '2.3', labelEN: 'Zero-footprint deployment', labelTR: 'Sıfır ayak izi kurulum' },
    { id: '2.4', labelEN: 'Ongoing management',        labelTR: 'Sürekli yönetim' },
  ];

  return (
    <section id="deploy" className="py-20 sm:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Window — gradyan eklendi */}
          <div className="relative order-2 lg:order-1 w-full overflow-hidden">
            <div className="absolute inset-0 -top-6 bg-gradient-to-b from-[#5E6AD2]/8 to-transparent blur-3xl pointer-events-none transition-all duration-400 group-hover:from-[#5E6AD2]/18" />
            <div className="group">
              <Window rightSlot={<span className="text-[#7A7A7E]">{isTR ? 'Özel kapsam' : 'Custom scope'}</span>}>
                <div className="flex">
                  <div className="hidden sm:block w-[130px] shrink-0 bg-[#0b0b0b] border-r border-[#1f1f1f] py-3 px-2">
                    <p className="text-[9.5px] text-[#333] uppercase tracking-wider px-2 mb-2">{isTR ? 'Aşamalar' : 'Phases'}</p>
                    {PHASES.map(p => (
                      <div key={p.labelEN} className={`px-2 py-1.5 text-[11px] rounded cursor-pointer transition-colors ${p.active ? 'bg-[#141414] text-[#f0f0f0]' : 'text-[#a0a0a5] hover:bg-[#1a1a1a]'}`}>
                        {isTR ? p.labelTR : p.labelEN}
                      </div>
                    ))}
                    <p className="text-[9.5px] text-[#333] uppercase tracking-wider px-2 mt-4 mb-2">{isTR ? 'Durum' : 'Status'}</p>
                    {STATUS.map(s => (
                      <div key={s.labelEN} className="flex justify-between px-2 py-1 hover:bg-[#1a1a1a] rounded transition-colors">
                        <span className="text-[11px] text-[#a0a0a5]">{isTR ? s.labelTR : s.labelEN}</span>
                        <span className={`text-[11px] font-mono ${s.color}`}>{s.value}</span>
                      </div>
                    ))}
                  </div>

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
                      {BARS.map(b => (
                        <div key={b.labelEN} className="grid grid-cols-8 h-7 items-center">
                          <div
                            className={`${b.bg} ${b.border} border rounded px-2 flex items-center h-6 text-[10px] ${b.text} cursor-pointer`}
                            style={{ gridColumnStart: b.start, gridColumnEnd: `span ${b.span}`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            {isTR ? b.labelTR : b.labelEN}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 pt-4 mt-3 border-t border-[#1f1f1f]">
                      {LEGEND.map(l => (
                        <div key={l.labelEN} className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-sm ${l.color}`} />
                          <span className="text-[9px] sm:text-[10px] text-[#7A7A7E]">{isTR ? l.labelTR : l.labelEN}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Window>
            </div>
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
            <p className="text-base sm:text-lg text-[#7A7A7E] leading-relaxed">{t('deploy_desc')}</p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {subFeatures.map(f => (
                <button key={f.id} onClick={() => setActiveTab(f.id)}
                  className={`flex items-center gap-2 text-sm text-left transition-colors ${activeTab === f.id ? 'text-[#f0f0f0]' : 'text-[#7A7A7E] hover:text-[#f0f0f0]'}`}>
                  <span className="text-xs font-mono text-[#7A7A7E]">{f.id}</span>
                  {isTR ? f.labelTR : f.labelEN}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
