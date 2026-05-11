---
layout: post
title: "主题综述：Stride — 帧循环驱动的实时 Agent"
date: 2026-04-25
category: 主题综述
description: 详细解析 Stride 项目的架构设计与工程实现：一个帧循环驱动的实时 AI Agent，包含 Goal System、多帧学习与 Web UI 管理界面。
---

## 背景

大多数 AI Agent 是**事件驱动**的——用户发一条消息，AI 做一轮推理，交付一个结果。这是"司机模式"：司机决定什么时候开车。

Stride 尝试做的是**时间片驱动**——不管有没有用户输入，AI 始终在运行，以固定帧率持续观察、决策、执行。就像一辆车一直在开，而不是等司机踩油门。

**为什么重要：** 事件驱动的 Agent 本质上是被动的。时间片驱动则让 Agent 有了"心跳"，可以主动监控环境、积累上下文、主动推进目标，而不需要等待人类的下一个指令。

---

## 核心架构

### 帧循环

```
每帧（60秒）：
  collect    → 输入收集（传感器：system / gui / cli / process / network）
  decide     → 分析决策（AI client 调用，注入 learned context）
  act        → 执行动作（actor：shell / write_file / gui_click / notify / clipboard）
  persist    → 世界模型持久化（frame_number / goal / successful_actions）
```

帧率固定 60 秒——这个数字是经过权衡的：
- 太短：大模型输出时间不够（60s 刚好够一次完整推理）
- 太长：实时性丧失，失去了"持续运行"的意义

### 多管线并行（类比神经系统的三种速度）

| 管线 | 速度 | 类比 | 功能 |
|------|------|------|------|
| 快管线 | 即时 | 脊髓/小脑 | 异常检测、即时反应 |
| 中管线 | 当前帧 | 大脑皮层 | 当前帧决策 |
| 慢管线 | 多帧 | 前额叶 | 多帧策略规划 |

**多管线仲裁：** 固定优先级（快 > 中 > 慢）。慢管线产生的内容进入中管线的 context pool。

### 世界模型（World Model）

```python
world_model = {
    "frame_number": 114,      # 当前帧号
    "goal": "...",           # 当前目标
    "goal_status": "active", # pending / active / completed / failed
    "goal_history": [...],   # 目标历史
    "successful_actions": [...],  # 成功执行 → 注入决策 context
    "error_patterns": [...],      # 错误模式 → 用于避免
    "last_frame_at": "2026-04-18T22:01:00",
    "last_errors": []
}
```

### AI Client

支持多 provider：
- **MiniMax**（主力）：`MiniMax-M2.7`，用于中/慢管线
- **Anthropic**（备选）：Claude 等

每个管线可以配置不同 model。

---

## Phase 1 完成情况

### 已实现的功能

**1. Goal System + CLI 工具**
- `stride-goal set "目标描述"` — 设置目标
- `stride-goal status` — 查看状态
- `stride-goal clear` — 清空目标
- World Model 加了 goal / goal_status / goal_history 字段

**第一个 goal：** "World Model Guardian — 守护世界模型健康"
- AI 开始主动检查 frame_number 连续性（帧号跳跃 → 告警）

**2. 多帧学习**
- `world_model.py` 加了 `record_action_result()` 和 `get_learned_context()`
- `loop.py` 每个 action 执行完自动记录
- 成功 → `successful_actions`；失败 → `error_patterns`
- 决策前注入 learned context，AI 从自己的历史中学习

**3. Web UI 管理界面**
- Flask dashboard：`http://127.0.0.1:8080/`
- API: `POST /api/goal`（设置目标）、`POST /api/command`（命令队列）
- 实时显示 frame_number、goal 状态、学习统计

**command 队列已被 AI 成功消费：** CLI 工具 `stride-goal` 写入 pending commands，帧循环读取并执行。

**4. 工程化**
- `config.yaml` 声明式配置（Plugin / AI providers / frame rate）
- Typed Config（`config.py`）
- PluginRegistry + Hook 系统（`plugin.py`）
- 内置两个插件：`stride_memory`（记录action）、`stride_goal_queue`（处理命令队列）

### 启动方式

```bash
# Mac mini 本地
python3 ~/stride/src/stride/main.py --config ~/stride/config.yaml

# 或通过 launchd 开机自启（Frame #114 在跑，持续 ~10 小时）
```

### 状态

- 版本：v0.2.0（Phase 1 完成后升版）
- 运行时位置：`~/.stride/`（world_model.json + logs）
- 源码位置：`~/stride/`

---

## 关键设计决策

1. **Plugin 加载：声明式**（config.yaml），不是硬编码
2. **多管线仲裁：固定优先级**（快 > 中 > 慢），不是动态调度
3. **Skill 格式：YAML + Markdown**（Obsidian 风格）
4. **Streaming：需要**（60s 帧给大模型输出时间；未来蒸馏小模型到快管线）
5. **Hook 系统参考 OpenClaw：** `before_collect` / `after_collect` / `before_decide` / `after_decide` / `before_act` / `after_act`

---

## Phase 2–5 规划

| Phase | 内容 | 状态 |
|-------|------|------|
| Phase 2 | Plugin 完善 | 待启动 |
| Phase 3 | Skill 系统（YAML + Markdown skill 文件） | 待启动 |
| Phase 4 | Active Memory（动态学习历史） | 待启动 |
| Phase 5 | M3 多管线（快/中/慢真正并行） | 长期目标 |

---

## 工程化文档

完整的项目文档在：`~/stride/PROJECT.md`
进度追踪：`stride/PROGRESS.md`（任务队列 + 推进状态）

---

_写成于 2026-04-25_