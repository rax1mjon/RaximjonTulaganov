import './globals.css';
import { SITE_URL as BASE_URL, GOOGLE_SITE_VERIFICATION } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Raximjon Tulaganov — Frontend / Full-Stack dasturchi',
    template: '%s | Raximjon Tulaganov',
  },
  description:
    "Raximjon Tulaganov — frontend / full-stack dasturchi. React, Next.js, TypeScript va Node.js'da production veb-ilovalar. Qarshi, O'zbekiston.",
  keywords: [
    'Raximjon Tulaganov',
    'Frontend Engineer',
    'React Developer',
    'TurboRepo',
    'Monorepo',
    'SaaS',
    'ERP',
    'TailwindCSS',
    'Next.js',
    'JavaScript',
    'Uzbekistan',
    'Qarshi',
    'rax1mjon',
    'Full-Stack Developer',
    'TypeScript',
    'Node.js',
  ],
  authors: [{ name: 'Raximjon Tulaganov', url: BASE_URL }],
  creator: 'Raximjon Tulaganov',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: BASE_URL,
    siteName: 'Raximjon Tulaganov',
    title: 'Raximjon Tulaganov — Frontend / Full-Stack',
    description:
      "React, Next.js, TypeScript va Node.js'da production veb-ilovalar. Qarshi, O'zbekiston.",
    // og:image avtomatik ravishda app/opengraph-image.jsx (1200×630) dan olinadi.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raximjon Tulaganov — Frontend / Full-Stack',
    description: "React, Next.js, TypeScript va Node.js'da production veb-ilovalar.",
    // twitter:image yo'q bo'lsa, kraulerlar og:image (yuqoridagi) ga qaytadi.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Raximjon Tulaganov',
  alternateName: ['rax1mjon', 'Raximjon'],
  url: BASE_URL,
  image: `${BASE_URL}/avatar.jpg`,
  jobTitle: 'Frontend / Full-Stack Developer',
  description:
    "React, Next.js, TypeScript va Node.js'da production veb-ilovalar quruvchi frontend / full-stack dasturchi. Qarshi, O'zbekiston.",
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Qarshi',
    addressRegion: 'Qashqadaryo',
    addressCountry: 'UZ',
  },
  email: 'tulaganovraximjon65@gmail.com',
  sameAs: [
    'https://github.com/rax1mjon/',
    'https://www.linkedin.com/in/raximjon-tulaganov-448602347/',
    'https://t.me/Raximjon_Tulaganov',
    'https://www.instagram.com/raximjon.dev/',
  ],
  knowsAbout: [
    'React',
    'TurboRepo',
    'Monorepo Architecture',
    'TailwindCSS',
    'Next.js',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Three.js',
    'Docker',
    'Nginx',
    'Frontend Engineering',
    'JavaScript',
    'TypeScript',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Raximjon Tulaganov',
  url: BASE_URL,
  author: { '@type': 'Person', name: 'Raximjon Tulaganov' },
  description: "Frontend / full-stack portfolio — React, Next.js, TypeScript, Node.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" />
        <script
          dangerouslySetInnerHTML={{
            __html: "try{var l=localStorage.getItem('rt-look');if(l==='atelye'){document.addEventListener('DOMContentLoaded',function(){document.body.dataset.look='atelye'})}}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body data-look="monolit" suppressHydrationWarning>{children}</body>
    </html>
  );
}
