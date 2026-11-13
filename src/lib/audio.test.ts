import { AudioEngine, MUTE_STORAGE_KEY, installAudioUnlock, type MinimalAudioContext } from './audio'

function fakeContext(initialState = 'suspended') {
  const started: unknown[] = []
  const sources: { stop: ReturnType<typeof vi.fn> }[] = []
  const ctx = {
    state: initialState,
    destination: {} as AudioNode,
    resume: vi.fn(async function (this: { state: string }) {
      // Simulate: resume only succeeds while "in a gesture".
      if (ctx.allowResume) ctx.state = 'running'
    }),
    allowResume: false,
    createBuffer: vi.fn(() => ({}) as AudioBuffer),
    createBufferSource: vi.fn(() => {
      const source = {
        buffer: null as AudioBuffer | null,
        onended: null as (() => void) | null,
        connect: vi.fn(),
        start: vi.fn(() => started.push(source.buffer)),
        stop: vi.fn(),
      }
      sources.push(source)
      return source as unknown as AudioBufferSourceNode
    }),
    decodeAudioData: vi.fn(async () => ({ decoded: true }) as unknown as AudioBuffer),
  }
  return { ctx, started, sources }
}

function memoryStorage(initial: Record<string, string> = {}) {
  const data = { ...initial }
  return {
    data,
    getItem: (k: string) => (k in data ? data[k] : null),
    setItem: (k: string, v: string) => {
      data[k] = v
    },
  }
}

function makeEngine(state = 'suspended', storage = memoryStorage()) {
  const fake = fakeContext(state)
  const fetchArrayBuffer = vi.fn(async () => new ArrayBuffer(8))
  const engine = new AudioEngine({
    createContext: () => fake.ctx as unknown as MinimalAudioContext,
    fetchArrayBuffer,
    storage,
  })
  return { engine, fake, fetchArrayBuffer, storage }
}

describe('AudioEngine', () => {
  it('does not play while locked (iOS before the first tap)', async () => {
    const { engine, fake } = makeEngine('suspended')
    expect(await engine.play('/a.mp3')).toBe(false)
    expect(fake.started).toHaveLength(0)
  })

  it('plays after unlock() during a gesture', async () => {
    const { engine, fake } = makeEngine('suspended')
    fake.ctx.allowResume = true
    engine.unlock()
    await Promise.resolve()
    expect(engine.unlocked).toBe(true)
    expect(await engine.play('/a.mp3')).toBe(true)
    // 1 silent unlock buffer + the real sound
    expect(fake.started).toHaveLength(2)
  })

  it('preloads each url once and reuses the decoded buffer', async () => {
    const { engine, fetchArrayBuffer } = makeEngine('running')
    await engine.preload(['/a.mp3', '/b.mp3', '/a.mp3'])
    await engine.play('/a.mp3')
    await engine.play('/a.mp3')
    expect(fetchArrayBuffer).toHaveBeenCalledTimes(2)
  })

  it('returns false instead of throwing when a sound fails to load, and retries later', async () => {
    const { engine, fetchArrayBuffer } = makeEngine('running')
    fetchArrayBuffer.mockRejectedValueOnce(new Error('404'))
    expect(await engine.play('/missing.mp3')).toBe(false)
    expect(await engine.play('/missing.mp3')).toBe(true)
    expect(fetchArrayBuffer).toHaveBeenCalledTimes(2)
  })

  it('mute: blocks play, stops sounds, persists and notifies subscribers', async () => {
    const { engine, fake, storage } = makeEngine('running')
    await engine.play('/a.mp3')
    const listener = vi.fn()
    engine.subscribe(listener)

    engine.setMuted(true)
    expect(engine.isMuted()).toBe(true)
    expect(fake.sources[0].stop).toHaveBeenCalled()
    expect(storage.data[MUTE_STORAGE_KEY]).toBe('1')
    expect(listener).toHaveBeenCalledTimes(1)
    expect(await engine.play('/a.mp3')).toBe(false)

    engine.toggleMuted()
    expect(engine.isMuted()).toBe(false)
    expect(storage.data[MUTE_STORAGE_KEY]).toBe('0')
  })

  it('starts muted when the device remembered it', () => {
    const { engine } = makeEngine('running', memoryStorage({ [MUTE_STORAGE_KEY]: '1' }))
    expect(engine.isMuted()).toBe(true)
  })

  it('is a no-op without Web Audio support', async () => {
    const engine = new AudioEngine({ createContext: () => null, storage: null })
    engine.unlock()
    expect(engine.unlocked).toBe(false)
    expect(await engine.play('/a.mp3')).toBe(false)
  })
})

describe('installAudioUnlock', () => {
  it('unlocks on the first gesture and then removes its listeners', async () => {
    const { engine, fake } = makeEngine('suspended')
    fake.ctx.allowResume = true
    const target = new EventTarget() as unknown as Document
    const removeSpy = vi.spyOn(target, 'removeEventListener')
    installAudioUnlock(engine, target)

    target.dispatchEvent(new Event('pointerdown'))
    await Promise.resolve()
    expect(fake.ctx.resume).toHaveBeenCalled()
    // second gesture: unlocked now, so listeners get removed
    target.dispatchEvent(new Event('pointerdown'))
    expect(removeSpy).toHaveBeenCalled()
  })
})
