---
title: 🚀VuePress-theme-hope2 搭建个人网站，万字长文保姆级教程，包含自动部署、评论、搜索等功能
isTimeLine: true
date: 2023-07-31
category:
  - 前端
tag:
  - Vue
---

> 文章同步在公众号：萌萌哒草头将军，欢迎关注
>
> 我的博客地址：https://mmdctjj.github.io/blogs2/
>
> 对应仓库地址：https://github.com/mmdctjj/blogs2

VuePress 是一个以 Markdown 为中心的静态网站生成器。好处是可以使用  Markdown  来书写内容文档或者博客。

VuePress 诞生的初衷是为了支持 Vue.js 及其子项目的文档需求。

在明确你的目标之后，先不着急立马搭建项目。

## 🚀 你喜欢哪个主题

因为 VuePress 除了默认的主题外，提供了扩展主题、扩展插件的能力，不同的主题又组织了不同的插件集合来完成开箱即用的功能，

所以，你首先应该使用哪款主题作为你的个人完整风格。

比较热门你的主题有：

- [vuepress 默认主题](https://github.com/vuejs/vuepress) 21.7k⭐
- [vuepress-theme-hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope) 1.4k⭐
- [vuepress-theme-reco，（2.0 还在测试阶段）](https://github.com/vuepress-reco/vuepress-theme-reco-1.x) 1.6k⭐
- [vuepress-theme-vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing) 3.5k⭐

不同主题的之间的最明显的差异就是默认的样式不同，其次就是默认提供的功能不同。

首先，我们看看各个主题默认的样式

### 默认主题案例

vue 系列早先版本的官网大多数都是默认主题

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7805ce56c9ab4c47a392f782f3f0a509~tplv-k3u1fbpfcp-watermark.image?)

### vuepress-theme-hope 案例

蝉沐风的码场: https://www.chanmufeng.com/

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7126795de8e44010aea59d4a0b2d9340~tplv-k3u1fbpfcp-watermark.image?)

### vuepress-theme-reco 案例：

萌萌哒草头将军（我的旧博客）: https://mmdctjj.github.io/blogs/

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e15eb53b81ec43bb926eaeda3720370f~tplv-k3u1fbpfcp-watermark.image?)

### vuepress-theme-reco 2.0 案例：

异想之旅の Blog：https://www.yixiangzhilv.com/

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7194f262040487792d48c8026b08ae0~tplv-k3u1fbpfcp-watermark.image?)

### vuepress-theme-vdoing 案例：

Dra-M: https://dra-m.com/

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6ff73520b7342e4bfe53432f4b6342c~tplv-k3u1fbpfcp-watermark.image?)

相信看到这里，应该有自己心仪的主题了吧

我用的主题是：vuepress-theme-reco，主题和默认主题相似

主要功能是新增了一些图标、新增了 Tag、新增了时间轴等常用功能，

缺点是：功能还不够丰富，图标比较少，无法有效添加摘要、阅读时间、字数统计等功能。

相反，vuepress-theme-hope 这些做的都不错，成为我新的选择。

## 🚀 搭建项目

### 💎 初始化项目

如果你选择了一个主题，请务必使用该主题提供的脚手架工具创建项目。这样可以减少很多配置上的麻烦。

```js
npm init vuepress-theme-hope blogs
```

```js
Need to install the following packages:
  create-vuepress-theme-hope@2.0.0-beta.233
Ok to proceed? (y)
```

```js
Need to install the following packages:
  create-vuepress-theme-hope@2.0.0-beta.233
Ok to proceed? (y) y
? Select a language to display / 选择显示语言
  english (US)
❯ 简体中文

D:\work>npm init vuepress-theme-hope blogs2
Need to install the following packages:
  create-vuepress-theme-hope@2.0.0-beta.233
Ok to proceed? (y) y
? Select a language to display / 选择显示语言 简体中文
? 选择包管理器 yarn
生成 package.json...
? 设置应用名称 blogs2
? 设置应用版本号 2.0.0
? 设置应用描述 A project of vuepress-theme-hope
? 设置协议 MIT
? 项目需要用到多语言么? No
? 是否需要一个自动部署文档到 GitHub Pages 的工作流？ Yes
? 你想要创建什么类型的项目？ blog
生成模板...
? 是否初始化 Git 仓库? Yes
? 选择你想使用的源 当前源
```

初始化目录结构如下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6c8fb22be4f418abf38ef344030fd7c~tplv-k3u1fbpfcp-watermark.image?)

## 🚀 首页配置

其中，src 目录下的 `README.md`即为博客或者文档的首页。

等待下载完毕，执行 `npm run docs:dev`

打开页面，可以看到博客的首页如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/355ae7ea2ddb444398d859f975541711~tplv-k3u1fbpfcp-watermark.image?)

可以通过设置`heroFullScreen: false`，关闭 hero 背景全屏。

