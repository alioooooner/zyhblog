module.exports = {
  "title": "zyhblog",
  "description": "小白博客",
  "base": "/zyhblog/",
  "dest": "dist",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  plugins: [
    [
      "vuepress-plugin-cursor-effects",
      {
        size: 2,                    // size of the particle, default: 2
        shape: 'circle',  // shape of the particle, default: 'star'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],
    // 支持中文文件名
    [
      "permalink-pinyin",
      {
        lowercase: true, // Converted into lowercase, default: true
        separator: "-", // Separator of the slug, default: '-'
      },
    ],
    // 趣味动态表i
    [
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "Hello ~",
        hideIcon: "/failure.ico",
        hideText: "ByeBye ~",
        recoverTime: 2000
      }
    ],
    // 复制弹窗插件
    ["vuepress-plugin-nuggets-style-copy", {
      copyText: "复制代码",
      tip: {
          content: "复制成功!"
      }
    }],
    // 根据目录自动生成文件侧边栏
    ["vuepress-plugin-auto-sidebar", {}],
    ["meting", {
      meting: {
        // 歌单地址-> 如果输入可忽略server|type|mid
        // 但是不知道为什么不写上这三个会报错, 所以我都写上了
        auto: 'https://music.163.com/#/song?id=1892295825',
        // 当前服务为netease -> 网易
        server: "netease",
        // 类型为歌单
        type: "playlist",
        // 歌单id
        mid: "5312894314",
      },
      aplayer: {
        // 歌单为随机
        order: 'random',
        // 0为不显示歌词
        lrcType: 0,
        // 音量
        volume: 0.15,
        // 开启迷你模式
        mini: true,
        // 自动播放
        autoplay: true
      }
    }]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "首页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      // {
      //   "text": "Docs",
      //   "icon": "reco-message",
      //   "items": [
      //     {
      //       "text": "vuepress-reco",
      //       "link": "/docs/theme-reco/"
      //     }
      //   ]
      // },
      {
        "text": "GitHub",
        "link": "https://github.com/alioooooner",
        "icon": "reco-github"
      }
    ],
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      // {
      //   "title": "午后南杂",
      //   "desc": "Enjoy when you can, and endure when you must.",
      //   "email": "1156743527@qq.com",
      //   "link": "https://www.recoluan.com"
      // },
      // {
      //   "title": "vuepress-theme-reco",
      //   "desc": "A simple and beautiful vuepress Blog & Doc theme.",
      //   "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      //   "link": "https://vuepress-theme-reco.recoluan.com"
      // }
    ],
    "logo": "/avatar.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "zyh",
    "authorAvatar": "/avatar.png",
    "record": "A Blog",
    "startYear": "2021",
    "subSidebar": 'auto', // 自动形成侧边导航
  },
  "markdown": {
    "lineNumbers": true
  }
}