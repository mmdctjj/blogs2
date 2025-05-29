import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o,c,a as s,b as a,e as t,f as l}from"./app-802353c0.js";const r={},u={href:"https://juejin.cn/post/7241567583504728119",target:"_blank",rel:"noopener noreferrer"},d={href:"https://juejin.cn/post/7242249906257363001",target:"_blank",rel:"noopener noreferrer"},v={href:"https://juejin.cn/post/7248982532728602681",target:"_blank",rel:"noopener noreferrer"};function k(m,n){const e=i("ExternalLinkIcon");return o(),c("div",null,[n[3]||(n[3]=s("blockquote",null,[s("p",null,"文章同步更新在公众号：萌萌哒草头将军，欢迎关注")],-1)),n[4]||(n[4]=s("p",null,"好久不见，该系列已经更新了三篇了，上文介绍了 React 是如何通过 Lane 模型判断更新任务的优先级的，视野聚焦于 Lane 模型的原理，今天我们详细看看 Lane 模型工作前发生了啥。",-1)),n[5]||(n[5]=s("h3",{id:"💡-相关阅读",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#💡-相关阅读","aria-hidden":"true"},"#"),a(" 💡 相关阅读")],-1)),s("ul",null,[s("li",null,[s("a",u,[n[0]||(n[0]=a("🎉 干货满满，React 设计原理(一)：藏在源码里的紧箍咒 🎉")),t(e)])]),s("li",null,[s("a",d,[n[1]||(n[1]=a("🎉 干货满满，React 设计原理(二)：藏在源码里的两个圈 🎉")),t(e)])]),s("li",null,[s("a",v,[n[2]||(n[2]=a("🎉 干货满满，React 设计原理(三)：藏在源码里的排位赛，Lane 模型 🎉")),t(e)])])]),n[6]||(n[6]=l(`<h2 id="💎-第四座大山-事件系统" tabindex="-1"><a class="header-anchor" href="#💎-第四座大山-事件系统" aria-hidden="true">#</a> 💎 第四座大山：事件系统</h2><h3 id="一些表象和原因" tabindex="-1"><a class="header-anchor" href="#一些表象和原因" aria-hidden="true">#</a> 一些表象和原因</h3><p>事件系统是十分有趣但稍显复杂的模块。为了方便理解，我们带入一个问题：我们设置的<code>onClick</code>方法如何被执行的？</p><p>首先，React 对浏览器原生事件进行了封装，例如，当用户通过<code>onClick</code>属性触发交互行为时，React 先将事件进行优化处理，然后转化为原生的 <code>click</code> 事件。</p><p>这样封装的目的，<strong>一方面</strong>可以解决不同浏览器的兼容性问题；</p><p><strong>另一方面</strong>可以减少事件处理函数的数量，提高性能和效率，我们提供如下组件</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">const</span> <span class="token function-variable function">handerClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;公众号：萌萌哒草头将军&quot;</span><span class="token punctuation">)</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handerClick<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">btn</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后查看浏览器控制台 -&gt; 审查元素 -&gt; 事件监听，</p><p align="center"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2f8707a60634c28b1c374369280293a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1426&amp;h=588&amp;s=256323&amp;e=png&amp;b=ffffff" alt="image.png" width="50%"></p><p>我们可以看到此时的 button 元素绑定的 click 事件为 noop， 当我们选中入口 dom 节点时惊奇的发现，#app (入口)节点被绑定了一大堆的事件</p><p align="center"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce921c881709448aa87794b7c45046c3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1956&amp;h=1202&amp;s=521505&amp;e=png&amp;b=ffffff" alt="image.png" width="50%"></p><p>其中的 document 上绑定的 click 事件是函数 dispatchDiscreteEvent。可以先记住这个函数，后面还会提到。</p><blockquote><p>在 16.8 及之前的版本，这些事件直接被绑定在 document 元素上，而从 17.2 开始，将全局事件绑定在了入口 dom 上了，这么做的好处利于多应用，因为 react 支持一个 document 下挂在多个 React 应用，这样做互不干扰。</p><p align="center"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5adcea459cbd40f199c99d444be48398~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=840&amp;h=650&amp;s=145843&amp;e=png&amp;b=ffffff" alt="image.png" width="50%"></p></blockquote><p><strong>还有一个方面</strong>，它将事件处理函数绑定到组件实例上，这样可以避免在事件处理函数中手动绑定<code>this</code>关键字。</p><h3 id="onclick方法如何被执行的" tabindex="-1"><a class="header-anchor" href="#onclick方法如何被执行的" aria-hidden="true">#</a> <code>onClick</code>方法如何被执行的</h3><p>即使我们不看代码，有上面的铺垫，也可以明白，<code>onClick</code>方法的大致经历</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>=&gt; 1. 读取onClickf方法，
=&gt; 2. react合并优化处理
=&gt; 3. 挂载在docment上
=&gt; 4. 点击时触发方法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们知道每个 React 应用的入口是通过 createRoot 函数，我们打开源码，就可以看到该函数的一项工作是 <code>listenToAllSupportedEvents</code>，也就是在 rootNode 监听 所有支持的事件。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createRoot</span><span class="token punctuation">(</span><span class="token parameter">container<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省去无关代码</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>options <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> options <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化参数</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">var</span> root <span class="token operator">=</span> <span class="token function">createContainer</span><span class="token punctuation">(</span>container<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> rootContainerElement <span class="token operator">=</span>
    container<span class="token punctuation">.</span>nodeType <span class="token operator">===</span> <span class="token constant">COMMENT_NODE</span> <span class="token operator">?</span> container<span class="token punctuation">.</span>parentNode <span class="token operator">:</span> container<span class="token punctuation">;</span>
  <span class="token function">listenToAllSupportedEvents</span><span class="token punctuation">(</span>rootContainerElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ReactDOMRoot</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>深入的研究，可以看到 React 根据事件的优先级分为：离散事件、连续事件、普通事件，在 createEventListenerWrapperWithPriority 中，通过当前事件的级别，分发对应的事件监听器</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createEventListenerWrapperWithPriority</span><span class="token punctuation">(</span>
  <span class="token parameter">targetContainer<span class="token punctuation">,</span>
  domEventName<span class="token punctuation">,</span>
  eventSystemFlags</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> eventPriority <span class="token operator">=</span> <span class="token function">getEventPriority</span><span class="token punctuation">(</span>domEventName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> listenerWrapper<span class="token punctuation">;</span>

  <span class="token keyword">switch</span> <span class="token punctuation">(</span>eventPriority<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token literal-property property">DiscreteEventPriority</span><span class="token operator">:</span>
      listenerWrapper <span class="token operator">=</span> dispatchDiscreteEvent<span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>

    <span class="token keyword">case</span> <span class="token literal-property property">ContinuousEventPriority</span><span class="token operator">:</span>
      listenerWrapper <span class="token operator">=</span> dispatchContinuousEvent<span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>

    <span class="token keyword">case</span> <span class="token literal-property property">DefaultEventPriority</span><span class="token operator">:</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      listenerWrapper <span class="token operator">=</span> dispatchEvent<span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token function">listenerWrapper</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>
    domEventName<span class="token punctuation">,</span>
    eventSystemFlags<span class="token punctuation">,</span>
    targetContainer
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着，我们来在来看看后续的操作</p><p><code>addTrappedEventListener</code> 函数是用于添加事件监听器的入口函数，通过该函数中的 <code>createEventListenerWrapperWithPriority</code>函数，根据事件优先级返回相应的事件监听器包装函数 <code>listenerWrapper</code>。接着，在 <code>addEventCaptureListener</code> 捕获阶段添加事件监听器。它通过调用 <code>target.addEventListener</code> 将监听器 <code>listener</code> 添加到目标元素 <code>target</code> 上，并指定为捕获阶段（true）。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">addTrappedEventListener</span><span class="token punctuation">(</span>
  <span class="token parameter">targetContainer<span class="token punctuation">,</span>
  domEventName<span class="token punctuation">,</span>
  eventSystemFlags<span class="token punctuation">,</span>
  isCapturePhaseListener<span class="token punctuation">,</span>
  isDeferredListenerForLegacyFBSupport</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> listener <span class="token operator">=</span> <span class="token function">createEventListenerWrapperWithPriority</span><span class="token punctuation">(</span>
    targetContainer<span class="token punctuation">,</span>
    domEventName<span class="token punctuation">,</span>
    eventSystemFlags
  <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// If passive option is not supported, then the event will be</span>
  <span class="token comment">// active and not passive.</span>

  <span class="token keyword">var</span> isPassiveListener <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>

  <span class="token comment">// 根据 passiveBrowserEventsSupported 变量的值，确定是否使用被动事件监听器</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>passiveBrowserEventsSupported<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      domEventName <span class="token operator">===</span> <span class="token string">&quot;touchstart&quot;</span> <span class="token operator">||</span>
      domEventName <span class="token operator">===</span> <span class="token string">&quot;touchmove&quot;</span> <span class="token operator">||</span>
      domEventName <span class="token operator">===</span> <span class="token string">&quot;wheel&quot;</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      isPassiveListener <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  targetContainer <span class="token operator">=</span> targetContainer<span class="token punctuation">;</span>
  <span class="token keyword">var</span> unsubscribeListener<span class="token punctuation">;</span> <span class="token comment">// When legacyFBSupport is enabled, it&#39;s for when we</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>isCapturePhaseListener<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isPassiveListener <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      unsubscribeListener <span class="token operator">=</span> <span class="token function">addEventCaptureListenerWithPassiveFlag</span><span class="token punctuation">(</span>
        targetContainer<span class="token punctuation">,</span>
        domEventName<span class="token punctuation">,</span>
        listener<span class="token punctuation">,</span>
        isPassiveListener
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      unsubscribeListener <span class="token operator">=</span> <span class="token function">addEventCaptureListener</span><span class="token punctuation">(</span>
        targetContainer<span class="token punctuation">,</span>
        domEventName<span class="token punctuation">,</span>
        listener
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isPassiveListener <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      unsubscribeListener <span class="token operator">=</span> <span class="token function">addEventBubbleListenerWithPassiveFlag</span><span class="token punctuation">(</span>
        targetContainer<span class="token punctuation">,</span>
        domEventName<span class="token punctuation">,</span>
        listener<span class="token punctuation">,</span>
        isPassiveListener
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      unsubscribeListener <span class="token operator">=</span> <span class="token function">addEventBubbleListener</span><span class="token punctuation">(</span>
        targetContainer<span class="token punctuation">,</span>
        domEventName<span class="token punctuation">,</span>
        listener
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>createEventListenerWrapperWithPriority</code> 内部逻辑如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createEventListenerWrapperWithPriority</span><span class="token punctuation">(</span>
  <span class="token parameter">targetContainer<span class="token punctuation">,</span>
  domEventName<span class="token punctuation">,</span>
  eventSystemFlags</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> eventPriority <span class="token operator">=</span> <span class="token function">getEventPriority</span><span class="token punctuation">(</span>domEventName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> listenerWrapper<span class="token punctuation">;</span>

  <span class="token keyword">switch</span> <span class="token punctuation">(</span>eventPriority<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token literal-property property">DiscreteEventPriority</span><span class="token operator">:</span>
      listenerWrapper <span class="token operator">=</span> dispatchDiscreteEvent<span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>

    <span class="token keyword">case</span> <span class="token literal-property property">ContinuousEventPriority</span><span class="token operator">:</span>
      listenerWrapper <span class="token operator">=</span> dispatchContinuousEvent<span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>

    <span class="token keyword">case</span> <span class="token literal-property property">DefaultEventPriority</span><span class="token operator">:</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      listenerWrapper <span class="token operator">=</span> dispatchEvent<span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token function">listenerWrapper</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>
    domEventName<span class="token punctuation">,</span>
    eventSystemFlags<span class="token punctuation">,</span>
    targetContainer
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>addEventCaptureListener</code> 逻辑如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">addEventCaptureListener</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> eventType<span class="token punctuation">,</span> listener</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  target<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>eventType<span class="token punctuation">,</span> listener<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> listener<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🚀-dispatch-机制" tabindex="-1"><a class="header-anchor" href="#🚀-dispatch-机制" aria-hidden="true">#</a> 🚀 Dispatch 机制</h3><p>React 的 Dispatcher 机制是用于管理和调度更新的内部机制，它负责协调和执行更新任务的过程。下面是 React Dispatcher 机制的详细介绍和原理：</p><ol><li><p>调度器（Scheduler）：调度器是 Dispatcher 的核心组件，负责管理和调度任务的执行。它维护了多个优先级队列，用于存储不同优先级的任务。调度器根据任务的优先级来确定执行顺序，以提供更好的性能和用户体验。</p></li><li><p>调度器任务（Scheduler Task）：调度器任务表示一个更新任务，可以是组件的更新、副作用的处理等。当需要触发更新时，React 会创建一个调度器任务，并将其添加到相应的优先级队列中。</p></li><li><p>调度优先级（Lanes）：调度优先级用于表示不同任务的优先级。React 使用 Lanes 来管理任务的优先级，例如同步更新、批量更新、闲置更新等。调度器根据 Lanes 来决定任务的执行顺序。</p></li><li><p>批量更新（Batching）：为了提高性能，React 使用批量更新策略。它会将多个更新任务合并为一个批量更新任务，然后在适当的时机进行执行。这样可以减少不必要的重绘和布局计算，提高性能和效率。</p></li><li><p>调度过程：当需要进行组件更新时，React 会创建一个调度器任务，并根据任务的优先级将其添加到相应的优先级队列中。然后，调度器会根据当前的调度优先级选择并执行任务。执行过程中，React 会进行组件的渲染、虚拟 DOM 的比较等操作，以确定需要更新的部分。</p></li><li><p>任务优先级的调度：React 的调度器根据任务的优先级来决定执行顺序。较高优先级的任务会被立即执行，而较低优先级的任务则可能会被推迟或合并。这种机制可以确保高优先级的任务能够及时得到处理，而低优先级的任务则可以等待合适的时机再执行，以提高性能和响应性。</p></li></ol><p>通过 Dispatcher 机制，React 能够灵活地管理和调度组件的更新任务。它根据任务的优先级，合并和批量处理更新任务，以提供更好的性能和用户体验。同时，Dispatcher 机制也保证了组件的更新过程是有序且可控的，避免了不必要的重复计算和渲染。</p><h2 id="🎉-总结" tabindex="-1"><a class="header-anchor" href="#🎉-总结" aria-hidden="true">#</a> 🎉 总结</h2><p>在 React 中，事件系统和 Dispatcher 机制是一起工作的，但它们的职责和作用略有不同。</p><p>事件系统主要负责处理用户交互行为，例如点击、输入等事件的绑定和触发。当用户触发一个事件时，事件系统会调用相应的事件处理函数。</p><p>Dispatcher 机制则是用于管理和调度组件的更新任务。它负责根据任务的优先级来决定任务的执行顺序，并执行相应的更新任务。这些更新任务可能是由事件系统触发的，也可以是其他触发更新的原因，例如组件状态的改变、异步数据的更新等。</p><p>具体来说，当用户触发一个事件时，事件系统会调用相应的事件处理函数。在事件处理函数中，可能会引发组件的更新需求，例如修改组件的状态或触发父组件的重新渲染。这时，React 会创建一个更新任务，并将其添加到 Dispatcher 中的相应优先级队列中。</p><p>Dispatcher 会根据任务的优先级，选择并执行任务。它会调用组件的 render 方法生成新的虚拟 DOM，并通过与之前的虚拟 DOM 进行比较，找出差异并应用到实际的 DOM 上。这个过程也包括了组件的更新、副作用的处理、状态的更新等。</p><p>所以，可以说事件系统通过触发事件来感知需要执行的任务，而 Dispatcher 机制具体执行这些任务并管理组件的更新过程。它们协同工作，确保组件的更新能够被及时处理，并提供良好的用户体验。</p><p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1fd46c99b6d4d54af60897dac438c14~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p>`,40))])}const f=p(r,[["render",k],["__file","🎉干货满满，React设计原理(四)：藏在源码里的传呼机，Dispatch机制和事件系统🎉.html.vue"]]);export{f as default};
