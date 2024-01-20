import apiBackend from '../services/api.backend';

const postMailSuccess = (mail) => ({
    type: 'POST_MAIL_SUCCESS',
    payload: mail,
});
const postMailFailure = (error) => ({
    type: 'POST_MAIL_FAILURE',
    payload: error,
});

export const sendMailAction = (data) => {
    console.log(data);
    return async (dispatch) => {
        try {
            const response = await apiBackend.post('/mail/sendMail', data);
            dispatch(postMailSuccess(response.data));
        } catch (error) {
            dispatch(postMailFailure(error.message));
        }
    };
};
