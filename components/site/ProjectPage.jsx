import Link from 'next/link';
import TopBar from './TopBar';
import { dict, projects, contacts } from '@/data/content';
import { SITE_URL } from '@/lib/site';

export function projectMetadata(id, lang) {
  const p = projects.find((x) => x.id === id);
  if (!p) return { title: lang === 'en' ? 'Project not found' : 'Loyiha topilmadi' };
  const base = lang === 'en' ? '/en' : '';
  const description = p.summary[lang];
  return {
    title: p.name[lang],
    description,
    keywords: [...p.tags, 'Raximjon Tulaganov'],
    openGraph: { title: `${p.name[lang]} — Raximjon Tulaganov`, description, url: `${SITE_URL}${base}/project/${p.id}`, type: 'website' },
    alternates: {
      canonical: `${SITE_URL}${base}/project/${p.id}`,
      languages: { uz: `${SITE_URL}/project/${p.id}`, en: `${SITE_URL}/en/project/${p.id}` },
    },
  };
}

export default function ProjectPage({ id, lang = 'uz' }) {
  const t = dict[lang];
  const i = projects.findIndex((x) => x.id === id);
  const p = projects[i];
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const base = lang === 'en' ? '/en' : '';
  const other = lang === 'en' ? `/project/${p.id}` : `/en/project/${p.id}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name[lang],
    description: p.summary[lang],
    author: { '@type': 'Person', name: 'Raximjon Tulaganov', url: SITE_URL },
    url: p.liveUrl || `${SITE_URL}${base}/project/${p.id}`,
    ...(p.githubUrl && { codeRepository: p.githubUrl }),
    keywords: p.tags.join(', '),
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TopBar lang={lang} home={false} altHref={other} />
      <main className="wrap pd">
        <Link className="pd-back" href={`${base || '/'}#ishlar`}>← {t.back}</Link>
        <div className="pd-head">
          <div>
            <div className="kind"><span>{p.kind[lang]}</span><span>{p.year}</span></div>
            <h1>{p.name[lang]}</h1>
          </div>
          <div>
            <p className="pd-sum">{p.summary[lang]}</p>
            <div className="pd-links">
              {p.liveUrl && <a className="btn btn-solid" href={p.liveUrl} target="_blank" rel="noopener">{t.open} ↗</a>}
              {p.githubUrl && <a className="btn btn-line" href={p.githubUrl} target="_blank" rel="noopener">GitHub ↗</a>}
              {!p.githubUrl && <span style={{ color: 'var(--muted)', alignSelf: 'center', fontSize: 14 }}>{t.privateCode}</span>}
            </div>
          </div>
        </div>
        <div className="pd-body">
          <h2>{t.whatIDid}</h2>
          <div>
            <ul className="did">{p.did[lang].map((d) => <li key={d}>{d}</li>)}</ul>
            <ul className="facts">
              {p.facts.map((f) => (
                <li key={f.uz}><b>{f.n.length > 4 ? Number(f.n).toLocaleString('en-US').replace(/,/g, ' ') : f.n}{f.suffix || ''}</b><small>{f[lang]}</small></li>
              ))}
            </ul>
            <div className="pd-tags">{p.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        </div>
        <nav className="pd-nav" aria-label={lang === 'en' ? 'Projects' : 'Loyihalar'}>
          {prev ? <Link href={`${base}/project/${prev.id}`}><small>← {t.prev}</small><b>{prev.name[lang]}</b></Link> : <span />}
          {next ? <Link href={`${base}/project/${next.id}`} style={{ textAlign: 'right' }}><small>{t.next} →</small><b>{next.name[lang]}</b></Link> : <span />}
        </nav>
        <p style={{ marginTop: 64, color: 'var(--muted)', fontSize: 14 }}>
          <a href={contacts.telegram} target="_blank" rel="noopener">Telegram</a> · {contacts.phone}
        </p>
      </main>
    </>
  );
}
