const n=JSON.parse(`{"key":"v-1fbc11a7","path":"/vue/%F0%9F%9A%80%E8%B6%85%E8%AF%A6%E7%BB%86%E8%A7%A3%E8%AF%BBvue3.2%E6%BA%90%E7%A0%81%E2%80%94%E2%80%94%E7%BB%84%E4%BB%B6%E6%B8%B2%E6%9F%93%E6%B5%81%E7%A8%8B.html","title":"🚀超详细解读vue3.2源码——组件渲染流程","lang":"zh-CN","frontmatter":{"title":"🚀超详细解读vue3.2源码——组件渲染流程","isTimeLine":true,"date":"2024-06-19T00:00:00.000Z","category":["前端"],"tag":["Vue"],"description":"欢迎关注我的公众号：萌萌哒草头将军 入口-&gt;全局初始化-&gt;生成 vnode-&gt;挂载 入口函数 export const createApp = (...args) =&gt; { // 1.创建实例 const app = ensureRenderer().createApp(...args); // 2. 重写实例的 mount 方法 const { mount } = app; app.mount = (containerOrSelector) =&gt; { const container = normalizeContainer(containerOrSelector); if (!container) return; const component = app._component; if (!isFunction(component) &amp;&amp; !component.render &amp;&amp; !component.template) { // __UNSAFE__ // Reason: potential execution of JS expressions in in-DOM template. // The user must make sure the in-DOM template is trusted. If it's // rendered by the server, the template should not contain any user data. component.template = container.innerHTML; // 2.x compat check if (__COMPAT__ &amp;&amp; __DEV__) { for (let i = 0; i &lt; container.attributes.length; i++) { const attr = container.attributes[i]; if (attr.name !== \\"v-cloak\\" &amp;&amp; /^(v-|:|@)/.test(attr.name)) { compatUtils.warnDeprecation( DeprecationTypes.GLOBAL_MOUNT_CONTAINER, null ); break; } } } } // clear content before mounting container.innerHTML = \\"\\"; const proxy = mount(container, false, resolveRootNamespace(container)); if (container instanceof Element) { container.removeAttribute(\\"v-cloak\\"); container.setAttribute(\\"data-v-app\\", \\"\\"); } return proxy; }; return app; };","head":[["meta",{"property":"og:url","content":"https://mmdctjj.github.io/blog2/blogs2/vue/%F0%9F%9A%80%E8%B6%85%E8%AF%A6%E7%BB%86%E8%A7%A3%E8%AF%BBvue3.2%E6%BA%90%E7%A0%81%E2%80%94%E2%80%94%E7%BB%84%E4%BB%B6%E6%B8%B2%E6%9F%93%E6%B5%81%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"萌萌哒草头将军"}],["meta",{"property":"og:title","content":"🚀超详细解读vue3.2源码——组件渲染流程"}],["meta",{"property":"og:description","content":"欢迎关注我的公众号：萌萌哒草头将军 入口-&gt;全局初始化-&gt;生成 vnode-&gt;挂载 入口函数 export const createApp = (...args) =&gt; { // 1.创建实例 const app = ensureRenderer().createApp(...args); // 2. 重写实例的 mount 方法 const { mount } = app; app.mount = (containerOrSelector) =&gt; { const container = normalizeContainer(containerOrSelector); if (!container) return; const component = app._component; if (!isFunction(component) &amp;&amp; !component.render &amp;&amp; !component.template) { // __UNSAFE__ // Reason: potential execution of JS expressions in in-DOM template. // The user must make sure the in-DOM template is trusted. If it's // rendered by the server, the template should not contain any user data. component.template = container.innerHTML; // 2.x compat check if (__COMPAT__ &amp;&amp; __DEV__) { for (let i = 0; i &lt; container.attributes.length; i++) { const attr = container.attributes[i]; if (attr.name !== \\"v-cloak\\" &amp;&amp; /^(v-|:|@)/.test(attr.name)) { compatUtils.warnDeprecation( DeprecationTypes.GLOBAL_MOUNT_CONTAINER, null ); break; } } } } // clear content before mounting container.innerHTML = \\"\\"; const proxy = mount(container, false, resolveRootNamespace(container)); if (container instanceof Element) { container.removeAttribute(\\"v-cloak\\"); container.setAttribute(\\"data-v-app\\", \\"\\"); } return proxy; }; return app; };"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T10:27:55.000Z"}],["meta",{"property":"article:author","content":"萌萌哒草头将军"}],["meta",{"property":"article:tag","content":"Vue"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T10:27:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"🚀超详细解读vue3.2源码——组件渲染流程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T10:27:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"萌萌哒草头将军\\",\\"url\\":\\"https://mmdctjj.github.io/blog2\\"}]}"]]},"headers":[],"git":{"createdTime":1719311275000,"updatedTime":1719311275000,"contributors":[{"name":"蒋鹏杰","email":"jiang_pengjie@foxmail.com","commits":1}]},"readingTime":{"minutes":7.41,"words":2222},"filePathRelative":"vue/🚀超详细解读vue3.2源码——组件渲染流程.md","localizedDate":"2024年6月19日","excerpt":"<blockquote>\\n<p>欢迎关注我的公众号：萌萌哒草头将军</p>\\n</blockquote>\\n<p>入口-&gt;全局初始化-&gt;生成 vnode-&gt;挂载</p>\\n<p>入口函数</p>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">createApp</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\"><span class=\\"token operator\\">...</span>args</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// 1.创建实例</span>\\n  <span class=\\"token keyword\\">const</span> app <span class=\\"token operator\\">=</span> <span class=\\"token function\\">ensureRenderer</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">createApp</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">...</span>args<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token comment\\">// 2. 重写实例的 mount 方法</span>\\n  <span class=\\"token keyword\\">const</span> <span class=\\"token punctuation\\">{</span> mount <span class=\\"token punctuation\\">}</span> <span class=\\"token operator\\">=</span> app<span class=\\"token punctuation\\">;</span>\\n  app<span class=\\"token punctuation\\">.</span><span class=\\"token function-variable function\\">mount</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">containerOrSelector</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">const</span> container <span class=\\"token operator\\">=</span> <span class=\\"token function\\">normalizeContainer</span><span class=\\"token punctuation\\">(</span>containerOrSelector<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">!</span>container<span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">return</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">const</span> component <span class=\\"token operator\\">=</span> app<span class=\\"token punctuation\\">.</span>_component<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">!</span><span class=\\"token function\\">isFunction</span><span class=\\"token punctuation\\">(</span>component<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&amp;&amp;</span> <span class=\\"token operator\\">!</span>component<span class=\\"token punctuation\\">.</span>render <span class=\\"token operator\\">&amp;&amp;</span> <span class=\\"token operator\\">!</span>component<span class=\\"token punctuation\\">.</span>template<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token comment\\">// __UNSAFE__</span>\\n      <span class=\\"token comment\\">// Reason: potential execution of JS expressions in in-DOM template.</span>\\n      <span class=\\"token comment\\">// The user must make sure the in-DOM template is trusted. If it's</span>\\n      <span class=\\"token comment\\">// rendered by the server, the template should not contain any user data.</span>\\n      component<span class=\\"token punctuation\\">.</span>template <span class=\\"token operator\\">=</span> container<span class=\\"token punctuation\\">.</span>innerHTML<span class=\\"token punctuation\\">;</span>\\n      <span class=\\"token comment\\">// 2.x compat check</span>\\n      <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>__COMPAT__ <span class=\\"token operator\\">&amp;&amp;</span> __DEV__<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">let</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> container<span class=\\"token punctuation\\">.</span>attributes<span class=\\"token punctuation\\">.</span>length<span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n          <span class=\\"token keyword\\">const</span> attr <span class=\\"token operator\\">=</span> container<span class=\\"token punctuation\\">.</span>attributes<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n          <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>attr<span class=\\"token punctuation\\">.</span>name <span class=\\"token operator\\">!==</span> <span class=\\"token string\\">\\"v-cloak\\"</span> <span class=\\"token operator\\">&amp;&amp;</span> <span class=\\"token regex\\"><span class=\\"token regex-delimiter\\">/</span><span class=\\"token regex-source language-regex\\">^(v-|:|@)</span><span class=\\"token regex-delimiter\\">/</span></span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">test</span><span class=\\"token punctuation\\">(</span>attr<span class=\\"token punctuation\\">.</span>name<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            compatUtils<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">warnDeprecation</span><span class=\\"token punctuation\\">(</span>\\n              DeprecationTypes<span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">GLOBAL_MOUNT_CONTAINER</span><span class=\\"token punctuation\\">,</span>\\n              <span class=\\"token keyword\\">null</span>\\n            <span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n          <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token punctuation\\">}</span>\\n      <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token comment\\">// clear content before mounting</span>\\n    container<span class=\\"token punctuation\\">.</span>innerHTML <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">const</span> proxy <span class=\\"token operator\\">=</span> <span class=\\"token function\\">mount</span><span class=\\"token punctuation\\">(</span>container<span class=\\"token punctuation\\">,</span> <span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">,</span> <span class=\\"token function\\">resolveRootNamespace</span><span class=\\"token punctuation\\">(</span>container<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>container <span class=\\"token keyword\\">instanceof</span> <span class=\\"token class-name\\">Element</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n      container<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">removeAttribute</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"v-cloak\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n      container<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">setAttribute</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"data-v-app\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">return</span> proxy<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token keyword\\">return</span> app<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{n as data};
