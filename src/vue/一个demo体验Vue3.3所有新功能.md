---
title: 🎉一个demo体验Vue3.3所有新功能🎉
isTimeLine: true
date: 2023-06-05
category:
  - 前端
tag:
  - JavaScript
  - Vue
---

> 最新文章发布在公众号：`萌萌哒草头将军`，个人：`SunBoy_mmdctjj`，欢迎关注，最近关注有🎁，送五本JavaScript的书\~

`Vue3.3`已经发布一个月了，今天我和大家体验下最新功能

## 💎 准备工作

### 🚗 创建项目并运行

创建完项目后记得下载最新的包

```js
// 创建
npm create vite vue-demo --template vue-ts
// 下载依赖
cd vue-demo
npm i
// 更新到最新版本
npm i vue@3.3
// 运行
npm run dev
```

### 🚗 开启新功能

由于最新的功能`defineModel`是实验特性，需要在`vite.config.js`里开启，另外需要开启解构`props`响应式功能

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({  script: {
    defineModel: true, // 开启defineModel功能
    propsDestructure: true, // 开启props结构响应式
  } })],
})

```

### 🚗 下载最新的Vue Language Features (Volar)

~~如果你工作中还是写`Vue2`，那么建议你不要下载，因为和`Vetur`是冲突的~~
不冲突

感谢@[BWrong](https://juejin.cn/user/3421335914820280)大佬指正

## 🚀 体验

### 🚗 `defineProps`使用引入外部定义的接口

```html
// App.vue
<script setup lang='ts'>
// 定义接口并暴露出去
export interface Command {
  msg: string
}
const count = ref(0)
</script>

<template>
  <button @click="count ++">change count</button>
  <Child :msg="'hello vue3.3'" :count="count" />
</template>
```

```html
// Child.vue
<script setup lang='ts'>
import { Command } from '../App.vue';
defineProps<Command & { count: number}>()
</script>

<template>
  <h1>{{ msg }}</h1>
  <div>{{ count }}</div>
</template>
```

效果如下：

![defineProps.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acee2ed6b3de4cd589bd032d0b241ea5~tplv-k3u1fbpfcp-watermark.image?)

### 🚗 `props`结构响应式

我们从`defineProps`中解构出`count`，然后使用`watchEffect`打印。

```html
// Child.vue
<script setup lang='ts'>
const { count } = defineProps<Command & { count: number}>()
watchEffect(() => {
  console.log(count, 'count')
})
</script>
```

效果如下：

![reactive.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f2420aeeedb4c1b898ab0c7036915e0~tplv-k3u1fbpfcp-watermark.image?)

### 🚗 `defineEmits`

接下来使用`defineEmits`定义监听事件，当count发生变化时使用触发该事件。

```html
// Child.vue
<script setup lang="ts">
const emits = defineEmits<{
  'count-change': [modelValue: number | undefined]
}>()

watchEffect(() => {
  console.log(count, 'count')
  emits('count-change', count)
})
</script>
```

在父组件中监听最新的变化值

```html
// App.vue
<script setup lang="ts">
const countChange = (value: any[]) => {
  console.log(value, 'countChange')
}
</script>

<template>
  <Child @count-change="countChange" />
</template>
```

效果如下：

![emit.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6ef124cb662499eabfbdd26b2008f2a~tplv-k3u1fbpfcp-watermark.image?)

### 🚗 `defineModel`

接下来我们使用`defineModel`定义一个`model`，绑定在`input`标签上，同时使用`watch`监听变化。

```html
// Child.vue
<template>
  <input v-model="modelValue" />
</template>
  
<script setup lang='ts'>
const modelValue = defineModel<string>()
watch(() => modelValue.value, (val) => console.log(val))
</script>
```

需要在父组件设置`model`初始值

```html
// App.vue
<script setup lang="ts">
const modal = ref('hello world')
</script>
<template>
  <Child v-model="modal" />
</template>
```

此时效果如下：

![model.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2da118161fce47668897a425bcd7283c~tplv-k3u1fbpfcp-watermark.image?)

### 🚗 一些类型检查增强的功能

#### 泛型组件

在`script`标签上用`generic`属性定义泛型，当然也可以使用`extends`关键字继承其他属性。

```html
<script setup lang="ts" generic="T extends string | number, U extends Item">
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```

#### `defineSlots`新增类型检查

```js
defineSlots<{
  default?: (props: { msg: string }) => any
  item?: (props: { id: number }) => any
}>()
```

此时如果在具名插件上不写`id`属性或者属性不是指定类型都会报错。

## 🎉 总结

新功能确实越来越简洁了，加上`TypeScript`的加持，相信`Vue3`将会带来更好的便捷功能。

需要源码的话可以在公众号回复`vue3`

今天的分享就到了，最新文章发布在公众号：`萌萌哒草头将军`，想加我个人，请加：`SunBoy_mmdctjj`，欢迎关注和骚扰!
