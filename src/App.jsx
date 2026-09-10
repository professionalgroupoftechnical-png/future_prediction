import { useState, useRef } from 'react'
import { useAmbientSound } from './hooks/useAmbientSound'
import { getZodiac, getLifePath, getLuckyNumber } from './lib/zodiac'
import { buildPredictions, TITLE_MAP } from './lib/predictions'
import SoundToggle from './components/SoundToggle'
import HeroForm from './components/HeroForm'
import Results from './components/Results'

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
      <SoundToggle on={sound.on} onToggle={sound.toggle} />

      <section className="section">
        <div className="bg" />
        <HeroForm
          name={name}
          dob={dob}
          error={error}
          loading={loading}
          onNameChange={setName}
          onDobChange={setDob}
          onSubmit={handleSubmit}
        />
        {result && <div className="hint">Neeche scroll karein ↓</div>}
      </section>

      <section className="section scrollable" ref={section2Ref}>
        <div className="bg bg2" />
        <div
          className="diamond"
          style={{ width: 90, height: 90, top: '8%', right: '6%', transform: 'rotate(15deg)' }}
        />
        <div
          className="diamond"
          style={{
            width: 50,
            height: 50,
            bottom: '12%',
            left: '4%',
            transform: 'rotate(25deg)',
            borderColor: 'rgba(255,255,255,0.25)',
          }}
        />
        <div
          className="diamond"
          style={{
            width: 34,
            height: 34,
            top: '40%',
            right: '3%',
            transform: 'rotate(10deg)',
            borderColor: 'rgba(255,255,255,0.2)',
          }}
        />
        <Results result={result} onReset={reset} />
      </section>
    </div>
  )
}
