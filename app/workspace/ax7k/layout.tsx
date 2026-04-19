'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    label: 'Inbox',
    href: '/workspace/ax7k',
    badge: 3,
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
      </svg>
    ),
  },
  {
    label: 'My ASPEKTs',
    href: '/workspace/ax7k/aspekts',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
  },
  {
    label: 'Reports',
    href: '/workspace/ax7k/reports',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

const activeAspekts = [
  { label: 'Invoice intake',  color: '#4ade80' },
  { label: 'Lead enrichment', color: '#5E6AD2' },
  { label: 'Contract review', color: '#fbbf24' },
  { label: 'HR onboarding',   color: '#555558' },
];

const notifications = [
  { id: 1, text: 'VAT mismatch on INV-20847 — review required', time: '8 min ago', unread: true },
  { id: 2, text: 'Contract LGL-2088: 2 clauses flagged', time: '1 hr ago', unread: true },
  { id: 3, text: 'Lead enrichment paused — API limit reached', time: '3 hr ago', unread: false },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#080808', color: '#f0f0f0', fontFamily: 'Inter, sans-serif' }}>

      {/* Top bar */}
      <header className="h-11 flex items-center px-4 gap-3 flex-shrink-0 z-40 relative"
        style={{ background: '#0c0c0c', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>

        <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11.5px]" style={{ color: '#7a7a7e' }}>
          <span>Workspace</span>
          <span>/</span>
          <span style={{ color: '#b8b8bc' }}>Dashboard</span>
        </div>

        <div className="flex-1 text-center text-[12px] font-semibold tracking-[0.15em] text-[#f0f0f0] absolute left-1/2 -translate-x-1/2">
          ASPEKT
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Notif */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative flex items-center justify-center w-7 h-7 rounded-lg transition-colors"
              style={{ color: '#7a7a7e' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#141414'; (e.currentTarget as HTMLElement).style.color = '#f0f0f0'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#7a7a7e'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#5E6AD2] text-[9px] font-semibold text-white flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-10 w-[300px] z-50 overflow-hidden"
                style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '10px', boxShadow: '0 16px 48px rgba(0,0,0,0.7)' }}
              >
                <div className="px-4 py-2.5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-[12px] font-medium text-[#f0f0f0]">Actions required</span>
                  <span className="text-[10px]" style={{ color: '#7a7a7e', fontFamily: 'Arial, sans-serif' }}>{unread} unread</span>
                </div>
                {notifications.map(n => (
                  <div key={n.id} className="flex gap-2.5 px-4 py-2.5 cursor-pointer transition-colors"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#141414'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: n.unread ? '#fbbf24' : '#555558' }} />
                    <div>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: '#b8b8bc' }}>{n.text}</p>
                      <p className="text-[10px] mt-1" style={{ color: '#7a7a7e', fontFamily: 'Arial, sans-serif' }}>{n.time}</p>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <Link href="/workspace/ax7k" className="text-[11px] text-[#5E6AD2] hover:text-[#8b97ff] transition-colors" onClick={() => setNotifOpen(false)}>
                    View all in Inbox →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="w-6 h-6 rounded-full flex-shrink-0 cursor-pointer" style={{ background: 'linear-gradient(135deg, #5E6AD2, #3A4299)' }} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[180px] flex-shrink-0 flex flex-col overflow-y-auto"
          style={{ background: '#0c0c0c', borderRight: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="p-2 pt-2.5 flex-1">
            {/* Workspace */}
            <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
              <div className="w-5 h-5 rounded-[5px] flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(94,106,210,0.18)', border: '1px solid rgba(94,106,210,0.3)' }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5E6AD2" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-[11.5px] font-semibold text-[#f0f0f0]">Workspace</span>
            </div>

            {navItems.map(item => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-2 px-2 py-1.5 mb-0.5 text-[12px] transition-all duration-150"
                  style={{
                    borderRadius: '6px',
                    color: active ? '#f0f0f0' : '#7a7a7e',
                    background: active ? '#1a1a1a' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = '#141414'; (e.currentTarget as HTMLElement).style.color = '#b8b8bc'; (e.currentTarget as HTMLElement).style.transform = 'translateX(2px)'; } }}
                  onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#7a7a7e'; (e.currentTarget as HTMLElement).style.transform = 'none'; } }}
                >
                  <span style={{ color: active ? '#5E6AD2' : '#7a7a7e' }}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && <span className="ml-auto text-[9.5px]" style={{ color: '#7a7a7e', fontFamily: 'Arial, sans-serif' }}>{item.badge}</span>}
                </Link>
              );
            })}

            <div className="px-2 pt-3 pb-1 text-[9.5px] uppercase tracking-[0.08em]" style={{ color: '#555558' }}>Active</div>
            {activeAspekts.map(a => (
              <div key={a.label}
                className="flex items-center gap-2 px-2 py-1.5 mb-0.5 text-[11.5px] cursor-pointer transition-all duration-150"
                style={{ borderRadius: '6px', color: '#7a7a7e' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#141414'; (e.currentTarget as HTMLElement).style.color = '#b8b8bc'; (e.currentTarget as HTMLElement).style.transform = 'translateX(2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#7a7a7e'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.color }} />
                {a.label}
              </div>
            ))}
          </div>

          <div className="p-2.5 pb-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <Link href="/" className="flex items-center gap-2 text-[11px] transition-colors"
              style={{ color: '#555558' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#7a7a7e'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#555558'}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Back to site
            </Link>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
