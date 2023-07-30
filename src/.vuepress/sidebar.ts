import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "React系列",
      icon: "react",
      prefix: "react/",
      children: "structure",
    },
    {
      text: "Vue系列",
      icon: "vue",
      prefix: "vue/",
      children: "structure",
    },
    {
      text: "Vite系列",
      icon: "tool",
      prefix: "vite/",
      children: "structure",
    },
    {
      text: "新框架尝鲜系列",
      icon: "geometry",
      prefix: "framework/",
      children: "structure",
    },
    {
      text: "杂谈",
      icon: "study",
      prefix: "posts/",
      children: "structure",
    },
    // "intro",
    // "slides",
  ],
});
