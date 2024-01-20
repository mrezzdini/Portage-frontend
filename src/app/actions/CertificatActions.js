import { toast } from 'react-toastify';

import apiBackend from '../services/api.backend';

const getCertificatsSuccess = (certificats) => ({
    type: 'GET_CERTIFICATS_SUCCESS',
    payload: certificats,
});
const getCertificatsFailure = (error) => ({
    type: 'GET_CERTIFICATS_FAILURE',
    payload: error,
});

export const getCertificatsAction = (idConsultant) => {
    return async (dispatch) => {
        try {
            const response = await apiBackend.get(
                `/consultants/certifications/consultant/${idConsultant}`,
            );
            console.log(response.data);
            dispatch(getCertificatsSuccess(response.data));
        } catch (error) {
            dispatch(getCertificatsFailure(error.message));
        }
    };
};
export const createCertificat = (certificat) => {
    return async (dispatch) => {
        try {
            const createResponse = await apiBackend.post(
                '/consultants/certifications',
                certificat,
            );

            dispatch(getCertificatsAction(certificat.consultantId));
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
export const deleteCertificat = (id) => {
    return async (dispatch) => {
        try {
            const response = apiBackend.delete(`/consultants/certifications/${id.id}`);
            if ((await response).status == 200) {
                dispatch(getCertificatsAction(id.consultantId));
                toast.success('Certificat supprimé avec  succès', {
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
export const UpdateCertificat = (certificat) => {
    return async (dispatch) => {
        try {
            const response = apiBackend.put(
                `/consultants/certifications/${certificat.id}`,
                certificat,
            );
            if ((await response).status == 200) {
                dispatch(getCertificatsAction(certificat.consultantId));
                toast.success('Certificat modifieé avec  succès', {
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
