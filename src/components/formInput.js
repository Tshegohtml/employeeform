// FormInput.jsx

import React, { useState } from "react";
import "./formsInput.css";

const FormInput = ({ label, errorMessage, onChange, ...inputProps }) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    return (
        <div className="formInput">
            <label>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() => {
                    if (inputProps.name === "confirmemail") setFocused(true);
                }}
            />
            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;
