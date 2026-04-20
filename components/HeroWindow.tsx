'use client';

import { useState } from 'react';
import { Window } from '@/components/Window';

const inboxItems = [
  { id: 1, title: 'VAT mismatch — INV-20847', desc: 'Invoice from Supplier A has a VAT discrepancy. Manual review required before payment.', aspekt: 'Invoice intake', time: '8 min ago', unread: true },
  { id: 2, title: 'Contract clauses flagged — LGL-2088', desc: '2 clauses in Q2 supplier contract require legal review.', aspekt: 'Contract review', time: '1 hr ago', unread: true },
  { id: 3, title: 'Lead enrichment paused', desc: 'API rate limit reached. Will resume automatically at 18:00.', aspekt: 'Lead enrichment', time: '3 hr ago', unread: false },
];

const activity = [
  { icon: 'A', iconColor: '#5E6AD2', title: 'ASPEKT',          text: 'completed 47 invoices — 3 flagged for CFO review',      time: '2 min ago' },
  { icon: '✓', iconColor: '#4ade80', title: 'Route',           text: 'matched to GL account 320 · confidence 0.98',            time: '4 min ago' },
  { icon: '!', iconColor: '#fbbf24', title: 'Anomaly',         text: 'VAT mismatch on INV-20847 · delivered to CFO via Teams', time: '8 min ago' },
];

const metrics = [
  { value: '847',    label: 'ASPEKTs run', color: '#f0f0f0' },
  { value: '99.7%',  label: 'Uptime',     color: '#f0f0f0' },
  { value: '3',      label: 'Flagged',    color: '#fbbf24' },
  { value: '47h',    label: 'Saved',      color: '#5E6AD2' },
];

const activeAspekts = [
  { label: 'Invoice intake',  color: '#4ade80' },
  { label: 'Lead enrichment', color: '#5E6AD2' },
  { label: 'Contract review', color: '#fbbf24' },
  { label: 'HR onboarding',   color: '#555558' },
];

export function HeroWindow() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'activity'>('inbox');

  return (
    <Window rightSlot={
      <><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>System online</span></>
    }>
      <div className="flex" style={{ minHeight: '380px' }}>

        {/* Sidebar — sadece sm+ ekranlarda */}
        <div className="hidden sm:flex w-[160px] shrink-0 bg-[#0c0c0c] border-r border-[#1f1f1f] py-3 px-2 flex-col">
          <div className="flex items-center gap-2 px-2 pb-2.5">
            <div className="w-5 h-5 rounded bg-[#5E6AD2]/20 border border-[#5E6AD2]/30 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5E6AD2" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-[#f0f0f0]">Workspace</span>
          </div>
          {['Inbox', 'My ASPEKTs', 'Reports'].map((item, i) => (
            <div key={item} className="flex items-center gap-2 px-2 py-1.5 mb-0.5 rounded text-[11.5px] cursor-pointer transition-colors"
              style={{ background: i === 0 ? '#1a1a1a' : 'transparent', color: i === 0 ? '#f0f0f0' : '#7A7A7E' }}>
              {item}
              {i === 0 && <span className="ml-auto text-[9px] text-[#7A7A7E]">3</span>}
            </div>
          ))}
          <div className="px-2 pt-3 pb-1 text-[9.5px] uppercase tracking-[0.08em] text-[#555558]">Active</div>
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
            <span className="text-[#B8B8BC]">Overview</span>
          </div>

          {/* Metrics — 4 kart mobilde de sığsın */}
          <div className="grid border-b border-[#1f1f1f]" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            {metrics.map((m, i) => (
              <div key={m.label} className="px-3 py-2.5 sm:px-4 sm:py-3 cursor-pointer hover:bg-[#0f0f0f] transition-colors"
                style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div className="text-[15px] sm:text-[18px] font-semibold mb-0.5" style={{ color: m.color }}>{m.value}</div>
                <div className="text-[9px] sm:text-[10px] text-[#7A7A7E]">{m.label}</div>
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
                  marginBottom: '-1px', background: 'none',
                  cursor: 'pointer',
                }}
              >
                {tab === 'inbox' ? 'Inbox' : 'Activity'}
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
                        <span className="text-[11.5px] font-medium truncate" style={{ color: item.unread ? '#f0f0f0' : '#B8B8BC' }}>
                          {item.title}
                        </span>
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
                <div className="px-4 pt-3 pb-2 text-[9px] uppercase tracking-[0.08em] text-[#555558]">Activity</div>
                {activity.map(item => (
                  <div key={item.time} className="flex gap-2.5 px-4 py-2 cursor-pointer hover:bg-[#0f0f0f] transition-colors">
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
            { label: 'Status', content: <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/><span className="text-[11px] text-[#f0f0f0]">Running</span></div> },
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
