---
title: 2025年了，令人唏嘘的Angular，现在怎么样了🚀🚀🚀
isTimeLine: true
date: 2025-02-07
category:
  - 前端
tag:
  - Angular
---

### 迅速崛起和快速退出

时间回到 2014 年，此时的 `Angular 1.x` 习得了多种武林秘籍，左手降龙十八掌、右手六脉神剑，哦不，左手`双向数据绑定`、右手`依赖注入`、上能`模块化开发`、下有`模板引擎` 和 `前端路由`, 背后还有`Google`这个风头无两的带头大哥做技术背书，可以说集万千功能和宠爱于一身，妥妥的主角光环。

而此时的江湖，`B端`开发正尝到了 `SPA` 的甜头，积极的从传统的 `MVC` 开发模式转变为更为方便快捷的单页面应用开发模式，

> 文章同步在公众号：萌萌哒草头将军，欢迎关注！

一拍即合，强大的一站式单页面开发框架`Angular`自然而然，就成了公认的武林盟主，江湖一哥。

![angular下载量](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d8d7a15e0a3f4db789f37707c4215151~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1739535838&x-orig-sign=4jR3Ruzv%2BNrQuZTO%2BWjq3AwsHxA%3D)

但是好景不长，2016 年 9 月 14 日 `Angular 2.x` 的发布，彻底断送了武林盟主的宝座，

> `Vue`：大哥，你可是真给机会呀！

![ts下载量](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7d1f8854c13f4f24ab37dcf4339f1dc9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1739535838&x-orig-sign=lBi%2B69anPAo43FetuVV%2BSUVFsjs%3D)

`2.0` 使用`ts`彻底重写（最早支持`ts`的框架）、放弃了脏检查更新机制，引入了响应式系统、使用现代浏览器标准、加入装饰器语法，和 `1.0` 完全不兼容。可以从上图看到，此时大家基本上还不太接受`ts`!

新手面对陡然升高的学习曲线叫苦连连，已经入坑的开发者因为巨大的迁移工作而怨声载道。

此时，默默耕耘了两年的小弟，`Vue`已经拥有完备的本地化文档和丰富的可选生态，而且作为新手你只要会使用`html`、`css`、`javascript`，就可以上手写项目了。

所以，此时的 `Vue` 振臂一呼：“王侯将相宁有种乎！”，立马新皇加冕！

### 积极改变，三拜义父的数据驱动

> 忆往昔峥嵘岁月稠，恰同学少年，风华正茂；书生意气，挥斥方遒。

一转眼，angular 已经发布第`19`个大版本了（平均一年两个版本）。

失去武林盟主的`Angular`，飘零半生，未逢明主，公若不弃，`Angular`愿拜为义父，

从 `脏检查机制` 到 `响应式系统`，再到`Signals系统`， `Angular` 历经沧桑的数据驱动方式可以说是前端发展的缩影。

#### `脏检查机制`

`脏检查机制` 是通过拦截异步操作，`http` `setTimeout` 用户交互事件等，触发变更检测系统，从根组件开始检查组件中数据是否有更新，有更新时，对应的 `$scope` 变量会被标记为 `脏`，然后同步的更新`dom`的内容，重新开始变更检查，直到稳定后标记为干净，即通过稳定性检查！

```html
<!DOCTYPE html>
<html lang="en" ng-app="myApp">
  <head>
    <meta charset="UTF-8" />
    <title>AngularJS Counter</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  </head>
  <body ng-controller="CounterController as ctrl">
    <h1>Count: {{ ctrl.count }}</h1>
    <h2>Double Count: {{ ctrl.doubleCount() }}</h2>
    <button ng-click="ctrl.increment()">+1</button>

    <script>
      angular.module("myApp", []).controller("CounterController", function () {
        var vm = this;
        vm.count = 0;

        vm.increment = function () {
          vm.count++;
          console.log("Latest count:", vm.count);
        };

        vm.doubleCount = function () {
          return vm.count * 2;
        };
      });
    </script>
  </body>
</html>
```

