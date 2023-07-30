---
isTimeLine: true
date: 2023-05-16
category:
  - 前端
tag:
  - JavaScript
  - React
---
# 《React设计原理》读书分享–前端框架概述

很早就阅读了电子版的[《React技术揭秘》](https://react.iamkasong.com/)，后来听说出了实体书，果断就下单了

所以今天分享下最近的阅读心得

## 基本原理
### 概述
前端框架主要的作用是将数据的变化映射为`UI`的变化：

<p align=center>UI=fn(state)</p>

`fn`就是计算`数据`的变动导致`UI`是如何变化的，不同的框架中，`fn`的描述方式不同

主流的描述方式分为：
1. `jsx`：使UI和逻辑更紧密，它是`ES`语法糖.（从逻辑出发，扩展逻辑，描述UI）
2. `模板语法`：使用`HTML`描述UI，它是`HTML`语法扩展。（从UI出发，扩展UI，描述逻辑）

`jsx`是动态的，即使代码没有边，每次更新，都会重新编译，

`模板语法`是静态的，可以用来分析，哪些节点是动态的，哪些节点是静态的。有很大的优化空间。


不管是`jsx`还是`模板语法`，它们都是组织逻辑和UI的关系
```js
// react
const [count, setCount] = useState(0)

<div onClick={() => setCount(conut++)}>{count}</div>
```
```js
// Vue
const count = ref(0)

<div @click={count.value++}>{count.value}</div>
```
```js
// Svelte
const let = 0

<div on:click={() => conut++}>{count}</div>
```
上面三块代码功能都是一样的：当`count`发生变化时，UI跟着变化

根据UI变化方式（更新细粒度）不同，将框架可以分为三类：
1. 应用级：数据变化时，重新渲染整个应用，`React`
2. 组件级：数据变化时，重新渲染数据有变化的组件`Vue`
3. 元素级：数据变化时，只渲染数据变化的`DOM`节点，`Svelte`

按下性能问题暂且不表，先想想，为啥会有这种差别呢？

这是因为不同的框架，架构不同导致的。

我们的代码并不是立即执行的，而是先进行编译（语法转换、将ts转为js、压缩、polyfill等），将我们的代码转为宿主环境可以识别的代码。
### React
`React`经过编译之后返回的是`createElement`函数，所以每次数据变化，`React`都会从应用根节点重新加载整个应用。因此`React`无需知道是哪个变量发生变化导致的更新。
```js
export const App = () => {
  const [count, setCount] = useState(0);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => setCount(conut++)
  }, count);
};
```

所以这种框被架称为`应用级框架`
### Vue3
`Vue3`经过编译之后返回的是组件的`render`函数
```js
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("h1", {
    onClick: _cache[0] || (_cache[0] = $event => (_ctx.count++))
  }, _toDisplayString(_ctx.count), 1 /* TEXT */))
}
```
`Vue3`会为每个组件建立`watchEffect`事件，这个大致如下：
```js
// patch是对比前后VNode变化的方法
watchEffect(() => patch(render(props), preVDOM), [conut])
```
在页面首次进入或者`watchEffect`的依赖项发生变化时，都会调用组件的`render`函数。

`render`函数的返回值是本次更新的`VNode`，Vue会根据本次更新的`VNode`与上次更新做比较（`patch`），找到最优的更新路径，并且进行更新。

所以这种框架被称为`组件级框架`
### Svelte
`Svelte`经过编译之后的返回值如下：（先别晕，可以跳过代码往下看）
```js
import {
    SvelteComponent,
    append,
    detach,
    element,
    init,
    insert,
    listen,
    noop,
    safe_not_equal,
    set_data,
    text
} from "svelte/internal";
function create_fragment(ctx) {
    let div;
    let t;
    let mounted;

    return {
        c() {
            div = element("div");
            t = text(/*count*/ ctx[0]);
        },
        m(target, anchor) {
            insert(target, div, anchor);
            append(div, t);

            if (!mounted) {
                dispose = listen(div, "click", /*click_handler*/ ctx[1]);
                mounted = true;
            }
        },
        p(ctx, [dirty]) {
            if (dirty & /*count*/ 1) set_data(t, /*count*/ ctx[0]);
        },
        d(detaching) {
            if (detaching) detach(div);
            mounted = false;
            dispose();
        }
    };
}

function instance($$self, $$props, $$invalidate) {
    let count = 0;
    const click_handler = () => $$invalidate(0, count++, count);
    return [count, click_handler];
}

class App extends SvelteComponent {
    constructor(options) {
        super();
        init(this, options, instance, create_fragment, safe_not_equal, {});
    }
}

export default App;
```
Svelte返回的值主要包括三块：
#### 1.`create_fragment`函数：
1. `c方法`：create元素`div`的操作。
2. `m方法`：mounted时执行将创建的`div`插入，并且监听`div`的`click`事件.
3. `d方法`：delete元素`div`的操作。
4. `p方法`：updata数据的操作。

#### 2.`instance`函数：
声明在模板使用的变量，以及变量变化时的回调函数，并且返回它们（其实就是`ctx`上下文）。
#### 3.继承`SvelteComponent`的组件，并且执行`init`方法
`init`方法的大致逻辑是：当数据变化，触发`mounted`阶段监听事件的回调函数，这个回调函数就是instance函数返回值里的`click_handler`，即`ctx[1]`

如果仅仅声明了但是没有在模板中使用，那么就会作为第四块，单独声明，但这里就不做赘述了。

从前面的代码可以看出：`Svelte`在编译阶段，就已经找到元素和变量之间的对应关系了。

所以这种框被架称为`元素级框架`

## React性能
你肯定会问，我就改了个`count`的值，像`React`这样大动干戈，重新渲染整个应用，是不是很低效啊。

其实，`React`在运行时阶段，做了一部分关键的优化。

不管是`Vue`还是`React`，在编译之后返回的都是`VNode`。
### 双缓存机制
一方面，`React`在拿到编译之后的`VNode`，首先会在内存中和上次更新的`VNode`进行对比，找到具体更新的`VNode`并且在内存中更新，上次没有更新时(`mount`)，在内存中全部更新。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84d27b3060a9409f8116a527c438b60c~tplv-k3u1fbpfcp-watermark.image?)

