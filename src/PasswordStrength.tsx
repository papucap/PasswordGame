import { useState } from 'react';

interface PasswordStrengthProps {
    password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
    const [isVisible, setIsVisible] = useState(false);

    const criteria = [
        { label: 'Minimálně 8 znaků', met: password.length >= 8 },
        { label: 'Velké písmeno', met: /[A-Z]/.test(password) },
        { label: 'Číslo', met: /[0-9]/.test(password) },
        { label: 'Speciální znak (!@#$%^&*)', met: /[!@#$%^&*]/.test(password) },
    ];

    const strengthScore = criteria.filter((c) => c.met).length;

    const getStrengthData = () => {
        if (password.length === 0) return { label: 'Zadejte heslo', color: 'var(--border-color)', width: '0%' };
        if (strengthScore <= 1) return { label: 'Slabé', color: 'var(--strength-weak)', width: '33%' };
        if (strengthScore <= 3) return { label: 'Střední', color: 'var(--strength-medium)', width: '66%' };
        return { label: 'Silné', color: 'var(--strength-strong)', width: '100%' };
    };

    const strength = getStrengthData();

    return (
        <div style={{ marginTop: '20px', maxWidth: '300px' }}>

            <button
                onClick={() => setIsVisible(!isVisible)}
                style={{ marginBottom: '10px', fontSize: '12px' }}
            >
                {isVisible ? 'Skrýt heslo' : 'Zobrazit heslo'}
            </button>

            {isVisible && <p style={{ fontSize: '14px', color: '#555' }}>Text: {password}</p>}

            <div style={{ height: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{
                    height: '100%',
                    width: strength.width,
                    backgroundColor: strength.color,
                    transition: 'width 0.3s ease'
                }} />
            </div>
            <p style={{ fontWeight: 'bold', color: strength.color }}>{strength.label}</p>

            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
                {criteria.map((c, index) => (
                    <li key={index} style={{ color: c.met ? '#2ecc71' : '#888', display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '8px' }}>{c.met ? '✅' : '❌'}</span>
                        {c.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PasswordStrength;