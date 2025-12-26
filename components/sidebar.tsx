"use client"

import type React from "react"
import { Button, Input, Text, Icon } from "@/shared-ui"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  isActive?: boolean
}

function NavItem({ icon, label, onClick, isActive }: NavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onClick}
          variant="ghost"
          size="md"
          className={cn(
            "group/navlink flex relative items-center text-sm px-4 rounded-full h-9 min-h-[36px] font-medium gap-2 text-white hover:bg-white/8 transition-colors duration-200 text-left cursor-pointer justify-start shrink-0",
            isActive && "bg-white/8"
          )}
          type="button"
          leftIcon={<span className="shrink-0">{icon}</span>}
        >
          {label}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}

interface ChristmasParticleProps {
  delay: number
  duration: number
  xOffset: number
  particle: string
  color: string
  size: number
  repeatDelay: number
  isActive: boolean
}

function ChristmasParticle({ delay, duration, xOffset, particle, color, size, repeatDelay, isActive }: ChristmasParticleProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        y: -20,
        x: xOffset,
        scale: 0
      }}
      animate={isActive ? { 
        opacity: [0, 1, 1, 0],
        y: "100vh",
        x: xOffset,
        scale: [0, 1, 1, 0.5],
        rotate: [0, 180, 360]
      } : {}}
      transition={{
        duration: duration,
        delay: delay,
        ease: "linear",
        repeat: isActive ? Infinity : 0,
        repeatDelay: repeatDelay
      }}
      className="absolute pointer-events-none"
      style={{
        left: "50%",
        top: "0",
        color: color,
        fontSize: `${size}px`,
        filter: "drop-shadow(0 0 2px currentColor)",
      }}
    >
      {particle}
    </motion.div>
  )
}

function ChristmasParticles() {
  const particleTypes = [
    "❄", 
    "✨", 
    "⭐", 
  ]
  
  const colors = [
    "#ffffff", 
    "#ffd700", 
    "#ff6b6b", 
    "#4ecdc4", 
  ]
  
  const [particles, setParticles] = useState<Array<{ 
    id: number
    delay: number
    duration: number
    xOffset: number
    particle: string
    color: string
    size: number
    repeatDelay: number
  }>>([])
  const [isActive, setIsActive] = useState(true)
  
  useEffect(() => {
    // Generate 12 particles with random properties (client-side only)
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2, 
      xOffset: (Math.random() - 0.5) * 25, 
      particle: particleTypes[Math.floor(Math.random() * particleTypes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6, 
      repeatDelay: Math.random() * 2,
    }))
    setParticles(newParticles)
    
    // Stop animation after 12 seconds
    const timer = setTimeout(() => {
      setIsActive(false)
    }, 12000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (!isActive || particles.length === 0) return null
  
  return (
    <div className="absolute top-0 left-0 w-20 h-screen overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <ChristmasParticle
          key={particle.id}
          delay={particle.delay}
          duration={particle.duration}
          xOffset={particle.xOffset}
          particle={particle.particle}
          color={particle.color}
          size={particle.size}
          repeatDelay={particle.repeatDelay}
          isActive={isActive}
        />
      ))}
    </div>
  )
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  isMobile?: boolean
}

