---
title: 搭建属于自己的ChatGpt微信机器人
isTimeLine: true
star: true
date: 2024-04-07
category:
  - ChatGpt
tag:
  - ChatGpt
---

> 欢迎关注我的公众号：萌萌哒草头将军，关注或者入群获取工具书 PDF。

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efc89e9c4b9d48c1a813a34724d79c73~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1224&h=1714&s=201113&e=jpg&b=fdfdfd" alt="20240407102424.jpg" width="30%" /></p>

大家好，我是草头将军，好久不见。

本文是基于[chatgpt-on-wechat](https://github.com/zhayujie/chatgpt-on-wechat)项目的部署文章，感兴趣的可以直接移步[这里](https://github.com/zhayujie/chatgpt-on-wechat)

### 项目介绍

基于大模型搭建的聊天机器人。

- 支持平台：企业微信、微信 公众号、飞书、钉钉 等接入
- 支持模型：GPT3.5/GPT4.0/Claude/文心一言/讯飞星火/通义千问/Gemini/GLM-4/Claude/LinkAI，
- 支持能力：处理文本、语音和图片，访问操作系统和互联网
- 支持知识库：基于自有知识库进行定制企业智能客服（基于 LinkAI 实现）。
- 支持插件：基于插件系统。如 tools（[点这里](https://github.com/goldfishh/chatgpt-tool-hub)）、LinkAI 等

### 示例

#### 1.基于 chat-gpt 的对话]

<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/baa7eb7ff21147fd87ed384a6b36df39~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=850&h=1142&s=463588&e=png&b=fafafa" alt="基于chat-gpt的对话" width="50%" /></p>

#### 2.图片生成（以文找图），gpt3 不支持

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0316e223da0f4c39bbbe8e92ec56e3b5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=840&h=1032&s=694455&e=png&b=efe8e6" alt="image.png" width="50%" /></p>

#### 3.插件系统

###### 3.1 文档总结（基于 Link-AI）

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e30d2562e64a4ed9b909021e914de34c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=848&h=1186&s=435020&e=png&b=fafafa" alt="文档总结" width="50%" /></p>

###### 3.2 文档总结（基于 python 库）

<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc038b28182c403492fa5598e93292c1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=850&h=1190&s=525122&e=png&b=fafafa" alt="image.png" width="50%" /></p>

###### 3.3 论文查找

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2db008bff72c4e26b612c2f247fff295~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=838&h=1100&s=451763&e=png&b=fafafa" alt="image.png" width="50%" /></p>

###### 3.wikipedia

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d16a6177e1a84d95b361dc74023adc76~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=836&h=1104&s=510250&e=png&b=fafafa" alt="image.png" width="50%" /></p>

### 准备工作

#### 1.获取对应的账号

以免费 gpt3 为例说明，你也可以购买 gpt4 的 key，这里不做演示

###### 1.1 申请测试免费的账号

[点这里](https://github.com/chatanywhere/GPT_API_free?tab=readme-ov-file#%E5%85%8D%E8%B4%B9%E4%BD%BF%E7%94%A8)，记住申请的 key，和下面的几个转发地址

###### 1.2 申请 Link-AI 账号（非必需）

[点这里](https://link-ai.tech/console/interface)，创建 API key，并且[创建应用](https://link-ai.tech/console/createApp)，记住 App code

### 安装

#### 1.本地运行（需要 python 环境）

###### 1.1 拉取代码

```zsh
git pull https://github.com/zhayujie/chatgpt-on-wechat.git
```

###### 1.2 安装依赖

```zsh
# 主应用依赖
pip3 install requirements.txt
# 插件依赖
pip3 install -r requirements-optional.txt
```

###### 1.3 配置参数

主应用：基于根目录下的`config-template.json`文件生成`config.json`，参数说明如下

```json
# config.json文件内容示例
{
  "open_ai_api_key": "YOUR API KEY",                          # 填入上面创建的 OpenAI API KEY
  "model": "gpt-3.5-turbo",                                   # 模型名称, 支持 gpt-3.5-turbo, gpt-3.5-turbo-16k, gpt-4, wenxin, xunfei, claude-3-opus-20240229
  "claude_api_key":"YOUR API KEY"                             # 如果选用claude3模型的话，配置这个key，同时如想使用生图，语音等功能，仍需配置open_ai_api_key
  "proxy": "",                                                # 代理客户端的ip和端口，国内环境开启代理的需要填写该项，如 "127.0.0.1:7890"
  "single_chat_prefix": ["bot", "@bot"],                      # 私聊时文本需要包含该前缀才能触发机器人回复
  "single_chat_reply_prefix": "[bot] ",                       # 私聊时自动回复的前缀，用于区分真人
  "group_chat_prefix": ["@bot"],                              # 群聊时包含该前缀则会触发机器人回复
  "group_name_white_list": ["ChatGPT测试群", "ChatGPT测试群2"], # 开启自动回复的群名称列表
  "group_chat_in_one_session": ["ChatGPT测试群"],              # 支持会话上下文共享的群名称
  "image_create_prefix": ["画", "看", "找"],                   # 开启图片回复的前缀
  "conversation_max_tokens": 1000,                            # 支持上下文记忆的最多字符数
  "speech_recognition": false,                                # 是否开启语音识别
  "group_speech_recognition": false,                          # 是否开启群组语音识别
  "use_azure_chatgpt": false,                                 # 是否使用Azure ChatGPT service代替openai ChatGPT service. 当设置为true时需要设置 open_ai_api_base，如 https://xxx.openai.azure.com/
  "azure_deployment_id": "",                                  # 采用Azure ChatGPT时，模型部署名称
  "azure_api_version": "",                                    # 采用Azure ChatGPT时，API版本
  "character_desc": "你是ChatGPT, 一个由OpenAI训练的大型语言模型, 你旨在回答并解决人们的任何问题，并且可以使用多种语言与人交流。",  # 人格描述
  # 订阅消息，公众号和企业微信channel中请填写，当被订阅时会自动回复，可使用特殊占位符。目前支持的占位符有{trigger_prefix}，在程序中它会自动替换成bot的触发词。
  "subscribe_msg": "感谢您的关注！\n这里是ChatGPT，可以自由对话。\n支持语音对话。\n支持图片输出，画字开头的消息将按要求创作图片。\n支持角色扮演和文字冒险等丰富插件。\n输入{trigger_prefix}#help 查看详细指令。",
  "use_linkai": false,                                        # 是否使用LinkAI接口，默认关闭，开启后可国内访问，使用知识库和MJ
  "linkai_api_key": "",                                       # LinkAI Api Key
  "linkai_app_code": ""                                       # LinkAI 应用code
}
```

插件的配置根据目录下`plugins/config.json.template`生成`plugins/config.json`，详细的配置过程[点这里](https://github.com/goldfishh/chatgpt-tool-hub/blob/master/docs/apply_optional_tool.md)，原文档很清晰明了，这里不多说了

###### 1.4 运行

```zsh
python3 app.py
```

#### 2.docker 版本（需要 docker 环境）

###### 2.1 拉取镜像

```zsh
docker pull  ghcr.io/zhayujie/chatgpt-on-wechat:latest
```

此时，镜像列表中多出一个镜像

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61c8c38f76a949dd80751e431b9566ba~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2518&h=1358&s=582137&e=png&b=f6f6f8" alt="image.png" width="50%" /></p>

###### 配置参数

点击运行按钮，会出现弹窗：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8d3aa7f38f9499888f9e7e747ca0e90~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1200&h=1232&s=350022&e=png&b=ffffff" alt="image.png" width="50%" /></p>

名称随机，我们需要设置环境变量，即上述的参数，但是在做环境变量时，需要将 key 写成大写，例如：`OPEN_AI_API_KEY`。

###### 运行

点击运行按钮，即可运行。

### 登陆

运行之后会出现一个二维码，使用微信扫码即可完成登陆。扫码成功后日志会打印：Start auto replying.

<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f55f5c682474b95a8c4c9a781d5f663~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2202&h=1002&s=313303&e=png&b=24272e" alt="image.png" width="50%" /></p>

### 测试

你可以使用对话测试，也可通过内置命令查看：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c40e9294a8741eb93144df355db27c9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=840&h=908&s=310893&e=png&b=fafafa" alt="image.png" width="50%" /></p>

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19ad01e80c0d44f0b122f35b2a5a5522~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=844&h=826&s=272229&e=png&b=f9f9f9" alt="image.png" width="50%" /></p>

### 说明

- tool 插件是默认开启的，如果配置 Link-Ai key 和 code 的话默认打开文档总结，支持链接和微信卡片链接。
- Link-Ai 是根据会话 Token 收费的，但是可以通过积分免费使用。
- 可以开启语音识别功能
- 我用的是小号微信登陆的，在大号建立的会话窗口
- 部分插件功能原作者还在开发测试调优中

好了，今天的分享就到这里了，感谢你的阅读，欢迎关注我的公众号：萌萌哒草头将军
