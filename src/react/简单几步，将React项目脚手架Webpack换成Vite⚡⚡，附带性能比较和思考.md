---
title: 简单几步，将React项目脚手架Webpack换成Vite⚡⚡，附带性能比较和思考
isTimeLine: true
date: 2023-07-18
category:
  - 前端
tag:
  - React
  - Vite
---

> 文章同步在公众号：萌萌哒草头将军，欢迎关注

### ⚡️ 使用 Vite

前段时间，将练习了时长两年半的 react 项目脚手架换成 vite 了，过程如下

首先使用 vite 创建基础项目框架

```js
npm create vite@latest my-vue-app --template react-ts
```

将 src 工作目录直接拷贝过来

接着配置常用的路径解析 alias

```js
// vite-config,ts
alias: [
  ...(
    Object.entries({
      '@': path.resolve('src'),
    }).map(([key, val]) => ({ find: key, replacement: val }))
  ),
],
extensions: [".js", ".ts", ".tsx", ".jsx", ".d.ts"],
```

此时页面可以访问了，但是还是会有 ts 相关报错，

只需要在 tsconfig.json 里添加如下配置：

```js
"paths": {
  "@/*": ["./src/*"]
},
```

为了使 ci/cd 可以正常进行，还需要将项目默认打包默认目录从 dist 换成 build

```js
// vite-config,ts
export default defineConfig({
  build: {
    outDir: "./build",
  },
});
```

整个过程很快，

### 性能优化过程

接下来我执行了打包命令，部署在服务器上看看

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/443ea611019a446fa16b2e329fece41b~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c108f63da0794d05a7124705e8542bcd~tplv-k3u1fbpfcp-watermark.image?)

在没有任何优化情况下，包体积为 6.7M，比 webpack 版包体积小了 0.4M

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d8a40b738714a51b9aabdef20f2a030~tplv-k3u1fbpfcp-watermark.image?)

部署之后，vite 版 lighthouse 的性能得分 59 分

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa5131a3e5d64fc8b85d3cb1c64e09fb~tplv-k3u1fbpfcp-watermark.image?)

通过分析，发现是因为没有压缩，大文件太多，加载过慢导致的，所以接下来，我们进行压缩文件。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e19814d532c249ef82664c24e578c004~tplv-k3u1fbpfcp-watermark.image?)

压缩配置

```js
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./build",
    rollupOptions: {
      plugins: viteCompression({
        verbose: true, // 是否在控制台中输出压缩结果
        disable: false,
        threshold: 10240, // 阈值，单位为b
        algorithm: "gzip", // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
        ext: ".gz", // 格式
        deleteOriginFile: false, // 是否清除源文件，简易这里保留
      }),
    },
  },
  // ...
});
```

> 并不是所有的 nginx 都带有 gzip 模块，所以最好保留源文件，以备不时之需

打包之后

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc237f6496b748a9832823068a5de3ef~tplv-k3u1fbpfcp-watermark.image?)

同时需要，nginx 需要开启压缩识别，否则无效。

```js
server {
    # 其他配置

    gzip on;
    gzip_comp_level 5;
    gzip_min_length 256;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 其他配置
}
```

通过压缩文件优化后，性能有了明显提升。

> 我的项目没有图片，所以没有使用压缩图片的插件，如果需要可以使用[vite-plugin-imagemin](https://github.com/vbenjs/vite-plugin-imagemin/blob/main/README.zh_CN.md)

### 性能比较

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb43edcdf16d4010942fe58d44151157~tplv-k3u1fbpfcp-watermark.image?)

而 webpack 版的 lighthouse 的性能得分 73 分

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9150fb3f824e41bca7db51a214662a29~tplv-k3u1fbpfcp-watermark.image?)

webpack 版已经完成了代码压缩、代码分割、路由懒加载。

对比两个版本，webpack 的 FCP 指标十分优秀，Vite 的 TBT 指标很健康。

虽然，目前来看两者差距不大。但是 vite 的优势很明显，

使用默认配置加上代码压缩，可以比 webpack 优化配置之后更好一点。

### 思考

此时影响的因素主要请求链的长度过长

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b0657e70cd74a8ba1beb137bcf90c60~tplv-k3u1fbpfcp-watermark.image?)

> 翻译：下面的关键请求链显示了哪些资源是以高优先级加载的。考虑减少链的长度，减少资源的下载大小，或者推迟不必要资源的下载以提高页面负载。

我们可以看到上面的请求链接，好几个都是只有几 kb 的小文件。 而这些小文件是外层 index 文件的依赖文件，所以会造成阻塞，小文件小文件众多阻塞的时间就越久。

vite 将文件根据路由切割成多个子模块，每个模块的文件来自于不同的依赖包的子集。并且通过 import 的方式，引入到主文件中。

如果我们在小文件引入前，将小文件进行合并，就可以有效缩短链长度，从而更进一步的提高性能。目前还没有类似的插件。

今天的分享就到这里了，感谢你的阅读！
