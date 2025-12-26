"use client"

import { useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { useGenerationStore } from "@/store/generation-store"
import type { Generation } from "@/store/generation-store"

export function useSocket() {
  const socketRef = useRef<Socket | null>(null)
  const { addGeneration, updateGeneration } = useGenerationStore()

  useEffect(() => {
    const socket = io({
      path: "/api/socket",
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    })

    socketRef.current = socket

    socket.on("connect", () => {
      console.log("[Socket] Connected to server")
    })

    socket.on("disconnect", () => {
      console.log("[Socket] Disconnected from server")
    })

    socket.on("connect_error", (error) => {
      console.error("[Socket] Connection error:", error)
    })

    socket.on("GENERATION_STARTED", (data: {
      generationId: string
      prompt: string
      status: "pending"
      progress: number
      createdAt: number
    }) => {
      const generation: Generation = {
        id: data.generationId,
        prompt: data.prompt,
        status: "pending",
        progress: data.progress,
        createdAt: data.createdAt,
      }
      addGeneration(generation)
      console.log("[Socket] Generation started:", data.generationId)
    })

    socket.on("GENERATION_PROGRESS", (data: {
      generationId: string
      status: "generating"
      progress: number
    }) => {
      updateGeneration(data.generationId, {
        status: data.status,
        progress: data.progress,
      })
    })

    socket.on("GENERATION_COMPLETE", (data: {
      generationId: string
      status: "completed"
      title: string
      description: string
      image: string
      audioUrl?: string
    }) => {
      updateGeneration(data.generationId, {
        status: "completed",
        progress: 100,
        title: data.title,
        description: data.description,
        image: data.image,
        audioUrl: data.audioUrl,
      })
      console.log("[Socket] Generation completed:", data.generationId, "audioUrl:", data.audioUrl)
    })

    socket.on("GENERATION_FAILED", (data: {
      generationId: string
      status: "failed"
      error: string
      message: string
    }) => {
      updateGeneration(data.generationId, {
        status: "failed",
        error: data.error,
      })
      console.log("[Socket] Generation failed:", data.generationId, data.error)
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [addGeneration, updateGeneration])

  return socketRef.current
}
