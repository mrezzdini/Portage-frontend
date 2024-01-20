import { toast } from 'react-toastify';

import apiBackend from '../services/api.backend';

const getExperiencesSuccess = (experiences) => ({
    type: 'GET_EXPERIENCES_SUCCESS',
    payload: experiences,
});
const getExperiencesFailure = (error) => ({
    type: 'GET_EXPERIENCES_FAILURE',
    payload: error,
});

export const getExperiencesAction = (idConsultant) => {
    return async (dispatch) => {
        try {
            const response = await apiBackend.get(
                `/consultants/work-experiences/consultant/${idConsultant}`,
            );
            dispatch(getExperiencesSuccess(response.data));
        } catch (error) {
            dispatch(getExperiencesFailure(error.message));
        }
    };
};
export const createExperience = (experience) => {
    return async (dispatch) => {
        try {
            const createResponse = await apiBackend.post(
                '/consultants/work-experiences',
                experience,
            );

            dispatch(getExperiencesAction(experience.consultantId));
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
export const deleteExperience = (id) => {
    return async (dispatch) => {
        try {
            const response = apiBackend.delete(`/consultants/work-experiences/${id.id}`);
            if ((await response).status == 200) {
                dispatch(getExperiencesAction(id.consultantId));
                toast.success('Experience supprimé avec  succès', {
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
export const UpdateExperience = (experience) => {
    return async (dispatch) => {
        try {
            const response = apiBackend.put(
                `/consultants/work-experiences/${experience.id}`,
                experience,
            );
            if ((await response).status == 200) {
                dispatch(getExperiencesAction(experience.consultantId));
                toast.success('Experience modifieé avec  succès', {
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
