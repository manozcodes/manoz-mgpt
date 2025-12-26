"use client"

import { useEffect, useRef, useState } from "react"
import { useMusicPlayerStore } from "@/store/music-player-store"
import { Text, Thumbnail } from "@/shared-ui"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const nowPlaying = useMusicPlayerStore((state) => state.nowPlaying)
  const isPlaying = useMusicPlayerStore((state) => state.isPlaying)
  const currentTime = useMusicPlayerStore((state) => state.currentTime)
  const volume = useMusicPlayerStore((state) => state.volume)
  
  const play = useMusicPlayerStore((state) => state.play)
  const pause = useMusicPlayerStore((state) => state.pause)
  const togglePlayPause = useMusicPlayerStore((state) => state.togglePlayPause)
  const setCurrentTime = useMusicPlayerStore((state) => state.setCurrentTime)
  const setNowPlaying = useMusicPlayerStore((state) => state.setNowPlaying)
  
  const [duration, setDuration] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!audioRef.current || !nowPlaying) return

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error)
        pause()
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, nowPlaying, pause])

  useEffect(() => {
    if (!audioRef.current || !isPlaying) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
      return
    }

    progressIntervalRef.current = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }, 100)

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPlaying, setCurrentTime])

  useEffect(() => {
    if (!audioRef.current) return

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration)
      }
    }

    const handleEnded = () => {
      pause()
      setCurrentTime(0)
    }

    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)
    audioRef.current.addEventListener("ended", handleEnded)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audioRef.current.removeEventListener("ended", handleEnded)
      }
    }
  }, [nowPlaying, pause, setCurrentTime])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (nowPlaying && audioRef.current) {
      setCurrentTime(0)
      setDuration(0)
    }
  }, [nowPlaying?.id, setCurrentTime])

  const handlePrevious = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
    }
  }

  const handleNext = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
    }
  }

  const handleShare = () => {
    if (navigator.share && nowPlaying) {
      navigator.share({
        title: nowPlaying.title,
        text: `Check out this track: ${nowPlaying.title}`,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href)
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <TooltipProvider>
      <AnimatePresence mode="wait">
        {nowPlaying && (
          <motion.div
            key={nowPlaying.id}
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="fixed bottom-0 left-0 md:left-[200px] right-0 z-[100] flex justify-center px-4 md:px-8 pb-6"
          >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="w-full max-w-[808px] bg-[#0A0C0D] rounded-2xl border border-[#1a1a1a]/50 backdrop-blur-xl shadow-2xl shadow-black/50 p-3 relative"
            role="region"
            aria-label="Music player controls"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    pause()
                    setNowPlaying(null)
                  }}
                  className="absolute top-[-8] right-[-8] w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer z-10 focus:outline-none focus:ring-2 focus:ring-[#ff7b16] focus:ring-offset-2 focus:ring-offset-[#0A0C0D]"
                  aria-label="Close music player"
                >
                  <svg className="w-3.5 h-3.5 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close player</p>
              </TooltipContent>
            </Tooltip>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="shrink-0 cursor-pointer"
                >
                  <Thumbnail
                    src={nowPlaying.image || "/icons/thumbnail.svg"}
                    alt={nowPlaying.title}
                    size="md"
                    shape="square"
                    className="shrink-0 rounded-[16px] shadow-lg"
                  />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <Text size="sm" className="text-white/50 font-medium truncate">
                    {nowPlaying.title}
                  </Text>
                  {nowPlaying.artist && (
                    <Text size="xs" color="muted" className="truncate">
                      {nowPlaying.artist}
                    </Text>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsShuffle(!isShuffle)}
                      className={`p-2 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff7b16] focus:ring-offset-2 focus:ring-offset-[#0A0C0D] ${
                        isShuffle 
                          ? "text-white bg-white/10" 
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                      aria-label={isShuffle ? "Disable shuffle" : "Enable shuffle"}
                      aria-pressed={isShuffle}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
                      </svg>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isShuffle ? "Disable shuffle" : "Enable shuffle"}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePrevious}
                      className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                      </svg>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Previous track</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={togglePlayPause}
                      className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/15 transition-colors shadow-lg cursor-pointer"
                    >
                      {isPlaying ? (
                        <svg className="w-6 h-6 text-white/50" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-white/50" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isPlaying ? "Pause" : "Play"}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNext}
                      className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                      </svg>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Next track</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsRepeat(!isRepeat)}
                      className={`p-2 rounded-full transition-colors cursor-pointer ${
                        isRepeat 
                          ? "text-white bg-white/10" 
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
                      </svg>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isRepeat ? "Disable repeat" : "Enable repeat"}</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2 rounded-full transition-colors cursor-pointer ${
                        isLiked 
                          ? "text-[#ff7b16]" 
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isLiked ? "Unlike" : "Like"}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </motion.div>

            <audio
              ref={audioRef}
              src={nowPlaying.audioUrl}
              preload="metadata"
              aria-label={`Playing ${nowPlaying.title}${nowPlaying.artist ? ` by ${nowPlaying.artist}` : ""}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  )
}

