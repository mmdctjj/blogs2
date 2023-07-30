import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as p}from"./app-b1683649.js";const t={},e=p(`<blockquote><p>未经允许禁止转载, 微信公众号：「萌萌哒草头将军」<br> 超级简单的图算法，图文并茂，学不会，你来打我</p></blockquote><h3 id="认识图" tabindex="-1"><a class="header-anchor" href="#认识图" aria-hidden="true">#</a> 认识图</h3><p>图是由<code>节点</code>集合和<code>边（路径）</code>集合组成的图形</p><p>如果图是有方向的，那就称为有序图，否则称为无序图</p><figure><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6082685333004cf6b67acaf168ac1bf9~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>如果每条<code>路径</code>有<code>成本</code>或者<code>权重</code>，那么图就是<code>有权图</code></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06ce6d8bec0f4396974f6bda90eb99aa~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" loading="lazy"><br><code>无权图</code>可以认为是权重相同的<code>有权图</code></p><h3 id="最小生成树" tabindex="-1"><a class="header-anchor" href="#最小生成树" aria-hidden="true">#</a> 最小生成树</h3><p>在描述<code>图</code>时，我们通常根据边的<code>权重</code>将图转为<code>最小生成树</code>，因为<code>最小生成树</code>可以包含所有节点信息和最少的边，可以使计算量缩减到最小</p><p>例如上图的最小生成树如下</p><figure><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2102ef4932314a89a75f858d91b1d694~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>有两种方法将图转为最小生成树</p><h4 id="kruskal-克鲁斯卡尔-算法" tabindex="-1"><a class="header-anchor" href="#kruskal-克鲁斯卡尔-算法" aria-hidden="true">#</a> kruskal（克鲁斯卡尔）算法</h4><p>思路：根据<code>权重</code>，将边排序，每次从边中选择权重最小的边，如果使图<code>连通(形成环)</code>了，那就放弃这条边</p><p>上图中加入边的顺序以此为：（2-&gt;5, 1）、（5-&gt;6, 2）、（6-&gt;3, 3）、（4-&gt;1, 3）、（5-&gt;4, 5）</p><h4 id="prim-普里姆" tabindex="-1"><a class="header-anchor" href="#prim-普里姆" aria-hidden="true">#</a> prim（普里姆）</h4><p>思路：从一个节点出发，在所有连接的可选值只保留<code>代价</code>最小的边，例如上图，从<code>节点1</code>开始经过该算法后最小生成树是这样的</p><p>节点1：可选边为（1-&gt;2, 6）、（1-&gt;4, 3），只能选：<code>（1-&gt;4, 3）</code></p><p>节点1、4：可选边为（1-&gt;2, 6）、（4-&gt;5, 5）只能选：<code>（4-&gt;5, 5）</code></p><p>节点1、4、5：可选边为（5-&gt;2, 1）、（1-&gt;2, 6）、（5-&gt;6, 2）只能选<code>（5-&gt;2, 1）</code></p><p>节点1、4、5、2：可选边为（5-&gt;6, 2）、（1-&gt;2, 6）、（2-&gt;3, 4）只能选<code>（5-&gt;6, 2）</code></p><p>节点1、4、5、2、6：可选边为（1-&gt;2, 6）、（2-&gt;3, 4）、（6-&gt;3, 3）只能选<code>（6-&gt;3, 3）</code></p><p>好了现在可以按照树的形式表示图了</p><h3 id="描述节点" tabindex="-1"><a class="header-anchor" href="#描述节点" aria-hidden="true">#</a> 描述节点</h3><p>描述每个节点需要唯一标识，这样方便后续对每个节点的操作，所以我们先定义下面的类来描述节点</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vertex</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter">uuid</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>uuid <span class="token operator">=</span> uuid
        <span class="token comment">// ...你可以在这里添加others props</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定义边" tabindex="-1"><a class="header-anchor" href="#定义边" aria-hidden="true">#</a> 定义边</h3><p>描述边成熟的做法是使用<code>邻接表</code>或者<code>邻接数组</code></p><p><code>邻接表</code>是一个描述每个节点相关边的对象，它以每个节点的ID为<code>key</code>，与之相连的边数组集合作为<code>value</code>，例如上图中的每个节点的邻接表如下所示：</p><figure><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/991e59c9d88143aaa1382da2d9681691~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p><code>邻接数组</code>是用二维数组的方式描述</p><blockquote><p>你可能习惯性的想在节点上标记每个节点相关边的信息，这样的是可以的，<br> 但是对于后续的查询和变更，会消耗很大的性能，</p><p>同样，你如果想单独定义一个边的类描述边信息，也是一样的损耗性能。</p></blockquote><h3 id="实现图" tabindex="-1"><a class="header-anchor" href="#实现图" aria-hidden="true">#</a> 实现图</h3><p>现在就让我们开始实现基本的属性和功能吧</p><h4 id="属性" tabindex="-1"><a class="header-anchor" href="#属性" aria-hidden="true">#</a> 属性</h4><p>首先是定义<code>Graph</code>类，需要<code>vertexs</code>数组存放所有的节点，需要<code>edges</code>对象存放邻接表</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Graph</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">vertexNumber</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>vertexs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 存放节点</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>edges <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 存放邻接表</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>marked <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 记录标记</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="addnodes方法" tabindex="-1"><a class="header-anchor" href="#addnodes方法" aria-hidden="true">#</a> <code>addNodes</code>方法</h4><p>增加节点，除了初始化节点之外，需要初始化新节点的邻接表和标记状态</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Graph</span> <span class="token punctuation">{</span>
    <span class="token comment">// 增加节点</span>
    <span class="token function">addNodes</span> <span class="token punctuation">(</span><span class="token parameter">uuid</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>vertexs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Vertex</span><span class="token punctuation">(</span>uuid<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>edges<span class="token punctuation">[</span>uuid<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>marked<span class="token punctuation">[</span>uuid<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="addedges方法" tabindex="-1"><a class="header-anchor" href="#addedges方法" aria-hidden="true">#</a> <code>addEdges</code>方法</h4><p>增加边的本质就是增加邻接表信息</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Graph</span> <span class="token punctuation">{</span>
    <span class="token comment">// 增加边</span>
    <span class="token function">addEdges</span> <span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 分别给对方的邻接表添加边</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>edges<span class="token punctuation">[</span>source<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>edges<span class="token punctuation">[</span>target<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="showgraoh方法" tabindex="-1"><a class="header-anchor" href="#showgraoh方法" aria-hidden="true">#</a> <code>showGraoh</code>方法</h4><p>展示图时，我们是通过展示邻接表来展示图的，所以邻接表就是图的精髓所在，后面的方法主要是操作邻接表</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Graph</span> <span class="token punctuation">{</span>
    <span class="token comment">// 展示图</span>
    <span class="token function">showGraoh</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>vertexs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">vertex</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
            vertex<span class="token punctuation">.</span>uuid<span class="token punctuation">,</span>
            <span class="token string">&#39;-&gt;&#39;</span><span class="token punctuation">,</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>edges<span class="token punctuation">[</span>vertex<span class="token punctuation">.</span>uuid<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加测试数据</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> graph <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Graph</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> graph<span class="token punctuation">.</span><span class="token function">addNodes</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span>

graph<span class="token punctuation">.</span><span class="token function">addEdges</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
graph<span class="token punctuation">.</span><span class="token function">addEdges</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
graph<span class="token punctuation">.</span><span class="token function">addEdges</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
graph<span class="token punctuation">.</span><span class="token function">addEdges</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
graph<span class="token punctuation">.</span><span class="token function">addEdges</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
graph<span class="token punctuation">.</span><span class="token function">addEdges</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>

graph<span class="token punctuation">.</span><span class="token function">showGraoh</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 1 &#39;-&gt;&#39; &#39;2,3,4&#39;</span>
<span class="token comment">// 2 &#39;-&gt;&#39; &#39;1,5&#39;</span>
<span class="token comment">// 3 &#39;-&gt;&#39; &#39;1,4&#39;</span>
<span class="token comment">// 4 &#39;-&gt;&#39; &#39;1,3&#39;</span>
<span class="token comment">// 5 &#39;-&gt;&#39; &#39;2,6&#39;</span>
<span class="token comment">// 6 &#39;-&gt;&#39; &#39;5&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时的树为下图所示</p><figure><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94cef034d8fb43199f369e0fb4a16c77~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="深度优先和广度优先" tabindex="-1"><a class="header-anchor" href="#深度优先和广度优先" aria-hidden="true">#</a> 深度优先和广度优先</h3><p>遍历图中每个节点，根据不同的策略，节点的遍历顺序也不相同，最常见的是<code>深度优先(dfs)</code>、<code>广度优先(bfs)</code></p><h4 id="深度优先" tabindex="-1"><a class="header-anchor" href="#深度优先" aria-hidden="true">#</a> 深度优先</h4><p><code>深度优先(dfs)</code>是指每次优先遍历子节点，没有子节点时再回到兄弟节点，以此类推</p><figure><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89846f95497b494b9cfad4082f8c6c90~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><blockquote><p>这里为了避免标记混乱，使用了单独的变量visited标记深度优先，它和marked一样</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 深度优先搜索</span>
<span class="token function">dfs</span> <span class="token punctuation">(</span><span class="token parameter">uuid</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>visited<span class="token punctuation">[</span>uuid<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token comment">// 深度优先单独标记，以免影响广度优先算法和最短路径算法</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;dfs&#39;</span><span class="token punctuation">,</span> uuid<span class="token punctuation">)</span>
    <span class="token comment">// 循环邻接表中子节点</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>edges<span class="token punctuation">[</span>uuid<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">edge</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果没有标记，就继续下钻</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>visited<span class="token punctuation">[</span>edge<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">dfs</span><span class="token punctuation">(</span>edge<span class="token punctuation">)</span> <span class="token comment">// 递归</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="广度优先" tabindex="-1"><a class="header-anchor" href="#广度优先" aria-hidden="true">#</a> 广度优先</h4><p><code>广度优先(bfs)</code>是指每次兄弟节点优先遍历，没有兄弟节点时，在遍历子节点的兄弟节点，以此类推</p><figure><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a22b4161448649c79bf5ba642b196709~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>它是通过队列实现的：</p><ol><li>先初始化一个空队列</li><li>将起始节点放入队列</li><li>弹出队列第一个节点，并且访问它子节点</li><li>如果没有被标记，那就标记它，并放入队列</li><li>开始循环第三步，直到队列为空</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code> <span class="token comment">// 广度优先搜索</span>
<span class="token function">bfs</span> <span class="token punctuation">(</span><span class="token parameter">uuid</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1.先初始化一个空队列</span>
    <span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>marked<span class="token punctuation">[</span>uuid<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token comment">// 2.将起始节点放入队列</span>
    queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>uuid<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;bfs&#39;</span><span class="token punctuation">,</span> uuid<span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 3.弹出队列第一个节点，并且访问它子节点</span>
        <span class="token keyword">const</span> uuid_ <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>edges<span class="token punctuation">[</span>uuid_<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">edge</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// 4.如果没有被标记，那就标记它，并放入队列</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>marked<span class="token punctuation">[</span>edge<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>marked<span class="token punctuation">[</span>edge<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;bfs&#39;</span><span class="token punctuation">,</span> edge<span class="token punctuation">)</span>
                queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>edge<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>graph<span class="token punctuation">.</span><span class="token function">dfs</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;=========&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
graph<span class="token punctuation">.</span><span class="token function">bfs</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token comment">// dfs 1</span>
<span class="token comment">// dfs 2</span>
<span class="token comment">// dfs 5</span>
<span class="token comment">// dfs 6</span>
<span class="token comment">// dfs 3</span>
<span class="token comment">// dfs 4</span>
<span class="token comment">// &lt;=========&gt;</span>
<span class="token comment">// bfs 1</span>
<span class="token comment">// bfs 2</span>
<span class="token comment">// bfs 3</span>
<span class="token comment">// bfs 4</span>
<span class="token comment">// bfs 5</span>
<span class="token comment">// bfs 6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="最短路径" tabindex="-1"><a class="header-anchor" href="#最短路径" aria-hidden="true">#</a> 最短路径</h3><p>图经常被用到的地方其实查询从某个节点到另一个节点的最短距离，比如，从你的住处到公司，在四通八达的北京，道路可能不止一条，但是总有一条是最短的</p><p>求最短路径的算法有多种，今天介绍<code>bfs最短距离</code>，顾名思义，就是借助广度优先算法实现的</p><p>在广度优先算法中，我们遍历节点的每个子节点时，总会遇到一个没有被标记的节点，此时，我们需要记录这个没有被标记的节点的父节点，并将这些信息记录在<code>edgeTo</code>属性中。</p><p>完成广度优先算法后，我们就可以知道每个子节点对应的父节点了，接着我们只需要从目标节点，往上逆推，找到它的父节点，然后在往上推，知道源节点或者根节点，下面是以跟节点为例的实现</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 记得添加这个属性</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>edgeTo <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 对广度优先搜索改造</span>
<span class="token function">bfs</span> <span class="token punctuation">(</span><span class="token parameter">uuid</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>marked<span class="token punctuation">[</span>uuid<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
    queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>uuid<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;bfs&#39;</span><span class="token punctuation">,</span> uuid<span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> uuid_ <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>edges<span class="token punctuation">[</span>uuid_<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">edge</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>marked<span class="token punctuation">[</span>edge<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>edgeTo<span class="token punctuation">[</span>edge<span class="token punctuation">]</span> <span class="token operator">=</span> uuid_ <span class="token comment">// 记录每个节点的父节点</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>marked<span class="token punctuation">[</span>edge<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;bfs&#39;</span><span class="token punctuation">,</span> edge<span class="token punctuation">)</span>
                queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>edge<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>edgeTo<span class="token punctuation">)</span> <span class="token comment">// 打印每个节点对应父节点的信息</span>
<span class="token punctuation">}</span>
<span class="token comment">// 找出目标节点到根节点的路径</span>
<span class="token function">pathTo</span> <span class="token punctuation">(</span><span class="token parameter">uuid</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> source <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vertexs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>uuid
    <span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>marked<span class="token punctuation">[</span>uuid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> uuid<span class="token punctuation">;</span> i <span class="token operator">!==</span> source<span class="token punctuation">;</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>edgeTo<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            path<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    path<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
    <span class="token keyword">return</span> path
<span class="token punctuation">}</span>
<span class="token comment">// 格式化展示</span>
<span class="token function">printMinPathTo</span> <span class="token punctuation">(</span><span class="token parameter">uuid</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">pathTo</span><span class="token punctuation">(</span>uuid<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;-&gt;&#39;</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="测试-1" tabindex="-1"><a class="header-anchor" href="#测试-1" aria-hidden="true">#</a> 测试</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>graph<span class="token punctuation">.</span><span class="token function">printMinPathTo</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>

<span class="token comment">// 依次打印</span>
<span class="token comment">// {</span>
<span class="token comment">//   2: 1,</span>
<span class="token comment">//   3: 1,</span>
<span class="token comment">//   4: 1,</span>
<span class="token comment">//   5: 2,</span>
<span class="token comment">//   6: 5</span>
<span class="token comment">// }</span>
<span class="token comment">// 6-&gt;5-&gt;2-&gt;1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，分享就到这了，欢迎指正出现的问题</p>`,74),c=[e];function o(i,u){return s(),a("div",null,c)}const k=n(t,[["render",o],["__file","【数据结构】超级简单的图算法，图文并茂，学不会你来打我.html.vue"]]);export{k as default};
