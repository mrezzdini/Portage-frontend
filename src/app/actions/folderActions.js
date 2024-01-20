import { toast } from 'react-toastify';

import apiBackend from '../services/api.backend';

const getFoldersStart = () => ({ type: 'GET_FOLDERS_START' });
const getFoldersSuccess = (folders) => ({
    type: 'GET_FOLDERS_SUCCESS',
    payload: folders,
});
const getFoldersFailure = (error) => ({
    type: 'GET_FOLDERS_FAILURE',
    payload: error,
});

export const createFolder = (folder) => {
    return async (dispatch) => {
        try {
            const createResponse = await apiBackend.post('/folder/', folder);
            if (createResponse.status == 200) {
                dispatch(fetchFolders());
                toast.success(
                    'Dossier   ' + createResponse.data.name + ' créé avec succès',
                    {
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
                    },
                );
            } else {
                toast.success('Dossier   ' + createResponse.data.name + ' existe ', {
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
            toast.warning('Le dossier ' + folder.name + ' existe', {
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
export const deleteFolder = (id) => {
    return async (dispatch) => {
        try {
            const response = apiBackend.delete(`/folder/${id}`);
            if ((await response).status == 200) {
                dispatch(fetchFolders());
                toast.success('Dossier supprimé avec  succès', {
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
            toast.warning('Le dossier nexiste pas', {
                position: toast.POSITION.TOP_CENTER, // Set the position to top center
                style: { top: '10%', transform: 'translateY(-10%)' },
            });
        }
    };
};
export const fetchFolders = () => {
    return async (dispatch) => {
        dispatch(getFoldersStart());

        try {
            const response = await apiBackend.get('/folder/');
            dispatch(getFoldersSuccess(response.data));
        } catch (error) {
            dispatch(getFoldersFailure(error.message));
        }
    };
};
