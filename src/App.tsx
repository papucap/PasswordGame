import { useState } from "react";
import "./App.css";

import PasswordInput from "./PasswordInput";
import PasswordStrength from "./PasswordStrength";
import CharacterSequenceValidator, { ValidationResult } from "./CharacterSequenceValidator";
import PasswordTimeValidator from "./PasswordTimeValidator";

export default function App() {
    const [password, setPassword] = useState("");
    const [createdAt, setCreatedAt] = useState<number | null>(null);
    const [sequenceResult, setSequenceResult] = useState<ValidationResult | null>(null);

    const handlePasswordChange = (value: string) => {
        if (!createdAt && value.length > 0) {
            setCreatedAt(Date.now());
        }

        if (value === "") {
            setCreatedAt(null);
        }

        setPassword(value);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow custom-card" style={{ width: "400px" }}>

                <h3 className="text-center mb-4">Password Checker</h3>

                {/* INPUT KOMPONENTA */}
                <PasswordInput
                    password={password}
                    setPassword={handlePasswordChange}
                />

                {/* STRENGTH KOMPONENTA */}
                <PasswordStrength password={password} />

                {/* SEKVENČNÍ VALIDÁTOR */}
                <CharacterSequenceValidator
                    password={password}
                    onValidate={setSequenceResult}
                />

                {sequenceResult && (
                    <div className={`alert mt-2 ${sequenceResult.isValid ? "alert-success" : "alert-danger"}`}>
                        Sekvence: {sequenceResult.sequenceCount} → {sequenceResult.isValid ? "OK" : "Chybí"}
                    </div>
                )}

                {/* ČASOVÝ VALIDÁTOR */}
                {createdAt && (
                    <PasswordTimeValidator
                        password={password}
                        startTime={createdAt}
                    />
                )}

                <button className="btn btn-primary-custom w-100 mt-3">
                    Ověřit heslo
                </button>
            </div>
        </div>
    );
}