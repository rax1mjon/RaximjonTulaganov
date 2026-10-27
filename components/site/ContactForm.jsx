'use client';

import { useState } from 'react';

const TEXT = {
  uz: {
    name: 'Ismingiz', contact: 'Telegram yoki telefon', message: 'Xabaringiz', send: 'Yuborish', sending: 'Yuborilmoqda…',
    sent: "Xabar yuborildi. 24 soat ichida javob beraman.",
    invalid: "Ism, aloqa va kamida 5 harfli xabar yozing.",
    limited: "Juda ko'p urinish. Birozdan keyin qayta yuboring yoki Telegramda yozing.",
    failed: "Xabar yetib bormadi. Telegramda to'g'ridan-to'g'ri yozing.",
  },
  en: {
    name: 'Your name', contact: 'Telegram or phone', message: 'Your message', send: 'Send', sending: 'Sending…',
    sent: "Message sent. I'll reply within 24 hours.",
    invalid: 'Add your name, a way to reach you, and a message of at least 5 characters.',
    limited: 'Too many attempts. Try again later or message me on Telegram.',
    failed: "The message didn't go through. Message me on Telegram directly.",
  },
};

export default function ContactForm({ lang = 'uz' }) {
  const t = TEXT[lang];
  const [form, setForm] = useState({ name: '', contact: '', message: '', website: '' });
  const [state, setState] = useState('idle');

  const change = (e) => { setForm((f) => ({ ...f, [e.target.name]: e.target.value })); if (state !== 'sending') setState('idle'); };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || form.message.trim().length < 5) { setState('invalid'); return; }
    setState('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setState('sent'); setForm({ name: '', contact: '', message: '', website: '' }); return; }
      setState(res.status === 422 ? 'invalid' : res.status === 429 ? 'limited' : 'failed');
    } catch {
      setState('failed');
    }
  };

  const note = { sent: t.sent, invalid: t.invalid, limited: t.limited, failed: t.failed }[state];

  return (
    <form className="cform" onSubmit={submit} noValidate>
      <div className="cform-row">
        <label className="cfield"><span>{t.name}</span><input id="cf-name" name="name" value={form.name} onChange={change} maxLength={80} autoComplete="name" /></label>
        <label className="cfield"><span>{t.contact}</span><input id="cf-contact" name="contact" value={form.contact} onChange={change} maxLength={120} placeholder="@username" /></label>
      </div>
      <label className="cfield"><span>{t.message}</span><textarea id="cf-message" name="message" rows={4} value={form.message} onChange={change} maxLength={2000} /></label>
      <input className="hp" tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={change} aria-hidden="true" />
      <div className="cform-foot">
        <button className="btn btn-solid" type="submit" disabled={state === 'sending'} data-magnetic>{state === 'sending' ? t.sending : t.send}</button>
        {note && <p className={`cnote ${state === 'sent' ? 'ok' : 'bad'}`} role="status">{note}</p>}
      </div>
    </form>
  );
}
