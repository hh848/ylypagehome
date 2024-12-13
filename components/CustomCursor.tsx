'use client'

import { useEffect, useState } from 'react'

interface Position {
  x: number
  y: number
}

interface Trail {
  id: string
  x: number
  y: number
  opacity: number
  scale: number
}

interface Firework extends Trail {
  velocityX: number
  velocityY: number
}

export default function CustomCursor() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [trails, setTrails] = useState<Trail[]>([])
  const [fireworks, setFireworks] = useState<Firework[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [lastTrailPosition, setLastTrailPosition] = useState<Position | null>(null)

  // 创建烟花效果
  const createFireworks = (x: number, y: number) => {
    const particleCount = 12
    const timestamp = Date.now()
    const newFireworks = Array.from({ length: particleCount }, (_, i) => {
      const angle = (i * 2 * Math.PI) / particleCount
      const velocity = 5 + Math.random() * 3
      return {
        id: `firework-${timestamp}-${i}`,
        x,
        y,
        opacity: 1,
        scale: 0.8,
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity
      }
    })
    setFireworks(prev => [...prev, ...newFireworks])
  }

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const currentX = e.clientX
      const currentY = e.clientY
      setPosition({ x: currentX, y: currentY })
      setIsVisible(true)

      // 计算鼠标移动方向的单位向量
      if (lastTrailPosition) {
        const dx = currentX - lastTrailPosition.x
        const dy = currentY - lastTrailPosition.y
        const distance = Math.hypot(dx, dy)
        
        if (distance > 30) {
          // 在鼠标移动方向后方20px处添加星星
          const trailX = currentX - (dx / distance) * 20
          const trailY = currentY - (dy / distance) * 20
          
          const timestamp = Date.now()
          setTrails(prev => [
            ...prev.slice(-20),
            {
              id: `trail-${timestamp}-${Math.random()}`,
              x: trailX,
              y: trailY,
              opacity: 1,
              scale: 1
            }
          ])
          setLastTrailPosition({ x: currentX, y: currentY })
        }
      } else {
        setLastTrailPosition({ x: currentX, y: currentY })
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      createFireworks(e.clientX, e.clientY)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', updatePosition)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // 设置自定义鼠标样式 - 箭头式
    document.documentElement.style.cursor = 'none'
    document.body.style.cursor = `
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M2.4,2.4l8.4,19.2l2.4-8.4l8.4-2.4L2.4,2.4z' fill='%23f9a8d4'/%3E%3C/svg%3E")
      0 0,
      auto
    `

    return () => {
      document.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.style.cursor = 'auto'
      document.body.style.cursor = 'auto'
    }
  }, [lastTrailPosition])

  // 更新轨迹和烟花效果
  useEffect(() => {
    const interval = setInterval(() => {
      // 更新轨迹
      setTrails(prev => prev.map(trail => ({
        ...trail,
        opacity: trail.opacity - 0.015,
        scale: trail.scale - 0.02
      })).filter(trail => trail.opacity > 0 && trail.scale > 0))

      // 更新烟花
      setFireworks(prev => prev.map(fw => ({
        ...fw,
        x: fw.x + fw.velocityX,
        y: fw.y + fw.velocityY,
        opacity: fw.opacity - 0.02,
        scale: fw.scale - 0.01,
        velocityX: fw.velocityX * 0.98,
        velocityY: fw.velocityY * 0.98 + 0.1 // 添加重力效果
      })).filter(fw => fw.opacity > 0 && fw.scale > 0))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* 轨迹星星 */}
      {trails.map((trail) => (
        <div
          key={`trail-${trail.id}`}
          className="fixed pointer-events-none z-40"
          style={{
            left: trail.x - 6,
            top: trail.y - 6,
            opacity: trail.opacity,
            transform: `scale(${trail.scale})`,
            transition: 'all 0.3s ease-out',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            className="text-pink-300"
            style={{
              filter: `drop-shadow(0 0 ${3 * trail.opacity}px rgba(249, 168, 212, ${trail.opacity}))`
            }}
          >
            <path
              fill="currentColor"
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            />
          </svg>
        </div>
      ))}

      {/* 烟花效果 */}
      {fireworks.map((fw) => (
        <div
          key={`firework-${fw.id}`}
          className="fixed pointer-events-none z-40"
          style={{
            left: fw.x - 6,
            top: fw.y - 6,
            opacity: fw.opacity,
            transform: `scale(${fw.scale})`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            className="text-pink-400"
            style={{
              filter: `drop-shadow(0 0 ${4 * fw.opacity}px rgba(249, 168, 212, ${fw.opacity}))`
            }}
          >
            <path
              fill="currentColor"
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            />
          </svg>
        </div>
      ))}
    </>
  )
} 