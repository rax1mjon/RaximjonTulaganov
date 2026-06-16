import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = { title: '404 — Sahifa topilmadi' };

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-6">
      <p className="text-[#00f3ff] font-mono text-sm mb-4">404</p>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tighter">
        Sahifa topilmadi
      </h1>
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
