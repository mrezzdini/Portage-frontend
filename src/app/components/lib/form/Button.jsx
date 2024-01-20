import { PropTypes } from 'prop-types';
import React from 'react';

/**
 * Button component: generic button component
 *
 * @param {node} children: children of the component
 * @param {string} className: class of the component
 * @param {string} type: type of the button (default is 'submit')
 * @param {string} color: color of the button (default is 'default')
 *
 * @author Peter Mollet
 */
const Button = ({ children, color, type, className, ...rest }) => {
    return (
        <button
            type={type}
            className={`btn btn-${color} btn-sm ${className}`} // Added 'btn-sm' class for smaller size
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;

Button.defaultProps = {
    color: 'default',
    type: 'submit',
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
    type: PropTypes.string,
};
