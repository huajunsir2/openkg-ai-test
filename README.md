# OpenKG 开放知识图谱 · 新版官方网站

> **智能的本质是知识** — 开放促进互联，链接创造价值。

这是 **OpenKG**（开放知识图谱）面向**大模型时代**全新构建的官方网站。新版网站把整个 OpenKG 从传统的"开放资源库"重新定位为以**核心项目驱动的关键技术栈**，全面拥抱大模型带来的范式变化。

愿景：在通用人工智能时代，**重构人类知识的表示与组织逻辑**。

---

## 技术栈

- **Vue 3** + **Vue Router 4**（Composition API + `<script setup>`）
- **Vite 6** 极速构建
- **SCSS** 主题系统（CSS 变量 + Sass 函数）
- 纯前端动效（Canvas 粒子背景、CSS 动画、SVG 图形），**零额外 UI 框架依赖**

## 设计风格

- 主色调：**天蓝色（Sky-Blue）** + 紫蓝渐变
- 风格：**科技感 / 未来感 / 大模型时代美学**
- 视觉元素：粒子星空背景、辉光效果、毛玻璃、SVG 知识图谱图形、轨道环绕的"知识球体"

## 网站信息架构

```
主页（Home）
├─ 核心项目（Projects）
│   ├─ cnSchema / OneGraph    （数据层 · SIGData）
│   ├─ SPG / KAG              （推理层 · SIGSPG）
│   ├─ OneEval                （评测层 · SIGEval）
│   ├─ SkillNet               （Agent 层 · SIGAgent）
│   └─ SciGraph               （科研层 · SIGModel）
├─ 兴趣小组（SIGs）           — 与五大核心项目一一对应
├─ TOC 技术委员会（TOC）       — 五人管理组 + 轮值主席机制
├─ 资源库（Resources）         — 弱化展示，引导至核心项目
├─ 新闻动态（News）
└─ 关于我们（About）           — 使命 / 愿景 / 发起人 / 历程
```

## 核心叙事

新版网站的核心叙事围绕"**OpenKG 大模型时代的知识技术栈**"展开：

| 层级       | 项目                  | SIG       |
| ---------- | --------------------- | --------- |
| 评测层     | **OneEval**           | SIGEval   |
| Agent 层   | **SkillNet**          | SIGAgent  |
| 推理层     | **SPG / KAG**         | SIGSPG    |
| 数据层     | **cnSchema / OneGraph** | SIGData |
| 科研层     | **SciGraph**          | SIGModel  |

## 五人管理委员会

新版网站突出由 **陈华钧教授**（浙江大学）牵头的五人管理组：

- **陈华钧** · 牵头发起人 · TOC 主席（浙江大学）
- **漆桂林** · 联合发起人（东南大学）
- **王昊奋** · 联合发起人 · 轮值主席（同济大学）
- **胡伟** · 管理委员（南京大学）
- **陈文亮** · 管理委员（苏州大学）

## 本地开发

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器（默认 http://localhost:5173）
npm run build      # 生产构建 + 同步到仓库根目录（用于 GitHub Pages）
npm run build:dist # 仅构建到 dist/（不同步根目录）
npm run preview    # 预览构建产物（http://localhost:4173）
```

要求：**Node.js 18+**（推荐 Node 20）。

## 目录结构

```
仓库根/
├─ index.html              # 构建后的入口（GitHub Pages 服务）
├─ assets/                 # 构建产物
├─ favicon.svg, .nojekyll, 404.html
│
├─ web/                    # 源代码目录
│   ├─ index.html          # Vite 模板
│   ├─ vite.config.js
│   └─ src/
│       ├─ components/     # Header / Footer / 粒子背景 / 知识球体 / 卡片
│       ├─ views/          # 7 个页面（含项目详情动态路由）
│       ├─ data/site.js    # 单一数据源
│       ├─ router/         # Hash 路由
│       ├─ styles/         # 全局主题与动画
│       ├─ App.vue
│       └─ main.js
│
├─ scripts/deploy-root.mjs # 把 dist/ 同步到仓库根目录
└─ .github/workflows/      # GitHub Actions 自动构建部署
```

## 路由

采用 **Hash 模式（`createWebHashHistory`）**，便于在静态托管（GitHub Pages / OSS / CDN）下直接部署，无需服务端配置 fallback。

## 部署

### GitHub Pages（已配置）

仓库根目录直接包含构建产物（`index.html` + `assets/`），所以 GitHub Pages 可以**直接以源分支根目录作为 Source** 服务。

> 我们采用"源代码放 `web/`，构建产物输出到根目录"的布局，避免了 GitHub Pages 把开发模式的 `index.html`（含 `import "/src/main.js"` 这类裸模块导入）当作静态文件直接派发，从而出现白屏。

构建完成后会自动：
- 把 `dist/index.html`、`dist/assets/`、`favicon.svg`、`.nojekyll`、`404.html` 复制到仓库根
- 让 GitHub Pages 直接服务生产产物

### 其他平台

`dist/` 目录可直接部署至：

- 阿里云 OSS / 腾讯云 COS
- Netlify / Vercel
- Nginx / Apache

## 后续工作建议

- [ ] 接入真实 CMS 或 Markdown 化的新闻系统
- [ ] 中英双语切换（i18n）
- [ ] 引入富媒体（视频、年度回顾长图、SIG 详情页）
- [ ] 接入 OpenKG 各核心项目的 GitHub 数据（Star / 最近发版）
- [ ] 加入 OneEval 实时榜单接口

---

© 2015 - 2026 OpenKG · 开放知识图谱社区  
由中国中文信息学会语言与知识计算专业委员会发起
