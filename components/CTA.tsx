'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, MessageSquare, Mail, Phone, MessageCircle } from 'lucide-react';
import { useLang } from '@/lib/LangContext';

const RequiredStar = () => <span className="text-[#5E6AD2] ml-0.5">*</span>;

const CTA = () => {
  const { t, lang } = useLang();
  const [mode, setMode] = useState<'form' | 'meeting' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [form, setForm] = useState({
    name: '', role: '', company: '', email: '', phone: '',
    taskCount: '', taskDesc: '', frequency: '', consequences: '',
  });

  useEffect(() => {
    if (calendlyOpen) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
      return () => { document.head.removeChild(script); };
    }
  }, [calendlyOpen]);

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleSubmit = async () => {
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      });
      if (!res.ok) throw new Error('failed');
      setSubmitted(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const isValid = !!(form.name && form.company && form.email && form.taskCount && form.taskDesc && form.frequency);
  const inputClass = "w-full px-4 py-3 bg-[#141414] border border-[#2A2A2A] text-[#F0F0F0] text-sm placeholder-[#555558] focus:border-[#5E6AD2] focus:outline-none transition-colors";
  const labelClass = "block text-xs text-[#9A9A9E] mb-2";
  const hintClass = "text-xs text-[#555558] mb-2";

  return (
    <>
      <section id="quote" className="py-20 sm:py-24 bg-[#0A0A0A] border-t border-[#1F1F1F]">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-[#F0F0F0] leading-tight">
              {t('cta_headline')}<br />{t('cta_headline_2')}
            </h2>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="mb-8">
              <h3 className="text-xl sm:text-3xl font-semibold text-[#F0F0F0] leading-tight mb-3">{t('cta_sub_title')}</h3>
              <p className="text-[#7A7A7E]">{t('cta_sub_desc')}</p>
            </div>

            {!mode && (
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setMode('form')}
                  className="flex items-center gap-3 px-6 py-5 bg-[#141414] border border-[#1F1F1F] hover:border-[#5E6AD2] transition-colors text-left group flex-1">
                  <MessageSquare className="w-5 h-5 text-[#5E6AD2] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#F0F0F0]">{t('cta_form_label')}</p>
                    <p className="text-xs text-[#7A7A7E]">{t('cta_form_desc')}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7A7A7E] ml-auto group-hover:text-[#F0F0F0] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
                <button onClick={() => setMode('meeting')}
                  className="flex items-center gap-3 px-6 py-5 bg-[#141414] border border-[#1F1F1F] hover:border-[#5E6AD2] transition-colors text-left group flex-1">
                  <Calendar className="w-5 h-5 text-[#5E6AD2] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#F0F0F0]">{t('cta_meeting_label')}</p>
                    <p className="text-xs text-[#7A7A7E]">{t('cta_meeting_desc')}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7A7A7E] ml-auto group-hover:text-[#F0F0F0] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
              </div>
            )}

            {mode === 'form' && !submitted && (
              <div className="space-y-5">
                <button onClick={() => setMode(null)} className="text-xs text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors">{t('cta_back')}</button>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t('form_name')}<RequiredStar /></label>
                    <input type="text" className={inputClass} placeholder={t('ph_name')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>{t('form_role')}</label>
                    <input type="text" className={inputClass} placeholder={t('ph_role')} value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{t('form_company')}<RequiredStar /></label>
                  <input type="text" className={inputClass} placeholder={t('ph_company')} value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t('form_email')}<RequiredStar /></label>
                    <input type="email" className={inputClass} placeholder={t('ph_email')} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    {form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && <p className="text-[10px] text-red-400 mt-1">{lang === 'tr' ? 'Geçerli bir e-posta adresi girin' : 'Please enter a valid email address'}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>{t('form_phone')} <span className="text-[#555558]">{t('form_phone_optional')}</span></label>
                    <input type="tel" className={inputClass} placeholder={t('ph_phone')} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{t('form_task_count')}<RequiredStar /></label>
                  <p className={hintClass}>{t('form_task_count_hint')}</p>
                  <input type="text" className={inputClass} placeholder={t('ph_task_count')} value={form.taskCount} onChange={e => setForm({...form, taskCount: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>{t('form_task_desc')}<RequiredStar /></label>
                  <p className={hintClass}>{t('form_task_desc_hint')}</p>
                  <textarea rows={3} className={inputClass + " resize-none"} placeholder={t('ph_task_desc')} value={form.taskDesc} onChange={e => setForm({...form, taskDesc: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>{t('form_frequency')}<RequiredStar /></label>
                  <p className={hintClass}>{t('form_frequency_hint')}</p>
                  <textarea rows={2} className={inputClass + " resize-none"} placeholder={t('ph_frequency')} value={form.frequency} onChange={e => setForm({...form, frequency: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>{t('form_consequences')} <span className="text-[#555558]">{t('form_optional')}</span></label>
                  <p className={hintClass}>{t('form_consequences_hint')}</p>
                  <textarea rows={2} className={inputClass + " resize-none"} placeholder={t('ph_consequences')} value={form.consequences} onChange={e => setForm({...form, consequences: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <button onClick={handleSubmit} disabled={!isValid || sending}
                    className="px-6 py-3 text-sm font-medium text-[#0A0A0A] bg-[#F0F0F0] rounded-[6px] hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                    {sending ? (
                      <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#0a0a0a" strokeWidth="3" strokeDasharray="30 70"/></svg>{lang === 'tr' ? 'Gönderiliyor...' : 'Sending...'}</>
                    ) : t('form_submit')}
                  </button>
                  {sendError && <p className="text-xs text-red-400">{lang === 'tr' ? 'Gönderilemedi. E-posta adresinizi kontrol edip tekrar deneyin.' : 'Could not send. Please check your email address and try again.'}</p>}
                </div>
              </div>
            )}

            {mode === 'meeting' && (
              <div>
                <button onClick={() => setMode(null)} className="text-xs text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors mb-6 block">{t('cta_back')}</button>
                {!calendlyOpen ? (
                  <div className="bg-[#141414] border border-[#1F1F1F] p-8 text-center">
                    <Calendar className="w-8 h-8 text-[#5E6AD2] mx-auto mb-4" />
                    <p className="text-sm text-[#7A7A7E] mb-6">{t('meeting_desc')}</p>
                    <button onClick={() => setCalendlyOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#0A0A0A] bg-[#F0F0F0] rounded-[6px] hover:bg-white transition-colors">
                      <Calendar className="w-4 h-4" /> {t('meeting_btn')}
                    </button>
                    <p className="text-xs text-[#7A7A7E] mt-4">{t('meeting_sub')}</p>
                  </div>
                ) : (
                  <div className="border border-[#1F1F1F] overflow-hidden" style={{ animation: 'expandDown 0.4s ease-out' }}>
                    <div className="calendly-inline-widget" data-url="https://calendly.com/aspektai"
                      style={{ minWidth: '320px', height: '700px', background: '#141414' }} />
                  </div>
                )}
              </div>
            )}

            {submitted && (
              <div className="bg-[#141414] border border-[#1F1F1F] p-8">
                <p className="text-sm font-medium text-[#F0F0F0] mb-2">{t('form_received_title')}</p>
                <p className="text-sm text-[#7A7A7E]">{t('form_received_desc')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-20 bg-[#0A0A0A] border-t border-[#1F1F1F]">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#F0F0F0] mb-3">{t('contact_title')}</h2>
            <p className="text-[#7A7A7E] max-w-md">{t('contact_desc')}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="mailto:info@aspektai.com"
              className="flex items-start gap-4 p-5 bg-[#141414] border border-[#1F1F1F] hover:border-[#5E6AD2] transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-[#5E6AD2]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F0F0F0] mb-1">{t('contact_email_label')}</p>
                <p className="text-xs text-[#7A7A7E] group-hover:text-[#B8B8BC] transition-colors">info@aspektai.com</p>
                <p className="text-xs text-[#555558] mt-1">{t('contact_email_sub')}</p>
              </div>
            </a>
            <a href="tel:+905426994565"
              className="flex items-start gap-4 p-5 bg-[#141414] border border-[#1F1F1F] hover:border-[#5E6AD2] transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-[#4ade80]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F0F0F0] mb-1">{t('contact_phone_label')}</p>
                <p className="text-xs text-[#7A7A7E] group-hover:text-[#B8B8BC] transition-colors">+90 542 699 45 65</p>
                <p className="text-xs text-[#555558] mt-1">{t('contact_phone_sub')}</p>
              </div>
            </a>
            <a href="https://wa.me/905313164741" target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 bg-[#141414] border border-[#1F1F1F] hover:border-[#5E6AD2] transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-[#4ade80]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F0F0F0] mb-1">{t('contact_wa_label')}</p>
                <p className="text-xs text-[#7A7A7E] group-hover:text-[#B8B8BC] transition-colors">+90 531 316 47 41</p>
                <p className="text-xs text-[#555558] mt-1">{t('contact_wa_sub')}</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes expandDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
};

export default CTA;
