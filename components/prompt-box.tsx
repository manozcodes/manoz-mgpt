"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Textarea, Button, Icon } from "@/shared-ui"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

const PLACEHOLDERS = [
  "Describe your song",
  "What kind of music do you want to create?",
  "Tell me about the mood and style",
  "Describe the genre and instruments",
  "What's the story behind your music?",
]

export default function PromptBox() {
  const [isFocused, setIsFocused] = useState(false)
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
  const [value, setValue] = useState("")
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 900)
    }

    checkScreenSize()

    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    if (value === "" && !isFocused) {
      intervalRef.current = setInterval(() => {
        let newIndex
        do {
          newIndex = Math.floor(Math.random() * PLACEHOLDERS.length)
        } while (newIndex === currentPlaceholder && PLACEHOLDERS.length > 1)
        
        setCurrentPlaceholder(newIndex)
      }, 2500)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [value, isFocused, currentPlaceholder])

  const handleSubmit = async () => {
    const trimmedValue = value.trim()
    
    if (!trimmedValue || isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: trimmedValue }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error("Generation failed:", error)
        return
      }

      const data = await response.json()
      console.log("Generation started:", data.generationId)

      setValue("")
    } catch (error) {
      console.error("Error submitting prompt:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const isSubmitDisabled = !value.trim() || isSubmitting

  return (
    <TooltipProvider delayDuration={300}>
    <div className="relative w-full flex justify-center">
      {isLargeScreen && (
        <>
          <motion.div
            className="absolute inset-0 rounded-[36px] pointer-events-none"
            style={{
              filter: "blur(36px)",
              width: "850px",
              height: "165px",
              left: "50%",
              transform: "translateX(-50%)",
              background:
                "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(255, 123, 22, 0.08) 35%, rgba(255, 123, 22, 0.12) 40%, rgba(255, 123, 22, 0.12) 60%, rgba(255, 123, 22, 0.08) 65%, transparent 70%, transparent 100%)",
              backgroundSize: "300% 100%",
              backgroundPosition: "300% 0",
              willChange: "background-position",
            }}
            initial={{
              backgroundPosition: "300% 0",
            }}
            animate={{
              backgroundPosition: ["300% 0", "-200% 0"],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-[36px] pointer-events-none"
            style={{
              filter: "blur(36px)",
              width: "850px",
              height: "165px",
              left: "50%",
              transform: "translateX(-50%)",
              background:
                "linear-gradient(90deg, transparent 0%, transparent 30%, transparent 35%, transparent 40%, rgba(232, 62, 223, 0.22) 48%, rgba(232, 62, 223, 0.32) 50%, rgba(232, 62, 223, 0.22) 52%, transparent 60%, transparent 65%, transparent 70%, transparent 100%)",
              backgroundSize: "300% 100%",
              backgroundPosition: "300% 0",
              maskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
              willChange: "background-position",
            }}
            initial={{
              backgroundPosition: "300% 0",
            }}
            animate={{
              backgroundPosition: ["300% 0", "-200% 0"],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-[36px] pointer-events-none"
            style={{
              filter: "blur(24px)",
              width: "830px",
              height: "155px",
              left: "50%",
              transform: "translateX(-50%)",
              background:
                "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(255, 123, 22, 0.1) 35%, rgba(255, 123, 22, 0.15) 40%, rgba(255, 123, 22, 0.15) 60%, rgba(255, 123, 22, 0.1) 65%, transparent 70%, transparent 100%)",
              backgroundSize: "300% 100%",
              backgroundPosition: "300% 0",
              willChange: "background-position",
            }}
            initial={{
              backgroundPosition: "300% 0",
            }}
            animate={{
              backgroundPosition: ["300% 0", "-200% 0"],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-[36px] pointer-events-none"
            style={{
              filter: "blur(24px)",
              width: "830px",
              height: "155px",
              left: "50%",
              transform: "translateX(-50%)",
              background:
                "linear-gradient(90deg, transparent 0%, transparent 30%, transparent 35%, transparent 40%, rgba(232, 62, 223, 0.28) 48%, rgba(232, 62, 223, 0.4) 50%, rgba(232, 62, 223, 0.28) 52%, transparent 60%, transparent 65%, transparent 70%, transparent 100%)",
              backgroundSize: "300% 100%",
              backgroundPosition: "300% 0",
              maskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
              willChange: "background-position",
            }}
            initial={{
              backgroundPosition: "300% 0",
            }}
            animate={{
              backgroundPosition: ["300% 0", "-200% 0"],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-[36px] pointer-events-none"
            style={{
              filter: "blur(18px)",
              width: "815px",
              height: "148px",
              left: "50%",
              transform: "translateX(-50%)",
              background:
                "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(255, 123, 22, 0.13) 35%, rgba(255, 123, 22, 0.2) 40%, rgba(255, 123, 22, 0.2) 60%, rgba(255, 123, 22, 0.13) 65%, transparent 70%, transparent 100%)",
              backgroundSize: "300% 100%",
              backgroundPosition: "300% 0",
              willChange: "background-position",
            }}
            initial={{
              backgroundPosition: "300% 0",
            }}
            animate={{
              backgroundPosition: ["300% 0", "-200% 0"],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-[36px] pointer-events-none"
            style={{
              filter: "blur(18px)",
              width: "815px",
              height: "148px",
              left: "50%",
              transform: "translateX(-50%)",
              background:
                "linear-gradient(90deg, transparent 0%, transparent 30%, transparent 35%, transparent 40%, rgba(232, 62, 223, 0.35) 48%, rgba(232, 62, 223, 0.5) 50%, rgba(232, 62, 223, 0.35) 52%, transparent 60%, transparent 65%, transparent 70%, transparent 100%)",
              backgroundSize: "300% 100%",
              backgroundPosition: "300% 0",
              maskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
              willChange: "background-position",
            }}
            initial={{
              backgroundPosition: "300% 0",
            }}
            animate={{
              backgroundPosition: ["300% 0", "-200% 0"],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          />
        </>
      )}

      <div
        className="w-full max-w-[808px] relative"
        style={{
          padding: "4px",
        }}
      >
        <motion.div
          className="rounded-[36px] absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(255, 123, 22, 0.5) 35%, rgba(255, 123, 22, 0.7) 40%, rgba(255, 123, 22, 0.7) 60%, rgba(255, 123, 22, 0.5) 65%, transparent 70%, transparent 100%)",
            backgroundSize: "300% 100%",
            backgroundPosition: "300% 0",
            willChange: "background-position",
          }}
          initial={{
            backgroundPosition: "300% 0",
          }}
          animate={{
            backgroundPosition: ["300% 0", "-200% 0"],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        />

        <motion.div
          className="rounded-[36px] absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, transparent 30%, transparent 35%, transparent 40%, rgba(232, 62, 223, 0.7) 48%, rgba(232, 62, 223, 1) 50%, rgba(232, 62, 223, 0.7) 52%, transparent 60%, transparent 65%, transparent 70%, transparent 100%)",
            backgroundSize: "300% 100%",
            backgroundPosition: "300% 0",
            maskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
            willChange: "background-position",
          }}
          initial={{
            backgroundPosition: "300% 0",
          }}
          animate={{
            backgroundPosition: ["300% 0", "-200% 0"],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        />

        <div className="relative bg-[#1d2125] rounded-[32px] p-6 flex flex-col gap-4">
          <div className="relative">
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-base text-[#E4E6E8] outline-none border-none resize-none leading-snug w-full font-normal relative z-10 p-0"
              rows={2}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{ minHeight: "44px" }}
              placeholder=""
              size="md"
              disabled={isSubmitting}
              aria-label="Music generation prompt input"
              aria-describedby="prompt-description"
              aria-required="true"
            />
            {value === "" && (
              <div
                key={currentPlaceholder}
                className="absolute top-0 left-0 border-none pointer-events-none text-base text-[#8B8F95] leading-snug font-normal z-0 animate-placeholder-fade"
                style={{
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "flex-start",
                  paddingTop: "0.125rem",
                }}
              >
                {PLACEHOLDERS[currentPlaceholder]}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="icon"
                    size="icon"
                    className="w-9 h-9 transition-colors duration-200"
                    aria-label="Attach file"
                  >
                    <Icon name="attachment" size={18} className="w-4.5 h-4.5" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Attach file</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="icon"
                    size="icon"
                    className="w-9 h-9 transition-colors duration-200"
                    aria-label="Open mixer settings"
                  >
                    <Icon name="filters" size={18} className="w-4.5 h-4.5" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mixer</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="icon"
                    size="icon"
                    className="w-9 h-9 transition-colors duration-200"
                    aria-label="Open waveform settings"
                  >
                    <Icon name="wave" size={18} className="w-4.5 h-4.5" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Waveform</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="md"
                    leftIcon={<Icon name="plus" size={18} className="w-3.5 h-3.5" />}
                    className="transition-colors duration-200"
                  >
                    Lyrics
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add lyrics</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="md"
                        rightIcon={<Icon name="dropdown" size={12} className="w-3 h-3" />}
                        className="relative transition-colors duration-200"
                      >
                        Tools
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-44 rounded-lg bg-[#1A1E22] shadow-lg border border-[#2A2E33] z-20 p-1"
                      align="end"
                    >
                      <DropdownMenuItem
                        className="w-full text-left px-3 py-2 rounded text-xs text-[#8B8F95] focus:bg-[#2A2E33] focus:text-[#E4E6E8] transition-colors duration-150"
                      >
                        Tool Option 1
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="w-full text-left px-3 py-2 rounded text-xs text-[#8B8F95] focus:bg-[#2A2E33] focus:text-[#E4E6E8] transition-colors duration-150"
                      >
                        Tool Option 2
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="w-full text-left px-3 py-2 rounded text-xs text-[#8B8F95] focus:bg-[#2A2E33] focus:text-[#E4E6E8] transition-colors duration-150"
                      >
                        Tool Option 3
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tools menu</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="primary"
                    size="icon"
                    className="w-9 h-9 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                    aria-label={isSubmitDisabled ? "Enter a prompt to generate music" : "Generate music"}
                    aria-busy={isSubmitting}
                  >
                    <Icon name="right-arrow" size={16} className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isSubmitDisabled ? "Enter a prompt to generate" : "Generate"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  )
}