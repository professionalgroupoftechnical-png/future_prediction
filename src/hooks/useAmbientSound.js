import { useState, useRef, useEffect } from 'react'

export function useAmbientSound() {
  const ctxRef = useRef(null)
  const [on, setOn] = useState(false)

  function start() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioCtx()
    ctxRef.current = ctx

    const master = ctx.createGain()
    master.gain.value = 0.0
    master.connect(ctx.destination)
    master.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2)

    const bufferSize = 2 * ctx.sampleRate
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1

    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuffer
    noise.loop = true
    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'lowpass'
    noiseFilter.frequency.value = 650
    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.5
    noise.connect(noiseFilter).connect(noiseGain).connect(master)
    noise.start()

    ;[196, 261.6, 329.6].forEach((f, i) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = f
      const g = ctx.createGain()
      g.gain.value = 0.045
      const lfo = ctx.createOscillator()
      lfo.frequency.value = 0.08 + i * 0.02
      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 0.025
      lfo.connect(lfoGain).connect(g.gain)
      lfo.start()
      osc.connect(g).connect(master)
      osc.start()
    })

    setOn(true)
  }

  function stop() {
    const ctx = ctxRef.current
    if (ctx) setTimeout(() => ctx.close(), 900)
    ctxRef.current = null
    setOn(false)
  }

  useEffect(() => {
    return () => {
      if (ctxRef.current) ctxRef.current.close()
    }
  }, [])

  return { on, toggle: () => (on ? stop() : start()) }
}
