import { TrashIcon } from '@heroicons/react/24/outline';
import { createContext, useCallback, useContext, useRef, useState } from 'react';

import Modal from '../components/lib/container/Modal';

const ConfirmDialog = createContext();

/**
 * ConfirmDialogProvider component: provider for the confirm dialog,
 * to put in the root of the application so the useConfirm can be used everywhere
 *
 * @param {node} children: children of the component
 * 
 * @example
 *  <ConfirmDialogProvider>
        <BrowserRouter>
            <div className="cursor-default overflow-hidden bg-gray-50">
                <Routes />
            </div>
        </BrowserRouter>
    </ConfirmDialogProvider>
 * @author Peter Mollet
 */
export function ConfirmDialogProvider({ children }) {
    const [state, setState] = useState({ isOpen: false });
    const fn = useRef();

    const confirm = useCallback(
        (data) => {
            return new Promise((resolve) => {
                setState({ ...data, isOpen: true });
                fn.current = (choice) => {
                    resolve(choice);
                    setState({ isOpen: false });
                };
            });
        },
        [state],
    );

    return (
        <ConfirmDialog.Provider value={confirm}>
            {children}
            <Modal
                isOpen={state.isOpen}
                close={() => fn.current(false)}
                title={state.title}
            >
                <br></br>

                <div className="rounded-md bg-transparent">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <TrashIcon
                            style={{ color: 'black', width: '50px', height: '30px' }}
                        />

                        <p>{state.description}</p>
                    </div>
                    <br></br>
                    <div className="mt-4 flex justify-between bg-transparent">
                        <span>
                            <button
                                type="button"
                                onClick={() => fn.current(true)}
                                style={{
                                    marginLeft: '120px',
                                    width: '120px',
                                    backgroundColor: '#D8D83D',
                                    height: '40px',
                                    borderRadius: '15px',
                                }}
                            >
                                Valider
                            </button>
                        </span>
                        <span>
                            <button
                                type="button"
                                style={{
                                    width: '120px',
                                    height: '40px',
                                    backgroundColor: '#FAFAFA',
                                    borderRadius: '15px',
                                    marginRight: '120px',

                                    border: '2px solid #FF7676',
                                    boxShadow:
                                        '1px 1px 8px rgba(0, 0, 0, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.08)',
                                }}
                                onClick={() => fn.current(false)}
                            >
                                Annuler
                            </button>
                        </span>
                    </div>
                </div>
            </Modal>
        </ConfirmDialog.Provider>
    );
}

/**
 * useConfirm hook: hook to use the confirm dialog
 *
 * @example
 * const confirm = useConfirm();
 * confirm({
 *     title: 'Delete all ?',
 *    description: 'Are you sure you want to delete everything?',
 * });
 *
 * @author Peter Mollet
 */
export default function useConfirm() {
    return useContext(ConfirmDialog);
}