export default function Sidebar({ isOpen = true, onClose, isMobile = false }: SidebarProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <TooltipProvider delayDuration={300}>
    <>
      <AnimatePresence>
        {isOpen && onClose && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-transparent z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: mounted && isMobile ? (isOpen ? 0 : "-100%") : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className={cn(
          "w-50 flex flex-col h-screen p-4 relative",
          mounted && isMobile ? "fixed z-50" : "relative z-auto",
          mounted && isMobile ? "" : "translate-x-0",
          mounted && isMobile ? "bg-[#121415]/95 backdrop-blur-xl" : "bg-[#121415]"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Christmas decoration at top-left */}
        <div className="absolute top-0 left-7 w-auto h-auto">
          <img 
            src="/christmas.svg" 
            alt="Christmas decoration" 
            className="relative z-10"
          />
          {/* Falling Christmas particles */}
          <ChristmasParticles />
        </div>
        
        {/* Logo with Close Button */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="relative flex items-center justify-center shrink-0 flex-1">
            <Icon name="logo" width={120} height={32} className="w-[120px] h-[32px]" />
          </div>
          {/* Close button - only visible on mobile */}
          {onClose && isMobile && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onClose}
                  className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/8 transition-colors duration-200"
                  aria-label="Close sidebar"
                >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="pointer-events-none absolute size-5 text-white"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.667"
                  d="M7.5 2.5v15m-1-15h7c1.4 0 2.1 0 2.635.272a2.5 2.5 0 0 1 1.092 1.093C17.5 4.4 17.5 5.1 17.5 6.5v7c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092c-.535.273-1.235.273-2.635.273h-7c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C2.5 15.6 2.5 14.9 2.5 13.5v-7c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C4.4 2.5 5.1 2.5 6.5 2.5Z"
                />
              </svg>
            </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close sidebar</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

      {/* Search */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 px-3.5 py-[7px] rounded-full border border-[#303438] hover:border-[#505458] transition-colors duration-200">
          <Icon
            name="search"
            width={15}
            height={15}
            className="w-4 h-4 shrink-0 brightness-0 invert"
          />
          <Input
            type="text"
            placeholder="Search"
            variant="search"
            size="sm"
            noWrapper
            className="bg-transparent text-sm text-white placeholder-white outline-none flex-1 w-0 border-0 p-0 h-auto"
          />
          <div className="flex items-center gap-1">
            <Icon
              name="command"
              width={15}
              height={15}
              className="text-[10px] leading-none"
            />
            <Text as="span" size="xs" color="muted" className="text-[#4a4949] text-[14px]">
              K
            </Text>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 mb-8 shrink-0">
        <NavItem
          icon={<Icon name="home" width={20} height={20} className="w-5 h-5" />}
          label="Home"
        />
        <NavItem
          isActive={true}
          icon={<Icon name="star" width={20} height={20} className="w-5 h-5" />}
          label="Create"
        />
        <NavItem
          icon={<Icon name="compass" width={20} height={20} className="w-5 h-5" />}
          label="Explore"
        />
      </nav>

      {/* Library Section */}
      <div className="mb-8">
        <Text size="sm" color="muted" weight="medium" className="mb-4 ml-4">
          Library
        </Text>
        <nav className="space-y-1">
          <NavItem
            icon={<Icon name="voices" width={20} height={20} className="w-5 h-5" />}
            label="Profile"
          />
          <NavItem
            icon={<Icon name="heart" width={20} height={20} className="w-5 h-5" />}
            label="Liked"
          />
          <NavItem
            icon={<Icon name="plus" width={20} height={20} className="w-5 h-5" />}
            label="New playlist"
          />
        </nav>
      </div>

      

      <div className="mt-auto">
      <div 
        className="rounded-xl p-3 mb-5 relative overflow-hidden"
        style={{
          backgroundColor: '#1D2125',
          backgroundImage: `linear-gradient(225deg, 
            rgba(48, 7, 255, 0.29) 0%, 
            rgba(209, 40, 150, 0.271346) 60%, 
            rgba(255, 86, 35, 0.25) 100%)`
        }}
      >
        <Text size="xs" weight="semibold" color="default" className="mb-1.5 leading-tight">
          Model v6 Pro is here!
        </Text>
        <Text size="xs" color="default" className="leading-relaxed" style={{ opacity: 0.64 }}>
          Pushing boundaries to the world's best AI music model
        </Text>
      </div>
      <div className="mt-auto space-y-2">
        <div className="flex gap-2 flex-wrap">
          <Text as="a" href="#" size="xs" color="muted" className="hover:text-white/60 transition-colors">
            Pricing
          </Text>
          <Text as="a" href="#" size="xs" color="muted" className="hover:text-white/60  transition-colors">
            Affiliate
          </Text>
          <Text as="a" href="#" size="xs" color="muted" className="hover:text-white/60  transition-colors">
            API
          </Text>
          <Text as="a" href="#" size="xs" color="muted" className="hover:text-white/60  transition-colors">
            About
          </Text>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Text as="a" href="#" size="xs" color="muted" className="hover:text-white/60  transition-colors">
            Terms
          </Text>
          <Text as="a" href="#" size="xs" color="muted" className="hover:text-white/60  transition-colors duration-200">
            Privacy
          </Text>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center gap-1.5 hover:text-white/60  transition-colors duration-200 hover:cursor-pointer">
                <Icon name="usa-flag" width={15} height={15} className="w-4 h-4" />
                <Text as="span" size="xs" color="muted" className="hover:text-white/60  ">
                  EN
                </Text>
                <Icon name="dropdown" width={12} height={12} className="w-3 h-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Change language</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      </div>
      </motion.aside>
    </>
    </TooltipProvider>
  )
}
