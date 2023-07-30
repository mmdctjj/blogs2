---
title: 🎉干货满满，React设计原理(二)：藏在源码里的两个圈🎉
isTimeLine: true
date: 2023-06-08
category:
  - 前端
tag:
  - JavaScript
  - React
---
### 💡相关阅读

*   [🎉干货满满，React设计原理(一)：藏在源码里的紧箍咒，几个容易混淆的变量🎉](https://juejin.cn/post/7241567583504728119)

> 文章首发公众号：萌萌哒草头将军，最近关注有🎁，欢迎关注

## 💎 第二座大山：链表结构和双缓存机制

上篇文章中讲述了几个容易给源码阅读造成困扰的几个`fiber`相关的变量名称，这篇我将介绍下`Fiber`架构的链表结构和双缓存机制。

上文提到，`FiberNode`扮演多种角色时，保存着不同的数据，所以`FiberNode`保存的数据比较复杂。

本文重点，讲解作为`Fiber`架构的一环时，保存的链状数据结构（同时也会捎带的讲解其他的一些属性），以及双缓存机制，

### 🚗 链表结构

`Fiber tree`由多个`FiberNode`节点组成的树状链表结构的数据。每个`FiberNode`
的节点都有以下几个和`Fiber`架构相关的重要属性：

```js
// 指向父节点
this.return = null;
// 指向第一个子节点
this.child = null;
// 指向右边兄弟节点
this.sibling = null;
```

虽然根据不同的节点类型（比如函数组件、类组件、普通元素等）数据结构会有所不同，但是它们都会使用这三个属性描述它与它们相邻节点的关系。

比如，有如下的代码：

```js
function App() {
  const [name, setName] = useState("mmdctjj");
  const [count, setCount] = useState(0);
  return (
    <>
      <button
        onClick={() => {
          setName(name => name + 'l')
          setCount(count => count + 1)
        }}
      >
        {count}--{name}
      </button>
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

它们的`Fiber tree`示意图如下：

<p align="center"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac675369855f44288257f7de916e60be~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

实际的`Fiber`树状链表结构如下：

<p align="center"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe0441d4a31d4cf08d3359b0f65feee8~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

此时对应的是`mounted`阶段的初始状态，如果我们点击一次按钮，新的树状链状结构(对应`updated`阶段)如下：

<p align="center"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00db240d19b5452d9af1bfe1fc66cf79~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

对比两次的`Fiber`数据结构，从中我们可以得出结论：

*   🔥 在函数组件对应的链表结构中，`React`每次将更新的内容渲染在页面之后，会将组件里的每个`useState`返回的状态记录在`memoizedState`下的`baseState`属性上，返回的`dispatch`方法有`queue`属性上，同时使用`next`属性指向下一个状态。直到最后一个状态时，`next`为`null`。这是我们发现的第二条链状结构。

<p align="center"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/707388b24cab4677abd24a0e751b0d76~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

*   🔥 另外我们还发现，`button`所在的`fiber`结构中，`memoizedProps`、`pendingProps`属性上存在`children`、`onClick`属性

<p align="center"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/321beee4d24b44e984df3e49502a8d81~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

*   🔥 我们还发现，更新之后，每个`fiber`结构的`alternate`都指向了上次的自己。这其实是双缓存机制的实现，下面我们还会讲到。

<p align="center"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f8503613f9941d7a2e9f2b974cd6624~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

如果我们将上面的函数组件替换为具有同样功能的类组件时（代码如下）

```js
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      name: "mmdctjj",
    };
  }

  render() {
    return (
      <>
        <button
          onClick={() =>
            this.setState({
              count: this.state.count + 1,
              name: this.state.name + "l",
            })
          }
        >
          {this.state.count}--{this.state.name}
        </button>
      </>
    );
  }
}
```

它的树状链表结构如下：

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/440658c709ca403bbe80bb07668073ea~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%">

这里我们发现类组件和函数组件不一样的地方：

*   🔥 类组件的`fiber`结构的`memoizedState`属性仅仅对应`this.state`的值，没有了想函数组件的第二条链表。

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e6a49f8a4bf4f218b9aeb89d1e1ca5a~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

*   🔥 类组件的`fiber`结构的`updateQueue`属性承载了组件的更新信息。这里的更新我们以后会详细讲到的。

<p align="center"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e261182a769243fa8798ba29e8df5664~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

总结下，`React`会为不同类型的`Fiber tree`节点创建不同的数据结构（略微不同的`FiberNode`类型），不同的数据结构更新方式也不一样。

除了上面说到的类组件和函数组件，还有`Fargement`、`Suspense`内置组件类型和一些别的情况下的特殊组件。

### 🚗 双缓存机制

上面提到，更新之后每个`fiber`节点的`alternate`属性都会指向上次的自己。其实这是`React`的一种优化策略。

`React`在运行时解析`vnode`，更新之后标记出更新前后变动的`dom`，然后渲染在页面中。如果每次都重新生成新的`dom`显然十分浪费资源。

所以`React`一方面会为每个`dom`绑定上次的状态，当发生变更时，快速比对，找出变动的地方。

另一方面，`React`还在内存中维护了一棵`Fiber tree`，变量名为`workInProgress`，用于快速切换。

> 源码中，所有带着`workInProgressXxx`的变量，都是指运行在内存中的对象。比如`workInProgressHook`

上篇文章中提到过，每个应用都会有唯一的`FiberRootNode`实例用来维护整个应用的状态和组件信息。它有个`current`属性用于指向渲染在页面中的`fiber tree`，而每个`fiber`节点`alternate`指向另一棵树中的自己。

接下来我们从组件开始加载到更新，看看双缓存机制的作用过程。

首先是应用被建立。`App`组件还未还未加载，此时是`FiberRootNode`的`current`属性为`null`：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7913d514d394bdcb8d69295c87e644d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

在`App`组件解析成`vMNode`后，还在内存`workInProgress`中时：

<p align="center"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f809eb4e310d411899e72622146a8519~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

当将`vNode`渲染在浏览器时，`FiberRootNode`的`current`属性指向`workInProgress`，`workInProgress`置空操作：

<p align="center"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a202ed2eef1f47f0aeb80ea47e578586~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

此时，我们点击`button`的点击事件，触发更新，内存中又多了个一棵树：

<p align="center"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97619d2b8f674c988210ecf38ed85ccc~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

通过`alternate`属性比对，发现是`App`组件状态发生改变了，所以从`App`组件开始替换子树，然后将`FiberRootNode`的`current`属性指向`workInProgress`成为新的`curent`属性，旧的`current`替换之后成为`workInProgress`，并置为空，等待下次的更新：

<p align="center"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4394ff787c1405fb320df209417b2d0~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

> 这里我小小地剧透下，上述整个过程主要是`render`阶段地内容。具体而言，`render`阶段又可以分为三个小阶段：
>
> *   `beginWork`阶段：顺着`child`属性向下遍历，找到变化地地方，打上`标记`
> *   `complateWork`阶段：顺着`return`属性向上回归，将有`标记`的地方`更新`，此时就是更新`workInProgress`对应地`Fiber tree`
> *   `commitRoot`阶段：将`workInProgress`对应的`Fiber tree`渲染到页面，同时完成上述指针的切换工作。

## 🚗 总结

`React`为不同的节点类型构建了不同的`fiber`结构和更新机制，但总的来说，它们具有同样的链表结构。

本文重点介绍了类组件和函数组件的一些字段区别。另外通过`alternate`引出并介绍了`双缓存`机制：`current`和`workInProgress`的循环往替更新。

就是这两个重要的”圈“，给`React`套上了神秘的面纱。

## 🎉 最后

如果你发现本文一些错误的地方，请不吝指正，肥肠感谢🙏

这是本系列的第二篇了，真的干货满满，全文近六千五字符。

这个系列的目的通过分析一些理论知识，降低阅读源码的难度，即使不读源码也会对`React`的设计思想有总体上的理解。

*   [🎉干货满满，React设计原理(一)：藏在源码里的紧箍咒，几个容易混淆的变量🎉](https://juejin.cn/post/7241567583504728119)
*   [🎉干货满满，React设计原理(二)：藏在源码里的两个圈，关键的链表结构和双缓存技术🎉](https://juejin.cn/post/7241567583504728119)
*   🎉干货满满，React设计原理(三)：藏在源码里的排位赛，`Lanu模型`和`Batched Updates`🎉
*   🎉干货满满，React设计原理(四)：藏在源码里的传呼机，`Dispatch`机制和事件系统🎉
*   🎉干货满满，React设计原理(五)：藏在源码里的xx，待定🎉

所以对你有帮助话请给我点下赞，这对我很重要！

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e4eef4c835b47738b5376e577b3a5f1~tplv-k3u1fbpfcp-watermark.image?)
