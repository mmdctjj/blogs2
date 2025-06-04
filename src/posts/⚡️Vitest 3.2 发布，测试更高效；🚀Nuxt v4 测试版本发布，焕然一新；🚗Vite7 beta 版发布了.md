---
title: ⚡️Vitest 3.2 发布，测试更高效；🚀Nuxt v4 测试版本发布，焕然一新；🚗Vite7 beta 版发布了
isTimeLine: true
date: 2025-06-03
categories:
  - 前端
tags:
  - TypeScript
---

### 前言

最近更新的动态比较多，就不一篇一篇发了，这里直接来个最近更新合集

#### 往期精彩推荐

- [🚀🚀🚀 这些高效实用的 vite 插件你一定要知道！更新弹窗、mock 数据、开发快捷键、自动导入...](https://juejin.cn/post/7509433454464909321)
- [🚀🚀🚀 尤雨溪宣布 Vite 发布 Rolldown-Vite 预览版，性能超级快！⚡️⚡️⚡️](https://juejin.cn/post/7510271484393848847)
- [苏醒吧，Remix！好消息，Remix 将基于 Preact 重构，更快更轻量！🚀🚀🚀](https://juejin.cn/post/7509878884356866067)
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军

### 正文

#### `Nuxt` 发布 `v4` 版本测试版本

![Nuxt v4](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b553f75e9a1f45c68e8ecc6f501583ca~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749612245&x-orig-sign=ngS%2Bo8VrAHPL4J8SSUa40HLdj0Q%3D)

`Nuxt v4` 的 `alpha` 版已于 `6月2日` 发布，稳定版预计 `6月底` 推出。

新版本引入了全新的 `app/` 目录结构，优化代码组织，显著提升 `IDE` 性能，尤其适合大型项目。

数据获取机制得到升级，`useAsyncData` 和 `useFetch` 提供更智能的缓存和清理逻辑，减少重复请求并提升性能。

`Nuxt v4` 还支持 `Vite` 环境 `API`，通过单一开发服务器简化配置，同时改进了头部管理，移除 `Unhead v2` 的废弃功能，确保更高效的 `SEO` 和标签处理。

此外，组件命名一致性得到增强，与 `Vue DevTools` 和 `<KeepAlive>` 兼容，提升调试体验。

`Nuxt 3` 将支持至 `2025年底`，为用户提供充足的迁移时间，

而 `Nuxt 5` 将在 `Nitro v3` 准备就绪后推出，预计带来更多底层优化。

博客地址：<https://nuxt.com/blog/roadmap-v4>

#### `Vitest 3.2` 来啦，测试更高效

![Vitest 3.2](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d495e7e822ce412e8c0728a8e53cee80~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749612245&x-orig-sign=iBtKvVKuaUNqKvJlrsCtPt4CBgY%3D)

`Vitest 3.2` 带来多项测试增强功能，包括测试注解 `API`，支持自定义消息和附件，集成到 `UI`、`HTML`、`junit` 等报告中，便于调试。

新增作用域固件（支持 `file` 和 `worker`），通过 `test.extend` 提供更灵活的测试隔离控制。

```js
const test = baseTest.extend({
  db: [
    async ({}, use) => {
      // ...setup
      await use(db);
      await db.close();
    },
    { scope: "worker" },
  ],
});
```

自定义项目名称颜色功能让多项目测试更直观，浏览器定位器 `API` 扩展支持 `Playwright` 定位器字符串，增强了浏览器测试能力。

新增 `signal` `API` 可在测试超时或手动中止时终止运行，结合 `V8 AST` 感知重映射（需启用 `coverage.experimentalAstAwareRemapping`），显著提升代码覆盖率性能。

```js
it("stop request when test times out", async ({ signal }) => {
  await fetch("/heavy-resource", { signal });
}, 2000);
```

此外，`watchTriggerPatterns` 允许配置特定文件更改触发相关测试，如模板文件更改触发 `mailers` 测试，提升开发效率。

```js
export default defineConfig({
  test: {
    watchTriggerPatterns: [
      {
        pattern: /^src\/templates\/(.*)\.(ts|html|txt)$/,
        testsToRun: (file, match) => {
          return `api/tests/mailers/${match[2]}.test.ts`;
        },
      },
    ],
  },
});
```

另外本次更新将弃用 `workspace` ，改用 `projects`

```js
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    // "test.workspace" is now "test.projects"

    projects: [{ test: { name: "Unit" } }, { test: { name: "Integration" } }],
  },
});
```

#### rolldown-vite 预览版发布

阿斯顿发

#### 其他更新内容

##### Vite 7.0.0-beta.0

![Vite 7.0.0-beta.0](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/65dc8d89ef864cd893f83780847a2331~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749612245&x-orig-sign=uyXZ%2BffvshlOmOWCgE4AlyvryYY%3D)

`Vite 7.0.0-beta.0` 于 `6月2日` 发布，作为测试版标志着 `Vite` 生态的又一次进化。

- 浏览器目标更改为广泛可用的基线
- 已停止对 `Node 18` 的支持。`Vite` 现已仅以 `ESM` 形式发行

##### `rolldown-plugin-dts` 引入 `tsgo`

`rolldown-plugin-dts` 的最新更新引入了 `tsgo` ，需额外安装 `@typescript/native-preview` 和 `tsgo-dev` 依赖，但因其实验性质，建议在非生产环境中测试使用。

![x 原文](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/aa5559eaf1f74733b913f5615a2fb2f0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749612245&x-orig-sign=vH3Z95lO6K%2Bi87jwxlKNsDD1Qlo%3D)

`tsgo` 演练场看这里 <https://tsgo.sxzz.dev>

### 最后

本次更新展现了网络开发生态的蓬勃发展。`Nuxt v4` 提供更现代化的开发体验，`Vitest 3.2` 优化测试流程，`Vite 7.0` 预示构建工具的未来潜力，`rolldown-plugin-dts` 则为 `TypeScript` 开发者带来新选择。开发者可根据项目需求选择升级，保持技术领先。\
今天的分享就这些了，感谢大家的阅读，如果文章中存在错误的地方欢迎指正！

#### 往期精彩推荐

- [🚀🚀🚀 这些高效实用的 vite 插件你一定要知道！更新弹窗、mock 数据、开发快捷键、自动导入...](https://juejin.cn/post/7509433454464909321)
- [🚀🚀🚀 尤雨溪宣布 Vite 发布 Rolldown-Vite 预览版，性能超级快！⚡️⚡️⚡️](https://juejin.cn/post/7510271484393848847)
- [苏醒吧，Remix！好消息，Remix 将基于 Preact 重构，更快更轻量！🚀🚀🚀](https://juejin.cn/post/7509878884356866067)
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军
