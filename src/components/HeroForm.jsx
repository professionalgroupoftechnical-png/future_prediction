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
    <div className="content">
      <p className="eyebrow">Falak</p>
      <h1>
        Apna <em>future</em> jano,
        <br />
        chand sitaron ki zubani.
      </h1>
      <p className="sub">
        Naam aur date of birth dalein — career, shaadi, sehat, paisa, ghar, foreign aur zindagi ke
        baare mein detailed likha hua jawab payein.
      </p>
      <p className="note">
        Sirf tafreeh ke liye — asli faisle experts aur family se mashwara kar ke lein.
      </p>
      <div className="card">
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
