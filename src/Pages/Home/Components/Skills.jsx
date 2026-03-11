import React from "react";
import { Code2, Terminal, Cpu, Layout, Workflow, Zap } from "lucide-react";

const Skills = () => {
  const skillGroups = [
    {
      category: "Core Frontend & Logic",
      icon: <Code2 className="text-[#00f3ff]" size={22} />,
      items: [
        "JavaScript (ES6+)",
        "HTML5 & Semantic UI",
        "CSS3 (Flexbox & Grid)",
        "Async/Await & Promises",
        "Destructuring & Logic",
      ],
    },
    {
      category: "React Ecosystem",
      icon: <Cpu className="text-[#00f3ff]" size={22} />,
      items: [
        "React.js Specialist",
        "Hooks (Memo, Callback, Effect)",
        "React Hook Form",
        "Framer Motion (Animations)",
        "Reusable Components",
      ],
    },
    {
      category: "State & Data Flow",
      icon: <Workflow className="text-[#00f3ff]" size={22} />,
      items: [
        "Redux Toolkit",
        "Context API",
        "React Query (TanStack)",
        "Axios",
        "REST API Integration",
      ],
    },
    {
      category: "Styling & UI Architecture",
      icon: <Layout className="text-[#00f3ff]" size={22} />,
      items: [
        "SCSS Preprocessor",
        "TailwindCSS",
        "Ant Design (AntD)",
        "Bootstrap",
        "Responsive & Pixel Perfect",
      ],
    },
    {
      category: "Engineering & Build Tools",
      icon: <Zap className="text-[#00f3ff]" size={22} />,
      items: [
        "TurboRepo",
        "Vite",
        "PNPM / NPM / Yarn",
        "Performance (Lighthouse)",
        "Lazy Loading & Optimization",
      ],
    },
    {
      category: "Version Control & Teamwork",
      icon: <Terminal className="text-[#00f3ff]" size={22} />,
      items: [
        "Advanced Git & GitHub",
        "Branching Strategies",
        "Collaboration Workflow",
        "Code Versioning",
        "Team Synchronization",
      ],
    },
  ];

  return (
    <section
      className="py-32 bg-[#0c0c0cb3] px-6 relative overflow-hidden"
      id="skills"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-liner-to-r from-transparent via-[#5c5c5c]/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-8">
          <div className="mb-8 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/3 border border-white/8 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#00b8db] font-medium">
                Stack & Tools
              </span>
            </div>
            <div className="mb-6 group cursor-default">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
                Technical{" "}
                <span className="text-[#00f3ff] transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]">
                  Ecosystem
                </span>
              </h2>

              <div className="w-20 h-1 bg-[#00f3ff] shadow-[0_0_15px_#00f3ff] transition-all duration-500 group-hover:w-40" />
            </div>
            <p className="text-gray-300 max-w-xl text-[15px] leading-relaxed">
              Murakkab muammolarni yechishda foydalaniladigan zamonaviy
              texnologiyalar va muhandislik vositalari.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-[#5c5c5c]/10">
          {skillGroups.map((group, idx) => (
            <div
              key={idx}
              className={`group relative p-4 sm:p-10 transition-all duration-700 sm:max-h-57.5
                ${idx % 3 !== 2 ? "lg:border-r" : ""} 
                ${idx < 3 ? "lg:border-b" : ""} 
                border-[#5c5c5c]/50 hover:bg-[#5c5c5c]/2`}
            >
              <div className="absolute top-0 left-0 w-0 h-px bg-[#5c5c5c]/40 group-hover:w-full transition-all duration-700" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[#5c5c5c] group-hover:text-white transition-colors duration-500 transform group-hover:scale-110">
                    {React.cloneElement(group.icon, {
                      size: 24,
                      strokeWidth: 1,
                    })}
                  </div>
                  <span className="text-[10px] font-mono text-[#5c5c5c]/40 group-hover:text-[#5c5c5c] transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <h4 className="text-xl font-semibold text-white/90 mb-3 tracking-tight uppercase group-hover:tracking-widest transition-all duration-500">
                  {group.category}
                </h4>

                <div className="flex flex-wrap gap-x-4 gap-y-3 mt-auto">
                  {group.items.map((skill, i) => (
                    <span
                      key={i}
                      className="text-[12px] text-[#5c5c5c] group-hover:text-white/60 transition-all duration-300 font-medium tracking-tight cursor-default relative hover:after:w-full after:w-0 after:h-px after:bg-[#5c5c5c] after:absolute after:-bottom-1 after:left-0 after:transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 text-[9px] text-[#5c5c5c] font-mono uppercase tracking-[0.2em]">
                Explore Experience
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
