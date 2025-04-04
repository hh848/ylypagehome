export const siteConfig = {
  name: "Neo's Blog",
  description: 'A personal website built with Next.js',
  author: {
    name: "NeoCat",
    title: "技术宅 | 50%进度全栈🍑",
    avatar: "/yly.png",
    description: "这里是写个人简介的地方哟~~~页面2展示选了一个b站老师"
  },
  bilibili: {
    mid: "797614",
    collectionId: "2001106",
    url: "https://space.bilibili.com/797614"
  },
  social: [
    {
      name: "知乎",
      url: "https://www.zhihu.com/people/your-profile",
      icon: "/zhihu.svg"
    },
    {
      name: "哔哩哔哩",
      url: "https://space.bilibili.com/your-id",
      icon: "/bilibili.svg"
    },
    {
      name: "Steam",
      url: "https://steamcommunity.com/your-profile",
      icon: "/steam.svg"
    }
  ],
  tags: [ "编程", "手作","绘画","游戏"],
  music: {
    id: "852135",
    server: "netease",
    type: "song",
    // autoPlay: true,
    theme: "#f9a8d4",
    fixed: true,
    mini: true
  }
} as const

export type SiteConfig = typeof siteConfig 
