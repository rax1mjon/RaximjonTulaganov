import { Layers, ShieldCheck, Zap, Server, Dumbbell, Music, CheckCircle2 } from 'lucide-react';

const principles = [
  {
    title: 'Monorepo Architecture',
    desc: 'TurboRepo + pnpm workspace: shared UI, hooks, services paketlari. Bir joyda o\'zgartirish — barcha applarga avtomatik ta\'sir.',
    icon: <Layers className="text-[#00f3ff]" size={24} />,
  },
  {
    title: 'Role-Based Systems',
    desc: '4 xil rol (superadmin, omborchi, operator, kuryer) — alohida routing, menyu, ruxsatlar. JWT + Axios interceptor bilan token auto-refresh.',
    icon: <ShieldCheck className="text-[#00f3ff]" size={24} />,
  },
  {
    title: 'Performance Engineering',
    desc: 'TBT 13,370ms → ~0ms. 29 PNG → WebP (95% hajm). YouTube lazy facade. Lighthouse 90+ — har bir loyihada o\'lchab, optimizatsiya qilingan.',
    icon: <Zap className="text-[#00f3ff]" size={24} />,
  },
  {
    title: 'Production Deployment',
    desc: 'Docker Compose, Nginx reverse proxy, subdomain routing (username.procraft.uz). Cloudflare CDN va bot management sozlamalari.',
    icon: <Server className="text-[#00f3ff]" size={24} />,
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#080808] px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00f3ff]/5 rounded-full blur-[120px] animate-pulse" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="reveal up mb-16 group cursor-default">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
            Frontend Engineer —{' '}
            <span className="text-[#00f3ff] transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]">
              Monorepo & SaaS
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#00f3ff] shadow-[0_0_15px_#00f3ff] transition-all duration-500 group-hover:w-40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="reveal left text-xl text-gray-400 leading-relaxed font-light">
              <span className="hover:text-white transition-colors duration-300">
                Men — TurboRepo monorepo arxitekturasi asosida ko'p ilovali enterprise tizimlar
                quruvchi Frontend Engineerman.{' '}
                <span className="text-white/70">Procraft</span> (4 app, 7 shared package, UZ/EN/RU
                i18n) va <span className="text-white/70">Urtak</span> (3 app, 5 shared package, 4
                rol ERP) — ikkala SaaS platformasini noldan arxitektura qilib, ishlab chiqdim.
                Docker + Nginx deployment va Cloudflare CDN integratsiyalari ham mening stegim.
              </span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              {principles.map((item, index) => (
                <div
                  key={index}
                  style={{ transitionDelay: `${index * 90}ms` }}
                  className="reveal up p-6 bg-white/2 border border-white/5 rounded-xl transition-all duration-500 hover:bg-white/4 hover:border-[#00f3ff]/20 hover:-translate-y-1 group cursor-default relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

          <div className="reveal right lg:col-span-5 space-y-6">
            <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-4xl relative overflow-hidden group animate-float shadow-2xl">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                <span className="animate-bounce">⚡</span> Intellektual Tayyorgarlik
              </h3>

              <ul className="space-y-5">
                {[
                  { icon: <CheckCircle2 size={18} />, text: 'Muammoni tizimli o\'ylab, eng sodda yechim topish.' },
                  { icon: <Dumbbell size={18} />, text: 'Intizom: Calisthenics & GYM.' },
                  { icon: <Music size={18} />, text: 'Ijodkorlik: Gitara va kreativlik.' },
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
                  { val: '10+', lab: 'Loyihalar' },
                  { val: '2',   lab: 'SaaS/ERP' },
                  { val: '2',   lab: 'Monorepo' },
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
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#00f3ff]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
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
