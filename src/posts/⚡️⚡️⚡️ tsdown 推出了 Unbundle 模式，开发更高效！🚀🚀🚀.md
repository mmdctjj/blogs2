---
title: ⚡️⚡️⚡️ tsdown 推出了 Unbundle 模式，开发更高效！🚀🚀🚀
isTimeLine: true
date: 2025-05-25
categories:
  - 前端
tags:
  - TypeScript
---

### 前言

昨天刷推发现 `tsdown` 加入了 `Unbundle Mode`，其核心在于保持源码目录结构与输出目录结构一致。例如，假设你的项目有以下文件结构：`src/index.ts` `src/mod.ts`，最终输出：`dist/index.js` `dist/mod.js`

![Unbundle Mode](https://files.mdnice.com/user/43422/158c80b2-6402-4d8c-9c18-a48b2677a50c.png)

#### 往期精彩推荐

- [🚀🚀🚀 AI 助手好写，太好写了，分分钟写出来，不用一周，三分钟！](https://juejin.cn/post/7506754146893725750)
- [优雅，太优雅了，NestJS 🔥 实在是太优雅了！🚀🚀🚀](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- [🚀🚀 🚀 太棒了，有了它，终于不用翻阅屎山 💩 代码了！](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军

### 正文

#### 什么是 tsdown 和 Unbundle Mode？

`tsdown` 是一个基于 `Rolldown` 的现代化打包工具，专为 `TypeScript` 和 `JavaScript` 库设计，号称“优雅的库打包器”。

它支持多种构建模式，`Unbundle Mode` 对每个源文件进行独立编译和转换，生成与源码结构一致的输出文件。

这种方式确保了源码与输出文件之间的一一对应关系，便于调试和维护。

#### 如何启用 Unbundle Mode？

启用 Unbundle Mode 非常简单，只需在 tsdown 的配置文件中设置 `unbundle: true`。以下是一个典型的配置示例：

```javascript
import { defineConfig } from "tsdown";
export default defineConfig({
  entry: ["src/index.ts"],
  unbundle: true,
});
```

在这个配置中，`entry` 指定了入口文件（如 `src/index.ts`），而 `unbundle: true` 指示 tsdown 使用 Unbundle Mode 进行构建。启用后，tsdown 将编译所有从入口点引用的源文件，并生成对应的输出文件。

#### Unbundle Mode 的工作原理

当启用 `Unbundle Mode` 时，`tsdown` 会遍历所有入口点引用的文件，逐一编译并输出到 `dist` 目录，保持与 `src` 目录相同的结构。这种方式避免了模块合并，确保每个输出文件直接对应一个源文件。

#### 何时使用 Unbundle Mode？

`Unbundle Mode` 在特别适合 **Monorepo 项目** 里使用，因为保持模块独立性，避免不必要的捆绑，适合管理多个包的 monorepo 结构！另外，也适合独立库的开发，例如，在开发一个 TypeScript 库时，Unbundle Mode 允许你生成独立的 `.js` 和 `.d.ts` 文件，方便用户按需导入特定模块，而无需加载整个库的捆绑文件！

### 最后

`tsdown` 的 `Unbundle Mode` 提供了一种优雅的构建方式，通过保持源码与输出文件的直接映射，简化了库开发中的调试和维护工作，为你的项目带来便利！

今天的分享就这些了，感谢大家的阅读，如果文章中存在错误的地方欢迎指正！

#### 往期精彩推荐

- [🚀🚀🚀 AI 助手好写，太好写了，分分钟写出来，不用一周，三分钟！](https://juejin.cn/post/7506754146893725750)
- [优雅，太优雅了，NestJS 🔥 实在是太优雅了！🚀🚀🚀](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- [🚀🚀 🚀 太棒了，有了它，终于不用翻阅屎山 💩 代码了！](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军
