import { ImageResponse } from 'next/og';

// Ijtimoiy tarmoqlar uchun standart kartochka o'lchami.
export const alt = 'Raximjon Tulaganov — Frontend Engineer';
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
          backgroundColor: '#080808',
          backgroundImage:
            'radial-gradient(circle at 78% 18%, rgba(0,243,255,0.16), transparent 42%)',
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
              color: '#00f3ff',
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
            Frontend Engineer
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 16,
              fontSize: 26,
              color: '#5c5c5c',
            }}
          >
            TurboRepo Monorepo · SaaS · ERP · React
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 56, height: 4, backgroundColor: '#00f3ff' }} />
          <span style={{ marginLeft: 20, fontSize: 24, color: '#6b7280' }}>
            Qarshi, O&apos;zbekiston
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
