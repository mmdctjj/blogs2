---
title: 🎉干货满满，React设计原理(一)：藏在源码里的紧箍咒🎉
isTimeLine: true
date: 2023-06-07
category:
  - 前端
tag:
  - JavaScript
  - React
---
### 💡 相关阅读

*   [🎉干货满满，React设计原理(二)：藏在源码里的两个圈，关键的链表结构和双缓存技术🎉](https://juejin.cn/post/7242249906257363001)

> 文章首发公众号： 萌萌哒草头将军，最近关注有🎁，欢迎关注

最近在努力研究`React`源码，发现它并没有我之前想象的那么难理解。

虽然源码里面有一些概念就像一座五指山困住了桀骜不驯的孙悟空。

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8fe02980b244d55a369e29b1cb898a7~tplv-k3u1fbpfcp-watermark.image?" alt="1e175ecdaa2843249f0084f011ef2b67.jpeg"></p>

<p align="center"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30cc3568e5a641549c5e5170212f65d2~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%"></p>

但如果你理解了下面的几个概念，读懂react源码就不是难事了。

## 💎 第一座山：`Fiber`相关变量命名

我们已经知道从`v16.8`开始，`React`进入了`fiber`架构时代，将不可中断的递归改进为可中断的递归。

`fiber`架构主要的工作是创建`fiber tree`，然后在合适的时机将这棵树渲染在屏幕上.

所以围绕着`fiber`，源码里出现了一堆带着`fiber`的变量。

### 🚗 `FiberNode`

首先，在源码中，`FiberNode`是个构造函数，它包含了许多属性。

```js
function FiberNode(
  this: $FlowFixMe,
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;
  this.refCleanup = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;
}
```

这些属性可以根据`FiberNode`的不同身份进行划分。

`FiberNode`在`React`中通常有三种不同的身份：

*   👉 作为架构的一环

作为架构的一环，多个`FiberNode`作为基本节点构成`fiber tree`。

此时，它的相关属性如下：

```js
// Fiber
// 指向父节点
this.return = null;
// 指向第一个子节点
this.child = null;
// 指向右边兄弟节点
this.sibling = null;
this.index = 0;
```

*   👉 作为数据的一环

作为数据的一环，它保存了基本的`React`元素信息。

```js
// Instance
// 对应组件的类型，可以是class、function等
this.tag = tag;
// 组件的key
this.key = key;
// 和type类似的属性
this.elementType = null;
// 根据tag的不同，可以是calss、function、tagName（div、input等原始的标签）
this.type = null;
// FiberNode对应的元素
this.stateNode = null;
```

这里说明一下`React`元素:

`React`元素可以是`<div>Hello!</div>`基本`HTML`元素，也可以是`<App />`这样的组件，`App`是个类组件或者函数组件等。

*   👉 作为调度的一环

作为调度的一环，它提供了调度时的一些依据。

```js
// render相关
this.flags = NoFlags;
this.subtreeFlags = NoFlags;
this.deletions = null;
// 优先级相关
this.lanes = NoLanes;
this.childLanes = NoLanes;
// 缓存相关
this.alternate = null;
```

### 🚗 `fiberNode`

前面说过，`FiberNode`是`fiber tree`最小单元。而`React`元素被编译之后的`VNode`都成为`FiberNode`构造函数的实例，源码中实例都用`fiber`或者`workInProgress`表示。

### 🚗 `HostRootFiber`

`HostRootFiber`是源码里使用`createHostRootFiber`创建的`Fiber`根节点，它包含整棵组件树的信息。对应的是如下代码：

```html
<body>
    <div id="app"></div>
    <div id="app2"></div>
    <div id="app3"></div>
</body>
```

`React`允许你创建最多个`HostRootFiber`，也就是说，你可以有多个上述的挂载节点。

### 🚗 `rootFiber`

源码里通过`createHostRootFiber`的实例在作为参数时，偶尔也会使用`rootFiber`表示。

### 🚗 `FiberRootNode`

`FiberRootNode`表示应用根节点。它保存着应用的状态信息和组件信息。它的数据结构如下：

```js
function FiberRootNode(
  this: $FlowFixMe,
  containerInfo: any,
  // $FlowFixMe[missing-local-annot]
  tag,
  hydrate: any,
  identifierPrefix: any,
  onRecoverableError: any,
) {
  this.tag = tag;
  // 表示应用程序的容器元素，即组件树的根节点
  // 它一般是一个 DOM 元素，用来承载整个组件树的渲染结果。
  this.containerInfo = containerInfo;
  // 表示当前应用程序中待处理的子树列表
  this.pendingChildren = null;
  // 表示当前渲染的 Fiber 树的根节点，指向 HootRootFiber
  this.current = null;
  // 网络请求优化用的属性
  this.pingCache = null;
  // 表示最近一次渲染完成的 Fiber 树的根节点
  // React 在进行组件更新时，会创建一个新的 Fiber 树
  // 并将它与旧的 Fiber 树进行比较，找出需要更新的部分
  // 然后进行更新。当更新完成后，最近一次渲染的结果
  // 会存储在 `finishedWork` 属性中
  this.finishedWork = null;
  // 表示当前应用程序的上下文
  this.context = null;
  // 表示当前应用程序的挂起上下文
  // 在 React 中，当组件的上下文发生变化时，
  // React 会将新的上下文信息存储在 `pendingContext` 中
  // 待下一次更新时再进行处理。
  this.pendingContext = null;
  // 当组件完成更新后的回调函数
  this.callbackNode = null;
  // 表示下一次更新的过期时间
  this.expirationTimes = createLaneMap(NoTimestamp);

  // 优先级相关的属性
  this.pendingLanes = NoLanes;
  this.suspendedLanes = NoLanes;
  this.pingedLanes = NoLanes;
  this.expiredLanes = NoLanes;
  this.mutableReadLanes = NoLanes;
  this.finishedLanes = NoLanes;
  
  //....
}
```

通常状况下，`FiberRootNode`和`HootRootFiber`是一一对应的关系。

> `FiberRootNode`是单例对象，每个应用程序只会有一个实例，如果一个页面有多个`React`应用，那么会有多个实例。

### 🚗`fiberRootNode`

`fiberRootNode`是`createFiberRoot`的返回值类型。即`FiberRootNode`实例。源码里用`fiberRoot`表示。

## 💎 总结

在`Fiber`架构中，`FiberNode`实例`fiber`既是`fiber tree`的基本数据结构单元，记录元素节点的信息，也是组件根节点的数据单元，记录整个组件树的信息，同时也会为调度相关的工作提供依据；

`FiberRootNode`的实例`fiberRoot`是应用根节点的数据单元，包含整个应用的状态信息和租价信息。它和`HootRootFiber`实例`rootFiber`是一一对应关系