但是这种检查机制存在缺陷，例如，当数据量十分庞大时，就会触发非常多次的`脏检查机制`。

#### `响应式系统`

`响应式系统` 没有出现之前，`脏检查机制` 是唯一的选择，但是`响应式系统`凭借快速轻便的特点，立马在江湖上引起了不小的轰动，`Angular`也放弃了笨重的脏检查机制采用了`响应式系统`!

```js
// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <h1>Count: {{ count }}</h1>
    <h2>Double Count: {{ doubleCount() }}</h2>
    <button (click)="increment()">+1</button>
  `,
})
export class AppComponent {
  count: number = 0;

  increment() {
    this.count++;
    console.log("Latest count:", this.count);
  }

  doubleCount() {
    return this.count * 2;
  }
}
```

和我们熟知的`Vue`的响应式不同，`Angular`的响应式采用双向数据流的设计，这也使得它在面对复杂项目时，性能和维护上不如`Vue`快捷方便。

所以，为了更好的驾驭`双向数据流`的响应式系统，`Angular`也是自创了很多绝学，例如：局部变更检测。

该绝学主要招式：`组件级变更检测策略`、引入`zonejs`、`OnPush` 策略等。

##### 1. 组件级变更检测策略

每个组件都有自己的更新策略，只有组件的属性和文本发生变化时，才会触发变更检测！

##### 2. 引入`zonejs`

引入`zonejs`拦截`http` `setTimeout` 用户交互事件等异步操作

##### 3. `OnPush` 策略

默认情况下，整个组件树在变更时更新。

![默认策略](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3faf5acd50384ba1b8e7872d773bd2a7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1739535838&x-orig-sign=KNaUtv7bLvkC%2Bcmg1159JvLECRE%3D)

但是开发者可以选择 `OnPush` 策略，使得组件仅在输入属性发生变化、事件触发或手动调用时才进行变更检测。这进一步大大减少了变更检测的频率，适用于数据变化不频繁的场景。

![OnPush策略](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/86c3668e2f75477984bd660adffee790~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1739535838&x-orig-sign=ZoC2pB6KhA2VDxl3AfcrizzP8tM%3D)

#### `Signals系统`

很快啊，当`SolidJS`凭借优异的信号系统在江湖上闯出了响亮的名声，这时，大家才意识到，原来还有更优秀的开发方式！`signal`系统的开发方式，也被公认为新一代的武林绝技！

于是，`Angular 16`它来了，它带着`signal`、`memo`、`effect`三件套走来了！

当使用`signal`时，更新仅仅发生在当前组件。

![signal系统](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/063321160a464f6c99fa381728c9ea54~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1739535838&x-orig-sign=pxZbszOwPX0M6sn%2BROv7Mo%2B%2BxLI%3D)

```js
// app.component.ts
import { Component, signal, effect, memo } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <h1>Count: {{ count() }}</h1>
    <h2>Double Count: {{ doubleCount() }}</h2>
    <button (click)="increment()">+1</button>
  `,
  styles: [],
})
export class AppComponent {
  // 使用 signal 来管理状态
  count = signal(0);

  // 使用 memo 来计算 doubleCount
  doubleCount = memo(() => this.count() * 2);

  constructor() {
    // 使用 effect 来监听 count 的变化
    effect(() => {
      console.log("Latest count:", this.count());
    });
  }

  increment() {
    // 更新 signal 的值
    this.count.set(this.count() + 1);
  }
}
```

### 总结

`Angular` 虽然在国内市场一蹶不振，但是在国际市场一直默默耕耘 `10` 年。它作为一站式解决方案的框架，虽然牺牲了灵活性，但是也为开发者提供了沉浸式开发的选择！

且它不断创新、积极拥抱新技术的精神令人十分钦佩！

今天的内容就这些了，如果你觉得还不错，可以关注我。

如果文章中存在问题，欢迎指正！
