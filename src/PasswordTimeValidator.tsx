import React from 'react';

interface TimeValidation {
    durationSeconds: number;
    isHuman: boolean;
}

interface Props {
    password: string;
    startTime: number;
}

const PasswordTimeValidator: React.FC<Props> = ({ password, startTime }) => {
    const checkTime = (): TimeValidation => {
        const duration = (Date.now() - startTime) / 1000;
        // Heslo zadané za méně než 1.5 s je podezřelé
        const isHuman = password.length > 0 ? duration > 1.5 : true;
        return { durationSeconds: Math.round(duration), isHuman };
    };

    const status = checkTime();

    return (
        <div className="pc-validator">
            <div className="pc-validator-title">Časová validace</div>
            <div className="pc-validator-row">
                <span>Čas zadávání: {status.durationSeconds} s</span>
                <span className={`pc-badge ${status.isHuman ? 'ok' : 'warn'}`}>
                    {status.isHuman ? 'Člověk' : 'Bot?'}
                </span>
            </div>
            {!status.isHuman && (
                <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: 'var(--strength-medium)' }}>
                    ⚠ Heslo zadáno příliš rychle
                </div>
            )}
        </div>
    );
};

export default PasswordTimeValidator;