import { Dialog, Transition } from '@headlessui/react';
import { PropTypes } from 'prop-types';
import { Fragment } from 'react';

/**
 * Modal component: generic modal component working with a boolean
 *
 * @param {boolean} isOpen: boolean to open/close the modal
 * @param {function} close: function to close the modal
 * @param {node} children: children components to display in the modal
 * @param {string} title: title of the modal
 *
 * @author Peter Mollet
 */
const ModalF = ({ isOpen, close, children, title }) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={close}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    style={{
                                        position: 'absolute',
                                        top: '75px',
                                        width: '900px',
                                    }}
                                    className="w-full  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800 "
                                >
                                    {title && (
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300"
                                        >
                                            <br />
                                            <h3
                                                style={{
                                                    textAlign: 'center',
                                                    color: '#D8D83D',
                                                }}
                                            >
                                                {title}
                                            </h3>
                                        </Dialog.Title>
                                    )}
                                    {children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ModalF;

ModalF.defaultProps = {
    isOpen: false,
    close: () => {},
    children: null,
    title: null,
};

ModalF.propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func,
    children: PropTypes.node,
    title: PropTypes.string,
};
