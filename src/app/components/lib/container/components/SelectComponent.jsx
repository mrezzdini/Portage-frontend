import React from 'react';

const SelectComponent = ({ options, entityName, onChange, name, style }) => {
    const handleSelectChange = (event) => {
        onChange(event);
    };

    return (
        <>
            <select
                label={name}
                name={name}
                className="input-select"
                style={style}
                onChange={handleSelectChange}
            >
                <option selected>
                    <h5>--------------- Selectionner un {entityName} --------------- </h5>
                </option>
                {options.map((option) => (
                    <>
                        <option name={option.id} value={option.name} required>
                            {option.name}
                        </option>
                    </>
                ))}
            </select>
        </>
    );
};

export default SelectComponent;
