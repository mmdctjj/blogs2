const e=JSON.parse('{"key":"v-d1c1d7e6","path":"/vue/Vue3%E4%BC%98%E9%9B%85%E7%9A%84%E7%9B%91%E5%90%AClocalStorage%E5%8F%98%E5%8C%96.html","title":"Vue3优雅的监听localStorage变化","lang":"zh-CN","frontmatter":{"title":"Vue3优雅的监听localStorage变化","isTimeLine":true,"date":"2023-06-01T00:00:00.000Z","category":["前端"],"tag":["JavaScript","Vue"],"description":"文章同步在公众号： 萌萌哒草头将军 最近公众号有🎁，欢迎关注了解 最近在研究框架，也仔细用了Vue3一些功能，今天分享一次我的实践： Vue3如何监听localStorage的变化。 🎉干货满满，React设计原理(一)：藏在源码里的紧箍咒，几个容易混淆的变量🎉 🎉干货满满，React设计原理(二)：藏在源码里的两个圈，重要的链表结构和双缓存技术🎉","head":[["meta",{"property":"og:url","content":"https://mmdctjj.github.io/blog2/vue/Vue3%E4%BC%98%E9%9B%85%E7%9A%84%E7%9B%91%E5%90%AClocalStorage%E5%8F%98%E5%8C%96.html"}],["meta",{"property":"og:site_name","content":"萌萌哒草头将军"}],["meta",{"property":"og:title","content":"Vue3优雅的监听localStorage变化"}],["meta",{"property":"og:description","content":"文章同步在公众号： 萌萌哒草头将军 最近公众号有🎁，欢迎关注了解 最近在研究框架，也仔细用了Vue3一些功能，今天分享一次我的实践： Vue3如何监听localStorage的变化。 🎉干货满满，React设计原理(一)：藏在源码里的紧箍咒，几个容易混淆的变量🎉 🎉干货满满，React设计原理(二)：藏在源码里的两个圈，重要的链表结构和双缓存技术🎉"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-30T11:02:39.000Z"}],["meta",{"property":"article:author","content":"萌萌哒草头将军"}],["meta",{"property":"article:tag","content":"JavaScript"}],["meta",{"property":"article:tag","content":"Vue"}],["meta",{"property":"article:published_time","content":"2023-06-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-30T11:02:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vue3优雅的监听localStorage变化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-01T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-30T11:02:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"萌萌哒草头将军\\",\\"url\\":\\"https://mmdctjj.github.io/\\"}]}"]]},"headers":[{"level":3,"title":"💡 为什么要这样做？","slug":"💡-为什么要这样做","link":"#💡-为什么要这样做","children":[]},{"level":3,"title":"💎 思路","slug":"💎-思路","link":"#💎-思路","children":[]},{"level":3,"title":"💎 实现","slug":"💎-实现","link":"#💎-实现","children":[]},{"level":3,"title":"💎 测试","slug":"💎-测试","link":"#💎-测试","children":[]}],"git":{"createdTime":1690709319000,"updatedTime":1690714959000,"contributors":[{"name":"mmdctjj","email":"jiangpengjie@bizseer.com","commits":2}]},"readingTime":{"minutes":2.25,"words":674},"filePathRelative":"vue/Vue3优雅的监听localStorage变化.md","localizedDate":"2023年6月1日","excerpt":"<blockquote>\\n<p>文章同步在公众号： 萌萌哒草头将军</p>\\n<p>最近公众号有🎁，欢迎关注了解</p>\\n</blockquote>\\n<p>最近在研究框架，也仔细用了<code>Vue3</code>一些功能，今天分享一次我的实践：</p>\\n<p><strong><code>Vue3</code>如何监听<code>localStorage</code>的变化。</strong></p>\\n<ul>\\n<li><a href=\\"https://juejin.cn/post/7241567583504728119\\" title=\\"https://juejin.cn/post/7241567583504728119\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">🎉干货满满，React设计原理(一)：藏在源码里的紧箍咒，几个容易混淆的变量🎉</a></li>\\n<li><a href=\\"https://juejin.cn/post/7242249906257363001\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">🎉干货满满，React设计原理(二)：藏在源码里的两个圈，重要的链表结构和双缓存技术🎉</a></li>\\n</ul>","autoDesc":true}');export{e as data};
