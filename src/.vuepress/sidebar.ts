import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // 特定路径的侧边栏配置
  "/react/": "structure",
  "/framework/": "structure",
  "/vite/": "structure",
  "/vue/": "structure",
  "/posts/": "structure",

  // 根路径的默认侧边栏配置，作为回退
  "/": [
    {
      text: "首页",
      link: "/",
    },
    {
      text: "React 系列",
      link: "/react/",
    },
    {
      text: "Vue 系列",
      link: "/vue/",
    },
    {
      text: "Vite 系列",
      link: "/vite/",
    },
    {
      text: "框架尝鲜",
      link: "/framework/",
    },
  ],
});