下滑之后文章的列表如下：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39361e29e9984cb38dd25f6ef17d44b2~tplv-k3u1fbpfcp-watermark.image?)

文章的列表来自于项目中所有的 markdown 文件，你可以在每个 md 文件的 frontmatter 中设置文章的标题、封面、分类、标签、日期、是否在文章列表中显示。

```md
---
title: 🚀🚀vue3自定义指令实践
isTimeLine: true
date: 2023-07-03
category:
  - 前端
tag:
  - JavaScript
  - Vue
---
```

通过设置`article`  为  `false`将文章在列表中排除。

站点的基本信息、顶部的 hero 信息、项目链接、底部的 footer 信息都可以在`README.md`中配置。

我的配置如下：具体可以参考：https://theme-hope.vuejs.press/zh/config/frontmatter/blog-home.html

```yml
home: false
layout: BlogHome
icon: home
title: 首页
heroImage: /logo.svg
heroText: 萌萌哒草头将军
heroFullScreen: false
tagline: 千里之行，始于足下
projects:
  - icon: react
    name: RaETable
    desc: 一款开箱即用的antd表格组件库
    link: https://mmdctjj.github.io/raetable
  - icon: setting
    name: console-loader
    desc: 自动清除其他开发者console的loader
    link: https://github.com/mmdctjj/remove-others-console-loader

footer: 萌萌哒草头将军
```

## 🚀 导航栏

在开始之前你需要明确，你的导航栏需求是啥样的（大白话就是哪些栏目需要在侧边栏展示，哪些在侧边栏展示）

我的思路是，根据文章的分类，将相同的分类文章放在同一目录下，每个目录对应一个导航栏目。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2f4125d5efe42dd9487937f5f3f35b7~tplv-k3u1fbpfcp-watermark.image?)

导航栏的相关设置在 `navbar.ts`文件中。

默认为字符串，对应 src 目录下的文件路径，你可以省略  `.md`  扩展名，以  `/`  结尾的路径会被推断为  `/README.md`。

例如：

```js
import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/", // 对应首页，即src/README.md
  "/react/", // 对应src/react/README.md
]);
```

也可以是对象，基本格式如下：

```js
import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/posts/", // 对应 src/posts 目录
    children: [
      {
        text: "苹果",
        icon: "pen-to-square",
        prefix: "apple/", // 对应 src/posts/apple 目录
        children: [
          { text: "苹果1", icon: "pen-to-square", link: "1" },
          { text: "苹果2", icon: "pen-to-square", link: "2" },
          "3",
          "4",
        ],
      },
      "tomato",
      "strawberry",
    ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/", // link代码外链地址
  },
]);
```

我的设置为：

```js
import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "React系列",
    icon: "react",
    link: "/react/",
  },
  {
    text: "Vue系列",
    icon: "vue",
    link: "/vue/",
  },
  {
    text: "Vite系列",
    icon: "tool",
    link: "/vite/",
  },
  {
    text: "新框架尝鲜系列",
    icon: "geometry",
    link: "/framework/",
  },
  {
    text: "杂谈",
    icon: "article",
    link: "/posts/",
  },
  {
    text: "标签",
    icon: "tag",
    link: "/tag/javascript/",
  },
  {
    text: "分类",
    icon: "categoryselected",
    link: "/category/前端/",
  },
  {
    text: "时间轴",
    icon: "time",
    link: "/timeline/",
  },
]);
```

我将一些默认的路由也加进了导航栏配置中，比如时间轴、标签、分类等。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07e24da6efb0471fab534031c2a32618~tplv-k3u1fbpfcp-watermark.image?)

## 🚀 侧边栏

侧边栏的配置在 `sidebar.ts`中

侧边栏的配置，我们可以分两种情况：全局导航栏、根据每个导航栏栏目分离式导航栏。

### 💎 全局侧边栏配置

你可以设置侧边栏导航和导航栏的路由一一对应，这样就相当于是全局的侧边栏。

对于侧边栏的具体条目，可以通过设置`children: "structure"`根据当前目录下的文件名称自动生成。

```js
import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "React系列",
      icon: "react",
      prefix: "react/",
      children: "structure",
    },
    {
      text: "Vue系列",
      icon: "vue",
      prefix: "vue/",
      children: "structure",
    },
    {
      text: "Vite系列",
      icon: "tool",
      prefix: "vite/",
      children: "structure",
    },
    {
      text: "新框架尝鲜系列",
      icon: "geometry",
      prefix: "framework/",
      children: "structure",
    },
    {
      text: "杂谈",
      icon: "study",
      prefix: "posts/",
      children: "structure",
    },
    // "intro",
    // "slides",
  ],
});
```

此时页面侧边栏如下图

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4785b0f61ea4826bbda9c01bd76f7b8~tplv-k3u1fbpfcp-watermark.image?)

### 💎 分离式导航栏

分离式菜单配置更简洁，如下所示：当设置`structure`时，默认根据目录下的文件自动生成侧边栏。

