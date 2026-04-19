'use client';

import { useState } from 'react';
import { Window } from '@/components/Window';

const inboxItems = [
  { id: 1, title: 'VAT mismatch — INV-20847', desc: 'Invoice from Supplier A has a VAT discrepancy. Manual review required before payment.', aspekt: 'Invoice intake', time: '8 min ago', unread: true },
  { id: 2, title: 'Contract clauses flagged — LGL-2088', desc: '2 clauses in Q2 supplier contract require legal review. Clause 4.3 and 7.1 flagged.', aspekt: 'Contract review', time: '1 hr ago', unread: true },
  { id: 3, title: 'Lead enrichment paused', desc: 'API rate limit reached for data provider. Will resume automatically at 18:00.', aspekt: 'Lead enrichment', time: '3 hr ago', unread: false },
];

const activity = [
  { icon: 'A', iconColor: '#5E6AD2', title: 'ASPEKT',          text: 'completed 47 invoices — 3 flagged for CFO review',      time: '2 min ago' },
  { icon: '✓', iconColor: '#4ade80', title: 'Route',           text: 'matched to GL account 320 · confidence 0.98',            time: '4 min ago' },
  { icon: '!', iconColor: '#fbbf24', title: 'Anomaly',         text: 'VAT mismatch on INV-20847 · delivered to CFO via Teams', time: '8 min ago' },
  { icon: '✓', iconColor: '#4ade80', title: 'Lead enrichment', text: '124 contacts updated and pushed to CRM',                 time: '34 min ago' },
];

const metrics = [
  { value: '847',    label: 'ASPEKTs run',       color: '#f0f0f0' },
  { value: '99.7%',  label: 'Uptime',            color: '#f0f0f0' },
  { value: '3',      label: 'Flagged',           color: '#fbbf24' },
  { value: '47h',    label: 'Labor hours saved', color: '#5E6AD2' },
  { value: '€4,200', label: 'Cost saved',        color: '#5E6AD2' },
];

const navItems = ['Inbox', 'My ASPEKTs', 'Reports'];
const activeAspekts = [
  { label: 'Invoice intake',  color: '#4ade80' },
  { label: 'Lead enrichment', color: '#5E6AD2' },
  { label: 'Contract review', color: '#fbbf24' },
  { label: 'HR onboarding',   color: '#555558' },
];

