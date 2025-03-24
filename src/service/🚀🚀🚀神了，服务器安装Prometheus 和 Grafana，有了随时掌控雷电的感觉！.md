---
title: 🚀🚀🚀神了，服务器安装Prometheus 和 Grafana，有了随时掌控雷电的感觉！
isTimeLine: true
date: 2023-03-11
category:
  - 服务器
tag:
  - 服务器
---

大家好呀，在运行一些服务时，我们可能想看看系统指标的占用情况，所以本文将介绍如何在 CentOS 服务器上安装 Prometheus 和 Grafana，并生成系统 CPU、内存使用率的仪表盘，可以按照以下步骤操作。

### 一、安装 Prometheus

#### 1. 下载 Prometheus

首先，访问 [Prometheus 官网](https://prometheus.io/download/) 获取最新版本的下载链接，然后使用 `wget` 下载：

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.47.0/prometheus-2.47.0.linux-amd64.tar.gz
```

#### 2. 解压并安装

解压下载的文件：

```bash
tar -xvzf prometheus-2.47.0.linux-amd64.tar.gz
```

将解压后的文件夹移动到 `/opt/prometheus`：

```bash
sudo mv prometheus-2.47.0.linux-amd64 /opt/prometheus
```

#### 3. 创建 Prometheus 用户

为了安全，创建一个专用用户来运行 Prometheus：

```bash
sudo useradd --no-create-home --shell /bin/false prometheus
sudo chown -R prometheus:prometheus /opt/prometheus
```

#### 4. 配置 Prometheus

编辑 Prometheus 配置文件 `/opt/prometheus/prometheus.yml`：

```bash
sudo nano /opt/prometheus/prometheus.yml
```

添加以下内容：

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "node_exporter"
    static_configs:
      - targets: ["localhost:9100"]

  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
```

#### 5. 创建 Systemd 服务

创建 Systemd 服务文件 `/etc/systemd/system/prometheus.service`：

```bash
sudo nano /etc/systemd/system/prometheus.service
```

添加以下内容：

```ini
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
ExecStart=/opt/prometheus/prometheus \
    --config.file=/opt/prometheus/prometheus.yml \
    --storage.tsdb.path=/opt/prometheus/data
Restart=always

[Install]
WantedBy=multi-user.target
```

#### 6. 启动 Prometheus

启动并启用 Prometheus 服务：

```bash
sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus
```

#### 7. 验证 Prometheus

访问 `http://<服务器IP>:9090`，如果看到 Prometheus 的 Web 界面，说明安装成功。

### 二、安装 Node Exporter

Node Exporter 用于收集系统指标（如 CPU、内存使用率）。

#### 1. 下载 Node Exporter

```bash
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz
```

#### 2. 解压并安装

```bash
tar -xvzf node_exporter-1.6.1.linux-amd64.tar.gz
sudo mv node_exporter-1.6.1.linux-amd64/node_exporter /usr/local/bin/
```

#### 3. 创建 Systemd 服务

创建 Systemd 服务文件 `/etc/systemd/system/node_exporter.service`：

```bash
sudo nano /etc/systemd/system/node_exporter.service
```

添加以下内容：

```ini
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
```

#### 4. 为用户和组增加权限

```bash
sudo useradd -rs /bin/false node_exporter
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter
sudo chmod 755 /usr/local/bin/node_exporter
```

#### 5. 启动 Node Exporter

```bash
sudo systemctl daemon-reload
sudo systemctl start node_exporter
sudo systemctl enable node_exporter
```

#### 6. 验证 Node Exporter

访问 `http://<服务器IP>:9100/metrics`，如果看到系统指标数据，说明安装成功。

### 三、安装 Grafana

#### 1. 下载并安装 Grafana

```bash
sudo yum install -y https://dl.grafana.com/oss/release/grafana-10.1.1-1.x86_64.rpm
```

#### 2. 启动 Grafana

```bash
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```

#### 3. 访问 Grafana

访问 `http://<服务器IP>:3000`，使用默认账号 `admin` 和密码 `admin` 登录。

### 四、配置 Grafana 仪表盘

#### 1. 添加 Prometheus 数据源

1.  登录 Grafana，点击左侧菜单的 **Configuration > Data Sources**。
2.  点击 **Add data source**，选择 **Prometheus**。
3.  在 URL 中输入 `http://localhost:9090`，点击 Save & Test。

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e1d1197f0b4649088ffda36e99fddd1c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1743426352&x-orig-sign=h2AOKJL6SJ7lxlf%2FO7YffyDR2mg%3D)

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1051f61b7c4f4bff81da1ce085baf1c7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1743426352&x-orig-sign=brfR9rFJzHHHOT841w0uoGgZLPM%3D)

#### 2. 导入 Node Exporter 仪表盘

1.  在 `dashboad`页面点击 `Create` > `Import`。
2.  在 `Import via grafana.com` 中输入仪表盘 ID `1860`（Node Exporter 官方仪表盘）。
3.  选择 Prometheus 数据源，点击 `Import`。

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/15a24c960a064dd690ab0b792327824f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1743426352&x-orig-sign=UmbtlOqKzx13%2F1arMB5zH43Xh4k%3D)

#### 3. 查看仪表盘

导入成功后，你可以看到一个完整的系统监控仪表盘，包含 CPU、内存、磁盘、网络等指标。

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bb3eea6b36ba4b13834b21bdc48e54db~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1743426352&x-orig-sign=xxXtOSIoqch310pMz44y9y3%2FAbc%3D)

### 总结

好了，今天的分享就这些了，如果文章中有任何问题，欢迎指正，真心希望这篇文章帮到你！

记得关注我！谢谢！
