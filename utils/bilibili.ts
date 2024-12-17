import { BilibiliVideo } from '@/types/bilibili'
import { siteConfig } from '@/config/site'

const getBilibiliConfig = () => {
  return {
    mid: process.env.NEXT_PUBLIC_BILIBILI_MID || siteConfig.bilibili.mid,
    collectionId: process.env.NEXT_PUBLIC_BILIBILI_COLLECTION_ID || siteConfig.bilibili.collectionId
  }
}

export async function fetchCollectionVideos(
  collectionId?: string, 
  mid?: string
): Promise<BilibiliVideo[]> {
  try {
    // 使用传入的参数或配置值
    const config = getBilibiliConfig()
    const finalMid =  config.mid
    const finalCollectionId =  config.collectionId

    const response = await fetch(`/api/bilibili?mid=${finalMid}&collectionId=${finalCollectionId}`)
    const data = await response.json()
    
    if (!response.ok || data.code !== 0) {
      throw new Error(data.message || 'Failed to fetch bilibili videos')
    }

    return data.data.archives.map((video: any) => ({
      id: video.aid,
      bvid: video.bvid,
      title: video.title,
      pic: video.pic,
      link: `https://www.bilibili.com/video/${video.bvid}`,
      pubDate: new Date(video.pubdate * 1000).toLocaleDateString('zh-CN'),
      views: video.stat.view,
      description: video.description || ''
    }))
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
} 