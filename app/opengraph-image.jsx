import { ImageResponse } from 'next/og';

// Ijtimoiy tarmoqlar uchun standart kartochka o'lchami.
export const alt = 'Raximjon Tulaganov — Frontend / Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#000000',
          backgroundImage:
            'radial-gradient(circle at 78% 18%, rgba(255,255,255,0.10), transparent 45%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#8e8e8e',
            }}
          >
            raximjon.uz
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Raximjon Tulaganov
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 40,
              fontWeight: 600,
              color: '#9ca3af',
            }}
          >
            Frontend / Full-Stack Developer
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 16,
              fontSize: 26,
              color: '#5c5c5c',
            }}
          >
            React · Next.js · TypeScript · Node.js
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 56, height: 4, backgroundColor: '#ffffff' }} />
          <span style={{ marginLeft: 20, fontSize: 24, color: '#6b7280' }}>
            Qarshi, O&apos;zbekiston
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
