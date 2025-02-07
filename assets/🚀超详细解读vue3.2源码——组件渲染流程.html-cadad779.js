import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as p,f as t}from"./app-3e13ab12.js";const e={};function o(c,n){return a(),p("div",null,n[0]||(n[0]=[t(`<blockquote><p>欢迎关注我的公众号：萌萌哒草头将军</p></blockquote><p>入口-&gt;全局初始化-&gt;生成 vnode-&gt;挂载</p><p>入口函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">createApp</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 1.创建实例</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">ensureRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createApp</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 2. 重写实例的 mount 方法</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token operator">=</span> app<span class="token punctuation">;</span>
  app<span class="token punctuation">.</span><span class="token function-variable function">mount</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">containerOrSelector</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> container <span class="token operator">=</span> <span class="token function">normalizeContainer</span><span class="token punctuation">(</span>containerOrSelector<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>container<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> component <span class="token operator">=</span> app<span class="token punctuation">.</span>_component<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isFunction</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>component<span class="token punctuation">.</span>render <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>component<span class="token punctuation">.</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// __UNSAFE__</span>
      <span class="token comment">// Reason: potential execution of JS expressions in in-DOM template.</span>
      <span class="token comment">// The user must make sure the in-DOM template is trusted. If it&#39;s</span>
      <span class="token comment">// rendered by the server, the template should not contain any user data.</span>
      component<span class="token punctuation">.</span>template <span class="token operator">=</span> container<span class="token punctuation">.</span>innerHTML<span class="token punctuation">;</span>
      <span class="token comment">// 2.x compat check</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>__COMPAT__ <span class="token operator">&amp;&amp;</span> __DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> container<span class="token punctuation">.</span>attributes<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> attr <span class="token operator">=</span> container<span class="token punctuation">.</span>attributes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>attr<span class="token punctuation">.</span>name <span class="token operator">!==</span> <span class="token string">&quot;v-cloak&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^(v-|:|@)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>attr<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            compatUtils<span class="token punctuation">.</span><span class="token function">warnDeprecation</span><span class="token punctuation">(</span>
              DeprecationTypes<span class="token punctuation">.</span><span class="token constant">GLOBAL_MOUNT_CONTAINER</span><span class="token punctuation">,</span>
              <span class="token keyword">null</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// clear content before mounting</span>
    container<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token function">resolveRootNamespace</span><span class="token punctuation">(</span>container<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>container <span class="token keyword">instanceof</span> <span class="token class-name">Element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      container<span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;v-cloak&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      container<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;data-v-app&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> proxy<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> app<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ensureRenderer 的内部实现</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> rendererOptions <span class="token operator">=</span> <span class="token comment">/*#__PURE__*/</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span> patchProp <span class="token punctuation">}</span><span class="token punctuation">,</span> nodeOps<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> renderer<span class="token punctuation">;</span>
<span class="token comment">// 惰性的创建渲染器，返回已经创建的渲染器，没有时重新创建</span>
<span class="token keyword">function</span> <span class="token function">ensureRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> renderer <span class="token operator">||</span> <span class="token punctuation">(</span>renderer <span class="token operator">=</span> <span class="token function">createRenderer</span><span class="token punctuation">(</span>rendererOptions<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>patchProp 是 patch 方法，nodeOps 是 node 相关操作的方法。创建渲染器时，这些相关方法将会被使用。</p><p>关于 createRenderer 的实现，由于混合了更新的相关代码，这里进行了抽离，更新的相关代码下篇文章详细聊聊。现在我们只需要知道，它返回了 render 方法和 createApp 方法</p><p>createRenderer 方法的内部实现</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createRenderer</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">baseCreateRenderer</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">baseCreateRenderer</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 这些方法将会被使用，但是具体使用的方法省略了</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">insert</span><span class="token operator">:</span> hostInsert<span class="token punctuation">,</span>
    <span class="token literal-property property">remove</span><span class="token operator">:</span> hostRemove<span class="token punctuation">,</span>
    <span class="token literal-property property">patchProp</span><span class="token operator">:</span> hostPatchProp<span class="token punctuation">,</span>
    <span class="token literal-property property">createElement</span><span class="token operator">:</span> hostCreateElement<span class="token punctuation">,</span>
    <span class="token literal-property property">createText</span><span class="token operator">:</span> hostCreateText<span class="token punctuation">,</span>
    <span class="token literal-property property">createComment</span><span class="token operator">:</span> hostCreateComment<span class="token punctuation">,</span>
    <span class="token literal-property property">setText</span><span class="token operator">:</span> hostSetText<span class="token punctuation">,</span>
    <span class="token literal-property property">setElementText</span><span class="token operator">:</span> hostSetElementText<span class="token punctuation">,</span>
    <span class="token literal-property property">parentNode</span><span class="token operator">:</span> hostParentNode<span class="token punctuation">,</span>
    <span class="token literal-property property">nextSibling</span><span class="token operator">:</span> hostNextSibling<span class="token punctuation">,</span>
    <span class="token literal-property property">setScopeId</span><span class="token operator">:</span> hostSetScopeId <span class="token operator">=</span> <span class="token constant">NOOP</span><span class="token punctuation">,</span>
    <span class="token literal-property property">insertStaticContent</span><span class="token operator">:</span> hostInsertStaticContent<span class="token punctuation">,</span>
  <span class="token punctuation">}</span> <span class="token operator">=</span> options<span class="token punctuation">;</span>
  <span class="token comment">// 省略...</span>
  <span class="token keyword">let</span> isFlushing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container<span class="token punctuation">,</span> namespace</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>container<span class="token punctuation">.</span>_vnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">unmount</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span>_vnode<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">patch</span><span class="token punctuation">(</span>
        container<span class="token punctuation">.</span>_vnode <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        vnode<span class="token punctuation">,</span>
        container<span class="token punctuation">,</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        namespace
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isFlushing<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      isFlushing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token function">flushPreFlushCbs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">flushPostFlushCbs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      isFlushing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    container<span class="token punctuation">.</span>_vnode <span class="token operator">=</span> vnode<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    render<span class="token punctuation">,</span>
    hydrate<span class="token punctuation">,</span>
    <span class="token literal-property property">createApp</span><span class="token operator">:</span> <span class="token function">createAppAPI</span><span class="token punctuation">(</span>render <span class="token comment">/* hydrate */</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>createApp 调用了 createAppAPI 方法，方法内部提供了全局 API</p><p>其内部实现如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createAppAPI</span><span class="token punctuation">(</span>
  <span class="token parameter">render<span class="token punctuation">,</span>
  hydrate<span class="token punctuation">,</span></span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token parameter">rootComponent<span class="token punctuation">,</span> rootProps <span class="token operator">=</span> <span class="token keyword">null</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isFunction</span><span class="token punctuation">(</span>rootComponent<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      rootComponent <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> rootComponent<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>rootProps <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>rootProps<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      __DEV__ <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">root props passed to app.mount() must be an object.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      rootProps <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 创建应用上下文</span>
    <span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token function">createAppContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 插件相关</span>
    <span class="token keyword">const</span> installedPlugins <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 初始状态为未mountd状态</span>
    <span class="token keyword">let</span> isMounted <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token comment">// 应用初始状态</span>
    <span class="token keyword">const</span> <span class="token literal-property property">app</span><span class="token operator">:</span> App <span class="token operator">=</span> <span class="token punctuation">(</span>context<span class="token punctuation">.</span>app <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">_uid</span><span class="token operator">:</span> uid<span class="token operator">++</span><span class="token punctuation">,</span>
      <span class="token literal-property property">_component</span><span class="token operator">:</span> rootComponent <span class="token keyword">as</span> ConcreteComponent<span class="token punctuation">,</span>
      <span class="token literal-property property">_props</span><span class="token operator">:</span> rootProps<span class="token punctuation">,</span>
      <span class="token literal-property property">_container</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
      <span class="token literal-property property">_context</span><span class="token operator">:</span> context<span class="token punctuation">,</span>
      <span class="token literal-property property">_instance</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>

      version<span class="token punctuation">,</span>

      <span class="token keyword">get</span> <span class="token function">config</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> context<span class="token punctuation">.</span>config
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token keyword">set</span> <span class="token function">config</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">warn</span><span class="token punctuation">(</span>
            <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">app.config cannot be replaced. Modify individual options instead.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">use</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">plugin</span><span class="token operator">:</span> Plugin<span class="token punctuation">,</span> <span class="token operator">...</span>options<span class="token operator">:</span> any<span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>installedPlugins<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>plugin<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          __DEV__ <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Plugin has already been applied to target app.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>plugin <span class="token operator">&amp;&amp;</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>plugin<span class="token punctuation">.</span>install<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          installedPlugins<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>plugin<span class="token punctuation">)</span>
          plugin<span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> <span class="token operator">...</span>options<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isFunction</span><span class="token punctuation">(</span>plugin<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          installedPlugins<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>plugin<span class="token punctuation">)</span>
          <span class="token function">plugin</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> <span class="token operator">...</span>options<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">warn</span><span class="token punctuation">(</span>
            <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">A plugin must either be a function or an object with an &quot;install&quot; </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
              <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">function.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> app
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">mixin</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">mixin</span><span class="token operator">:</span> ComponentOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>__FEATURE_OPTIONS_API__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>context<span class="token punctuation">.</span>mixins<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>mixin<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            context<span class="token punctuation">.</span>mixins<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>mixin<span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">warn</span><span class="token punctuation">(</span>
              <span class="token string">&#39;Mixin has already been applied to target app&#39;</span> <span class="token operator">+</span>
                <span class="token punctuation">(</span>mixin<span class="token punctuation">.</span>name <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>mixin<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;Mixins are only available in builds supporting Options API&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> app
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">component</span><span class="token punctuation">(</span>name<span class="token operator">:</span> string<span class="token punctuation">,</span> component<span class="token operator">?</span><span class="token operator">:</span> Component<span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">validateComponentName</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> context<span class="token punctuation">.</span>config<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> context<span class="token punctuation">.</span>components<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> context<span class="token punctuation">.</span>components<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Component &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; has already been registered in target app.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        context<span class="token punctuation">.</span>components<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> component
        <span class="token keyword">return</span> app
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">directive</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span> string<span class="token punctuation">,</span> directive<span class="token operator">?</span><span class="token operator">:</span> Directive</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">validateDirectiveName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>directive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> context<span class="token punctuation">.</span>directives<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token keyword">as</span> any
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> context<span class="token punctuation">.</span>directives<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Directive &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; has already been registered in target app.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        context<span class="token punctuation">.</span>directives<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> directive
        <span class="token keyword">return</span> app
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">mount</span><span class="token punctuation">(</span>
        <span class="token literal-property property">rootContainer</span><span class="token operator">:</span> HostElement<span class="token punctuation">,</span>
        isHydrate<span class="token operator">?</span><span class="token operator">:</span> boolean<span class="token punctuation">,</span>
        namespace<span class="token operator">?</span><span class="token operator">:</span> boolean <span class="token operator">|</span> ElementNamespace<span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// #5571</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>rootContainer <span class="token keyword">as</span> any<span class="token punctuation">)</span><span class="token punctuation">.</span>__vue_app__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">warn</span><span class="token punctuation">(</span>
              <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">There is already an app instance mounted on the host container.\\n</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
                <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string"> If you want to mount another app on the same host container,</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
                <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string"> you need to unmount the previous app by calling \\\`app.unmount()\\\` first.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token function">createVNode</span><span class="token punctuation">(</span>rootComponent<span class="token punctuation">,</span> rootProps<span class="token punctuation">)</span>
          <span class="token comment">// store app context on the root VNode.</span>
          <span class="token comment">// this will be set on the root instance on initial mount.</span>
          vnode<span class="token punctuation">.</span>appContext <span class="token operator">=</span> context

          <span class="token keyword">if</span> <span class="token punctuation">(</span>namespace <span class="token operator">===</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            namespace <span class="token operator">=</span> <span class="token string">&#39;svg&#39;</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>namespace <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            namespace <span class="token operator">=</span> <span class="token keyword">undefined</span>
          <span class="token punctuation">}</span>

          <span class="token comment">// HMR root reload</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            context<span class="token punctuation">.</span><span class="token function-variable function">reload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token comment">// casting to ElementNamespace because TS doesn&#39;t guarantee type narrowing</span>
              <span class="token comment">// over function boundaries</span>
              <span class="token function">render</span><span class="token punctuation">(</span>
                <span class="token function">cloneVNode</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span><span class="token punctuation">,</span>
                rootContainer<span class="token punctuation">,</span>
                namespace <span class="token keyword">as</span> ElementNamespace<span class="token punctuation">,</span>
              <span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>

          <span class="token keyword">if</span> <span class="token punctuation">(</span>isHydrate <span class="token operator">&amp;&amp;</span> hydrate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">hydrate</span><span class="token punctuation">(</span>vnode <span class="token keyword">as</span> VNode<span class="token operator">&lt;</span>Node<span class="token punctuation">,</span> Element<span class="token operator">&gt;</span><span class="token punctuation">,</span> rootContainer <span class="token keyword">as</span> any<span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">render</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> rootContainer<span class="token punctuation">,</span> namespace<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
          isMounted <span class="token operator">=</span> <span class="token boolean">true</span>
          app<span class="token punctuation">.</span>_container <span class="token operator">=</span> rootContainer
          <span class="token comment">// for devtools and telemetry</span>
          <span class="token punctuation">;</span><span class="token punctuation">(</span>rootContainer <span class="token keyword">as</span> any<span class="token punctuation">)</span><span class="token punctuation">.</span>__vue_app__ <span class="token operator">=</span> app

          <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">||</span> __FEATURE_PROD_DEVTOOLS__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            app<span class="token punctuation">.</span>_instance <span class="token operator">=</span> vnode<span class="token punctuation">.</span>component
            <span class="token function">devtoolsInitApp</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> version<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>

          <span class="token keyword">return</span> <span class="token function">getComponentPublicInstance</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>component<span class="token operator">!</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">warn</span><span class="token punctuation">(</span>
            <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">App has already been mounted.\\n</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
              <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">If you want to remount the same app, move your app creation logic </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
              <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">into a factory function and create fresh app instances for each </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
              <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">mount - e.g. \\\`const createMyApp = () =&gt; createApp(App)\\\`</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">unmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">render</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> app<span class="token punctuation">.</span>_container<span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">||</span> __FEATURE_PROD_DEVTOOLS__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            app<span class="token punctuation">.</span>_instance <span class="token operator">=</span> <span class="token keyword">null</span>
            <span class="token function">devtoolsUnmountApp</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">delete</span> app<span class="token punctuation">.</span>_container<span class="token punctuation">.</span>__vue_app__
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Cannot unmount an app that is not mounted.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">provide</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>key <span class="token keyword">as</span> string <span class="token operator">|</span> symbol<span class="token punctuation">)</span> <span class="token keyword">in</span> context<span class="token punctuation">.</span>provides<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">warn</span><span class="token punctuation">(</span>
            <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">App already provides property with key &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">String</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;. </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
              <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">It will be overwritten with the new value.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        context<span class="token punctuation">.</span>provides<span class="token punctuation">[</span>key <span class="token keyword">as</span> string <span class="token operator">|</span> symbol<span class="token punctuation">]</span> <span class="token operator">=</span> value

        <span class="token keyword">return</span> app
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">runWithContext</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> lastApp <span class="token operator">=</span> currentApp
        currentApp <span class="token operator">=</span> app
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
          currentApp <span class="token operator">=</span> lastApp
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>__COMPAT__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">installAppCompatProperties</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> context<span class="token punctuation">,</span> render<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> app
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到这里，我们已经创建了全局应用实例 app、初始化了全局方法，并且知道重新了实例的 mount 方法的来适应不同平台的特性。</p><p>接下来详细看看 mount 方法中，是怎么创建 vnode，并且将 vnode 转化为真实 dom 的。</p><p>先回到重写 mount 方法的地方，可以发现：</p><ul><li><ol><li>使用原始的 mount 方法</li></ol></li><li>2.1 而在原始的 mount 方法中，先创建 vnode</li><li>2.2 然后使用了应用的 render 方法进行渲染。</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 2. 重写实例的 mount 方法</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token operator">=</span> app<span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function-variable function">mount</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">containerOrSelector</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省略。。。</span>

  <span class="token comment">// 重点看这里：使用原始的 mount 方法，并且返回了 getComponentPublicInstance 组件的实例</span>
  <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token function">resolveRootNamespace</span><span class="token punctuation">(</span>container<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 省略。。。</span>

  <span class="token keyword">return</span> proxy<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原始的 mount 方法大致如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span>
<span class="token function">mount</span><span class="token punctuation">(</span>
  <span class="token literal-property property">rootContainer</span><span class="token operator">:</span> HostElement<span class="token punctuation">,</span>
  isHydrate<span class="token operator">?</span><span class="token operator">:</span> boolean<span class="token punctuation">,</span>
  namespace<span class="token operator">?</span><span class="token operator">:</span> boolean <span class="token operator">|</span> ElementNamespace<span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// 真正创建vnode的入口</span>
    <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token function">createVNode</span><span class="token punctuation">(</span>rootComponent<span class="token punctuation">,</span> rootProps<span class="token punctuation">)</span>

    <span class="token comment">// 将 vnode 渲染到 dom 容器中</span>
    <span class="token function">render</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> rootContainer<span class="token punctuation">,</span> namespace<span class="token punctuation">)</span>
    <span class="token comment">// 注意这个 render 就是前面提到的渲染器，他是作为 createAppAPI 的参数进入 mount 方法中的</span>

    <span class="token comment">// 返回应用实例</span>
    <span class="token keyword">return</span> <span class="token function">getComponentPublicInstance</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>component<span class="token operator">!</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">App has already been mounted.\\n</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">If you want to remount the same app, move your app creation logic </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">into a factory function and create fresh app instances for each </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">mount - e.g. \\\`const createMyApp = () =&gt; createApp(App)\\\`</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>createVNode 内部实现</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
<span class="token keyword">export</span> <span class="token keyword">const</span> createVNode <span class="token operator">=</span> <span class="token punctuation">(</span>
  __DEV__ <span class="token operator">?</span> createVNodeWithArgsTransform <span class="token operator">:</span> _createVNode
<span class="token punctuation">)</span>
<span class="token comment">// 开发环境下会多一步</span>
<span class="token keyword">const</span> <span class="token function-variable function">createVNodeWithArgsTransform</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token operator">...</span>args</span>
<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">_createVNode</span><span class="token punctuation">(</span>
    <span class="token operator">...</span><span class="token punctuation">(</span>vnodeArgsTransformer
      <span class="token operator">?</span> <span class="token function">vnodeArgsTransformer</span><span class="token punctuation">(</span>args<span class="token punctuation">,</span> currentRenderingInstance<span class="token punctuation">)</span>
      <span class="token operator">:</span> args<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 但是最终都是通过下面的函数创建的</span>
<span class="token comment">// 该函数主要的工作是一些标准化操作和标记操作</span>
<span class="token keyword">function</span> <span class="token function">_createVNode</span><span class="token punctuation">(</span>
  type <span class="token doc-comment comment">/**节点类型 */</span><span class="token punctuation">,</span>
  props <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token doc-comment comment">/** 属性列表 */</span><span class="token punctuation">,</span>
  children <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token doc-comment comment">/** 子节点 */</span><span class="token punctuation">,</span>
  patchFlag <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token literal-property property">dynamicProps</span><span class="token operator">:</span> string<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  isBlockNode <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token operator">:</span> VNode <span class="token punctuation">{</span>
  <span class="token comment">// 动态组件类型检测</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>type <span class="token operator">||</span> type <span class="token operator">===</span> <span class="token constant">NULL_DYNAMIC_COMPONENT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Invalid vnode type when creating vnode: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>type<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    type <span class="token operator">=</span> Comment
  <span class="token punctuation">}</span>

  <span class="token comment">// vnode 标准化</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isVNode</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// createVNode receiving an existing vnode. This happens in cases like</span>
    <span class="token comment">// &lt;component :is=&quot;vnode&quot;/&gt;</span>
    <span class="token comment">// #2078 make sure to merge refs during the clone instead of overwriting it</span>
    <span class="token keyword">const</span> cloned <span class="token operator">=</span> <span class="token function">cloneVNode</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> props<span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* mergeRef: true */</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">normalizeChildren</span><span class="token punctuation">(</span>cloned<span class="token punctuation">,</span> children<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isBlockTreeEnabled <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isBlockNode <span class="token operator">&amp;&amp;</span> currentBlock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>cloned<span class="token punctuation">.</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">COMPONENT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        currentBlock<span class="token punctuation">[</span>currentBlock<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> cloned
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        currentBlock<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cloned<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    cloned<span class="token punctuation">.</span>patchFlag <span class="token operator">=</span> PatchFlags<span class="token punctuation">.</span><span class="token constant">BAIL</span>
    <span class="token keyword">return</span> cloned
  <span class="token punctuation">}</span>

  <span class="token comment">// 类组件标准化</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isClassComponent</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    type <span class="token operator">=</span> type<span class="token punctuation">.</span>__vccOpts
  <span class="token punctuation">}</span>

  <span class="token comment">// 兼容 2.x 组件</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>__COMPAT__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    type <span class="token operator">=</span> <span class="token function">convertLegacyComponent</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> currentRenderingInstance<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 标准化props</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// for reactive or proxy objects, we need to clone it to enable mutation.</span>
    props <span class="token operator">=</span> <span class="token function">guardReactiveProps</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token operator">!</span>
    <span class="token keyword">let</span> <span class="token punctuation">{</span> <span class="token keyword">class</span><span class="token operator">:</span> klass<span class="token punctuation">,</span> style <span class="token punctuation">}</span> <span class="token operator">=</span> props
    <span class="token keyword">if</span> <span class="token punctuation">(</span>klass <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isString</span><span class="token punctuation">(</span>klass<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      props<span class="token punctuation">.</span>class <span class="token operator">=</span> <span class="token function">normalizeClass</span><span class="token punctuation">(</span>klass<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>style<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// reactive state objects need to be cloned since they are likely to be</span>
      <span class="token comment">// mutated</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isProxy</span><span class="token punctuation">(</span>style<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isArray</span><span class="token punctuation">(</span>style<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        style <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> style<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      props<span class="token punctuation">.</span>style <span class="token operator">=</span> <span class="token function">normalizeStyle</span><span class="token punctuation">(</span>style<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// shapeFlag 是vnode节点类型标记，更新时优化依据</span>
  <span class="token keyword">const</span> shapeFlag <span class="token operator">=</span> <span class="token function">isString</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ELEMENT</span>
    <span class="token operator">:</span> __FEATURE_SUSPENSE__ <span class="token operator">&amp;&amp;</span> <span class="token function">isSuspense</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
      <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">SUSPENSE</span>
      <span class="token operator">:</span> <span class="token function">isTeleport</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
        <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">TELEPORT</span>
        <span class="token operator">:</span> <span class="token function">isObject</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
          <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">STATEFUL_COMPONENT</span>
          <span class="token operator">:</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
            <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">FUNCTIONAL_COMPONENT</span>
            <span class="token operator">:</span> <span class="token number">0</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">STATEFUL_COMPONENT</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isProxy</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    type <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Vue received a Component that was made a reactive object. This can </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">lead to unnecessary performance overhead and should be avoided by </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">marking the component with \\\`markRaw\\\` or using \\\`shallowRef\\\` </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">instead of \\\`ref\\\`.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">\\nComponent that was made reactive: </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      type<span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 正在的创建vnode的过程</span>
  <span class="token keyword">return</span> <span class="token function">createBaseVNode</span><span class="token punctuation">(</span>
    type<span class="token punctuation">,</span>
    props<span class="token punctuation">,</span>
    children<span class="token punctuation">,</span>
    patchFlag<span class="token punctuation">,</span>
    dynamicProps<span class="token punctuation">,</span>
    shapeFlag<span class="token punctuation">,</span>
    isBlockNode<span class="token punctuation">,</span>
    <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>createBaseVNode 内部实现</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 正在的创建vnode的过程</span>
<span class="token keyword">function</span> <span class="token function">createBaseVNode</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">type</span><span class="token operator">:</span> VNodeTypes <span class="token operator">|</span> ClassComponent <span class="token operator">|</span> <span class="token keyword">typeof</span> <span class="token constant">NULL_DYNAMIC_COMPONENT</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">(</span>Data <span class="token operator">&amp;</span> VNodeProps<span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> unknown <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  patchFlag <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token literal-property property">dynamicProps</span><span class="token operator">:</span> string<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  shapeFlag <span class="token operator">=</span> type <span class="token operator">===</span> Fragment <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ELEMENT</span><span class="token punctuation">,</span>
  isBlockNode <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  needFullChildrenNormalization <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 初始化 vnode 参数</span>
  <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">__v_isVNode</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">__v_skip</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    type<span class="token punctuation">,</span>
    props<span class="token punctuation">,</span>
    <span class="token literal-property property">key</span><span class="token operator">:</span> props <span class="token operator">&amp;&amp;</span> <span class="token function">normalizeKey</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">ref</span><span class="token operator">:</span> props <span class="token operator">&amp;&amp;</span> <span class="token function">normalizeRef</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">scopeId</span><span class="token operator">:</span> currentScopeId<span class="token punctuation">,</span>
    <span class="token literal-property property">slotScopeIds</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    children<span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">suspense</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">ssContent</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">ssFallback</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">dirs</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">transition</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">anchor</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">targetAnchor</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">staticCount</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    shapeFlag<span class="token punctuation">,</span>
    patchFlag<span class="token punctuation">,</span>
    dynamicProps<span class="token punctuation">,</span>
    <span class="token literal-property property">dynamicChildren</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">appContext</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">ctx</span><span class="token operator">:</span> currentRenderingInstance<span class="token punctuation">,</span>
  <span class="token punctuation">}</span> <span class="token keyword">as</span> VNode

  <span class="token keyword">if</span> <span class="token punctuation">(</span>needFullChildrenNormalization<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">normalizeChildren</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> children<span class="token punctuation">)</span>
    <span class="token comment">// normalize suspense children</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>__FEATURE_SUSPENSE__ <span class="token operator">&amp;&amp;</span> shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">SUSPENSE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token punctuation">;</span><span class="token punctuation">(</span>type <span class="token keyword">as</span> <span class="token keyword">typeof</span> SuspenseImpl<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">normalize</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// compiled element vnode - if children is passed, only possible types are</span>
    <span class="token comment">// string or Array.</span>
    vnode<span class="token punctuation">.</span>shapeFlag <span class="token operator">|=</span> <span class="token function">isString</span><span class="token punctuation">(</span>children<span class="token punctuation">)</span>
      <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">TEXT_CHILDREN</span>
      <span class="token operator">:</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ARRAY_CHILDREN</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// validate key</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> vnode<span class="token punctuation">.</span>key <span class="token operator">!==</span> vnode<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">VNode created with invalid key (NaN). VNode type:</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>type<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// track vnode for block tree</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>
    isBlockTreeEnabled <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
    <span class="token comment">// avoid a block node from tracking itself</span>
    <span class="token operator">!</span>isBlockNode <span class="token operator">&amp;&amp;</span>
    <span class="token comment">// has current parent block</span>
    currentBlock <span class="token operator">&amp;&amp;</span>
    <span class="token comment">// presence of a patch flag indicates this node needs patching on updates.</span>
    <span class="token comment">// component nodes also should always be patched, because even if the</span>
    <span class="token comment">// component doesn&#39;t need to update, it needs to persist the instance on to</span>
    <span class="token comment">// the next vnode so that it can be properly unmounted later.</span>
    <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>patchFlag <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">||</span> shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">COMPONENT</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token comment">// the EVENTS flag is only for hydration and if it is the only flag, the</span>
    <span class="token comment">// vnode should not be considered dynamic due to handler caching.</span>
    vnode<span class="token punctuation">.</span>patchFlag <span class="token operator">!==</span> PatchFlags<span class="token punctuation">.</span><span class="token constant">NEED_HYDRATION</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    currentBlock<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>__COMPAT__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">convertLegacyVModelProps</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span>
    <span class="token function">defineLegacyVNodeProperties</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> vnode
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来看看 真正 render 的过程。我们将视角再次回到渲染器中。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> isFlushing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token literal-property property">render</span><span class="token operator">:</span> <span class="token function-variable function">RootRenderFunction</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container<span class="token punctuation">,</span> namespace</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 1. 如果 vnode 不存在，则认为是卸载阶段</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>container<span class="token punctuation">.</span>_vnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">unmount</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span>_vnode<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 2. 否则进入加载阶段</span>
    <span class="token function">patch</span><span class="token punctuation">(</span>
      <span class="token comment">// 4. 将旧参数作为第一个参数，如果没有旧参数则为 null</span>
      <span class="token comment">// 这是 mount 还是 update 的判断依据</span>
      container<span class="token punctuation">.</span>_vnode <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
      <span class="token comment">// 这是最新的 vnode</span>
      vnode<span class="token punctuation">,</span>
      container<span class="token punctuation">,</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span>
      namespace
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isFlushing<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    isFlushing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token function">flushPreFlushCbs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">flushPostFlushCbs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    isFlushing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 3. 并且将最新的 vnode 放在容器的 _vnode 属性上</span>
  container<span class="token punctuation">.</span>_vnode <span class="token operator">=</span> vnode<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>patch 的内部实现</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,28)]))}const u=s(e,[["render",o],["__file","🚀超详细解读vue3.2源码——组件渲染流程.html.vue"]]);export{u as default};
