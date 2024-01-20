import React, { useState } from 'react';

const ForgotPasswordPage = () => {
    const [username, setUsername] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Effectuez ici la logique pour envoyer la demande de réinitialisation du mot de passe
        // Utilisez la valeur du nom d'utilisateur dans la variable "username"
        // Par exemple, vous pouvez appeler une fonction pour envoyer la demande au serveur

        // Réinitialiser la valeur du nom d'utilisateur
        setUsername('');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card">
                <div className="card-body" style={{ width: '700px' }}>
                    <h2 className="card-title" style={{ textAlign: 'center' }}>
                        Réinitialiser le mot de passe
                    </h2>
                    <br />
                    <br />
                    <br />
                    <br />

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Nom utilisateur :
                            </label>
                            <input
                                style={{ width: '400px' }}
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                            />
                        </div>
                        <button
                            type="reset"
                            className="btn btn-warning"
                            style={{ alignItems: 'center' }}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ alignItems: 'center' }}
                        >
                            Réinitialiser
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
