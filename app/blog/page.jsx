import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Blog',
  description: 'Raximjon Tulaganov blogi — tez orada.',
  robots: { index: false },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-6">
      <p className="text-[#00f3ff] font-mono text-sm mb-4">Coming Soon</p>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tighter">
        Blog tez orada
      </h1>
      <p className="text-gray-500 text-sm mb-8 text-center max-w-xs">
        Frontend muhandislik, monorepo arxitektura va web performance bo'yicha maqolalar yozilmoqda.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-500 hover:text-[#00f3ff] transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
