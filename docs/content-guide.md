# 内容维护指南

这份指南用于维护黑棘实验室网站的公开内容，重点覆盖博客、项目列表、本地预览和发布流程。

## 博客文章

文章放在 `_posts/`，文件名使用：

```text
YYYY-MM-DD-slug.md
```

示例：

```text
2026-05-11-agent-memory-notes.md
```

文章必须包含 front matter：

```yaml
---
layout: post
title: "标题"
date: 2026-05-11
category: 每日进展
description: 一句话摘要，用于列表页、SEO 和分享预览。
---
```

`date` 应与文件名日期一致。同一天发布多篇文章时，slug 必须不同，避免生成相同 URL。

常用分类：

- `每日进展`
- `主题综述`
- `对话记录`
- `项目复盘`

正文建议结构：

```markdown
## 做了什么

## 关键发现

## 对项目的影响

## 下一步
```

不必每篇都套用同一结构。短日志可以更轻，主题综述应更重视问题背景、判断依据和结论。

## 写作口径

- 使用中文为主，保留必要英文技术名词。
- 标题尽量具体，避免只写“今日进展”。
- `description` 控制在一句话内，说明本文最重要的信息。
- 可以记录正在进行的实验，但外部页面避免暴露敏感 token、私密路径、未公开账号信息。
- 引用外部资料时尽量附链接。

## 项目列表

Projects 页面读取 `_data/projects.json`。新增或调整项目时，优先确认项目已经有公开 GitHub 仓库。

每个项目条目建议包含：

- `name`
- `description`
- `url`
- `status`
- `tags`

## 本地预览

安装依赖：

```bash
bundle install
```

启动预览：

```bash
bundle exec jekyll serve
```

默认访问：

```text
http://localhost:4000/hedgelab/
```

如果只想验证构建：

```bash
bundle exec jekyll build
```

## 发布流程

1. 在本地新增或修改内容。
2. 运行 `bundle exec jekyll build`，确认无构建错误。
3. 提交并推送到 `main`。
4. GitHub Actions 自动部署 GitHub Pages。

发布后站点地址：

```text
https://noir-hedgehog.github.io/hedgelab/
```

## 交给 Codex 更新时

把以下信息发过来即可：

- 文章主题或原始材料
- 希望发布时间
- 希望分类
- 是否需要配图或外部链接
- 是否可以直接发布到 `main`

如果没有指定，默认按当天日期、合适分类、中文技术博客风格处理，并在推送前先本地构建验证。
