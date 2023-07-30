import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as n,b as s,e as t,f as p}from"./app-c11278b9.js";const l={},u=p('<blockquote><p>文章同步在公众号：萌萌哒草头将军，欢迎关注！</p></blockquote><h3 id="需求背景" tabindex="-1"><a class="header-anchor" href="#需求背景" aria-hidden="true">#</a> 需求背景</h3><p>前几天我们的客户对我们组的客户经理提了个需求，每次上线前端页面需要在HTML里给定版本信息，因为我们客户单位会定期爬取版本信息进行汇总展示在大屏。</p><p>版本信息要求如下：</p><ul><li>上线日期</li><li>上线内容描述</li><li>对应git提交ID</li><li>对应项目的版本号</li></ul><h3 id="调研" tabindex="-1"><a class="header-anchor" href="#调研" aria-hidden="true">#</a> 调研</h3><p>我立马想到使用插件，前几天我已经将项目脚手架换成vite了，我找了一圈，发现了几个相似的需求，不过都是直接生成 meta 标签，跟我的需求不符</p><p>（我的需求是让版本信息成为入口标签的属性），</p><p>他们分别是下面几个库，希望可以帮到大家</p>',9),r={href:"https://www.npmjs.com/package/vite-plugin-version-mark",target:"_blank",rel:"noopener noreferrer"},d={href:"https://www.npmjs.com/package/git-commit-info-plugin",target:"_blank",rel:"noopener noreferrer"},k=n("p",null,"可以满足我的需求的插件基本上没有",-1),m={href:"https://juejin.cn/post/7253734111663079484?share_token=6ed05d2d-5782-4fda-a361-988951a9f377",target:"_blank",rel:"noopener noreferrer"},v=p(`<p>基于前面几次的插件经验，我又打算自己开发插件满足自己的需求。</p><h3 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h3><p>下面是我本地的初始版本，使用 vite 特有的钩子 transformIndexHtml ，</p><p>我们通过 childProcess 同步的方式访问 git 信息，</p><p>通过 jsdom 库将html字符串转化为 dom 对象插入信息，最后序列化为字符串返回即可。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> childProcess <span class="token keyword">from</span> <span class="token string">&#39;child_process&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">JSDOM</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;jsdom&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> moment <span class="token keyword">from</span> <span class="token string">&#39;moment&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">AddCommitAndVersion</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;add-commit-and-version&#39;</span><span class="token punctuation">,</span>
    <span class="token function">transformIndexHtml</span> <span class="token punctuation">(</span><span class="token parameter">html</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

      <span class="token keyword">const</span> commitID <span class="token operator">=</span> childProcess<span class="token punctuation">.</span><span class="token function">execSync</span><span class="token punctuation">(</span><span class="token string">&#39;git rev-parse --short HEAD&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">encoding</span><span class="token operator">:</span> <span class="token string">&#39;utf-8&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> commitInfo <span class="token operator">=</span> childProcess<span class="token punctuation">.</span><span class="token function">execSync</span><span class="token punctuation">(</span><span class="token string">&#39;git log -3 --pretty=&quot;%s&quot;&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">encoding</span><span class="token operator">:</span> <span class="token string">&#39;utf-8&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token keyword">const</span> dom <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSDOM</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>
      <span class="token keyword">const</span> document <span class="token operator">=</span> dom<span class="token punctuation">.</span>window<span class="token punctuation">.</span>document
      <span class="token keyword">const</span> container <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span>
      container<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;commitID&quot;</span><span class="token punctuation">,</span> commitID<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      container<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;verion&quot;</span><span class="token punctuation">,</span> <span class="token function">moment</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">YYYY.MM.DD.HH:mm:ss</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      container<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;description&quot;</span><span class="token punctuation">,</span> commitInfo<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">return</span> dom<span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了可以让更多的人方便用，我们在此基础上提供更多的灵活性。所以我们定义如下的签名</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">interface</span> <span class="token class-name">OptionProps</span> <span class="token punctuation">{</span>

  <span class="token doc-comment comment">/**
   * 挂载信息的节点，该值为 querySelector 参数
   * 默认：body标签
   */</span>
  root<span class="token operator">?</span><span class="token operator">:</span> string

  <span class="token doc-comment comment">/**
   * moment日期格式
   * 默认：YYYY-MM-DD HH:mm:ss
   */</span>
  dateFormat<span class="token operator">?</span><span class="token operator">:</span> string

  <span class="token doc-comment comment">/**
   * commitID，如果为true，则表示禁用，不显示
   * 默认：打包分支，最后一次提交commitID
   */</span>
  commitID<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> <span class="token boolean">true</span>

  <span class="token doc-comment comment">/**
   * 版本号，如果为true，则表示禁用，不显示
   * 默认: 打包时间，格式取决于 dateFormat
   */</span>
  verion<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> <span class="token boolean">true</span>

  <span class="token doc-comment comment">/**
   * 版本描述，如果为true，则表示禁用，不显示
   * 默认: 最近三次commit内容，使用\`、\`隔开
   */</span>
  description<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> <span class="token boolean">true</span>

  <span class="token doc-comment comment">/**
   * 扩展字段
   * 默认 null
   */</span>
  extendInfo<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">[</span>key <span class="token keyword">in</span> string<span class="token punctuation">]</span><span class="token operator">:</span> string<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了预设的信息外，我还新增了扩展信息的字段，方便面对更多需求。</p><p>扩展之后的代码如下，主要是解析配置文件。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> childProcess <span class="token keyword">from</span> <span class="token string">&#39;child_process&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">JSDOM</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;jsdom&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> moment <span class="token keyword">from</span> <span class="token string">&#39;moment&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token parameter">option</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

  <span class="token keyword">let</span> <span class="token punctuation">{</span>
    dateFormat <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">YYYY.MM.DD.HH:mm:ss</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    commitID<span class="token punctuation">,</span>
    verion<span class="token punctuation">,</span>
    description<span class="token punctuation">,</span>
    extendInfo <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    root <span class="token operator">=</span> <span class="token string">&#39;body&#39;</span>
  <span class="token punctuation">}</span> <span class="token operator">=</span> option <span class="token operator">??</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;vate-plugin-add-commit-info&#39;</span><span class="token punctuation">,</span>
    <span class="token function">transformIndexHtml</span> <span class="token punctuation">(</span><span class="token parameter">html</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

      <span class="token keyword">const</span> dom <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSDOM</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>
      <span class="token keyword">const</span> document <span class="token operator">=</span> dom<span class="token punctuation">.</span>window<span class="token punctuation">.</span>document
      <span class="token keyword">const</span> container <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span>

      <span class="token comment">// 最后一次提交commit的ID</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>commitID <span class="token operator">!==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        commitID <span class="token operator">=</span> commitID
          <span class="token operator">?</span> commitID
          <span class="token operator">:</span> childProcess<span class="token punctuation">.</span><span class="token function">execSync</span><span class="token punctuation">(</span><span class="token string">&#39;git rev-parse --short HEAD&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">encoding</span><span class="token operator">:</span> <span class="token string">&#39;utf-8&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        container<span class="token operator">?.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;commitID&quot;</span><span class="token punctuation">,</span> commitID<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      
      <span class="token comment">// 版本信息，默认是当前打包的时间点</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>verion <span class="token operator">!==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        container<span class="token operator">?.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;verion&quot;</span><span class="token punctuation">,</span> verion <span class="token operator">??</span> <span class="token function">moment</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">?.</span><span class="token function">format</span><span class="token punctuation">(</span>dateFormat<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 描述信息，默认最近三次的commit描述</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>description <span class="token operator">!==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        description <span class="token operator">=</span> description
          <span class="token operator">?</span> description
          <span class="token operator">:</span> childProcess
            <span class="token punctuation">.</span><span class="token function">execSync</span><span class="token punctuation">(</span><span class="token string">&#39;git log -3 --pretty=&quot;%s&quot;&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">encoding</span><span class="token operator">:</span> <span class="token string">&#39;utf-8&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        
        container<span class="token operator">?.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;description&quot;</span><span class="token punctuation">,</span> description<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 自定义扩展字段</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>extendInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>extendInfo<span class="token punctuation">)</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>keys<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          keys<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=&gt;</span> container<span class="token operator">?.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> extendInfo<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      
      <span class="token keyword">return</span> dom<span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认效果如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> react <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-react&#39;</span>
<span class="token keyword">import</span> addCommitInfo <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-add-commit-info&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// https://vitejs.dev/config/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">addCommitInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">react</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00b83baec41b4e0cbc472916526a0a2d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>当使用配置时效果如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> react <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-react&#39;</span>
<span class="token keyword">import</span> addCommitInfo <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-add-commit-info&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// https://vitejs.dev/config/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">addCommitInfo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token string">&#39;#root&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&#39;test&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">react</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09795967d9c44b33ab34b71c7643768d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h3><p>我已经开源了，感兴趣的小伙伴可以下载体验一番。</p>`,19),b={href:"https://www.npmjs.com/package/vite-plugin-add-commit-info",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/mmdctjj/vite-plugin-add-commit-info",target:"_blank",rel:"noopener noreferrer"},f=n("p",null,"今天的分享就到这了，文章中有纰漏的地方欢迎指正。",-1);function y(w,h){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,n("p",null,[n("a",r,[s("https://www.npmjs.com/package/vite-plugin-version-mark"),t(a)])]),n("p",null,[n("a",d,[s("https://www.npmjs.com/package/git-commit-info-plugin"),t(a)])]),k,n("p",null,[s("推荐上篇 "),n("a",m,[s("面对躺平同事，我开发了一个vite插件，治好了我的精神内耗"),t(a)])]),v,n("p",null,[s("npm地址："),n("a",b,[s("https://www.npmjs.com/package/vite-plugin-add-commit-info"),t(a)])]),n("p",null,[s("github地址："),n("a",g,[s("https://github.com/mmdctjj/vite-plugin-add-commit-info"),t(a)])]),f])}const x=e(l,[["render",y],["__file","20230717.html.vue"]]);export{x as default};
