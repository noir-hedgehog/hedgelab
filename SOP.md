# 黑棘实验室 网站 SOP

> 标准操作手册 — hedgelab 网站维护指南

---

## 1. 项目概述

**项目：** 黑棘实验室（Noir Hedgehog Lab）官网
**仓库：** `https://github.com/noir-hedgehog/hedgelab`
**技术栈：** Jekyll 4.x + GitHub Pages（无需构建工具，纯静态部署）
**域：** `https://noir-hedgehog.github.io/hedgelab`

**核心文件速查：**

| 文件/目录 | 作用 |
|-----------|------|
| `SPEC.md` | 设计规格说明书（改样式前必读） |
| `_config.yml` | Jekyll 配置（站名、描述、URL） |
| `_posts/*.md` | 博客文章 |
| `index.html` | 落地页（含 Hero/About/Projects/Posts） |
| `blog/index.html` | 博客列表页 |
| `projects/index.html` | 项目展示页 |
| `about/index.html` | 关于页 |
| `assets/css/style.css` | 所有样式 |
| `assets/js/main.js` | 所有交互逻辑 |

---

## 2. 本地开发

### 快速启动

```bash
cd hedgelab/
bundle install
bundle exec jekyll serve
# 访问 http://localhost:4000/hedgelab/
```

### 或用 Docker

```bash
docker run --rm -p 4000:4000 -v $(pwd):/site bretfisher/jekyll-serve
```

> 注意：`baseurl: /hedgelab`，所有本地链接都带 `/hedgelab` 前缀。

---

## 3. 撰写博客文章

### 命名规范

文件名格式：`YYYY-MM-DD-{slug}.md`

示例：`2026-04-24-skill-system-v2.md`

### Front Matter（必填）

```yaml
---
layout: post
title: "文章标题"
date: 2026-04-24
category: 研究    # 公告 / 研究 / 教训 / 笔记
description: 一句话描述（会显示在卡片摘要）
---
```

### 写作检查清单

- [ ] `layout: post` 正确
- [ ] `date` 是实际发布日期
- [ ] `description` 写了（卡片摘要用）
- [ ] 正文无 `layout` / `title` / `date` 字段（已在 front matter）
- [ ] 代码块用 triple backtick，标注语言
- [ ] 无外部图片链接（用 `assets/` 目录或纯 CSS/SVG）

### 发布步骤

```bash
# 1. 创建文件
vim _posts/2026-04-24-xxx.md

# 2. 本地预览确认
bundle exec jekyll serve

# 3. 提交
git add _posts/2026-04-24-xxx.md
git commit -m "feat: add post - $(date +%Y-%m-%d) xxx"
git push origin main
```

> GitHub Pages 自动构建，推送后 1-2 分钟生效。

---

## 4. 更新项目卡片

项目展示有两个位置：

### 4.1 首页 Projects 区块（`index.html`）

编辑 `index.html` 中 `section#projects` 下的 `<article class="card">`。

### 4.2 Projects 专属页（`projects/index.html`）

有两个区块：
- **内部项目**（上半部分）— 自己研发的项目
- **GitHub 公开项目**（下半部分）— 同步自 noir-hedgehog 账户的仓库

#### 添加新内部项目

在 `projects/index.html` 的第一个 `<div class="card-grid">` 中添加：

```html
<article class="card">
  <div class="card-meta">
    <span class="tag tag-green">活跃</span>   <!-- 活跃=green, 实验=violet, 存档=gray -->
  </div>
  <h3>项目名称</h3>
  <p>项目描述。</p>
  <div class="card-tags">
    <span class="tag">标签1</span>
    <span class="tag">标签2</span>
  </div>
</article>
```

#### 状态标签规范

| 状态 | 标签 class | 含义 |
|------|-------------|------|
| 活跃 | `tag-green` | 正在积极开发 |
| 实验 | `tag-violet` | 早期探索阶段 |
| 存档 | `tag-gray` | 已暂停或不再维护 |

---

## 5. 更新 About 页

编辑 `about/index.html`。现有内容：
- CLI 风格的实验室介绍（terminal 动画效果）
- 人类与 AI 协作的愿景声明

如需修改命令行内容，直接改 HTML 中的 `<span class="about-cli-text">` 段落即可。

---

## 6. 设计变更规范（重要）

改样式之前**先读** `SPEC.md`，确保变更符合：
- 调色板（colors）不变
- 字体不变
- 动效风格不变
- 布局结构不变

如果要做大幅度视觉改版，先更新 `SPEC.md` 再执行。

---

## 7. Git 工作流

```
main          ← GitHub Pages 部署分支
```

**只有 main 分支。** 无需其他分支。

```bash
git add .
git commit -m "类型: 简短描述

Types: feat / fix / chore / docs / style"
git push origin main
```

---

## 8. 常见任务清单

### 写一篇新博客
1. 创建 `_posts/YYYY-MM-DD-slug.md`
2. 写 front matter + 正文
3. 本地预览
4. commit + push

### 更新项目状态（活跃→存档）
1. 编辑 `projects/index.html` 中对应卡片的 `<span class="tag-*">`
2. commit + push

### 添加新项目
1. 编辑 `projects/index.html` 添加项目卡片
2. 如项目有 GitHub 仓库，同步到下半部分 GitHub 公开项目区
3. commit + push

### 修改实验室介绍
1. 编辑 `about/index.html`
2. commit + push

### 修改落地页项目区块
1. 编辑 `index.html` 中 `section#projects`
2. commit + push

---

## 9. 联系方式

- GitHub 组织：https://github.com/noir-hedgehog
- 维护者：Uriah & Hekate

---

*SOP 版本：v1.0 — 2026-04-24*
