'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

// Kursor halqasi, loyiha ustida "Ko'rish" doirasi, magnit tugmalar va 3D egiluvchi kartalar.
export default function useCursor(rootRef) {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = rootRef.current;
    if (!fine || reduce || !root) return undefined;

    document.body.classList.add('has-cursor');
    const dot = root.querySelector('.cur-dot');
    const ring = root.querySelector('.cur-ring');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my, raf = 0;
    const offs = [];
    const on = (el, ev, fn) => { el.addEventListener(ev, fn); offs.push(() => el.removeEventListener(ev, fn)); };

    on(window, 'pointermove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
    const loop = () => { rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; ring.style.transform = `translate(${rx}px,${ry}px)`; raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    root.querySelectorAll('[data-cursor="view"]').forEach((el) => {
      on(el, 'pointerenter', () => ring.classList.add('is-view'));
      on(el, 'pointerleave', () => ring.classList.remove('is-view'));
    });
    root.querySelectorAll('a, button').forEach((el) => {
      on(el, 'pointerenter', () => { ring.classList.remove('is-view'); ring.classList.add('is-link'); });
      on(el, 'pointerleave', () => { ring.classList.remove('is-link'); if (el.closest('[data-cursor="view"]')) ring.classList.add('is-view'); });
    });
    root.querySelectorAll('.tile').forEach((el) => {
      on(el, 'pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, { rotateY: px * 8, rotateX: -py * 8, transformPerspective: 900, duration: 0.5, ease: 'power3.out' });
      });
      on(el, 'pointerleave', () => gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' }));
    });
    root.querySelectorAll('[data-magnetic]').forEach((el) => {
      const k = parseFloat(el.getAttribute('data-magnetic')) || 0.3;
      on(el, 'pointermove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * k, y: (e.clientY - (r.top + r.height / 2)) * k, duration: 0.4, ease: 'power3.out' });
      });
      on(el, 'pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' }));
    });

    return () => {
      cancelAnimationFrame(raf);
      offs.forEach((f) => f());
      document.body.classList.remove('has-cursor');
    };
  }, [rootRef]);
}
