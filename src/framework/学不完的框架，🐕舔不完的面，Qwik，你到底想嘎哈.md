---
title: 学不完的框架，🐕舔不完的面，Qwik，你到底想嘎哈？
isTimeLine: true
date: 2023-06-12
category:
  - 前端
tag:
  - JavaScript
  - Vite
---

> 文章首发在公众号：萌萌哒草头将军，最近关注有抽五本书送给大家，关注后回复：活动

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a30a0f552e84feba7e9fd8207eb582d~tplv-k3u1fbpfcp-watermark.image?" alt="grif.gif" width="50%" /></p>

最近我又又双学习了一个新框架，`Qwik`

<p align="center"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a971a174b4564496ac766e9ec7022a25~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="30%"></p>

真的没完没了了，

<p align="center"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7509dc3757a348f5a91e6e58b6e1658d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="30%"></p>

不过作为"前端娱乐圈战地记者"，我继续帮大家踩雷。

<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16aab0927d8f46e0ba95475aca38b694~tplv-k3u1fbpfcp-watermark.image?" alt="Screenshot_2023-06-11-19-13-32-405_com.daimajia.gold-edit.jpg"  /></p>

### 💡 同系列阅读

*   [学不完的框架，🐔啄不完的米，SolidJS，你到底爱谁？😘](https://juejin.cn/post/7236719086049837093)
*   [🔥超级简单的Svelte，学不会你来打我](https://juejin.cn/post/7226689042406637624)
*   真心希望不会有烧不断地锁这篇文章！！！ 

## 💎 初识qwik

废话不多说，我们先上代码。一个简单的计数器功能

### 🚀 `useSignal`

```js
const App = component$(() => {
  
  const count = useSignal(0);

  return (
    <>
      <button onClick$={() => count.value++}>+</button>
      <div>{count.value}</div>
    </>
  );
});
```

让我们给这个计数器加上监听事件（后面会详细讲）

```js
  useVisibleTask$(({ track }) => {
    track(() => console.log(count.value))
  })
```

![sigal.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83291b82343845fa928fe3973369022e~tplv-k3u1fbpfcp-watermark.image?)

`useSignal`，虽然让我想起来了熟悉地`SolidJS`，但是看写法，这不就是`vue3`的`ref`吗？是的，看起来很像，那有没有类似`reactive`呢？

### 🚀 `useStore`

当然有啊，`useSignal`是针对基本变量的。对于非基本类型可以使用`useStore`。

```js
const App = component$(() => {
  
  const data = useStore({count: 0})

  return (
    <>
      <button onClick$={() => data.count++}>+</button>
      <p>{data.count}</p>
    </>
  );
});
```

![sigal.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83291b82343845fa928fe3973369022e~tplv-k3u1fbpfcp-watermark.image?)

`useStore`可以听提供方法，不过比较复杂：

```js
import {
  $,
  type QRL
} from "@builder.io/qwik";
 
type Store = {
  count: number
  add: QRL<(this: Store) => void>
}

const App = component$(() => {
  const data = useStore<Store>({
    count: 0,
    add: $(function(this) {
        this.count++;
    })
  })
  return (
    <>
      <button onClick$={() => data.add()}>+</button>
      <p>{data.count}</p>
    </>  
  );
}
```

![sigal.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83291b82343845fa928fe3973369022e~tplv-k3u1fbpfcp-watermark.image?)

### 🚀 `useComputed$`

`reactive`有了，`computed`是不是也应该有啊，来了，它就是`useComputed$`

```js
  const capitalizedName = useComputed$(() => {
    return count.value + 'mmdctjj';
  });

  useVisibleTask$(({ track }) => {
    track(() => console.log(capitalizedName.value))
  })
```

![computer.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e6f6f13b23b48089aaf69b0cd8bd6e4~tplv-k3u1fbpfcp-watermark.image?)

### 🚀 `useContext`

那依赖注入有没有啊？抱歉，没有，因为`Qwik`是基于`jsx`的框架，所以只有拿`useContext`来将就了

```js

type Store = {
  count: number
  add: QRL<(this: Store) => void>
}
// 🚗 创建全局的上下文
const context = createContextId<Store>('uuid')

const App = component$(() => {

  const data = useStore<Store>({
    count: 0, 
    add: $(function(this) 
      this.count++;
    })
  })
  // 🚗 provider数据
  useContextProvider(context, data);
  
  return (
    <>
      <button onClick$={() => data.add()}>+</button>
      <p>{data.count}</p>
    </>  
  );
}

const Child = component$(() => {
  // 🚗 消费上下文
  const data = useContext(context)
  
  return (
    <>
      <Child />
    </>  
  );
}
```

好吧，接下来我们说些不一样的

### 🚀 `useTask$` or `useVisibleTask$`

上面的例子中，我们所有的监听事件都是通过`useVisibleTask$`实现的。虽然它看起来和`useEffect`类似，但是却有着很大的区别。

这得从`qwik`的架构说起，首先`Qwik`是个服务端渲染的框架，相当于`Next.js`（基于`React`服务端渲染框架）、 `Nuxt.js`(基于`Vue`地服务端渲染框架)，换句话说，它天生支持服务端渲染的前端框架。所以一个组件的生命周期是从服务器开始的。

```js
        useTask$ -------> RENDER ---> useVisibleTask$
|| --- SERVER or BROWSER --- | ----- BROWSER ----- || 
                        pause|resume
```

它们都是用来注册任务的钩子函数，这个任务在服务端仅仅执行一次，在客户端可能多次渲染。

下面是具体的区别

#### 👉 `useTask$`

`useTask$`首先在服务端执行一次，如果客户端使用`track`订阅依赖了，那么当客户端渲染之后触发更新时，任务会在客户端再次执行。如果没有`track`，那么仅仅在客户端执行一次。

```js
const App = component$(() => {
  
  const count = useSignal(0);
  
  useTask$(({ track }) => {
    track(() => console.log(count.value))
  })

  return (
    <>
      <button onClick$={() => count.value++}>+</button>
      <div>{count.value}</div>
    </>
  );
});
```

![task.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26c97ff1877f499aa2b1e842b5bb340f~tplv-k3u1fbpfcp-watermark.image?)

页面刷新后服务端也执行了一次任务

#### 👉 `useVisibleTask$`

`useVisibleTask$`：仅仅在浏览器执行，渲染之后立马执行，当订阅的参数发生改变时，任务会被再次执行。

```js
const App = component$(() => {
  
  const count = useSignal(0);
  
  useVisibleTask$(({ track }) => {
    track(() => console.log(count.value))
  })

  return (
    <>
      <button onClick$={() => count.value++}>+</button>
      <div>{count.value}</div>
    </>
  );
});
```

![taskvis.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2a30da9a56e4a77bd5d3b9d24d80d58~tplv-k3u1fbpfcp-watermark.image?)

它们还有一个特别重要的参数`cleanup`，每次新的任务被触发时，都会执行上次任务的`cleanup`。另外组件被移除时也会被执行。

```js
  useVisibleTask$(({ track, cleanup  }) => {
    // console.log('I am excuted!')
    track(() => console.log(count.value))
    cleanup(() => console.log('last'))
  })
```

![cleanup.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3f6cb2524fa4a13bc23770c943e768f~tplv-k3u1fbpfcp-watermark.image?)

我们可以看到，每次任务触发都是先打印`last`，然后才是最新的`count.value`

另外，还有一个重要的配置项：`{ strategy: 'document-ready' }`，此时，会在页面加载完毕立马执行。

```js
  useVisibleTask$(() => {
    // 渲染完毕之后执行
    console.log(2222)
  })
  useVisibleTask$(() => {
    // document-ready立马执行
    console.log(1111)
  }, { strategy: 'document-ready' })
```

此时`console`的打印结果是先`1111`，然后是`2222`。

#### 👉 帮它模拟完整的生命周期

综上，我们可以模拟出一个完整的生命周期

```js
  useVisibleTask$(() => {
    console.log('before mounted!')
  }, { strategy: 'document-ready' })
  
  useVisibleTask$(({ cleanup }) => {
    console.log('mounted!')
    cleanup(() => console.log('unmount'))
  })
  
  useVisibleTask$(({ track, cleanup }) => {
    track(() => console.log('updated!', count.value))
    cleanup(() => console.log('before update'))
  })
```
唯一的瑕疵是`before update`会在组件销毁时和`unmount`一起执行一次。

![mounted.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7fdf3405ca54d76b0dbfd868234f771~tplv-k3u1fbpfcp-watermark.image?)

## 💎 总结

`qwik`上线一年不到已经`17.9k`地`star`了，足见它地优秀了！

今天的分享就这些，如果大家喜欢我一定会再出一篇介绍其它几个有意思的`Api`的和编译相关的文章。

如果文中有纰漏的地方欢迎指正

我的文章首发在公众号：萌萌哒草头将军，如果你想联系我，可以加我`SunBoy_mmdctjj`，我们一起成长