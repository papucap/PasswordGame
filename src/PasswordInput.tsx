import React from 'react';

interface PasswordInputProps {
    setPassword: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ setPassword }) => {
    return (
        <div style={{ margin: '10px 0' }}>
            <label htmlFor="password">Zadejte heslo: </label>
            <input
                id="password"
                type="password"
                placeholder="Vaše heslo"
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    );
};

export default PasswordInput;