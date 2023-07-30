---
title: 学不完的框架，🐔啄不完的米，SolidJS，你到底爱谁？😘
isTimeLine: true
date: 2023-05-25
category:
  - 前端
tag:
  - JavaScript
  - SolidJS
---

# 10分钟快速了解SolidJS原理

最近刚刚整明白点`Svelte`感觉整个世界都清净了，但是昨天，有人给我介绍了`SolidJS`，

> 上篇：[Svelte原理和进阶看这篇就够了](https://juejin.cn/post/7235628080219078693)

当时我心想：这又是啥玩意啊！

<p align="center"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aeb77b706f724340bd3041d6ce677856~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="30%"></p>

经过一番深入交流才知道，居然又是个前端框架。

<p align="center"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfc2751d114d4b85af808c092bbb3fe3~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="30%"></p>

“还有完没完了，一个接一个的框架啥时候是个头啊！”

<p align="center"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7509dc3757a348f5a91e6e58b6e1658d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="30%"></p>

不过本着给大家踩坑避雷的精神，我又秉烛夜读，通宵达旦研究了一番。

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41bca1f75b304e2fb30ace23894f8008~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="30%"></p>

## 🚀模仿？超越？

### 💎写法

先上代码

```js
import { render } from "solid-js/web";
import { createSignal, createMemo, createEffect } from "solid-js";

function Counter() {
  // 定义变量
  const [count, setCount] = createSignal(0);

  // 缓存中间值
  const fib = createMemo(() => {
    console.log('Calculating Fibonacci');
    return (count() * 2 + 10);
  });
  
  // 执行副作用
  createEffect(() => { console.log("The count is now", count()); });

  return (
      <div onClick={() => setCount(() => count() + 1)}>
          Count: {count()}
          fib Count: {fib()}
      </div>
  );
}

render(() => <Counter />, document.getElementById('app'));
```

是不是很熟悉，这不就是`React`吗？

难道这是`React`被抄袭的最惨的一次吗？

是的，官网明确告诉你，它会让你感觉既熟悉又现代。

和`React`类似的`hook`写法，一样的`Jsx`模板语法，熟悉吧？

不过，当你揭开它神秘的面纱，你会发现里面居然是你曾经的神——`Vue`！

<p align="center"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8857c93162bc48e2b46bd93212389c87~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%"></p>

### 💎响应式原理

因为它的响应式官方称为`primitive`，是基于`Proxy`的发布订阅模式的`API`，

`primitive`的响应式主要包括`Signal`、`Memo` 和 `Effect`，对应的接口如下

```js
 // 定义变量
  const [count, setCount] = createSignal(0);

  // 缓存中间值
  const fib = createMemo(() => (count() * 2 + 10));
  
  // 执行副作用
  createEffect(() => { console.log("The count is now", count()); });
```

来看看`createSignal`的大致逻辑

```js
function createSignal(value) {
  const subscribers = new Set();
  
  const read = () => {
    const listener = getCurrentListener();
    
    if (listener) subscribers.add(listener);
    
    return value;
  };
  
  const write = nextValue => {
    value = nextValue;
    for (const sub of subscribers) sub.run();
  };
  
  return [read, write];
}
```

在每次`read()`的地方收集`listener`，做为订阅者，每次`write()`的时候作为发布者，通知每个`listener`更新数据。

> SolidJS的发布订阅模式也是基于`Proxy`的。下篇文章会做详细的对比。

和`React`不同的是，`reead`是个方法，这也是前面模板使用`count()`，而不是`count`的原因。

`createMemo`和`createEffect`会自动收集依赖项，每次触发依赖项`listener`的更新时，都会重新执行。

到这，是不是觉得，这太简单了吧，这不就是`React`和`Vue`的结合体嘛！

欢欣之后，你又想和它谈心，可当你走近它的心，又发现了你最近心心念念的`Svelte`的影子！

### 💎模板编译原理

上述例子的编译结果如下: （编译结果可以在官网的演练场`Output`查看）

```js
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";

const _tmpl$ = /*#__PURE__*/_$template(`<div>Count: <!>fib Count: </div>`, 3);

import { render } from "solid-js/web";
import { createSignal, createMemo, createEffect } from "solid-js";

function Counter() {
  // 定义变量
  const [count, setCount] = createSignal(0); // 缓存中间值

  const fib = createMemo(() => {
    console.log('Calculating Fibonacci');
    return count() * 2 + 10;
  }); // 执行副作用

  createEffect(() => {
    console.log("The count is now", count());
  });
  return (() => {
    const _el$ = _tmpl$.cloneNode(true),
          _el$2 = _el$.firstChild,
          _el$4 = _el$2.nextSibling,
          _el$3 = _el$4.nextSibling;

    _el$.$$click = () => setCount(() => count() + 1);

    _$insert(_el$, count, _el$4);

    _$insert(_el$, fib, null);

    return _el$;
  })();
}

render(() => _$createComponent(Counter, {}), document.getElementById('app'));

_$delegateEvents(["click"]);
```

简单分析之后可以得出结论如下：

*   🚗首先，使用`_$template `创建纯静态的`jsx`模板，
*   🚗接着，通过`cloneNode`方法，以及`firstChild`等属性获取动态元素，
*   🚗紧接着，为每个元素绑定对应的方法
*   🚗再接着，将动态的片段使用`_$insert`方法插入模板中，**注意到`count`和`fib`都是未执行的函数**。
*   🚗接着使用`$createComponent`包裹组件。
*   🚗最后组装`render`方法，将组件包装成函数，和根节点一起作为`render`方法的参数。

这和`Svelte`的编译结果有两个十分类似的地方：

*   💎将每动态片段的更新范围，精确到了原子级别。
*   💎它们的返回值都没有`虚拟DOM`

```js
_$insert(_el$, count, _el$4);

_$insert(_el$, fib, null);
```

```js
// Svelte编译之后create_fragment返回的p方法，也就是update方法
p(ctx, [dirty]) {
  if (dirty & /*count*/ 1) set_data(t1, /*count*/ ctx[0]);
},
```

### 💎运行时原理

在运行时阶段，会执行`render`方法，`render`方法如下

```js
function render(code, element, init, options = {}) {
  let disposer;
  createRoot(dispose => {
    disposer = dispose;
    element === document
        ? code()
        : insert(
            element,
            code(),
            element.firstChild ? null : undefined,
            init
         );
  }, options.owner);
  return () => {
    disposer();
    element.textContent = "";
  };
}
```

代码都会将编译的`() => _$createComponent(Counter, {})`执行，并挂载到`document.getElementById('app')`

由于在编译阶段还没有建立变量的响应式机制，执行`render`方法后，才会通过发布订阅模式创建响应式变量，每次调用`write()`、或者触发事件时，导致变量更新，以及对应的`元素节点`使用`_$insert`更新`DOM`。

看着`SolidJS`朴素的运行时原理，

你才回过神来，发现你曾经邂逅过的一切，它早已拥有，

你爱慕着的，也为你准备完毕，

最后你不禁感叹，`SolidJS`才是你那个：

『众里寻他千百度，慕然回首，那人却在，灯火阑珊处』

的框架啊！

你刚想抓住它，它却早已隐入了那灯影里！！！

好了好了，不做梦了，今天的分享就这些了，

<p align="center"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/078ab3ddf1de44b18e1234d241b39820~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>

下篇文章会介绍下`SolidJS`别的用法以及响应式原理。

敬请期待！欢迎关注我

<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28473f1a602146e0831ceb84323ab899~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" /></p>
