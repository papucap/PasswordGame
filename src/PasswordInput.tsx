interface PasswordInputProps {
    password: string;
    setPassword: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ password, setPassword }) => {
    return (
        <div className="mb-3">
            <label className="form-label">Zadejte heslo:</label>
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    );
};

export default PasswordInput;