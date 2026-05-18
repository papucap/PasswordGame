import React, { useEffect } from 'react';

export interface ValidationResult {
    isValid: boolean;
    sequenceCount: number;
}

interface Props {
    password: string;
    onValidate: (result: ValidationResult) => void;
}

/** Kontroluje sekvence 4 po sobě jdoucích znaků, každá musí obsahovat
 *  malé písmeno, velké písmeno, číslici a speciální znak. */
function validateSequence(str: string): ValidationResult {
    let count = 0;
    for (let i = 0; i <= str.length - 4; i++) {
        const seg = str.slice(i, i + 4);
        if (
            /[a-z]/.test(seg) &&
            /[A-Z]/.test(seg) &&
            /[0-9]/.test(seg) &&
            /[^A-Za-z0-9]/.test(seg)
        ) {
            count++;
        }
    }
    return { isValid: count > 0, sequenceCount: count };
}

const CharacterSequenceValidator: React.FC<Props> = ({ password, onValidate }) => {
    const result = validateSequence(password);

    // useEffect informuje rodiče o výsledku při každé změně hesla
    useEffect(() => {
        onValidate(result);
    }, [password]);

    return (
        <div className="pc-validator">
            <div className="pc-validator-title">Sekvence znaků</div>
            <div className="pc-validator-row">
                <span>
                    {result.sequenceCount === 0
                        ? 'Žádná validní sekvence'
                        : `${result.sequenceCount} validní sekvence`}
                </span>
                <span className={`pc-badge ${result.isValid ? 'ok' : 'fail'}`}>
                    {result.isValid ? 'OK' : 'Chybí'}
                </span>
            </div>
        </div>
    );
};

export default CharacterSequenceValidator;