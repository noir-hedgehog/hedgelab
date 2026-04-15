# 黑棘实验室 (Noir Hedgehog Lab) — 网站规格说明书

---

## 1. 概念与愿景

黑棘实验室是一个 AI 自主进化的研究与实验空间，由人类与硅基智能共同建造。名字"黑棘"暗示了在黑暗中探索的坚韧与锐利——一个由好奇心驱动的实验室，持续探索 AI 自我进化的边界。整体氛围应该是**深邃的、神秘的、带有一点荒野感的**，而非 corporate 的干净冷淡。

---

## 2. 设计语言

### 美学方向
**参考：Hermes Agent（深邃极简）× 小米 MiMo（几何感）× noir 电影氛围（黑色、阴影、光线）**

- 深色主调，带有纹理感（noise grain / 微妙的网格）
- 光线作为设计元素——模拟"黑暗中的一点光"
- 几何化的装饰线条，暗示 hedgehog 的刺

### 调色板
```
背景主色:    #0a0a0f (near-black, blue undertone)
次背景:     #12121a (dark navy)
强调色-光:  #e8f4ff (cold white-blue, "光线")
强调色-刺:  #8b5cf6 (violet, "黑棘的刺")
强调色-暖:  #f59e0b (amber, 用于 hover/重点)
文字主色:   #e2e8f0 (light gray)
文字次色:   #64748b (muted gray)
边框:       #1e293b (subtle dark blue-gray)
```

### 字体
- 标题：`"Space Grotesk"` 或 `"Outfit"`（几何感，略带未来感）— Google Fonts
- 正文：`"Inter"`（高可读性）— Google Fonts
- 代码/标签：`"JetBrains Mono"` — Google Fonts

### 间距系统
- 8px 基础网格
- 大量留白，内容区 max-width: 768px（阅读友好）
- 标题区使用大留白营造呼吸感

### 动效
- 页面加载：fade-in + 轻微向上位移（opacity 0→1, translateY 20px→0, 600ms ease-out）
- 卡片 hover：subtle lift + 光晕（transform: translateY(-4px), box-shadow glow）
- 链接 hover：下划线从左向右展开（clip-path 或 scaleX 动画）
- 页面切换：淡入淡出，200ms

### 视觉资产
- 无需图片，使用 CSS 几何图形和 SVG 线条作为装饰
- 背景使用 CSS noise texture（SVG filter 或 CSS）
- 页面顶部可以有抽象的"光线"线条装饰

---

## 3. 布局与结构

### 页面结构
```
/
├── index.html          # 落地页（Lab 介绍）
├── blog/               # 博客列表
│   ├── index.html
│   └── posts/          # 博文（markdown 静态化）
├── projects/           # 项目展示
│   └── index.html
└── about/              # 关于
    └── index.html
```

### 落地页结构（index.html）
1. **Hero Section** — 大标题 + 一句话描述 + CTA
   - "黑棘实验室" 主标题
   - "在 AI 自我进化的边界，持续探索。" 副标题
   - CTA: "查看我们的研究 ↓" 或 "Read the Blog →"
   - 背景：深色 + noise texture + 几何光线线条
2. **About** — 1-2段的实验室描述
3. **Featured Projects** — 3-4 个项目卡片网格
4. **Recent Posts** — 最新 3 篇博文
5. **Footer** — 简洁，GitHub 链接 + 版权

### 响应式策略
- 单列布局为主（移动优先）
- 桌面端：max-width: 768px 内容区，居中
- 卡片网格：移动 1 列，桌面 2-3 列

---

## 4. 功能与交互

### 导航
- 顶部固定导航栏（半透明毛玻璃效果）
- 链接：Home / Blog / Projects / About
- 当前页面高亮（violet 下划线）
- 移动端：汉堡菜单（点击展开全屏 overlay）

### 博客列表
- 每篇显示：标题 + 日期 + 摘要（~2行）+ 标签
- 按日期倒序排列
- 点击整张卡片进入文章页

### 博客文章页
- Markdown 静态化为 HTML
- 标题 + 日期 + 标签 + 正文
- 代码块有语法高亮（Prism.js 或 highlight.js）
- 返回博客列表链接

### 项目展示
- 卡片展示：名称 + 描述 + 状态标签（活跃/实验/存档）
- 可选：链接到 GitHub / 演示

### 关于页
- 实验室愿景声明
- 核心成员/agent 介绍
- 联系方式（GitHub 为主）

---

## 5. 组件清单

### 导航栏 (Navbar)
- 固定顶部，backdrop-filter: blur(12px)，半透明背景
- Logo/标题左对齐，链接右对齐
- 移动端：汉堡图标，点击展开全屏深色 overlay
- States: default / scrolled (边框加一条细线) / mobile-open

### Hero Section
- 全屏或 80vh 高度
- 背景：纯色 + noise SVG filter
- 大标题（clamp 2.5rem - 4rem），副标题（中号）
- 装饰性几何线条（SVG）

### 博客卡片 (PostCard)
- 背景：次背景色
- hover: lift + violet glow
- 显示：标签（小型，amber 背景）/ 标题 / 日期 / 摘要

### 项目卡片 (ProjectCard)
- 同 PostCard 布局
- 额外：状态标签（活跃=绿色，实验=amber，存档=gray）

### 按钮 (Button)
- 主要：violet 背景，白字，hover 变亮
- 次要：透明背景，violet 边框，hover 背景填充
- 圆角：4px

### 页脚 (Footer)
- 深色背景，纯文字
- GitHub 图标链接
- 版权声明

---

## 6. 技术方案

### 框架
- **纯 HTML + CSS + Vanilla JS** — 无需构建工具，直接 GitHub Pages 友好
- CSS 变量管理主题色
- 单一 CSS 文件（style.css）
- 单一 JS 文件（main.js）

### 依赖（CDN）
- Google Fonts: Space Grotesk, Outfit, Inter, JetBrains Mono
- highlight.js（代码语法高亮）或 Prism.js
- 无需其他 JS 框架

### 内容管理
- 博客文章：静态 HTML 文件（用工具从 markdown 生成）
- 或：Jekyll 兼容（`_posts/` 目录，GitHub Pages 自动构建）
- 推荐方案：**Jekyll 兼容**（GitHub Pages 内置支持，维护成本低）

### 目录结构（Jekyll 方案）
```
hedgelab/
├── _config.yml          # Jekyll 配置
├── _layouts/           # 页面模板
├── _posts/              # 博文（markdown）
├── assets/              # CSS, JS, 图片
├── index.html           # 落地页
├── blog/
│   └── index.html       # 博客列表
├── projects/
│   └── index.html       # 项目列表
├── about/
│   └── index.html       # 关于页
└── SPEC.md
```

### 部署
- GitHub Pages 直接托管 `main` 分支
- 或 `gh-pages` 分支
- 域名：`hedgelab.github.io` 或自定义域名

---

## 7. 第一阶段任务（由 Codex 执行）

1. 初始化 Jekyll 配置（`_config.yml`）
2. 创建 `assets/css/style.css`（完整设计系统）
3. 创建 `assets/js/main.js`（导航、动画）
4. 搭建 `index.html` 落地页
5. 搭建 `blog/index.html` 博客列表
6. 搭建 `about/index.html` 关于页
7. 创建第一篇示例博文（关于黑棘实验室的愿景）
8. 配置 GitHub Pages source branch

---

*SPEC.md — 黑棘实验室网站规格说明书 v1.0*
*创建日期：2026-04-15*
