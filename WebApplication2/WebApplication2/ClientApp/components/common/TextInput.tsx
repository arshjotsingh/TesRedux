import * as React from 'react';

export interface TextInputProp {
    name: string;
    onChange: (event: any) => void;
    label: string;
    placeholder?: string;
    error: string;
    value: string;
}

export const TextInput: React.SFC<TextInputProp> = (props) => {

    const { name, label, placeholder, error, value, onChange } = props;

    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <input
                    type="text"
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange} />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};


