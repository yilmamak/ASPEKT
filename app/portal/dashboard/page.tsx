'use client';

import { useState } from 'react';

const metrics = [
  { label: 'ASPEKTs run',         value: '847',    sub: 'Today',          color: '#f0f0f0' },
  { label: 'Uptime',              value: '99.7%',  sub: 'Last 30 days',   color: '#f0f0f0' },
  { label: 'Actions required',    value: '3',      sub: 'Flagged',        color: '#fbbf24' },
  { label: 'Labor hours saved',   value: '47h',    sub: 'This week',      color: '#5E6AD2' },
  { label: 'Cost saved',          value: '€4,200', sub: 'This week',      color: '#5E6AD2' },
];

const inboxItems = [
  { id: 1, title: 'VAT mismatch — INV-20847', desc: 'Invoice from Supplier A has a VAT discrepancy. Manual review required before payment.', aspekt: 'Invoice intake', time: '8 min ago', unread: true },
  { id: 2, title: 'Contract clauses flagged — LGL-2088', desc: '2 clauses in Q2 supplier contract require legal review. Clause 4.3 and 7.1 flagged.', aspekt: 'Contract review', time: '1 hr ago', unread: true },
  { id: 3, title: 'Lead enrichment paused', desc: 'API rate limit reached for data provider. ASPEKT will resume automatically at 18:00.', aspekt: 'Lead enrichment', time: '3 hr ago', unread: false },
];

const activity = [
  { id: 1, icon: 'A', iconColor: '#5E6AD2', title: 'ASPEKT',          text: 'completed 47 invoices — 3 flagged for CFO review',      time: '2 min ago' },
  { id: 2, icon: '✓', iconColor: '#4ade80', title: 'Route',           text: 'matched to GL account 320 · confidence 0.98',            time: '4 min ago' },
  { id: 3, icon: '!', iconColor: '#fbbf24', title: 'Anomaly',         text: 'VAT mismatch on INV-20847 · delivered to CFO via Teams', time: '8 min ago' },
  { id: 4, icon: 'A', iconColor: '#5E6AD2', title: 'ASPEKT',          text: 'completed CV screening — 2 candidates shortlisted',      time: '22 min ago' },
  { id: 5, icon: '✓', iconColor: '#4ade80', title: 'Lead enrichment', text: '124 contacts updated and pushed to CRM',                 time: '34 min ago' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'activity'>('inbox');

  return (
    <div className="flex h-full">
      {/* Center */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Panel header */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 flex-shrink-0 text-[11px]"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#7a7a7e' }}
        >
          <span>ASPEKTs</span><span>/</span>
          <span style={{ color: '#b8b8bc', fontFamily: 'Arial, sans-serif' }}>Overview</span>
        </div>

        {/* Metrics */}
        <div className="grid flex-shrink-0" style={{ gridTemplateColumns: 'repeat(5,1fr)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {metrics.map((m, i) => (
            <div key={m.label} className="px-5 py-3.5 cursor-pointer transition-colors"
              style={{ borderRight: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0f0f0f'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <div className="text-[19px] font-semibold mb-0.5" style={{ color: m.color }}>{m.value}</div>
              <div className="text-[10px]" style={{ color: '#7a7a7e' }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {(['inbox', 'activity'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-5 py-2.5 text-[12px] font-medium capitalize flex items-center gap-1.5 transition-colors"
              style={{
                color: activeTab === tab ? '#f0f0f0' : '#7a7a7e',
                borderBottom: activeTab === tab ? '2px solid #5E6AD2' : '2px solid transparent',
                marginBottom: '-1px',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              {tab === 'inbox' ? 'Inbox' : 'Activity'}
              {tab === 'inbox' && (
                <span className="text-[9.5px]" style={{ color: '#7a7a7e', fontFamily: 'Arial, sans-serif' }}>
                  {inboxItems.filter(i => i.unread).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'inbox' && (
            <div>
              {inboxItems.map(item => (
                <div key={item.id} className="flex gap-3 px-5 py-3.5 cursor-pointer transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0f0f0f'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: item.unread ? '#fbbf24' : '#555558' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <span className="text-[13px] font-medium" style={{ color: item.unread ? '#f0f0f0' : '#b8b8bc' }}>
                        {item.title}
                      </span>
                      <span className="text-[10.5px] flex-shrink-0" style={{ color: '#7a7a7e', fontFamily: 'Arial, sans-serif' }}>{item.time}</span>
                    </div>
                    <p className="text-[11.5px] leading-relaxed mb-2" style={{ color: '#7a7a7e' }}>{item.desc}</p>
                    <span className="text-[10px] px-2 py-0.5"
                      style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', color: '#7a7a7e', borderRadius: '4px' }}
                    >
                      {item.aspekt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <div className="px-5 pt-3.5 pb-2.5 text-[9.5px] uppercase tracking-[0.08em]" style={{ color: '#555558' }}>Activity</div>
              {activity.map(item => (
                <div key={item.id} className="flex gap-2.5 px-5 py-2 cursor-pointer transition-colors"
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0f0f0f'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] mt-0.5"
                    style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', color: item.iconColor }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[12px] leading-relaxed" style={{ color: '#b8b8bc' }}>
                      <span style={{ color: '#f0f0f0', fontWeight: 500 }}>{item.title}</span> {item.text}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: '#7a7a7e', fontFamily: 'Arial, sans-serif' }}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-[160px] flex-shrink-0 p-4 overflow-y-auto"
        style={{ background: '#0c0c0c', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
      >
        {[
          { label: 'Status', content: (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#4ade80' }} />
              <span className="text-[11.5px] text-[#f0f0f0]">Running</span>
            </div>
          )},
          { label: 'Owner', content: (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full" style={{ background: 'linear-gradient(135deg,#5E6AD2,#3A4299)' }} />
              <span className="text-[11.5px]" style={{ color: '#b8b8bc' }}>Finance team</span>
            </div>
          )},
          { label: 'Channel', content: (
            <div className="flex flex-wrap gap-1">
              {['Teams','Email'].map(c => (
                <span key={c} className="text-[10px] px-1.5 py-0.5 cursor-pointer transition-colors"
                  style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', color: '#b8b8bc', borderRadius: '4px' }}
                >
                  {c}
                </span>
              ))}
            </div>
          )},
          { label: 'Runtime', content: (
            <span className="text-[11px]" style={{ color: '#b8b8bc', fontFamily: "'DM Mono', monospace" }}>v2.4.1 · local</span>
          )},
        ].map(({ label, content }) => (
          <div key={label} className="mb-4">
            <div className="text-[9.5px] uppercase tracking-[0.08em] mb-2" style={{ color: '#7a7a7e' }}>{label}</div>
            {content}
          </div>
        ))}

        <div className="pt-3 mt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <a href="mailto:hello@aspekt.io?subject=Pause request"
            className="block text-[10.5px] leading-relaxed transition-colors"
            style={{ color: '#555558' }}
          >
            Need to pause an ASPEKT?{' '}
            <span className="text-[#5E6AD2] hover:text-[#8b97ff]">Contact us →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
