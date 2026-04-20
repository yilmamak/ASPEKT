'use client';

import { useState } from 'react';
import { Window } from '@/components/Window';
import { useLang } from '@/lib/LangContext';

export function HeroWindow() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'activity'>('inbox');
  const { t } = useLang();

  const inboxItems = [
    { id: 1, title: t('kanban_backlog') === 'Bekleyen' ? 'KDV uyuşmazlığı — FAT-20847' : 'VAT mismatch — INV-20847', desc: t('kanban_backlog') === 'Bekleyen' ? 'Tedarikçiden gelen faturada KDV uyuşmazlığı. Ödeme öncesi inceleme gerekli.' : 'Invoice from Supplier A has a VAT discrepancy. Manual review required.', aspekt: t('kanban_backlog') === 'Bekleyen' ? 'Fatura girişi' : 'Invoice intake', time: '8 min ago', unread: true },
    { id: 2, title: t('kanban_backlog') === 'Bekleyen' ? 'Sözleşme maddeleri işaretlendi — SZ-2088' : 'Contract clauses flagged — LGL-2088', desc: t('kanban_backlog') === 'Bekleyen' ? 'Q2 tedarikçi sözleşmesinde 2 madde hukuki inceleme gerektiriyor.' : '2 clauses require legal review.', aspekt: t('kanban_backlog') === 'Bekleyen' ? 'Sözleşme inceleme' : 'Contract review', time: '1 hr ago', unread: true },
    { id: 3, title: t('kanban_backlog') === 'Bekleyen' ? 'Müşteri adayı zenginleştirme duraklatıldı' : 'Lead enrichment paused', desc: t('kanban_backlog') === 'Bekleyen' ? 'API limiti aşıldı. Sistem 18:00\'de otomatik devam edecek.' : 'API rate limit reached. Will resume at 18:00.', aspekt: t('kanban_backlog') === 'Bekleyen' ? 'Müşteri adayı zenginleştirme' : 'Lead enrichment', time: '3 hr ago', unread: false },
  ];

  const activity = [
    { icon: 'A', iconColor: '#5E6AD2', title: 'ASPEKT', text: t('kanban_backlog') === 'Bekleyen' ? '47 faturayı tamamladı — 3 tanesi CFO incelemesi için işaretlendi' : 'completed 47 invoices — 3 flagged for CFO review', time: '2 min ago' },
    { icon: '✓', iconColor: '#4ade80', title: t('kanban_backlog') === 'Bekleyen' ? 'Rota' : 'Route', text: t('kanban_backlog') === 'Bekleyen' ? 'GL 320 hesabıyla eşleşti · güven 0.98' : 'matched to GL account 320 · confidence 0.98', time: '4 min ago' },
    { icon: '!', iconColor: '#fbbf24', title: t('kanban_backlog') === 'Bekleyen' ? 'Anomali' : 'Anomaly', text: t('kanban_backlog') === 'Bekleyen' ? 'FAT-20847\'de KDV uyuşmazlığı · Teams üzerinden CFO\'ya iletildi' : 'VAT mismatch on INV-20847 · delivered to CFO via Teams', time: '8 min ago' },
  ];

  const metrics = [
    { value: '847',    label: t('dash_aspekts_run'), color: '#f0f0f0' },
    { value: '99.7%',  label: t('dash_uptime'),      color: '#f0f0f0' },
    { value: '3',      label: t('dash_flagged'),      color: '#fbbf24' },
    { value: '47h',    label: t('dash_saved'),        color: '#5E6AD2' },
    { value: '€4,200', label: t('dash_cost_saved'),   color: '#5E6AD2' },
  ];

  const activeAspekts = [
    { label: t('kanban_backlog') === 'Bekleyen' ? 'Fatura girişi' : 'Invoice intake',  color: '#4ade80' },
    { label: t('kanban_backlog') === 'Bekleyen' ? 'Müşteri adayı' : 'Lead enrichment', color: '#5E6AD2' },
    { label: t('kanban_backlog') === 'Bekleyen' ? 'Sözleşme inceleme' : 'Contract review', color: '#fbbf24' },
    { label: t('kanban_backlog') === 'Bekleyen' ? 'İK oryantasyon' : 'HR onboarding',  color: '#555558' },
  ];

  return (
    <Window rightSlot={
      <><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>{t('dash_running')}</span></>
    }>
      <div className="flex" style={{ minHeight: '380px' }}>

        {/* Sidebar — sadece sm+ */}
        <div className="hidden sm:flex w-[160px] shrink-0 bg-[#0c0c0c] border-r border-[#1f1f1f] py-3 px-2 flex-col">
          <div className="flex items-center gap-2 px-2 pb-2.5">
            <div className="w-5 h-5 rounded bg-[#5E6AD2]/20 border border-[#5E6AD2]/30 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5E6AD2" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-[#f0f0f0]">{t('dash_workspace')}</span>
          </div>
          {[t('dash_inbox'), t('dash_my_aspekts'), t('dash_reports')].map((item, i) => (
            <div key={item} className="flex items-center gap-2 px-2 py-1.5 mb-0.5 rounded text-[11.5px] cursor-pointer transition-colors"
              style={{ background: i === 0 ? '#1a1a1a' : 'transparent', color: i === 0 ? '#f0f0f0' : '#7A7A7E' }}>
              {item}
              {i === 0 && <span className="ml-auto text-[9px] text-[#7A7A7E]">3</span>}
            </div>
          ))}
          <div className="px-2 pt-3 pb-1 text-[9.5px] uppercase tracking-[0.08em] text-[#555558]">{t('dash_active')}</div>
          {activeAspekts.map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2 px-2 py-1.5 text-[11px] text-[#7A7A7E] cursor-pointer hover:bg-[#141414] rounded transition-colors mb-0.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#1f1f1f] text-[10.5px] text-[#7A7A7E]">
            <span>ASPEKTs</span><span>/</span>
            <span className="text-[#B8B8BC]">{t('dash_overview')}</span>
          </div>

          {/* Metrics — 5 kart, mobilde küçük */}
          <div className="grid border-b border-[#1f1f1f]" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
            {metrics.map((m, i) => (
              <div key={m.label} className="px-2 sm:px-3 py-2 sm:py-3 cursor-pointer hover:bg-[#0f0f0f] transition-colors"
                style={{ borderRight: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div className="text-[13px] sm:text-[17px] font-semibold mb-0.5" style={{ color: m.color }}>{m.value}</div>
                <div className="text-[8px] sm:text-[10px] text-[#7A7A7E] leading-tight">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#1f1f1f]">
            {(['inbox', 'activity'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-4 py-2 text-[11px] font-medium capitalize flex items-center gap-1.5 transition-colors"
                style={{
                  color: activeTab === tab ? '#f0f0f0' : '#7A7A7E',
                  borderBottom: activeTab === tab ? '2px solid #5E6AD2' : '2px solid transparent',
                  marginBottom: '-1px', background: 'none', cursor: 'pointer',
                }}
              >
                {tab === 'inbox' ? t('dash_inbox') : t('dash_activity')}
                {tab === 'inbox' && <span className="text-[9px] text-[#7A7A7E]">2</span>}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'inbox' && (
              <div>
                {inboxItems.map(item => (
                  <div key={item.id} className="flex gap-2.5 px-4 py-3 cursor-pointer hover:bg-[#0f0f0f] transition-colors"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: item.unread ? '#fbbf24' : '#555558' }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-[11.5px] font-medium truncate" style={{ color: item.unread ? '#f0f0f0' : '#B8B8BC' }}>{item.title}</span>
                        <span className="text-[9.5px] text-[#7A7A7E] flex-shrink-0">{item.time}</span>
                      </div>
                      <p className="text-[10.5px] text-[#7A7A7E] leading-relaxed mb-1.5 line-clamp-2">{item.desc}</p>
                      <span className="text-[9px] px-1.5 py-0.5 text-[#7A7A7E]"
                        style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px' }}>
                        {item.aspekt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'activity' && (
              <div>
                <div className="px-4 pt-3 pb-2 text-[9px] uppercase tracking-[0.08em] text-[#555558]">{t('dash_activity')}</div>
                {activity.map((item, i) => (
                  <div key={i} className="flex gap-2.5 px-4 py-2 cursor-pointer hover:bg-[#0f0f0f] transition-colors">
                    <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] mt-0.5"
                      style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', color: item.iconColor }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[11px] text-[#B8B8BC] leading-relaxed">
                        <span className="text-[#f0f0f0] font-medium">{item.title}</span> {item.text}
                      </p>
                      <p className="text-[9.5px] text-[#7A7A7E] mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right panel — sadece sm+ */}
        <div className="hidden sm:block w-[140px] shrink-0 border-l border-[#1f1f1f] p-3 bg-[#0c0c0c]">
          {[
            { label: 'Status', content: <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/><span className="text-[11px] text-[#f0f0f0]">{t('dash_running')}</span></div> },
            { label: 'Owner', content: <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full" style={{background:'linear-gradient(135deg,#5E6AD2,#3A4299)'}}/><span className="text-[10.5px] text-[#B8B8BC]">Finance</span></div> },
            { label: 'Runtime', content: <span className="text-[10px] text-[#B8B8BC]" style={{fontFamily:"'DM Mono',monospace"}}>v2.4.1 · local</span> },
          ].map(({ label, content }) => (
            <div key={label} className="mb-4">
              <p className="text-[9px] text-[#7A7A7E] uppercase tracking-wider mb-1.5">{label}</p>
              {content}
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}
