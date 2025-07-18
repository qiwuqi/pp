// OpenAI 支持的国家列表（49个国家）
const OPENAI_COUNTRIES = new Set([
  'US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO',
  'DK', 'FI', 'AU', 'JP', 'SG', 'KR', 'IN', 'BR', 'MX', 'PL',
  'TR', 'ZA', 'TH', 'MY', 'CH', 'BE', 'AT', 'PT', 'IE', 'CZ',
  'HU', 'GR', 'SK', 'SI', 'HR', 'BG', 'RO', 'EE', 'LV', 'LT',
  'LU', 'MT', 'CY', 'IS', 'LI', 'MC', 'AD', 'SM', 'VA'
]);

/**
 * 获取并保存代理IP列表
 */
async function fetchAndSaveProxies() {
  console.log('[1/5] 初始化代理获取流程...');

  try {
    // 1. 网络请求
    console.log('[2/5] 正在从 proxy.scdn.io 获取数据...');
    const response = await fetch('https://proxy.scdn.io/api/get_proxy.php?protocol=https&count=20', {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`请求失败: HTTP ${response.status}`);
    }

    const json = await response.json();
    console.log(`    获取到 ${json.data.count} 个代理IP`);

    // 2. 提取IP:PORT
    console.log('[3/5] 解析代理IP...');
    const proxies = json.data.proxies;

    if (!Array.isArray(proxies) || proxies.length === 0) {
      throw new Error('未找到有效的代理IP列表');
    }

    console.log(`    找到有效IP: ${proxies.length} 个`);

    // 3. 随机选取10个
    console.log('[4/5] 随机选取10个IP...');
    const selected = proxies
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    // 4. 写入文件
    console.log('[5/5] 写入文件 proxy-list.txt...');
    const fs = require('fs');
    fs.writeFileSync('proxy-list.txt', selected.join('\n'));
    console.log('='.repeat(50));
    console.log(`✅ 成功保存 ${selected.length} 个代理IP到 proxy-list.txt`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ 执行失败:', error.message);
    process.exit(1);
  }
}

// 使用动态 import 加载 node-fetch
import('node-fetch').then(({ default: fetch }) => {
  // 替换全局 fetch
  global.fetch = fetch;
  // 执行脚本
  fetchAndSaveProxies();
}).catch(err => {
  console.error('❌ 加载 node-fetch 失败:', err.message);
  process.exit(1);
});
