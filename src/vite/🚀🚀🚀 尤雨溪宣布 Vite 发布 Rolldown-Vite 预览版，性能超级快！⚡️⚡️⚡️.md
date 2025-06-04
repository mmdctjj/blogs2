---
title: 🚀🚀🚀 尤雨溪宣布 Vite 发布 Rolldown-Vite 预览版，性能超级快！⚡️⚡️⚡️
isTimeLine: true
date: 2025-05-31
category:
  - 前端
tag:
  - JavaScript
  - Vite
---

### 前言

前几天我分享了 `vite` 即将推出 `Rolldown` 版本，现在它来了！

`2025` 年 `5` 月 `30` 日，`VoidZero` 团队发布了一篇博客，宣布 `Rolldown-Vite` 的发布预览版！

博文地址：https://voidzero.dev/posts/announcing-rolldown-vite

#### 往期精彩推荐

- [🚀🚀🚀 这些高效实用的 vite 插件你一定要知道！更新弹窗、mock 数据、开发快捷键、自动导入...](https://juejin.cn/post/7509433454464909321)
- [⚡️ 量大管饱，这 9 个 vite 插件让你的开发更简单！🚀🚀🚀](https://juejin.cn/post/7509016779038588982)
- [苏醒吧，Remix！好消息，Remix 将基于 Preact 重构，更快更轻量！🚀🚀🚀](https://juejin.cn/post/7509878884356866067)
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军

### 正文

#### `Rolldown-Vite` 的背景与技术基础

`Rolldown-Vite` 是 `VoidZero` 团队过去 `一年` 努力的成果，目标是打造下一代 `JavaScript` 工具链。核心组件 `Rolldown` 是一个基于 `Rust` 的打包器，性能远超传统的 `Rollup` 和 `esbuild`。它依托 `Oxc` 工具集，包括解析器、转换器、解析器、压缩器和 `linter`，为 `JavaScript` 和 `TypeScript` 的处理提供了高效的基础支持。

目前，`Rolldown-Vite` 已实现与 `Vite` 的初始功能齐全，开发者可以将其作为 `Vite` 的直接替代品，立即体验性能提升。作为技术预览版本，`VoidZero` 邀请开发者试用并提供反馈，以进一步优化。

#### 显著的性能提升

`Rolldown-Vite` 在实际项目中的性能表现令人瞩目，以下是一些关键案例的数据：

在多个知名项目中，使用 `Rolldown-Vite` 构建工具均带来了显著的性能优化和内存占用改善：

- **GitLab**：原始构建时间为 2.5 分钟，使用 Rolldown-Vite 后仅需 40 秒，构建内存使用更是减少了 **100 倍**。
- **Excalidraw**：构建时间从 22.9 秒降至 1.4 秒，性能提升高达 **16 倍**。
- **PLAID Inc.**：构建时间从 1 分 20 秒缩短为 5 秒，同样实现了 **16 倍**的提升。
- **Appwrite**：构建时间从 12 分钟降至 3 分钟，内存占用减少了 **4 倍**。
- **Particl**：构建时间从 1 分钟优化至 6 秒，相较于 Vite 提升 **10 倍**，相较于 Next.js 提升 **29 倍**。

这些数据表明，Rolldown-Vite 不仅大幅缩短了构建时间，还显著降低了内存使用。例如，博客本身使用 VitePress on Rolldown-Vite，在 Netlify 上生产构建仅需 1.8 秒，展现了其高效性。

### 使用方法与配置

使用 Rolldown-Vite 非常简单，开发者只需在现有 Vite 项目中进行少量配置即可。以下是具体步骤：

**安装与配置示例**  
在 `package.json` 中将 `vite` 替换为 `npm:rolldown-vite@latest`：

```
{
  "dependencies": {
    "vite": "npm:rolldown-vite@latest"
  }
}
```

对于使用 VitePress 或其他以 Vite 为 peer dependency 的元框架，可以通过包管理器的 overrides 配置替换。例如：

- npm：添加 `overrides` 字段：

```
{
  "overrides": {
    "vite": "npm:rolldown-vite@latest"
  }
}
```

- pnpm：添加 `pnpm.overrides` 字段：

```
{
  "pnpm": {
    "overrides": {
      "vite": "npm:rolldown-vite@latest"
    }
  }
}
```

安装依赖后，运行 `npm install` 或 `pnpm install`，然后启动开发服务器或构建项目，无需额外配置即可体验性能提升。

**效果**  
替换后，开发者可以继续使用 Vite 的命令（如 `vite dev` 或 `vite build`），但底层使用 Rolldown 进行打包，构建速度显著提升。可能出现一些警告，提示尚未支持的选项或已废弃的 API，这些将在后续版本中逐步优化。

#### 兼容性与迁移

`Rolldown-Vite` 致力于与 `Vite` 生态系统无缝兼容。`VoidZero` 团队分叉了 `Vite` 生态系统的 CI 测试，确保大多数框架和插件的兼容性。`Rolldown` 取代了 `esbuild` 的功能，由 `Oxc` 处理解析和转换，减少了对外部依赖的需要。对于不兼容的场景，开发者可以参考 `Rolldown` 迁移指南，了解已知问题和解决方案。

#### 未来规划

`Rolldown-Vite` 的发展路线图分为三个阶段：

- **Phase One**：当前阶段，目标是将 `Rolldown` 从 `Vite` 中分离为独立包，并提供技术预览版本供开发者尝试。
- **Phase Two**：未来几个月内，计划将 `Rolldown` 回合并进 `Vite`，届时将支持「全捆绑模式」（Fully Bundled Mode）。
- **Phase Three**：在后续阶段，「全捆绑模式」将成为 `Vite` 的默认构建方式，实现开发与生产环境的一致性体验。

全捆绑模式（Full Bundle Mode）是未来的重点，将在开发和生产环境中提供一致的打包输出，解决 `Vite` 当前开发与生产不一致的问题（如模块分包导致的网络请求过多）。这将显著提升大型项目的开发体验，减少调试难度。

### 最后

`Rolldown-Vite` 的发布标志着前端构建工具的新篇章。未来，通过全捆绑模式和与 `Vite` 的深度整合，`Rolldown-Vite` 有望成为前端开发的标杆工具！

今天的分享就这些了，感谢大家的阅读，如果文章中存在错误的地方欢迎指正！

#### 往期精彩推荐

- [🚀🚀🚀 这些高效实用的 vite 插件你一定要知道！更新弹窗、mock 数据、开发快捷键、自动导入...](https://juejin.cn/post/7509433454464909321)
- [⚡️ 量大管饱，这 9 个 vite 插件让你的开发更简单！🚀🚀🚀](https://juejin.cn/post/7509016779038588982)
- [苏醒吧，Remix！好消息，Remix 将基于 Preact 重构，更快更轻量！🚀🚀🚀](https://juejin.cn/post/7509878884356866067)
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军
