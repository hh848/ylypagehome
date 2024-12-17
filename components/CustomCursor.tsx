'use client'

import { useEffect, useState } from 'react'

interface Position {
  x: number
  y: number
}

export default function CustomCursor() {
  // 用于追踪鼠标位置和控制动画效果
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updatePosition)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
    }
  }, [])

  return (
    <div 
      className="fixed pointer-events-none z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="w-4 h-4 bg-pink-400/50 rounded-full backdrop-blur-sm" />
    </div>
  )
} 