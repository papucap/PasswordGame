interface Props {
  password: string
}

interface SequenceResult {
  valid: boolean
  count: number
}

function validateSequence(pwd: string): SequenceResult {
  let count = 0
  for (let i = 0; i <= pwd.length - 4; i++) {
    const sub = pwd.slice(i, i + 4)
    if (
      /[a-z]/.test(sub) &&
      /[A-Z]/.test(sub) &&
      /[0-9]/.test(sub) &&
      /[!@#$%^&*]/.test(sub)
    ) {
      count++
    }
  }
  return { valid: count > 0, count }
}

function CharacterSequenceValidator({ password }: Props) {
  const result: SequenceResult = validateSequence(password)

  return (
    <div className="validator-block">
      <div className="validator-row">
        <span>🔡</span>
        <span>Sekvence různých typů znaků</span>
        <span className={result.valid ? 'badge-ok' : 'badge-fail'}>
          {result.valid ? 'Splněno' : 'Nesplněno'}
        </span>
      </div>
      <div className="validator-detail">
        Validní sekvence (malé + velké + číslo + speciální za sebou): {result.count}
      </div>
    </div>
  )
}

export default CharacterSequenceValidator