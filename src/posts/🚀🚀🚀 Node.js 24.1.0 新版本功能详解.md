---
title: 🚀🚀🚀 Node.js 24.1.0 新版本功能详解
isTimeLine: true
date: 2025-05-23
categories:
  - 前端
tags:
  - TypeScript
---

### 前言

凌晨，Node.js 官方发布了 `24.1.0` 版本，快来跟我看看更新了哪些内容吧！

#### 往期精彩推荐

- [🚀🚀🚀 AI 助手好写，太好写了，分分钟写出来，不用一周，三分钟！](https://juejin.cn/post/7506754146893725750)
- [优雅，太优雅了，NestJS 🔥 实在是太优雅了！🚀🚀🚀](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- [🚀🚀 🚀 太棒了，有了它，终于不用翻阅屎山 💩 代码了！](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军

#### 正文

`Node.js 24.1.0` 版本引入了一系列新功能和改进，涵盖 `文件系统`、`HTTP/2`、`调试工具`、`REPL` 等多个模块！

##### 1. 文件系统（`fs`）模块增强

`Node.js 24.1.0` 对文件系统模块进行了两项重要改进：

- **显式资源管理支持**：为 `Dir` 类添加了显式资源管理支持（标记为 `SEMVER-MINOR`）。这一改进通过优化目录资源管理，可能减少资源泄漏问题并提升性能，尤其在处理大量文件操作时效果显著。
- **`URL` 支持**：为 `fs.glob` 的 `cwd` 选项添加了对 `URL` 的支持。开发者现在可以使用 `URL` 格式指定工作目录，例如：
  ```javascript
  import { glob } from "fs/promises";
  await glob("*.js", { cwd: new URL("file:///path/to/dir/") });
  ```
  这增加了文件操作的灵活性，特别是在跨平台开发中。

##### 2. `HTTP/2` 模块

`Node.js 24.1.0` 为 `HTTP/2` 模块新增了两个诊断通道：

- **`http2.client.stream.start`**：用于监控 `HTTP/2` 客户端流的启动事件，帮助开发者跟踪流的初始化过程。
- **`http2.client.stream.created`**：用于监控 `HTTP/2` 客户端流的创建事件，提供流的创建时间和状态信息。
  这些通道为调试高性能网络应用提供了更细粒度的工具。例如，开发者可以通过监听这些事件来分析 `HTTP/2` 流的性能瓶颈。

##### 3. `Inspector` 模块

- **Worker 检查支持**：`Node.js 24.1.0` 在 `Chrome DevTools` 中支持 worker 线程的检查。通过使用 `--experimental-worker-inspection` 标志，开发者可以调试多线程 `Node.js` 应用程序。例如：
  ```javascript
  node --inspect-brk --experimental-worker-inspection index.js
  ```
  这一功能利用了 `Chrome DevTools Protocol` 的 `Target` 域，通过 `attachedToTarget` 事件管理每个 worker 线程的调试会话。这对于开发复杂的并发应用（如多线程数据处理）尤为重要。

##### 4. `REPL` 模块

`REPL`（交互式解释器）模块在用户体验方面得到了显著改进：

- **垂直光标移动**：新增了适当的垂直光标移动功能，允许用户在多行输入中更自然地上下移动光标，提升了交互效率。
- **多行命令编辑**：支持在输入多行命令时进行编辑。例如，开发者可以在输入以下代码时随时修改：
  ```javascript
  function example() {
    console.log("Hello");
    // 可以插入新行或编辑现有行
  }
  ```
  这一功能仅在 `TTY` 环境中有效，且需要命令不完整（如缺少闭合括号）才能插入新行。未来可能通过快捷键（如 `Shift + Enter`）进一步优化。

##### 5. `SQLite` 模块

- **备份功能增强**：为 `sqlite.backup()` 方法添加了 `name` 和 `length` 参数，允许更精确地控制备份操作。例如：
  ```javascript
  db.backup({ name: "backup.db", length: 1024 });
  ```
- **构建选项**：新增了无 `SQLite` 的构建选项，开发者可以通过配置跳过 `SQLite` 依赖，适合轻量级部署场景。

##### 6. 测试运行器（`test_runner`）

- **行为统一**：当隔离模式为 `none` 时，统一了 `--require` 和 `--import` 的行为，确保测试运行器在不同模块加载方式下表现一致。这减少了配置错误的可能性。

##### 7. `URL` 模块

- **性能改进**：优化了 `format` 函数的性能，提高了 `URL` 处理的效率。例如：
  ```javascript
  import { format } from "url";
  format(new URL("http://example.com")); // 更快地生成格式化 URL
  ```
  这在高负载的 `Web` 应用中尤为重要。

##### 8. `Util` 模块

- **内部函数**：新增了内部函数 `assignFunctionName()`，用于更方便地管理函数名称，可能提升代码的可读性和调试效率。

##### 9. 其他改进

- **代码覆盖率**：相关更改的代码覆盖率较高，例如 `REPL` 模块的补丁覆盖率达到 `99.55%`，确保了新功能的稳定性。
- **平台支持**：`Node.js 24.1.0` 提供了适用于 `Windows`、`macOS`、`Linux` 等多个平台的二进制文件和源代码，开发者可从官方 `Node.js` 网站下载。

这些更新体现了 `Node.js` 社区对性能、调试能力和用户体验的持续关注，为开发者提供了更强大的工具来应对现代开发需求。

### 最后

`Node.js 24.1.0` 版本通过一系列功能增强和优化，为开发者带来了更强大的开发支持。从文件系统和 `HTTP/2` 的改进，到调试能力和 `REPL` 体验的提升，这些更新都为构建高效、可靠的应用程序提供了便利。希望本文能帮助您快速掌握这一版本的亮点，并在实际开发中灵活运用。

今天的分享就这些了，感谢大家的阅读，如果文章中存在错误的地方欢迎指正！

#### 往期精彩推荐

- [🚀🚀🚀 AI 助手好写，太好写了，分分钟写出来，不用一周，三分钟！](https://juejin.cn/post/7506754146893725750)
- [优雅，太优雅了，NestJS 🔥 实在是太优雅了！🚀🚀🚀](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- [🚀🚀 🚀 太棒了，有了它，终于不用翻阅屎山 💩 代码了！](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军
