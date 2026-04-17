import { useState } from 'react'
import PasswordInput from './PasswordInput';
import './App.css'
import PasswordStrength from "./PasswordStrength.tsx";

function App() {
  const [password, setPassword] = useState<string>('');

  return (
      <>
        <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Registrace</h1>
          <PasswordInput setPassword={setPassword} />

          <PasswordStrength password={password} />
        </div>

      </>
  );
}

export default App
