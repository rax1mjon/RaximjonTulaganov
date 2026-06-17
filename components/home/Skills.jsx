import { Code2, Terminal, Cpu, Layout, Workflow, Zap, Server, Search } from 'lucide-react';
import { cloneElement } from 'react';
import { portfolioData } from '@/data/portfolioData';

const CATEGORY_ICONS = {
  'Core Frontend & Logic':       <Code2    size={22} strokeWidth={1} />,
  'React Ecosystem':             <Cpu      size={22} strokeWidth={1} />,
  'State & Data Flow':           <Workflow size={22} strokeWidth={1} />,
  'Styling & UI Architecture':   <Layout   size={22} strokeWidth={1} />,
  'Engineering & Build Tools':   <Zap      size={22} strokeWidth={1} />,
  'Version Control & Teamwork':  <Terminal size={22} strokeWidth={1} />,
  'Infrastructure & Deployment': <Server   size={22} strokeWidth={1} />,
  'SEO & web standards':         <Search   size={22} strokeWidth={1} />,
};

const Skills = () => {
  const grouped = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const skillGroups = Object.entries(grouped).map(([category, skills]) => ({
    category,
    icon: CATEGORY_ICONS[category] ?? <Code2 size={22} strokeWidth={1} />,
    items: skills.map((s) => s.name),
  }));

  return (
    <section id="skills" className="py-32 bg-[#030303] px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5c5c5c]/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-8">
          <div className="reveal up mb-8 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/3 border border-white/8 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#00b8db] font-medium">
                Stack & Tools
              </span>
            </div>
            <div className="mb-6 group cursor-default">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
                Technical{' '}
                <span className="text-[#00f3ff] transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]">
                  Ecosystem
                </span>
              </h2>
              <div className="w-20 h-1 bg-[#00f3ff] shadow-[0_0_15px_#00f3ff] transition-all duration-500 group-hover:w-40" />
            </div>
            <p className="text-gray-300 max-w-xl text-[15px] leading-relaxed">
              Murakkab muammolarni yechishda foydalaniladigan zamonaviy texnologiyalar va
              muhandislik vositalari.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[#5c5c5c]/10">
          {skillGroups.map((group, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${(idx % 4) * 70}ms` }}
              className={`reveal up group relative p-6 sm:p-8 transition-all duration-700
                ${idx % 4 !== 3 ? 'lg:border-r' : ''}
                ${idx % 2 !== 1 ? 'md:border-r lg:border-r-0' : ''}
                ${idx < 4 ? 'lg:border-b' : ''}
                ${idx < 6 ? 'md:border-b lg:border-b-0' : ''}
                border-[#5c5c5c]/20 hover:bg-[#5c5c5c]/2`}
            >
              <div className="absolute top-0 left-0 w-0 h-px bg-[#5c5c5c]/40 group-hover:w-full transition-all duration-700" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-500 group-hover:text-[#00f3ff] transition-colors duration-500 transform group-hover:scale-110">
                    {group.icon}
                  </div>
                  <span className="text-[10px] font-mono text-gray-600 group-hover:text-gray-400 transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-[13px] font-semibold text-white/90 mb-4 tracking-tight uppercase group-hover:tracking-widest transition-all duration-500 leading-snug">
                  {group.category}
                </h3>

                <div className="flex flex-wrap gap-x-3 gap-y-2.5 mt-auto">
                  {group.items.map((skill, i) => (
                    <span
                      key={i}
                      className="text-[11px] text-gray-400 group-hover:text-white/80 transition-all duration-300 font-medium tracking-tight cursor-default relative hover:after:w-full after:w-0 after:h-px after:bg-gray-400 after:absolute after:-bottom-1 after:left-0 after:transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 text-[9px] text-[#5c5c5c] font-mono uppercase tracking-[0.2em]">
                {group.items.length} skills
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
