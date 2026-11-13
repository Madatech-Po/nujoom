/**
 * Sound helper (NUJ-12). Uses the Web Audio API so that, once unlocked by the first tap,
 * sounds can play at any moment — including on iOS Safari, which blocks audio until a
 * user gesture has resumed the AudioContext.
 *
 * Usage: call `installAudioUnlock()` once at start-up, `audio.preload([...])` when a screen
 * opens, `audio.play(url)` to play. The mute choice is stored per device.
 */

export const MUTE_STORAGE_KEY = 'nujoom.muted'

type Listener = () => void

/** The small part of AudioContext we use (lets tests pass a fake). */
export interface MinimalAudioContext {
  state: string
  readonly destination: AudioNode
  resume(): Promise<void>
  createBuffer(channels: number, length: number, sampleRate: number): AudioBuffer
  createBufferSource(): AudioBufferSourceNode
  decodeAudioData(data: ArrayBuffer): Promise<AudioBuffer>
}

export interface AudioEngineOptions {
  createContext?: () => MinimalAudioContext | null
  fetchArrayBuffer?: (url: string) => Promise<ArrayBuffer>
  storage?: Pick<Storage, 'getItem' | 'setItem'> | null
}

function defaultCreateContext(): MinimalAudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  return Ctor ? new Ctor() : null
}

async function defaultFetch(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Audio fetch failed: ${res.status} ${url}`)
  return res.arrayBuffer()
}

function defaultStorage(): Pick<Storage, 'getItem' | 'setItem'> | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

/** Longest time play() waits for an in-progress unlock before giving up (ms). */
export const RESUME_WAIT_MS = 300

/** Resolves when `promise` settles or after `ms`, whichever comes first. Never rejects. */
function waitAtMost(promise: Promise<unknown>, ms: number): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<void>((resolve) => {
    timer = setTimeout(resolve, ms)
  })
  return Promise.race([promise.then(() => undefined, () => undefined), timeout]).finally(() =>
    clearTimeout(timer),
  )
}

export class AudioEngine {
  private ctx: MinimalAudioContext | null | undefined
  /** The resume() started by the latest unlock(), while it is still pending. */
  private resuming: Promise<void> | null = null
  private readonly buffers = new Map<string, Promise<AudioBuffer>>()
  private readonly playing = new Set<AudioBufferSourceNode>()
  private readonly listeners = new Set<Listener>()
  private muted: boolean
  private readonly createContext: () => MinimalAudioContext | null
  private readonly fetchArrayBuffer: (url: string) => Promise<ArrayBuffer>
  private readonly storage: Pick<Storage, 'getItem' | 'setItem'> | null

  constructor(options: AudioEngineOptions = {}) {
    this.createContext = options.createContext ?? defaultCreateContext
    this.fetchArrayBuffer = options.fetchArrayBuffer ?? defaultFetch
    this.storage = options.storage === undefined ? defaultStorage() : options.storage
    let stored: string | null = null
    try {
      stored = this.storage?.getItem(MUTE_STORAGE_KEY) ?? null
    } catch {
      stored = null
    }
    this.muted = stored === '1'
  }

  private context(): MinimalAudioContext | null {
    if (this.ctx === undefined) this.ctx = this.createContext()
    return this.ctx
  }

  /** True once the AudioContext is running (after the first tap on iOS). */
  get unlocked(): boolean {
    return this.context()?.state === 'running'
  }

  /** Must be called from inside a user gesture handler (tap / key press). */
  unlock(): void {
    const ctx = this.context()
    if (!ctx) return
    if (ctx.state !== 'running' && !this.resuming) {
      // Keep the pending resume so a play() in the same tap can wait for it (briefly).
      const pending: Promise<void> = ctx
        .resume()
        .catch(() => undefined)
        .finally(() => {
          if (this.resuming === pending) this.resuming = null
        })
      this.resuming = pending
    }
    // Classic iOS trick: start a 1-sample silent buffer during the gesture.
    try {
      const source = ctx.createBufferSource()
      source.buffer = ctx.createBuffer(1, 1, 22050)
      source.connect(ctx.destination)
      source.start(0)
    } catch {
      // ignore: some browsers do not need (or allow) this
    }
  }

  private load(url: string): Promise<AudioBuffer> {
    const ctx = this.context()
    if (!ctx) return Promise.reject(new Error('Web Audio is not available'))
    let pending = this.buffers.get(url)
    if (!pending) {
      pending = this.fetchArrayBuffer(url).then((data) => ctx.decodeAudioData(data))
      pending.catch(() => this.buffers.delete(url)) // allow a retry later
      this.buffers.set(url, pending)
    }
    return pending
  }

  /** Fetches and decodes sounds ahead of time. Failures are ignored here and retried on play. */
  async preload(urls: readonly string[]): Promise<void> {
    await Promise.allSettled(urls.map((url) => this.load(url)))
  }

  /** Plays a sound. Resolves true if it started, false if muted, locked or failed. */
  async play(url: string): Promise<boolean> {
    if (this.muted) return false
    const ctx = this.context()
    if (!ctx) return false
    try {
      if (ctx.state !== 'running') {
        if (this.resuming) {
          // unlock() just ran in this tap (e.g. ListenButton): give resume() a short,
          // capped wait so the very first tap on iOS is not silent.
          await waitAtMost(this.resuming, RESUME_WAIT_MS)
        } else {
          // Never wait on a resume() outside a gesture: on iOS it can stay pending forever.
          void ctx.resume().catch(() => undefined)
        }
        if (ctx.state !== 'running') return false
      }
      const buffer = await this.load(url)
      if (this.muted) return false
      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.connect(ctx.destination)
      source.onended = () => this.playing.delete(source)
      this.playing.add(source)
      source.start(0)
      return true
    } catch {
      return false
    }
  }

  stopAll(): void {
    for (const source of this.playing) {
      try {
        source.stop()
      } catch {
        // already stopped
      }
    }
    this.playing.clear()
  }

  isMuted = (): boolean => this.muted

  setMuted(muted: boolean): void {
    if (muted === this.muted) return
    this.muted = muted
    if (muted) this.stopAll()
    try {
      this.storage?.setItem(MUTE_STORAGE_KEY, muted ? '1' : '0')
    } catch {
      // storage blocked: the choice lasts for this visit only
    }
    for (const listener of this.listeners) listener()
  }

  toggleMuted(): void {
    this.setMuted(!this.muted)
  }

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }
}

/** App-wide engine. */
export const audio = new AudioEngine()

/**
 * Unlocks audio on the first tap or key press (required by iOS Safari). Returns a cleanup
 * function. Safe to call more than once.
 */
export function installAudioUnlock(
  engine: AudioEngine = audio,
  target: Pick<Document, 'addEventListener' | 'removeEventListener'> = document,
): () => void {
  const events = ['pointerdown', 'touchend', 'keydown'] as const
  const handler = () => {
    engine.unlock()
    if (engine.unlocked) cleanup()
  }
  const cleanup = () => {
    for (const event of events) target.removeEventListener(event, handler, true)
  }
  for (const event of events) target.addEventListener(event, handler, true)
  return cleanup
}
