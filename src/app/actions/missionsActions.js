import apiBackend from '../services/api.backend';

const getMissionsSuccess = (payslips) => ({
    type: 'GET_MISSIONS_SUCCESS',
    payload: payslips,
});
const getMissionsFailure = (error) => ({
    type: 'GET_PAYSLIPS_FAILURE',
    payload: error,
});

export const getMissionsAction = () => {
    return async (dispatch) => {
        try {
            const response = await apiBackend.get('/missions/');
            console.log(response.data);
            dispatch(getMissionsSuccess(response.data));
        } catch (error) {
            dispatch(getMissionsFailure(error.message));
        }
    };
};
