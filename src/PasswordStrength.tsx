import React, { useState, useEffect } from 'react';

interface PasswordStrengthProps {
    password: string;
}

type StrengthLevel = 'empty' | 'weak' | 'medium' | 'strong';

interface StrengthData {
    level: StrengthLevel;
    label: string;
    color: string;
    width: string;
}

const criteria = [
    { label: 'Min. 8 znaků',    test: (p: string) => p.length >= 8 },
    { label: 'Velké písmeno',   test: (p: string) => /[A-Z]/.test(p) },
    { label: 'Číslo',           test: (p: string) => /[0-9]/.test(p) },
    { label: 'Speciální znak',  test: (p: string) => /[!@#$%^&*]/.test(p) },
];

/** Vrátí textový popis síly hesla – použito v useEffect */
function evaluatePassword(password: string): StrengthLevel {
    if (password.length === 0) return 'empty';
    const score = criteria.filter((c) => c.test(password)).length;
    if (score <= 1) return 'weak';
    if (score <= 3) return 'medium';
    return 'strong';
}

function getStrengthData(level: StrengthLevel): StrengthData {
    switch (level) {
        case 'empty':  return { level, label: 'Zadejte heslo', color: 'var(--border-color)', width: '0%' };
        case 'weak':   return { level, label: 'Slabé',          color: 'var(--strength-weak)',   width: '33%' };
        case 'medium': return { level, label: 'Střední',        color: 'var(--strength-medium)', width: '66%' };
        case 'strong': return { level, label: 'Silné',          color: 'var(--strength-strong)', width: '100%' };
    }
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
    const [strengthLevel, setStrengthLevel] = useState<StrengthLevel>('empty');

    // useEffect sleduje změny hesla a volá evaluatePassword
    useEffect(() => {
        const level = evaluatePassword(password);
        setStrengthLevel(level);
    }, [password]);

    const strength = getStrengthData(strengthLevel);

    return (
        <div className="pc-strength-section">
            {/* Pruh síly */}
            <div className="pc-strength-header">
                <span className="pc-strength-label">Síla hesla</span>
                <span className="pc-strength-value" style={{ color: strength.color }}>
                    {strength.label}
                </span>
            </div>
            <div className="pc-bar-track">
                <div
                    className="pc-bar-fill"
                    style={{ width: strength.width, backgroundColor: strength.color }}
                />
            </div>

            {/* Kritéria */}
            <ul className="pc-criteria" style={{ marginTop: '1rem' }}>
                {criteria.map((c, i) => {
                    const met = c.test(password);
                    return (
                        <li key={i} className={met ? 'met' : ''}>
                            <span className="pc-criteria-dot" />
                            {c.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PasswordStrength;