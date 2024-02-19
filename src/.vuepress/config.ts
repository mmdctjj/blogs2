import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/blogs2/",

  lang: "zh-CN",
  title: "萌萌哒草头将军",
  description: "萌萌哒草头将军的博客",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category as any,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag as any,
          formatter: "标签：$content",
        },
      ],
    }),
  ]
});
