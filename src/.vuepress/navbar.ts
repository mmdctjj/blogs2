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
    text: "AI工具系列",
    icon: "article",
    link: "/ai-tools/",
  },
  {
    text: "服务器",
    icon: "article",
    link: "/service/",
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
