import { create } from "zustand"

/**
 * Music Player Store
 * 
 * Manages the currently playing song and playback state
 */
export interface NowPlaying {
  id: string
  title: string
  artist?: string
  audioUrl: string
  image?: string
  duration?: number // in seconds
}

interface MusicPlayerStore {
  nowPlaying: NowPlaying | null
  isPlaying: boolean
  currentTime: number // in seconds
  volume: number // 0-1
  
  // Actions
  setNowPlaying: (track: NowPlaying | null) => void
  play: () => void
  pause: () => void
  togglePlayPause: () => void
  setCurrentTime: (time: number) => void
  setVolume: (volume: number) => void
}

export const useMusicPlayerStore = create<MusicPlayerStore>((set) => ({
  nowPlaying: null,
  isPlaying: false,
  currentTime: 0,
  volume: 0.7,
  
  setNowPlaying: (track) => set({ nowPlaying: track, isPlaying: track !== null }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setCurrentTime: (time) => set({ currentTime: time }),
  setVolume: (volume) => set({ volume }),
}))

