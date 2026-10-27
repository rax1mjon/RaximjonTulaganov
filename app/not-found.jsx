import Link from 'next/link';

export const metadata = { title: '404 — Sahifa topilmadi' };

export default function NotFound() {
  return (
    <main className="wrap" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
      <p style={{ margin: 0, color: 'var(--muted)' }}>404</p>
      <h1 style={{ margin: 0, fontSize: 'clamp(48px, 8vw, 120px)', lineHeight: 0.92, letterSpacing: '-0.055em', fontWeight: 600 }}>Sahifa topilmadi</h1>
      <Link className="btn btn-solid" href="/" style={{ width: 'fit-content' }}>Bosh sahifaga qaytish</Link>
    </main>
  );
}
