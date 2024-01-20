import { toast } from 'react-toastify';

import apiBackend from '../services/api.backend';

const getEducationsSuccess = (educations) => ({
    type: 'GET_EDUCATIONS_SUCCESS',
    payload: educations,
});
const getEducationsFailure = (error) => ({
    type: 'GET_EDUCATIONS_FAILURE',
    payload: error,
});

export const getEducationsAction = (idConsultant) => {
    return async (dispatch) => {
        try {
            const response = await apiBackend.get(
                `/consultants/educations/consultant/${idConsultant}`,
            );
            console.log(response.data);
            dispatch(getEducationsSuccess(response.data));
        } catch (error) {
            dispatch(getEducationsFailure(error.message));
        }
    };
};
export const createEducation = (education) => {
    return async (dispatch) => {
        try {
            const createResponse = await apiBackend.post(
                '/consultants/educations',
                education,
            );

            dispatch(getEducationsAction(education.consultantId));
        } catch (error) {
            toast.warning('Errrreur', {
                position: toast.POSITION.TOP_CENTER, // Set the position to top center
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
    };
};
export const deleteEducation = (id) => {
    return async (dispatch) => {
        try {
            const response = apiBackend.delete(`/consultants/educations/${id.id}`);
            if ((await response).status == 200) {
                dispatch(getEducationsAction(id.consultantId));
                toast.success('Education supprimé avec  succès', {
                    position: toast.POSITION.TOP_CENTER, // Set the position to top center
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
            toast.warning('un erreur est survenu', {
                position: toast.POSITION.TOP_CENTER, // Set the position to top center
                style: { top: '10%', transform: 'translateY(-10%)' },
            });
        }
    };
};
export const UpdateEducation = (education) => {
    return async (dispatch) => {
        try {
            const response = apiBackend.put(
                `/consultants/educations/${education.id}`,
                education,
            );
            if ((await response).status == 200) {
                dispatch(getEducationsAction(education.consultantId));
                toast.success('Education modifieé avec  succès', {
                    position: toast.POSITION.TOP_CENTER, // Set the position to top center
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
            toast.warning('un erreur est survenu', {
                position: toast.POSITION.TOP_CENTER, // Set the position to top center
                style: { top: '10%', transform: 'translateY(-10%)' },
            });
        }
    };
};
