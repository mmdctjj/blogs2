---
title: 👉被玩坏的React hook组件通信👈
isTimeLine: true
date: 2023-05-10
category:
  - 前端
tag:
  - JavaScript
  - React
---

大家好，我是「萌萌哒草头将军」，感兴趣的小伙伴可以关注我公众号「萌萌哒草头将军」，近期有抽奖哦～

今天给大家表演个杂技，有赞的捧个赞场，没赞的捧个人场，可怜可怜我吧！！！

### 👉`useImperativeHandle`杂技
 
语法：`useImperativeHandle(ref, createHandle, dependencies?)`

用法： 

🎉 `向父组件暴露一个自定义的 ref 句柄`
    
🎉 `暴露你自己的命令式方法`

我们采用自定义命令方法的方式进行表演，如下

🎁 父组件改变子组件的值
```
import { useRef } from 'react';
import Child from './Child.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.buy('apple');
  }

  return (
    <form>
      <Child label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}

```
```
import { forwardRef, useImperativeHandle, useState } from 'react';

const Child = forwardRef(function MyInput(props, ref) {

  const [goods, setGoods] = useState(null)
  
  useImperativeHandle(ref, () => {
    return {
      buy (goods) {
        setGoods(goods)
      },
    };
  }, []);

  return <div>{goods}</div>;
});

export default Child;
```
### 👉使用`设计模式`杂技

[在线Demo看这里](https://codesandbox.io/s/vibrant-rain-eqeh6g?file=/index.tsx:168-674)

这里需要借助之前提到的[中介者模式](https://juejin.cn/post/7222575963565375544#heading-3)
```js
import { useEffect, useState } from "react";
import { mediator } from "./index";
// 事件订阅器
export const useGetEvent = (topic) => {
    const sub = mediator.install({});
    const [data, setData] = useState(0);
    sub.subscribe(topic, setData);
    return data;
};
// 事件发布器
export const useSetEvent = (topic, value) => {
    const sub = mediator.install({});
    useEffect(() => sub.publish(topic, value), [value]);
    return [];
};
```
```jsx
// app
import React, { useState } from "react";
import { Child } from "./child";
import { useSetEvent } from "./useEvent";

const App = () => {
    const [count, setCount] = useState(0);
    useSetEvent("count", count);
    return (
        <div>
            {count}
            <br />
            <button onClick={() => setCount((curr) => curr + 1)}>add +</button>
            <Child />
        </div>
    );
};
```
```jsx
// child
import { useEffect } from "react";
import { useGetEvent } from "./useEvent";

export const Child = () => {
    const sub = useGetEvent("count");
    useEffect(() => console.log(sub), [sub]);
    return <div></div>;
};
```
事实上不止子组件，全局组件可以实现

好了，今天就表演到这了，感谢大家的捧场

记得关注我公众号：「萌萌哒草头将军」
