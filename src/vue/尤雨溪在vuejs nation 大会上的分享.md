---
title: 尤雨溪在vuejs nation 大会上的分享🚀🚀🚀
isTimeLine: true
star: true
date: 2025-02-13
category:
  - 前端
tag:
  - Vue
---

上篇文章[《🚀🚀🚀Vapor Mode 发布前，你应该知道的一些事情！》](https://juejin.cn/post/7461445142551085097)根据自己的经验，对 3.6 版本的改变做了一些预测！

- 保留现有的`响应式API`！
- 替换现在的`VNode`组件级渲染方案为精确的`真实dom`渲染！

今天，我们一起来看看 `2025` 年 `1月3号` 的`vue.js nation` 大会上尤雨溪的报告内容了！

> 文章同步在公众号：萌萌哒草头将军，欢迎关注！

### 🛸 基于外星信号 `alien signals`的响应式系统重构

`alien signals` 是一个 `signals` 系统的项目，单独于 `vue` 存在!

地址：https://github.com/stackblitz/alien-signals

由于其作者 `Johnson Chu` 参与了大量 `vue` 的优化工作，现在在新的 `PR` 也就是将来的 `3.6` 版本，将 `alien signals` 合入了`@vue/core`

PR 地址：https://github.com/vuejs/core/pull/12349

下面是尤雨溪引用的官网图：`alien signals` 各方面碾压 `vue3.4`，

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7137891dbf4d412f95663f14517f77b4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1739535080&x-orig-sign=kDCX58LmzFJIenqB8FMpQmXwu38%3D)

官网提到的原因是：在信号系统的实现上施加了一些约束（例如不使用 Array/Set/Map 以及不允许函数递归）以确保性能。

下面是一些基本写法：

```js
import { signal, computed, effect } from "alien-signals";
const count = signal(1);
const doubleCount = computed(() => count() * 2);
effect(() => {
  console.log(`Count is: ${count()}`);
}); // Console: Count is: 1
console.log(doubleCount()); // 2
count(2); // Console: Count is: 2
console.log(doubleCount()); // 4
```

所以，本次更新的核心在于响应式系统的重大性能提升，

延续了此前 `3.4` 和 `3.5` 版本对响应式机制的优化。

通过引入外星信号 `alien signals`，使 `Vue` 的响应式系统实现标准化与性能飞跃!

- 🚀 **响应式性能飞跃**：通过响应式系统底层重构，带来 40% 的性能提升
- 🔧 **外星信号集成**：内存占用降低 65%，响应追踪效率提升 3 倍

上面的数字来源于 `PPT`

新一代响应式系统采用`槽位复用+增量GC`策略，在大型表单场景下，内存碎片减少 82%。通过对象头压缩技术，每个响应式对象的内存开销从 48 bytes 压缩至 16 bytes，使得百万级数据表操作成为可能。

> 不要被新名词吓倒：`槽位复用+增量GC`是通过复用 `DOM` 节点，降低了内存的分配和释放频率，从而减少了 `GC` 的压力

### 🚂 全新的编译策略，蒸汽模式：`vapor mode`

#### vapor mode 和 虚拟 dom 混合开发

全新的 `Vapor mode` 将采用`模板预编译+运行时直出` 的混合策略进行编译，取得了实质性突破，

- 虚拟 DOM 的按需激活机制
- 响应式变更的位掩码追踪技术
- 模板静态分析的 `SIMD` 指令优化

使 `Vue` 应用在保持现有代码库兼容性的同时，达到与 `Solid JS` 等顶尖框架比肩的性能水平。

这使得同等规模的 `TodoMVC` 应用，首屏渲染速度从 127ms 提升至 43ms。

如果你需要在特定的组件使用`vapor mode`，只需要在`<script vapor>`

如果你想创建一个纯的`vapor mode`项目，可以使用`createVaporApp`！

```js
import { createVaporApp } from 'vue/vapor'
import './style.css'
import App from './App.vue'

const create = createVaporApp
create(App as any).mount('#app')
```

目前不支持：`SSR 水合物`、`Transition`、`KeepAlive`、`Suspense`

#### 组件类型推断改进

此外，内部类型系统基于 `代数效应（Algebraic Effects）` 的推断算法重构，成功解决了泛型组件类型展开时的指数爆炸问题。

在包含 20 层嵌套的复杂组件场景中，Volar 插件的类型检查速度从 4.3 秒缩短至 0.7 秒。

- 🌐 **蒸汽模式革命**：编译策略转型实现 92% 的运行时性能优化
- 📦 **捆绑包瘦身**：蒸汽模式下应用体积缩减至传统模式的 1/3

### 🔧 打包工具`rolldown`

第三部分尤雨溪介绍了公司 `voidzero` 最新的成果`rolldown`！

新一代打包工具 `rolldown` 通过 `WASM` 多线程架构，实现了依赖解析的并行流水线处理。

在 `monorepo` 场景下，冷启动构建速度达到 `esbuild` 的 2.3 倍。

其独创的 `按需 Tree Shaking` 算法，使得最终产物体积平均缩减 27%。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3b3487c6e2464467934cf6a66d6ad8ef~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1739538688&x-orig-sign=OOzsJh9ubDNzVK6bcmZKU%2FZTy2Q%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7942eca150224189b51446e067d6cc8a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1739538736&x-orig-sign=6maXQV0I8IgtOJtWeyLEG05x4Tk%3D)

### 社区共建

本次更新特别设立"社区代码高速公路"计划，允许开发者通过 RFC 提案直接影响框架演进方向。

首批开放的 6 个核心模块已收到 142 个 PR，其中 `23%` 来自中国开发者，彰显 Vue 生态的全球化协作力量。

### 总结

Vue 3.6 的技术革新，本质上是声明式编程与编译时优化的深度融合。通过 alien signals 实现响应式系统的量子跃迁，借助蒸汽模式完成运行时性能的维度突破，配合类型系统与生态工具的全面升级，Vue 正在重新定义现代前端框架的性能基准。这些变革不仅巩固了其在中小型项目的优势地位，更使其具备了挑战复杂企业级应用的实力，标志着 Vue 正式进入"性能优先"的新纪元。

好了，今天的分享就到了，欢迎指正文章中的错误内容！
