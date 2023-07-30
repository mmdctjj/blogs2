---
title: 🎉SolidJS响应式原理和简易实现🎉
isTimeLine: true
date: 2023-06-01
category:
  - 前端
tag:
  - JavaScript
  - SolidJS
---

> 文章首发公众号：萌萌哒草头将军
>
> 最近有🎁，感兴趣的小伙伴快去关注我了解详情吧
>
> 完整源码公众号回复solid获得

### 💡相关阅读

[学不完的框架，🐔啄不完的米，SolidJS，你到底爱谁？😘](https://juejin.cn/editor/drafts/7236719086049820709)

[演练场地址](https://playground.solidjs.com/)：<https://playground.solidjs.com/>

上篇文章中主要介绍了`Solid JS`的基本语法，分阶段粗略地介绍了一些原理（响应式原理、编译原理和运行时原理）。

接下来的几篇文章里我会详细介绍每个阶段的详细实现原理，希望可以给你的学习带来帮助。

> 写这篇文章的时候有很大的犹豫，担心`Solid JS`受众太小，文章的反响连”平平“都算不上，所以先写一篇试试水，如果真的反响平平，我会暂时放弃这个写作计划，还请见谅！

## 响应式原理

作为`Solid JS`响应式的基石，我们先看看`createSignal`的用法和原理。接着我们手动实现一个简易版的`createSignal`,

### 💎 万恶之源`createSignal`

#### 🚗 用法

```js
function createSignal<T>(
    initialValue: T,
    options?: { equals?: false | ((prev: T, next: T) => boolean) }
): [get: () => T, set: (v: T) => T];
```

`Solid JS`的厉害之处是，你可以定义变量是否为响应式，甚至可以定义响应式的时机。

*   🍎 仅提供`initialValue`时，（默认）是响应式的。
*   🍎 在`options`设置`equals`为`false`时不管何时都是响应式。
*   🍎 `equals`设置为函数，根据新值和旧值的关系来设置何时为响应式。

#### 🚗 例子

下面这个例子仅仅在新的值大于旧的值（新增）时，才是响应式的。

```js
import { render } from "solid-js/web";
import { createSignal } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(1, { equals: (n, o) => n > o });
  const increment = () => setCount(count() + 1);
  const reduce = () => setCount(count() - 1);

  return (
    <>
      <button type="button" onClick={increment}>
        +
      </button>
      <button type="button">{count()}</button>
      <button type="button" onClick={reduce}>
        -
      </button>
    </>
  );
}

render(() => <Counter />, document.getElementById("app")!);
```

#### 🚗 原理

`createSignal`简化后的逻辑如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47d461e13e8642e399d79fc85ac6028d~tplv-k3u1fbpfcp-watermark.image?)

#### 🚗 实现

```js
const signalOptions = {
  equals: false
};

function createSignal(value, options) {
  // 初始化options
  options = options
      ? Object.assign({}, signalOptions, options)
      : signalOptions;
  // 创建内部signal
  const s = {
    value,
    comparator: options.equals || undefined
  };
 
  // 定义setter
  const setter = value => {
    if (typeof value === "function") {
      value = value(s.value);
    }
    return writeSignal(s, value);
  };
  // 返回[getter, setter]
  return [readSignal.bind(s), setter];
}
// 返回当前内部signal的value
function readSignal() {
  return this.value;
}
// 更新内部的value，然后返回value
function writeSignal(node, value) {
  if (!node.comparator) {
    node.value = value;
  }
  return value;
}
```

现在我们已经实现了`createSignal`基本功能了，接下来我们通过实现`createEffect`来让它具有响应式的能力。

### 💎`createEffect`

#### 🚗 用法

`createEffect`接受一个副作用函数，每当它依赖的状态发生改变时，这个副作用都被执行一次。

```js
function createEffect<T>(fn: (v: T) => T, value?: T): void;
```

#### 🚗 例子

这是个很常见的例子。

```js
import { render } from "solid-js/web";
import { createSignal, createEffect } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(1);
  const increment = () => setCount(count() + 1);

  createEffect(() => console.log('count : ', count()))
  return (
    <button type="button" onClick={increment}>
      {count()}
    </button>
  );
}

render(() => <Counter />, document.getElementById("app")!);
```

#### 🚗 原理

我们已经知道，当`createEffect`依赖项发生改变时，副作用会也会发生改变，这是因为`createSignal`是基于`发布订阅模式`的响应式。一个较为完整的关系如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d336c8d286f34f9083a3f614b7102639~tplv-k3u1fbpfcp-watermark.image?)

