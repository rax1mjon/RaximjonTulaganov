// Aloqa formasi: xabarni serverdan Telegram'ga yuboradi.
// Token brauzerga hech qachon chiqmaydi. Vercel → Settings → Environment Variables:
//   TELEGRAM_BOT_TOKEN  — @BotFather bergan yangi token
//   TELEGRAM_CHAT_ID    — xabar boradigan chat (sizning ID'ingiz)

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_PER_WINDOW;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Bo'sh bo'lishi kerak bo'lgan yashirin maydon: botlar uni to'ldiradi.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 80);
  const contact = clean(body.contact, 120);
  const message = clean(body.message, 2000);
  if (!name || !contact || message.length < 5) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 422 });
  }

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });

  const text =
    `<b>Yangi xabar — raximjon.uz</b>\n\n` +
    `<b>Ism:</b> ${esc(name)}\n` +
    `<b>Aloqa:</b> ${esc(contact)}\n\n` +
    `${esc(message)}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    });
    const data = await res.json();
    if (!data.ok) return Response.json({ ok: false, error: 'telegram' }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: 'network' }, { status: 502 });
  }
}
