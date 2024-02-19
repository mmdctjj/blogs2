import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as l,a as n,b as a,e as t,f as p}from"./app-f740539f.js";const i={},r=n("blockquote",null,[n("p",null,"文章同步在公众号：萌萌哒草头将军，欢迎关注")],-1),u={href:"https://github.com/pmndrs/zustand/tree/main",target:"_blank",rel:"noopener noreferrer"},k=p(`<h3 id="🚀-简单易用的-zustand" tabindex="-1"><a class="header-anchor" href="#🚀-简单易用的-zustand" aria-hidden="true">#</a> 🚀 简单易用的 <code>zustand </code></h3><h4 id="🚀-简单的对比" tabindex="-1"><a class="header-anchor" href="#🚀-简单的对比" aria-hidden="true">#</a> 🚀 简单的对比</h4><p>说到中大型 React 项目状态管理库，最先想到就是 Redux。而 Redux 是基于 Flux 架构模式的状态管理库。</p><figure><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/390bca56268e4817963d25f5fd5403ec~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>Redux 继承了 Flux&quot;单向流动&quot;的特点，</p><ol><li>用户与 View 进行交互，触发相应的 Actions。</li><li>Actions 通过 Dispatcher 进行派发。</li><li>Stores 接收派发的 Actions，并根据需要更新状态。</li><li>Stores 更新后触发事件，通知 Views 进行界面更新。</li><li>Views 使用 Stores 中的最新状态重新渲染界面。</li></ol><p>然而随着 Hook 的流行，Flux 模式显得日益笨重。在很长时间里，通常会采用 react 自带的 createContext 代替 Redux 的需求。一个简单的例子如下。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> createContext<span class="token punctuation">,</span> useContext<span class="token punctuation">,</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// 创建一个上下文对象类型</span>
<span class="token keyword">interface</span> <span class="token class-name">CountContextProps</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">count</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
  <span class="token function-variable function">setCount</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">count</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 创建上下文</span>
<span class="token keyword">const</span> CountContext <span class="token operator">=</span> createContext<span class="token operator">&lt;</span>CountContextProps <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 提供器组件</span>
<span class="token keyword">const</span> <span class="token literal-property property">CountProvider</span><span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> children <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token literal-property property">contextValue</span><span class="token operator">:</span> CountContextProps <span class="token operator">=</span> <span class="token punctuation">{</span>
    count<span class="token punctuation">,</span>
    setCount<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>CountContext<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token punctuation">{</span>contextValue<span class="token punctuation">}</span><span class="token operator">&gt;</span>
      <span class="token punctuation">{</span>children<span class="token punctuation">}</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>CountContext<span class="token punctuation">.</span>Provider<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 消费者组件</span>
<span class="token keyword">const</span> <span class="token literal-property property">Counter</span><span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> count<span class="token punctuation">,</span> setCount <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useContext</span><span class="token punctuation">(</span>CountContext<span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">increment</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setCount</span><span class="token punctuation">(</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">decrement</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setCount</span><span class="token punctuation">(</span>count <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>Count<span class="token operator">:</span> <span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>increment<span class="token punctuation">}</span><span class="token operator">&gt;</span>Increment<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>decrement<span class="token punctuation">}</span><span class="token operator">&gt;</span>Decrement<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 应用程序组件</span>
<span class="token keyword">const</span> <span class="token literal-property property">App</span><span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>CountProvider<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Counter <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>CountProvider<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然是个简单的例子，但是实际开发中，步骤 i 依然繁琐。</p><p>那么有没有更简便的方案？答案是肯定的！</p><p>那就是 <code>zustand </code>。同样功能的例子实现如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> create <span class="token keyword">from</span> <span class="token string">&quot;zustand&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 创建状态存储</span>
<span class="token keyword">interface</span> <span class="token class-name">CountState</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">count</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
  <span class="token function-variable function">increment</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token function-variable function">decrement</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> useCountStore <span class="token operator">=</span>
  create <span class="token operator">&lt;</span>
  CountState <span class="token operator">&gt;</span>
  <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">set</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token function-variable function">increment</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function-variable function">decrement</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">-</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 消费者组件</span>
<span class="token keyword">const</span> <span class="token literal-property property">Counter</span><span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> count<span class="token punctuation">,</span> increment<span class="token punctuation">,</span> decrement <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useCountStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>Count<span class="token operator">:</span> <span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>increment<span class="token punctuation">}</span><span class="token operator">&gt;</span>Increment<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>decrement<span class="token punctuation">}</span><span class="token operator">&gt;</span>Decrement<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 应用程序组件</span>
<span class="token keyword">const</span> <span class="token literal-property property">App</span><span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>Counter <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单的对比，就可以发现 <code>zustand </code>没有特定的概念，简单易用。</p><h4 id="🚀-监听变化" tabindex="-1"><a class="header-anchor" href="#🚀-监听变化" aria-hidden="true">#</a> 🚀 监听变化</h4><p>通常，当 store 变化时，可以使用 <code>useEffect</code> 监听状态变化</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 消费者组件</span>
<span class="token keyword">const</span> <span class="token literal-property property">Counter</span><span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> count<span class="token punctuation">,</span> increment<span class="token punctuation">,</span> decrement <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useCountStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>count<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>Count<span class="token operator">:</span> <span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>increment<span class="token punctuation">}</span><span class="token operator">&gt;</span>Increment<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>decrement<span class="token punctuation">}</span><span class="token operator">&gt;</span>Decrement<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是如果当状态的变化不想引起组件的渲染时，可以使用如下方式：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 消费者组件</span>
<span class="token keyword">const</span> <span class="token literal-property property">Counter</span><span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> count<span class="token punctuation">,</span> increment<span class="token punctuation">,</span> decrement <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useCountStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// useEffect(() =&gt; console.log(count), [count])</span>

  <span class="token comment">// 注意，useCountStore.subscribe的返回值时取消订阅函数</span>
  <span class="token comment">// 所以当组件卸载时，会自动取消订阅</span>
  <span class="token function">useEffect</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> useCountStore<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>Count<span class="token operator">:</span> <span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>increment<span class="token punctuation">}</span><span class="token operator">&gt;</span>Increment<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>decrement<span class="token punctuation">}</span><span class="token operator">&gt;</span>Decrement<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="🚀-中间件模式" tabindex="-1"><a class="header-anchor" href="#🚀-中间件模式" aria-hidden="true">#</a> 🚀 中间件模式</h4><p><code>zustand</code> 还在状态管理的功能上提供了中间件功能。例如，当对应的值发生变化时，自动更新<code>localStroge</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">log</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token parameter">set<span class="token punctuation">,</span> get<span class="token punctuation">,</span> api</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
  <span class="token function">localStroge</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 这里args为set({ count })的参数就{ count }</span>
      localStroge<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">&quot;count&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">set</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    get<span class="token punctuation">,</span>
    api
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> useCountStore <span class="token operator">=</span> <span class="token function">create</span><span class="token punctuation">(</span>
  <span class="token function">localStroge</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">set</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token function-variable function">setCount</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">count</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">{</span> count <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，<code>zustand</code>提供了内置的一些中间件，如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&quot;./middleware/redux.ts&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&quot;./middleware/devtools.ts&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&quot;./middleware/subscribeWithSelector.ts&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&quot;./middleware/combine.ts&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&quot;./middleware/persist.ts&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),d={href:"https://github.com/pmndrs/zustand/blob/v4.4.1/docs/integrations/persisting-store-data.md",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/pmndrs/zustand/blob/v4.4.1/docs/integrations/third-party-libraries.md",target:"_blank",rel:"noopener noreferrer"},m=p('<h3 id="🚀-总结" tabindex="-1"><a class="header-anchor" href="#🚀-总结" aria-hidden="true">#</a> 🚀 总结</h3><p><code>zustand</code> 凭借小巧的体积（2kb）和简单易用的特性，迅速获得 <code>GitHub</code> 34.3k 的 <code>star</code>，足以说明它的好用。</p><p>好了今天的文章分享到这了，下篇文章我们从源码的角度进一步的认识 <code>zustand</code> ！</p><h3 id="更多文章" tabindex="-1"><a class="header-anchor" href="#更多文章" aria-hidden="true">#</a> 更多文章</h3>',4),b={href:"https://juejin.cn/post/7246777363257475129",title:"https://juejin.cn/post/7246777363257475129",target:"_blank",rel:"noopener noreferrer"},g={href:"https://juejin.cn/post/7248982532728602681",title:"https://juejin.cn/post/7248982532728602681",target:"_blank",rel:"noopener noreferrer"},f={href:"https://juejin.cn/post/7242249906257363001",title:"https://juejin.cn/post/7242249906257363001",target:"_blank",rel:"noopener noreferrer"},h={href:"https://juejin.cn/post/7241567583504728119",title:"https://juejin.cn/post/7241567583504728119",target:"_blank",rel:"noopener noreferrer"},y={href:"https://juejin.cn/post/7240721866548740133",title:"https://juejin.cn/post/7240721866548740133",target:"_blank",rel:"noopener noreferrer"},_={href:"https://juejin.cn/post/7233762589720100919",title:"https://juejin.cn/post/7233762589720100919",target:"_blank",rel:"noopener noreferrer"},C={href:"https://juejin.cn/post/7230806990452850725",title:"https://juejin.cn/post/7230806990452850725",target:"_blank",rel:"noopener noreferrer"},w={href:"https://juejin.cn/post/7216526817372225593",title:"https://juejin.cn/post/7216526817372225593",target:"_blank",rel:"noopener noreferrer"};function j(x,R){const s=o("ExternalLinkIcon");return c(),l("div",null,[r,n("p",null,[n("a",u,[a("GitHub 地址点这里"),t(s)])]),k,n("p",null,[n("a",d,[a("文档可以参看这里"),t(s)])]),n("p",null,[n("a",v,[a("社区中间件也十分丰富，详细请看这里"),t(s)])]),m,n("ul",null,[n("li",null,[n("p",null,[n("a",b,[a("🤮 是时候放弃 useState 了，🚀 这么写 React 更丝滑 🚀"),t(s)])])]),n("li",null,[n("p",null,[n("a",g,[a("🎉 干货满满，React 设计原理(三)：藏在源码里的排位赛，Lane 模型 🎉"),t(s)])])]),n("li",null,[n("p",null,[n("a",f,[a("🎉 干货满满，React 设计原理(二)：藏在源码里的两个圈 🎉"),t(s)])])]),n("li",null,[n("p",null,[n("a",h,[a("🎉 干货满满，React 设计原理(一)：藏在源码里的紧箍咒，几个容易混淆的变量 🎉"),t(s)])])]),n("li",null,[n("p",null,[n("a",y,[a("🤔useMemo 还可以这样用？useCallback：糟了，我成替身了！"),t(s)])])]),n("li",null,[n("p",null,[n("a",_,[a("🔔 叮~，你有几个系统级交互的 React hooks 待查收"),t(s)])])]),n("li",null,[n("p",null,[n("a",C,[a("🎉React 几个不常用，但是可以四两拨千斤的 hooks🎉"),t(s)])])]),n("li",null,[n("p",null,[n("a",w,[a("优美的 Reactl 列表动画：Styled-Components 动画实践"),t(s)])])])])])}const z=e(i,[["render",j],["__file","React状态管理库—— zustand 为啥这么简单易用🚀.html.vue"]]);export{z as default};
