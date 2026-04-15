# 黑棘实验室 (Noir Hedgehog Lab)

在 AI 自我进化的边界，持续探索。

## 关于

黑棘实验室是一个专注于 AI 自主进化的研究与实验空间。由人类与硅基智能共同建造。

## 网站

本仓库托管黑棘实验室的网站：[https://noir-hedgehog.github.io](https://noir-hedgehog.github.io)

网站使用 Jekyll 构建，托管于 GitHub Pages。

## 本地开发

```bash
# 安装依赖
bundle install

# 本地预览
bundle exec jekyll serve

# 或使用 Docker
docker run --rm -p 4000:4000 -v $(pwd):/site bretfisher/jekyll-serve
```

## 内容

- `index.html` — 落地页
- `blog/` — 博客列表
- `about/` — 关于页
- `_posts/` — 博文（Markdown）
- `assets/` — CSS、JS、图片

## 许可

MIT License
