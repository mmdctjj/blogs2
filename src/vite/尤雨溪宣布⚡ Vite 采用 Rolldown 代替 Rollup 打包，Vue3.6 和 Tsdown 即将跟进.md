---
title: 尤雨溪宣布⚡ Vite 采用 Rolldown 代替 Rollup 打包，Vue3.6 和 Tsdown 即将跟进
isTimeLine: true
date: 2025-05-25
category:
  - 前端
tag:
  - JavaScript
  - Vite
---

### 前言

最近大新闻比较多，一不留神就错过了很多重要信息，今天跟进另一条重要新闻，尤雨溪在推特上宣布 `Vite` 新 `PR` 已经采用 `Rolldown` 代替 `Rollup` 打包，`Vue3.6` 和 `Tsdown` 即将跟进！

`PR` 地址：https://github.com/vitejs/vite/pull/19925

#### 往期精彩推荐

- [🚀🚀🚀 AI 助手好写，太好写了，分分钟写出来，不用一周，三分钟！](https://juejin.cn/post/7506754146893725750)
- [优雅，太优雅了，NestJS 🔥 实在是太优雅了！🚀🚀🚀](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- [🚀🚀 🚀 太棒了，有了它，终于不用翻阅屎山 💩 代码了！](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军

### 正文

`Vite` 作为现代前端开发的明星构建工具，以其快速的开发体验和高效的生产构建深受开发者喜爱。2025 年 5 月 23 日，随着 `Vite` 采用 `Rolldown` 打包，不仅提升了性能，还标志着 `Rolldown` 作为独立打包器的生产就绪性。此外，`Vue 3.6` 和许多基于 `tsdown`（[tsdown.dev](https://tsdown.dev)）的库也开始采用 `Rolldown`，显示其在前端生态中的潜力。

![推特原文](https://files.mdnice.com/user/43422/40646707-2821-449f-b66f-681045454f7a.jpg)

#### 什么是 `Rolldown`？

`Rolldown` 是一个基于 `Rust` 的高性能打包器，旨在取代 `Vite` 之前使用的 `Rollup` 和 `esbuild`。它的核心优势得益于 `Rust` 的高效编译，`Rolldown` 的生产构建速度比 `Rollup` 快 7 倍以上，尤其在大项目中表现突出；并且统一了开发和生产环境的打包逻辑，解决了之前 `esbuild`（开发环境）和 `Rollup`（生产环境）带来的不一致问题。同时，它保留了 `Rollup` 的插件 API，并引入了高级功能，如模块联邦和内置热模块替换（HMR）。

#### 生态系统的变革

这次里程碑不仅限于 `Vite` 本身：

- **Vue 3.6**：即将发布的 `Vue 3.6` 将使用 `Rolldown` 打包，进一步提升 `Vue` 应用的构建性能。
- **tsdown 的崛起**：`tsdown` 作为 `tsup` 的继任者，由 `Rolldown` 驱动，已被众多库采用。这表明 `Rolldown` 正在成为 `JavaScript`/`TypeScript` 打包的标准。
- **统一构建流程**：`Rolldown` 的普及将推动前端生态系统的标准化，减少工具链的复杂性。

`Vite` 团队正努力稳定 `Rolldown` 的整合，可能带来更高效的缓存机制和创新功能。小伙伴们可以通过 [Vite 官方文档](https://vite.dev/guide/rolldown) 和 [Rolldown 官网](https://rolldown.rs/guide/) 了解最新进展！

### 最后

`Vite` 采用 `Rolldown` 打包是一个重要的里程碑，它不仅提升了构建性能，还推动了前端生态系统的标准化。从 `Vue 3.6` 到 `tsdown` 的广泛采用，`Rolldown` 正在成为下一代打包器的标杆。未来，随着 `Rolldown` 与 `Vite` 的整合进一步稳定，前端开发将迎来更高效的体验。让我们拭目以待！

#### 往期精彩推荐

- [🚀🚀🚀 AI 助手好写，太好写了，分分钟写出来，不用一周，三分钟！](https://juejin.cn/post/7506754146893725750)
- [优雅，太优雅了，NestJS 🔥 实在是太优雅了！🚀🚀🚀](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- [🚀🚀 🚀 太棒了，有了它，终于不用翻阅屎山 💩 代码了！](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军
