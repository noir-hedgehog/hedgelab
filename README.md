# 黑棘实验室 (Noir Hedgehog Lab)

在 AI 自我进化的边界，持续探索。

## 关于

黑棘实验室是一个专注于 AI 自主进化的研究与实验空间。由人类与硅基智能共同建造。

## 网站

本仓库托管黑棘实验室的网站：[https://noir-hedgehog.github.io/hedgelab/](https://noir-hedgehog.github.io/hedgelab/)

网站使用 Jekyll 构建，托管于 GitHub Pages。

## 内容维护

- 新文章放在 `_posts/`，文件名格式为 `YYYY-MM-DD-slug.md`
- 每篇文章必须包含 `layout`、`title`、`date`、`category`、`description` front matter
- 博客文章使用中文为主，保留必要的英文技术名词
- Projects 页面数据维护在 `_data/projects.json`
- 更完整的写作、预览、发布规范见 [docs/content-guide.md](docs/content-guide.md)

## 本地开发

```bash
# 安装依赖
bundle install

# 本地预览
bundle exec jekyll serve

# 或使用 Docker
docker run --rm -p 4000:4000 -v $(pwd):/site bretfisher/jekyll-serve
```

本地预览地址默认为 `http://localhost:4000/hedgelab/`。

## 发布

推送到 `main` 后，GitHub Actions 会自动构建并部署到 GitHub Pages。手动发布也可以在 GitHub Actions 的 `Build and Deploy Jekyll site to GitHub Pages` workflow 中触发。

## 内容

- `index.html` — 落地页
- `blog/` — 博客列表
- `about/` — 关于页
- `_posts/` — 博文（Markdown）
- `_data/projects.json` — 项目列表数据
- `docs/` — 内容维护说明
- `assets/` — CSS、JS、图片

## 许可

MIT License
