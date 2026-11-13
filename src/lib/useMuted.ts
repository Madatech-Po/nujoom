import { useSyncExternalStore } from 'react'
import { audio, type AudioEngine } from './audio'

/** Current mute state of the audio engine, re-rendering when it changes. */
export function useMuted(engine: AudioEngine = audio): boolean {
  return useSyncExternalStore(engine.subscribe, engine.isMuted, engine.isMuted)
}
