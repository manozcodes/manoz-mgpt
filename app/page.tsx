"use client"
import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import MainContent from "@/components/main-content"
import { useSocket } from "@/hooks/use-socket"

export default function Home() {
  useSocket()
  // Initialize with safe defaults to prevent hydration mismatch
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1100
      setIsMobile(mobile)
      if (mobile) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Set initial values after hydration
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMenuClick = () => {
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-[#0A0C0D]">
      <Sidebar isOpen={isMobile ? isSidebarOpen : true} onClose={isMobile ? handleCloseSidebar : undefined} isMobile={isMobile} />
      <MainContent onMenuClick={handleMenuClick} isMobile={isMobile} />
    </div>
  )
}
