---
title: Zustand 底层原理🚀🚀🚀
isTimeLine: true
date: 2023-08-24
category:
  - 前端
tag:
  - React
---

接着上篇文章：[React 状态管理库—— zustand 为啥这么简单易用 🚀](https://juejin.cn/post/7270430481693835276)

今天探究 `Zustand` 底层原理

### 🚀`zustand`为什么这么好用

第一次使用 `zustand` 被惊艳到了。只需要调用`create`函数创建`store`就可以直接在任何组件使用了。

#### 💎 底层原理很简单

好奇的翻开代码，才发现 `zustand` 基于发布订阅模式实现的响应式。下面是核心代码实现。

```js
function createStoreImpl(initialState) {
  let state = initialState;
  const listeners = new Set();

  function setState(newState) {
    state = newState;
    listeners.forEach((listener) => listener(state));
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function destroy() {
    listeners.clear();
  }

  return {
    getState: () => state,
    setState,
    subscribe,
    destroy,
  };
}
```

使用方法如下：

```js
// 创建
const store = createStoreImpl({ count: 0 });
// 更新
store.setState({ count: 1 });
// 订阅
const unsubscribe = store.subscribe((state) => {
  console.log("State changed:", state);
});

store.setState({ count: 2 }); // 触发订阅的回调函数

unsubscribe(); // 取消订阅

store.setState({ count: 3 }); // 不会触发订阅的回调函数

store.destroy(); // 销毁这个store
```

#### 💎 不同环境处理

事实上，`zustand` 提供了两个版本的包，即 react 版本和非 react 的 `vanilla` 版本。

包的 export 信息如下，可以看出默认为 react 版本，

```js
export * from "./vanilla.ts";
export * from "./react.ts";
export { default } from "./react.ts";
```

非 react 的环境使用如下

```js
import { createStore } from 'zustand/vanilla'

const store = createStore(() => ({ ... }))

const { getState, setState, subscribe } = store

export default store
```

在 react 模式下，和 `vanilla` 版本相同的是他们都是使用 `createStore` 创建的，使用 `create` 创建 `store`

和 `vanilla` 版本不同的是，`createImpl` 的返回值是使用 `useStore` 包装了一层的返回值（实际是 `useSyncExternalStore api`）。

```js
const createImpl = (createState) => {
  const api =
    typeof createState === "function" ? createStore(createState) : createState;

  const useBoundStore = (selector, equalityFn) =>
    useStore(api, selector, equalityFn);

  Object.assign(useBoundStore, api);

  return useBoundStore;
};

export const create = (createState) =>
  createState ? createImpl(createState) : createImpl;
```

`useStore` 又通过内置的包 `use-sync-external-store/shim/with-selector`处理。

`use-sync-external-store`可以在 `Zustand` 中使用外部状态管理库的状态，例如 `Redux`。

```js
import useSyncExternalStoreExports from 'use-sync-external-store/shim/with-selector'

export function useStore<TState, StateSlice>(
  api: WithReact<StoreApi<TState>>,
  selector: (state: TState) => StateSlice = api.getState as any,
  equalityFn?: (a: StateSlice, b: StateSlice) => boolean
) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  )
  useDebugValue(slice)
  return slice
}
```
