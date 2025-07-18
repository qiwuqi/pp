// functions/index.js  → Cloudflare Pages Functions
export async function onRequestGet() {
  // 1. 拉取 JSON
  const json = await (await fetch('https://proxy.scdn.io/api/get_proxy.php?protocol=https&count=20')).json();
  const list = json?.data?.proxies || [];

  // 2. 随机 10 条
  const picks = [...list].sort(() => Math.random() - 0.5).slice(0, 10).join('\n');
  if (!picks) return new Response('no proxy', { status: 500 });

  // 3. 纯文本返回
  return new Response(picks, { status: 200, headers: { 'Content-Type': 'text/plain' } });
}
