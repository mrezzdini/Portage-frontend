import React from 'react';

/**
 * Simple icon button, working with heroicons
 *
 * @param {function} onClick - onClick handler
 * @param {JSX.Element} icon - Icon to display
 * @param {string} iconClassName - Icon class name
 * @param {string} btnClassName - Button class name
 *
 */
const IconButton = ({ onClick, icon: Icon, iconClassName, btnClassName, ...rest }) => {
    return (
        <button type="button" className={btnClassName} onClick={onClick} {...rest}>
            <Icon className={`transition duration-300 ease-in-out ${iconClassName}`} />
        </button>
    );
};

export default IconButton;

IconButton.defaultProps = {
    iconClassName: 'h-5 w-5 text-primary',
    btnClassName: '',
    onClick: () => {},
    icon: () => {},
};
