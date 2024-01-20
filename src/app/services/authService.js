import { toast } from 'react-toastify';

import { URL_BACK_AUTHENTICATE, URL_BACK_LOGOUT } from '../constants/url/urlBack';
import apiBackEnd from './api.backend';

/**
 * Service to handle the authentication
 *
 * @author Peter Mollet
 */

/**
 * Login the user
 * @param {object} values: the values of the form to login
 * @returns {Promise<*>}: the response of the backend
 */
const authenticate = async (values) => {
    const response = await apiBackEnd.post(URL_BACK_AUTHENTICATE, values);
    return response.data;
};

/**
 * Logout the user: remove datas from the local storage
 */
const logout = async () => {
    const storage = localStorage.getItem('persist:auth');
    let tokenRefrech;
    if (storage) tokenRefrech = JSON.parse(JSON.parse(storage).refresh_token);
    if (tokenRefrech) {
        const response = await apiBackEnd.post(URL_BACK_LOGOUT, tokenRefrech);
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
        localStorage.clear();
        sessionStorage.clear();
    } else {
        console.error('Refrech token not found in localStorage');
    }
};

/**
 * Register the user
 *
 * @param {object} values: the values of the form to register
 * @returns {Promise<*>}: the response of the backend
 */
const register = async (values) => {
    const response = await apiBackEnd.post(URL_BACK_LOGOUT, values);
    return response;
};

export default {
    authenticate,
    logout,
    register,
};
