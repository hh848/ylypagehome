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

export interface BilibiliResponse {
  code: number
  message: string
  data: {
    info: {
      media_count: number
    }
    medias: BilibiliVideo[]
  }
} 