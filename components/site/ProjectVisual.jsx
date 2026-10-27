'use client';

import { useEffect, useState } from 'react';

const NEWS = [
  ['Ish ruxsatnomasi: nima o’zgardi', 'Pul o’tkazish kursi bugun'],
  ['Иш рухсатномаси: нима ўзгарди', 'Пул ўтказиш курси бугун'],
  ['Патент на работу: что изменилось', 'Курс переводов сегодня'],
  ['Work permit: what changed', 'Remittance rate today'],
];
const LANGS = ['uz', 'ўз', 'ru', 'en'];

function Phone() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % 4), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <div className="phone par" data-speed="-4">
        <div className="phone-top">
          <span>MIGRANTLAR24</span>
          <span className="langs">{LANGS.map((l, k) => <span key={l} className={k === i ? 'on' : ''}>{l}</span>)}</span>
        </div>
        <div className="news"><div className="img" /><div className="news-title">{NEWS[i][0]}</div></div>
        <div className="news"><div className="img" /><div className="news-title">{NEWS[i][1]}</div></div>
      </div>
      <span className="float-chip par" data-speed="14" style={{ left: '8%', top: '16%' }}>4 til</span>
      <span className="float-chip par" data-speed="-10" style={{ right: '8%', bottom: '18%' }}>Telegram · Web · Video</span>
    </>
  );
}

function Windows({ roles }) {
  return (
    <>
      <div className="win w1 par" data-speed="-6">
        <div className="win-bar"><i /><i /><i />&nbsp; urtak.uz</div>
        <div className="win-body">
          <div className="bar" style={{ width: '70%' }} /><div className="bar" style={{ width: '45%' }} />
          <div className="bars">{[40, 65, 52, 88, 70].map((h) => <span key={h} style={{ height: `${h}%` }} />)}</div>
        </div>
      </div>
      <div className="win w2 par" data-speed="4">
        <div className="win-bar"><i /><i /><i />&nbsp; dashboard.urtak.uz</div>
        <div className="win-body">
          <div><span className="role">{roles[0]}</span><span className="role">{roles[2]}</span></div>
          <div className="bar" style={{ width: '90%' }} /><div className="bar" style={{ width: '60%' }} /><div className="bar" style={{ width: '75%' }} />
        </div>
      </div>
      <div className="win w3 par" data-speed="12">
        <div className="win-bar"><i /><i /><i />&nbsp; seller.urtak.uz</div>
        <div className="win-body">
          <div><span className="role">{roles[1]}</span><span className="role">{roles[3]}</span></div>
          <div className="bar" style={{ width: '55%' }} /><div className="bar" style={{ width: '80%' }} />
        </div>
      </div>
    </>
  );
}

function Wave({ seed }) {
  return (
    <span className="wave">
      {Array.from({ length: 12 }, (_, k) => <i key={k} style={{ animationDelay: `${((k * seed) % 10) / 10}s` }} />)}
    </span>
  );
}

function Chat() {
  return (
    <div className="chat">
      <div className="msg me par" data-speed="-6">qo'shiq nomi...</div>
      <div className="track-row par" data-speed="4"><span className="play">▶</span><Wave seed={3} /><span>0:42</span></div>
      <div className="track-row par" data-speed="8"><span className="play">▶</span><Wave seed={7} /><span>1:15</span></div>
      <div className="msg par" data-speed="12">Kategoriyalar · Yangi · Mashhur</div>
    </div>
  );
}

function Gauge({ caption }) {
  return (
    <div className="gauge">
      <svg viewBox="0 0 220 220">
        <circle cx="110" cy="110" r="96" fill="none" stroke="var(--line)" strokeWidth="10" />
        <circle id="gauge-arc" cx="110" cy="110" r="96" fill="none" stroke="var(--ok)" strokeWidth="10" strokeLinecap="round" strokeDasharray="603" strokeDashoffset="12" transform="rotate(-90 110 110)" />
      </svg>
      <div className="gauge-num"><span id="tbt">0</span> ms</div>
      <div className="gauge-cap">{caption}</div>
    </div>
  );
}

function Build() {
  return (
    <>
      <div className="build par" data-speed="-4">
        <p className="b-head">next build</p>
        <p><span className="b-ok">✓</span> Route /  /en</p>
        <p><span className="b-ok">✓</span> Route /project/[id] <span className="b-dim">SSG</span></p>
        <p><span className="b-ok">✓</span> sitemap.xml, robots.txt</p>
        <p><span className="b-ok">✓</span> opengraph-image <span className="b-dim">1200×630</span></p>
        <p><span className="b-ok">✓</span> three.js · gsap</p>
        <p className="b-last">git push → Vercel · preview · production</p>
      </div>
      <span className="float-chip par" data-speed="12" style={{ right: '8%', top: '12%' }}>Vite → Next.js 15</span>
    </>
  );
}

export default function ProjectVisual({ type, roles, lang }) {
  return (
    <div className="vis" aria-hidden="true">
      {type === 'windows' && <Windows roles={roles} />}
      {type === 'phone' && <Phone />}
      {type === 'chat' && <Chat />}
      {type === 'gauge' && <Gauge caption={lang === 'en' ? 'blocking time, was 13,370 ms' : 'bloklanish vaqti, avval 13 370 ms'} />}
      {type === 'build' && <Build />}
    </div>
  );
}
