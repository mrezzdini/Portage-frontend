// roleActions.js

import apiBackEnd from '../services/api.backend';

// Action creator to get all roles
export const getAllRoles = (roles) => {
    return {
        type: 'GET_ALL_ROLES',
        payload: roles,
    };
};
// roleActions.js

// Redux-thunk action creator
export const fetchRoles = () => {
    return async (dispatch) => {
        try {
            // Make an API request to fetch all roles
            const response = await apiBackEnd.get('/keycloak/roles/');
            const roles = await response.data;
            console.log(roles);

            // Dispatch the action to store the roles in the Redux store
            dispatch(getAllRoles(roles));
        } catch (error) {
            // Handle error if any
        }
    };
};
