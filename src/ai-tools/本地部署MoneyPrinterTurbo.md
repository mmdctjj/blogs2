---
title: 🚀🚀🚀本地部署MoneyPrinterTurbo，Al自动生成高清短视频,躺着着就能赚钱,快行动吧!
isTimeLine: true
date: 2023-02-28
category:
  - AI工具
tag:
  - AI工具
---

### 🚀 项目简介

MoneyPrinterTurbo 项目是一款通过 AI 快速生成`文案`+`视频素材`+`字幕` = `高清短视频` 的开源项目，
地址：<https://github.com/harry0703/MoneyPrinterTurbo>

门槛：较高，需要全局代理。（魔法哦～），而且里面的一个包不支持苹果芯片，导致 mac 无法安装！

> 文章同步在公众号：萌萌哒草头将军，欢迎关注！

### 🚀 效果预览

![页面](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bd700ece8f914484859c0ffc947b7ee9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1743426542&x-orig-sign=wC5NT2pw88p6ZEyzWdLAGiE7030%3D)

成果：<https://www.bilibili.com/video/BV1iX9NYnEoC/?spm_id_from=333.1387.homepage.video_card.click>

### 🚀 安装

虽然项目支持`docker`，和一键部署，但是由于还不够完善，建议选择本地安装，下面是详细的安装步骤：

#### 环境准备

需要安装 Conda，

安装 Conda 可以通过多种方式进行，我通过安装 Miniconda 安装的

Miniconda 是一个轻量级的 Conda 发行版，只包含 Conda 和其依赖项，适合希望更灵活管理环境的用户。

如果是服务器，请用下面的命令

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
```

按照提示进行安装即可，

如果 windows 平台，使用 vsode 打开就可以了，无需安装。

安装完成后，打开终端（或命令提示符），输入以下命令以验证 Conda 是否安装成功，如果安装成功，你将看到 Conda 的版本号。

```bash
conda --version
```

#### 下载代码

```bash
git clone https://github.com/harry0703/MoneyPrinterTurbo.git
cd MoneyPrinterTurbo
conda create -n MoneyPrinterTurbo python=3.11
conda activate MoneyPrinterTurbo
pip install -r requirements.txt
mv config.example.toml config.toml
```

### 🚀 页面配置和使用

#### 运行打开命令

运行下面的命令，就会自动打开浏览器

```bash
sh webui.sh
```

#### 切换语言

可以看到界面此时是英文，点击 basic setting 切换语言，选择简体中文，页面就是中文了，

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/657674f3bff748c0bc287ccfbb488a4c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1743426542&x-orig-sign=K4D6DtsOlzihHEn%2BwNSXFXpb%2BDA%3D)

#### 申请两个 api key

接下来，我们还需要申请几个 `key`

##### 大模型

依次填入大模型的服务商、api-key、代理地址，相信大家已经有了！

##### 语音

由于项目里需要视频素材，所以还需要`Pexels`服务的 key，我们只需要点击获取，然后登录就可以看到 key

#### 开始使用

现在我们可以输入一个主题了，例如：人生开悟的特征，设置视频画面比例，音色，字幕位置

此时项目会自动通过大模型获得文案，然后获取免费的视频素材，将文案装成语音，然后合成视频！

### 遇到的问题

大概率会遇到的问题：

##### 1. 需要 VPN 全局代理

    check if the language of the voice matches the language of the video script.
    check if the network is available. If you are in China, it is recommended to use a VPN and enable the global traffic mode.
    2024-12-31 14:10:12 | ERROR | "./webui\Main.py:790": - 视频生成失败

是没有全局代理，或者代理失败导致的，解决方案：

在 app/services/voice.py 里面修改第 1060 行，communicate = edge_tts.Communicate(text, voice_name, rate=rate_str, proxy="<http://127.0.0.1:10808>") 新增 proxy="<http://127.0.0.1:10808>" 即可。

<http://127.0.0.1:10808> 是你自己的代理端口，根据情况修改即可！

###### 2. 不支持 https

    failed, error: Cannot connect to host 127.0.0.1:xxxx ssl:<ssl.SSLContext object at 0x7f8a5eab8290> [None]

这是我在服务器遇到的问题， 目前没有解决方案，windows 没有遇到
