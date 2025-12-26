"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { useState } from "react"
import { MusicGenerationBox } from "@/components/music-generation-box"
import { Avatar, Button, Text, Heading, Badge, Icon } from "@/shared-ui"
import { useGenerationStore } from "@/store/generation-store"
import { motion, AnimatePresence } from "framer-motion"

function UserProfile() {
  const [isOpen, setIsOpen] = useState(false)
  
  const generations = useGenerationStore((state) => state.generations)
  
  const latestGenerations = generations.slice(0, 3)
  
  const activeCount = generations.filter(
    (gen) => gen.status === "pending" || gen.status === "generating"
  ).length

  const hasFailedGeneration = generations.some((gen) => gen.status === "failed")

  return (
    <TooltipProvider delayDuration={300}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <button className="profile-trigger-wrapper focus:outline-none cursor-pointer">
                <div className="profile-trigger-inner">
                  <Avatar 
                    name="Johnny" 
                    className="relative z-10 w-[38px] h-[38px] text-[16px] font-bold leading-none"
                  />
                  {activeCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#4ADA6F] rounded-full flex items-center justify-center z-30">
                      <Text as="span" size="xs" weight="bold" className="text-black leading-none">
                        {activeCount}
                      </Text>
                    </div>
                  )}
                </div>
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Profile & Settings</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent
          align="end"
          sideOffset={5}
          className="w-[400px] bg-[#16191c] rounded-[24px] p-0 pb-2 border-none max-h-[90vh] overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
        >
        {/* User Info Header */}
        <div className="p-6 bg-[#16191c]">
          <div className="flex items-start gap-4">
            {/* Avatar with gradient border */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="profile-trigger-wrapper focus:outline-none flex items-center justify-center" style={{ width: '60px', height: '60px' }}>
                  <div className="profile-trigger-inner">
                    <Avatar 
                      name="Johnny" 
                      className="relative z-10 w-[58px] h-[58px] text-white font-medium text-[26px] leading-none"
                    />
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View profile</p>
              </TooltipContent>
            </Tooltip>

            {/* User Info and Settings */}
            <div className="flex-1 flex items-center justify-between">
              <div>
                <Heading level="h3" className="text-white text-[16px] leading-[24px]">Johnny</Heading>
                <Text size="sm" color="muted" className="mt-1">@johnny</Text>
              </div>
              {/* Settings Icon */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#505458] hover:text-white transition-colors duration-200">
                    <Icon name="setting" size={24} className="w-6 h-6" />
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Credits Section */}
        <div className="p-4 mx-4 mb-4 bg-[#212529] rounded-[16px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Text size="base" weight="semibold" className="text-[#e5e6e8] text-[16px] leading-[24px]">120/500 credits</Text>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="text-[#505458] hover:text-white p-0 transition-colors duration-200">
                  <Icon name="info" size={20} className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Credits information</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="text-[#777a80] font-semibold text-[14px] leading-[20px] hover:text-[#a4a8ae] p-0 h-auto transition-colors duration-200">
                Top Up <Icon name="rightarrow" size={20} className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Purchase credits</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="border-b border-[#2a2e33] mx-4 pt-1" />

        {/* Insufficient Credits Alert */}
        <div className="mx-4 my-4 bg-[#27231e] rounded-[12px] relative mt-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="icon" 
                size="icon-sm"
                className="absolute top-[-6px] right-[-6px] w-5 h-5 rounded-full bg-[#16191c] border border-[#505458] p-0 hover:border-[#898C92] transition-colors duration-200"
              >
                <Icon name="cross" size={4} className="w-2 h-2" />
              </Button>
            </TooltipTrigger>
          </Tooltip>
          <div className="p-4 flex items-start gap-3">
            <div className="flex-1">
              <div className="flex flex-row items-center gap-2">
                <Icon name="alert" size={20} className="w-5 h-5 text-[#D89C3A] pb-0.5 shrink-0" />
                <Text size="sm" weight="medium" color="warning" className="leading-[20px]">Insufficient credits</Text>
              </div>
              <Text size="xs" weight="medium" color="muted" className="mt-1 leading-[18px]">Your credit balance : 0</Text>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm" className="py-1 px-2 border border-[#505458] rounded-md text-white font-medium text-[13px] leading-[18px] hover:border-[#898C92] shrink-0 h-auto transition-colors duration-200">
                  Top Up
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Purchase credits</p>
            </TooltipContent>
          </Tooltip>
          </div>
        </div>

        {/* Generation Progress Items - Synchronized from Zustand Store */}
        <div className="space-y-1 px-4 mt-[-10px]">
          <AnimatePresence mode="popLayout">
            {latestGenerations.length === 0 ? (
              // Empty State: No generations yet
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="py-8 text-center"
              >
                <Text size="sm" color="muted" className="text-[#8B8F95]">
                  No generations yet
                </Text>
              </motion.div>
            ) : (
              latestGenerations.map((generation) => (
                <GenerationItem key={generation.id} generation={generation} />
              ))
            )}
          </AnimatePresence>

          {/* Invalid Prompt Item - Only show if there's a failed generation */}
          {hasFailedGeneration && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex items-start gap-3 mt-4 overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 right-0 h-[35px] bg-[#16191c] opacity-[0.45] pointer-events-none z-20" />
              <div className="absolute top-0 right-5 bottom-0 w-[20px] bg-[#16191c] opacity-[0.45] pointer-events-none z-20" />
              <div className="w-[64px] h-[64px] shrink-0 rounded-[12px] bg-[#d89c3a] flex items-center justify-center relative z-10">
                <div className="text-[48px] bg-transparent rounded-[8px]">🥲</div>
              </div>
              <div className="flex-1 relative z-10">
                <Heading level="h4" className="text-white text-[14px] leading-[22px]">Invalid Prompt</Heading>
                <Text size="sm" color="muted" className="mt-2">
                  This is not good prompt, throw invalid pr...
                </Text>
                <Text size="sm" color="muted" className="leading-[22px] mt-1">
                  Your prompt does not seem to be valid. Please provide a prompt related to song creation, remixing,
                  covers, or similar
                </Text>
              </div>
            </motion.div>
          )}
        </div>
      </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}


function GenerationItem({ generation }: { generation: import("@/store/generation-store").Generation }) {
  const isGenerating = generation.status === "generating" || generation.status === "pending"
  const isCompleted = generation.status === "completed"
  const isFailed = generation.status === "failed"

  const truncatedPrompt = generation.prompt.length > 35
    ? `${generation.prompt.substring(0, 35)}...`
    : generation.prompt

  if (isFailed) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-start gap-3 p-3 bg-[#27181e] rounded-[12px] mt-[5px]"
      >
        <div className="flex-1">
          <div className="flex flex-row items-center gap-2">
            <Icon name="alert-red" size={20} className="w-5 h-5 mt-0.5 shrink-0" />
            <Text size="sm" weight="medium" color="error" className="leading-[20px]">
              {generation.error || "Network Failed"}
            </Text>
          </div>
          <Text size="sm" color="muted" className="leading-[18px] mt-1">
            {truncatedPrompt}
          </Text>
        </div>
      </motion.div>
    )
  }

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative flex items-center gap-2 py-2 cursor-pointer pl-2 rounded-md overflow-hidden group hover:bg-white/5 transition-colors duration-200"
      >
        <div className="relative z-10 flex items-center gap-2 w-full pr-2">
          <div className="w-[66px] h-[66px] shrink-0 rounded-[12px] overflow-hidden">
            {generation.image && (
              <img 
                src={generation.image} 
                alt={generation.title || "Track"} 
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
          <div className="flex-1">
            <Text 
              as="p"
              size="xs" 
              className="text-[#b7bac0] text-[12px] leading-[18px] truncate"
            >
              {generation.title || truncatedPrompt}
            </Text>
            <Text 
              as="p"
              size="xs" 
              className="text-[#8B8F95] text-[12px] leading-[16px] mt-1"
            >
              Completed
            </Text>
          </div>
          <Badge 
            variant="outline" 
            size="sm"
            className="ml-[-5px] px-3 py-1 text-[#b7bac0] text-[12px] font-normal shrink-0"
          >
            v1
          </Badge>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative flex items-center gap-2 py-2 cursor-pointer pl-2 rounded-md overflow-hidden group hover:bg-white/5 transition-colors duration-200"
    >
      <div 
        className="absolute inset-0 bg-[#0f1215] transition-all duration-300 ease-out"
        style={{ width: `${generation.progress}%` }}
      />
      <div className="relative z-10 flex items-center gap-2 w-full pr-2">
        <MusicGenerationBox 
          isGenerating={isGenerating} 
          initialProgress={generation.progress} 
        />
        <div className="flex-1">
          <Text 
            as="p"
            size="xs" 
            className="text-[#b7bac0] text-[12px] leading-[18px] truncate transition-opacity duration-300"
            style={{ opacity: 1 - (generation.progress / 100) * 0.5 }}
          >
            {truncatedPrompt}
          </Text>
          <Text 
            as="p"
            size="xs" 
            className="text-[#b7bac0] text-[12px] leading-[16px] mt-1 transition-opacity duration-300"
            style={{ opacity: 1 - (generation.progress / 100) * 0.5 }}
          >
            {generation.status === "pending" ? "Starting..." : "Generating"}
          </Text>
        </div>
        <Badge 
          variant="outline" 
          size="sm"
          className="ml-[-5px] px-3 py-1 text-[#b7bac0] text-[12px] font-normal shrink-0 transition-opacity duration-300"
          style={{ opacity: 1 - (generation.progress / 100) * 0.4 }}
        >
          v1
        </Badge>
      </div>
    </motion.div>
  )
}

export default UserProfile
