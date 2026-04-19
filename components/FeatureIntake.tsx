'use client';

import { useState } from 'react';
import { Window } from '@/components/Window';

const SUB_FEATURES = [
  { id: '1.1', label: 'Finance & Accounting' },
  { id: '1.2', label: 'Legal' },
  { id: '1.3', label: 'Retail & E-commerce' },
  { id: '1.4', label: 'B2B Sales & Distribution' },
  { id: '1.5', label: 'Marketing & Agencies' },
  { id: '1.6', label: 'HR, Outsourcing & Payroll' },
  { id: '1.7', label: 'Logistics & Supply Chain' },
  { id: '1.8', label: 'Education & Online Courses' },
];

const BACKLOG = [
  { id: 'INV-2085', title: 'Supplier invoices — Q2 batch' },
  { id: 'CRM-2094', title: 'New leads from website form' },
  { id: 'HR-2092', title: 'CV screening — sales role' },
];

const PROCESSING = [
  { id: 'INV-2083', title: 'Reconciling GL accounts', progress: '47/120', color: 'bg-green-500', textColor: 'text-green-400' },
  { id: 'CRM-2087', title: 'Enriching contact data', progress: '89/124', color: 'bg-[#5E6AD2]', textColor: 'text-[#8b97ff]' },
  { id: 'LGL-2088', title: 'Contract clauses review', progress: '2 flagged', color: 'bg-yellow-500', textColor: 'text-yellow-400' },
];

const DONE = [
  { id: 'INV-2074', title: 'April AP batch' },
  { id: 'CRM-1912', title: 'Exhibitor lead batch' },
  { id: 'OPS-1991', title: 'Daily digest delivered' },
];

export function FeatureIntake() {
  const [activeTab, setActiveTab] = useState('1.1');

  return (
    <section id="intake" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-[#7A7A7E]">
              <span className="text-xs font-mono text-[#5E6AD2]">1.0</span>
              <span>Intake</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#f0f0f0] leading-tight tracking-tight">
              Make operations self-running
            </h2>
            <p className="text-lg text-[#7A7A7E] leading-relaxed">
              Turn emails, invoices, and manual requests into ASPEKTs — routed, processed, and completed without human intervention.
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

          {/* Window */}
          <div className="relative">
            <div className="absolute inset-0 -top-6 bg-gradient-to-b from-[#5E6AD2]/8 to-transparent blur-3xl pointer-events-none" />
            <Window
              rightSlot={<><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>Live</span></>}
            >
              {/* Kanban */}
              <div className="grid grid-cols-3 gap-2 p-3">
                {/* Backlog */}
                <div>
                  <div className="flex items-center justify-between px-0.5 mb-2">
                    <span className="text-[10.5px] font-medium text-[#B8B8BC]">Backlog</span>
                    <span className="text-[10px] font-mono text-[#7A7A7E]">8</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {BACKLOG.map(({ id, title }) => (
                      <div key={id} className="p-2 bg-[#141414] border border-[#1f1f1f] rounded-lg cursor-pointer hover:bg-[#1a1a1a] hover:border-white/10 hover:-translate-y-0.5 transition-all">
                        <p className="text-[9.5px] font-mono text-[#7A7A7E] mb-0.5">{id}</p>
                        <p className="text-[11px] text-[#f0f0f0] leading-snug">{title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Processing */}
                <div>
                  <div className="flex items-center justify-between px-0.5 mb-2">
                    <span className="text-[10.5px] font-medium text-[#B8B8BC]">Processing</span>
                    <span className="text-[10px] font-mono text-[#7A7A7E]">3</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {PROCESSING.map(({ id, title, progress, color, textColor }) => (
                      <div key={id} className="p-2 bg-[#141414] border border-[#5E6AD2]/20 rounded-lg cursor-pointer hover:bg-[#1a1a1a] hover:-translate-y-0.5 transition-all">
                        <p className="text-[9.5px] font-mono text-[#7A7A7E] mb-0.5">{id}</p>
                        <p className="text-[11px] text-[#f0f0f0] leading-snug mb-1.5">{title}</p>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1 h-1 rounded-full ${color} animate-pulse`} />
                          <span className={`text-[9.5px] font-mono ${textColor}`}>{progress}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Done */}
                <div>
                  <div className="flex items-center justify-between px-0.5 mb-2">
                    <span className="text-[10.5px] font-medium text-[#B8B8BC]">Done</span>
                    <span className="text-[10px] font-mono text-[#7A7A7E]">284</span>
                  </div>
                  <div className="flex flex-col gap-1.5 opacity-55">
                    {DONE.map(({ id, title }) => (
                      <div key={id} className="p-2 bg-[#141414]/60 border border-[#1f1f1f] rounded-lg cursor-pointer hover:opacity-80 transition-opacity">
                        <p className="text-[9.5px] font-mono text-[#7A7A7E] mb-0.5">{id}</p>
                        <p className="text-[11px] text-[#B8B8BC] line-through decoration-[#7A7A7E] leading-snug">{title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </Window>
          </div>
        </div>
      </div>
    </section>
  );
}
