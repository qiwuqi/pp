import fetch from 'node-fetch';
import fs from 'fs';

const proxyURL = 'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt';

async function safeFetch(url, retries = 3, timeout = 8000) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(id);

      if (!res.ok) throw new Error(`HTTP 状态码 ${res.status}`);
      const text = await res.text();
      return text;
    } catch (err) {
      console.warn(`⚠️ 第 ${i + 1} 次尝试失败: ${err.message}`);
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 3000)); // 重试等待
    }
  }
}

(async () => {
  console.log('[1/3] ⏳ 正在尝试获取代理列表...');
  try {
    const proxyText = await safeFetch(proxyURL);
    fs.writeFileSync('./proxy-list.txt', proxyText.trim());
    console.log('[3/3] ✅ 已写入 proxy-list.txt');
  } catch (e) {
    console.error(`❌ 最终失败：${e.message}`);
    process.exit(1);
  }
})();
