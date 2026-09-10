export default function BrandLogo({ size = 'lg' }) {
  return (
    <div className={`brand-logo brand-logo--${size}`} aria-hidden="true">
      <div className="brand-logo__orbit brand-logo__orbit--outer">
        <span className="brand-logo__spark brand-logo__spark--a">✦</span>
        <span className="brand-logo__spark brand-logo__spark--b">◆</span>
        <span className="brand-logo__spark brand-logo__spark--c">✧</span>
      </div>
      <div className="brand-logo__orbit brand-logo__orbit--inner">
        <span className="brand-logo__dot" />
        <span className="brand-logo__dot brand-logo__dot--2" />
      </div>
      <div className="brand-logo__core">
        <span className="brand-logo__ring" />
        <span className="brand-logo__mark">ف</span>
      </div>
    </div>
  )
}
