'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Code2, Layers, Briefcase, Mail, IdCardLanyard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Men haqimda',   href: '/#about',    icon: <IdCardLanyard size={18} /> },
  { name: 'Blog',          href: '/blog',       icon: <Code2 size={18} />, disabled: true },
  { name: 'Texnologiyalar',href: '/#skills',   icon: <Layers size={18} /> },
  { name: 'Loyihalar',     href: '/#projects', icon: <Briefcase size={18} /> },
  { name: 'Aloqa',         href: '#contact',   icon: <Mail size={18} /> },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {showPdf && (
        <div className="max-w-200 w-full h-full max-h-200 border rounded-xl overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-[100] shadow-lg">
          <iframe
            src="/Frontend_Resume.pdf#toolbar=0"
            width="100%"
            height="100%"
            title="PDF Preview"
          />
          <button
            onClick={() => setShowPdf(false)}
            className="absolute top-8 right-8 bg-black/70 rounded hover:opacity-80 transition-opacity"
          >
            <X size={30} color="white" />
          </button>
        </div>
      )}

      <header
        className={`fixed top-2.5 max-w-300 left-[50%] transform -translate-x-1/2 w-[calc(100%-20px)] z-50 transition-all duration-300 rounded-2xl ${
          scrolled
            ? 'py-3 bg-black/60 backdrop-blur-md border-2 border-white/20'
            : 'py-4 bg-black/40 backdrop-blur-xl'
        }`}
      >
        <div className="max-w-6xl mx-auto gap-3 px-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 border border-white/20 rounded-lg flex items-center justify-center group-hover:border-cyan-400/50 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all duration-300 overflow-hidden bg-white/3">
              <img src="/RTB.jpg" alt="RT" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <span className="text-[14px] font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
              Raximjon Tulaganov
            </span>
          </Link>

          <nav>
            {/* Desktop */}
            <div className="hidden min-[787px]:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={
                    link.disabled
                      ? 'pointer-events-none text-gray-500 text-sm font-medium'
                      : 'text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors relative group'
                  }
                >
                  {link.name}
                  {!link.disabled && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full" />
                  )}
                </Link>
              ))}
              <button
                className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all"
                onClick={() => setShowPdf(true)}
              >
                Resume CV
              </button>
            </div>

            {/* Mobile dropdown */}
            <div
              className={`absolute top-[calc(100%+5px)] left-0 w-full min-[787px]:hidden transition-all duration-500 ease-in-out ${
                isOpen
                  ? 'opacity-100 translate-y-0 visible'
                  : 'opacity-0 -translate-y-5 invisible'
              }`}
            >
              <div className="grid grid-cols-1 min-[450px]:grid-cols-2 min-[660px]:grid-cols-3 gap-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg border border-white/10
                      font-medium text-lg transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-400
                      hover:scale-[1.02] active:scale-[0.98] transform
                      ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}
                      ${link.disabled ? 'pointer-events-none text-gray-500 bg-black/40' : 'text-gray-300 bg-black/80'}`}
                  >
                    <span className="p-2 rounded-xl bg-white/5 text-cyan-500">{link.icon}</span>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden text-white mt-1 relative w-6 h-6"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div
                className={`absolute inset-0 transition-all duration-300 transform ${
                  isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`}
              >
                <Menu />
              </div>
              <div
                className={`absolute inset-0 transition-all duration-300 transform ${
                  isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`}
              >
                <X />
              </div>
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
