import { Fragment } from 'react'
import { ICONS } from '../lib/predictions'

export default function Results({ result, onReset }) {
  return (
    <div className="content wide content--results">
      <div className="result-head">
        <p className="eyebrow" style={{ margin: 0 }}>
          Aapki tafseeli future summary
        </p>
      </div>

      {result && (
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-badge">
              <span>♦</span>
            </div>
            <p className="stat-title">Zodiac</p>
            <p className="stat-big" style={{ fontSize: 22 }}>
              {result.zodiac.name}
            </p>
          </div>
          <div className="stat-card">
            <div className="stat-badge">
              <span>◆</span>
            </div>
            <p className="stat-title">Life-path</p>
            <p className="stat-big">{result.lp}</p>
            <p className="stat-caption">DOB se banta hai — buniyadi tabiyat zahir karta hai</p>
          </div>
          <div className="stat-card">
            <div className="stat-badge">
              <span>★</span>
            </div>
            <p className="stat-title">Lucky Number</p>
            <p className="stat-big">{result.lucky}</p>
            <p className="stat-caption">Naam aur DOB dono se banta hai</p>
          </div>
        </div>
      )}

      {result ? (
        <Fragment>
          <div className="grid">
            {result.preds.map((p, i) => {
              const sizeClass = [0, 4].includes(i) ? 'big' : i % 3 === 2 ? 'small' : ''
              return (
                <div
                  className={`pred-card ${sizeClass}`.trim()}
                  key={p.key}
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="pred-head">
                    <span className="pred-icon">
                      <span>{ICONS[p.key]}</span>
                    </span>
                    <p className="pred-title">{p.title}</p>
                  </div>
                  <p className="pred-text">{p.text}</p>
                </div>
              )
            })}
          </div>
          <div className="footer-row">
            <div className="disclaimer-card">
              <div className="disclaimer-icon">
                <span>i</span>
              </div>
              <p className="disclaimer">
                <b>Sirf tafreeh ke liye.</b> Ye real zodiac date-ranges aur numerology calculation
                par mabni hai, is liye DOB badalne se result badalta hai — lekin ye science se saabit
                shuda nahi. Financial, immigration ya rishtay ka koi bhi faisla is par bharosa kar ke
                na karein.
              </p>
            </div>
            <button className="again" type="button" onClick={onReset} style={{ alignSelf: 'center' }}>
              Dobara dekhein
            </button>
          </div>
        </Fragment>
      ) : (
        <p className="sub">Pehle page par apni details dal kar &quot;Future dekhein&quot; dabayein.</p>
      )}
    </div>
  )
}
