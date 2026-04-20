'use client';

import { ReactNode } from 'react';

interface WindowProps {
  title?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Window({ title = 'ASPEKT', leftSlot, rightSlot, children, className = '' }: WindowProps) {
  return (
    <div className={`group relative bg-[#0f0f0f]/90 border border-[#1f1f1f] rounded-xl overflow-hidden shadow-[0_24px_80px_-16px_rgba(0,0,0,0.8),0_20px_80px_-20px_rgba(94,106,210,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_96px_-16px_rgba(0,0,0,0.9),0_20px_100px_-10px_rgba(94,106,210,0.28)] ${className}`}>
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5E6AD2]/8 via-transparent to-transparent pointer-events-none z-0 transition-all duration-500 group-hover:from-[#5E6AD2]/18" />

      {/* Chrome */}
      <div className="relative z-10 flex items-center px-3.5 py-2.5 bg-[#0c0c0c] border-b border-[#1f1f1f] gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] transition-[filter] group-hover:brightness-125" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] transition-[filter] group-hover:brightness-125" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] transition-[filter] group-hover:brightness-125" />
        </div>
        {leftSlot && <div className="flex items-center gap-1.5 text-[11px] text-[#7A7A7E]">{leftSlot}</div>}
        <div className="flex-1 flex items-center justify-center gap-1.5">
          <img src="/favicon.svg" alt="" className="w-3.5 h-3.5 opacity-80" />
          <span className="text-[12px] font-medium text-[#f0f0f0] font-sans">{title}</span>
        </div>
        {rightSlot && <div className="flex items-center gap-1.5 text-[11px] text-[#7A7A7E]">{rightSlot}</div>}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
