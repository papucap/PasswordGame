interface Props {
  password: string
}

interface Criterion {
  id: string
  label: string
  test: (pwd: string) => boolean
}

const criteria: Criterion[] = [
  { id: 'len',   label: 'Minimálně 8 znaků',                      test: pwd => pwd.length >= 8 },
  { id: 'upper', label: 'Alespoň jedno velké písmeno',             test: pwd => /[A-Z]/.test(pwd) },
  { id: 'num',   label: 'Alespoň jedno číslo',                     test: pwd => /[0-9]/.test(pwd) },
  { id: 'spec',  label: 'Alespoň jeden speciální znak (!@#$%^&*)', test: pwd => /[!@#$%^&*]/.test(pwd) },
]

function getStrength(pwd: string): { label: string; pct: number; color: string } {
  if (pwd.length === 0) return { label: 'Zadejte heslo', pct: 0, color: 'var(--text-muted)' }
  const score = criteria.filter(c => c.test(pwd)).length
  if (score <= 1) return { label: 'Slabé',   pct: 25,  color: 'var(--danger)' }
  if (score === 2) return { label: 'Slabé',   pct: 50,  color: 'var(--warning)' }
  if (score === 3) return { label: 'Střední', pct: 75,  color: 'var(--warning)' }
  return              { label: 'Silné',   pct: 100, color: 'var(--success)' }
}

function PasswordStrength({ password }: Props) {
  const strength = getStrength(password)

  return (
    <div>
      <div className="strength-bar-track">
        <div
          className="strength-bar-fill"
          style={{ width: `${strength.pct}%`, backgroundColor: strength.color }}
        />
      </div>
      <div className="strength-text" style={{ color: strength.color }}>
        {strength.label}
      </div>

      <div className="criteria-list">
        {criteria.map(c => (
          <div key={c.id} className={`criterion ${c.test(password) ? 'ok' : ''}`}>
            <span className="criterion-dot" />
            {c.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PasswordStrength