```js
import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/react/": "structure",
  "/framework/": "structure",
  "/vite/": "structure",
  "/vue/": "structure",
  "/posts/": "structure",
});
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f4fc0aec7f84e9e94d996b2d1f29ff2~tplv-k3u1fbpfcp-watermark.image?)

### 💎 自动生成目录页面

另外，我们还根据文件夹下的文件列表自动为每个文件夹生成目录页面。我们只需要在`theme.ts`中添加如下设置。

```js
plugins: {

    autoCatalog: {
      index: true
    },
}
```

就可以自动生成目录页面了。例如：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a12d2620daaf4596a8d0293460bade01~tplv-k3u1fbpfcp-watermark.image?)

## 🚀 搜索功能

该主题内置了几种常见搜索插件的支持，你只需下载你喜欢的插件和配置文件即可，我使用的是`vuepress-plugin-search-pro`插件，配置参考的官方配置。

```js
plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category as any,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag as any,
          formatter: "标签：$content",
        },
      ],
    }),
  ]
```

效果如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d61472f814974bcb8e97dae50e9a0013~tplv-k3u1fbpfcp-watermark.image?)

## 🚀 自动部署

该主题已经自动添加了`workflows`文件，你只需添加仓库，修改触发分支。

不过我在部署时遇到问题：

```js
Dependencies lock file is not found in /home/{username}/runners.../repository_name. Supported file patterns: package-lock.json,yarn.lock
```

需要修改下`workflows`文件：去除 npm cache 设置

```sh
 - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
        #  cache: npm
```

cicd 执行成功后，会多一个部署`gh-pages`分支，这是文件流中配置的，你可以修改

```sh
      - name: 部署文档
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # 这是文档部署到的分支名称
          branch: gh-pages
          folder: src/.vuepress/dist
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b272f723875144639a3b1b67f70a4f06~tplv-k3u1fbpfcp-watermark.image?)

接着最重要的一步，到仓库的设置页面设置如下的内容：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5730c4421f146d6bc92a4ae261ddd30~tplv-k3u1fbpfcp-watermark.image?)

该设置的意思是，将选中的分支内容部署在 github 自带的页面服务中。

接着点击`save`按钮，就可以去对应的站点访问了。

我的站点：https://mmdctjj.github.io/blogs2/

## 🚀 添加评论功能

不同的插件，评论的实现原理不同，我接触过最早的原理是通过将评论信息映射到仓库的 issue 中。

然而，后来开始流行`Discussions`，这也是`vuepress-theme-hope`推荐的方式，

> 如果你的博客面向程序员，请使用`Giscus`，面向大众请选择`Waline`, 所以我选择了`Giscus`

首先需要你创建一个空的仓库。其次，由于评论需要用户登录到 GitHub，所以，我们还需要提供登录应用的服务。

这里我们不用担心，因为 Github 为我们提供了简单的登陆应用的功能：`giscus`,

首先安装 Giscus：https://github.com/apps/giscus

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07ded9d5b5a549e0af00c7f057da4871~tplv-k3u1fbpfcp-watermark.image?)

点击`install`按钮，在配置详情页中选择对应的生效仓库。（这里我选择仅仅对评论仓库生效）

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5ba710be49e4ed5969c450cd71bbb6b~tplv-k3u1fbpfcp-watermark.image?)

然后回到评论仓库，点击`seething`，选中`Feature`下的`Discussions`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd52fbb3f1984ccb8a124a5418c71b47~tplv-k3u1fbpfcp-watermark.image?)

点击`set up discussions`，默认的文本不需要修改，点击提交即可出现如下页面，说明该功能启用成功。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59fd7a6cfcf8400b907231c7ba2104a1~tplv-k3u1fbpfcp-watermark.image?)

接着，我们前往https://giscus.app/zh-CN 设置你的仓库和分类

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2755ba28c004292acd9037a88398ed9~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82e2c901f8fb4f28a617630d0d40b74c~tplv-k3u1fbpfcp-watermark.image?)

在启用栏目复制以下几个信息。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0853ca1007f4a49b7affdd24553fa0e~tplv-k3u1fbpfcp-watermark.image?)

接着将以下信息复到`theme.ts`即可：

```js
  plugins: {
    comment: {
      // You should generate and use your own comment service
      provider: "Giscus",
      repo: "mmdctjj/blogs-comments",
      repoId: "xxxx", // 替换下
      category: "Announcements",
      categoryId: "xxxx" // 替换下
    },
 }
```

此时当我们评论之后，在评论仓库查看，

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/297127923a7844d688c08fd4ae39a482~tplv-k3u1fbpfcp-watermark.image?)

## 🎉 最后

vuepress-theme-hope 主题通过默认的配置就提供了丰富的开箱即用的功能，使得配置体验相比较与 vuepress-theme-reco 有了明显的提升。这是我替换博客主题最大的体验，

今天的分享就到这了，如果文中有错误的地方，还请在评论中告诉我，感激不尽。
