import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import DropDown from './DropDown';

/**
 * NavDropDown component: dropdown menu for the navigation.
 *
 * @param {node} children: what to display in the button
 * @param {Array} items : list of Component to display in the dropdown (pass "to" for a link, or "onClick" for a button)
 * @example <NavDropDown items={[{name: 'item 1', icon:UserIcon,  to: '/item1'}, {name: 'item 2', icon:BellIcon,  onClick: () => handleClick()}]}>click me</NavDropDown>
 *
 * @author Peter Mollet
 */
const NavDropDown = ({ children, items }) => {
    const dropDownItems = items.map(({ name, icon: Icon, to, onClick }, index) => {
        const className = (isActive) => {
            return `group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-primary hover:text-white
            ${isActive ? 'bg-primary text-white' : 'text-gray-800 dark:text-gray-400'}`;
        };
        const content = (
            <>
                <Icon className="mr-2 h-5 w-5" aria-hidden="true" />
                {name}
            </>
        );
        return to ? (
            <NavLink
                key={index}
                to={to}
                className={({ isActive }) => className(isActive)}
            >
                {content}
            </NavLink>
        ) : (
            <button key={index} onClick={onClick} className={`${className(false)}`}>
                {content}
            </button>
        );
    });

    return <DropDown items={dropDownItems}>{children}</DropDown>;
};

export default NavDropDown;

NavDropDown.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.object.isRequired,
            to: PropTypes.string,
            onClick: PropTypes.func,
        }),
    ).isRequired,
};
