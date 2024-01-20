import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

import { URL_BACK_CHANGE_PASSWORD } from '../constants/url/urlBack';
import apiBackEnd from '../services/api.backend';
import { logout } from '../store/accountSlice';
const getUsersStart = () => ({ type: 'GET_USERS_START' });
const getUsersSuccess = (users) => ({ type: 'GET_USERS_SUCCESS', payload: users });
const getUsersFailure = (error) => ({ type: 'GET_USERS_FAILURE', payload: error });

export const createUser = (user) => {
    return async (dispatch) => {
        try {
            const createResponse = await apiBackEnd.post('/keycloak/users/', user);
            console.log(createResponse.data);
            console.log(createResponse.status == 200);
            if (createResponse.status === 201) {
                dispatch(fetchUsers());

                toast.success(
                    'Utilisateur ' + createResponse.data.username + ' crée avec success',
                    {
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
                    },
                );
            } else {
                toast.warning('User   ' + user.username + ' existe ', {
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
            }
        } catch (error) {
            toast.warning('error', {
                position: toast.POSITION.BOTTOM_CENTER, // Set the position to top center
                style: { top: '10%', transform: 'translateY(-10%)' },
            });
        }
    };
};
export const fetchUsers = () => {
    return async (dispatch) => {
        dispatch(getUsersStart());

        try {
            const response = await apiBackEnd.get('/keycloak/users/');
            dispatch(getUsersSuccess(response.data));
        } catch (error) {
            dispatch(getUsersFailure(error.message));
        }
    };
};
export const DesActiveUser = (username) => {
    return async (dispatch) => {
        try {
            const response = await apiBackEnd.get(`/keycloak/users/${username}`);
            dispatch(getUsersSuccess(response.data));
        } catch (error) {
            dispatch(getUsersFailure(error.message));
        }
    };
};
export const changePasswordAct = (values) => {
    return async (dispatch) => {
        try {
            console.log(values);
            const response = await apiBackEnd.post(URL_BACK_CHANGE_PASSWORD, values);
            if (response.status === 200) {
                toast.success(response.data, {
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
                setTimeout(() => {
                    dispatch(logout());
                }, 5000);
            } else {
                toast.success(response.data, {
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
            }
        } catch (error) {
            toast.error('An error occurred', {
                position: toast.POSITION.BOTTOM_CENTER,
                style: { top: '100%', transform: 'translateY(-50%)' },
            });
        }
    };
};
export const deleteUser = (id) => {
    return async (dispatch) => {
        try {
            const response = await apiBackEnd.delete(`/keycloak/users/${id}`);
            if (response.status === 200) {
                dispatch(fetchUsers());

                toast.success(response.data, {
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
            }
        } catch (error) {
            dispatch(getUsersFailure(error.message));
        }
    };
};
