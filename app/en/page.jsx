import Home from '@/components/site/Home';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: { absolute: 'Raximjon Tulaganov — Frontend / Full-Stack Developer' },
  description:
    'Raximjon Tulaganov, frontend / full-stack developer. Production web apps in React, Next.js, TypeScript and Node.js. Based in Qarshi, Uzbekistan, open to remote work.',
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: { uz: SITE_URL, en: `${SITE_URL}/en` },
  },
  openGraph: { locale: 'en_US', url: `${SITE_URL}/en` },
};

export default function Page() {
  return <Home lang="en" />;
}
