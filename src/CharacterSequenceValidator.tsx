import React, { useEffect } from 'react';

export interface ValidationResult {
    isValid: boolean;
    sequenceCount: number;
}

interface Props {
    password: string;
    onValidate: (result: ValidationResult) => void;
}

const CharacterSequenceValidator: React.FC<Props> = ({ password, onValidate }) => {

    const validateSequence = (str: string): ValidationResult => {
        let count = 0;

        // kontrola sekvence po 4 znacích
        for (let i = 0; i < str.length - 3; i++) {
            const segment = str.slice(i, i + 4);

            const hasLower = /[a-z]/.test(segment);
            const hasUpper = /[A-Z]/.test(segment);
            const hasNumber = /[0-9]/.test(segment);
            const hasSpecial = /[^A-Za-z0-9]/.test(segment);

            if (hasLower && hasUpper && hasNumber && hasSpecial) {
                count++;
            }
        }

        return {
            isValid: count > 0,
            sequenceCount: count
        };
    };

    const result = validateSequence(password);

    useEffect(() => {
        onValidate(result);
    }, [password]);

    return (
        <div className="mt-2">
            <small>
                Sekvence: {result.sequenceCount}{" "}
                {result.isValid ? "✅" : "❌"}
            </small>
        </div>
    );
};

export default CharacterSequenceValidator;