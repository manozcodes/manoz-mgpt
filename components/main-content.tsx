"use client"
import PromptBox from "./prompt-box"
import RecentGenerations from "./recent-generations"
import UserProfile from "./profile-menu"
import SidebarToggle from "./ui/sidebar-toggle"
import MusicPlayer from "./music-player"
import { Heading, Text, Icon } from "@/shared-ui"

interface MainContentProps {
  onMenuClick?: () => void
  isMobile?: boolean
}

export default function MainContent({ onMenuClick, isMobile = false }: MainContentProps) {
  return (
    <main id="main-content" className="flex-1 overflow-auto bg-[#0a0c0d]" role="main" aria-label="Main content">
      {/* Soft gradient overlay at top */}
      <div className="absolute top-0 left-0 right-0 h-[620px] pointer-events-none bg-gradient-to-b from-white/4 to-transparent" />

      {/* Header */}
      <div className="flex justify-between items-center px-4 md:px-12 py-6">
        {/* Mobile Menu Button with Logo - visible for <1100px */}
        {isMobile && (
          <div className="flex items-center gap-3">
            <SidebarToggle onClick={onMenuClick} />
            <Icon name="logo" width={120} height={32} className="w-[120px] h-[32px]" />
          </div>
        )}
        {!isMobile && <div></div>}
        <UserProfile />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center pt-24 px-8 relative z-10">
        {/* Heading */}
        <Heading 
          level="h1" 
          as="h1"
          className="text-[32px] font-semibold text-[#E4E6E8] mb-12 text-center leading-[48px] tracking-[0.01em]"
        >
          What Song to Create?
        </Heading>

        {/* Prompt Box */}
        <PromptBox />

        {/* Info Text */}
        <Text 
          as="p" 
          size="xs" 
          className="text-[#494a4b] mt-6 text-center"
        >
          MusicGPT v6 Pro - Our latest AI audio model{" "}
          <Text 
            as="a" 
            href="#" 
            size="xs"
            className="text-[#494a4b] hover:text-[#898C92] underline underline-offset-3 transition-colors duration-200"
          >
            Example prompts
          </Text>
        </Text>
      </div>

      {/* Recent Generations */}
      <div className="mt-20 px-8 pb-24 relative z-10 flex justify-center">
        <div className="w-full max-w-[808px]">
          <RecentGenerations />
        </div>
      </div>

      {/* Floating Music Player - Only visible when a track is playing */}
      <MusicPlayer />
    </main>
  )
}
