"use client"

import { Heading, Text, Card, Thumbnail, Button } from "@/shared-ui"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { useGenerationStore } from "@/store/generation-store"
import { useMusicPlayerStore } from "@/store/music-player-store"
import { MusicGenerationBox } from "@/components/music-generation-box"
import { Icon } from "@/shared-ui"

export default function RecentGenerations() {
  const generations = useGenerationStore((state) => state.generations)
  const isEmpty = useGenerationStore((state) => state.isEmpty())

  return (
    <TooltipProvider delayDuration={300}>
      <div>
        <Heading level="h2" className="mb-8 mt-20">
          Recent generations  
        </Heading>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center py-16 px-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff7b16]/20 to-[#e83edf]/20 flex items-center justify-center mb-6">
              <Icon name="wave" size={48} className="w-12 h-12 text-[#8B8F95]" />
            </div>
            <Heading level="h3" className="text-[#E4E6E8] text-xl mb-2">
              Start Creating Music
            </Heading>
            <Text size="sm" color="muted" className="text-center max-w-md">
              Enter a prompt above to generate your first track. Describe the mood, style, genre, or instruments you want.
            </Text>
          </motion.div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {generations.map((generation) => (
                <GenerationCard key={generation.id} generation={generation} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}


function GenerationCard({ generation }: { generation: import("@/store/generation-store").Generation }) {
  const removeGeneration = useGenerationStore((state) => state.removeGeneration)
  const setNowPlaying = useMusicPlayerStore((state) => state.setNowPlaying)
  const play = useMusicPlayerStore((state) => state.play)
  const nowPlaying = useMusicPlayerStore((state) => state.nowPlaying)
  const isGenerating = generation.status === "generating" || generation.status === "pending"
  const isCompleted = generation.status === "completed"
  const isFailed = generation.status === "failed"
  
  const handlePlay = () => {
    const audioUrl = generation.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    
    if (nowPlaying?.id === generation.id) {
      const togglePlayPause = useMusicPlayerStore.getState().togglePlayPause
      togglePlayPause()
    } else {
      setNowPlaying({
        id: generation.id,
        title: generation.title || "Untitled Track",
        audioUrl: audioUrl,
        image: generation.image || "/icons/thumbnail.svg",
      })
      play()
    }
  }

  const truncatedDescription = generation.description
    ? generation.description.length > 100
      ? `${generation.description.substring(0, 100)}...`
      : generation.description
    : generation.prompt.length > 100
    ? `${generation.prompt.substring(0, 100)}...`
    : generation.prompt

  if (isFailed) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Card
          variant="interactive"
          padding="sm"
          className="group flex items-center gap-3 bg-[#27181e] hover:bg-[#2a1c22] transition-colors duration-200 border-none"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="w-[64px] h-[64px] shrink-0 rounded-[12px] bg-[#27181e] flex items-center justify-center">
            <Icon name="alert-red" size={32} className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0 py-1">
            <Heading level="h3" className="mb-1 text-[#E4E6E8]">
              {generation.error || "Network Failed"}
            </Heading>
            <Text size="xs" color="muted" lineClamp={2} className="mt-1">
              {generation.prompt}
            </Text>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="ghost"
                  size="icon-lg"
                  onClick={() => removeGeneration(generation.id)}
                  className="shrink-0 bg-transparent border-0 group-hover:bg-black group-hover:border-2 group-hover:border-white/50 transition-colors duration-200"
                >
                  <Icon name="cross" size={20} className="w-3 h-3 text-white/50 group-hover:text-white/50 transition-colors duration-200" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove this generation</p>
            </TooltipContent>
          </Tooltip>
        </Card>
      </motion.div>
    )
  }

  if (isGenerating) {
    const progressValue = generation.progress / 100
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl"
      >
        <Card
          variant="interactive"
          padding="sm"
          className="group relative flex items-center gap-3 bg-transparent hover:bg-white/5 transition-colors duration-200 z-10"
        >
          <motion.div
            className="absolute inset-0 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progressValue }}
            transition={{ 
              type: "spring", 
              stiffness: 60, 
              damping: 25,
            }}
            style={{ 
              transformOrigin: "left",
              background: "linear-gradient(to right, rgba(255, 123, 22, 0.15), rgba(232, 62, 223, 0.15), rgba(255, 123, 22, 0.15))",
            }}
          />
          
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ 
              x: `${Math.min(progressValue * 200, 100)}%`,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 60, 
              damping: 25,
            }}
            style={{
              width: "40%",
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)",
              transform: "skewX(-15deg)",
            }}
          />
          
          <motion.div
            className="absolute top-0 bottom-0 pointer-events-none"
            initial={{ left: "0%", opacity: 0 }}
            animate={{ 
              left: `${generation.progress}%`,
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ 
              left: { 
                type: "spring", 
                stiffness: 60, 
                damping: 25,
              },
              opacity: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{
              width: "3px",
              background: "linear-gradient(to right, rgba(255, 123, 22, 0.8), rgba(232, 62, 223, 0.6))",
              filter: "blur(3px)",
              boxShadow: "0 0 8px rgba(255, 123, 22, 0.6), 0 0 16px rgba(232, 62, 223, 0.4)",
            }}
          />
          
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255, 123, 22, 0.2) 8px, rgba(255, 123, 22, 0.2) 16px)",
              backgroundSize: "32px 32px",
            }}
          />

          <MusicGenerationBox 
            isGenerating={isGenerating} 
            initialProgress={generation.progress}
            aria-label={`Generation progress: ${generation.progress}%`}
          />
          <div className="flex-1 min-w-0 py-1 relative z-10">
            <Heading level="h3" className="mb-1 text-[#E4E6E8]">
              {generation.status === "pending" ? "Starting..." : `Generating... ${generation.progress}%`}
            </Heading>
            <Text size="xs" color="muted" lineClamp={2} className="mt-1">
              {generation.prompt}
            </Text>
          </div>
        </Card>
      </motion.div>
    )
  }

  if (isCompleted) {
    const isVariant2 = generation.id.includes("_")
    
    if (isVariant2) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Card
            variant="interactive"
            padding="sm"
            onClick={handlePlay}
            className="group flex items-center gap-3 bg-transparent hover:bg-white/5 transition-colors duration-200"
          >
            <Thumbnail
              src={generation.image || "/icons/thumbnail.svg"}
              alt={generation.title || "Track"}
              size="md"
              shape="square"
              className="shrink-0"
              loading="lazy"
            />
            <div className="flex-1 min-w-0 py-1">
              <Heading level="h3" className="mb-1 text-[#E4E6E8]">
                {generation.title || "Untitled Track"}
              </Heading>
              {truncatedDescription && (
                <Text size="xs" color="muted" lineClamp={2} className="mt-1">
                  {truncatedDescription}
                </Text>
              )}
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="ghost"
                  size="icon-lg"
                  onClick={handlePlay}
                  disabled={!generation.audioUrl}
                  className="shrink-0 bg-transparent border-0 group-hover:bg-black group-hover:border-2 group-hover:border-white/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#ff7b16] focus:ring-offset-2 focus:ring-offset-[#0A0C0D]"
                  aria-label={generation.audioUrl ? `Play ${generation.title || "track"}` : "Audio not available"}
                  aria-disabled={!generation.audioUrl}
                >
                  <svg className="w-5 h-5 text-white/50 group-hover:text-white/50 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{generation.audioUrl ? `Play ${generation.title || "track"}` : "Audio not available"}</p>
              </TooltipContent>
            </Tooltip>
          </Card>
        </motion.div>
      )
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card
          variant="interactive"
          padding="sm"
          className="group flex items-center gap-3 bg-transparent hover:bg-white/5 transition-colors duration-200"
        >
          <Thumbnail
            src={generation.image || "/icons/thumbnail.svg"}
            alt={generation.title || "Track"}
            size="md"
            shape="square"
            className="shrink-0"
          />

          <div className="flex-1 min-w-0 py-1">
            <Heading level="h3" className="mb-1 text-[#E4E6E8]">
              {generation.title || "Untitled Track"}
            </Heading>
            {truncatedDescription && (
              <Text size="xs" color="muted" lineClamp={2} className="mt-1">
                {truncatedDescription}
              </Text>
            )}
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="ghost"
                  size="icon-lg"
                  onClick={handlePlay}
                  disabled={!generation.audioUrl}
                  className="shrink-0 bg-transparent border-0 group-hover:bg-black group-hover:border-2 group-hover:border-white/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#ff7b16] focus:ring-offset-2 focus:ring-offset-[#0A0C0D]"
                  aria-label={generation.audioUrl ? `Play ${generation.title || "track"}` : "Audio not available"}
                  aria-disabled={!generation.audioUrl}
                >
                  <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{generation.audioUrl ? `Play ${generation.title || "track"}` : "Audio not available"}</p>
            </TooltipContent>
          </Tooltip>
        </Card>
      </motion.div>
    )
  }

  return null
}
