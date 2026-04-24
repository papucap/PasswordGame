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
        // Pokud má heslo více než 5 znaků a trvalo to méně než 1.5 sekundy, je to podezřelé
        const isHuman = password.length > 0 ? duration > 1.5 : true;

        return {
            durationSeconds: Math.round(duration),
            isHuman
        };
    };

    const status = checkTime();

    return (
        <div style={{ marginTop: '10px', fontSize: '0.85rem' }}>
            <strong>Časová validace:</strong>
            <p>Čas od načtení: {status.durationSeconds}s</p>
            {!status.isHuman && (
                <p style={{ color: 'orange' }}>⚠️ Varování: Heslo zadáno příliš rychle (možný bot).</p>
            )}
        </div>
    );
};

export default PasswordTimeValidator;