export function HeroWindow() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'activity'>('inbox');
  const [activeNav, setActiveNav] = useState('Inbox');

  return (
    <Window
      rightSlot={
        <>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span>System online</span>
        </>
      }
    >
      <div className="flex" style={{ minHeight: '480px' }}>
        {/* Sidebar */}
        <div className="w-[180px] shrink-0 bg-[#0c0c0c] border-r border-[#1f1f1f] py-3 px-2 flex flex-col">
          <div className="flex items-center gap-2 px-2 pb-2.5">
            <div className="w-5 h-5 rounded bg-[#5E6AD2]/20 border border-[#5E6AD2]/30 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5E6AD2" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-[#f0f0f0]">Workspace</span>
          </div>

          {navItems.map((item) => (
            <div
              key={item}
              onClick={() => { setActiveNav(item); if (item === 'Inbox') setActiveTab('inbox'); }}
              className="flex items-center gap-2 px-2 py-1.5 mb-0.5 rounded text-[12px] cursor-pointer transition-all"
              style={{
                background: activeNav === item ? '#1a1a1a' : 'transparent',
                color: activeNav === item ? '#f0f0f0' : '#7A7A7E',
              }}
            >
              {item}
              {item === 'Inbox' && <span className="ml-auto text-[9px] text-[#7A7A7E]" style={{ fontFamily: 'Arial, sans-serif' }}>3</span>}
            </div>
          ))}

          <div className="px-2 pt-3 pb-1 text-[9.5px] uppercase tracking-[0.08em] text-[#555558]">Active</div>
          {activeAspekts.map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2 px-2 py-1.5 text-[11.5px] text-[#7A7A7E] cursor-pointer hover:text-[#B8B8BC] hover:bg-[#141414] rounded transition-colors mb-0.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-[#1f1f1f] text-[11px] text-[#7A7A7E]">
            <span>ASPEKTs</span><span>/</span>
            <span className="text-[#B8B8BC]" style={{ fontFamily: 'Arial, sans-serif' }}>Overview</span>
          </div>

          {/* Metrics */}
          <div className="grid border-b border-[#1f1f1f]" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
            {metrics.map((m, i) => (
              <div key={m.label} className="px-4 py-3 cursor-pointer hover:bg-[#0f0f0f] transition-colors"
                style={{ borderRight: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div className="text-[17px] font-semibold mb-0.5" style={{ color: m.color }}>{m.value}</div>
                <div className="text-[9.5px] text-[#7A7A7E]">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#1f1f1f]">
            {(['inbox', 'activity'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-5 py-2 text-[11.5px] font-medium capitalize transition-colors flex items-center gap-1.5"
                style={{
                  color: activeTab === tab ? '#f0f0f0' : '#7A7A7E',
                  borderBottom: activeTab === tab ? '2px solid #5E6AD2' : '2px solid transparent',
                  marginBottom: '-1px', background: 'none',
                  cursor: 'pointer',
                }}
              >
                {tab === 'inbox' ? 'Inbox' : 'Activity'}
                {tab === 'inbox' && <span className="text-[9px] text-[#7A7A7E]" style={{ fontFamily: 'Arial, sans-serif' }}>2</span>}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'inbox' && (
              <div>
                {inboxItems.map(item => (
                  <div key={item.id} className="flex gap-3 px-5 py-3 cursor-pointer hover:bg-[#0f0f0f] transition-colors"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: item.unread ? '#fbbf24' : '#555558' }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <span className="text-[12.5px] font-medium" style={{ color: item.unread ? '#f0f0f0' : '#B8B8BC' }}>{item.title}</span>
                        <span className="text-[10px] text-[#7A7A7E] flex-shrink-0" style={{ fontFamily: 'Arial, sans-serif' }}>{item.time}</span>
                      </div>
                      <p className="text-[11px] text-[#7A7A7E] leading-relaxed mb-1.5">{item.desc}</p>
                      <span className="text-[9.5px] px-2 py-0.5 text-[#7A7A7E]"
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
                <div className="px-5 pt-3 pb-2 text-[9.5px] uppercase tracking-[0.08em] text-[#555558]">Activity</div>
                {activity.map(item => (
                  <div key={item.time} className="flex gap-2.5 px-5 py-2 cursor-pointer hover:bg-[#0f0f0f] transition-colors">
                    <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] mt-0.5"
                      style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', color: item.iconColor }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[11.5px] text-[#B8B8BC] leading-relaxed">
                        <span className="text-[#f0f0f0] font-medium">{item.title}</span> {item.text}
                      </p>
                      <p className="text-[10px] text-[#7A7A7E] mt-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[150px] shrink-0 border-l border-[#1f1f1f] p-3 bg-[#0c0c0c]">
          {[
            { label: 'Status', content: <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/><span className="text-[11px] text-[#f0f0f0]">Running</span></div> },
            { label: 'Owner', content: <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full" style={{ background: 'linear-gradient(135deg,#5E6AD2,#3A4299)'}}/><span className="text-[11px] text-[#B8B8BC]">Finance team</span></div> },
            { label: 'Channel', content: <div className="flex flex-wrap gap-1">{['Teams','Email'].map(c=><span key={c} className="text-[9.5px] px-1.5 py-0.5 text-[#B8B8BC]" style={{background:'#141414',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'4px'}}>{c}</span>)}</div> },
            { label: 'Runtime', content: <span className="text-[10.5px] text-[#B8B8BC]" style={{fontFamily:"'DM Mono',monospace"}}>v2.4.1 · local</span> },
          ].map(({ label, content }) => (
            <div key={label} className="mb-4">
              <p className="text-[9.5px] text-[#7A7A7E] uppercase tracking-wider mb-1.5">{label}</p>
              {content}
            </div>
          ))}
          <div className="pt-2 mt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <a href="#quote" className="text-[10px] leading-relaxed text-[#555558]">
              Need to pause? <span className="text-[#5E6AD2]">Contact us →</span>
            </a>
          </div>
        </div>
      </div>
    </Window>
  );
}
