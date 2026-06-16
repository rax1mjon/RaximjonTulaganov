import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Lock, Globe } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { SITE_URL as BASE_URL } from '@/lib/site';

export async function generateStaticParams() {
  return portfolioData.projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = portfolioData.projects.find((p) => p.id === id);

  if (!project) return { title: 'Loyiha topilmadi' };

  const description = project.description.slice(0, 155).replace(/\n/g, ' ');

  return {
    title: project.name,
    description,
    keywords: [...project.tags, 'Raximjon Tulaganov', 'Frontend Engineer', 'loyiha'],
    openGraph: {
      title: `${project.name} — Raximjon Tulaganov`,
      description,
      url: `${BASE_URL}/project/${project.id}`,
      type: 'website',
      // og:image avtomatik ravishda app/opengraph-image.jsx dan meros qilib olinadi.
    },
    alternates: { canonical: `${BASE_URL}/project/${project.id}` },
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = portfolioData.projects.find((p) => p.id === id);

  if (!project) notFound();

  const allProjects = portfolioData.projects;
  const currentIndex = allProjects.findIndex((p) => p.id === id);
  const prevProject = allProjects[currentIndex - 1] || null;
  const nextProject = allProjects[currentIndex + 1] || null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.description,
    author: {
      '@type': 'Person',
      name: 'Raximjon Tulaganov',
      url: BASE_URL,
    },
    url: project.liveUrl || `${BASE_URL}/project/${project.id}`,
    ...(project.githubUrl && { codeRepository: project.githubUrl }),
    keywords: project.tags.join(', '),
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#080808] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00f3ff]/4 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-[#00f3ff]/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#00f3ff] transition-colors text-sm mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Barcha loyihalar
          </Link>

          <div className="mb-3 flex items-center gap-3">
            <span className="text-[10px] font-mono text-[#5c5c5c]/50">
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(allProjects.length).padStart(2, '0')}
            </span>
            {project.isRepositoryPrivate ? (
              <span className="flex items-center gap-1 text-[10px] text-amber-500/60 border border-amber-500/20 px-2 py-0.5 rounded-full">
                <Lock size={10} /> Private Repository
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-green-500/60 border border-green-500/20 px-2 py-0.5 rounded-full">
                <Github size={10} /> Open Source
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight mb-8">
            {project.name}
          </h1>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[12px] px-3 py-1 rounded-full border border-[#00f3ff]/15 text-[#00f3ff]/60 bg-[#00f3ff]/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-14">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00f3ff]/10 border border-[#00f3ff]/20 text-[#00f3ff] rounded-xl hover:bg-[#00f3ff]/20 transition-all duration-300 text-sm font-medium hover:-translate-y-0.5 group"
              >
                <Globe size={16} />
                Live ko'rish
                <ExternalLink
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/3 border border-white/10 text-gray-400 rounded-xl hover:bg-white/6 hover:text-white hover:border-white/20 transition-all duration-300 text-sm font-medium hover:-translate-y-0.5 group"
              >
                <Github size={16} />
                GitHub
                <ExternalLink
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            )}
          </div>

          <div className="border-t border-white/5 pt-12 mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#5c5c5c] font-medium mb-6">
              Loyiha haqida
            </h2>
            <p className="text-gray-400 text-[16px] leading-[1.9] whitespace-pre-line">
              {project.description}
            </p>
          </div>

          <div className="border-t border-white/5 pt-10">
            <div className="flex items-center justify-between gap-4">
              {prevProject ? (
                <Link
                  href={`/project/${prevProject.id}`}
                  className="group flex items-center gap-3 text-gray-600 hover:text-[#00f3ff] transition-colors max-w-[45%]"
                >
                  <ArrowLeft
                    size={16}
                    className="shrink-0 group-hover:-translate-x-1 transition-transform"
                  />
                  <div className="text-left min-w-0">
                    <p className="text-[10px] uppercase tracking-widest mb-1 text-[#5c5c5c]/50">
                      Oldingi
                    </p>
                    <p className="text-sm font-medium truncate">{prevProject.name}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextProject ? (
                <Link
                  href={`/project/${nextProject.id}`}
                  className="group flex items-center gap-3 text-gray-600 hover:text-[#00f3ff] transition-colors max-w-[45%] text-right"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest mb-1 text-[#5c5c5c]/50">
                      Keyingi
                    </p>
                    <p className="text-sm font-medium truncate">{nextProject.name}</p>
                  </div>
                  <ArrowLeft
                    size={16}
                    className="shrink-0 rotate-180 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
