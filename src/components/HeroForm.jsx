import BrandLogo from './BrandLogo'

export default function HeroForm({
  name,
  dob,
  error,
  loading,
  onNameChange,
  onDobChange,
  onSubmit,
}) {
  return (
    <div className="content content--hero">
      <div className="hero-brand reveal reveal-1">
        <BrandLogo size="lg" />
        <p className="eyebrow brand-name">Falak</p>
      </div>
      <h1 className="reveal reveal-2">
        Apna <em>future</em> jano,
        <br />
        chand sitaron ki zubani.
      </h1>
      <p className="sub reveal reveal-3">
        Naam aur date of birth dalein — career, shaadi, sehat, paisa, ghar, foreign aur zindagi ke
        baare mein detailed likha hua jawab payein.
      </p>
      <p className="note reveal reveal-4">
        Sirf tafreeh ke liye — asli faisle experts aur family se mashwara kar ke lein.
      </p>
      <div className="card reveal reveal-5">
        <div className="field">
          <label htmlFor="name">Apna naam</label>
          <input
            id="name"
            type="text"
            placeholder="Naam likhein"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="dob">Date of birth</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => onDobChange(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="cta" type="button" onClick={onSubmit} disabled={loading}>
          {loading ? 'Sitare dekh rahe hain...' : 'Future dekhein'}
        </button>
        {loading && (
          <div className="loading">
            <span className="leaf-spin" />
            <span>Calculate kar rahe hain...</span>
          </div>
        )}
      </div>
    </div>
  )
}
