import { toast } from 'react-toastify';

import apiBackend from '../services/api.backend';

const getCvsSuccess = (cvs) => ({
    type: 'GET_CVS_SUCCESS',
    payload: cvs,
});
const getCvsFailure = (error) => ({
    type: 'GET_CVS_FAILURE',
    payload: error,
});

export const getCvsAction = (idConsultant) => {
    return async (dispatch) => {
        try {
            const response = await apiBackend.get(
                `/consultants/cv/consultant/${idConsultant}`,
            );
            dispatch(getCvsSuccess(response.data));
        } catch (error) {
            dispatch(getCvsFailure(error.message));
        }
    };
};
export const createCv = (cv) => {
    return async (dispatch) => {
        try {
            const createResponse = await apiBackend.post('/consultants/cv', cv);

            dispatch(getCvsAction(cv.consultantId));
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
export const deleteCv = (id) => {
    return async (dispatch) => {
        try {
            const response = apiBackend.delete(`/consultants/cv/${id.id}`);
            console.log(id.id)
            if ((await response).status == 200) {
                dispatch(getCvsAction(id.consultantId));
                toast.success('Cv supprimé avec  succès', {
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
export const UpdateCv = (cv) => {
    return async (dispatch) => {
        try {
            const response = apiBackend.put(`/consultants/cvs/${cv.id}`, cv);
            if ((await response).status == 200) {
                dispatch(getCvsAction(cv.consultantId));
                toast.success('Cv modifieé avec  succès', {
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
