# 个人主页

这是一个基于 Next.js 构建的个人主页模板，支持自定义个人信息、社交媒体链接以及展示B站作品集。

## 预览

https://github.com/1dayluo/repo/assets/public/demo/demo.mp4

## 配置说明

所有配置文件都在 `config` 目录下:

### 基础配置 (`config/site.ts`)

```typescript
    export const siteConfig = {
    name: "你的名字",
    description: "个人简介",
    // 其他基础配置...
    }
```
### 个人介绍配置 (`config/profile.ts`)

在这里配置个人介绍部分的内容:

```typescript
export const profileConfig = {
avatar: "头像图片路径",
name: "显示名称",
description: "个人简介",
// 其他个人信息...
}

```

### 社交媒体配置 (`config/social.ts`)

配置各个社交媒体的链接:

```typescript
export const socialConfig = [
{ name: "社交媒体名称", url: "社交媒体链接", icon: "社交媒体图标路径" },
// 其他社交媒体...
]
```

### B站作品集配置 (`config/bilibili.ts`)

配置 B站作品集相关参数:

```typescript
export const bilibiliConfig = {
collection: "合集ID",
// 其他B站相关配置...
}
```

### 安装依赖
npm install
### 启动开发服务器
npm run dev
### 构建
npm run build

