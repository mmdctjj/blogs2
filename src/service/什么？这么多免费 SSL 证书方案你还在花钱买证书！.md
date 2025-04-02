---
title: 什么？这么多免费 SSL 证书方案你还在花钱买证书！
isTimeLine: true
date: 2023-04-02
category:
  - 服务器
tag:
  - 服务器
---

### 前言

上次我使用 `Caddy` 作为 Web 服务器，自动获取 `HTTPS` 证书时，有朋友指出 `Caddy` 使用的是 `HTTP-01` 挑战类型，签发证书的过程中，会暴露 `IP` ，存在安全隐患，的确是这样。

- 12

所以本文是我找到的几种十分安全的方式获取 `HTTPS` 证书的方法。

#### 往期精彩推荐

- [不吹不黑，自己拥有服务器一定要做这些事情](https://mp.weixin.qq.com/s?__biz=Mzg2Mjc0NDc3OA==&mid=2247487017&idx=1&sn=eec4994cbe72b523de20ffab9867a781&scene=21#wechat_redirect)
- [服务器防吃灰指南（二），不要只部署博客！](https://mp.weixin.qq.com/s?__biz=Mzg2Mjc0NDc3OA==&mid=2247487289&idx=1&sn=45aaefebe448e36877d7c802bc4b8015&scene=21#wechat_redirect)
- [神了，服务器安装 Prometheus 和 Grafana，有了随时掌控雷电的感觉！](https://mp.weixin.qq.com/s?__biz=Mzg2Mjc0NDc3OA==&mid=2247487133&idx=1&sn=5d9711a2c5aa52cba3bb3f76a92540c5&scene=21#wechat_redirect)
- 更多精彩内容欢迎关注我的公众号：萌萌哒草头将军

### 主要方案

#### `Let's Encrypt`

由非营利组织运营并提供免费 `TLS` 证书，在小型社区网站十分受欢迎。

总的来说有 3 种主要方案通过 `Let's Encrypt` 获得 `SSL` 证书，这些方式基于不同的挑战类型（`Challenge Types`）：

> 值的一提的是 `LS-ALPN-01` 不被 `Apache` 或 `Nginx` 支持，所以不在讨论这种方案。

##### 🚀 方案 1：`HTTP-01`

`HTTP-01` 是在网站根目录下放置一个文件（路径为 http://<YOUR_DOMAIN>/.well-known/acme-challenge/TOKEN），`Let's Encrypt` 通过 `HTTP` 请求验证文件是否存在，所以需要开放端口 80，

![`HTTP-01` Challenge](https://files.mdnice.com/user/43422/67181512-95a4-4559-bd34-0187996c9d14.png)

文件内容由 `ACME` 客户端生成，常见的客户端例如： `Caddy` `Certbot` 、 `acme.sh` 。

当你通过域名访问时，会顺着域名解析到服务器 `IP` ，导致 `IP` 地址暴露！

基于不安全的因素，我们也不讨论怎么使用 `HTTP-01` 了！

##### 🚀 方案 2：`DNS-01`

`DNS-01` 是在域名 DNS 记录中添加一个 TXT 记录（路径为 \_acme-challenge.<YOUR_DOMAIN>），`Let's Encrypt` 通过 `DNS` 查询验证记录内容。

![`DNS-01` Challenge](https://files.mdnice.com/user/43422/200f3d78-666a-4856-bf55-d2a69805e8f6.png)

不需要开放特定端口，但需等待 DNS 传播（可能长达 1 小时），支持通配符证书（例如 \*.example.com）。

###### 🚗 借助 `Caddy` 实现

虽然 `Caddy` 默认采用 `HTTP-01` 获取证书，但是也支持借助阿里云或者其他云服务平台实现更加安全的 `DNS-01` 挑战类型！

申请阿里云 `Access Key`

```bash
export ALIYUN_ACCESS_KEY="你的阿里云 Access Key ID"
export ALIYUN_SECRET_KEY="你的阿里云 Access Key Secret"
```

下载 `Caddy` 阿里云 DNS 插件：

```bash
xcaddy build --with github.com/caddy-dns/alidns
```

启用插件：

```caddyfile
example.com, *.example.com {
    root * /var/www/html
    file_server
    tls {
        dns aliyun {env.ALIYUN_ACCESS_KEY} {env.ALIYUN_SECRET_KEY}
    }
}
```

###### 🚗 借助 Nginx 实现

我已经写了一篇博客展示使用 Nginx + `DNS-01` 的文章了！

- 2223

###### 🚗 借助 `acme.sh` 实现

```bash
export Ali_Key="你的AccessKeyID"
export Ali_Secret="你的AccessKeySecret"
acme.sh --issue -d example.com -d '*.example.com' --dns dns_ali
```

#### `Cloudflare`

提供免费 `SSL`/`TLS`，自动续期，支持现代 `TLS` 协议，适合需要 CDN 支持的社区。

###### 🚗 将域名的 DNS 服务器切换到 `Cloudflare`

在 `Cloudflare` 添加你的阿里云域名，并按照指示更改 DNS 解析 到 `Cloudflare` 提供的 Nameservers（在阿里云的域名管理后台修改）。

###### 🚗 开启“代理模式”

确保 `Cloudflare` 的 DNS 设置中，主机记录的“橙色云朵”图标是开启状态，表示启用了 `Cloudflare` 代理。

###### 🚗 开启 `SSL`（`HTTPS`）

在 `Cloudflare` "`SSL`/`TLS`" 设置中，选择 Full 或 Full (Strict) 模式：

Full：适用于阿里云服务器支持 HTTP，但没有 `HTTPS` 的情况。

Full (Strict)：适用于阿里云服务器已经配置了 `HTTPS` 的情况，安全性更高。

![Cloudflare Full (Strict)](https://files.mdnice.com/user/43422/16af7d6e-6d42-4974-aa85-a11b413c70bb.png)

###### 🚗 强制 `HTTPS`

在 `Cloudflare` "`SSL`/`TLS`" → "Edge Certificates" 页面，启用：`Always Use HTTPS` 和 `Automatic HTTPS Rewrites`

###### 🚗 优缺点

优点是免费，缺点是需要将域名 `DNS` 托管到 `Cloudflare` ，国内访问速度可能会慢一些。

但是如果速度不是你担心的问题，那么确实是个很不错的选择！

#### 其他方案（了解为主）

- `ZeroSSL`： 提供 90 天免费证书，快速验证，适合自动化管理。

- `SSL For Free`：使用 `ZeroSSL`/`Let's Encrypt`，提供 `90` 天免费证书，过期需要手动续期，支持通配符，适合多子域社区。

- `Hostinger`：提供无限免费 `SSL`，附带托管计划，自动续期，但依赖于托管设置。

### 总结

`Let's Encrypt` 是最安全且最适合社区的免费 `HTTPS` 方案，`Cloudflare` 紧随其后，其他的方案要么适合团队定制使用，要么需要收费，不适合个人日常使用。

所以希望更多的小伙伴可以自己通过配置获得安全且免费的 `SSL` 证书，而不是花钱去买！

#### 往期精彩推荐

- [不吹不黑，自己拥有服务器一定要做这些事情](https://mp.weixin.qq.com/s?__biz=Mzg2Mjc0NDc3OA==&mid=2247487017&idx=1&sn=eec4994cbe72b523de20ffab9867a781&scene=21#wechat_redirect)
- [服务器防吃灰指南（二），不要只部署博客！](https://mp.weixin.qq.com/s?__biz=Mzg2Mjc0NDc3OA==&mid=2247487289&idx=1&sn=45aaefebe448e36877d7c802bc4b8015&scene=21#wechat_redirect)
- [神了，服务器安装 Prometheus 和 Grafana，有了随时掌控雷电的感觉！](https://mp.weixin.qq.com/s?__biz=Mzg2Mjc0NDc3OA==&mid=2247487133&idx=1&sn=5d9711a2c5aa52cba3bb3f76a92540c5&scene=21#wechat_redirect)
- 更多精彩内容欢迎关注我的公众号：萌萌哒草头将军
