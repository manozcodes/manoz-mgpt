"use client"

import { useState, useEffect, useRef } from "react"
import { Text } from "@/shared-ui"

interface MusicGenerationBoxProps {
  isGenerating?: boolean
  initialProgress?: number
  "aria-label"?: string
}

export function MusicGenerationBox({ 
  isGenerating = true, 
  initialProgress = 0,
  "aria-label": ariaLabel
}: MusicGenerationBoxProps) {
  const [displayProgress, setDisplayProgress] = useState(initialProgress)
  const prevProgressRef = useRef(initialProgress)
  const animationFrameRef = useRef<number | null>(null)

  // Sync with external progress updates (from WebSocket/Zustand store)
  // Smoothly animate to the target progress value
  useEffect(() => {
    if (!isGenerating) {
      setDisplayProgress(initialProgress)
      prevProgressRef.current = initialProgress
      return
    }

    const targetProgress = initialProgress
    const startProgress = prevProgressRef.current
    const difference = targetProgress - startProgress
    
    // If difference is small, update immediately
    if (Math.abs(difference) < 0.5) {
      setDisplayProgress(targetProgress)
      prevProgressRef.current = targetProgress
      return
    }

    // Cancel any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    // Smoothly animate to target progress
    let startTime = Date.now()
    const duration = 300 // Animation duration in ms

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / duration)
      
      // Ease-out cubic for smooth animation
      const easedT = 1 - Math.pow(1 - t, 3)
      const currentProgress = startProgress + difference * easedT
      
      setDisplayProgress(Math.round(currentProgress))

      if (t < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayProgress(targetProgress)
        prevProgressRef.current = targetProgress
        animationFrameRef.current = null
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [initialProgress, isGenerating])

  return (
    <div 
      className="relative w-[60px] h-[64px] flex-shrink-0 rounded-[12px] overflow-hidden music-gen-container"
      role="progressbar"
      aria-valuenow={displayProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel || `Generation progress: ${displayProgress}%`}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-purple-900 to-blue-900" />
      
      {/* Dark overlay to make gradient darker */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 music-gen-gradient-overlay" />
      
      {/* Radial waves from center */}
      <div className="absolute inset-0 music-gen-radial-waves" />
      
      {/* Vertical light streaks */}
      <div className="absolute inset-0 music-gen-vertical-streaks" />
      
      {/* Horizontal light streaks */}
      <div className="absolute inset-0 music-gen-horizontal-streaks" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 music-gen-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="music-gen-particle" style={{ '--particle-delay': `${i * 0.3}s` } as React.CSSProperties} />
        ))}
      </div>
      
      {/* Diagonal energy lines */}
      <div className="absolute inset-0 music-gen-diagonal-lines" />
      
      {/* Center content with progress */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <Text 
          as="span" 
          size="sm" 
          weight="medium" 
          className="music-gen-progress-text"
        >
          {displayProgress}%
        </Text>
      </div>
      
      {/* Soft glow overlay */}
      <div className="absolute inset-0 music-gen-glow-overlay pointer-events-none" />
    </div>
  )
}

