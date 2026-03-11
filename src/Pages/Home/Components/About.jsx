import React from "react";
import {
  Code2,
  Cpu,
  Layout,
  BrainCircuit,
  Dumbbell,
  Music,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const About = () => {
  const principles = [
    {
      title: "Engineering Excellence",
      desc: "Clean Code va kengayuvchan arxitektura (scalability) mening kod yozish falsafamning asosi.",
      icon: <Code2 className="text-[#00f3ff]" size={24} />,
    },
    {
      title: "Data-Driven Logic",
      desc: "Murakkab API integratsiyalari va state management orqali dinamik ma'lumotlar oqimini boshqarish.",
      icon: <Cpu className="text-[#00f3ff]" size={24} />,
    },
    {
      title: "Technical Precision",
      desc: "Pixel-perfect dizayn va yuqori samaradorlik (performance) — har bir loyihada ustuvor vazifa.",
      icon: <Layout className="text-[#00f3ff]" size={24} />,
    },
    {
      title: "AI Integration",
      desc: "Deep debugging va rivojlanish jarayonlarini AI vositalari yordamida tezlashtirish.",
      icon: <BrainCircuit className="text-[#00f3ff]" size={24} />,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-[#080808] px-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00f3ff]/5 rounded-full blur-[120px] animate-pulse" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 group cursor-default">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
            Software Engineer
            <span className="text-[#00f3ff] transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]">
              React Specialist
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#00f3ff] shadow-[0_0_15px_#00f3ff] transition-all duration-500 group-hover:w-40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xl text-gray-400 leading-relaxed font-light">
              <span className="hover:text-white transition-colors duration-300">
                Men — murakkab veb-ekotizimlar va yuqori yuklanishli
                interfeyslarni ishlab chiqishga ixtisoslashgan Software
                Engineerman. Faoliyatim davomida ikkita startap loyihada,
                jumladan, keng ko'lamli CRM tizimi arxitekturasini qurishda
                ishtirok etganman.
              </span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              {principles.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-white/2 border border-white/5 rounded-xl transition-all duration-500 hover:bg-white/4 hover:border-[#00f3ff]/20 hover:-translate-y-1 group cursor-default relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-liner-to-br from-[#00f3ff]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="mb-4 text-[#00f3ff]/80 group-hover:text-[#00f3ff] transition-colors duration-300">
                      {item.icon}
                    </div>

                    <h4 className="text-[15px] font-semibold text-white/90 mb-2 tracking-wide group-hover:text-white transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-[13px] text-gray-500 leading-relaxed font-light group-hover:text-gray-400 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-4xl relative overflow-hidden group animate-float shadow-2xl">
              <div className="absolute inset-0 bg-liner-to-br from-[#00f3ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                <span className="animate-bounce">⚡</span> Intellektual
                Tayyorgarlik
              </h3>

              <ul className="space-y-5">
                {[
                  {
                    icon: <CheckCircle2 size={18} />,
                    text: "Analitik fikrlash va muammolarga yechim.",
                  },
                  {
                    icon: <Dumbbell size={18} />,
                    text: "Intizom: Calisthenics & GYM.",
                  },
                  {
                    icon: <Music size={18} />,
                    text: "Ijodkorlik: Gitara va kreativlik.",
                  },
                ].map((li, i) => (
                  <li key={i} className="flex items-start gap-3 group/li">
                    <span className="text-[#00f3ff] transition-transform duration-300 group-hover/li:scale-125">
                      {li.icon}
                    </span>
                    <p className="text-gray-400 text-sm group-hover/li:text-white transition-colors">
                      {li.text}
                    </p>
                  </li>
                ))}

                <div className="mt-6 flex gap-4">
                  <span className="text-xs bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-600/30">
                    Math & Logic Certified
                  </span>
                  <span className="text-xs bg-green-600/20 text-green-400 px-3 py-1 rounded-full border border-green-600/30">
                    English Proficiency
                  </span>
                </div>
              </ul>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                {[
                  { val: "1.5+", lab: "Tajriba" },
                  { val: "2", lab: "Startap" },
                  { val: "CRM", lab: "Focus" },
                ].map((stat, i) => (
                  <div key={i} className="text-center group/stat">
                    <p className="text-2xl font-bold text-white group-hover/stat:text-[#00f3ff] transition-colors tracking-tighter">
                      {stat.val}
                    </p>
                    <p className="text-[9px] uppercase text-gray-600 font-black tracking-widest">
                      {stat.lab}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group overflow-hidden p-5 bg-white/2 border border-white/5 rounded-xl cursor-pointer">
              <div className="absolute inset-0 bg-liner-to-r from-transparent via-[#00f3ff]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-gray-400 group-hover:text-[#00f3ff] transition-colors font-medium">
                  Professional muloqot va doimiy o'sish.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
