'use client'

import { useEffect, useState } from 'react'

interface ConfettiProps {
  onComplete?: () => void
}

export function Confetti({ onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    color: string
    rotation: number
    scale: number
    velocityX: number
    velocityY: number
  }>>([])

  useEffect(() => {
    const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899']
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      velocityX: (Math.random() - 0.5) * 4,
      velocityY: Math.random() * 3 + 2,
    }))
    setParticles(newParticles)

    const timeout = setTimeout(() => {
      onComplete?.()
    }, 3000)

    return () => clearTimeout(timeout)
  }, [onComplete])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute h-3 w-3 animate-confetti rounded-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            animation: `confetti-fall 3s ease-out forwards`,
            '--velocity-x': `${particle.velocityX}vw`,
            '--velocity-y': `${particle.velocityY}vh`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
