import { BilibiliVideo } from '@/types/bilibili'



export async function fetchCollectionVideos(collectionId: string, mid: string): Promise<BilibiliVideo[]> {
  try {
    const response = await fetch(`/api/bilibili?collectionId=${collectionId}`)
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