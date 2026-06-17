import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { SITE_URL as BASE_URL, GOOGLE_SITE_VERIFICATION } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Raximjon Tulaganov — Frontend Engineer',
    template: '%s | Raximjon Tulaganov',
  },
  description:
    "Raximjon Tulaganov — Frontend Engineer. TurboRepo monorepo asosida ko'p ilovali SaaS platformalar, ERP tizimlar va enterprise dashboard'lar yaratuvchi React mutaxassisi. Qarshi, O'zbekiston.",
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
    'Procraft',
    'Urtak',
  ],
  authors: [{ name: 'Raximjon Tulaganov', url: BASE_URL }],
  creator: 'Raximjon Tulaganov',
  icons: {
    icon: [{ url: '/RTB.jpg', type: 'image/jpeg' }],
    apple: '/RTB.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: BASE_URL,
    siteName: 'Raximjon Tulaganov',
    title: 'Raximjon Tulaganov — Frontend Engineer',
    description:
      "TurboRepo monorepo, SaaS platformalar va enterprise tizimlar mutaxassisi. Qarshi, O'zbekiston.",
    // og:image avtomatik ravishda app/opengraph-image.jsx (1200×630) dan olinadi.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raximjon Tulaganov — Frontend Engineer',
    description: "TurboRepo monorepo, SaaS platformalar va enterprise tizimlar mutaxassisi.",
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
  jobTitle: 'Frontend Engineer',
  description:
    "TurboRepo monorepo asosida SaaS platformalar va enterprise tizimlar quruvchi Frontend Engineer. Qarshi, O'zbekiston.",
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
    'https://www.instagram.com/raximjon_tulaganov/',
  ],
  knowsAbout: [
    'React',
    'TurboRepo',
    'Monorepo Architecture',
    'TailwindCSS',
    'Next.js',
    'SaaS Development',
    'ERP Systems',
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
  description: "Frontend Engineer portfolio — React, TurboRepo, SaaS, ERP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-ready')",
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
      <body className="bg-black text-white antialiased">
        <ScrollReveal />
        <Header />
        <main className="min-h-screen bg-black/40 pt-9">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
