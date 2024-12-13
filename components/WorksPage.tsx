'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchCollectionVideos, BilibiliVideo } from '@/utils/bilibili'
import { siteConfig } from '@/config/site'

export default function WorksPage() {
  const [videos, setVideos] = useState<BilibiliVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true)
        const data = await fetchCollectionVideos()
        setVideos(data)
        setError(null)
      } catch (err) {
        console.error('Failed to load videos:', err)
        setError(err instanceof Error ? err.message : 'Failed to load videos')
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  if (error) {
    return (
      <div className="w-[800px] bg-white rounded-lg overflow-hidden shadow-lg p-8">
        <div className="text-center text-red-500">
          <p>Error loading videos: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[800px] bg-white rounded-lg overflow-hidden shadow-lg mb-32">
      {/* 浏览器样式标题栏 */}
      <div className="bg-gradient-to-r from-pink-100 to-pink-50 px-4 py-2 flex items-center justify-between border-b border-pink-200">
        <div className="flex space-x-2">
          <button className="w-3 h-3 rounded-full bg-pink-400"></button>
          <button className="w-3 h-3 rounded-full bg-pink-300"></button>
          <button className="w-3 h-3 rounded-full bg-pink-200"></button>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-pink-400 font-bold text-base">
          欢迎喵~♥
        </div>
      </div>

      {/* URL栏 */}
      <div className="bg-gradient-to-r from-pink-50 to-white px-4 py-2 flex items-center space-x-4 border-b border-pink-100">
        <div className="flex-1 flex items-center">
          <div className="flex items-center bg-white w-full px-3 py-1.5 rounded-full border border-pink-200 shadow-inner">
            <Image 
              src="/bilibili.svg"
              alt="bilibili"
              width={16}
              height={16}
              style={{ width: 'auto', height: '16px' }}
              className="mr-2"
            />
            <span className="text-pink-400 text-sm">collection/3226853</span>
          </div>
        </div>
      </div>

      {/* 作品集内容区 */}
      <div className="h-[500px] overflow-y-auto p-8">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {videos.map((video) => (
              <a
                key={video.aid}
                href={`https://www.bilibili.com/video/${video.bvid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video relative">
                  <Image
                    src={video.cover}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-500 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{video.pubDate}</span>
                    <span>{video.views.toLocaleString()} 播放</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 