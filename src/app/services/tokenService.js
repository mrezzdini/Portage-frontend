import jwt_decode from 'jwt-decode';

/**
 * Function to get the payload/claims of the token
 *
 * @param {string} token
 * @returns {object}: the payload of the token
 * @author Peter Mollet
 */
const getPayloadToken = (token) => {
    return jwt_decode(token);
};

/**
 * Function to know if the token is still valid.
 * Checks:
 * - if the token is not expired
 * - if the token is not null / undefined
 * - if the user has the at least one role
 * - if the sub exist
 *
 * @param {*} token
 * @returns
 * @author Peter Mollet
 */
const isTokenValid = (token) => {
    try {
        const payload = getPayloadToken(token);
        const roles = payload.realm_access.roles;
        const expirationDate = payload.exp;
        const login = payload.preferred_username;
        const dateNow = new Date();
        return token && roles.length > 0 && login && expirationDate < dateNow.getTime();
    } catch {
        return false;
    }
};

/**
 * Function to get the sub from the token
 *
 * @param {string} token : the token
 * @returns the sub of the token (the username)
 */
const getTokenSubject = (token) => {
    try {
        const payload = getPayloadToken(token);
        return payload.preferred_username;
    } catch {
        return null;
    }
};
const getMail = (token) => {
    try {
        const payload = getPayloadToken(token);
        return payload.email;
    } catch {
        return null;
    }
};
const getUserId = (token) => {
    try {
        const payload = getPayloadToken(token);
        return payload.sub;
    } catch {
        return null;
    }
};
const getRoles = (token) => {
    try {
        const payload = getPayloadToken(token);
        return payload.realm_access.roles;
    } catch {
        return null;
    }
};
export default {
    getPayloadToken,
    isTokenValid,
    getRoles,
    getTokenSubject,
    getUserId,
    getMail,
};
