import { useState, useEffect } from 'react'
import PasswordInput from './components/PasswordInput/PasswordInput'
import PasswordStrength from './components/PasswordStrength/PasswordStrength'
import CharacterSequenceValidator from './components/CharacterSequenceValidator'
import PasswordTimeValidator from './components/PasswordTimeValidator'
import CountryFlagValidator from './components/CountryFlagValidator'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('—')
  const [startTime, setStartTime] = useState<number | null>(null)

  function evaluatePassword(pwd: string): string {
    let score = 0
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[!@#$%^&*]/.test(pwd)) score++
    if (pwd.length === 0) return '—'
    if (score <= 2) return 'Slabé'
    if (score === 3) return 'Střední'
    return 'Silné'
  }

  useEffect(() => {
    const strength = evaluatePassword(password)
    setPasswordStrength(strength)
  }, [password])

  useEffect(() => {
    document.title = `Síla hesla: ${passwordStrength}`
  }, [passwordStrength])

  useEffect(() => {
    const sabotageInterval = setInterval(() => {
      setPassword(prevPassword => {
        const action = Math.random() < 0.5 ? 'add' : 'remove'
        if (action === 'add') {
          return prevPassword + '😜'
        } else {
          if (prevPassword.length === 0) return prevPassword
          const index = Math.floor(Math.random() * prevPassword.length)
          return prevPassword.slice(0, index) + prevPassword.slice(index + 1)
        }
      })
    }, 10000)
    return () => clearInterval(sabotageInterval)
  }, [])

  function handleSetPassword(value: string) {
    if (password === '' && value.length > 0) {
      setStartTime(Date.now())
    }
    setPassword(value)
  }

  return (
    <div className="app-wrapper">
      <div className="card app-card">
        <div className="card-body">
          <h1 className="app-title">🔐 Password Game</h1>

          <PasswordInput password={password} setPassword={handleSetPassword} />

          <PasswordStrength password={password} />

          <hr className="my-4" />

          <p className="section-label">Pokročilé validátory</p>

          <CharacterSequenceValidator password={password} />
          <PasswordTimeValidator password={password} startTime={startTime} />
          <CountryFlagValidator password={password} />
        </div>
      </div>
    </div>
  )
}

export default App