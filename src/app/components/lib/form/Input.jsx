import { ErrorMessage } from 'formik';
import { PropTypes } from 'prop-types';
import React from 'react';

const Input = ({
    noError,
    className,
    type,
    field: { name, value },
    field,
    form: { errors, touched, setFieldValue },
    label,
    ...rest
}) => {
    return (
        <div className="relative w-full">
            {label && <span className="label">{label}</span>}
            <input
                id={name}
                name={name}
                type={type}
                onBlur={field.onBlur}
                onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue(name, value);
                }}
                className={`input ${
                    errors[name] && touched[name] && 'input-error'
                } ${className} `}
                value={value} // Update this line to use field.value
                {...rest}
            />
            {!noError && (
                <ErrorMessage
                    name={field.name}
                    className="error-message"
                    component="small"
                />
            )}
        </div>
    );
};

export default Input;

Input.defaultProps = {
    type: 'text',
    noError: false,
    className: '',
};

Input.propTypes = {
    noError: PropTypes.bool,
    className: PropTypes.string,
    type: PropTypes.string,
    field: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    form: PropTypes.shape({
        errors: PropTypes.object.isRequired,
        touched: PropTypes.object.isRequired,
        setFieldValue: PropTypes.func.isRequired,
    }).isRequired,
};
