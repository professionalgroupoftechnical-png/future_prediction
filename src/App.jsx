import { useState, useRef } from 'react'
import { useAmbientSound } from './hooks/useAmbientSound'
import { getZodiac, getLifePath, getLuckyNumber } from './lib/zodiac'
import { buildPredictions, TITLE_MAP } from './lib/predictions'
import SoundToggle from './components/SoundToggle'
import HeroForm from './components/HeroForm'
import Results from './components/Results'
import BrandLogo from './components/BrandLogo'

const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  delay: `${(i % 8) * 0.4}s`,
  duration: `${3 + (i % 5)}s`,
  size: 1 + (i % 3),
}))

export default function App() {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const sound = useAmbientSound()
  const pagerRef = useRef(null)
  const section2Ref = useRef(null)

  function handleSubmit() {
    if (!name.trim() || !dob) {
      setError('Naam aur date of birth dono zaroori hain.')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      const zodiac = getZodiac(dob)
      const lp = getLifePath(dob)
      const lucky = getLuckyNumber(name.trim(), dob)
      const texts = buildPredictions(zodiac, lp)
      const preds = Object.keys(TITLE_MAP).map((k) => ({
        key: k,
        title: TITLE_MAP[k],
        text: texts[k],
      }))
      setLoading(false)
      setResult({ zodiac, lp, lucky, preds })
      setTimeout(() => {
        section2Ref.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }, 1200)
  }

  function reset() {
    setResult(null)
    setError('')
    pagerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="pager" ref={pagerRef}>
      <div className="float-logo">
        <BrandLogo size="sm" />
      </div>
      <SoundToggle on={sound.on} onToggle={sound.toggle} />

      <section className="section">
        <div className="bg" aria-hidden="true">
          <div className="bg-veil" />
          <div className="starfield">
            {STARS.map((s) => (
              <span
                key={s.id}
                className="star"
                style={{
                  left: s.left,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                  animationDelay: s.delay,
                  animationDuration: s.duration,
                }}
              />
            ))}
          </div>
        </div>
        <HeroForm
          name={name}
          dob={dob}
          error={error}
          loading={loading}
          onNameChange={setName}
          onDobChange={setDob}
          onSubmit={handleSubmit}
        />
        {result && <div className="hint hint-bounce">Neeche scroll karein ↓</div>}
      </section>

      <section className="section scrollable" ref={section2Ref}>
        <div className="bg bg2" aria-hidden="true">
          <div className="bg-veil" />
          <div className="starfield starfield--dim">
            {STARS.slice(0, 16).map((s) => (
              <span
                key={`b-${s.id}`}
                className="star"
                style={{
                  left: s.left,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                  animationDelay: s.delay,
                  animationDuration: s.duration,
                }}
              />
            ))}
          </div>
        </div>
        <div className="diamond diamond-spin" style={{ width: 90, height: 90, top: '8%', right: '6%' }} />
        <div
          className="diamond diamond-spin diamond-spin--slow"
          style={{
            width: 50,
            height: 50,
            bottom: '12%',
            left: '4%',
            borderColor: 'rgba(255,255,255,0.25)',
          }}
        />
        <div
          className="diamond diamond-spin"
          style={{
            width: 34,
            height: 34,
            top: '40%',
            right: '3%',
            borderColor: 'rgba(255,255,255,0.2)',
            animationDelay: '1s',
          }}
        />
        <Results result={result} onReset={reset} />
      </section>
    </div>
  )
}
