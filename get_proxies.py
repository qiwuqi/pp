import requests
import random
import sys

def fetch_and_save_proxies():
    """
    从 API 获取代理 IP，随机选择10个，并保存到文件中。
    """
    print("[1/5] 初始化代理获取流程...")
    api_url = "https://proxy.scdn.io/api/get_proxy.php?protocol=https&count=20"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }
    output_filename = "proxy-list.txt"

    try:
        # 1. 网络请求
        print(f"[2/5] 正在从 API 获取数据...")
        response = requests.get(api_url, headers=headers, timeout=15)
        response.raise_for_status()  # 如果请求失败 (状态码 4xx 或 5xx), 则抛出异常

        data = response.json()
        print(f"    获取到 {data.get('data', {}).get('count', 0)} 个代理IP")

        # 2. 提取IP:PORT
        print("[3/5] 解析代理IP...")
        proxies = data.get('data', {}).get('proxies', [])

        if not proxies:
            raise ValueError("API响应中未找到有效的代理IP列表")

        print(f"    找到有效IP: {len(proxies)} 个")

        # 3. 随机选取10个
        print("[4/5] 随机选取10个IP...")
        if len(proxies) < 10:
            print(f"    注意: 可用代理少于10个，将全部选用 (共 {len(proxies)} 个)")
            selected_proxies = proxies
        else:
            selected_proxies = random.sample(proxies, 10)

        # 4. 写入文件
        print(f"[5/5] 写入文件 {output_filename}...")
        with open(output_filename, 'w', encoding='utf-8') as f:
            f.write('\n'.join(selected_proxies))

        print("=" * 50)
        print(f"✅ 成功保存 {len(selected_proxies)} 个代理IP到 {output_filename}")
        print("=" * 50)

    except requests.exceptions.RequestException as e:
        print(f"❌ 执行失败: 网络请求错误 - {e}", file=sys.stderr)
        sys.exit(1)
    except (ValueError, KeyError) as e:
        print(f"❌ 执行失败: 数据解析错误 - {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    fetch_and_save_proxies()