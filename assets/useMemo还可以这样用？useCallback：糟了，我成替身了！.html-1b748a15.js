import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o,c as t,a as n,b as s,e as c,f as l}from"./app-b1683649.js";const i={},u=n("blockquote",null,[n("p",null,"文章首发公众号：萌萌哒草头将军，最近关注有🎁，欢迎关注！")],-1),r=n("p",null,[s("最近在研究"),n("code",null,"React"),s("的源码，然后，我就悟了！")],-1),d=n("p",{align:"center"},[n("img",{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42e6ae2e8ca749e58d3c08f7d808b255~tplv-k3u1fbpfcp-watermark.image?",alt:"image.png",width:"50%"})],-1),k=n("h3",{id:"💡推荐阅读",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#💡推荐阅读","aria-hidden":"true"},"#"),s(" 💡推荐阅读")],-1),v={href:"https://juejin.cn/post/7241567583504728119?share_token=e6d6f76c-3962-473b-bd11-716c41a1089d",target:"_blank",rel:"noopener noreferrer"},m=l(`<h2 id="💎-开门见山" tabindex="-1"><a class="header-anchor" href="#💎-开门见山" aria-hidden="true">#</a> 💎 开门见山</h2><p>请看👇的代码：你觉得可以按预期运行吗？</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useMemo<span class="token punctuation">,</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>

<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> onClick <span class="token operator">=</span> <span class="token function">useMemo</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setCount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">count</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  
  <span class="token function">useMemo</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>count<span class="token punctuation">]</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;App&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>onClick<span class="token punctuation">}</span><span class="token operator">&gt;</span>
          count is <span class="token punctuation">{</span>count<span class="token punctuation">}</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>答案是完全可以！</p><h2 id="💎-分析" tabindex="-1"><a class="header-anchor" href="#💎-分析" aria-hidden="true">#</a> 💎 分析</h2><h3 id="🚗-用法分析" tabindex="-1"><a class="header-anchor" href="#🚗-用法分析" aria-hidden="true">#</a> 🚗 用法分析</h3><p>他们都接收两个参数，<code>useXxx(callback, [...deps])</code></p><ul><li><p>👉第一个参数<code>callback</code>是回调函数</p></li><li><p>👉第二个参数<code>deps</code>是依赖项</p></li></ul><p>不同的是当依赖项发生改变时</p><ul><li><p>🚆<code>useCallback</code>会重新创建回调函数，以保证每次调用都是最新值。并缓存这个函数</p></li><li><p>🚆<code>useEffect</code>回调函数会重新执行</p></li><li><p>🚆<code>useMemo</code>回调函数会重新执行，并缓存返回值。</p></li></ul><p>根据<code>useMemo</code>返回值的不同，可以模拟出不同的效果：</p><ul><li><p>👉当返回值是个函数时，它<code>useCallback</code>和是完全等效的。</p></li><li><p>👉当没有返回值或者不管返回值时，它<code>useEffect</code>和部分功能是等效的</p></li></ul><blockquote><p>这是因为，它不会像<code>useEffect</code>一样，对返回值做处理。也就是说，它无法模拟<code>unMounted</code>生命周期函数。</p></blockquote><p>就是这么简单的原因，上面的代码会执行成功。</p><h3 id="🚗-源码分析" tabindex="-1"><a class="header-anchor" href="#🚗-源码分析" aria-hidden="true">#</a> 🚗 源码分析</h3><p>这部分是选读，如果你对源码感兴趣，可以阅读这块。</p><h4 id="🚆-usememo源码逻辑" tabindex="-1"><a class="header-anchor" href="#🚆-usememo源码逻辑" aria-hidden="true">#</a> 🚆 <code>useMemo</code>源码逻辑</h4><ul><li><p>👉注册<code>hook</code>状态</p></li><li><p>👉此时是<code>mounted</code>阶段，调用<code>mountMemo</code>，</p></li><li><p>👉将注册的<code>callback</code>和<code>deps</code>拿出来</p></li><li><p>👉执行<code>callback</code>，并将执行结果和<code>deps</code>缓存在当前<code>hook</code>的状态上</p></li><li><p>👉<code>deps</code>发生改变，进入<code>update</code>阶段，调用<code>updateMemo</code></p></li><li><p>👉取出当前的<code>hook</code>状态，拿到<code>callback</code>和<code>deps</code>，再从当前<code>hook</code>拿到上次的<code>deps</code></p></li><li><p>👉比较前后两次的<code>deps</code>，如果一致，直接返回当前的状态值</p></li><li><p>👉否则重新执行<code>callback</code>，保持返回值，并将该值最为最新的状态值和<code>deps</code>一起保存起来</p></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> mountMemo<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>
  <span class="token function-variable function">nextCreate</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span><span class="token punctuation">,</span>
  <span class="token literal-property property">deps</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">{</span>
  <span class="token comment">// 拿到当前的hook状态</span>
  <span class="token keyword">const</span> hook <span class="token operator">=</span> <span class="token function">mountWorkInProgressHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 拿到当前的hook依赖项</span>
  <span class="token keyword">const</span> nextDeps <span class="token operator">=</span> deps <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> deps<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>shouldDoubleInvokeUserFnsInHooksDEV<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">nextCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 执行回调函数</span>
  <span class="token keyword">const</span> nextValue <span class="token operator">=</span> <span class="token function">nextCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 缓存回调函数返回值和依赖</span>
  hook<span class="token punctuation">.</span>memoizedState <span class="token operator">=</span> <span class="token punctuation">[</span>nextValue<span class="token punctuation">,</span> nextDeps<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// 返回返回值</span>
  <span class="token keyword">return</span> nextValue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> updateMemo<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>
  <span class="token function-variable function">nextCreate</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span><span class="token punctuation">,</span>
  <span class="token literal-property property">deps</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> hook <span class="token operator">=</span> <span class="token function">updateWorkInProgressHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> nextDeps <span class="token operator">=</span> deps <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> deps<span class="token punctuation">;</span>
  <span class="token keyword">const</span> prevState <span class="token operator">=</span> hook<span class="token punctuation">.</span>memoizedState<span class="token punctuation">;</span>
  <span class="token comment">// Assume these are defined. If they&#39;re not, areHookInputsEqual will warn.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nextDeps <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token literal-property property">prevDeps</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> prevState<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">areHookInputsEqual</span><span class="token punctuation">(</span>nextDeps<span class="token punctuation">,</span> prevDeps<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果前后依赖相同时，直接返回当前值</span>
      <span class="token keyword">return</span> prevState<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>shouldDoubleInvokeUserFnsInHooksDEV<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">nextCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 否则重新计算赋值，并返回最新值</span>
  <span class="token keyword">const</span> nextValue <span class="token operator">=</span> <span class="token function">nextCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  hook<span class="token punctuation">.</span>memoizedState <span class="token operator">=</span> <span class="token punctuation">[</span>nextValue<span class="token punctuation">,</span> nextDeps<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> nextValue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="🚆-usecallback源码逻辑" tabindex="-1"><a class="header-anchor" href="#🚆-usecallback源码逻辑" aria-hidden="true">#</a> 🚆 <code>useCallback</code>源码逻辑</h4><ul><li><p>👉注册<code>hook</code>状态</p></li><li><p>👉此时是<code>mounted</code>阶段，调用<code>mountCallback</code>，</p></li><li><p>👉将注册的<code>callback</code>和<code>deps</code>拿出来</p></li><li><p>👉将<code>callback</code>和<code>deps</code>缓存在当前<code>hook</code>的状态上</p></li><li><p>👉<code>deps</code>发生改变，进入<code>update</code>阶段，调用<code>updateCallback</code></p></li><li><p>👉取出当前的<code>hook</code>状态，拿到<code>callback</code>和<code>deps</code>，再从当前<code>hook</code>拿到上次的<code>deps</code></p></li><li><p>👉比较前后两次的<code>deps</code>，如果一致，直接返回当前的状态值</p></li><li><p>👉否则重新将<code>callback</code>做为最新的状态值和<code>deps</code>一起保存起来</p></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> mountCallback<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>
  <span class="token literal-property property">callback</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span>
  <span class="token literal-property property">deps</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token operator">|</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取当前hook状态</span>
  <span class="token keyword">const</span> hook <span class="token operator">=</span> <span class="token function">mountWorkInProgressHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 获取当前hook依赖项</span>
  <span class="token keyword">const</span> nextDeps <span class="token operator">=</span> deps <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> deps<span class="token punctuation">;</span>
  <span class="token comment">// 缓存回调函数和依赖</span>
  hook<span class="token punctuation">.</span>memoizedState <span class="token operator">=</span> <span class="token punctuation">[</span>callback<span class="token punctuation">,</span> nextDeps<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// 返回回调函数</span>
  <span class="token keyword">return</span> callback<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> updateCallback<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>
  <span class="token literal-property property">callback</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span>
  <span class="token literal-property property">deps</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token operator">|</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> hook <span class="token operator">=</span> <span class="token function">updateWorkInProgressHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> nextDeps <span class="token operator">=</span> deps <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> deps<span class="token punctuation">;</span>
  <span class="token keyword">const</span> prevState <span class="token operator">=</span> hook<span class="token punctuation">.</span>memoizedState<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nextDeps <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token literal-property property">prevDeps</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> prevState<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">areHookInputsEqual</span><span class="token punctuation">(</span>nextDeps<span class="token punctuation">,</span> prevDeps<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果依赖项相同时，直接返回当前值</span>
      <span class="token keyword">return</span> prevState<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 否则重新赋值，并返回最新值</span>
  hook<span class="token punctuation">.</span>memoizedState <span class="token operator">=</span> <span class="token punctuation">[</span>callback<span class="token punctuation">,</span> nextDeps<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> callback<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从源码上看，<code>useCallback</code>和<code>useMemo</code>的实现十分类似，唯一的不同之处是：<code>useMemo</code>在依赖项发生变化时会缓存回调函数的返回值。</p><h2 id="💎-总结" tabindex="-1"><a class="header-anchor" href="#💎-总结" aria-hidden="true">#</a> 💎 总结</h2><p><code>useCallback</code>和<code>useMemo</code>都是缓存中间状态，</p><p>不同的是<code>useMemo</code>可以缓存任何类型的值，<code>useCallback</code>仅仅缓存函数。所以开头的例子可以按预期运行。</p><p>好了，今天的分享比较简单，但是希望可以帮你理解地更深一点。</p><p>下篇我们继续聊<code>hook</code>。</p>`,28);function b(h,y){const a=p("ExternalLinkIcon");return o(),t("div",null,[u,r,d,k,n("p",null,[n("a",v,[s("🎉干货满满，React设计原理，藏在源码里的五指山🎉"),c(a)])]),m])}const x=e(i,[["render",b],["__file","useMemo还可以这样用？useCallback：糟了，我成替身了！.html.vue"]]);export{x as default};
