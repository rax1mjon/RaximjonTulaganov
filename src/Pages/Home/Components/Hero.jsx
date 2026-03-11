import { Github, Linkedin, Send, Mail, ChevronRight } from "lucide-react";
import { HashLink } from "react-router-hash-link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-linear-to-b from-[#00b8db]/5 via-transparent to-black" />

      <div className="max-w-5xl mx-auto text-center relative z-10 px-6">
        <div className="reveal-premium inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00b8db]/20 bg-[#00b8db]/5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00b8db] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00b8db]"></span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#00b8db] font-medium">
            Hozirda loyihalar uchun ochiq
          </span>
        </div>

        <h1 className="reveal-premium text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-8">
          React Solutions <br />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-white bg-cyan-40">
            Architect.
          </span>
        </h1>

        <p className="reveal-premium text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          Interfeyslar orqali biznes mantiqini soddalashtiraman. Faqat kod emas,
          balki yuqori darajadagi foydalanuvchi tajribasini (UX) quraman.
        </p>

        <div className="reveal-premium flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <HashLink
            smooth
            to={"#projects"}
            className="------ pointer-events-none text-gray-500 ------  group relative px-8 py-4 bg-white text-blackk font-bold rounded-sm overflow-hidden transition-all duration-300 hover:bg-[#00b8db] hover:text-white hover:pr-12 active:scale-[0.97] active:brightness-90 shadow-lg hover:shadow-[#00b8db]/40 hover:shadow-2xl"
          >
            <span className="relative z-10 tracking-wider transition-colors duration-300">
              LOYIHALARNI KO'RISH
            </span>

            <ChevronRight
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all duration-300 ease-out"
              size={20}
            />

            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
          </HashLink>

          <HashLink
            smooth
            to={"#contact"}
            className="px-8 py-4 border-b-2 border-white/10 text-white font-bold tracking-widest text-xs hover:border-[#00b8db] hover:text-[#00b8db] transition-all uppercase"
          >
            Muloqot boshlash
          </HashLink>
        </div>

        <div className="reveal-premium flex items-center justify-center gap-10 border-t border-white/5 pt-10">
          {[
            { icon: <Github size={22} />, link: "https://github.com/rax1mjon" },
            {
              icon: <Linkedin size={22} />,
              link: "https://www.linkedin.com/in/raximjon-tulaganov-448602347/",
            },
            { icon: <Send size={22} />, link: "https://t.me/coder_rxm" },
            {
              icon: <Mail size={22} />,
              link: "mailto:tulaganovraximjon65@gmail.com",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
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
