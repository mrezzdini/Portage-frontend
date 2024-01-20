import apiBackend from '../services/api.backend';

const getPayslipsSuccess = (payslips) => ({
    type: 'GET_PAYSLIPS_SUCCESS',
    payload: payslips,
});
const getPayslipsFailure = (error) => ({
    type: 'GET_PAYSLIPS_FAILURE',
    payload: error,
});

export const getPayslipsAction = () => {
    return async (dispatch) => {
        try {
            const response = await apiBackend.get('/payslips/');
            console.log(response.data);
            dispatch(getPayslipsSuccess(response.data));
        } catch (error) {
            dispatch(getPayslipsFailure(error.message));
        }
    };
};
