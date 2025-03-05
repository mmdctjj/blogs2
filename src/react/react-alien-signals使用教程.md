---
title: React Signals 使用教程🚀
isTimeLine: true
date: 2025-03-05
category:
  - 前端
tag:
  - React
---

## 简介

React Signals 是一个轻量级的状态管理库，它提供了一种简单而强大的方式来管理 React 应用中的状态。它的 API 设计受到了 SolidJS 的启发，使用起来非常直观。

## 基础用法

### 1. 创建信号 (createSignal)

```typescript
import { createSignal } from "reactjs-signal";

// 创建一个初始值为 0 的信号
export const count = createSignal(0);
```

### 2. 在组件中使用信号

有三种主要方式可以在组件中使用信号：

#### 2.1 使用 useSignal（获取值和设置器）

```typescript
import { useSignal } from "reactjs-signal";
import { count } from "../signals/counter";

export const Counter = () => {
  const [value, setValue] = useSignal(count);

  return (
    <div>
      <p>Count: {value}</p>
      <button onClick={() => setValue((v) => v + 1)}>Increment</button>
    </div>
  );
};
```

#### 2.2 使用 useSignalValue（仅获取值）

```typescript
import { useSignalValue } from "reactjs-signal";
import { count } from "../signals/counter";

export const Display = () => {
  const value = useSignalValue(count);

  return <div>Current count: {value}</div>;
};
```

#### 2.3 使用 useSetSignal（仅获取设置器）

```typescript
import { useSetSignal } from "reactjs-signal";
import { count } from "../signals/counter";

export const Controls = () => {
  const setCount = useSetSignal(count);

  return (
    <div>
      <button onClick={() => setCount((v) => v + 1)}>+1</button>
      <button onClick={() => setCount((v) => v - 1)}>-1</button>
    </div>
  );
};
```

### 3. 计算信号 (createComputed)

计算信号允许你基于其他信号创建派生状态：

```typescript
import { createSignal, createComputed } from "reactjs-signal";

const count = createSignal(0);
const doubleCount = createComputed(() => count() * 2);
const isEven = createComputed(() => count() % 2 === 0);
```

### 4. 信号效果 (useSignalEffect)

使用 `useSignalEffect` 可以在信号值变化时执行副作用：

```typescript
import { useSignalEffect } from "reactjs-signal";
import { count } from "../signals/counter";

export const Logger = () => {
  useSignalEffect(() => {
    console.log("Count changed:", count());
  });

  return null;
};
```

### 5. 服务端渲染支持 (useHydrateSignal)

如果你需要在服务端渲染时初始化信号值：

```typescript
import { useHydrateSignal } from "reactjs-signal";
import { count } from "../signals/counter";

export const App = () => {
  // 在组件挂载时将 count 信号的值设置为 10
  useHydrateSignal(count, 10);

  return <div>...</div>;
};
```

### 一点点心得

- 使用 `useSignalValue` 当只需要读取值时
- 使用 `useSetSignal` 当只需要更新值时
- 适当使用 `createComputed` 来缓存计算结果

## 实践：todo 应用

```typescript
import { createSignal, createComputed } from "reactjs-signal";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const todos = createSignal<Todo[]>([]);
export const filter = createSignal<"all" | "active" | "completed">("all");

export const filteredTodos = createComputed(() => {
  const currentFilter = filter();
  const currentTodos = todos();

  switch (currentFilter) {
    case "active":
      return currentTodos.filter((todo) => !todo.completed);
    case "completed":
      return currentTodos.filter((todo) => todo.completed);
    default:
      return currentTodos;
  }
});
```

```typescript
import { useSignal, useSignalValue } from "reactjs-signal";
import { todos, filter, filteredTodos } from "../signals/todos";

export const TodoApp = () => {
  const [, setTodos] = useSignal(todos);
  const [currentFilter, setFilter] = useSignal(filter);
  const visibleTodos = useSignalValue(filteredTodos);

  const addTodo = (text: string) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);
  };

  return (
    <div>
      <input
        type="text"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            addTodo(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
    </div>
  );
};
```

这个教程涵盖了 React Alien Signals 的主要功能和使用方式。通过这些示例，你应该能够开始在你的 React 项目中使用信号来管理状态了。记住，信号的主要优势在于其简单性和响应式特性，这使得状态管理变得更加直观和高效。
