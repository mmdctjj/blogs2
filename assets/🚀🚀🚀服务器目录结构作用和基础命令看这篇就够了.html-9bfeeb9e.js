import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o,c as d,a as s,b as i,e as t,f as r}from"./app-2b3a740b.js";const p={},c={href:"https://juejin.cn/post/7243321262460731451",title:"https://juejin.cn/post/7243321262460731451",target:"_blank",rel:"noopener noreferrer"},u={href:"https://juejin.cn/post/7239715294229921849",title:"https://juejin.cn/post/7239715294229921849",target:"_blank",rel:"noopener noreferrer"},m={href:"https://juejin.cn/post/6869195042599206919",title:"https://juejin.cn/post/6869195042599206919",target:"_blank",rel:"noopener noreferrer"},b={href:"https://juejin.cn/post/6844904048118726663",title:"https://juejin.cn/post/6844904048118726663",target:"_blank",rel:"noopener noreferrer"},g={href:"https://juejin.cn/post/6844903926119006216",title:"https://juejin.cn/post/6844903926119006216",target:"_blank",rel:"noopener noreferrer"},v={href:"https://juejin.cn/post/7252255706934722597",title:"https://juejin.cn/post/7252255706934722597",target:"_blank",rel:"noopener noreferrer"},h={href:"https://juejin.cn/post/7251523348596441143",title:"https://juejin.cn/post/7251523348596441143",target:"_blank",rel:"noopener noreferrer"},f={href:"https://juejin.cn/post/7245919919223881783",target:"_blank",rel:"noopener noreferrer"};function j(x,e){const n=a("ExternalLinkIcon");return o(),d("div",null,[e[8]||(e[8]=s("p",null,"今天我来给大家介绍一下服务器的目录结构以及一些常用的基本命令。都是我从萌新开始的学到的常用知识！",-1)),e[9]||(e[9]=s("p",null,"往期精彩回顾：",-1)),s("ul",null,[s("li",null,[s("a",c,[e[0]||(e[0]=i("🎉 一个 demo 体验 Vue3.3+TypeScript 所有新功能 🎉")),t(n)])]),s("li",null,[s("a",u,[e[1]||(e[1]=i("🎉Vue3 优雅的监听 localStorage 变化 🎉")),t(n)])]),s("li",null,[s("a",m,[e[2]||(e[2]=i("优美的 v-for 列表加载动画：vue 动画钩子实践")),t(n)])]),s("li",null,[s("a",b,[e[3]||(e[3]=i("vue 组件通信总结")),t(n)])]),s("li",null,[s("a",g,[e[4]||(e[4]=i("两百行代码实现简易 vue 框架")),t(n)])]),s("li",null,[s("a",v,[e[5]||(e[5]=i("Vue3 使用 hook 封装常见的几种异步请求函数场景，让开发更加丝滑 🚀🚀🚀")),t(n)])]),s("li",null,[s("a",h,[e[6]||(e[6]=i("Vue3 使用 hook 封装媒体查询和事件监听，使 Vue 的开发更加丝滑 🚀🚀🚀")),t(n)])])]),e[10]||(e[10]=r('<h3 id="一、目录结构" tabindex="-1"><a class="header-anchor" href="#一、目录结构" aria-hidden="true">#</a> 一、目录结构</h3><p>大多数服务器操作系统的目录结构遵循 Linux 的通用标准，也就是所谓的“文件系统层次结构标准”（FHS）。</p><figure><img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bf480e7d131743f781f70a67821a151f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&amp;rk3s=f64ab15b&amp;x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&amp;x-orig-expires=1743426302&amp;x-orig-sign=L3LzyVILxEto7Y4S4L7UaC%2BAScs%3D" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>下面是一些常见的目录及其用途：</p><ol><li><p><strong>/ (根目录)</strong><br> 这是整个文件系统的起点，所有的目录和文件都从这里开始。</p></li><li><p><strong>/bin</strong><br> 存放系统中最基本的命令，比如<code>ls</code>、<code>cp</code>、<code>mkdir</code>等。这些命令在单用户模式下也是可用的。</p></li><li><p><strong>/boot</strong><br> 包含启动 Linux 时所需的文件，比如内核文件（vmlinuz）和引导加载器（grub）。</p></li><li><p><strong>/dev</strong><br> 存放设备文件，比如硬盘（/dev/sda）、终端（/dev/tty）等。</p></li><li><p><strong>/etc</strong><br> 存放系统的配置文件，比如网络配置（/etc/sysconfig/network-scripts/）、用户信息（/etc/passwd）等。</p></li><li><p><strong>/home</strong><br> 普通用户的主目录，每个用户都有一个以自己用户名命名的子目录，比如<code>/home/username</code>。</p></li><li><p><strong>/lib</strong><br> 存放系统最基本的共享库文件，类似于 Windows 中的 DLL 文件。</p></li><li><p><strong>/media</strong><br> 用于挂载可移动设备，比如 U 盘、光盘等。</p></li><li><p><strong>/mnt</strong><br> 临时挂载点，通常用于挂载文件系统或网络共享。</p></li><li><p><strong>/opt</strong><br> 用于安装第三方软件，比如 Oracle 数据库、Tomcat 等。</p></li><li><p><strong>/root</strong><br> 超级用户（root）的主目录，普通用户没有权限访问。</p></li><li><p><strong>/sbin</strong><br> 存放系统管理员使用的命令，比如<code>fdisk</code>、<code>ifconfig</code>等。</p></li><li><p><strong>/tmp</strong><br> 临时文件目录，所有用户都可以在这里创建文件，但文件可能会被系统定期清理。</p></li><li><p><strong>/usr</strong><br> 存放用户安装的应用程序和文件，类似于 Windows 的 Program Files 目录。</p></li><li><p><strong>/var</strong><br> 存放经常变化的文件，比如日志文件（/var/log）、邮件（/var/mail）等。</p></li></ol><h3 id="二、常用基本命令" tabindex="-1"><a class="header-anchor" href="#二、常用基本命令" aria-hidden="true">#</a> 二、常用基本命令</h3><p>接下来，咱们聊一些常用的基本命令，</p><p>以前介绍过一篇了：</p>',8)),s("p",null,[s("a",f,[e[7]||(e[7]=i("🚀 作为前端，怎么让其他同事给你挑大拇哥 👍？运维命令简易上手")),t(n)])]),e[11]||(e[11]=r(`<p>这些命令在日常操作中会经常用到。</p><ol><li><p><strong>head / tail</strong><br> 查看文件的开头或结尾部分。<br> 例如：</p><ul><li><code>head -n 10 file.txt</code>：显示 file.txt 的前 10 行。</li><li><code>tail -f /var/log/messages</code>：实时查看日志文件的更新。</li></ul></li><li><p><strong>chmod</strong><br> 修改文件或目录的权限。<br> 例如：<code>chmod 755 file.txt</code>：将 file.txt 的权限设置为 755。</p></li><li><p><strong>chown</strong><br> 修改文件或目录的所有者。<br> 例如：<code>chown user:group file.txt</code>：将 file.txt 的所有者改为 user，所属组改为 group。</p></li><li><p><strong>ps</strong><br> 查看当前运行的进程。<br> 常用选项：</p><ul><li><code>ps aux</code>：显示所有进程的详细信息。</li></ul></li><li><p><strong>top</strong><br> 实时显示系统资源使用情况和进程信息。</p></li><li><p><strong>df</strong><br> 查看磁盘空间使用情况。<br> 例如：<code>df -h</code>：以人类可读的格式显示磁盘使用情况。</p></li><li><p><strong>du</strong><br> 查看目录或文件的磁盘使用情况。<br> 例如：<code>du -sh /home</code>：显示/home 目录的总大小。</p></li><li><p><strong>wget</strong><br> 从网络下载文件。<br> 例如：<code>wget http://example.com/file.zip</code>：下载 file.zip 文件。</p></li></ol><p>这些命令和目录结构是 CentOS 服务器操作的基础，掌握了它们，日常的服务器管理就会轻松很多！</p><h3 id="进阶命令" tabindex="-1"><a class="header-anchor" href="#进阶命令" aria-hidden="true">#</a> 进阶命令</h3><h4 id="systemctl" tabindex="-1"><a class="header-anchor" href="#systemctl" aria-hidden="true">#</a> <code>systemctl</code></h4><p>但是，我们有时下载的服务，需要通过 <code>systemctl</code> 的管理才可以运行，比如上篇文章提到的 <code>prometheus</code>。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl start prometheus
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>systemctl</code> 是 CentOS 7 及以后版本中用于管理系统服务的命令。它替代了旧版的 <code>service</code> 和 <code>chkconfig</code> 命令，用于启动、停止、重启、启用或禁用系统服务。</p><p>这类服务一般需要我们在服务器<code>/etc/systemd/system/</code> 目录下维护配置文件，例如：<code>prometheus.service</code></p><div class="language-service line-numbers-mode" data-ext="service"><pre class="language-service"><code>[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
ExecStart=/opt/prometheus/prometheus \\
    --config.file=/opt/prometheus/prometheus.yml \\
    --storage.tsdb.path=/opt/prometheus/data
Restart=always

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着，可以使用下面的 <code>systemctl</code> 命令管理这类服务了：</p><ol><li><p>启动服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl start prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>停止服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl stop prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>重启服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl restart prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看服务状态</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl status prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>启用开机自启动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>禁用开机自启动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl disable prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看所有服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl list-unit-files <span class="token parameter variable">--type</span><span class="token operator">=</span>service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看失败的服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl <span class="token parameter variable">--failed</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><h3 id="结尾" tabindex="-1"><a class="header-anchor" href="#结尾" aria-hidden="true">#</a> 结尾</h3><p>文章中出现错误的地方欢迎指正！</p><p>如果对你有帮助，欢迎关注我的公众号：萌萌哒草头将军！</p>`,15))])}const k=l(p,[["render",j],["__file","🚀🚀🚀服务器目录结构作用和基础命令看这篇就够了.html.vue"]]);export{k as default};
