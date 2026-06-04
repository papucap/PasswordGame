import { useState } from 'react'

interface Props {
  password: string
  setPassword: (value: string) => void
}

function PasswordInput({ password, setPassword }: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="mb-3">
      <label className="form-label">Heslo</label>
      <div className="input-group">
        <input
          type={visible ? 'text' : 'password'}
          className="form-control"
          placeholder="Zadejte heslo..."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="btn btn-toggle"
          type="button"
          onClick={() => setVisible(v => !v)}
          title="Zobrazit / skrýt heslo"
        >
          {visible ? '🙈' : '👁'}
        </button>
      </div>
    </div>
  )
}

export default PasswordInput