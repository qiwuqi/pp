name: fetch-proxies

on:
  workflow_dispatch:
  schedule:
    - cron: '0 */6 * * *' # 每6小时

jobs:
  update-proxies:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        working-directory: ./proxy-fetcher
        run: npm install

      - name: Run fetch script with retries
        working-directory: ./proxy-fetcher
        run: |
          RETRIES=5
          for i in $(seq 1 $RETRIES); do
            echo "第 $i 次尝试..."
            if node fetch-proxies.mjs; then
              echo "✅ 成功"
              break
            else
              echo "❌ 失败，10 秒后重试..."
              sleep 10
            fi
          done

      - name: Setup Git config
        run: |
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git config --global user.name "github-actions[bot]"

      - name: Set remote URL with token
        run: git remote set-url origin https://x-access-token:${{ secrets.GH_TOKEN }}@github.com/${{ github.repository }}.git

      - name: Commit and push changes
        run: |
          git add proxy-list.txt || echo "无更改文件"
          git commit -m "🤖 自动更新代理列表 $(date '+%F %T')" || echo "无提交"
          git push origin main
