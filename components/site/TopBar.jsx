'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { dict, contacts } from '@/data/content';

const LOOKS = ['monolit', 'atelye'];

export function readLook() {
  try {
    const v = localStorage.getItem('rt-look');
    return LOOKS.includes(v) ? v : 'monolit';
  } catch {
    return 'monolit';
  }
}

export default function TopBar({ lang = 'uz', home = true, altHref }) {
  const t = dict[lang];
  const [look, setLook] = useState('monolit');
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const base = lang === 'en' ? '/en' : '';
  const anchor = (id) => (home ? `#${id}` : `${base || '/'}#${id}`);

  useEffect(() => {
    const v = readLook();
    setLook(v);
    document.body.dataset.look = v;
    document.documentElement.lang = lang;
  }, [lang]);

  const choose = (v) => {
    setLook(v);
    document.body.dataset.look = v;
    try { localStorage.setItem('rt-look', v); } catch {}
    window.dispatchEvent(new CustomEvent('rt-look', { detail: v }));
  };

  return (
    <header className={`top${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap">
        <Link className="brand" href={base || '/'} data-magnetic>Raximjon Tulaganov</Link>
        <nav className="nav" aria-label={lang === 'en' ? 'Main' : 'Asosiy'}>
          <a className="hide-sm" href={anchor('ishlar')}>{t.nav.work}</a>
          <a className="hide-sm" href={anchor('usul')}>{t.nav.method}</a>
          <a className="hide-sm" href={anchor('aloqa')}>{t.nav.contact}</a>
          <div className="look" role="group" aria-label={t.nav.looks}>
            {LOOKS.map((v) => (
              <button key={v} type="button" id={`look-${v}`} aria-pressed={look === v} onClick={() => choose(v)}>
                {v === 'monolit' ? 'Monolit' : 'Atelye'}
              </button>
            ))}
          </div>
          <span className="lang">
            <Link href={lang === 'uz' ? '#' : altHref || '/'} aria-current={lang === 'uz'} hrefLang="uz">UZ</Link>
            <Link href={lang === 'en' ? '#' : altHref || '/en'} aria-current={lang === 'en'} hrefLang="en">EN</Link>
          </span>
          <a className="btn-pill" href={contacts.resume} target="_blank" rel="noopener" data-magnetic>{t.nav.resume}</a>
        </nav>
      </div>
    </header>
  );
}
