export default function SoundToggle({ on, onToggle }) {
  return (
    <button
      type="button"
      className={`sound-toggle${on ? ' on' : ''}`}
      onClick={onToggle}
      aria-pressed={on}
    >
      <span className="sound-dot" />
      <span>{on ? 'Awaaz chal rahi hai' : 'Sukoon wali awaaz'}</span>
    </button>
  )
}
