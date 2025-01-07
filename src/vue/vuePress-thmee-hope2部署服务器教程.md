---
title: vuePress-thmee-hope2部署服务器教程
isTimeLine: true
date: 2025-01-06
category:
  - 前端
tag:
  - Vue
---

## 前言

这篇文章主要是完善[上篇文章](https://juejin.cn/post/7261555752586084410)部署服务器的部分，由于最近刚买了服务器，所以才有了今天的内容。废话不多说，下面是正文。

> 文章同步在公众号：萌萌哒草头将军，欢迎关注

## 准备工作

#### 1.生成密钥对

在服务器或者其他电脑生成一堆`ssh`密钥对，命令如下：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

如果你不想覆盖电脑本身的原始密钥，可以使用这个命令自定义名称：

```bash
ssh-keygen -t rsa -b 4096 -C "you_self@example.com" -f ~/.ssh/id_rsa_github
```

后面新增了 -f 参数，这是指定密钥对的名称和路径，一路回车，就会在指定位置生成密钥对：公钥`id_rsa_github.pub`、私钥`id_rsa_github`，

总之你现在已经得到一个私钥一个公钥。

接着你需要将公钥放置在`authorized_keys`中，如果没有该文件就创建一个。

```cmd
vi authorized_keys
```

按下`i`进入编辑模式，复制之后，按下 `esc`，输入`:wq`保存并推出

#### 2. 新增`SSH Key`

接着你需要进入`github`对应的博客仓库，选择`Settings > Deploy keys > add deploy Key`。

![deploy key](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8d23c05a474d4af7821ce5ceadb03ad8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1736821993&x-orig-sign=ZNoi45yu7ykY63aBglwDykK4Bkw%3D)

将你的私钥保存在这里，然后点击保存。

#### 3. 配置 action 变量

接着选择当前仓库的`Settings > Secrets and variables > actions > new repository secret`

创建名为`SERVER_USER`的变量，值为你的服务器的登录名称。

创建名为`SERVER_SSH_KEY`的变量，值为刚才生成的私钥。

如果需要创建名为`SERVER_HOST`的变量，值为你的主机地址或者域名。

保存之后进行下一步。

> 注意: 变量名自定义即可，和后面保持一致即可

### 配置 github action

上篇中我们已经配置了`github action`，每次提交代码之后自动部署最新的内容。

现在我们需要在末尾加上下面的内容，主要是将 action 打包的内容通过`scp`功能上传到服务器的指定文件夹

```yaml
- name: 上传文档到服务器
  uses: appleboy/scp-action@v0.1.1
  with:
    host: ${{ secrets.SERVER_HOST }} # 这个你可以写死，也可以像我这样
    username: ${{ secrets.SERVER_USER }}
    key: ${{ secrets.SERVER_SSH_KEY }}
    source: ./src/.vuepress/dist* # 上传的源路径
    target: /home/blog/ # 临时上传目录
```

完成的配置如下：

```YAML

name: 部署文档

on:
  push:
    branches:
      # 确保这是你正在使用的分支名称
      - master

permissions:
  contents: write

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          # 如果你文档需要 Git 子模块，取消注释下一行
          # submodules: true

      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: 安装依赖
        run: npm install --frozen-lockfile

      - name: 构建文档
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: |-
          npm run docs:build
          rm -rf .gitignore
          > src/.vuepress/dist/.nojekyll

      - name: 部署文档
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # 这是文档部署到的分支名称
          branch: gh-pages
          folder: src/.vuepress/dist

      - name: 上传文档到服务器
        uses: appleboy/scp-action@v0.1.1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          source: ./src/.vuepress/dist* # 上传的源路径
          target: /home/blog/          # 临时上传目录
```

### 配置服务器 nginx

完事之后，进入自己的服务器，修改`nginx.conf`文件，查看配置文件路径的命令如下：

```bash
nginx -t
```

输出：`nginx: configuration file /etc/nginx/nginx.conf test is successful`，里面的路径即是配置文件路径。

根据自己的公共路径配置即可。由于这是我的第二个博客，加了`blogs2`作为标识了，所以还需要添加静态文件路径的`location`，完成的配置如下，可以参考下。

```conf
server {
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
```

配置完成后重启`nginx`，命令如下：

```bash
nginx -s reload
```

## 结语

好了，今天的文章就到这里了希望可以帮助到你，如果对你有帮助，也可以关注我的公众号：萌萌哒草头将军
