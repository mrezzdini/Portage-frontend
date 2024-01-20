import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { Fragment, useCallback, useMemo } from 'react';

const InputSelect = ({ form, field, options, placeholder, multiple, noError, label }) => {
    const hasError = !noError && form.errors[field.name] && form.touched[field.name];
    const btnClassName = `input-select ${hasError ? 'input-select-error' : ''}`;

    const handleDelete = useCallback(
        (value) => {
            const index = field.value.findIndex((val) => val === value);
            if (index !== -1) {
                const newValue = [...field.value];
                newValue.splice(index, 1);
                form.setFieldValue(field.name, newValue);
            }
        },
        [field.value, field.name, form.setFieldValue],
    );

    const labelBtn = useMemo(() => {
        if (multiple) {
            return field.value?.length <= 0
                ? placeholder
                : options
                      .filter((option) => field.value.includes(option.value))
                      .map((option) => (
                          <LabelChosen
                              label={option.label}
                              key={option.value}
                              onDelete={handleDelete}
                          />
                      ));
        } else {
            const selectedOption = options.find((option) => option.value === field.value);
            return selectedOption ? selectedOption.label : placeholder;
        }
    }, [field.value, options, multiple, placeholder, handleDelete]);

    return (
        <Listbox
            value={field.value}
            onChange={(value) => form.setFieldValue(field.name, value)}
            multiple={multiple}
        >
            <div className="relative w-full">
                {label && <Listbox.Label className="label">{label}</Listbox.Label>}
                <Listbox.Button
                    className={`${btnClassName} text-gray-300 dark:border-gray-700 dark:bg-gray-600`}
                >
                    <div
                        className={`flex flex-wrap gap-1 ${
                            hasError ? 'text-red-500' : ''
                        }`}
                    >
                        {labelBtn}
                    </div>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options
                        className="absolute z-50 mt-1 max-h-60 w-full overflow-auto 
            rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none 
            dark:bg-gray-600 sm:text-sm"
                    >
                        {options.map((option) => (
                            <Listbox.Option
                                key={option.value}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 
                  ${active ? 'bg-secondary-lighter dark:bg-secondary' : ''}`
                                }
                                value={option.value}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                            }`}
                                        >
                                            {option.label}
                                        </span>
                                        {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary">
                                                <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
                {!noError && (
                    <ErrorMessage
                        name={field.name}
                        className="absolute -bottom-4 right-0 text-xs text-red-500"
                        component="small"
                    />
                )}
            </div>
        </Listbox>
    );
};

InputSelect.defaultProps = {
    multiple: false,
    noError: false,
};

InputSelect.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
        }),
    ).isRequired,
    placeholder: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    noError: PropTypes.bool,
    label: PropTypes.string,
};

export default InputSelect;

const LabelChosen = ({ label, onDelete }) => (
    <span className="relative">
        <span className="flex items-center rounded bg-primary-lightest px-1 text-primary-darker">
            {label}
            <button
                type="button"
                className="ml-1 text-primary-darker hover:text-primary-dark"
                onClick={() => onDelete(label)}
            >
                X
            </button>
        </span>
    </span>
);

LabelChosen.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};
