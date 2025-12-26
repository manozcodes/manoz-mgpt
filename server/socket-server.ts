import { Server as HTTPServer } from "http"
import { Server as SocketIOServer } from "socket.io"

let ioInstance: SocketIOServer | null = null

export function initializeSocketServer(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
    path: "/api/socket",
    addTrailingSlash: false,
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  })

  io.on("connection", (socket) => {
    console.log(`[Socket] Client connected: ${socket.id}`)

    socket.on("disconnect", () => {
      console.log(`[Socket] Client disconnected: ${socket.id}`)
    })
  })

  ioInstance = io
  return io
}

export function getSocketInstance(): SocketIOServer | null {
  return ioInstance
}

export function simulateGenerationProgress(
  io: SocketIOServer,
  generationId: string,
  prompt: string,
  onComplete?: () => void,
  onFailed?: () => void
) {
  let progress = 0
  const totalDuration = 8000 
  const updateInterval = 200 
  const steps = totalDuration / updateInterval 
  const progressIncrement = 100 / steps

  const pauseSteps = [12, 24, 30] 

  let currentStep = 0
  const intervalId = setInterval(() => {
    if (pauseSteps.includes(currentStep)) {
      currentStep++
      return
    }

    progress = Math.min(100, progress + progressIncrement)
    currentStep++

    io.emit("GENERATION_PROGRESS", {
      generationId,
      status: "generating",
      progress: Math.round(progress),
    })

    if (progress >= 100) {
      clearInterval(intervalId)

      setTimeout(() => {
        io.emit("GENERATION_COMPLETE", {
          generationId,
          status: "completed",
          title: generateRandomTitle(),
          description: prompt,
          image: "/icons/thumbnail.svg",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Placeholder audio URL
        })
        onComplete?.()
      }, 500)
    }
  }, updateInterval)
}

function generateRandomTitle(): string {
  const titles = [
    "Crimson Echoes",
    "Midnight Dreams",
    "Electric Pulse",
    "Ocean Breeze",
    "Stellar Journey",
    "Neon Nights",
    "Cosmic Waves",
    "Digital Horizon",
  ]
  return titles[Math.floor(Math.random() * titles.length)]
}