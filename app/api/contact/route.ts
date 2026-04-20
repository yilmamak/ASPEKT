import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, company, email, phone, taskCount, taskDesc, frequency, consequences, lang } = body;

    const isTR = lang === 'tr';

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; }
    .header { background: #0a0a0a; padding: 24px 32px; }
    .header h1 { color: #f0f0f0; font-size: 20px; margin: 0; letter-spacing: 0.1em; }
    .header p { color: #7a7a7e; font-size: 13px; margin: 4px 0 0; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #7a7a7e; margin-bottom: 4px; }
    .value { font-size: 15px; color: #0a0a0a; line-height: 1.5; }
    .divider { height: 1px; background: #f0f0f0; margin: 24px 0; }
    .footer { background: #f8f8f8; padding: 16px 32px; font-size: 12px; color: #aaa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ASPEKT</h1>
      <p>${isTR ? 'Yeni başvuru alındı' : 'New application received'}</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">${isTR ? 'Şirket' : 'Company'}</div>
        <div class="value">${company}</div>
      </div>
      <div class="field">
        <div class="label">${isTR ? 'Ad Soyad' : 'Name'}</div>
        <div class="value">${name}${role ? ` — ${role}` : ''}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}" style="color:#5E6AD2">${email}</a></div>
      </div>
      ${phone ? `<div class="field"><div class="label">${isTR ? 'Telefon' : 'Phone'}</div><div class="value">${phone}</div></div>` : ''}
      <div class="divider"></div>
      <div class="field">
        <div class="label">${isTR ? 'Kaç farklı manuel süreç' : 'Number of manual processes'}</div>
        <div class="value">${taskCount}</div>
      </div>
      <div class="field">
        <div class="label">${isTR ? 'En çok zaman alan görev' : 'Main manual task'}</div>
        <div class="value">${taskDesc}</div>
      </div>
      <div class="field">
        <div class="label">${isTR ? 'Sıklık ve süre' : 'Frequency & duration'}</div>
        <div class="value">${frequency}</div>
      </div>
      ${consequences ? `<div class="field"><div class="label">${isTR ? 'Gecikme etkisi' : 'Impact of delays'}</div><div class="value">${consequences}</div></div>` : ''}
    </div>
    <div class="footer">
      ASPEKT · aspektai.com · ${new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
    </div>
  </div>
</body>
</html>`;

    const { data, error } = await resend.emails.send({
      from: 'ASPEKT <onboarding@resend.dev>',
      to: ['info@aspektai.com'],
      replyTo: email,
      subject: `${isTR ? 'Yeni Başvuru' : 'New Application'} — ${company}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Email send failed', details: error }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
