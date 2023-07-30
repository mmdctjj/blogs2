---
title: 🚀两个简单的自定义插件，探究Vite的插件机制
isTimeLine: true
date: 2023-06-14
category:
  - 前端
tag:
  - JavaScript
  - Vite
---

> 文章首发公众号：萌萌哒草头将军，最近群里有抽奖，送出五本书，群里目前已经快20位小伙伴了，概率很大，感兴趣的小伙伴关注后联系我即可入群。个人联系方式：SunBoy_mmdctjj

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/379970510dc440e59ce70a298c2a3286~tplv-k3u1fbpfcp-watermark.image?" alt="grif.gif" width="50%" /></p>

[阅读更多文章点这里](https://juejin.cn/post/7243975432088830009#heading-1)

## 🚀 Vite 插件机制

Vite 的插件机制是基于 Rollup 的插件机制实现的，但是又进行了一些扩展。Vite 的插件机制是通过钩子函数实现的，当 Vite 运行时，会通过钩子函数调用插件中的方法，插件可以在这些方法中干预 Vite 的构建过程。

我们主要讨论插件的机制，API 详细请看官网介绍

通用的钩子：https://cn.vitejs.dev/guide/api-plugin.html#universal-hooks

Vite 独有的钩子：https://cn.vitejs.dev/guide/api-plugin.html#vite-specific-hooks

下面我们看看插件的机制原理。

### 🚗 Rollup 插件机制

Rollup 的插件机制实现主要基于两点:

- Rollup 维护了各个插件接口的 Hook 列表,插件可以向这些列表中添加回调函数。
- 在执行对应过程时,Rollup 会依次触发这些 Hook 列表中的回调函数。

```js
const hookLists = {
  load: [] // load hook 列表
}

function addHook(hookName, hook) {
  hookLists[hookName].push(hook)  // 向 hook 列表中添加回调函数
}

function load(id) {
  for (const hook of hookLists.load) { // 触发所有 load 钩子函数
    const result = hook(id)  // 调用钩子函数
    if (result) return result  // 使用第一个结果并返回
  }
}
```
插件可以通过 Rollup 提供的 addHook 方法相对应的 Hook 列表中添加回调函数:

```js
export function myPlugin() {
  addHook('load', id => {  // 向 load 列表添加回调函数
    // ...
  })
}
```

### 🚗 Vite 的巧妙之处

Vite 主要将用户插件排序，然后和内置的插件配置合并，传递给了 Rollup 打包。

关键的部分源码如下：

```js
// vite/node/config.ts
export async function resolveConfig() {
  
  // ...
  
  // resolve plugins
  const rawUserPlugins = (
    (await asyncFlatten(config.plugins || [])) as Plugin[]
  ).filter(filterPlugin)

  const [prePlugins, normalPlugins, postPlugins] =
    sortUserPlugins(rawUserPlugins)
  
  // run config hooks
  const userPlugins = [...prePlugins, ...normalPlugins, ...postPlugins]
  
  // ...
}
```

```js
// vite/node/build.ts 
export async function build() {

  const config = await resolveConfig(
    inlineConfig,
    'build',
    'production',
    'production',
  )
  
  //...
  
  const plugins = (
    ssr ? config.plugins.map((p) => injectSsrFlagToHooks(p)) : config.plugins
  ) as Plugin[]
  
  const rollupOptions: RollupOptions = {
    context: 'globalThis',
    preserveEntrySignatures: ssr
      ? 'allow-extension'
      : libOptions
      ? 'strict'
      : false,
    cache: config.build.watch ? undefined : false,
    ...options.rollupOptions,
    input,
    plugins,
    external,
    onwarn(warning, warn) {
      onRollupWarning(warning, warn, config)
    },
  }
  
  // ...

  // write or generate files with rollup
  const { rollup } = await import('rollup')
  bundle = await rollup(rollupOptions)
  
  // ...
}
```

Vite 使用插件时，需要将插件放入 plugins 的数组中如下：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7afd5d51db8741d98763651b168430d8~tplv-k3u1fbpfcp-watermark.image?)

## 🚀 实践得真知

接下来我们自定义几个插件，感受下 Vite 的插件机制。

> 写这几个插件是为了理解插件机制，官方已经提供了相关的配置或者现成的插件

### 🚗 自动切换端口，默认`8080`

Vite 默认的端口不是 `8080`了，有点不太习惯，所以自己写个插件自动切换端口。

```js
import net from 'net'

function getNextPort(port: number) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.unref()
    server.on('error', () => {
      resolve(getNextPort(port + 1))
    })
    server.listen(port, () => {
      server.close(() => {
        resolve(port)
      })
    })
  })
}

function autoSwitchPortPlugin() {
  let port = 8080

  return {
    name: 'auto-switch-port',
    async configResolved(config: any) {
      port = await getNextPort(port) as number
      config.server.port = port
    },
  }
}

export default autoSwitchPortPlugin
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51b36f52134b402c82d75e3777bf41e2~tplv-k3u1fbpfcp-watermark.image?)

### 🚗 为文件加上版本号

由于这个操作是转换 `index.html`文件，所以需要使用专用钩子`transformIndexHtml`

```js
import { createHash } from "crypto"

export default function autoVersionPlugin() {
  return {
    name: 'auto-version',
    async transformIndexHtml(html: string) {
      const hash = createHash('md5').update(html).digest('hex')
      return html.replace(/(src|href)="(.*?)"/g, `$1="$2?v=${hash}"`)
    },
  }
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/507505625f44426da3e6af23a2ea650c~tplv-k3u1fbpfcp-watermark.image?)

## 🎉 总结

Vite 插件机制主要在整个构建过程的不同时机暴露出钩子函数供开发者灵活自定义构建过程。所以理解构建流程，才能更好的开发一个优秀的插件。

好了今天的分享就到这了，如果文中有纰漏的地方，欢迎指正！！！