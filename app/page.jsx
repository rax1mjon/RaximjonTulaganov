import Home from '@/components/site/Home';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: { absolute: 'Raximjon Tulaganov — Frontend / Full-Stack dasturchi' },
  description:
    "Raximjon Tulaganov — frontend / full-stack dasturchi. React, Next.js, TypeScript va Node.js'da production veb-ilovalar. Qarshi, O'zbekiston. Remote ishga ochiq.",
  alternates: {
    canonical: SITE_URL,
    languages: { uz: SITE_URL, en: `${SITE_URL}/en` },
  },
};

export default function Page() {
  return <Home lang="uz" />;
}
