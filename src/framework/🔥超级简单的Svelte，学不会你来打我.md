---
title: 🔥超级简单的Svelte，学不会你来打我
isTimeLine: true
date: 2023-04-28
category:
  - 前端
tag:
  - JavaScript
  - Svelte
---
`Svelte`作为后起之秀，近些年的热度已经盖过`Angular`了（上香！）


- `声明式API`：Svelte的API是基于声明式编程风格的，这使得代码更易于理解和维护。
- `组件化`：Svelte支持组件化开发，使得代码可以更容易地重用和管理。
- `响应式`：Svelte具有内置的响应式功能，使得数据的变化可以自动更新视图。
- `轻量级`：由于Svelte不需要运行时库，因此生成的应用程序文件大小更小，加载速度更快。

`Svelte`框架的使用在近年来逐渐流行起来，被越来越多的开发者和公司所采用，如大型企业Netflix、IBM等。
### 一、模版语法
#### 1.模版命名
Svelte的语法是基于`HTML`、`CSS`和`JavaScript`的，文件后缀名为`.svelte`
```html
<!-- example.svelte -->
<script>
  let count = 0;
</script>

<button>
  Clicked {count}
</button>

<style>
</style>
```
#### 2.插值表达式
使用双花括号 `{}` 来进行插值表达式，将表达式的值插入到模板中。例如：

```html
<h1>Hello, {name}!</h1>
```

#### 3.条件语句
使用 `if` 和 `else` 关键字来实现条件语句。例如：
```html
{#if loggedIn}
  <h1>Welcome back, {user}!</h1>
{:else}
  <button on:click={login}>Log in</button>
{/if}
```

#### 4.循环语句
使用 `each` 关键字来实现循环语句。例如：

```html
{#each items as item}
  <li>{item}</li>
{/each}
```


#### 5.组件引用
使用组件名来引用一个组件，然后像 HTML 标签一样使用它。例如：

```html
<script>
import MyComponent from '/path/example.svelte'
</script>
<MyComponent />
```
#### 6.事件处理
使用 `on:` 前缀来绑定事件处理函数。例如：
```
<button on:click={handleClick}>Click me!</button>
```

#### 7.双向绑定
使用 `bind:` 前缀来实现双向绑定。例如：
```
<input type="text" bind:value={name} />
```
#### 8.插槽语法
##### 默认插槽
```html
<!-- MyComponent.svelte -->
<div>
  <h2>{title}</h2>
  <slot></slot>
</div>

<!-- App.svelte -->
<MyComponent title="Hello">
  <p>World!</p>
</MyComponent>
``` 
###### 具名插槽
```html
<!-- MyComponent.svelte -->
<div>
  <h2>{title}</h2>
  <slot name="content"></slot>
</div>

<!-- App.svelte -->
<MyComponent title="Hello">
  <p slot="content">World!</p>
</MyComponent>
```
看完模版语法，可以说和`vue`时一脉相承
### 二、声明变量
不用任何修饰，直接定义就可以被捕获，对于开发者来说，依赖收集是无感的
```html
<script>
  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<button on:click={handleClick}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```
### 三、监听变量的变化
#### 1.`$`方式
```html
<script>
  let name = 'Alice';
  let age = 30;

  $: {
    console.log(`name 变为 ${name}`);
    console.log(`age 变为 ${age}`);
  }
</script>

<h1>{name}</h1>
<p>{age}</p>
```
##### 2.`watch()`接口
```html
<script>
  import { watch } from 'svelte';

  let name = 'Alice';
  let age = 30;

  watch(
    [$name, $age],
    (currentValues, previousValues) => {
      console.log(`name 从 ${previousValues[0]} 变为 ${currentValues[0]}`);
      console.log(`age 从 ${previousValues[1]} 变为 ${currentValues[1]}`);
    }
  );
</script>

<h1>{name}</h1>
<p>{age}</p>
```

