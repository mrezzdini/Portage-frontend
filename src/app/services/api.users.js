import { getUsersFailure, getUsersStart, getUsersSuccess } from '../store/userReducer';
import apiBackEnd from './api.backend';
const apiUsers = apiBackEnd
    .get('/keycloak/users/')
    .then((response) => {
        response.data;
        // Handle the successful response
    })
    .catch((error) => {
        // Handle the error
        console.error(error);
    });

export default apiUsers;

export const fetchUsers = () => async (dispatch) => {
    try {
        dispatch(getUsersStart());
        const response = await apiUsers(); // Replace with your API call
        dispatch(getUsersSuccess(response.data));
        console.log(response.data);
    } catch (error) {
        dispatch(getUsersFailure(error.message));
    }
};
