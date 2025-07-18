import fetch from 'node-fetch';
import fs from 'fs';

async function fetchAndSaveProxies() {
  console.log('[1/5] 初始化代理获取流程...');

  try {
    console.log('[2/5] 正在从 proxy.scdn.io 获取数据...');
    const response = await fetch('https://proxy.scdn.io/api/get_proxy.php?protocol=https&count=20');

    if (!response.ok) {
      throw new Error(`请求失败: HTTP ${response.status}`);
    }

    const json = await response.json();
    console.log(`    获取到 ${json.data.count} 个代理IP`);

    const proxies = json.data.proxies;
    if (!Array.isArray(proxies) || proxies.length === 0) {
      throw new Error('未找到有效的代理IP列表');
    }

    console.log(`[3/5] 找到有效IP: ${proxies.length} 个`);
    console.log('[4/5] 随机选取10个IP...');

    const selected = proxies.sort(() => Math.random() - 0.5).slice(0, 10);

    console.log('[5/5] 写入文件 proxy-list.txt...');
    fs.writeFileSync('proxy-fetcher/proxy-list.txt', selected.join('\n'));

    console.log('✅ 成功保存 10 个代理IP到 proxy-fetcher/proxy-list.txt');
  } catch (error) {
    console.error('❌ 执行失败:', error.message);
    process.exit(1);
  }
}

fetchAndSaveProxies();
