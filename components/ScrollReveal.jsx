'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll-reveal: `.reveal` klassi bor elementlarni viewport'ga kirganda
 * yo'nalish bo'yicha (up/down/left/right/zoom) "uchirib" chiqaradi.
 *
 * Animatsiya tugagach reveal klasslari olib tashlanadi — shunda elementning
 * o'z hover transform/transition'lari (masalan hover:-translate-y-1) buzilmaydi.
 * `prefers-reduced-motion` bo'lsa darhol ko'rsatadi. `<head>`'dagi inline skript
 * `reveal-ready` ni qo'shadi, shuning uchun JS o'chiq bo'lsa hamma narsa ko'rinadi.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.in)'));
    if (els.length === 0) return;

    const cleanup = (el) => {
      el.classList.remove('reveal', 'up', 'down', 'left', 'right', 'zoom', 'in');
      el.style.transitionDelay = '';
      el.style.willChange = '';
    };

    // Harakatni kamaytirish rejimi — animatsiyasiz, darhol ko'rsatamiz.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(cleanup);
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          obs.unobserve(el);
          el.classList.add('in');
          const done = (e) => {
            if (e.propertyName !== 'transform') return;
            el.removeEventListener('transitionend', done);
            cleanup(el);
          };
          el.addEventListener('transitionend', done);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
