---
title: ⚡️量大管饱，这9个 vite 插件让你的开发更简单！🚀🚀🚀
isTimeLine: true
date: 2025-05-28
category:
  - 前端
tag:
  - JavaScript
  - Vite
---

### 前言

我最近推荐的 vite 插件广受好评，所以今天一口气再来推荐 9 个！

#### 往期精彩推荐

- [⚡️⚡️⚡️ tsdown 推出了 Unbundle 模式，开发更高效！🚀🚀🚀](https://juejin.cn/post/7508556336540876800)
- [优雅，太优雅了，NestJS 🔥 实在是太优雅了！🚀🚀🚀](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- [🚀🚀 🚀 太棒了，有了它，终于不用翻阅屎山 💩 代码了！](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军

### 正文

#### rollup-plugin-remove-others-console

这个插件是我自己开发的，在生产环境中可以根据 git 作者信息移除非自己的 console 语句，无任何配置负担，优化开发体验～

安装

```bash
npm install rollup-plugin-remove-others-console --save-dev
```

配置

```javascript
import { defineConfig } from "vite";
import removeConsole from "rollup-plugin-remove-others-console";

export default defineConfig({
  plugins: [removeConsole()],
});
```

适合优化生产环境调试代码，减少不必要的日志输出，提高开发效率！

也欢迎小伙伴给我 `star`

<https://github.com/mmdctjj/rollup-plugin-remove-others-console>

#### vite-tsconfig-paths

支持 TypeScript 的路径映射，允许在 Vite 项目中使用 `tsconfig.json` 中的 `paths` 配置，简化模块导入。

安装

```bash
npm install vite-tsconfig-paths --save-dev
```

配置

```javascript
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
});
```

这样当你配置了如下 `tsconfig.json` 后

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

页面中引用就不会有 `ts` 语法报错了

```ts
import { formatDate } from "@utils/date";
```

适合 TypeScript 项目或 monorepo 结构，简化复杂路径的模块导入。

#### vite-aliases

根据项目结构自动生成模块别名，减少手动配置的麻烦。

安装

```bash
npm install vite-aliases --save-dev
```

配置

```javascript
import { defineConfig } from "vite";
import aliases from "vite-aliases";

export default defineConfig({
  plugins: [aliases()],
});
```

当你有这样的目录

```ts
    src/
    ├── components/
    │   └── Button.vue
    ├── utils/
    │   └── format.ts
```

可以直接引入了

```ts
import Button from "@components/Button.vue";
import { format } from "@utils/format";
```

适合需要快速配置模块别名的项目，提升开发效率！

#### vite-plugin-vconsole

集成 VConsole，帮助开发者在移动设备上进行调试。

安装

```bash
npm install vite-plugin-vconsole --save-dev
```

配置

```javascript
import { defineConfig } from "vite";
import vconsole from "vite-plugin-vconsole";

export default defineConfig({
  plugins: [
    vconsole({
      entry: "src/main.ts",
      enabled: process.env.NODE_ENV === "development",
    }),
  ],
});
```

适合移动端 Web 应用的调试，特别是在真实设备上测试时。

#### vite-plugin-mock-server

提供 Mock 服务器，支持 TypeScript 和 JavaScript 编写 Mock API，支持热更新和 express.js 中间件。

安装

```bash
npm install vite-plugin-mock-server --save-dev
```

配置

```javascript
import { defineConfig } from "vite";
import mockServer from "vite-plugin-mock-server";

export default defineConfig({
  plugins: [
    mockServer({
      mockRootDir: "./mock",
      urlPrefixes: ["/api/"],
    }),
  ],
});
```

适合前端开发中需要模拟后端接口的场景，加速开发和测试。

#### vitawind

自动安装和配置 Tailwind CSS，支持 JIT 模式，简化样式开发。

安装

```bash
npm install vitawind --save-dev
```

配置

```javascript
import { defineConfig } from "vite";
import vitawind from "vitawind";

export default defineConfig({
  plugins: [vitawind()],
});
```

用了该插件，就不用手动创建 `tailwind.config.js` 并配置 `postcss.config.js`了！

适合快速集成 Tailwind CSS 的项目，提升样式开发效率。

#### vite-plugin-restart

监控指定文件或模式的变化，自动重启 Vite 服务器。

安装

```bash
npm install vite-plugin-restart --save-dev
```

配置

```javascript
import { defineConfig } from "vite";
import restart from "vite-plugin-restart";

export default defineConfig({
  plugins: [
    restart({
      restart: ["vite.config.ts", "src/config/**/*"],
    }),
  ],
});
```

适合配置文件或特定文件更改后需要重启服务器的场景。

它和 HMR 的区别是 HMR 修改组件后，页面不刷新或局部刷新，而 `vite-plugin-restart` 整体重新启动服务器

#### vite-plugin-tips

在页面上显示更详细的开发服务器状态提示，提升开发体验。

![服务端链接状态](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/30b512338191488081b68f05319d5a16~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749105554&x-orig-sign=0Ebywd2ah%2BB826hWkYax0Xq3v%2Fk%3D)

安装

```bash
npm install vite-plugin-tips --save-dev
```

配置

```javascript
import { defineConfig } from "vite";
import tips from "vite-plugin-tips";

export default defineConfig({
  plugins: [tips()],
});
```

适合和我一样的强迫症！

#### unplugin-auto-import

自动按需导入 API，支持 Vite、Webpack 等，减少手动导入的繁琐。

安装

```bash
npm install unplugin-auto-import --save-dev
```

配置

```javascript
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "src/auto-imports.d.ts",
    }),
  ],
});
```

适合需要频繁导入常用 API 的项目，提升编码效率。

### 最后

这 9 个 Vite 插件涵盖了日常开发的多个方面，使 Vite 成为一个更加灵活和强大的开发工具，希望本文能帮助您快速了解这些插件，并在项目中灵活运用！

今天的分享就这些了，感谢大家的阅读，如果文章中存在错误的地方欢迎指正！

#### 往期精彩推荐

- [⚡️⚡️⚡️ tsdown 推出了 Unbundle 模式，开发更高效！🚀🚀🚀](https://juejin.cn/post/7508556336540876800)
- [优雅，太优雅了，NestJS 🔥 实在是太优雅了！🚀🚀🚀](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- [🚀🚀 🚀 太棒了，有了它，终于不用翻阅屎山 💩 代码了！](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军
