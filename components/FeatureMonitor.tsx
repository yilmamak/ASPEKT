'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LangContext';
import { Window } from '@/components/Window';

const ranges = ['Daily', 'Weekly', 'Monthly', '3M', '6M', '1Y', 'All time'] as const;
type Range = typeof ranges[number];

const DATA: Record<Range, { aspekts: string; timeSaved: string; costSaved: string; errorRate: string; flagged: string; uptime: string }> = {
  'Daily':    { aspekts: '847',     timeSaved: '6.7h',   costSaved: '€600',    errorRate: '0.3%', flagged: '3',   uptime: '99.7%' },
  'Weekly':   { aspekts: '5,920',   timeSaved: '47h',    costSaved: '€4,200',  errorRate: '0.4%', flagged: '14',  uptime: '99.5%' },
  'Monthly':  { aspekts: '25,480',  timeSaved: '203h',   costSaved: '€18,000', errorRate: '0.3%', flagged: '58',  uptime: '99.6%' },
  '3M':       { aspekts: '76,440',  timeSaved: '612h',   costSaved: '€54,000', errorRate: '0.4%', flagged: '174', uptime: '99.4%' },
  '6M':       { aspekts: '152,880', timeSaved: '1,224h', costSaved: '€108k',   errorRate: '0.4%', flagged: '347', uptime: '99.5%' },
  '1Y':       { aspekts: '305,760', timeSaved: '2,446h', costSaved: '€216k',   errorRate: '0.3%', flagged: '695', uptime: '99.6%' },
  'All time': { aspekts: '412,300', timeSaved: '3,298h', costSaved: '€291k',   errorRate: '0.4%', flagged: '938', uptime: '99.5%' },
};

const CHART_PTS_MAP: Record<Range, [number, number][]> = {
  'Daily':    [[0,72],[9,65],[18,58],[27,62],[36,45],[45,38],[54,42],[63,28],[72,32],[81,16],[90,22],[100,9]],
  'Weekly':   [[0,68],[9,60],[18,55],[27,58],[36,42],[45,35],[54,40],[63,25],[72,30],[81,14],[90,20],[100,8]],
  'Monthly':  [[0,80],[9,72],[18,65],[27,60],[36,50],[45,40],[54,35],[63,22],[72,18],[81,10],[90,8],[100,4]],
  '3M':       [[0,85],[9,78],[18,70],[27,65],[36,55],[45,45],[54,38],[63,28],[72,20],[81,12],[90,7],[100,3]],
  '6M':       [[0,88],[9,80],[18,74],[27,68],[36,58],[45,48],[54,40],[63,30],[72,22],[81,14],[90,8],[100,2]],
  '1Y':       [[0,90],[9,82],[18,76],[27,70],[36,60],[45,50],[54,42],[63,32],[72,24],[81,16],[90,9],[100,2]],
  'All time': [[0,92],[9,84],[18,78],[27,72],[36,62],[45,52],[63,34],[72,26],[81,18],[90,10],[100,1]],
};

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

export function FeatureMonitor() {
  const { t } = useLang();
  const [range, setRange] = useState<Range>('Weekly');
  const data = DATA[range];
  const pts = CHART_PTS_MAP[range];
  const linePath = smoothPath(pts);
  const areaPath = linePath + ' L 100,100 L 0,100 Z';

  const statCards = [
    { label: 'ASPEKTs completed', value: data.aspekts, color: '#f0f0f0', highlight: false },
    { label: 'Time saved',        value: data.timeSaved, color: '#5E6AD2', highlight: true },
    { label: 'Cost saved',        value: data.costSaved, color: '#5E6AD2', highlight: true },
    { label: 'Error rate',        value: data.errorRate, color: '#4ade80', highlight: false },
    { label: 'Flagged',           value: data.flagged,   color: '#fbbf24', highlight: false },
    { label: 'Uptime',            value: data.uptime,    color: '#f0f0f0', highlight: false },
  ];

  return (
    <section id="monitor" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Window — sol */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 -top-6 bg-gradient-to-b from-[#5E6AD2]/8 to-transparent blur-3xl pointer-events-none" />
            <Window
              leftSlot={<span className="text-[11px] text-[#7A7A7E]">Reports</span>}
              rightSlot={<span className="text-[#7A7A7E]">Live data</span>}
            >
              <div className="p-4">
                {/* Range selector */}
                <div className="flex gap-px mb-5 p-0.5 w-fit"
                  style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '7px', background: '#0c0c0c' }}
                >
                  {ranges.map(r => (
                    <button key={r} onClick={() => setRange(r)}
                      className="px-2.5 py-1 text-[10.5px] font-medium transition-colors"
                      style={{
                        borderRadius: '5px',
                        color: range === r ? '#f0f0f0' : '#7A7A7E',
                        background: range === r ? '#1a1a1a' : 'transparent',
                        border: 'none', cursor: 'pointer',
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                {/* SVG Line Chart — üstte geniş */}
                <div className="mb-5 p-3"
                  style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', background: '#0c0c0c' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11.5px] font-medium text-[#B8B8BC]">ASPEKTs over time</span>
                    <span className="text-[10px] text-[#7A7A7E]" style={{ fontFamily: 'Arial, sans-serif' }}>{range}</span>
                  </div>
                  <div style={{ height: '120px', position: 'relative' }}>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                      <defs>
                        <linearGradient id="monGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="#5E6AD2" stopOpacity="0.22"/>
                          <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      {[25, 50, 75].map(y => (
                        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.4"/>
                      ))}
                      <path d={areaPath} fill="url(#monGrad)" style={{ transition: 'all 0.4s ease' }}/>
                      <path d={linePath} fill="none" stroke="#5E6AD2" strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ transition: 'all 0.4s ease' }}/>
                    </svg>
                  </div>
                  <div className="flex justify-between mt-1.5 text-[9.5px] text-[#555558]" style={{ fontFamily: 'Arial, sans-serif' }}>
                    <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span>
                  </div>
                </div>

                {/* Stat cards — altta */}
                <div className="grid grid-cols-3 gap-2">
                  {statCards.map(card => (
                    <div key={card.label} className="p-2.5 cursor-pointer transition-all duration-150"
                      style={{
                        border: card.highlight ? '1px solid rgba(94,106,210,0.2)' : '1px solid rgba(255,255,255,0.06)',
                        background: card.highlight ? 'rgba(94,106,210,0.05)' : '#0c0c0c',
                        borderRadius: '7px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div className="text-[18px] font-semibold mb-0.5" style={{ color: card.color, letterSpacing: '-0.02em', transition: 'all 0.3s ease' }}>
                        {card.value}
                      </div>
                      <div className="text-[9.5px] text-[#7A7A7E]">{card.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Window>
          </div>

          {/* Text — sağ */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-2 text-sm text-[#7A7A7E]">
              <span className="text-xs font-mono text-[#5E6AD2]">4.0</span>
              <span>Monitor</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#f0f0f0] leading-tight tracking-tight">
              Full visibility. Zero micromanagement.
            </h2>
            <p className="text-lg text-[#7A7A7E] leading-relaxed">
              Every aspekt logged. Every exception flagged. Everything visible on your dashboard — you see it all, touch nothing.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
