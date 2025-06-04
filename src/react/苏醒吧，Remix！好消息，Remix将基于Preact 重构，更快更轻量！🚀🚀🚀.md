---
title: 苏醒吧，Remix！好消息，Remix将基于Preact 重构，更快更轻量！🚀🚀🚀
isTimeLine: true
date: 2025-05-30
category:
  - 前端
tag:
  - JavaScript
  - React
---

### 前言

Remix 的创始人 `Michael Jackson` 和 `Ryan Florence` 发文介绍了 Remix 的最新动态：`React Router v7` 正式发布，支持 `React Server Components (RSC)`，而 `Remix v3` 将基于 `Preact` 重新设计。

![推特](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e0f70063bd7845c197a7260b2596dd05~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749612054&x-orig-sign=OaG%2BUQYDP3anvx2v1UrytGizeWY%3D)

#### 往期精彩推荐

- [🚀🚀🚀 这些高效实用的 vite 插件你一定要知道！更新弹窗、mock 数据、开发快捷键、自动导入...](https://juejin.cn/post/7509433454464909321)
- [⚡️ 量大管饱，这 9 个 vite 插件让你的开发更简单！🚀🚀🚀](https://juejin.cn/post/7509016779038588982)
- [⚡️⚡️⚡️ tsdown 推出了 Unbundle 模式，开发更高效！](https://juejin.cn/post/7508556336540876800)
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军

### 正文

Remix 作为现代 `Web` 开发的热门全栈框架，近期通过一篇博客文章宣布了重大更新：`React Router v7` 正式发布，支持 `React Server Components (RSC)`，而 `Remix v3` 将基于 `Preact` 重新设计，追求更轻量和高性能的开发体验！

#### Remix 与 `React Router v7`：新功能的融合

Remix 是一个基于 `React Router` 的全栈 `Web` 框架，以其文件系统路由和数据加载功能受到开发者喜爱。昨日，Remix 官方博客发布文章，宣布 `React Router v7` 正式推出，并支持 `React Server Components (RSC)`。这一版本将 `Remix v2` 的功能整合到其“框架模式”中，为开发者提供了平滑的 `RSC` 采用路径。

`React Router v7` 的主要新特性包括：

- **RSC 支持**：允许逐步引入服务器端组件，降低迁移成本，优化数据加载和渲染。
- **增强的 loaders 和 actions**：支持服务器端数据处理，简化复杂路由的逻辑管理。
- **服务器端路由**：提供一流的服务器端路由支持，适合大规模应用。

这些功能使 `React Router v7` 不仅是一个前端路由库，还能通过框架模式提供类似 `Remix` 的全栈开发体验。

以下是一个简单的 `React Router v7` 示例，展示其 `loader` 功能：

```javascript
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: async () => ({ data: "Hello from React Router v7" }),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

#### `Remix v3` 将基于 `Preact` 的重构

`Remix v3` 被定位为对 `Web` 框架的重新构想，计划基于 `Preact` 重构。`Preact` 是一个轻量级的 `React` 替代品，API 类似但体积更小、性能更高。`Remix v3` 旨在减少依赖、提升性能，并提供模块化工具包和内置组件库（如复兴的 `Reach UI`）！

以下是一个 `Remix v3` 的概念性示例（假设基于 `Preact`）：

```javascript
// routes/index.tsx
import { defineLoader } from "remix";

export const loader = defineLoader(() => {
  return { message: "Hello from Remix v3" };
});

export default function Home() {
  const { message } = useLoaderData();
  return <div>{message}</div>;
}
```

### 最后

`React Router v7` 的 `RSC` 支持和框架模式为开发者提供了灵活的全栈功能，而 `Remix v3` 基于 `Preact` 的重构则开启了轻量、高性能的新篇章！

今天的分享就这些了，感谢大家的阅读，如果文章中存在错误的地方欢迎指正！

#### 往期精彩推荐

- [🚀🚀🚀 这些高效实用的 vite 插件你一定要知道！更新弹窗、mock 数据、开发快捷键、自动导入...](https://juejin.cn/post/7509433454464909321)
- [⚡️ 量大管饱，这 9 个 vite 插件让你的开发更简单！🚀🚀🚀](https://juejin.cn/post/7509016779038588982)
- [⚡️⚡️⚡️ tsdown 推出了 Unbundle 模式，开发更高效！](https://juejin.cn/post/7508556336540876800)
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军
