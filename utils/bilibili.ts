import { siteConfig } from '@/config/site'

export interface BilibiliVideo {
  id: string
  bvid: string
  title: string
  cover: string
  link: string
  pubDate: string
  views: number
  description: string
}

export async function fetchCollectionVideos(seasonId: string = siteConfig.bilibili.collectionId): Promise<BilibiliVideo[]> {
  const response = await fetch(`/api/bilibili?seasonId=${seasonId}`)

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch bilibili videos')
  }

  return data.data.archives.map((video: any) => ({
    id: video.aid,
    bvid: video.bvid,
    title: video.title,
    cover: video.pic,
    link: `https://www.bilibili.com/video/${video.bvid}`,
    pubDate: new Date(video.pubdate * 1000).toLocaleDateString('zh-CN'),
    views: video.stat.view,
    description: video.description
  }))
} 