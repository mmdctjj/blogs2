---
title: 这些高效实用的 vite 插件你一定要知道！更新弹窗、mock数据、开发快捷键、自动导入...
isTimeLine: true
date: 2025-05-29
category:
  - 前端
tag:
  - JavaScript
  - Vite
---

### 前言

今天继续推荐一些超级好用的 vite 插件!

#### 往期精彩推荐

- [⚡️⚡️⚡️ tsdown 推出了 Unbundle 模式，开发更高效！🚀🚀🚀](https://juejin.cn/post/7508556336540876800)
- [🚀🚀🚀 尤雨溪宣布 ⚡ Vite 采用 Rolldown 代替 Rollup 打包，Vue3.6 和 Tsdown 即将跟进！](https://juejin.cn/post/7507869468400517154)
- [🚀🚀🚀tsgo 他来了，ts 团队发布了 ts native 预览版，构建速度更快了 ⚡️！](https://juejin.cn/post/7507549882367311926)
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军

### 正文

#### vite-plugin-qrcode

这个插件可以在 Vite 开发服务器启动时显示 QR 码，方便移动设备访问本地开发环境。

下载

```bash
npm install --save-dev vite-plugin-qrcode
```

配置
在 `vite.config.js` 中添加：

```javascript
import { defineConfig } from "vite";
import { qrcode } from "vite-plugin-qrcode";

export default defineConfig({
  plugins: [qrcode()],
});
```

在开发模式下，使用下面的命令启动

```bash
vite --host
```

![QR 码](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b24787fc6da94659ad7f6658c40d111e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1748586648&x-orig-sign=qowfutROLVIwJTy%2FoZBKmEg4AYY%3D)

服务器启动时在终端显示 QR 码，扫描即可在移动设备上访问本地开发服务器。

#### vite-plugin-web-update-notification

检测网页更新并通知用户刷新页面，支持 Vite、Umijs 和 Webpack，使用版本号（如 git commit hash）进行比较。

下载

```bash
pnpm add @plugin-web-update-notification/vite -D
```

配置
在 `vite.config.ts` 中添加：

```javascript
import { defineConfig } from "vite";
import { webUpdateNotice } from "@plugin-web-update-notification/vite";

export default defineConfig({
  plugins: [
    webUpdateNotice({
      logVersion: true,
      notificationProps: {
        title: "系统更新",
        description: "系统有更新，请刷新页面",
        buttonText: "刷新",
      },
    }),
  ],
});
```

在页面加载、定时轮询或标签页重新激活时检查更新，若检测到新版本则显示通知，提示用户刷新页面，避免版本不一致导致的错误。

![更新通知](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/141c05ad2a784d2f9be7ea3f85c7a861~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1748586648&x-orig-sign=hB4vZOamr8k6yx6gOyB7w2ex0ig%3D)

#### vite-plugin-validate-env

在构建或开发时验证环境变量，确保配置正确，支持内置验证器和标准模式（如 Zod）。

下载

```bash
pnpm add -D @julr/vite-plugin-validate-env
```

使用内置验证器：

```javascript
import { defineConfig } from "vite";
import { ValidateEnv, Schema } from "@julr/vite-plugin-validate-env";

export default defineConfig({
  plugins: [
    ValidateEnv({
      validator: "builtin",
      schema: {
        VITE_MY_VAR: Schema.string(),
      },
    }),
  ],
});
```

在构建或开发时验证环境变量，捕获配置错误，确保项目运行时环境变量符合预期。

#### vite-plugin-conditional-compile

基于环境变量的条件编译语法，支持 `#v-ifdef` 等指令。

下载

```bash
pnpm i -D vite-plugin-conditional-compiler
```

然后在 `vite.config.ts` 中添加：

```javascript
import { defineConfig } from "vite";
import ConditionalCompile from "vite-plugin-conditional-compiler";

export default defineConfig({
  plugins: [ConditionalCompile()],
});
```

在代码中使用：

```javascript
#v-ifdef VITE_MY_ENV
console.log('VITE_MY_ENV is defined');
#v-endif
```

根据环境变量动态编译代码，移除不符合条件的代码块，优化构建结果。

#### vite-plugin-mock-dev-server

为 Vite 提供 API 模拟开发服务器，支持多种文件类型和热更新。

下载

```bash
npm i -D vite-plugin-mock-dev-server
```

配置
在 `vite.config.ts` 中添加：

```javascript
import { defineConfig } from "vite";
import { mockDevServerPlugin } from "vite-plugin-mock-dev-server";

export default defineConfig({
  plugins: [mockDevServerPlugin()],
});
```

在开发环境中模拟 API 请求和响应，支持 HTTP/WS、文件上传下载等功能。

```js
import { defineMock } from "vite-plugin-mock-dev-server";

export default defineMock({
  url: "/api/test",
  body: { a: 1, b: 2 },
});
```

详细的配置可以看这里：<https://github.com/pengzhanbo/vite-plugin-mock-dev-server?tab=readme-ov-file#plugin-options>

#### vite-plugin-shortcuts

为 Vite 开发服务器添加自定义快捷键，提升操作效率。

下载

```bash
pnpm add vite-plugin-shortcuts
```

配置
在 `vite.config.ts` 中添加：

```javascript
import { defineConfig } from "vite";
import { shortcutsPlugin } from "vite-plugin-shortcuts";

export default defineConfig({
  plugins: [
    shortcutsPlugin({
      shortcuts: {
        c: {
          action: 'server.config.logger.clearScreen("error")',
          description: "Close console",
        },
        s: {
          action: "server.config.logger.reset()",
          description: "Reset console",
        },
      },
    }),
  ],
});
```

在开发服务器中启用自定义快捷键，如清除或重置控制台！

![快捷键](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/66d3d0d9c84d40e288efdd1a10e24668~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1748586647&x-orig-sign=iY132ul9jZJ%2BVttSrKk6RhknpIQ%3D)

#### vite-plugin-entry-shaking

在开发模式下模拟 tree-shaking 行为，优化模块导入。

下载

```bash
npm i -D vite-plugin-entry-shaking
```

在 `vite.config.ts` 中添加：

```javascript
import { defineConfig } from "vite";
import EntryShakingPlugin from "vite-plugin-entry-shaking";

export default defineConfig({
  plugins: [
    EntryShakingPlugin({
      targets: ["src/entry-a", { glob: "src/utils/*.ts" }],
    }),
  ],
});
```

在开发模式下优化模块导入，减少不必要的模块请求。

![请求情况一览](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ce7958c0bd424470b112bcbcb81ff065~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1748586647&x-orig-sign=Nrp%2Fy2xWstvVo0Ix3I4Lc6d9nyY%3D)

#### vite-plugin-auto-alias

自动生成基于路径的别名，支持热更新和自定义前缀。

下载

```bash
pnpm add vite-plugin-auto-alias -D
```

在 `vite.config.ts` 中添加：

```javascript
import { defineConfig } from "vite";
import autoAlias from "vite-plugin-auto-alias";

export default defineConfig({
  plugins: [autoAlias()],
});
```

自动生成目录别名（如 `@/components`），简化模块导入。

    |-- src
        |-- plugins
        |-- router
        |-- scss
        |-- store
        |-- utils
        |-- views
        |-- ....

```js
import xxx from "@plugins/xxx";
import xxx from "@router/xxx";
import xxx from "@scss/xxx";
import xxx from "@store/xxx";
import xxx from "@utils/xxx";
import xxx from "@views/xxx";
```

这个插件和上次我介绍的 `vite-aliases` 基本上是一样的！

#### vite-plugin-image-placeholder

为未准备好的图像资源生成占位符图像，支持多种格式。

下载

```bash
npm i -D vite-plugin-image-placeholder
```

配置
在 `vite.config.ts` 中添加：

```javascript
import { defineConfig } from "vite";
import imagePlaceholder from "vite-plugin-image-placeholder";

export default defineConfig({
  plugins: [imagePlaceholder({ prefix: "image/placeholder" })],
});
```

生成占位符图像，用于图像资源未加载时的显示，支持 HTML、CSS 和 JS 使用。

```html
<img src="/image/placeholder" alt="" />
<img src="/image/placeholder/200" alt="" />
<img src="/image/placeholder/300/200" alt="" />
```

配置项参考这里：<https://github.com/pengzhanbo/vite-plugin-image-placeholder/blob/main/README.zh-CN.md#option>

#### vite-plugin-find-image-duplicates

在构建时查找项目中的重复图像，优化资源管理。

下载

```bash
npm install vite-plugin-find-image-duplicates -D
```

配置
在 `vite.config.ts` 中添加：

```javascript
import { defineConfig } from "vite";
import findImageDuplicates from "vite-plugin-find-image-duplicates";

export default defineConfig({
  plugins: [findImageDuplicates({ imagePath: ["src/assets/images"] })],
});
```

在构建时检测并报告重复图像，帮助优化项目资源。

### 最后

本文介绍的 Vite 插件，涵盖了从 QR 码显示到图像资源优化的多种功能。这些插件解决了开发中的常见痛点，如调试效率、环境配置和资源管理，使 Vite 更适合复杂项目和团队协作。希望本文能帮助开发者快速掌握这些插件，并在项目中灵活运用！

今天的分享就这些了，感谢大家的阅读，如果文章中存在错误的地方欢迎指正！

#### 往期精彩推荐

- [⚡️⚡️⚡️ tsdown 推出了 Unbundle 模式，开发更高效！🚀🚀🚀](https://juejin.cn/post/7508556336540876800)
- [🚀🚀🚀 尤雨溪宣布 ⚡ Vite 采用 Rolldown 代替 Rollup 打包，Vue3.6 和 Tsdown 即将跟进！](https://juejin.cn/post/7507869468400517154)
- [🚀🚀🚀tsgo 他来了，ts 团队发布了 ts native 预览版，构建速度更快了 ⚡️！](https://juejin.cn/post/7507549882367311926)
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军
