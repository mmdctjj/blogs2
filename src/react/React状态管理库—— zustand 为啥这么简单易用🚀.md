---
title: React状态管理库—— zustand 为啥这么简单易用🚀
isTimeLine: true
date: 2023-08-23
category:
  - 前端
tag:
  - React
---

> 文章同步在公众号：萌萌哒草头将军，欢迎关注

[GitHub 地址点这里](https://github.com/pmndrs/zustand/tree/main)

### 🚀 简单易用的 `zustand `

#### 🚀 简单的对比

说到中大型 React 项目状态管理库，最先想到就是 Redux。而 Redux 是基于 Flux 架构模式的状态管理库。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/390bca56268e4817963d25f5fd5403ec~tplv-k3u1fbpfcp-watermark.image?)

Redux 继承了 Flux"单向流动"的特点，

1.  用户与 View 进行交互，触发相应的 Actions。
1.  Actions 通过 Dispatcher 进行派发。
1.  Stores 接收派发的 Actions，并根据需要更新状态。
1.  Stores 更新后触发事件，通知 Views 进行界面更新。
1.  Views 使用 Stores 中的最新状态重新渲染界面。

然而随着 Hook 的流行，Flux 模式显得日益笨重。在很长时间里，通常会采用 react 自带的 createContext 代替 Redux 的需求。一个简单的例子如下。

```js
import React, { createContext, useContext, useState } from 'react';

// 创建一个上下文对象类型
interface CountContextProps {
  count: number;
  setCount: (count: number) => void;
}
// 创建上下文
const CountContext = createContext<CountContextProps | undefined>(undefined);

// 提供器组件
const CountProvider: React.FC = ({ children }) => {
  const [count, setCount] = useState(0);

  const contextValue: CountContextProps = {
    count,
    setCount,
  };

  return (
    <CountContext.Provider value={contextValue}>
      {children}
    </CountContext.Provider>
  );
};

// 消费者组件
const Counter: React.FC = () => {
  const { count, setCount } = useContext(CountContext)!;

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

// 应用程序组件
const App: React.FC = () => {
  return (
    <CountProvider>
      <Counter />
    </CountProvider>
  );
};

export default App;
```

虽然是个简单的例子，但是实际开发中，步骤 i 依然繁琐。

那么有没有更简便的方案？答案是肯定的！

那就是 `zustand `。同样功能的例子实现如下：

```js
import create from "zustand";

// 创建状态存储
interface CountState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCountStore =
  create <
  CountState >
  ((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }));

// 消费者组件
const Counter: React.FC = () => {
  const { count, increment, decrement } = useCountStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

// 应用程序组件
const App: React.FC = () => {
  return <Counter />;
};

export default App;
```

简单的对比，就可以发现 `zustand `没有特定的概念，简单易用。

#### 🚀 监听变化

通常，当 store 变化时，可以使用 `useEffect` 监听状态变化

```js
// 消费者组件
const Counter: React.FC = () => {
  const { count, increment, decrement } = useCountStore();

  useEffect(() => console.log(count), [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

但是如果当状态的变化不想引起组件的渲染时，可以使用如下方式：

```js
// 消费者组件
const Counter: React.FC = () => {
  const { count, increment, decrement } = useCountStore();

  // useEffect(() => console.log(count), [count])

  // 注意，useCountStore.subscribe的返回值时取消订阅函数
  // 所以当组件卸载时，会自动取消订阅
  useEffect(
    () => useCountStore.subscribe((state) => console.log(state.count)),
    []
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

#### 🚀 中间件模式

`zustand` 还在状态管理的功能上提供了中间件功能。例如，当对应的值发生变化时，自动更新`localStroge`

```js
const log = (config) => (set, get, api) =>
  localStroge(
    (...args) => {
      // 这里args为set({ count })的参数就{ count }
      localStroge.setItem("count", args.count);
      set(...args);
    },
    get,
    api
  );

const useCountStore = create(
  localStroge((set) => ({
    count: 0,
    setCount: (count) => set({ count }),
  }))
);
```

当然，`zustand`提供了内置的一些中间件，如下：

```js
export * from "./middleware/redux.ts";
export * from "./middleware/devtools.ts";
export * from "./middleware/subscribeWithSelector.ts";
export * from "./middleware/combine.ts";
export * from "./middleware/persist.ts";
```

[文档可以参看这里](https://github.com/pmndrs/zustand/blob/v4.4.1/docs/integrations/persisting-store-data.md)

[社区中间件也十分丰富，详细请看这里](https://github.com/pmndrs/zustand/blob/v4.4.1/docs/integrations/third-party-libraries.md)

### 🚀 总结

`zustand` 凭借小巧的体积（2kb）和简单易用的特性，迅速获得 `GitHub` 34.3k 的 `star`，足以说明它的好用。

好了今天的文章分享到这了，下篇文章我们从源码的角度进一步的认识 `zustand` ！

### 更多文章

- [🤮 是时候放弃 useState 了，🚀 这么写 React 更丝滑 🚀](https://juejin.cn/post/7246777363257475129 "https://juejin.cn/post/7246777363257475129")

- [🎉 干货满满，React 设计原理(三)：藏在源码里的排位赛，Lane 模型 🎉](https://juejin.cn/post/7248982532728602681 "https://juejin.cn/post/7248982532728602681")

- [🎉 干货满满，React 设计原理(二)：藏在源码里的两个圈 🎉](https://juejin.cn/post/7242249906257363001 "https://juejin.cn/post/7242249906257363001")

- [🎉 干货满满，React 设计原理(一)：藏在源码里的紧箍咒，几个容易混淆的变量 🎉](https://juejin.cn/post/7241567583504728119 "https://juejin.cn/post/7241567583504728119")

- [🤔useMemo 还可以这样用？useCallback：糟了，我成替身了！](https://juejin.cn/post/7240721866548740133 "https://juejin.cn/post/7240721866548740133")

- [🔔 叮~，你有几个系统级交互的 React hooks 待查收](https://juejin.cn/post/7233762589720100919 "https://juejin.cn/post/7233762589720100919")

- [🎉React 几个不常用，但是可以四两拨千斤的 hooks🎉](https://juejin.cn/post/7230806990452850725 "https://juejin.cn/post/7230806990452850725")

- [优美的 Reactl 列表动画：Styled-Components 动画实践](https://juejin.cn/post/7216526817372225593 "https://juejin.cn/post/7216526817372225593")
