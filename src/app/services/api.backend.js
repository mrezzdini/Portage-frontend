import axios from 'axios';

import handleHttpError from './../components/lib/utils/HandleHttpError';
import tokenService from './tokenService';

/**
 * Instance axios to the BACKEND
 *
 * @author Peter Mollet
 */
const apiBackEnd = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default apiBackEnd;

/**
 * Interceptor of request to automatically put the JWTToken in the header
 *
 * @author Peter Mollet
 */
apiBackEnd.interceptors.request.use((request) => {
    const storage = localStorage.getItem('persist:auth');
    let token;
    if (storage) token = JSON.parse(JSON.parse(storage).token);
    if (tokenService.isTokenValid(token))
        if (token) request.headers['Authorization'] = `Bearer ${token}`;
    return request;
});

/**
 * Interceptor of response, to see status code in the console and to handle the error
 *
 * @author Peter Mollet
 */
apiBackEnd.interceptors.response.use(
    (response) => {;
        return response;
    },
    (error) => {
        handleHttpError(error);
        return error;
    },
);
