import { CheckBox } from '@mui/icons-material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import backgroundimage from '../../assets/images/exempleofback.png';
import logo from '../../assets/images/logo.png';
import { authenticate } from '../../store/accountSlice';
import { defaulValuesLogin } from './../../constants/form/account';
import { schemaFormLogin } from './../../constants/yup/account';
import Input from './../lib/form/Input';
import Spinner from './../lib/utils/Spinner';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (values, { setSubmitting }) => {
        dispatch(authenticate(values))
            .then((res) => {
                if (res.payload.access_token) {
                    navigate('/app');
                }
            })
            .catch(() => {
                setSubmitting(false);
                toast.warning(`L'identifiant ou le mot de passe est incorrect`, {
                    position: toast.POSITION.TOP_CENTER,
                    style: {
                        top: '100px',
                        transform: 'translateY(-50%)',
                        width: '400px',
                        height: '130px',
                        borderRadius: '15px',
                        alignContent: 'center',
                        textAlign: 'center',
                    },
                });
            });
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '90vw',
                height: '90vh',
            }}
        >
            <img
                src={backgroundimage}
                alt=""
                style={{
                    position: 'absolute',
                    opacity: '0.5',
                    filter: 'grayscale(100%)',
                    width: '600vw',
                    height: '200vh',
                }}
            />

            <img
                src={logo}
                alt=""
                style={{
                    position: 'absolute',
                    width: '150px',
                    height: '150px',
                    left: 'calc(50% - 100px)',
                    top: '50px',
                }}
            />
            <div
                style={{
                    top: '70px',
                    backgroundClip: 'content-box',
                    position: 'relative',
                    width: '750px',
                    height: '400px',
                    background: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: '1px 1px 6px rgba(126, 126, 126, 0.15)',
                    borderRadius: '10px',
                }}
            >
                <h1
                    style={{
                        position: 'absolute',
                        width: '318px',
                        height: '43px',
                        left: 'calc(50% - 119px)',
                        top: '10px',
                        fontFamily: 'Corbel',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '36px',
                        lineHeight: '43px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        letterSpacing: '0.04em',
                        color: '#2E3249',
                    }}
                >
                    Se connecter
                </h1>

                <Formik
                    initialValues={defaulValuesLogin}
                    onSubmit={handleLogin}
                    validationSchema={schemaFormLogin}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div>
                                <Field
                                    style={{
                                        width: '300px',
                                        height: '45px',
                                        left: '200px',
                                        top: '80px',
                                        background: '#FFFFFF',
                                        boxShadow:
                                            '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                        borderRadius: '10px',
                                    }}
                                    type="text"
                                    name="username"
                                    placeholder="Login"
                                    autoComplete="username"
                                    component={Input}
                                    noError
                                />
                                <Field
                                    style={{
                                        width: '300px',
                                        height: '45px',
                                        left: '200px',
                                        top: '90px',
                                        background: '#FFFFFF',
                                        boxShadow:
                                            '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                        borderRadius: '10px',
                                    }}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    component={Input}
                                    className="rounded-none rounded-b-md"
                                    noError
                                />
                            </div>

                            <div>
                                <Field
                                    style={{
                                        position: 'absolute',
                                        width: '20px',
                                        height: '20px',
                                        left: '100px',
                                        top: '300px',
                                        border: '2px solid #2E3249',
                                    }}
                                    name="rememberMe"
                                    label="Remember me"
                                    component={CheckBox}
                                    value={false}
                                />
                                <p
                                    style={{
                                        position: 'absolute',
                                        width: '200px',
                                        height: '20px',
                                        left: '130px',
                                        top: '300px',
                                        color: '#2E3249',
                                    }}
                                >
                                    Se souvenir de moi
                                </p>
                                <div>
                                    <Link to="/forgot-password">
                                        <p
                                            style={{
                                                position: 'absolute',
                                                width: '300px',
                                                height: '20px',
                                                left: '500px',
                                                top: '300px',
                                                color: '#322FD1',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Mot de passe oublié?
                                        </p>
                                    </Link>
                                </div>
                            </div>

                            <div>
                                {isSubmitting ? (
                                    <Spinner />
                                ) : (
                                    <button
                                        type="submit"
                                        style={{
                                            boxSizing: 'border-box',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '15px 40px',
                                            position: 'absolute',
                                            width: '200px',
                                            height: '40px',
                                            left: 'calc(50% - 100px/2 - 70px)',
                                            top: '220px',
                                            background:
                                                'linear-gradient(178.36deg, #D8D83D 0%, #BDBD02 98.61%)',
                                            border: '2px solid #EEEEEE',
                                            boxShadow:
                                                '1px 1px 8px rgba(0, 0, 0, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.08)',
                                            borderRadius: '15px',
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        Connecter
                                    </button>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginForm;
