'use client';

const aspekts = [
  { id: 'INV', name: 'Invoice intake',   desc: 'Processes supplier invoices, matches to POs, flags anomalies.',              status: 'running', lastRun: '2 min ago', channel: 'Teams', count: '847 today' },
  { id: 'CRM', name: 'Lead enrichment',  desc: 'Enriches new CRM leads with company data and contact details.',              status: 'running', lastRun: '5 min ago', channel: 'Email', count: '124 updated' },
  { id: 'LGL', name: 'Contract review',  desc: 'Scans contracts for non-standard clauses and flags for legal.',              status: 'flagged', lastRun: '1 hr ago',  channel: 'Email', count: '2 flagged' },
  { id: 'HR',  name: 'HR onboarding',    desc: 'Automates new hire document collection and task assignment.',                status: 'idle',    lastRun: '3 hr ago',  channel: 'Slack', count: '—' },
];

const statusConfig = {
  running: { dot: '#4ade80', label: 'Running',  bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.2)'  },
  flagged: { dot: '#fbbf24', label: 'Flagged',  bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
  idle:    { dot: '#555558', label: 'Idle',     bg: 'rgba(85,85,88,0.08)',   border: 'rgba(85,85,88,0.2)'   },
};

export default function AspektsPage() {
  return (
    <div className="p-6 max-w-[680px] overflow-y-auto">
      <div className="mb-5">
        <h1 className="text-[14.5px] font-semibold text-[#f0f0f0] mb-1">My ASPEKTs</h1>
        <p className="text-[11.5px]" style={{ color: '#7a7a7e' }}>All ASPEKTs running in your workspace.</p>
      </div>

      <div className="space-y-2">
        {aspekts.map(a => {
          const sc = statusConfig[a.status as keyof typeof statusConfig];
          return (
            <div key={a.id} className="p-4 cursor-pointer transition-all duration-150"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: '#0c0c0c', borderRadius: '9px' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#0f0f0f';
                el.style.borderColor = 'rgba(255,255,255,0.10)';
                el.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#0c0c0c';
                el.style.borderColor = 'rgba(255,255,255,0.06)';
                el.style.transform = 'none';
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: sc.dot }} />
                    <span className="text-[13.5px] font-medium text-[#f0f0f0]">{a.name}</span>
                    <span className="text-[10px]" style={{ color: '#555558', fontFamily: 'Arial, sans-serif' }}>{a.id}</span>
                  </div>
                  <p className="text-[11.5px] leading-relaxed mb-2.5" style={{ color: '#7a7a7e' }}>{a.desc}</p>
                  <div className="flex items-center gap-4 text-[10.5px]" style={{ color: '#7a7a7e' }}>
                    <span>Last run: {a.lastRun}</span>
                    <span>Channel: {a.channel}</span>
                    <span style={{ fontFamily: 'Arial, sans-serif' }}>{a.count}</span>
                  </div>
                </div>

                <div className="flex-shrink-0 flex flex-col items-end gap-3">
                  <span className="text-[10px] px-2 py-0.5 font-medium"
                    style={{ color: sc.dot, background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: '4px' }}
                  >
                    {sc.label}
                  </span>

                  <a href="mailto:hello@aspekt.io?subject=Pause request"
                    className="text-[12px] font-medium transition-colors mt-3"
                    style={{ color: '#5E6AD2' }}
                    onClick={e => e.stopPropagation()}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#8b97ff'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E6AD2'}
                  >
                    Contact to pause →
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
