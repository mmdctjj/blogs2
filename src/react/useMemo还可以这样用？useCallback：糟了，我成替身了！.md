---
title: 🤔useMemo还可以这样用？useCallback：糟了，我成替身了！
isTimeLine: true
date: 2023-06-04
category:
  - 前端
tag:
  - JavaScript
  - React
---

> 文章首发公众号：萌萌哒草头将军，最近关注有🎁，欢迎关注！

最近在研究`React`的源码，然后，我就悟了！

<p align="center"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42e6ae2e8ca749e58d3c08f7d808b255~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%"></p>

### 💡推荐阅读

[🎉干货满满，React设计原理，藏在源码里的五指山🎉](https://juejin.cn/post/7241567583504728119?share_token=e6d6f76c-3962-473b-bd11-716c41a1089d)

## 💎 开门见山

请看👇的代码：你觉得可以按预期运行吗？

```js
import { useMemo, useState } from 'react'

function App() {

  const [count, setCount] = useState(0)

  const onClick = useMemo(() => {
      return () => setCount((count) => count + 1)
  }, [])
  
  useMemo(() => console.log(count), [count])

  return (
    <div className="App">
      <button onClick={onClick}>
          count is {count}
        </button>
    </div>
  );
}

export default App;
```

答案是完全可以！

## 💎 分析

### 🚗 用法分析

他们都接收两个参数，`useXxx(callback, [...deps])`

*   👉第一个参数`callback`是回调函数

*   👉第二个参数`deps`是依赖项

不同的是当依赖项发生改变时

*   🚆`useCallback`会重新创建回调函数，以保证每次调用都是最新值。并缓存这个函数

*   🚆`useEffect`回调函数会重新执行

*   🚆`useMemo`回调函数会重新执行，并缓存返回值。

根据`useMemo`返回值的不同，可以模拟出不同的效果：

*   👉当返回值是个函数时，它`useCallback`和是完全等效的。

*   👉当没有返回值或者不管返回值时，它`useEffect`和部分功能是等效的

> 这是因为，它不会像`useEffect`一样，对返回值做处理。也就是说，它无法模拟`unMounted`生命周期函数。

就是这么简单的原因，上面的代码会执行成功。

### 🚗 源码分析

这部分是选读，如果你对源码感兴趣，可以阅读这块。

#### 🚆 `useMemo`源码逻辑

*   👉注册`hook`状态

*   👉此时是`mounted`阶段，调用`mountMemo`，

*   👉将注册的`callback`和`deps`拿出来

*   👉执行`callback`，并将执行结果和`deps`缓存在当前`hook`的状态上

*   👉`deps`发生改变，进入`update`阶段，调用`updateMemo`

*   👉取出当前的`hook`状态，拿到`callback`和`deps`，再从当前`hook`拿到上次的`deps`

*   👉比较前后两次的`deps`，如果一致，直接返回当前的状态值

*   👉否则重新执行`callback`，保持返回值，并将该值最为最新的状态值和`deps`一起保存起来

```js
function mountMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null,
): T {
  // 拿到当前的hook状态
  const hook = mountWorkInProgressHook();
  // 拿到当前的hook依赖项
  const nextDeps = deps === undefined ? null : deps;
  if (shouldDoubleInvokeUserFnsInHooksDEV) {
    nextCreate();
  }
  // 执行回调函数
  const nextValue = nextCreate();
  // 缓存回调函数返回值和依赖
  hook.memoizedState = [nextValue, nextDeps];
  // 返回返回值
  return nextValue;
}

function updateMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null,
): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  // Assume these are defined. If they're not, areHookInputsEqual will warn.
  if (nextDeps !== null) {
    const prevDeps: Array<mixed> | null = prevState[1];
    if (areHookInputsEqual(nextDeps, prevDeps)) {
      // 如果前后依赖相同时，直接返回当前值
      return prevState[0];
    }
  }
  if (shouldDoubleInvokeUserFnsInHooksDEV) {
    nextCreate();
  }
  // 否则重新计算赋值，并返回最新值
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```

#### 🚆 `useCallback`源码逻辑

*   👉注册`hook`状态

*   👉此时是`mounted`阶段，调用`mountCallback`，

*   👉将注册的`callback`和`deps`拿出来

*   👉将`callback`和`deps`缓存在当前`hook`的状态上

*   👉`deps`发生改变，进入`update`阶段，调用`updateCallback`

*   👉取出当前的`hook`状态，拿到`callback`和`deps`，再从当前`hook`拿到上次的`deps`

*   👉比较前后两次的`deps`，如果一致，直接返回当前的状态值

*   👉否则重新将`callback`做为最新的状态值和`deps`一起保存起来

```js
function mountCallback<T>(
  callback: T,
  deps: Array<mixed> | void | null
): T {
  // 获取当前hook状态
  const hook = mountWorkInProgressHook();
  // 获取当前hook依赖项
  const nextDeps = deps === undefined ? null : deps;
  // 缓存回调函数和依赖
  hook.memoizedState = [callback, nextDeps];
  // 返回回调函数
  return callback;
}

function updateCallback<T>(
  callback: T,
  deps: Array<mixed> | void | null
): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  if (nextDeps !== null) {
    const prevDeps: Array<mixed> | null = prevState[1];
    if (areHookInputsEqual(nextDeps, prevDeps)) {
      // 如果依赖项相同时，直接返回当前值
      return prevState[0];
    }
  }
  // 否则重新赋值，并返回最新值
  hook.memoizedState = [callback, nextDeps];
  return callback;
}

```

从源码上看，`useCallback`和`useMemo`的实现十分类似，唯一的不同之处是：`useMemo`在依赖项发生变化时会缓存回调函数的返回值。

## 💎 总结

`useCallback`和`useMemo`都是缓存中间状态，

不同的是`useMemo`可以缓存任何类型的值，`useCallback`仅仅缓存函数。所以开头的例子可以按预期运行。

好了，今天的分享比较简单，但是希望可以帮你理解地更深一点。

下篇我们继续聊`hook`。
