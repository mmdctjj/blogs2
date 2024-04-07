---
title: 🎉干货满满，React设计原理(三)：藏在源码里的排位赛，Lane模型🎉
isTimeLine: true
date: 2023-06-27
category:
  - 前端
tag:
  - JavaScript
  - React
---

> 文章同步更新在公众号：萌萌哒草头将军，欢迎关注

### 💡 相关阅读

- [🎉 干货满满，React 设计原理(一)：藏在源码里的紧箍咒 🎉](https://juejin.cn/post/7241567583504728119 "https://juejin.cn/post/7241567583504728119")
- [🎉 干货满满，React 设计原理(二)：藏在源码里的两个圈 🎉](https://juejin.cn/post/7242249906257363001)

## 💎 第三座大山：Lanu 模型

React 的 fiber 架构最重要的功能，就是可中断式递归组件根据状态优先级更新页面。那么 React 是怎么确定优先级的呢？

答案是`Lane`模型（又称为 Fiber Lane），

> expressTime 被抛弃了

### 🚀 Lanu 模型思想

Lane 模型是 React 中的一种状态更新机制，它的核心思想是将 UI 中的状态变化抽象成一系列的 “lane”（变化），每个 “lane” 只描述了一个状态的变化，而不是一次完整的状态更新。这样可以使得状态变化更加清晰，易于处理和维护。

举个例子，假设我们有一个计数器组件，它包含一个按钮和一个文本框，点击按钮会将文本框中的值加一。我们可以使用 Lane 模型来拆分状态变化，将状态变化分为两个小的状态变化：

```js
const [count, setCount] = useState(0);
// 更新方式1
function handleClick1() {
  setCount(count + 1);
}
// 更新方式2
function handleClick2() {
  setCount((prevCount) => prevCount + 1);
}
```

更新方式 1 中，`setCount`更新的是一个计算表达式的结果，所以无法识别它的具体含义。

更新方式 2 则将状态更新拆分成了两个小的状态变化：

1.  获取当前的  `count`  值，即  `prevCount`。
1.  将  `prevCount`  的值加一，得到新的  `count`  值

这种更新方式更加精准，因为 React 可以正确地识别状态变化，并将其拆分成多个小的状态变化。

我们来看下如下的例子：

```js
function App() {
  const [count, setCount] = useState(0);

  const onClick = () => setCount(count + 1);
  const onAsyncClick = () => {
    setTimeout(() => {
      setCount(count + 1);
    }, 2000);
  };

  return (
    <div>
      <div>{count}</div>
      <button onClick={onClick}>add</button>
      <button onClick={onAsyncClick}>async add</button>
    </div>
  );
}

export default App;
```

再点击`async add`按钮的 2 秒内，我们点击`add`按钮两次，`count`先由 0 变为 2，2 秒后，又变为 1 了。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d53b37b1d5f41f788d69c515e7abc35~tplv-k3u1fbpfcp-watermark.image?" alt="image2.gif"  /></p>

如果我们采用下面的方式更新状态

```js
const onAsyncClick = () => {
  setTimeout(() => {
    setCount((count) => count + 1);
  }, 2000);
};
```

那么 2 秒后，则会按预期一样，更新为 3。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/517eff9973be4e50880a3edf05ee9644~tplv-k3u1fbpfcp-watermark.image?" alt="image.gif"  /></p>

### 🚀 Lane 模型原理

在 React 中，Lane 模型是一种用于调度更新任务的机制，其目的是提高应用的性能和响应速度。React 中涉及的 Lane 主要有以下几种：

- SyncLane：同步更新 Lane，用于处理需要立即得到执行的更新任务，例如由 ReactDom.render() 或 ReactDOMServer.renderToString() 触发的更新任务。
- InputContinuousLane：连续
- DefaultLane：默认 Lane，用于处理普通的更新任务，例如由 useEffect() 或 useLayoutEffect() 触发的更新任务。
- IdleLane：空闲 Lane，用于处理空闲时需要执行的更新任务，例如预加载图片等。

Lane 的具体值为 32 位数字，

```js
const SyncLane: Lane = /*  */ 0b0000000000000000000000000000010;
const IdleLane: Lane = /* */ 0b0100000000000000000000000000000;
const InputContinuousLane: Lane = /* */ 0b0000000000000000000000000001000;
const DefaultLane: Lane = /* */ 0b0000000000000000000000000100000;
```

这些 Lane 的优先级顺序依次降低，SyncLane 的优先级最高，IdleLane 的优先级最低。

而在 React 源码中，相关的 EventPriority 定义在 ReactEventPriorities.js 文件中，其定义如下：

```js
const DiscreteEventPriority = SyncLane;
const ContinuousEventPriority = InputContinuousLane;
const DefaultEventPriority = DefaultLane;
const IdleEventPriority = IdleLane;
```

以下是四个事件优先级：

- 离散事件（DiscreteEvent）：指需要立即执行的事件，例如输入框的 onChange 事件。这些事件需要立即得到响应，以保证应用的交互性能。
- 用户交互事件（UserBlockingEvent）：指与用户交互相关的事件，例如点击、滚动等。这些事件也需要尽快得到响应，以提供流畅的用户体验。
- 普通事件（NormalEvent）：指一般的更新事件，例如数据更新、网络请求等。这些事件的优先级较低，可以等待一段时间再执行。
- 空闲事件（IdleEvent）：指可以在浏览器空闲时执行的事件，例如预加载图片等。这些事件的优先级最低，只有在没有其他任务需要执行时才会执行。

首先，React 每次更新状态会将同类型的 Lane 合并形成 Lanes，然后从同类型的 Lanes 中找出优先级最高的事件。

这里有两个问题：

- Lane 是如何合并成 Lanes 的？
- 怎么从 Lanes 中找出优先级最高的？

首先，React 通过位运算 lane & lane 判断两个 lane 是否是同一类型，如果是，再使用 lane | lane 将 lane 合并成 lanes。

```js
function mergeLanes(a, b) {
  return a | b;
}
function intersectLanes(a, b) {
  return a & b;
}
queueLanes = intersectLanes(queueLanes, root.pendingLanes);

const newQueueLanes = mergeLanes(queueLanes, lane);
queue.lanes = newQueueLanes;
```

需要更新状态时，使用 lanes & -lanes 从相同的 lanes 中找出优先级最高的 lane

```js
function getHighestPriorityLane(lanes) {
  return lanes & -lanes;
}
```

然后将这个 lane 转为对应的 EventPriority。

```js
function lanesToEventPriority(lanes) {
  const lane = getHighestPriorityLane(lanes);

  if (!isHigherEventPriority(DiscreteEventPriority, lane)) {
    return DiscreteEventPriority;
  }

  if (!isHigherEventPriority(ContinuousEventPriority, lane)) {
    return ContinuousEventPriority;
  }

  if (includesNonIdleWork(lane)) {
    return DefaultEventPriority;
  }

  return IdleEventPriority;
}
```

当事件需要处理时，React 总会将优先级最高的事件交给 Scheduler （调度包）转换为更新任务，并将其加入任务队列中。任务队列中的任务按照事件优先级从高到低排序，以确保高优先级任务优先执行。

再 Scheduler 中又会将 EventPriority 优先级转换为任务优先级。然后根据任务优先级进行排序。

```js
let schedulerPriorityLevel;

switch (lanesToEventPriority(nextLanes)) {
  case DiscreteEventPriority:
    schedulerPriorityLevel = ImmediatePriority;
    break;

  case ContinuousEventPriority:
    schedulerPriorityLevel = UserBlockingPriority;
    break;

  case DefaultEventPriority:
    schedulerPriorityLevel = NormalPriority;
    break;

  case IdleEventPriority:
    schedulerPriorityLevel = IdlePriority;
    break;

  default:
    schedulerPriorityLevel = NormalPriority;
    break;
```

任务优先级和 EventPriority 优先级对应该关系也如上面代码 switch 的对应关系。

> 详细的任务调度流程十分复杂，我以后会专门说

### 🚀 位运算原理

在 JavaScript 中，位运算是一种操作二进制数字的运算。它们利用数字的二进制表示来执行按位操作。以 3 和 5 为例，3 的二进制为 0011，5 的二进制为 0101，我们看如下的运算：

- 与运算（&）：只有在两个数的对应位都为 1 时，结果的对应位才为 1，否则为 0。3 & 5 的结果为 0001。

- 或运算（|）：只有在两个数的对应位都为 0 时，结果的对应位才为 0，否则为 1。3 | 5 的结果为 0111。

- 非运算（~）：将一个数的二进制位按位取反，即 0 变为 1，1 变为 0。~3 的结果为 1100

## 🎉 总结

Lane 贯穿 React 更新的整个流程，是底层更新最重要的部分，本文讲述了 Lane 模型的原理以及再源码中的一些体现，后面的文章中我们会继续深入一些比较复杂的知识点，打通源码阅读的障碍。

今天的分享就到了，如果文章中有纰漏的地方可以告诉我，我会及时地更正。

你也可以关注我的公众号：萌萌哒草头将军，或者联系我：SunBoy_mmdctjj

对你有帮助话请给我点下赞，这对我很重要！

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1fd46c99b6d4d54af60897dac438c14~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"  /></p>
