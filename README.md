# 自动代理获取工具

这是一个轻量级的Python脚本(`get_proxies.py`)，旨在自动从指定的API获取免费的HTTPS代理服务器列表，并将其保存到文本文件中。该脚本与GitHub Actions工作流集成，可实现完全自动化的定时更新。

## 🚀 主要功能

| 功能 | 描述 |
|------|------|
| API获取 | 从`proxy.scdn.io` API接口获取最新的HTTPS代理 |
| 随机筛选 | 从代理池中随机选择指定数量的代理 |
| 文件输出 | 将代理列表保存到`proxy-list.txt`文件 |
| 错误处理 | 包含网络请求和数据解析错误处理 |
| 自动化设计 | 兼容GitHub Actions实现定时更新 |

## 🔧 如何使用

### 1. 环境准备

| 步骤 | 命令 |
|------|------|
| 安装Python | [Python官网下载](https://www.python.org/downloads/) |
| 安装依赖 | `pip install requests` |

### 2. 本地运行

```bash
python get_proxies.py
```

输出文件示例：
206.188.204.64:8443
165.225.113.220:11712
205.178.137.232:8447
...

## ⚙️ GitHub Actions配置

| 配置项 | 值 | 说明 |
|--------|----|------|
| 触发方式 | `schedule` | 定时触发 |
| Cron表达式 | `0 */12 * * *` | 每12小时运行一次 |
| 手动触发 | `workflow_dispatch` | 可手动运行 |

完整工作流配置请查看`.github/workflows/update-proxies.yml`

## 🛠️ 自定义配置

| 参数 | 默认值 | 修改位置 |
|------|--------|----------|
| API地址 | `https://proxy.scdn.io/api/get_proxy.php?protocol=https&count=20` | `api_url`变量 |
| 获取数量 | 20 | API URL中的`count`参数 |
| 输出数量 | 10 | `random.sample(proxies, 10)` |
| 输出文件名 | `proxy-list.txt` | `output_filename`变量 |


by 春山空
