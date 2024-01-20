import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { changePasswordAct } from '../../actions/userActions';
import Input from '../lib/form/Input';

const ChangePasswordPage = () => {
    const dispatch = useDispatch();

    const storage = localStorage.getItem('persist:auth');
    let username;
    if (storage) username = JSON.parse(JSON.parse(storage).username);
    let userId;
    if (storage) userId = JSON.parse(JSON.parse(storage).userId);
    const initialValues = {
        userId: userId || '',
        username: username || '',
        oldPassword: '',
        newPassword: '',
    };

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Ancien mot de passe requis'),
        newPassword: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                'Le nouveau mot de passe doit contenir au moins 6 caractères, une lettre majuscule, une lettre minuscule et un chiffre',
            )
            .min(6, 'Le nouveau mot de passe doit contenir au moins 6 caractères')
            .required('Nouveau mot de passe requis'),
        confirmPassword: Yup.string()
            .oneOf(
                [Yup.ref('newPassword'), null],
                'Les mots de passe ne correspondent pas',
            )
            .required('Confirmation du nouveau mot de passe requis'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await dispatch(changePasswordAct(values));
            setSubmitting(false);
        } catch (error) {
            console.error(error);
            // Handle error if needed
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-50 container">
            <div className="card">
                <div className="card-body" style={{ width: '500px' }}>
                    <h2 className="card-title" style={{ textAlign: 'center' }}>
                        Modifier mot de passe
                    </h2>
                    <br />
                    <br />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="oldPassword" className="form-label">
                                        Ancien mot de passe :
                                    </label>
                                    <Field
                                        type="password"
                                        id="oldPassword"
                                        name="oldPassword"
                                        component={Input}
                                        placeholder="Ancien mot de passe"
                                    />
                                    <ErrorMessage
                                        name="oldPassword"
                                        component="div"
                                        className="error-message"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label">
                                        Nouveau mot de passe :
                                    </label>
                                    <Field
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        component={Input}
                                        placeholder="Nouveau mot de passe"
                                    />
                                    <ErrorMessage
                                        name="newPassword"
                                        component="div"
                                        className="error-message"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label"
                                    >
                                        Confirmation du nouveau mot de passe :
                                    </label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        component={Input}
                                        placeholder="Confirmation du nouveau mot de passe"
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="div"
                                        className="error-message"
                                    />
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        Modifier
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
