'use client';

import { useState } from 'react';
import {
  ExternalLink, Github, Linkedin, Send, Mail,
  Download, Instagram, CheckCircle2, AlertCircle, Loader2,
} from 'lucide-react';

const BOT_TOKEN = '8677474980:AAHLs0nccwvqbI04w-nuQUfBgJ5wgNelcRU';
const CHAT_ID = '5481016673';

const socialLinks = [
  { icon: <Linkedin size={18} strokeWidth={1.5} />, label: 'LinkedIn', link: 'https://www.linkedin.com/in/raximjon-tulaganov-448602347/' },
  { icon: <Github size={18} strokeWidth={1.5} />, label: 'GitHub', link: 'https://github.com/rax1mjon/' },
  { icon: <Send size={18} strokeWidth={1.5} />, label: 'Telegram', link: 'https://t.me/Raximjon_Tulaganov' },
  { icon: <Instagram size={18} strokeWidth={1.5} />, label: 'Instagram', link: 'https://www.instagram.com/raximjon_tulaganov/' },
];

const Footer = () => {
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.message) return;
    setStatus('loading');

    const text =
      `📩 *Yangi xabar — Portfolio*\n\n` +
      `👤 *Ism:* ${form.name}\n` +
      `📱 *Aloqa:* ${form.contact}\n\n` +
      `💬 *Xabar:*\n${form.message}`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
        }
      );
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        setForm({ name: '', contact: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <footer id="contact" className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/3 border border-white/8 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#00b8db] font-medium">
                  Muloqot
                </span>
              </div>
              <h3 className="text-white text-2xl font-bold tracking-tighter mb-1">
                Loyiha bormi?{' '}
                <span className="text-[#00f3ff]">Gaplashamiz.</span>
              </h3>
              <p className="text-gray-400 text-sm">
                Loyiha, hamkorlik yoki savol bo'lsa — yozing. 24 soat ichida javob beraman.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ismingiz *"
                  required
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00f3ff]/40 focus:bg-white/5 transition-all"
                />
                <input
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Telegram yoki telefon *"
                  required
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00f3ff]/40 focus:bg-white/5 transition-all"
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Xabaringiz *"
                required
                rows={4}
                className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00f3ff]/40 focus:bg-white/5 transition-all resize-none"
              />

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                  ${status === 'success'
                    ? 'bg-green-500/20 border border-green-500/30 text-green-400 cursor-default'
                    : status === 'error'
                    ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                    : 'bg-[#00f3ff]/10 border border-[#00f3ff]/20 text-[#00f3ff] hover:bg-[#00f3ff]/20 hover:-translate-y-0.5 active:translate-y-0'
                  }`}
              >
                {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                {status === 'success' && <CheckCircle2 size={16} />}
                {status === 'error'   && <AlertCircle size={16} />}
                {status === 'idle'    && <Send size={16} />}
                {status === 'loading' && 'Yuborilmoqda...'}
                {status === 'success' && 'Xabar yuborildi!'}
                {status === 'error'   && 'Xatolik yuz berdi'}
                {status === 'idle'    && 'Yuborish'}
              </button>
            </form>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-8">
            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4 text-gray-500">
                Ijtimoiy tarmoqlar
              </h4>
              <div className="flex flex-col gap-3">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/2 border border-white/5 group-hover:border-[#00f3ff]/20 group-hover:bg-[#00f3ff]/5 transition-all duration-300">
                      <span className="group-hover:scale-110 transition-transform duration-300 text-gray-600 group-hover:text-[#00f3ff]">
                        {item.icon}
                      </span>
                    </div>
                    <span className="text-[13px] font-medium">{item.label}</span>
                    <ExternalLink size={11} className="opacity-0 group-hover:opacity-40 transition-opacity ml-auto" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4 text-gray-500">
                Resume
              </h4>
              <a
                href="/Frontend_Resume.pdf"
                download="Raximjon_Tulaganov_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-white/2 border border-white/5 rounded-xl hover:border-[#00f3ff]/20 hover:bg-white/4 transition-all group"
              >
                <span className="text-gray-400 group-hover:text-white text-sm transition-colors">
                  Download CV (PDF)
                </span>
                <Download size={16} className="text-[#00f3ff]/60 group-hover:text-[#00f3ff] transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-400 text-xs">
            © 2026 Raximjon Tulaganov — Built with Next.js & TailwindCSS
          </p>
          <p className="text-gray-400 text-xs">
            Mathematics · English · Guitar · Calisthenics
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
