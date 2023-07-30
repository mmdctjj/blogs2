import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: 'React系列',
    icon: 'react',
    link: '/react/'
  },
  {
    text: 'Vue系列',
    icon: 'vue',
    link: '/vue/'
  },
  {
    text: 'Vite系列',
    icon: 'tool',
    link: '/vite/'
  },
  {
    text: '新框架尝鲜系列',
    icon: 'geometry',
    link: '/framework/'
  },
]);
