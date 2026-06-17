import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Skills from '@/components/home/Skills';
import Projects from '@/components/home/Projects';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Raximjon Tulaganov — Frontend Engineer',
  description:
    "Raximjon Tulaganov shaxsiy portfolio. Frontend Engineer — TurboRepo monorepo, SaaS platformalar, ERP tizimlar. Qarshi, O'zbekiston.",
  alternates: {
    canonical: SITE_URL,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
    </>
  );
}
