import { Switch } from '@headlessui/react';
import { PropTypes } from 'prop-types';

/**
 * Component to render a toggle switch
 *
 * @param {boolean} enabled: Whether the toggle is enabled or not
 * @param {function} setEnabled: Function to set the toggle state
 * @param {string} size: Size of the toggle. sm, md (default), lg
 *
 * @author Peter Mollet
 */
export const Toggle = ({ enabled, setEnabled, size }) => {
    let height = 'h-6';
    let width = 'w-[43px]';
    let bubbleSize = 'h-5 w-5';
    let translation = 'translate-x-5';

    if (size === 'sm') {
        height = 'h-4';
        width = 'w-[31px]';
        bubbleSize = 'h-3 w-3';
        translation = 'translate-x-4';
    } else if (size === 'lg') {
        height = 'h-8';
        width = 'w-[55px]';
        bubbleSize = 'h-7 w-7';
        translation = 'translate-x-6';
    }

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-primary' : 'border-gray-200 bg-gray-300'}
            relative inline-flex items-center
            ${height} ${width} 
            shrink-0 cursor-pointer rounded-full border-2
            transition-colors duration-200 ease-in-out 
            focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span
                aria-hidden="true"
                className={`${enabled ? translation : 'translate-x-0'}
                pointer-events-none inline-block 
                ${bubbleSize}
                transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    );
};

Toggle.defaultProps = {
    size: 'md',
};

Toggle.propTypes = {
    enabled: PropTypes.bool.isRequired,
    setEnabled: PropTypes.func.isRequired,
    size: PropTypes.string,
};

/**
 * Component to render an input toggle switch to work with Formik
 *
 * @param {object} field: The field object from Formik
 * @param {object} form: The form object from Formik
 * @param {string} label: The label of the toggle
 *
 * @author Peter Mollet
 */
export const InputToggle = ({ field, form, label }) => {
    const enabled = field.value;

    return (
        <Switch.Group as="div" className="flex items-center space-x-4">
            {label && (
                <Switch.Label className="text-sm font-medium text-gray-700">
                    {label}
                </Switch.Label>
            )}
            <Toggle
                enabled={enabled}
                setEnabled={() => form.setFieldValue(field.name, !enabled)}
            />
        </Switch.Group>
    );
};
