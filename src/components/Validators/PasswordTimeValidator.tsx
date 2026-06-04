import { useEffect, useState } from 'react'

interface Props {
  password: string
  startTime: number | null
}

interface TimeResult {
  valid: boolean
  message: string
  pct: number
}

const TIME_WINDOW_MS = 5000

function PasswordTimeValidator({ password, startTime }: Props) {
  const [result, setResult] = useState<TimeResult>({ valid: false, message: 'Začněte psát...', pct: 100 })

  useEffect(() => {
    if (!startTime || password.length === 0) {
      setResult({ valid: false, message: 'Začněte psát...', pct: 100 })
      return
    }

    const update = () => {
      const elapsed = Date.now() - startTime
      const pct = Math.max(0, 100 - (elapsed / TIME_WINDOW_MS) * 100)
      const elapsedSec = (elapsed / 1000).toFixed(1)

      if (elapsed < 1000) {
        setResult({ valid: false, message: `Zadáno příliš rychle (${elapsedSec}s) — možné automatické generování`, pct })
      } else if (elapsed <= TIME_WINDOW_MS) {
        setResult({ valid: true, message: `Zadáno v čase: ${elapsedSec}s ✓`, pct })
      } else {
        setResult({ valid: false, message: `Časové okno vypršelo (${elapsedSec}s > 5s)`, pct: 0 })
      }
    }

    update()
    const interval = setInterval(update, 100)
    return () => clearInterval(interval)
  }, [password, startTime])

  const barColor = result.pct > 50 ? 'var(--primary-color)' : result.pct > 20 ? 'var(--warning)' : 'var(--danger)'

  return (
    <div className="validator-block">
      <div className="validator-row">
        <span>⏱</span>
        <span>Časová validace (okno 5 s)</span>
        <span className={result.valid ? 'badge-ok' : 'badge-fail'}>
          {password.length === 0 ? '—' : result.valid ? 'OK' : 'Nesplněno'}
        </span>
      </div>
      <div className="timer-track">
        <div className="timer-fill" style={{ width: `${result.pct}%`, backgroundColor: barColor }} />
      </div>
      <div className="validator-detail">{result.message}</div>
    </div>
  )
}

export default PasswordTimeValidator