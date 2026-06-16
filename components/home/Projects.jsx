import Link from 'next/link';
import { ArrowUpRight, Lock, Github } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-32 bg-[#080808] px-6 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00f3ff]/3 rounded-full blur-[140px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/3 border border-white/8 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#00f3ff] font-medium">
              Portfolio
            </span>
          </div>

          <div className="group cursor-default">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
              Tanlangan{' '}
              <span className="text-[#00f3ff] transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]">
                Loyihalar
              </span>
            </h2>
            <div className="w-20 h-1 bg-[#00f3ff] shadow-[0_0_15px_#00f3ff] transition-all duration-500 group-hover:w-40" />
          </div>

          <p className="text-gray-500 mt-4 max-w-xl text-[15px] leading-relaxed">
            Real mijozlar va startap loyihalar — har biri texnik murakkablik va muhandislik
            yechimlari bilan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, idx) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="group relative p-6 bg-white/2 border border-white/5 rounded-2xl hover:border-[#00f3ff]/20 hover:bg-white/4 transition-all duration-500 hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f3ff]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-mono text-[#5c5c5c]/60 group-hover:text-[#5c5c5c] transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.isRepositoryPrivate ? (
                      <span className="flex items-center gap-1 text-[10px] text-amber-500/60 border border-amber-500/20 px-2 py-0.5 rounded-full">
                        <Lock size={10} /> Private
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-green-500/60 border border-green-500/20 px-2 py-0.5 rounded-full">
                        <Github size={10} /> Open Source
                      </span>
                    )}
                    <ArrowUpRight
                      size={18}
                      className="text-[#5c5c5c] group-hover:text-[#00f3ff] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
                    />
                  </div>
                </div>

                <h3 className="text-white font-semibold text-lg mb-3 tracking-tight group-hover:text-[#00f3ff] transition-colors duration-300 leading-snug">
                  {project.name}
                </h3>

                <p className="text-gray-600 text-[13px] leading-relaxed line-clamp-3 group-hover:text-gray-500 transition-colors">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-0.5 rounded-full border border-white/8 text-[#5c5c5c] bg-white/2 group-hover:border-[#00f3ff]/15 group-hover:text-white/50 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full border border-white/8 text-[#5c5c5c]/50">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#00f3ff]/0 via-[#00f3ff]/50 to-[#00f3ff]/0 group-hover:w-full transition-all duration-700" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
