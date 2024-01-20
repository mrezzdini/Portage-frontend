import apiBackend from '../services/api.backend';

const getOffersSuccess = (offers) => ({
    type: 'GET_OFFERS_SUCCESS',
    payload: offers,
});
const getOffersFailure = (error) => ({
    type: 'GET_OFFERS_FAILURE',
    payload: error,
});

export const getOffersAction = () => {
    return async (dispatch) => {
        try {
            const response = await apiBackend.get('/offers/');
            console.log(response.data);
            dispatch(getOffersSuccess(response.data));
        } catch (error) {
            dispatch(getOffersFailure(error.message));
        }
    };
};

