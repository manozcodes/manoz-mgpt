import { create } from "zustand"

export type GenerationStatus = "empty" | "pending" | "generating" | "completed" | "failed"

export interface Generation {
  id: string
  prompt: string
  status: GenerationStatus
  progress: number 
  createdAt: number 
  title?: string 
  description?: string 
  image?: string 
  audioUrl?: string 
  error?: string 
}

interface GenerationStore {
  generations: Generation[]
  
  // Actions
  addGeneration: (generation: Generation) => void
  updateGeneration: (id: string, updates: Partial<Generation>) => void
  removeGeneration: (id: string) => void
  
  // Computed getters
  isEmpty: () => boolean
}

export const useGenerationStore = create<GenerationStore>((set, get) => ({
  generations: [],


  addGeneration: (generation) =>
    set((state) => ({
      generations: [generation, ...state.generations],
    })),


  updateGeneration: (id, updates) =>
    set((state) => ({
      generations: state.generations.map((gen) =>
        gen.id === id ? { ...gen, ...updates } : gen
      ),
    })),

 
  removeGeneration: (id) =>
    set((state) => ({
      generations: state.generations.filter((gen) => gen.id !== id),
    })),

  isEmpty: () => {
    const { generations } = get()
    return generations.length === 0
  },
}))

