import React, { useState } from 'react';

const Select = ({ options, placeholder }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionSelect = (selectedValue) => {
        const selectedOption = options.find((option) => option.value === selectedValue);
        setSelectedOptions((prevSelectedOptions) => [
            ...prevSelectedOptions,
            selectedOption,
        ]);
    };

    const handleOptionDeselect = (selectedValue) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.filter((option) => option.value !== selectedValue),
        );
    };

    return (
        <div>
            <select multiple onChange={(e) => handleOptionSelect(e.target.value)}>
                <option value="" disabled selected>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div>
                <ul>
                    {selectedOptions.map((option) => (
                        <li key={option.value}>
                            {option.label}{' '}
                            <button onClick={() => handleOptionDeselect(option.value)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Select;
