import React from 'react';
import { useState } from 'react';

const ConfirmationModal = ({ message, onConfirm }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        onConfirm();
        closeModal();
    };

    return (
        <>
            <button onClick={openModal}>Supprimer</button>

            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmation</h2>
                        <p>{message}</p>
                        <div className="modal-buttons">
                            <button onClick={handleConfirm}>Confirmer</button>
                            <button onClick={closeModal}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConfirmationModal;
