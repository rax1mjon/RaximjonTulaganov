import { ExternalLink } from "lucide-react";
import { Github, Linkedin, Send, Mail, Download } from "lucide-react";

const Footer = () => {
  const copyEmail = () => {
    navigator.clipboard.writeText("tulaganovraximjon65@gmail.com");
    alert("Email nusxalandi!");
  };

  return (
    <>
      <footer
        id="contact"
        className="bg-[#050505] border-t border-gray-900 pt-16 pb-8"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="col-span-1">
              <h3 className="text-white text-xl font-bold mb-4">
                Hamkorlikka
                <span className="text-blue-500"> ochiqman</span>
              </h3>
              <p className="text-gray-500 mb-6 text-sm">
                Murakkab muammolarga optimal texnik yechimlar topish va
                miqyoslanuvchi (scalable) tizimlar qurish bilan shug'illanaman.
              </p>
              <button
                onClick={copyEmail}
                className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <Mail size={16} /> Emailni nusxalash
              </button>
            </div>

            <div className="col-span-1 flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-2">
                Professional Network
              </h4>
              {[
                {
                  icon: <Linkedin size={18} strokeWidth={1.5} />,
                  label: "LinkedIn",
                  link: "https://www.linkedin.com/in/raximjon-tulaganov-448602347/",
                },
                {
                  icon: <Github size={18} strokeWidth={1.5} />,
                  label: "GitHub Repositories",
                  link: "https://github.com/rax1mjon",
                },
                {
                  icon: <Send size={18} strokeWidth={1.5} />,
                  label: "Telegram DM",
                  link: "https://t.me/coder_rxm",
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  className="flex items-center gap-4 text-gray-400 hover:text-white transition-all duration-300 group py-1"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/2 border border-white/4 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-500">
                    <span className="group-hover:scale-110 transition-transform duration-300 text-gray-500 group-hover:text-blue-400">
                      {item.icon}
                    </span>
                  </div>

                  <span className="text-[14px] font-medium tracking-tight opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>

                  <ExternalLink
                    size={12}
                    strokeWidth={2}
                    className="opacity-0 -ml-2 group-hover:opacity-40 group-hover:ml-0 transition-all duration-300 text-white"
                  />
                </a>
              ))}
            </div>

            <div className="col-span-1">
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                Documentation
              </h4>
              <a
                href="/Frontend_Resume.pdf" 
                download="Frontend_Resume.pdf" 
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-gray-800 rounded-xl hover:border-blue-600 transition-all group"
              >
                <span className="text-gray-400 group-hover:text-white">
                  Download Resume (PDF)
                </span>
                <Download size={18} className="text-blue-500" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-8 flex flex-col md:row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">
              © 2026 Built with React & Tailwind CSS. Engineering mindset.
            </p>
            <div className="flex gap-6 text-xs text-gray-600">
              <span>Mathematics | English | Guitar | Calisthenics</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
