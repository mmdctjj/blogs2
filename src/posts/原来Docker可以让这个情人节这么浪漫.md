---
title: 🌹🌹原来Docker可以让这个情人💗节这么浪漫🌹🌹
isTimeLine: true
date: 2025-02-11
category:
  - Docker
tag:
  - Docker
---

> 📌 本文是正经的 docker 教程，如果你不打算使用 docker 那么直接拉取代码运行就可以了，如果你想使用 docker，但是不想配置，可以去我公众号后台回复：love，即可获得打包好的镜像

情人节马上要到了，正好最近发现了一个特别有意思的情侣相册的项目，遗憾的是目前不支持 docker，不过没关系，我出手了！

原项目地址：https://gitee.com/kiCode111/LikeGirl_5.1.0

下面是制作情侣小站 `镜像` 的过程

## 情侣小站

### Dockerfile

首先，我们拉去代码：

```bash
git clone https://gitee.com/kiCode111/LikeGirl_5.1.0.git
```

`clone` 代码后，在根目录下新建一个 `Dockerfile` 文件。

该文件用于自动化创建 `Docker` 镜像的过程。里面包含了运行这个应用所需的所有代码、库、依赖项和运行时环境。

由于该项目是`php`项目，所以我们需要指定基础镜像为`php`。

```Dockerfile
# 使用基础的PHP镜像作为基础
FROM php:apache

# 设置工作目录
WORKDIR /app

RUN docker-php-ext-install pdo_mysql mysqli
# 拷贝目录下的所有文件到工作目录
COPY / /app

# 定义容器启动时执行的命令（例如：运行PHP的内置服务器）
CMD ["php", "-S", "0.0.0.0:8383", "-t", "/app"]

```

### 增加环境变变量

接下来需要注释几个环境变量，打开`./admin/Config_DB.php` 文件，将下面的变量注释或删除掉。

```js
// localhost 为数据库地址 一般使用默认的即可 或（127.0.0.1）
// $db_address = "localhost";
//数据库用户名
// $db_username = "root";
//数据库密码
// $db_password = "123456";
//数据库表名
// $db_name = "LikeGirl20240612";
//敏感信息修改安全码 建议设置复杂一些
// $Like_Code = "Love";
```

### 准备好数据库

在你的机器上准备好 `mysql` 数据库，你可以使用 `docker` 镜像运行数据库或者服务器数据库，然后使用数据库客户端链接，根据准备好的文件`./love20240612.sql` 执行 `sql` 创建命令，创建对应的表。

推荐使用 `vscode` 插件，链接数据库，打开 `sql` 文件点击执行按钮快速创建

### 打包和运行

现在我们可以在根目录下使用下面的命令打包：

```bash
docker build -t love_girl:latest
```

查看打包好的镜像

```bash
docker images
```

保存到本地

```bash
docker save -o love_girl.tar love_girl:latest
```

`-o` 输出路径

上传到服务器后，我们还需要加载到服务器的 `docker` 镜像

```bash
docker load -i /path/to/love_girl.tar
```

`-i` 从什么路径加载进去

查看是否加载进去镜像

```bash
docker images
```

一切成功后，我们可以启动了，一种是命令行启动：

```bash
docker run -d \
  --name love \
  --restart always \
  -p 1314:8383 \
  -e DB_PASSWORD="xxx" \
  -e DB_NAME="xxx" \
  -e DB_USERNAME="root" \
  -e LIKE_CODE="xxxx" \
  -e DB_ADDRESS="192.168.x.xxx" \
  like_girl

```

或者我们使用 `docker-compose.yaml` 文件启动！

在你准备好的目录下面创建文件：`docker-compose.yaml`，内容如下：

```yaml
version: "3.2"

services:
  love:
    image: like_girl # 使用已创建的镜像
    ports:
      - "1314:8383"
    container_name: love
    restart: always
    environment:
      DB_PASSWORD: "xxx"
      DB_NAME: "xxx"
      DB_USERNAME: "root"
      LIKE_CODE: "xxxx"
      DB_ADDRESS: "192.168.x.xxx"
```

然后使用命令行：

```bash
docker-compose up -d
```

`-d` 后台启动

查看状态

```bash
docker-compose ps
```

关闭服务

```bash
docker-compose down
```

好了，现在我们打开 `http://localhost:1314` 就可以看到首页了！

进入管理页面： `http://localhost:1314/admin/`!

如果你已经有自己的图床提供图片链接，那么到这里就结束了，如果你还没有，可以接着部署一个图床！

## 配置图床

我使用的是蓝空图床，项目地址：https://github.com/lsky-org/lsky-pro

如果你想要 docker 镜像，通用可以到我公众号后台回复：love，根据情况下载即可！

部署前，我们需要在上面提到的数据库中新增一个存放图片信息的库，然后使用下面的命令运行安装蓝空图床，

```bash
docker network create lsky-net
```

```bash
docker run -d \
  --name lskypro \
  --restart unless-stopped \
  --hostname lskypro \
  -e WEB_PORT=8089 \
  -v ./web:/var/www/html/ \
  -p 9080:8089 \
  --network lsky-net \
  halcyonazure/lsky-pro-docker:latest
```

或者同样用 `docker-compose.yaml`文件启动!

```yaml
version: "3.2"
services:
  lskypro:
    image: halcyonazure/lsky-pro-docker:latest
    restart: unless-stopped
    hostname: lskypro
    container_name: lskypro
    environment:
      - WEB_PORT=8089
    volumes:
      - ./web:/var/www/html/
    ports:
      - "9080:8089"
    networks:
      - lsky-net

networks:
  lsky-net: {}
```

或者参考这里：https://hub.docker.com/r/halcyonazure/lsky-pro-docker

然后在首页配置刚才创建的数据库，即可自动创建对应组件，等创建完成，我们就可以上传图片之后得到图片链接了！

### 总结

希望大家都可以通过这个教程博美人一笑！

另外为了增加浪漫气氛，建议大家还可以：

- 偷偷换一个情侣壁纸
- 提前买好花朵、红酒、烛台，准备一个浪漫的烛光晚餐
- 提前做好一个手工作为礼物

提前祝大家情人节愉快～
