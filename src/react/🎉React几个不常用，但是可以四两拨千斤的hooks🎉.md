---
title: 🎉React几个不常用，但是可以四两拨千斤的hooks🎉
isTimeLine: true
date: 2023-05-09
category:
  - 前端
tag:
  - JavaScript
  - React
---

大家好，我是「萌萌哒草头将军」，也可以关注我的公众号「萌萌哒草头将军」

今天介绍几个`React`几个不常用，但是可以四两拨千斤的`hooks`
### `useSyncExternalStore`
监听外部数据变化
> 外部数据源需要提供订阅函数，并且这个函数需要返回取消订阅的方法
```jsx
import React from 'react';
import { store } from  './store.js'

export const App () {
  const data = useSyncExternalStore(store.subscribe, store.getData)
  
  return <>
    <button onClick={store.add}>add+</button>
    {data}
  </>
}
```
```js
// store.js
let conut = 0;
let listeners = [];

export const store = {
    add () {
        count ++;
    },
    subscribe(listener) {
        listeners = [...listeners, listener];
        return () => {
          listeners = listeners.filter(l => l !== listener);
        };
    },
    geetDate () {
        return count;
    }
}
```
### `useId`
生成全局唯一ID，快放弃`Math.random()`吧
```jsx
import { useId } from 'react';  

function App() {  

  const uuid = useId();  

  return (  
    <>{uuid}</>  
  );  
}
```
### `useLayoutEffect`
布局更新前触发
```jsx
import { useState, useRef, useLayoutEffect } from 'react';  

function Tooltip() {
  const ref = useRef(null);  
  const [tooltipHeight, setTooltipHeight] = useState(0);  

  useLayoutEffect(() => {  
    const { height } = ref.current.getBoundingClientRect();  
    setTooltipHeight(height);  
  }, []);
  
  return <></>
}
```
### `useDeferredValue`
UI延时更新，不用手写防抖函数了
```jsx
import SearchResults from './SearchResults.js';

export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```
### `useReducer`
自定义一个轻量级的`redux`
```jsx
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```
### `useRef`
定义一个值的引用
```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
### `useImperativeHandle`
自定义由`ref`暴露出来的句柄。
```jsx
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} {..props} />;
}
```
