这是一个轻量级的 Python 脚本 (get_proxies.py)，旨在自动从指定的 API 获取免费的 HTTPS 代理服务器列表，并将其保存到文本文件中。该脚本与 GitHub Actions 工作流集成，可实现完全自动化的定时更新。

🚀 主要功能
API 获取: 从 proxy.scdn.io API 接口获取最新的 HTTPS 代理。
随机筛选: 从获取到的代理池中随机选择指定数量的代理，确保每次列表都有一定的随机性。
文件输出: 将筛选后的代理列表（格式为 IP:PORT）保存到 proxy-list.txt 文件中。
错误处理: 包含基本的网络请求和数据解析错误处理，确保脚本的健壮性。
自动化设计: 完美兼容 GitHub Actions，可实现无人值守的定时更新和提交。
🔧 如何使用
1. 环境准备
确保您的环境中已安装 Python 3 和 requests 库。
# 安装 requests 库
pip install requests
2. 本地运行
您可以直接在本地运行此脚本来立即获取一份代理列表。
python get_proxies.py
运行成功后，您将在脚本所在目录下看到一个名为 proxy-list.txt 的文件，内容如下所示：
206.188.204.64:8443
165.225.113.220:11712
205.178.137.232:8447
...
⚙️ 通过 GitHub Actions 实现自动化
本项目最核心的用法是结合 GitHub Actions 实现自动化。仓库中的 .github/workflows/update-proxies.yml 文件已经为您配置好了这一切。

工作流简介
触发方式:
定时触发: 默认配置为每 12 小时自动运行一次 (cron: '0 */12 * * *')。
手动触发: 您也可以在 GitHub 仓库的 "Actions" 页面手动触发此工作流。
执行步骤:
检出代码: actions/checkout@v4 拉取最新的仓库代码。
设置 Python 环境: actions/setup-python@v5 准备 Python 运行环境。
安装依赖: 安装 requests 库。
运行脚本: 执行 python get_proxies.py 生成最新的 proxy-list.txt。
提交并推送:
检查 proxy-list.txt 文件是否有变动。
如果有变动，则使用 github-actions[bot] 的身份自动将新文件提交 (commit) 并推送 (push) 到您的仓库 main 分支。
如何启用
如果您 Fork 了此项目，GitHub Actions 将默认启用。您只需将代码推送到您的仓库，自动化流程便会按计划开始工作。

🛠️ 自定义配置
您可以轻松修改 get_proxies.py 脚本以满足您的特定需求：

更改 API 地址: 修改 api_url 变量以从其他来源获取代理。
更改获取数量: 修改 api_url 中的 count=20 参数来调整从 API 请求的代理数量。
更改筛选数量: 修改 random.sample(proxies, 10) 中的 10 来调整最终保存到文件中的代理数量。
更改输出文件名: 修改 output_filename 变量来指定不同的输出文件名。
# get_proxies.py

# ...
def fetch_and_save_proxies():
    # ...
    api_url = "https://proxy.scdn.io/api/get_proxy.php?protocol=https&count=20" # 可修改
    # ...
    output_filename = "proxy-list.txt" # 可修改
    # ...
    # ...
    if len(proxies) < 10: # 这里的 10 也需要考虑修改
        # ...
    else:
        selected_proxies = random.sample(proxies, 10) # 可修改
    # ...
                                                                             by  春山空
