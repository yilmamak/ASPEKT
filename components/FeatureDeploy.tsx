'use client';

import { useState } from 'react';
import { Window } from '@/components/Window';

const SUB_FEATURES = [
  { id: '2.1', label: 'Process mapping' },
  { id: '2.2', label: 'Custom build' },
  { id: '2.3', label: 'Zero-footprint deployment' },
  { id: '2.4', label: 'Ongoing management' },
];

const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];

const BARS = [
  { label: 'Process audit',      start: 1, span: 1, bg: 'bg-green-500/25',    border: 'border-green-500/35',    text: 'text-green-200' },
  { label: 'System architecture',start: 2, span: 1, bg: 'bg-green-500/25',    border: 'border-green-500/35',    text: 'text-green-200' },
  { label: 'Build & test',       start: 3, span: 2, bg: 'bg-[#5E6AD2]/35',    border: 'border-[#5E6AD2]/50',    text: 'text-white' },
  { label: 'Deploy & handover',  start: 5, span: 1, bg: 'bg-[#1f1f1f]',       border: 'border-[#2a2a2a]',       text: 'text-[#B8B8BC]' },
  { label: 'Monitor & maintain', start: 6, span: 3, bg: 'bg-[#141414]',       border: 'border-[#1f1f1f]',       text: 'text-[#7A7A7E]' },
];

export function FeatureDeploy() {
  const [activeTab, setActiveTab] = useState('2.1');

  return (
    <section id="deploy" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Window */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 -top-6 bg-gradient-to-b from-[#5E6AD2]/8 to-transparent blur-3xl pointer-events-none" />
            <Window
              rightSlot={<span className="text-[#7A7A7E]">Custom scope · 8 weeks</span>}
            >
              <div className="flex">
                {/* Phases sidebar */}
                <div className="w-[145px] shrink-0 bg-[#0b0b0b] border-r border-[#1f1f1f] py-3 px-2">
                  <p className="text-[9.5px] text-[#555558] uppercase tracking-wider px-2 mb-2">Phases</p>
                  {[
                    { label: 'Phase 1 · Audit',   active: false },
                    { label: 'Phase 2 · Design',  active: false },
                    { label: 'Phase 3 · Build',   active: true  },
                    { label: 'Phase 4 · Deploy',  active: false },
                    { label: 'Ongoing',           active: false },
                  ].map(({ label, active }) => (
                    <div key={label} className={`px-2 py-1.5 text-[11px] rounded cursor-pointer transition-colors ${active ? 'bg-[#141414] text-[#f0f0f0]' : 'text-[#B8B8BC] hover:bg-[#1a1a1a]'}`}>
                      {label}
                    </div>
                  ))}

                  <p className="text-[9.5px] text-[#555558] uppercase tracking-wider px-2 mt-4 mb-2">Status</p>
                  {[
                    { label: 'Completed', value: '2', color: 'text-green-400' },
                    { label: 'Active',    value: '1', color: 'text-[#8b97ff]' },
                    { label: 'Pending',   value: '2', color: 'text-[#7A7A7E]' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex justify-between px-2 py-1 cursor-pointer hover:bg-[#1a1a1a] rounded transition-colors">
                      <span className="text-[11px] text-[#B8B8BC]">{label}</span>
                      <span className={`text-[11px] font-mono ${color}`}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Gantt */}
                <div className="flex-1 min-w-0 p-3 pr-4">
                  {/* Week header */}
                  <div className="grid grid-cols-8 border-b border-[#1f1f1f] pb-2 mb-3">
                    {WEEKS.map((w, i) => (
                      <div key={w} className={`text-[10px] text-center font-mono ${i === 2 || i === 3 ? 'text-[#5E6AD2]' : 'text-[#7A7A7E]'}`}>{w}</div>
                    ))}
                  </div>

                  {/* Bars */}
                  <div className="flex flex-col gap-2 relative">
                    {/* Today line */}
                    <div className="absolute top-0 bottom-0 w-px bg-[#5E6AD2]/40 pointer-events-none z-10" style={{ left: 'calc(37.5% + 1px)' }}>
                      <div className="absolute -top-1 -left-[3px] w-1.5 h-1.5 rounded-full bg-[#5E6AD2]" />
                    </div>
                    {BARS.map(({ label, start, span, bg, border, text }) => (
                      <div key={label} className="grid grid-cols-8 h-7 items-center relative">
                        <div
                          className={`${bg} ${border} border rounded px-2 flex items-center h-6 text-[10px] ${text} truncate cursor-pointer transition-[filter] hover:brightness-125`}
                          style={{ gridColumnStart: start, gridColumnEnd: `span ${span}` }}
                        >
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 pt-4 mt-3 border-t border-[#1f1f1f]">
                    {[
                      { color: 'bg-green-500/50', label: 'Completed' },
                      { color: 'bg-[#5E6AD2]/60', label: 'In progress' },
                      { color: 'bg-[#1f1f1f] border border-[#2a2a2a]', label: 'Pending' },
                    ].map(({ color, label }) => (
                      <div key={label} className="flex items-center gap-1.5 cursor-pointer">
                        <div className={`w-2 h-2 rounded-sm ${color}`} />
                        <span className="text-[10px] text-[#7A7A7E]">{label}</span>
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
              <span>Deploy</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#f0f0f0] leading-tight tracking-tight">
              From scoped to running — on your timeline
            </h2>
            <p className="text-lg text-[#7A7A7E] leading-relaxed">
              We map your process, build the system, and run it on a local server — no cloud dependency, no external exposure.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {SUB_FEATURES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveTab(f.id)}
                  className={`flex items-center gap-2 text-sm text-left transition-colors duration-150 ${activeTab === f.id ? 'text-[#f0f0f0]' : 'text-[#7A7A7E] hover:text-[#f0f0f0]'}`}
                >
                  <span className="text-xs font-mono text-[#7A7A7E]">{f.id}</span>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
