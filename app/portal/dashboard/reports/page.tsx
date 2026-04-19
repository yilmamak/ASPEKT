'use client';

import { useState } from 'react';

const ranges = ['Daily', 'Weekly', 'Monthly', '3M', '6M', '1Y', 'All time'] as const;
type Range = typeof ranges[number];

const mockData: Record<Range, { aspekts: string; timeSaved: string; costSaved: string; errorRate: string; flagged: string; uptime: string }> = {
  'Daily':    { aspekts: '847',     timeSaved: '6.7h',   costSaved: '€600',    errorRate: '0.3%', flagged: '3',   uptime: '99.7%' },
  'Weekly':   { aspekts: '5,920',   timeSaved: '47h',    costSaved: '€4,200',  errorRate: '0.4%', flagged: '14',  uptime: '99.5%' },
  'Monthly':  { aspekts: '25,480',  timeSaved: '203h',   costSaved: '€18,000', errorRate: '0.3%', flagged: '58',  uptime: '99.6%' },
  '3M':       { aspekts: '76,440',  timeSaved: '612h',   costSaved: '€54,000', errorRate: '0.4%', flagged: '174', uptime: '99.4%' },
  '6M':       { aspekts: '152,880', timeSaved: '1,224h', costSaved: '€108k',   errorRate: '0.4%', flagged: '347', uptime: '99.5%' },
  '1Y':       { aspekts: '305,760', timeSaved: '2,446h', costSaved: '€216k',   errorRate: '0.3%', flagged: '695', uptime: '99.6%' },
  'All time': { aspekts: '412,300', timeSaved: '3,298h', costSaved: '€291k',   errorRate: '0.4%', flagged: '938', uptime: '99.5%' },
};

// Smooth SVG path helper
const CHART_PTS: [number, number][] = [
  [0,72],[9,65],[18,58],[27,62],[36,45],[45,38],[54,42],[63,28],[72,32],[81,16],[90,22],[100,9]
];

function smoothPath(pts: [number, number][], tension = 0.28): string {
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = (p1[0] + (p2[0] - p0[0]) * tension).toFixed(2);
    const c1y = (p1[1] + (p2[1] - p0[1]) * tension).toFixed(2);
    const c2x = (p2[0] - (p3[0] - p1[0]) * tension).toFixed(2);
    const c2y = (p2[1] - (p3[1] - p1[1]) * tension).toFixed(2);
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const linePath = smoothPath(CHART_PTS);
const areaPath = linePath + ' L 100,100 L 0,100 Z';

export default function ReportsPage() {
  const [range, setRange] = useState<Range>('Weekly');
  const data = mockData[range];

  const statCards = [
    { label: 'ASPEKTs completed', value: data.aspekts, color: '#f0f0f0', highlight: false },
    { label: 'Time saved',        value: data.timeSaved, color: '#5E6AD2', highlight: true },
    { label: 'Cost saved',        value: data.costSaved, color: '#5E6AD2', highlight: true },
    { label: 'Error rate',        value: data.errorRate, color: '#4ade80', highlight: false },
    { label: 'Flagged',           value: data.flagged,   color: '#fbbf24', highlight: false },
    { label: 'Uptime',            value: data.uptime,    color: '#f0f0f0', highlight: false },
  ];

  return (
    <div className="p-6 max-w-[680px] overflow-y-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[14.5px] font-semibold text-[#f0f0f0] mb-1">Reports</h1>
        <p className="text-[11.5px]" style={{ color: '#7a7a7e' }}>Performance overview for your ASPEKT system.</p>
      </div>

      {/* Range selector */}
      <div className="flex gap-px mb-6 p-0.5 w-fit"
        style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '7px', background: '#0c0c0c' }}
      >
        {ranges.map(r => (
          <button key={r} onClick={() => setRange(r)}
            className="px-3 py-1.5 text-[11.5px] font-medium transition-colors"
            style={{
              borderRadius: '5px',
              color: range === r ? '#f0f0f0' : '#7a7a7e',
              background: range === r ? '#1a1a1a' : 'transparent',
              border: 'none', cursor: 'pointer',
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* SVG Line Chart — ÜSTTE, GENİŞ */}
      <div className="mb-6 p-4"
        style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', background: '#0c0c0c' }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12.5px] font-medium" style={{ color: '#b8b8bc' }}>ASPEKTs over time</span>
          <span className="text-[10.5px]" style={{ color: '#7a7a7e', fontFamily: 'Arial, sans-serif' }}>{range}</span>
        </div>
        <div className="relative" style={{ height: '160px' }}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {[25, 50, 75].map(y => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.4"/>
            ))}
            <path d={areaPath} fill="url(#chartGrad)" className="transition-opacity hover:opacity-60"/>
            <path d={linePath} fill="none" stroke="#5E6AD2" strokeWidth="1" vectorEffect="non-scaling-stroke"/>
          </svg>
        </div>
        <div className="flex justify-between mt-2 text-[10px]" style={{ color: '#555558', fontFamily: 'Arial, sans-serif' }}>
          <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span>
        </div>
      </div>

      {/* Stat cards — ALTTA */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {statCards.map(card => (
          <div key={card.label} className="p-3.5 cursor-pointer transition-all duration-150"
            style={{
              border: card.highlight ? '1px solid rgba(94,106,210,0.2)' : '1px solid rgba(255,255,255,0.06)',
              background: card.highlight ? 'rgba(94,106,210,0.04)' : '#0c0c0c',
              borderRadius: '8px',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = card.highlight ? 'rgba(94,106,210,0.4)' : 'rgba(255,255,255,0.10)';
              el.style.background = card.highlight ? 'rgba(94,106,210,0.08)' : '#0f0f0f';
              el.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = card.highlight ? 'rgba(94,106,210,0.2)' : 'rgba(255,255,255,0.06)';
              el.style.background = card.highlight ? 'rgba(94,106,210,0.04)' : '#0c0c0c';
              el.style.transform = 'none';
            }}
          >
            <div className="text-[22px] font-semibold mb-1" style={{ color: card.color, letterSpacing: '-0.02em' }}>
              {card.value}
            </div>
            <div className="text-[10px]" style={{ color: '#7a7a7e' }}>{card.label}</div>
          </div>
        ))}
      </div>

      <p className="text-[10.5px] leading-relaxed" style={{ color: '#555558' }}>
        Data shown is illustrative. Live reporting connects when your ASPEKT system is integrated.
      </p>
    </div>
  );
}
