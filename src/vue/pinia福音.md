---
title: 🍍Pinia党福音，🍍Pinia伴侣：🍍pinia-colada
isTimeLine: true
star: true
date: 2025-03-24
category:
  - 前端
tag:
  - Vue
---

### 前言

`pinia-colada` 是一个基于 `Pinia` 的状态管理库的插件。官方的功能介绍如下：

- ⚡️ **自动缓存**：智能的客户端缓存，支持请求去重
- 🗄️ **异步状态管理**：轻松处理任何异步状态
- 🔌 **插件系统**：强大的插件系统
- ✨ **乐观更新**：轻松实现乐观更新
- 💡 **合理的默认配置**：提供合理的默认值，同时支持完全自定义
- � **开箱即用的插件**：一组可组合的函数，用于处理数据获取
- 📚 **TypeScript 支持**：完全支持 TypeScript
- 💨 **小体积**：基础大小约 2kb，完全支持 Tree Shaking
- 📦 **零依赖**：除了 Pinia 外，没有任何其他依赖
- ⚙️ **SSR 支持**：开箱即用的服务端渲染支持

`pinia-colada` 的核心是： `useQuery` 和 `useMutation`。此外，它还提供了 `defineQuery` 和 `defineMutation`，用于在 Pinia Store 中定义查询和修改操作。

> 和 `vue-use`等库提供的`useAxios`类库不同，`pinia-colada`是借助 `pinia` 缓存请求，自带缓存。

官方库:[https://github.com/posva/pinia-colada](https://github.com/posva/pinia-colada)
官方文档：[https://pinia-colada.esm.dev/](https://pinia-colada.esm.dev/)

#### 往期精彩推荐

- [服务器防吃灰指南二](https://juejin.cn/post/7480379190984146982)
- [React 中使用 Vue3.6 Vapor 同款 Signal 是一种什么体验？🚀🚀🚀](https://juejin.cn/post/7478200404259536930)
- [2025 年了，令人唏嘘的 Angular，现在怎么样了 🚀🚀🚀](https://juejin.cn/post/7468526097011097654)
- 文章同步在公众号：萌萌哒草头将军，欢迎关注！

### **`useQuery`**

#### **静态查询**

`useQuery` 用于管理异步数据获取，支持缓存、加载状态和错误处理。以下是 `useQuery` 的基本数据格式：

```javascript
import { useQuery } from "@pinia/colada";

const {
  // 主要查询属性
  state, // 包含 data、error、status 等状态
  asyncStatus, // 异步状态（loading、error、success 等）
  refresh, // 手动刷新数据
  refetch, // 重新获取数据（忽略缓存）
  // 便捷别名
  error, // 错误信息
  data, // 请求成功后的数据
  status, // 当前状态（idle、loading、success、error）
  isLoading, // 是否正在加载
  isPending, // 是否处于等待状态
  isPlaceholderData, // 是否为占位数据
} = useQuery({
  key: ["todos"], // 查询的唯一标识
  query: () => fetch("/api/todos").then((res) => res.json()), // 查询函数
});
```

#### **动态查询**

`key` 不仅可以是静态数组，还可以是函数。当 `key` 为函数时，可以根据动态参数生成唯一的查询标识。

```javascript
const todoId = ref(1);

const { data, isLoading } = useQuery({
  key: () => ["todo", todoId.value], // 动态生成 key
  query: () => fetch(`/api/todos/${todoId.value}`).then((res) => res.json()),
});

// 当 todoId 变化时，useQuery 会自动重新获取数据
todoId.value = 2;
```

> **动态 `key` 的作用**:
>
> - 当 `key` 变化时，`useQuery` 会自动重新执行查询函数。
> - 适合需要根据参数动态获取数据的场景（如分页、筛选、详情页等）。

如果在分页的场景中使用时，可以使用 `placeholderData` 防止清空数据！

```js
const { state } = useQuery({
  key: () => ["contacts", Number(route.query.page) || 1],
  query: () =>
    fetch(`/api/contacts?page=${Number(route.query.page) || 1}`).then((res) =>
      res.json()
    ),
  placeholderData: (previousData) => previousData,
});
```

### **`defineQuery`**

`defineQuery` 用于在 Pinia Store 中定义查询操作。它返回一个可以在 Store 中使用的查询函数。

#### **基本用法**

```javascript
import { defineStore } from "pinia";
import { defineQuery } from "@pinia/colada";

export const useTodoStore = defineStore("todo", () => {
  const fetchTodos = defineQuery({
    key: ["todos"],
    query: () => fetch("/api/todos").then((res) => res.json()),
  });

  return {
    fetchTodos,
  };
});
```

#### **在组件中使用**

```javascript
import { useTodoStore } from "@/stores/todoStore";

const todoStore = useTodoStore();
const { data, isLoading } = todoStore.fetchTodos();
```

#### **动态查询**

```javascript
const fetchTodoById = defineQuery({
  key: (id) => ["todo", id], // 动态生成 key
  query: (id) => fetch(`/api/todos/${id}`).then((res) => res.json()),
});

// 在组件中使用
const { data, isLoading } = fetchTodoById(todoId.value);
```

### **`useMutation`**

#### **基本用法**

`useMutation` 用于请求副作用，管理数据修改操作（如 `POST、PUT、DELETE` 请求）。以下是 `useMutation` 的基本用法：

```javascript
import { useMutation } from "@pinia/colada";

const {
  mutate, // 触发修改操作的函数
  state, // 包含 data、error、status 等状态
  asyncStatus, // 异步状态（loading、error、success 等）
  reset, // 重置状态
  // 便捷别名
  error, // 错误信息
  data, // 请求成功后的数据
  status, // 当前状态（idle、loading、success、error）
  isLoading, // 是否正在加载
  isPending, // 是否处于等待状态
} = useMutation({
  mutation: (newTodo) =>
    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
    }).then((res) => res.json()),
});

// 触发修改操作
mutate({ title: "New Todo", completed: false });
```

### **`defineMutation`**

`defineMutation` 用于在 Pinia Store 中定义修改操作。它返回一个可以在 Store 中使用的修改函数。

#### **基本用法**

```javascript
import { defineStore } from "pinia";
import { defineMutation } from "@pinia/colada";

export const useTodoStore = defineStore("todo", () => {
  const addTodo = defineMutation({
    mutation: (newTodo) =>
      fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(newTodo),
      }).then((res) => res.json()),
  });

  return {
    addTodo,
  };
});
```

#### **在组件中使用**

```javascript
import { useTodoStore } from "@/stores/todoStore";

const todoStore = useTodoStore();
const { mutate, isLoading } = todoStore.addTodo;

// 触发修改操作
mutate({ title: "New Todo", completed: false });
```

### **总结**

`pinia-colada` 通过 `useQuery`、`defineQuery`、`useMutation` 和 `defineMutation` 提供了一套强大的工具，简化了 `Vue`应用中的异步状态管理和数据加载逻辑。无论是静态查询还是动态查询，都能轻松应对复杂场景。

#### 往期精彩推荐

- [服务器防吃灰指南二](https://juejin.cn/post/7480379190984146982)
- [React 中使用 Vue3.6 Vapor 同款 Signal 是一种什么体验？🚀🚀🚀](https://juejin.cn/post/7478200404259536930)
- [2025 年了，令人唏嘘的 Angular，现在怎么样了 🚀🚀🚀](https://juejin.cn/post/7468526097011097654)
- 文章同步在公众号：萌萌哒草头将军，欢迎关注！
