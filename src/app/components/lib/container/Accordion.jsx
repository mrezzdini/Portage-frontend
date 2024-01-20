import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { PropTypes } from 'prop-types';
/**
 * Accordion component: generic Accordion component
 *
 * @param {Array} data: array of objects with title and content
 * @param {string} btnClassName: class name for the button
 *
 * @autor Peter Mollet
 */
const Accordion = ({ data, column, rows, btnClassName }) => {
    console.log(data);
    console.log(column);
    console.log(rows);

    return (
        <div className="w-full space-y-2 rounded-2xl bg-white p-2 shadow dark:bg-gray-700">
            {data.map((item, index) => (
                <Disclosure key={index}>
                    {({ open }) => (
                        <>
                            <Disclosure.Button
                                className={`group flex w-full justify-between rounded-lg 
                                bg-primary-lightest px-4 py-2 
                                text-left text-sm font-medium text-primary-dark 
                                focus:outline-none focus-visible:ring focus-visible:ring-primary 
                                focus-visible:ring-opacity-75 
                                hover:bg-primary-lighter hover:text-primary-dark ${btnClassName}`}
                            >
                                <span>{item.title}</span>
                                <ChevronUpIcon
                                    className={`h-5 w-5 text-primary group-hover:text-primary-dark
                                    ${open ? 'rotate-180 transform' : ''} `}
                                />
                            </Disclosure.Button>
                            <Transition
                                show={open}
                                enter="transition duration-100 ease-in-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel
                                    static
                                    className="px-4 py-2 text-gray-800 dark:text-gray-300"
                                ></Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
            ))}
        </div>
    );
};

export default Accordion;

Accordion.defaultProps = {
    btnClassName: '',
};

Accordion.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            content: PropTypes.node.isRequired,
        }),
    ).isRequired,
    btnClassName: PropTypes.string,
};
