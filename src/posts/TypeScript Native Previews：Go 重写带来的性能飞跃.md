---
title: TypeScript Native Previews：Go 重写带来的性能飞跃
isTimeLine: true
date: 2025-05-25
categories:
  - 前端
tags:
  - TypeScript
---

### 前言

今年三月，微软宣布使用 go 重写 ts，两个月后，预览版已经来了！

微软宣布 `TypeScript Native Previews` 现已广泛可用，标志着 `TypeScript` 生态系统的一次重大进步。

这一版本包括通过 `npm` 提供的原生 `TypeScript` 编译器和 `VS Code` 扩展！新版本在某些大型代码库中，编译时间可缩短至原来的十分之一，例如 `Sentry` 代码库的编译时间从 `72.81` 秒骤降至 `6.761` 秒。

这种性能提升得益于编译器采用 `Go` 语言重写，并通过 `Rust` 模块 `libsyncrpc` 实现与 `Node.js` 的高效通信，也为前端开发者和全栈开发者提供了更灵活的类型检查能力。

#### 往期精彩推荐

- [🚀🚀🚀 AI 助手好写，太好写了，分分钟写出来，不用一周，三分钟！](https://juejin.cn/post/7506754146893725750)
- [优雅，太优雅了，NestJS 🔥 实在是太优雅了！🚀🚀🚀](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- [🚀🚀 🚀 太棒了，有了它，终于不用翻阅屎山 💩 代码了！](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军

### 正文

#### 安装与使用

用户可通过以下命令安装编译器：

```bash
npm install -D @typescript/native-preview
```

编译器使用 `tsgo` 命令运行，用法与传统 `tsc` 类似，例如：

```bash
npx tsgo --project ./src/tsconfig.json
```

`VS Code` 用户可通过命令面板启用扩展：

```json
"typescript.experimental.useTsgo": true
```

安装过程简单，适合快速上手，但需注意配置环境以确保兼容性。

#### 当前状态与限制

尽管性能提升显著，当前版本仍为预览版，存在功能限制：

- 不支持 `--build` 模式，影响多项目引用场景；
- 缺少 `--declaration` 发行功能，无法生成类型定义文件；
- 部分降级发行目标（如 `node` 和 `node10` 模块解析）已被弃用，推荐使用 `node16` 或 bundler；
- 编辑器功能方面，自动导入、查找所有引用和重命名等特性尚未实现，可能影响开发体验。用户需权衡性能提升与功能完整性。

#### 未来展望

Microsoft 计划在 2025 年底前推出完整编译器，将 `tsgo` 整合为 `tsc`，并纳入 `TypeScript` 包。未来版本将支持 `--build` 模式、声明发行及更多语言服务功能，如重构和代码导航。

### 最后

这一版本的发布不仅展示了 `TypeScript` 团队对性能的关注，也为未来的 `TypeScript 7` 奠定了基础，预计将进一步提升开发效率。

#### 往期精彩推荐

- [🚀🚀🚀 AI 助手好写，太好写了，分分钟写出来，不用一周，三分钟！](https://juejin.cn/post/7506754146893725750)
- [优雅，太优雅了，NestJS 🔥 实在是太优雅了！🚀🚀🚀](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- [🚀🚀 🚀 太棒了，有了它，终于不用翻阅屎山 💩 代码了！](https://juejin.cn/user/1116759543260727/posts "https://juejin.cn/user/1116759543260727/posts")
- 更多精彩文章欢迎关注我的公众号：萌萌哒草头将军