#### 🚗 实现

```js
const signalOptions = {
  equals: false
};

const observers = []

function createEffect (effect) {
  const execute = () => {
    // 保存在observers中
    observers.push(execute);
    try {
      effect();
    } finally {
      // 释放
      observers.pop();
    }
  };
  // 副作用函数立即执行
  execute();
};

function createSignal(value, options) {
  // 初始化options
  options = options
      ? Object.assign({}, signalOptions, options)
      : signalOptions;
  // 创建内部signal
  const s = {
    value,
    // 保存订阅者
    subscribers: new Set(),
    comparator: options.equals || undefined
  };
 
  // 定义setter
  const setter = value => {
    if (typeof value === "function") {
      value = value(s.value);
    }
    return writeSignal(s, value);
  };
  // 返回[getter, setter]
  return [readSignal.bind(s), setter];
}

// 返回当前内部signal的value
function readSignal() {
  const curr = observers[observers.length - 1]
  curr && this.subscribers.add(curr)
  return this.value;
}

// 更新内部的value，然后返回value
function writeSignal(node, value) {
  if (!node.comparator) {
    node.value = value;
  }
  // 每次写入时执行对应的订阅者
  node.subscribers.forEach((subscriber) => subscriber());
  return value;
}
```

现在我们准备下面的`html`文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SolidJS</title>
</head>
<body>
  <h1>打开控制台查看结果</h1>
  <script src="./solid.js"></script>
  <script>
    const [count, setCount] = createSignal(1);
    const increment = () => setCount(count() + 1);
    createEffect(() => console.log('count : ', count()))
    window.increment = increment
  </script>
</body>
</html>
```

使用`window.increment`模拟点击事件，打印如下。
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd105e77703e4a4b993ba088c6d87b92~tplv-k3u1fbpfcp-watermark.image?)

下面我们实现`createMemo`

### 💎 `createMemo`

#### 🚗 用法

`createMemo`通常用来做派生变量保存基于某个状态中间值。完整用法如下：

```js
function createMemo<T>(
    fn: (v: T) => T,
    value?: T,
    options?: { equals?: false | ((prev: T, next: T) => boolean) }
): () => T;
```

本篇只讨论最原始的`memo`。

#### 🚗 例子

一个例子如下，每当`count`变化时，`sum`自动加`2`

```js
import { render } from "solid-js/web";
import { createSignal, createEffect, createMemo } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(1);
  const increment = () => setCount(count() + 1);

  const sum = createMemo(() => count() + 2)
  
  createEffect(() => console.log('sum : ', sum()))
  
  createEffect(() => console.log('count : ', count()))
  
  return (
    <button type="button" onClick={increment}>
      {count()}
    </button>
  );
}

render(() => <Counter />, document.getElementById("app")!);

```

#### 🚗 原理

它的内部是使用`createSignal`实现的，所以流程上来说和`createEffect`一样。

> 真实的源码里，是基于`createComputation`实现的，但是它的内部是`createSignal`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/751177d27936445cb42707a183e7063c~tplv-k3u1fbpfcp-watermark.image?)

#### 🚗 实现

```js
const createMemo = (memo) => {
  const [value, setValue] = createSignal();

  createEffect(() => setValue(memo()));

  return value;
};
```

接下来在测试例子里添加如下两行

```js
const sum = createMemo(() => count() + 2)
createEffect(() => console.log('sum : ', sum()))
```

然后在控制台操作
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e895e5491ea04ffc8f1d47e924873cf4~tplv-k3u1fbpfcp-watermark.image?)

### 🎉 最后

今天的分享就到这了，如果发现错误，请及时指正。

觉得还不错，可以关注我的公众号，最近有🎁，感兴趣的小伙伴快点来吧！

本系列未来的计划：

*   [x] `SolidJS`响应式原理和简易实现
*   [ ] `SolidJS`模板编译过程
*   [ ] `SolidJS`源码学习过程总结
