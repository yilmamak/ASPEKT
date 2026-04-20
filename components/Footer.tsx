'use client';

import { useLang } from '@/lib/LangContext';

const Footer = () => {
  const { t } = useLang();
  const isTR = t('footer_rights').includes('Tüm');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-12 sm:py-16 bg-[#0A0A0A] border-t border-[#1F1F1F]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <a href="/" className="flex items-center gap-2.5 hover-opacity">
              <img src="/favicon.svg" alt="ASPEKT" className="w-5 h-5" />
              <span className="text-[#F0F0F0] font-semibold text-lg tracking-tight">ASPEKT</span>
            </a>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#F0F0F0] mb-4">{isTR ? 'Hizmetler' : 'Services'}</h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollTo('quote')} className="text-sm text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors bg-transparent border-none cursor-pointer p-0">{isTR ? 'Teklif Al' : 'Get a Quote'}</button></li>
              <li><button onClick={() => scrollTo('system')} className="text-sm text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors bg-transparent border-none cursor-pointer p-0">{isTR ? 'Nasıl çalışır' : 'How it works'}</button></li>
              <li><button onClick={() => scrollTo('intake')} className="text-sm text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors bg-transparent border-none cursor-pointer p-0">{isTR ? 'Sektörler' : 'Sectors'}</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#F0F0F0] mb-4">{isTR ? 'Şirket' : 'Company'}</h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollTo('contact')} className="text-sm text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors bg-transparent border-none cursor-pointer p-0">{isTR ? 'İletişim' : 'Contact'}</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#F0F0F0] mb-4">{isTR ? 'Bağlan' : 'Connect'}</h3>
            <ul className="space-y-2">
              <li><a href="https://wa.me/905313164741" target="_blank" rel="noopener noreferrer" className="text-sm text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors">WhatsApp</a></li>
              <li><a href="mailto:info@aspektai.com" className="text-sm text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#1F1F1F] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a href="#privacy" className="text-xs text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors">{isTR ? 'Gizlilik' : 'Privacy'}</a>
            <a href="#terms" className="text-xs text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors">{isTR ? 'Koşullar' : 'Terms'}</a>
          </div>
          <p className="text-xs text-[#7A7A7E]">{t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
