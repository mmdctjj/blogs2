import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,f as i}from"./app-06d780e8.js";const d={};function t(c,e){return a(),s("div",null,e[0]||(e[0]=[i(`<h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h3><p>这篇文章主要是完善<a href="dfs">上篇文章</a>部署服务器的部分，由于当时没有服务器，所以才有了今天的内容。废话不多说，下面是正文。</p><h3 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h3><h4 id="_1-生成密钥对" tabindex="-1"><a class="header-anchor" href="#_1-生成密钥对" aria-hidden="true">#</a> 1.生成密钥对</h4><p>在服务器或者其他电脑生成一堆<code>ssh</code>密钥对，命令如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span> <span class="token parameter variable">-C</span> <span class="token string">&quot;your_email@example.com&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你不想覆盖电脑本身的原始密钥，可以使用这个命令自定义名称：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span> <span class="token parameter variable">-C</span> <span class="token string">&quot;you_self@example.com&quot;</span> <span class="token parameter variable">-f</span> ~/.ssh/id_rsa_github
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>后面新增了 -f 参数，这是指定密钥对的名称和路径，一路回车，就会在指定位置生成密钥对：<code>id_rsa_github.pub</code>、<code>id_rsa_github</code>，</p><p>总之你现在已经得到一个私钥一个公钥。</p><p>接着你需要将公钥放置在<code>authorized_keys</code>中，如果没有该文件就创建一个。</p><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>vi authorized_keys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>按下<code>i</code>进入编辑模式，复制之后，按下 <code>esc</code>，输入<code>:wq</code>保存并推出</p><h4 id="_2-新增ssh-key" tabindex="-1"><a class="header-anchor" href="#_2-新增ssh-key" aria-hidden="true">#</a> 2. 新增<code>SSH Key</code></h4><p>接着你需要进入<code>github</code>对应的博客仓库，选择<code>Settings &gt; Deploy keys &gt; add deploy Key</code>。</p><figure><img src="https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/8d23c05a474d4af7821ce5ceadb03ad8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?rk3s=f64ab15b&amp;x-expires=1736389929&amp;x-signature=V6r17rb%2Fhcz5thvsuvtjCMVFLKk%3D" alt="deploy key" tabindex="0" loading="lazy"><figcaption>deploy key</figcaption></figure><p>将你的私钥保存在这里，然后点击保存。</p><h4 id="_3-配置-action-变量" tabindex="-1"><a class="header-anchor" href="#_3-配置-action-变量" aria-hidden="true">#</a> 3. 配置 action 变量</h4><p>接着选择当前仓库的<code>Settings &gt; Secrets and variables &gt; actions &gt; new repository secret</code></p><p><code>SERVER_USER</code></p><p><code>SERVER_SSH_KEY</code></p><h3 id="配置-github-action" tabindex="-1"><a class="header-anchor" href="#配置-github-action" aria-hidden="true">#</a> 配置 github action</h3><p>上篇中我们已经配置了<code>github action</code>，每次提交代码之后自动部署最新的内容。</p><p>现在我们需要在末尾加上下面的内容，主要是将 action 打包的内容通过<code>scp</code>功能上传到服务器的指定文件夹</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 上传文档到服务器
  <span class="token key atrule">uses</span><span class="token punctuation">:</span> appleboy/scp<span class="token punctuation">-</span>action@v0.1.1
  <span class="token key atrule">with</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SERVER_HOST <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token comment"># 这个你可以写死，也可以像我这样</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SERVER_USER <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SERVER_SSH_KEY <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">source</span><span class="token punctuation">:</span> ./src/.vuepress/dist* <span class="token comment"># 上传的源路径</span>
    <span class="token key atrule">target</span><span class="token punctuation">:</span> /home/blog/ <span class="token comment"># 临时上传目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置服务器-nginx" tabindex="-1"><a class="header-anchor" href="#配置服务器-nginx" aria-hidden="true">#</a> 配置服务器 nginx</h3><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>server {
    listen 80;
    server_name blog.mmdctjj.top;

    # 指定博客的根目录
    root /home/blog/src/.vuepress/dist;
    index index.html;

    # 主站根目录的默认处理
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 处理 /blogs2/* 静态资源请求
    location /blogs2/ {
        root /home/blog/src/.vuepress/dist; # 指定文件所在目录
        rewrite ^/blogs2(/.*)$ $1 break;    # 去掉 /blogs2 前缀
        try_files $uri $uri/ =404;         # 找不到时返回 404 错误
    }

    # 错误页面配置
    error_page 404 /404.html;
    location = /404.html {
        root /home/blog/src/.vuepress/dist;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html; # 使用 Nginx 默认的 50x 错误页面
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h3>`,28)]))}const o=n(d,[["render",t],["__file","vuePress-thmee-hope2部署服务器教程.html.vue"]]);export{o as default};