### 三、组件化
```html
<!-- Parent.svelte -->
<script>
  import Child from './Child.svelte';
</script>

<button>父组件内容</button>

<Child />

<!-- Child.svelte -->
<script>
</script>

<p>子组件内容</p>
```
#### 1.组件之间通信
##### `props`
```html
<!-- Parent.svelte -->
<script>
  let name = 'Svelte';
</script>

<Child name={name} />

<!-- Child.svelte -->
<script>
  export let name;
</script>

<h1>Hello {name}!</h1>
```
##### `context`
```html
<!-- App.svelte -->
<script>
  import { createContext } from 'svelte';
  export const theme = createContext('light');
</script>

<svelte:options context="theme" />

<main>
  <h1>App</h1>
  <!-- ... -->
</main>

<!-- Header.svelte -->
<script>
  import { getContext } from 'svelte';
  import { theme } from './App.svelte';
  const currentTheme = getContext(theme);
</script>

<header class={currentTheme}>
  <h2>Header</h2>
  <!-- ... -->
</header>
```
##### `store`
```html
<!-- Counter.svelte -->
<script>
  import { writable } from 'svelte/store';
  export const count = writable(0);
</script>

<h1>Count: {$count}</h1>
<button on:click={() => $count += 1}>Increment</button>

<!-- DisplayCount.svelte -->
<script>
  import { count } from './Counter.svelte';
</script>

<h1>Count: {$count}</h1>
```
##### `EventBus`
```html
<!-- Sender.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('my-event', { message: 'Hello, world!' });
  }
</script>

<button on:click={handleClick}>Click me!</button>

<!-- Receiver.svelte -->
<script>
  import { onMount } from 'svelte';

  function handleEvent(event) {
    console.log(event.detail.message);
  }

  onMount(() => {
    window.addEventListener('my-event', handleEvent);
    return () => {
      window.removeEventListener('my-event', handleEvent);
    };
  });
</script>
```
#### 2.生命周期钩子
1.  `onMount`: 在组件挂载到 DOM 中后执行，类似于 Vue 中的 `mounted` 钩子。
1.  `beforeUpdate`: 在组件的数据更新前执行，类似于 Vue 中的 `beforeUpdate` 钩子。
1.  `afterUpdate`: 在组件的数据更新后执行，类似于 Vue 中的 `updated` 钩子。
1.  `onDestroy`: 在组件销毁后执行，类似于 Vue 中的 `destroyed` 钩子。
```html
<!-- App -->
<script>
    import Father from "./Father.svelte"
    let show = true;
</script>

<button on:click={() => show = !show}>
    show
</button>
{#if show}
    <Father />
{/if}

<!-- Father.svelte -->
<script>
    import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
    import Child from "./Children.svelte"
    onMount(() => console.log('father onMoute'))
    onDestroy(() => console.log('father onDestroy'))
    beforeUpdate(() => console.log('father beforeUpdate'))
    afterUpdate(() => console.log('father afterUpdate'))
</script>

<h1>Hello!</h1>
<Child />

<!-- Children.svelte -->
<script>
    import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
    onMount(() => console.log('child onMoute'))
    onDestroy(() => console.log('child onDestroy'))
    beforeUpdate(() => console.log('child beforeUpdate'))
    afterUpdate(() => console.log('child afterUpdate'))
</script>

<h1>World!</h1>
```
执行顺序如下
```html
father beforeUpdate
child beforeUpdate
child onMoute
child afterUpdate
father onMoute
father afterUpdate
father onDestroy
child onDestroy
```


### 五、指令
#### 1.内置指令
-   `bind:`：用于双向绑定表单元素的值。例如，可以使用 `bind:value` 指令来双向绑定输入框的值，使得输入框中的值能够与组件中的变量同步。
-   `on:`：用于监听 DOM 元素的事件。例如，可以使用 `on:click` 指令来监听按钮的点击事件，并在事件触发时执行相应的逻辑。
-   `class:` 和 `style:`：用于设置 DOM 元素的 class 和 style 属性。例如，可以使用 `class:active` 指令来根据条件动态添加或删除 `active` class，从而改变元素的样式。
#### 2.自定义指令
```html
<script>
  function selectOnFocus(node, options) {
    node.addEventListener('focus', () => {
      node.select();
    });
  }
</script>

<input type="text" use:selectOnFocus />
```
### 六、总结

`Svelte`被设计成编译时框架，可以将代码打包成高效的`JavaScript`代码，从而提高应用程序的性能和响应速度。相比其他前端框架，`Svelte`的体积更小、性能更好，同时也具有很好的可维护性和可扩展性。这些特点使得`Svelte`在国外得到了广泛的关注和应用。
