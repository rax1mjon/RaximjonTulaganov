'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TopBar from './TopBar';
import Stage from './Stage';
import ProjectVisual from './ProjectVisual';
import useCursor from './useCursor';
import ContactForm from './ContactForm';
import { dict, projects, experience, contacts, stack, stackEn } from '@/data/content';

const fmt = (n) => Math.round(n).toLocaleString('en-US').replace(/,/g, ' ');

export default function Home({ lang = 'uz' }) {
  const t = dict[lang];
  const root = useRef(null);
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const railRef = useRef(null);
  const [stackIdx, setStackIdx] = useState(0);
  const base = lang === 'en' ? '/en' : '';

  useCursor(root);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setStep(t.agentLog.length); return undefined; }
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const logLen = t.agentLog.length;

    const ctx = gsap.context(() => {
      gsap.from('.name .ln > span', { yPercent: 105, duration: 1.4, ease: 'expo.out', stagger: 0.12, delay: 0.1 });
      gsap.from('.eyebrow, .lede, .cta-row', { y: 24, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1, delay: 0.5 });
      gsap.from('#stage', { scale: 0.92, duration: 1.8, ease: 'expo.out', delay: 0.2 });
      gsap.to('.hero-copy', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

      root.current.querySelectorAll('.count').forEach((el) => {
        const to = parseFloat(el.dataset.to);
        const suf = el.dataset.suffix || '';
        const o = { v: 0 };
        ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: () => gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = fmt(o.v) + suf; } }),
        });
      });

      const bindGauge = (trigger, containerAnimation) => {
        const arc = document.getElementById('gauge-arc');
        const out = document.getElementById('tbt');
        if (!arc || !out) return;
        const o = { v: 13370 };
        const cfg = { trigger, scrub: true, start: containerAnimation ? 'left 80%' : 'top 80%', end: 'center 50%' };
        if (containerAnimation) cfg.containerAnimation = containerAnimation;
        gsap.fromTo(o, { v: 13370 }, {
          v: 0, ease: 'none', scrollTrigger: cfg,
          onUpdate: () => { out.textContent = o.v < 60 ? '~0' : fmt(o.v); arc.setAttribute('stroke-dashoffset', String(12 + (o.v / 13370) * 560)); },
        });
      };
      const gaugePanel = () => root.current.querySelector('.panel[data-visual="gauge"]');

      const mm = gsap.matchMedia();
      mm.add({ desktop: '(min-width: 901px)', mobile: '(max-width: 900px)' }, (mctx) => {
        const mobile = mctx.conditions.mobile;
        const track = document.getElementById('track');
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tween = gsap.to(track, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: { trigger: '.work', start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
        });
        root.current.querySelectorAll('.panel').forEach((p) => {
          p.querySelectorAll('.par').forEach((el) => {
            const sp = (parseFloat(el.dataset.speed) || 0) * (mobile ? 1.5 : 3);
            gsap.fromTo(el, { xPercent: sp }, { xPercent: -sp, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
          });
          gsap.fromTo(p, { scale: 0.9, rotate: 1.5 }, { scale: 1, rotate: 0, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: mobile ? 'left 15%' : 'left 40%', scrub: true } });
        });
        bindGauge(gaugePanel(), tween);

        ScrollTrigger.create({
          trigger: '.agent', start: 'top top', end: mobile ? '+=900' : '+=1400', pin: true, scrub: true,
          onUpdate: (self) => setStep(Math.max(1, Math.ceil(self.progress * logLen))),
        });
        if (mobile) gsap.fromTo('#tl-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.tline', start: 'top 75%', end: 'bottom 60%', scrub: true } });
        else gsap.fromTo('#tl-fill', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.tline', start: 'top 80%', end: 'bottom 55%', scrub: true } });
        gsap.from('.ti', { y: 40, opacity: 0, stagger: 0.12, ease: 'power3.out', duration: 1, scrollTrigger: { trigger: '.tline', start: 'top 80%' } });

        const sTrack = document.getElementById('stack-track');
        const sDist = () => Math.max(0, sTrack.scrollWidth - window.innerWidth);
        const sCards = root.current.querySelectorAll('.sg');
        const sTween = gsap.to(sTrack, {
          x: () => -sDist(), ease: 'none',
          scrollTrigger: {
            trigger: '.stack', start: 'top top', end: () => `+=${sDist()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
            onUpdate: (self) => {
              gsap.set('#stack-progress', { scaleX: self.progress });
              setStackIdx(Math.min(sCards.length - 1, Math.round(self.progress * (sCards.length - 1))));
            },
          },
        });
        sCards.forEach((c) => {
          gsap.fromTo(c, { scale: 0.86, rotateY: -14, opacity: 0.35, transformPerspective: 1200 }, { scale: 1, rotateY: 0, opacity: 1, transformPerspective: 1200, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: sTween, start: 'left 100%', end: mobile ? 'left 20%' : 'left 62%', scrub: true } });
          gsap.from(c.querySelectorAll('li'), { x: 40, opacity: 0, stagger: 0.06, ease: 'power3.out', duration: 0.8, scrollTrigger: { trigger: c, containerAnimation: sTween, start: mobile ? 'left 70%' : 'left 88%', toggleActions: 'play none none reverse' } });
          gsap.fromTo(c.querySelector('.sg-big'), { yPercent: 30 }, { yPercent: -30, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: sTween, start: 'left right', end: 'right left', scrub: true } });
        });
      });

    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready?.then(refresh);
    return () => { window.removeEventListener('load', refresh); ctx.revert(); };
  }, [lang, t.agentLog.length]);

  const copyPhone = async () => {
    try { await navigator.clipboard.writeText(contacts.phone); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  const done = step >= t.agentLog.length;

  return (
    <div ref={root}>
      <div className="cur-dot" aria-hidden="true" />
      <div className="cur-ring" aria-hidden="true"><span>{t.view}</span></div>
      <TopBar lang={lang} home altHref={lang === 'uz' ? '/en' : '/'} />

      <main id="top">
        <section className="hero" aria-labelledby="hero-name">
          <div className="wrap">
            <div className="hero-copy">
              <p className="eyebrow"><span className="live" aria-hidden="true" />{t.status}</p>
              <h1 className="name" id="hero-name">
                <span className="ln"><span>Raximjon</span></span>
                <span className="ln"><span>Tulaganov</span></span>
              </h1>
              <p className="lede">{t.lede}</p>
              <div className="cta-row">
                <a className="btn btn-solid" href="#ishlar" data-magnetic>{t.ctaWork}</a>
                <a className="btn btn-line" href={contacts.telegram} target="_blank" rel="noopener" data-magnetic>{t.ctaTelegram}</a>
              </div>
            </div>
            <Stage label={t.stageLabel} hint={t.stageHint} />
          </div>
          <div className="scroll-hint" aria-hidden="true" />
        </section>

        <section className="work" id="ishlar" aria-labelledby="work-title">
          <div className="wrap sec-head">
            <h2 id="work-title">{t.workTitle}</h2>
            <p>{t.workNote}</p>
          </div>
          <div className="work-viewport">
            <div className="track" id="track">
              {projects.map((p) => (
                <article className="panel" key={p.id} data-cursor="view" data-visual={p.visual}>
                  <div className="stitch" aria-hidden="true" />
                  <div className="panel-copy">
                    <div>
                      <div className="kind"><span>{p.kind[lang]}</span><span>{p.year}</span></div>
                      <h3>{p.name[lang]}</h3>
                      <p>{p.summary[lang]}</p>
                      <ul className="did">{p.did[lang].slice(0, 3).map((d) => <li key={d}>{d}</li>)}</ul>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
                      <ul className="facts">
                        {p.facts.map((f) => (
                          <li key={f.uz}>
                            {f.count
                              ? <b className="count" data-to={f.n} data-suffix={f.suffix || ''}>{fmt(+f.n)}{f.suffix || ''}</b>
                              : <b>{f.n.length > 4 ? fmt(+f.n) : f.n}{f.suffix || ''}</b>}
                            <small>{f[lang]}</small>
                          </li>
                        ))}
                      </ul>
                      <Link className="more" href={`${base}/project/${p.id}`}>{t.more} ↗</Link>
                    </div>
                  </div>
                  <ProjectVisual type={p.visual} roles={t.roles} lang={lang} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="skills" aria-labelledby="skills-title">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="skills-title">{t.skillsTitle}</h2>
              <p>{t.skillsNote}</p>
            </div>
            <div className="bento">
              <div className="tile">
                <div className="tile-vis" aria-hidden="true">
                  <div className="roles">{t.roles.map((r) => <span key={r}>{r}</span>)}</div>
                  <div className="token"><span className="tk-dot" />{t.tokenNote}</div>
                </div>
                <h3>{t.skills[0].title}</h3><p>{t.skills[0].text}</p>
              </div>
              <div className="tile">
                <div className="tile-vis" aria-hidden="true">
                  <div className="mono">
                    <div className="mono-row"><span>partners</span><span>admin</span><span>webmaster</span></div>
                    <div className="mono-wires"><i /><i /><i /></div>
                    <div className="mono-row pk"><span>ui</span><span>hooks</span><span>store</span><span>server</span><span>config</span></div>
                  </div>
                </div>
                <h3>{t.skills[1].title}</h3><p>{t.skills[1].text}</p>
              </div>
              <div className="tile">
                <div className="tile-vis" aria-hidden="true">
                  <div className="perf"><span>{t.perf[0]}</span><div className="pb"><i className="pb-before" /></div><b>13 370 ms</b></div>
                  <div className="perf"><span>{t.perf[1]}</span><div className="pb"><i className="pb-after" /></div><b>~0 ms</b></div>
                  <div className="perf"><span>{t.perf[2]}</span><div className="pb"><i className="pb-img" /></div><b>−95%</b></div>
                </div>
                <h3>{t.skills[2].title}</h3><p>{t.skills[2].text}</p>
              </div>
              <div className="tile">
                <div className="tile-vis" aria-hidden="true">
                  <div className="pipe"><span>git</span><i /><span>build</span><i /><span>vercel</span><i /><span>cdn</span></div>
                  <div className="pipe-run"><b /></div>
                </div>
                <h3>{t.skills[3].title}</h3><p>{t.skills[3].text}</p>
              </div>
              <div className="tile">
                <div className="tile-vis" aria-hidden="true">
                  <div className="dash">
                    <div className="dash-bars">{[38, 62, 48, 80, 56, 92, 70].map((h, k) => <i key={k} style={{ height: `${h}%`, animationDelay: `${k * 0.15}s` }} />)}</div>
                    <div className="dash-rows">{['#1024', '#1025', '#1026'].map((r, k) => <span key={r}><b>{r}</b><em className={`st st${k}`} /></span>)}</div>
                  </div>
                </div>
                <h3>{t.skills[4].title}</h3><p>{t.skills[4].text}</p>
              </div>
              <div className="tile">
                <div className="tile-vis" aria-hidden="true">
                  <div className="schema">
                    <span className="tb"><b>users</b><i>id</i><i>role</i></span>
                    <span className="link-line" />
                    <span className="tb"><b>orders</b><i>id</i><i>user_id</i></span>
                    <span className="link-line" />
                    <span className="tb"><b>items</b><i>id</i><i>order_id</i></span>
                  </div>
                  <div className="token"><span className="tk-dot" />GET /api/orders · 200</div>
                </div>
                <h3>{t.skills[5].title}</h3><p>{t.skills[5].text}</p>
              </div>
              <div className="tile">
                <div className="tile-vis" aria-hidden="true">
                  <div className="fan">
                    <span className="fan-src">post</span>
                    <span className="fan-lines"><i /><i /><i /></span>
                    <span className="fan-dst"><span>Telegram</span><span>Facebook</span><span>TikTok</span></span>
                  </div>
                </div>
                <h3>{t.skills[6].title}</h3><p>{t.skills[6].text}</p>
              </div>
              <div className="tile">
                <div className="tile-vis" aria-hidden="true">
                  <div className="hello"><span>Salom</span><span>Салом</span><span>Привет</span><span>Hello</span></div>
                </div>
                <h3>{t.skills[7].title}</h3><p>{t.skills[7].text}</p>
              </div>
              <div className="tile">
                <div className="tile-vis" aria-hidden="true">
                  <div className="cube"><i /><i /><i /><i /><i /><i /></div>
                </div>
                <h3>{t.skills[8].title}</h3><p>{t.skills[8].text}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="agent" id="usul" aria-labelledby="agent-title">
          <div className="wrap">
            <div>
              <h2 id="agent-title">{t.agentTitle1}<br /><span>{t.agentTitle2}</span></h2>
              <p className="note">{t.agentNote}</p>
              <div className={`status${done ? ' done' : ''}`}><i /><span>{step > 0 ? t.agentLog[step - 1].status : t.agentStart}</span></div>
            </div>
            <div className="term">
              <div className="term-head"><span>migrantlar24 / i18n</span><span>claude code</span></div>
              <div className="term-body">
                {t.agentLog.map((l, i) => (
                  <div key={i} className={`tl${i < step ? ' on' : ''}`}>
                    <span className="who">{l.who}</span>
                    <span className={l.tone === 'rej' ? 'rej' : l.tone === 'ok' ? 'okk' : undefined}>{l.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="exp" aria-labelledby="exp-title">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="exp-title">{t.expTitle}</h2>
              <p>{t.expNote}</p>
            </div>
            <ol className="tline">
              <li className="tl-line" aria-hidden="true"><i id="tl-fill" /></li>
              {experience.map((e) => (
                <li key={e.title.en + e.when.en} className={`ti${e.now ? ' now' : ''}`}>
                  <span className="ti-dot" /><time>{e.when[lang]}</time><h3>{e.title[lang]}</h3><p>{e.text[lang]}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="stack" aria-labelledby="stack-title">
          <div className="stack-bgword" aria-hidden="true">{stack[stackIdx].name[lang]}</div>
          <div className="wrap stack-head">
            <div>
              <h2 id="stack-title">{t.stackTitle}</h2>
              <p>{t.stackNote}</p>
            </div>
            <div className="stack-meter" aria-hidden="true">
              <span className="sm-num">{String(stackIdx + 1).padStart(2, '0')}</span>
              <span className="sm-of">/ {String(stack.length).padStart(2, '0')}</span>
              <span className="sm-bar"><i id="stack-progress" /></span>
            </div>
          </div>
          <div className="stack-rail" ref={railRef}>
            <div className="stack-track" id="stack-track">
              {stack.map((g, gi) => (
                <article className={`sg${gi === stackIdx ? ' on' : ''}`} key={g.name.en}>
                  <span className="sg-big" aria-hidden="true">{String(gi + 1).padStart(2, '0')}</span>
                  <h3>{g.name[lang]}</h3>
                  <ol>
                    {g.items.map((it, ii) => (
                      <li key={it}><span className="sg-i">{String(ii + 1).padStart(2, '0')}</span><span>{lang === 'en' ? stackEn[it] || it : it}</span></li>
                    ))}
                  </ol>
                  <span className="sg-count">{g.items.length} {lang === 'en' ? 'tools' : 'ta texnologiya'}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact wrap" id="aloqa" aria-labelledby="contact-title">
          <p className="small">{t.contactSmall}</p>
          <h2 id="contact-title">{t.contactTitle}</h2>
          <a className="orb" href={contacts.telegram} target="_blank" rel="noopener" data-magnetic="0.5" aria-label={t.ctaTelegram}>
            <svg className="orb-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="orb-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
              <text><textPath href="#orb-path" startOffset="0" textLength="486" lengthAdjust="spacing">{`${t.ctaTelegram} · ${t.ctaTelegram} · `}</textPath></text>
            </svg>
            <span className="orb-core" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M21.5 3.5 2.8 10.7c-.9.4-.9 1.6 0 1.9l4.6 1.5 1.8 5.6c.3.8 1.3 1 1.9.4l2.6-2.5 4.7 3.5c.7.5 1.7.1 1.9-.7l3.2-15.2c.2-1-.8-1.8-1.7-1.4Z" /><path d="m7.4 14.1 10-7.1-7.7 8.6" /></svg>
            </span>
          </a>
          <ContactForm lang={lang} />
          <div className="links">
            <a href={contacts.github} target="_blank" rel="noopener">GitHub</a>
            <a href={contacts.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href={contacts.instagram} target="_blank" rel="noopener">Instagram</a>
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            <span><span className="phone-num">{contacts.phone}</span><button type="button" className="copy-btn" onClick={copyPhone}>{copied ? t.copied : t.copy}</button></span>
          </div>
          <div className="foot"><span>© 2026 Raximjon Tulaganov</span><span>{t.footer}</span></div>
        </section>
      </main>
    </div>
  );
}
