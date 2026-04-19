'use client';

import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Services',    action: () => scrollTo('intake') },
    { label: 'Sectors',     action: () => scrollTo('intake') },
    { label: 'Get a Quote', action: () => scrollTo('quote') },
    // Clients gizli — sonra açılacak
    { label: 'Contact',     action: () => scrollTo('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'glass-nav border-b border-[#1F1F1F]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <a href="/" className="text-[#F0F0F0] font-semibold text-lg tracking-tight hover-opacity">
            ASPEKT
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="px-3 py-1.5 text-sm text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors duration-150 bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('quote')}
              className="px-4 py-2 text-sm font-medium text-[#0A0A0A] bg-[#F0F0F0] rounded-[6px] hover:bg-white transition-colors duration-150 cursor-pointer border-none"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
