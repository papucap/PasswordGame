import { useState } from 'react';
import './App.css';

import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';
import CharacterSequenceValidator, { type ValidationResult } from './CharacterSequenceValidator';
import PasswordTimeValidator from './PasswordTimeValidator';

export default function App() {
    const [password, setPassword] = useState('');
    const [createdAt, setCreatedAt] = useState<number | null>(null);
    const [sequenceResult, setSequenceResult] = useState<ValidationResult | null>(null);

    const handlePasswordChange = (value: string) => {
        if (!createdAt && value.length > 0) setCreatedAt(Date.now());
        if (value === '') setCreatedAt(null);
        setPassword(value);
    };

    const isStrong = sequenceResult?.isValid && password.length >= 8;

    return (
        <div className="pc-bg">
            <div className="pc-card">

                {/* Hlavička */}
                <div className="pc-header">
                    <h1>Pass<span>Check</span></h1>
                    <p className="pc-subtitle">// analyzer síly hesla</p>
                </div>

                {/* Input */}
                <PasswordInput password={password} setPassword={handlePasswordChange} />

                {/* Síla hesla + kritéria */}
                <PasswordStrength password={password} />

                <hr className="pc-divider" />

                {/* Sekvence znaků */}
                <CharacterSequenceValidator
                    password={password}
                    onValidate={setSequenceResult}
                />

                {/* Časová validace – zobrazí se jakmile uživatel začne psát */}
                {createdAt && (
                    <PasswordTimeValidator
                        password={password}
                        startTime={createdAt}
                    />
                )}

                {/* Tlačítko */}
                <button className="pc-btn" disabled={!isStrong}>
                    {isStrong ? '✓ Heslo je v pořádku' : 'Ověřit heslo'}
                </button>

            </div>
        </div>
    );
}