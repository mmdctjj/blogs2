---
title: 优美的v-for列表：动画钩子实践
isTimeLine: true
star: true
date: 2023-03-15
category:
  - 前端
tag:
  - Vue
  - 用户体验
---

> 未经允许禁止转载

打个广告，可以关注我哦~

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07e3c8b6824c496db93ae959348ce978~tplv-k3u1fbpfcp-watermark.image?)

### 一、开始

最近忙完工作，重新撸了一遍 vue 官方文档，发现很少被我用到的 vue 动画神器，JavaScript 钩子函数

趁着周末我自己做了几个 demo 和大家分享下，先上图

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2bed0297ec14dd68d6a5653796df45c~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4910838a46cd40f7821a7f63ec7efd25~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cc5d2aac2e549868dd67fd73bcfdf9f~tplv-k3u1fbpfcp-zoom-1.image)

温馨提示，本文需要了解的知识点如下：

- [css 过度属性 transition](https://www.w3school.com.cn/cssref/pr_transition.asp/)
- [css 动画属性 animation](https://www.w3school.com.cn/cssref/pr_animation.asp/)
- [vue 动画介绍](https://cn.vuejs.org/v2/guide/transitions.html#%E5%8D%95%E5%85%83%E7%B4%A0-%E7%BB%84%E4%BB%B6%E7%9A%84%E8%BF%87%E6%B8%A1/)
- [vue 动画之列表](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E8%BF%87%E6%B8%A1/)

官方文档的介绍十分详细了，我就不做多余的赘述了，这里通过实践简单说下 vue 动画钩子函数思想以及我的使用心得

### 二、实践

以下动画实现仅是个人理解，并非标准，希望大佬们指点

#### 1.跟进列表

[源代码点击这里](https://github.com/mmdctjj/good_good_study/blob/master/vue%E5%8A%A8%E7%94%BB/%E8%B7%9F%E8%BF%9B%E5%88%97%E8%A1%A8.html)

跟进列表是从下出现，回到初始位置，我在初始阶段采用了 padding-top 为 100%，结束阶段为 0%实现这个动画（margin-top 也可以实现这个动画）
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5dda72174c4b4928ac14ae338116b742~tplv-k3u1fbpfcp-zoom-1.image)

```css
@keyframes one-in {
  from {
    padding-top: 100px;
    height: 0%;
  }
  to {
    padding-top: 0px;
    height: 100%;
  }
}
```

#### 2.段落列表

[源代码点击这里](https://github.com/mmdctjj/good_good_study/blob/master/vue%E5%8A%A8%E7%94%BB/%E6%AE%B5%E8%90%BD%E5%88%97%E8%A1%A8.html)

段落列表是从右出现，回到正常位置，我在初始阶段采用了 padding-left 为 100%，结束阶段为 0%实现这个动画（margin-left 也可以实现这个动画）
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/758cdd5cb2f64d70840b8c761499b274~tplv-k3u1fbpfcp-zoom-1.image)

```css
@keyframes one-in {
  from {
    padding-left: 100%;
  }
  to {
    padding-left: 0%;
  }
}
```

#### 3.交错列表

[源代码点击这里](https://github.com/mmdctjj/good_good_study/blob/master/vue%E5%8A%A8%E7%94%BB/%E4%BA%A4%E9%94%99%E5%88%97%E8%A1%A8.html)

交错列表稍微复杂点，不过我们可以分解为两个动画。
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dce65f3b1b2a47eaa563d6fb47845c4d~tplv-k3u1fbpfcp-zoom-1.image)
从左下出现，高度从零变到 100px（具体自己设定）

```css
@keyframes one-in {
  from {
    padding-right: 100%;
    padding-top: 100px;
    height: 0;
  }
  to {
    padding-right: 0%;
    padding-top: 0px;
    height: 100px;
  }
}
```

从右上出现，高度从零变到 100px（具体自己设定）

```css
@keyframes one-in {
  from {
    padding-left: 100%;
    height: 0;
  }
  to {
    padding-left: 0%;
    height: 100px;
  }
}
```

然后根据列表渲染的 index 为奇数或偶数选择不同的动画
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56c0660e62ec468fafaeaf1e7146eccb~tplv-k3u1fbpfcp-zoom-1.image)

```js
methods: {
    beforeEnter (el) {
        el.style.opacity = 0
    },
    enter (el, done) {
        let delay = el.dataset.index * 100
        let animation = el.dataset.index % 2 === 0
            ? 'one-in 0.4s infinite'
            : 'two-in 0.4s infinite'
        setTimeout(()=>{
            el.style.transition = 'opacity 0.4s '
            el.style.opacity = 1
            el.style.animation = animation
            el.style['animation-iteration-count'] = 1
            done()
        }, delay)
    }
}
```

#### 4.更多构想

实践到这，越来越觉得页面的动画不好看，不是我们的能力差，而是我们的想象力还不够

翻转列表[源代码点击这里](https://github.com/mmdctjj/good_good_study/blob/master/vue%E5%8A%A8%E7%94%BB/%E7%BF%BB%E8%BD%AC%E5%88%97%E8%A1%A8.html)
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e5ba81b11c443df98f0033317d41621~tplv-k3u1fbpfcp-zoom-1.image)
每个复杂的动画其实都是很多简单小动画的拼接，所以下次设计师拿来充满想象力的动画设计稿，先别急着掏菜刀，仔细分析下动画的组成部分，可能也没有那么难。

### 三、思想

#### 1.对思想的理解

如果说思想，简单的说就是 vue 在自己封装的 transition 组件上检测所有子节点的插入和移除，**依次**在这些属性作用的各个阶段抛出钩子函数接受我们前端 er 自定义的动画或者第三方库里的动画

这里的依次以插入为例指动画开始前、动画开始、动画结束，也就是对应的钩子函数 beforeEntry、entry、entryTo

所以，vue 动画的原理是将一个完整的动画在编码拆分在每个阶段，然后编译阶段重新拼接为一个完整的动画，这也就是官网这个图的含义
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e197392df8247c8b0b4a5b71c1c3a83~tplv-k3u1fbpfcp-zoom-1.image)

#### 2.实践心得

##### 2.1 尽量少用过度属性做复杂的动画

过度属性要求你将过度的几个状态放在不同的钩子函数中，复杂的动画代码太多，写起来不简洁，当然，如果非要这样写，建议使用添加或移除 class 类的方式，我一般很少用到这过度属性

#### 2.2 多用动画属性

动画属性的好处就是可以将自定义的动画重复使用，而你只需要指定动画名

#### 2.3 多使用 setTiemout 函数给不同 dom 依次设置动画延迟

想在动画上根据不同的 dom 设置不同的动画延迟是十分困难的，但是我们可以很方便的给 dom 设置动画开始时间。

参考文章：
[[译] 小 Tips 让你的交互动画从 “还不错” 变成 “超级棒”](https://juejin.im/post/6844903584887209997)
