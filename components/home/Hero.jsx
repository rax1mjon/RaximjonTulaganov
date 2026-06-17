import Image from 'next/image';
import { Github, Linkedin, Send, Mail, Instagram, ChevronRight } from 'lucide-react';

const socialLinks = [
  { icon: <Github size={22} />,    href: 'https://github.com/rax1mjon/', label: 'GitHub' },
  { icon: <Linkedin size={22} />,  href: 'https://www.linkedin.com/in/raximjon-tulaganov-448602347/', label: 'LinkedIn' },
  { icon: <Send size={22} />,      href: 'https://t.me/Raximjon_Tulaganov', label: 'Telegram' },
  { icon: <Instagram size={22} />, href: 'https://www.instagram.com/raximjon_tulaganov/', label: 'Instagram' },
  { icon: <Mail size={22} />,      href: 'mailto:tulaganovraximjon65@gmail.com', label: 'Email' },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-linear-to-b from-[#00b8db]/5 via-transparent to-black" />

      <div className="max-w-6xl mx-auto relative z-10 px-6 w-full py-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-16">

          {/* Text block */}
          <div className="flex-1 max-w-2xl">
            <div className="reveal-premium inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00b8db]/20 bg-[#00b8db]/5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00b8db] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00b8db]" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#00b8db] font-medium">
                Hozirda loyihalar uchun ochiq
              </span>
            </div>

            <h1 className="reveal-premium text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9] mb-8">
              Monorepo SaaS <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-white bg-cyan-40">
                Engineer.
              </span>
            </h1>

            <p className="reveal-premium text-gray-500 text-lg max-w-xl mb-12 font-medium leading-relaxed">
              TurboRepo monorepo asosida ko'p ilovali enterprise tizimlar quraman —
              2 ta to'liq SaaS platforma, ERP dashboard, shared paketlar ekotizimi.
            </p>

            <div className="reveal-premium flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-sm overflow-hidden transition-all duration-300 hover:bg-[#00b8db] hover:text-white hover:pr-12 active:scale-[0.97] active:brightness-90 shadow-lg hover:shadow-[#00b8db]/40 hover:shadow-2xl"
              >
                <span className="relative z-10 tracking-wider transition-colors duration-300">
                  LOYIHALARNI KO'RISH
                </span>
                <ChevronRight
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all duration-300 ease-out"
                  size={20}
                />
              </a>

              <a
                href="#contact"
                className="px-8 py-4 border-b-2 border-white/10 text-white font-bold tracking-widest text-xs hover:border-[#00b8db] hover:text-[#00b8db] transition-all uppercase"
              >
                Muloqot boshlash
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="shrink-0 mt-12 md:mt-0">
            <div className="relative w-full max-w-xs md:w-72 md:h-[420px] h-64 rounded-2xl overflow-hidden border border-white/8 mx-auto md:mx-0">
              <Image
                src="/avatar.jpg"
                alt="Raximjon Tulaganov — Frontend Engineer"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 288px"
                className="object-cover object-[30%_top]"
              />
            </div>
          </div>

        </div>

        {/* Social links */}
        <div className="reveal-premium flex items-center justify-center gap-10 border-t border-white/5 pt-10 mt-16">
          {socialLinks.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              title={item.label}
              className="text-gray-600 hover:text-[#00b8db] transition-all duration-500 transform hover:-translate-y-1"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
