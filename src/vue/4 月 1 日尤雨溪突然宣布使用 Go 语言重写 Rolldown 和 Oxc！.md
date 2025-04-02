---
title: 4 月 1 日尤雨溪突然宣布使用 Go 语言重写 Rolldown 和 Oxc！
isTimeLine: true
date: 2025-04-01
category:
  - 前端
tag:
  - Vue
---

### 前言

今天（`2025`年`4`月`1`日），尤雨溪发布推特，将用`Go`重写`rolldow`、`Oxc`！（不太好分辨是不是 `Fake News`）

![Rolldown Oxc 将用 Go 重写](https://files.mdnice.com/user/43422/d9cb768b-c274-47ca-8721-45d61ded13cc.png)

前段时间，`TypeScript` 官方宣布将使用 `Go` 重写，速度将快 `10x`！

![ts 将用 Go 重写](https://files.mdnice.com/user/43422/9b760ab4-742e-4942-9ce6-ab6cb9ea156f.png)

近年来，前端工程化面临前所未有的挑战：项目规模呈指数级增长，构建时间从秒级延长到分钟级，开发者体验急剧下降。

所以，前端工具链正从 `JavaScript/TypeScript` 逐步迁移到系统级语言（`Go/Rust`）。

#### 往期精彩推荐

- [TanStack：一款为现代 Web 开发打造的强大、无头且类型安全的库集合](https://mp.weixin.qq.com/s?__biz=Mzg2Mjc0NDc3OA==&mid=2247487736&idx=1&sn=cb970e6bb1712baaca82a36d844a97e1&scene=21#wechat_redirect)
- [Zod 深度解析：TypeScript 运行时类型安全的终极实践](https://mp.weixin.qq.com/s?__biz=Mzg2Mjc0NDc3OA==&mid=2247487693&idx=1&sn=22b292c563cb2dca376efdca0b6a37a5&scene=21#wechat_redirect)
- [Alova.js 现代化请求库完全指南](https://mp.weixin.qq.com/s?__biz=Mzg2Mjc0NDc3OA==&mid=2247487549&idx=1&sn=3ce30ea55bfd058a369e87de13cb3197&scene=21#wechat_redirect)
- 更多精彩内容欢迎关注我的公众号：萌萌哒草头将军

### 现状 🚀

##### **Go 阵营**：

- **esbuild**：极快的打包速度（Go 的并发设计优势）。
- **typescript**（将来）：底层支持 Go。
- **Vite 的 Rolldown**（可能）：利用 Go 重写 Rollup 核心。

##### **Rust 阵营**：

- **SWC**：替代 `Babel/Terser`，`Rust` 的并行解析优势。
- **Oxc**：高性能的 `JavaScript` 工具链（代替 `ESLint`）。
- **Parcel 2**：底层使用 `Rust` 重写。
- **Rome 工具链**：从 `TypeScript` 转向 `Rust`。

### 为什么 ❓

`JavaScript` 作为前端的发家语言，虽然语法简单，适合快速开发，生态丰富，但仍弱于原生编译语言。

但其单线程的设计，使其面对打包文件进行大量`I/O`操作的场景时无法充分发挥多核系统的优势！

且动态语言特性易引入安全漏洞，比如：原型链污染、依赖注入攻击！

而像 `Go` 的轻量级协程（`Goroutine`）和 `Rust` 的无畏并发模型，能更好利用多核 `CPU` 资源，

同时作为静态语言，编译时捕获大多数错误！

通常 `JavaScript` 需依赖 `TypeScript` 弥补静态类型检查，防止出现 `Cannot read property 'x' of undefined` 的情况！

### 将来 🔭

可以遇见，底层工具链逐渐会选择高性能的语言代替 `JavaScript/TypeScript`

而使用 `NodeJs` 作为中间层，粘合 `JavaScript/TypeScript`，是势不可挡的大趋势！

### 总结

前端工具链向系统语言的迁移反映了工程领域对性能的持续追求。`Go` 和 `Rust` 各有优势，选择时需结合实际需求和技术储备。

这一趋势预计将持续发展，但本体语言 `JavaScript` 仍将在配置和插件层保持重要地位！

#### 往期精彩推荐

- [TanStack：一款为现代 Web 开发打造的强大、无头且类型安全的库集合](https://mp.weixin.qq.com/s?__biz=Mzg2Mjc0NDc3OA==&mid=2247487736&idx=1&sn=cb970e6bb1712baaca82a36d844a97e1&scene=21#wechat_redirect)
- [Zod 深度解析：TypeScript 运行时类型安全的终极实践](https://mp.weixin.qq.com/s?__biz=Mzg2Mjc0NDc3OA==&mid=2247487693&idx=1&sn=22b292c563cb2dca376efdca0b6a37a5&scene=21#wechat_redirect)
- [Alova.js 现代化请求库完全指南](https://mp.weixin.qq.com/s?__biz=Mzg2Mjc0NDc3OA==&mid=2247487549&idx=1&sn=3ce30ea55bfd058a369e87de13cb3197&scene=21#wechat_redirect)
- 更多精彩内容欢迎关注我的公众号：萌萌哒草头将军
