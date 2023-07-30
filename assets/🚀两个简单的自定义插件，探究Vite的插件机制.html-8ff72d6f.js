import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o,c,a as n,b as s,e as t,f as i}from"./app-b1683649.js";const l={},u=n("blockquote",null,[n("p",null,"文章首发公众号：萌萌哒草头将军，最近群里有抽奖，送出五本书，群里目前已经快20位小伙伴了，概率很大，感兴趣的小伙伴关注后联系我即可入群。个人联系方式：SunBoy_mmdctjj")],-1),r=n("p",{align:"center"},[n("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/379970510dc440e59ce70a298c2a3286~tplv-k3u1fbpfcp-watermark.image?",alt:"grif.gif",width:"50%"})],-1),k={href:"https://juejin.cn/post/7243975432088830009#heading-1",target:"_blank",rel:"noopener noreferrer"},d=n("h2",{id:"🚀-vite-插件机制",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#🚀-vite-插件机制","aria-hidden":"true"},"#"),s(" 🚀 Vite 插件机制")],-1),v=n("p",null,"Vite 的插件机制是基于 Rollup 的插件机制实现的，但是又进行了一些扩展。Vite 的插件机制是通过钩子函数实现的，当 Vite 运行时，会通过钩子函数调用插件中的方法，插件可以在这些方法中干预 Vite 的构建过程。",-1),m=n("p",null,"我们主要讨论插件的机制，API 详细请看官网介绍",-1),b={href:"https://cn.vitejs.dev/guide/api-plugin.html#universal-hooks",target:"_blank",rel:"noopener noreferrer"},g={href:"https://cn.vitejs.dev/guide/api-plugin.html#vite-specific-hooks",target:"_blank",rel:"noopener noreferrer"},f=i(`<p>下面我们看看插件的机制原理。</p><h3 id="🚗-rollup-插件机制" tabindex="-1"><a class="header-anchor" href="#🚗-rollup-插件机制" aria-hidden="true">#</a> 🚗 Rollup 插件机制</h3><p>Rollup 的插件机制实现主要基于两点:</p><ul><li>Rollup 维护了各个插件接口的 Hook 列表,插件可以向这些列表中添加回调函数。</li><li>在执行对应过程时,Rollup 会依次触发这些 Hook 列表中的回调函数。</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> hookLists <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">load</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// load hook 列表</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">addHook</span><span class="token punctuation">(</span><span class="token parameter">hookName<span class="token punctuation">,</span> hook</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  hookLists<span class="token punctuation">[</span>hookName<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>hook<span class="token punctuation">)</span>  <span class="token comment">// 向 hook 列表中添加回调函数</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> hook <span class="token keyword">of</span> hookLists<span class="token punctuation">.</span>load<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 触发所有 load 钩子函数</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">hook</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>  <span class="token comment">// 调用钩子函数</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token keyword">return</span> result  <span class="token comment">// 使用第一个结果并返回</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插件可以通过 Rollup 提供的 addHook 方法相对应的 Hook 列表中添加回调函数:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">myPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">addHook</span><span class="token punctuation">(</span><span class="token string">&#39;load&#39;</span><span class="token punctuation">,</span> <span class="token parameter">id</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  <span class="token comment">// 向 load 列表添加回调函数</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🚗-vite-的巧妙之处" tabindex="-1"><a class="header-anchor" href="#🚗-vite-的巧妙之处" aria-hidden="true">#</a> 🚗 Vite 的巧妙之处</h3><p>Vite 主要将用户插件排序，然后和内置的插件配置合并，传递给了 Rollup 打包。</p><p>关键的部分源码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// vite/node/config.ts</span>
<span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">resolveConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  
  <span class="token comment">// ...</span>
  
  <span class="token comment">// resolve plugins</span>
  <span class="token keyword">const</span> rawUserPlugins <span class="token operator">=</span> <span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token function">asyncFlatten</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>plugins <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">as</span> Plugin<span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>filterPlugin<span class="token punctuation">)</span>

  <span class="token keyword">const</span> <span class="token punctuation">[</span>prePlugins<span class="token punctuation">,</span> normalPlugins<span class="token punctuation">,</span> postPlugins<span class="token punctuation">]</span> <span class="token operator">=</span>
    <span class="token function">sortUserPlugins</span><span class="token punctuation">(</span>rawUserPlugins<span class="token punctuation">)</span>
  
  <span class="token comment">// run config hooks</span>
  <span class="token keyword">const</span> userPlugins <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>prePlugins<span class="token punctuation">,</span> <span class="token operator">...</span>normalPlugins<span class="token punctuation">,</span> <span class="token operator">...</span>postPlugins<span class="token punctuation">]</span>
  
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// vite/node/build.ts </span>
<span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">resolveConfig</span><span class="token punctuation">(</span>
    inlineConfig<span class="token punctuation">,</span>
    <span class="token string">&#39;build&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;production&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;production&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span>
  
  <span class="token comment">//...</span>
  
  <span class="token keyword">const</span> plugins <span class="token operator">=</span> <span class="token punctuation">(</span>
    ssr <span class="token operator">?</span> config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">p</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">injectSsrFlagToHooks</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> config<span class="token punctuation">.</span>plugins
  <span class="token punctuation">)</span> <span class="token keyword">as</span> Plugin<span class="token punctuation">[</span><span class="token punctuation">]</span>
  
  <span class="token keyword">const</span> <span class="token literal-property property">rollupOptions</span><span class="token operator">:</span> RollupOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">context</span><span class="token operator">:</span> <span class="token string">&#39;globalThis&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">preserveEntrySignatures</span><span class="token operator">:</span> ssr
      <span class="token operator">?</span> <span class="token string">&#39;allow-extension&#39;</span>
      <span class="token operator">:</span> libOptions
      <span class="token operator">?</span> <span class="token string">&#39;strict&#39;</span>
      <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">cache</span><span class="token operator">:</span> config<span class="token punctuation">.</span>build<span class="token punctuation">.</span>watch <span class="token operator">?</span> <span class="token keyword">undefined</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token operator">...</span>options<span class="token punctuation">.</span>rollupOptions<span class="token punctuation">,</span>
    input<span class="token punctuation">,</span>
    plugins<span class="token punctuation">,</span>
    external<span class="token punctuation">,</span>
    <span class="token function">onwarn</span><span class="token punctuation">(</span><span class="token parameter">warning<span class="token punctuation">,</span> warn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">onRollupWarning</span><span class="token punctuation">(</span>warning<span class="token punctuation">,</span> warn<span class="token punctuation">,</span> config<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
  
  <span class="token comment">// ...</span>

  <span class="token comment">// write or generate files with rollup</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> rollup <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;rollup&#39;</span><span class="token punctuation">)</span>
  bundle <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">rollup</span><span class="token punctuation">(</span>rollupOptions<span class="token punctuation">)</span>
  
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Vite 使用插件时，需要将插件放入 plugins 的数组中如下：</p><figure><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7afd5d51db8741d98763651b168430d8~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h2 id="🚀-实践得真知" tabindex="-1"><a class="header-anchor" href="#🚀-实践得真知" aria-hidden="true">#</a> 🚀 实践得真知</h2><p>接下来我们自定义几个插件，感受下 Vite 的插件机制。</p><blockquote><p>写这几个插件是为了理解插件机制，官方已经提供了相关的配置或者现成的插件</p></blockquote><h3 id="🚗-自动切换端口-默认8080" tabindex="-1"><a class="header-anchor" href="#🚗-自动切换端口-默认8080" aria-hidden="true">#</a> 🚗 自动切换端口，默认<code>8080</code></h3><p>Vite 默认的端口不是 <code>8080</code>了，有点不太习惯，所以自己写个插件自动切换端口。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> net <span class="token keyword">from</span> <span class="token string">&#39;net&#39;</span>

<span class="token keyword">function</span> <span class="token function">getNextPort</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">port</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> server <span class="token operator">=</span> net<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    server<span class="token punctuation">.</span><span class="token function">unref</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    server<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token function">getNextPort</span><span class="token punctuation">(</span>port <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    server<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      server<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">autoSwitchPortPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> port <span class="token operator">=</span> <span class="token number">8080</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;auto-switch-port&#39;</span><span class="token punctuation">,</span>
    <span class="token keyword">async</span> <span class="token function">configResolved</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">config</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      port <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getNextPort</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span> <span class="token keyword">as</span> number
      config<span class="token punctuation">.</span>server<span class="token punctuation">.</span>port <span class="token operator">=</span> port
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> autoSwitchPortPlugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51b36f52134b402c82d75e3777bf41e2~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="🚗-为文件加上版本号" tabindex="-1"><a class="header-anchor" href="#🚗-为文件加上版本号" aria-hidden="true">#</a> 🚗 为文件加上版本号</h3><p>由于这个操作是转换 <code>index.html</code>文件，所以需要使用专用钩子<code>transformIndexHtml</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createHash <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;crypto&quot;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">autoVersionPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;auto-version&#39;</span><span class="token punctuation">,</span>
    <span class="token keyword">async</span> <span class="token function">transformIndexHtml</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">html</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> hash <span class="token operator">=</span> <span class="token function">createHash</span><span class="token punctuation">(</span><span class="token string">&#39;md5&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">digest</span><span class="token punctuation">(</span><span class="token string">&#39;hex&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> html<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(src|href)=&quot;(.*?)&quot;</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">$1=&quot;$2?v=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>hash<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/507505625f44426da3e6af23a2ea650c~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h2 id="🎉-总结" tabindex="-1"><a class="header-anchor" href="#🎉-总结" aria-hidden="true">#</a> 🎉 总结</h2><p>Vite 插件机制主要在整个构建过程的不同时机暴露出钩子函数供开发者灵活自定义构建过程。所以理解构建流程，才能更好的开发一个优秀的插件。</p><p>好了今天的分享就到这了，如果文中有纰漏的地方，欢迎指正！！！</p>`,28);function h(y,w){const a=e("ExternalLinkIcon");return o(),c("div",null,[u,r,n("p",null,[n("a",k,[s("阅读更多文章点这里"),t(a)])]),d,v,m,n("p",null,[s("通用的钩子："),n("a",b,[s("https://cn.vitejs.dev/guide/api-plugin.html#universal-hooks"),t(a)])]),n("p",null,[s("Vite 独有的钩子："),n("a",g,[s("https://cn.vitejs.dev/guide/api-plugin.html#vite-specific-hooks"),t(a)])]),f])}const j=p(l,[["render",h],["__file","🚀两个简单的自定义插件，探究Vite的插件机制.html.vue"]]);export{j as default};
