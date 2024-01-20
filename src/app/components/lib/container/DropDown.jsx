import { Menu, Transition } from '@headlessui/react';
import { PropTypes } from 'prop-types';
import { Fragment } from 'react';

/**
 * DropDown component: dropdown menu with a list of items.
 *
 * @param {node} children: what to display in the button
 * @param {Array} items : list of Component to display in the dropdown
 * @example <DropDown items={[<div>item 1</div>, <div>item 2</div>]}>click me</DropDown>
 * @author Peter Mollet
 */
const DropDown = ({ children, items }) => {
    return (
        <Menu as="div" className="relative">
            <Menu.Button
                className="flex items-center justify-center text-gray-500 focus:outline-none hover:text-gray-600
                    dark:text-gray-400 hover:dark:text-gray-600"
            >
                {children}
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md
                    bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-750"
                >
                    <div className="space-y-1 px-1 py-1">
                        {items.map((item, index) => {
                            return <Menu.Item key={index}>{item}</Menu.Item>;
                        })}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default DropDown;

DropDown.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    items: PropTypes.arrayOf(PropTypes.node).isRequired,
};
