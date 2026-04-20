'use client';

import { useState } from 'react';
import { Window } from '@/components/Window';
import { useLang } from '@/lib/LangContext';

const CHANNELS = [
  { name: 'Email',    color: '#60a5fa', bg: 'rgba(96,165,250,0.10)',  border: 'rgba(96,165,250,0.25)'  },
  { name: 'WhatsApp', color: '#4ade80', bg: 'rgba(74,222,128,0.10)', border: 'rgba(74,222,128,0.25)' },
  { name: 'Slack',    color: '#e879f9', bg: 'rgba(232,121,249,0.10)', border: 'rgba(232,121,249,0.25)' },
  { name: 'Teams',    color: '#818cf8', bg: 'rgba(129,140,248,0.10)', border: 'rgba(129,140,248,0.25)' },
  { name: 'Telegram', color: '#38bdf8', bg: 'rgba(56,189,248,0.10)',  border: 'rgba(56,189,248,0.25)'  },
  { name: 'Google',   color: '#fb923c', bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.25)'  },
  { name: 'Any CRM',  color: '#5E6AD2', bg: 'rgba(94,106,210,0.10)', border: 'rgba(94,106,210,0.25)' },
];

export function FeatureSystem() {
  const [activeTab, setActiveTab] = useState('3.1');
  const { t } = useLang();
  const isTR = t('system_label') === 'Sistem';

  const SUB_FEATURES = [
    { id: '3.1', labelEN: 'Runs where you run',       labelTR: 'Sizin ortamınızda çalışır' },
    { id: '3.2', labelEN: 'Works where you work',     labelTR: 'Kullandığınız araçlarla çalışır' },
    { id: '3.3', labelEN: 'Multi-channel reporting',  labelTR: 'Çok kanallı raporlama' },
    { id: '3.4', labelEN: 'Monitoring & alerts',      labelTR: 'İzleme ve uyarılar' },
  ];

  const aspekts = [
    { id: 'INV', nameEN: 'Invoice intake',   nameTR: 'Fatura girişi',      lastRun: '2 min ago', countEN: '847 today',   countTR: '847 bugün',   dot: '#4ade80', labelEN: 'Running', labelTR: 'Çalışıyor', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.2)'  },
    { id: 'CRM', nameEN: 'Lead enrichment',  nameTR: 'Müşteri adayı',      lastRun: '5 min ago', countEN: '124 updated', countTR: '124 güncellendi', dot: '#4ade80', labelEN: 'Running', labelTR: 'Çalışıyor', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.2)'  },
    { id: 'LGL', nameEN: 'Contract review',  nameTR: 'Sözleşme inceleme',  lastRun: '1 hr ago',  countEN: '2 flagged',   countTR: '2 işaretlendi', dot: '#fbbf24', labelEN: 'Flagged', labelTR: 'İşaretlendi', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
    { id: 'HR',  nameEN: 'HR onboarding',    nameTR: 'İK oryantasyon',     lastRun: '3 hr ago',  countEN: '—',           countTR: '—',            dot: '#555558', labelEN: 'Idle',    labelTR: 'Bekliyar',  bg: 'rgba(85,85,88,0.08)',   border: 'rgba(85,85,88,0.2)'   },
  ];

  return (
    <section id="system" className="py-20 sm:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-[#7A7A7E]">
              <span className="text-xs font-mono text-[#5E6AD2]">3.0</span>
              <span>{t('system_label')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#f0f0f0] leading-tight tracking-tight">
              {t('system_title')}
            </h2>
            <p className="text-base sm:text-lg text-[#7A7A7E] leading-relaxed">{t('system_desc')}</p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {SUB_FEATURES.map(f => (
                <button key={f.id} onClick={() => setActiveTab(f.id)}
                  className={`flex items-center gap-2 text-sm text-left transition-colors ${activeTab === f.id ? 'text-[#f0f0f0]' : 'text-[#7A7A7E] hover:text-[#f0f0f0]'}`}>
                  <span className="text-xs font-mono text-[#7A7A7E]">{f.id}</span>
                  {isTR ? f.labelTR : f.labelEN}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -top-6 bg-gradient-to-b from-[#5E6AD2]/8 to-transparent blur-3xl pointer-events-none" />
            <Window
              leftSlot={<span className="text-[11px] text-[#7A7A7E]">{isTR ? 'ASPEKT\'lerim' : 'My ASPEKTs'}</span>}
              rightSlot={<><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>{isTR ? 'Aktif' : 'Active'}</span></>}
            >
              <div className="px-4 py-2.5 border-b border-[#1f1f1f]">
                <p className="text-[11px] text-[#7A7A7E]">
                  {isTR ? 'Çalışma alanınızdaki tüm ASPEKT\'ler.' : 'All ASPEKTs running in your workspace.'}
                </p>
              </div>
              <div className="p-3 space-y-2">
                {aspekts.map(a => (
                  <div key={a.id} className="flex items-start justify-between gap-3 p-3 cursor-pointer transition-all hover:bg-[#141414]"
                    style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px' }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.dot }} />
                        <span className="text-[12px] font-medium text-[#f0f0f0]">{isTR ? a.nameTR : a.nameEN}</span>
                        <span className="text-[9.5px] text-[#555558]">{a.id}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-[#7A7A7E]">
                        <span>{a.lastRun}</span>
                        <span>{isTR ? a.countTR : a.countEN}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="text-[9.5px] px-1.5 py-0.5 font-medium"
                        style={{ color: a.dot, background: a.bg, border: `1px solid ${a.border}`, borderRadius: '4px' }}>
                        {isTR ? a.labelTR : a.labelEN}
                      </span>
                      <a href="mailto:info@aspektai.com?subject=Pause request"
                        className="text-[10.5px] text-[#5E6AD2] hover:text-[#8b97ff] transition-colors"
                        onClick={e => e.stopPropagation()}>
                        {isTR ? 'Duraklatmak için →' : 'Contact to pause →'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 pb-4 pt-1 border-t border-[#1f1f1f] mt-1">
                <p className="text-[9.5px] text-[#7A7A7E] uppercase tracking-wider mb-2.5">{t('system_delivers')}</p>
                <div className="flex flex-wrap gap-1.5">
                  {CHANNELS.map(ch => (
                    <span key={ch.name} className="text-[11px] px-2.5 py-1 font-medium cursor-pointer hover:brightness-125 transition-all"
                      style={{ color: ch.color, background: ch.bg, border: `1px solid ${ch.border}`, borderRadius: '6px' }}>
                      {ch.name}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-[#555558] mt-2">{t('system_integrate')}</p>
              </div>
            </Window>
          </div>
        </div>
      </div>
    </section>
  );
}
