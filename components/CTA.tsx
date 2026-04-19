'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, MessageSquare, Mail, Phone, MessageCircle } from 'lucide-react';

const inputClass = "w-full px-4 py-3 bg-[#141414] border border-[#2A2A2A] text-[#F0F0F0] text-sm placeholder-[#555558] focus:border-[#5E6AD2] focus:outline-none transition-colors";
const labelClass = "block text-xs text-[#9A9A9E] mb-2";
const hintClass = "text-xs text-[#555558] mb-2";

const RequiredStar = () => <span className="text-[#5E6AD2] ml-0.5">*</span>;

const CTA = () => {
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

  const handleSubmit = () => {
    const subject = encodeURIComponent(`ASPEKT Başvuru — ${form.company}`);
    const body = encodeURIComponent(
`ASPEKT — Yeni Başvuru

Firma: ${form.company}
Ad Soyad: ${form.name}
Ünvan: ${form.role}
E-posta: ${form.email}
Telefon: ${form.phone || 'Belirtilmedi'}

---

Kaç farklı manuel işlem var:
${form.taskCount}

Manuel görev detayı:
${form.taskDesc}

Sıklık ve süre:
${form.frequency}

Gecikmede ne olur (opsiyonel):
${form.consequences || 'Belirtilmedi'}`
    );
    window.location.href = `mailto:info@aspektai.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const isFormValid = !!(form.name && form.company && form.email && form.taskCount && form.taskDesc && form.frequency);

  return (
    <>
      {/* ── QUOTE SECTION ── */}
      <section id="quote" className="py-24 bg-[#0A0A0A] border-t border-[#1F1F1F]">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F0F0F0] leading-tight">
              The future runs on systems.<br />Yours starts today.
            </h2>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#F0F0F0] leading-tight mb-3">
                Let&apos;s build your first ASPEKT
              </h3>
              <p className="text-[#7A7A7E]">
                Tell us what your team does manually every day — or get on a call and walk us through it.
              </p>
            </div>

            {!mode && (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setMode('form')}
                  className="flex items-center gap-3 px-6 py-5 bg-[#141414] border border-[#1F1F1F] hover:border-[#5E6AD2] transition-colors duration-150 text-left group flex-1"
                >
                  <MessageSquare className="w-5 h-5 text-[#5E6AD2] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#F0F0F0]">Describe your workflow</p>
                    <p className="text-xs text-[#7A7A7E]">Short form — we&apos;ll scope it and get back to you</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7A7A7E] ml-auto group-hover:text-[#F0F0F0] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>

                <button
                  onClick={() => setMode('meeting')}
                  className="flex items-center gap-3 px-6 py-5 bg-[#141414] border border-[#1F1F1F] hover:border-[#5E6AD2] transition-colors duration-150 text-left group flex-1"
                >
                  <Calendar className="w-5 h-5 text-[#5E6AD2] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#F0F0F0]">Book a discovery call</p>
                    <p className="text-xs text-[#7A7A7E]">30 min — walk us through your operations live</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7A7A7E] ml-auto group-hover:text-[#F0F0F0] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
              </div>
            )}

            {mode === 'form' && !submitted && (
              <div className="space-y-5">
                <button onClick={() => setMode(null)} className="text-xs text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors">← Back</button>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First & last name<RequiredStar /></label>
                    <input type="text" className={inputClass} placeholder="Jane Smith"
                      value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Title / Role</label>
                    <input type="text" className={inputClass} placeholder="COO"
                      value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Company name<RequiredStar /></label>
                  <input type="text" className={inputClass} placeholder="Acme Logistics"
                    value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Email<RequiredStar /></label>
                    <input type="email" className={inputClass} placeholder="jane@company.com"
                      value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone <span className="text-[#555558]">(optional)</span></label>
                    <input type="tel" className={inputClass} placeholder="+90 555 000 00 00"
                      value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>How many different manual processes does your team handle regularly?<RequiredStar /></label>
                  <p className={hintClass}>Give a rough number — we&apos;ll map them together.</p>
                  <input type="text" className={inputClass} placeholder="e.g. 3–5 main processes"
                    value={form.taskCount} onChange={e => setForm({...form, taskCount: e.target.value})} />
                </div>

                <div>
                  <label className={labelClass}>What manual task takes the most time in your team right now?<RequiredStar /></label>
                  <p className={hintClass}>Think about something your team repeats every day or every week.</p>
                  <textarea rows={3} className={inputClass + " resize-none"}
                    placeholder="e.g. We manually match supplier invoices to purchase orders every morning..."
                    value={form.taskDesc} onChange={e => setForm({...form, taskDesc: e.target.value})} />
                </div>

                <div>
                  <label className={labelClass}>How often does this happen — and how long does it take each time?<RequiredStar /></label>
                  <p className={hintClass}>Be specific: daily, weekly, per transaction? How many people are involved?</p>
                  <textarea rows={2} className={inputClass + " resize-none"}
                    placeholder="Daily, ~2 hours across 3 people"
                    value={form.frequency} onChange={e => setForm({...form, frequency: e.target.value})} />
                </div>

                <div>
                  <label className={labelClass}>What goes wrong when this task is delayed? <span className="text-[#555558]">(optional)</span></label>
                  <p className={hintClass}>This helps us understand the actual cost — not just the time lost.</p>
                  <textarea rows={2} className={inputClass + " resize-none"}
                    placeholder="Payments get delayed, suppliers follow up..."
                    value={form.consequences} onChange={e => setForm({...form, consequences: e.target.value})} />
                </div>

                <button onClick={handleSubmit} disabled={!isFormValid}
                  className="px-6 py-3 text-sm font-medium text-[#0A0A0A] bg-[#F0F0F0] rounded-[6px] hover:bg-white transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed">
                  Submit
                </button>
              </div>
            )}

            {mode === 'meeting' && (
              <div>
                <button onClick={() => setMode(null)} className="text-xs text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors mb-6 block">← Back</button>
                {!calendlyOpen ? (
                  <div className="bg-[#141414] border border-[#1F1F1F] p-8 text-center">
                    <Calendar className="w-8 h-8 text-[#5E6AD2] mx-auto mb-4" />
                    <p className="text-sm text-[#7A7A7E] mb-6">
                      Pick a time — we&apos;ll walk through your operations together and scope a system on the call.
                    </p>
                    <button onClick={() => setCalendlyOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#0A0A0A] bg-[#F0F0F0] rounded-[6px] hover:bg-white transition-colors duration-150">
                      <Calendar className="w-4 h-4" /> Schedule a call
                    </button>
                    <p className="text-xs text-[#7A7A7E] mt-4">30 minutes · No preparation needed</p>
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
                <p className="text-sm font-medium text-[#F0F0F0] mb-2">Received.</p>
                <p className="text-sm text-[#7A7A7E]">
                  We&apos;ll review your workflow and come back with a scoping proposal within 2 business days.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section id="contact" className="py-20 bg-[#0A0A0A] border-t border-[#1F1F1F]">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#F0F0F0] mb-3">Contact</h2>
            <p className="text-[#7A7A7E] max-w-md">Prefer to reach out directly? We&apos;re available through multiple channels.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {/* Email */}
            <a href="mailto:info@aspektai.com"
              className="flex items-start gap-4 p-5 bg-[#141414] border border-[#1F1F1F] hover:border-[#5E6AD2] transition-colors duration-150 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-[#5E6AD2]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F0F0F0] mb-1">Email</p>
                <p className="text-xs text-[#7A7A7E] group-hover:text-[#B8B8BC] transition-colors">info@aspektai.com</p>
                <p className="text-xs text-[#555558] mt-1">We reply within 24h</p>
              </div>
            </a>

            {/* Phone */}
            <a href="tel:+905426994565"
              className="flex items-start gap-4 p-5 bg-[#141414] border border-[#1F1F1F] hover:border-[#5E6AD2] transition-colors duration-150 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-[#4ade80]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F0F0F0] mb-1">Phone</p>
                <p className="text-xs text-[#7A7A7E] group-hover:text-[#B8B8BC] transition-colors">+90 542 699 45 65</p>
                <p className="text-xs text-[#555558] mt-1">Tap to call directly</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/905313164741" target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 bg-[#141414] border border-[#1F1F1F] hover:border-[#5E6AD2] transition-colors duration-150 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-[#4ade80]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F0F0F0] mb-1">WhatsApp</p>
                <p className="text-xs text-[#7A7A7E] group-hover:text-[#B8B8BC] transition-colors">+90 531 316 47 41</p>
                <p className="text-xs text-[#555558] mt-1">Quick questions welcome</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes expandDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default CTA;