然后将`VNode`渲染在真实`Dom`里，使用`current`属性连接，同时保留内存中的`VNode`，使用`altername`属性使每个真实`Dom`对应，以方便下次更新时对比。

这个机制叫做`双缓存机制`

另一方面，`React`被重新设计为可以中断的更新`UI`，这么做的好处是可以避免因为高复杂度的更新因为耗时长使用户感知到页面的卡顿。
### `Firbe`架构
这种可中断的更新架构就是`Firbe`架构。

可以中断的更新原理是：如果浏览器计算和渲染的时间超过人眼可以感知卡顿的最短时间`16.67ms`，那就中断它，把时间让给下一个更新任务。等时间充裕的时候再重新更新。

> 显示器如果每秒刷新次数小于`60帧`（刷新率），就会被感知到卡顿，所以每帧最多时间是`1s/60`次，即`16.67ms`

与`Firbe`架构对应的是老版本的`Stack`架构，它因为组件渲染的时候`不可中断`的特点，被React团队抛弃了。因为组件层次过深，在不可中断的情况下，计算和渲染的时候超过`16.67ms`会造成页面卡顿。
### 其他的手段
`React`还将一些优化的任务交给了开发者，比如，前面说过，`jsx`是动态的，如果你的组件全是不会变化的，那么你可以使用`React.meno()`包裹你的组件，明确这是个静态的，依次来较少无用的更新。还有`useState`
、`useMemo`、`useCallback`等。
