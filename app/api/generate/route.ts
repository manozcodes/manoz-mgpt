import { NextRequest, NextResponse } from "next/server"

declare global {
  var io: any
}


function generateId(): string {
  return `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

let generationCount = 0

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = body

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt cannot be empty" },
        { status: 400 }
      )
    }

    const generationId = generateId()

    const io = (global as any).io

    if (!io) {
      return NextResponse.json(
        { error: "WebSocket server not initialized" },
        { status: 503 }
      )
    }

    generationCount++
    
    const shouldFail = generationCount % 3 === 0

    io.emit("GENERATION_STARTED", {
      generationId,
      prompt: prompt.trim(),
      status: "pending",
      progress: 0,
      createdAt: Date.now(),
    })

    if (shouldFail) {
      setTimeout(() => {
        io.emit("GENERATION_FAILED", {
          generationId,
          status: "failed",
          error: "Network Failed",
          message: "Connection timeout. Please try again.",
        })
      }, 500)
    } else {
      setTimeout(() => {
        io.emit("GENERATION_PROGRESS", {
          generationId,
          status: "generating",
          progress: 0,
        })

        const { simulateGenerationProgress } = require("../../../server/socket-server.js")

        simulateGenerationProgress(
          io,
          generationId,
          prompt.trim(),
          () => {
          },
          () => {
          }
        )
      }, 300)
    }

    return NextResponse.json({
      success: true,
      generationId,
      message: "Generation started",
    })
  } catch (error) {
    console.error("[API] Error in /api/generate:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

