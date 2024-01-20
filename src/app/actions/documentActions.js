import FileSaver from 'file-saver';
import { toast } from 'react-toastify';

import apiBackend from '../services/api.backend';
const getDocumentsStart = () => ({ type: 'GET_DOCUMENTS_START' });
const getDocumentsSuccess = (documents) => ({
    type: 'GET_DOCUMENTS_SUCCESS',
    payload: documents,
});
const getDocumentsFailure = (error) => ({
    type: 'GET_DOCUMENTS_FAILURE',
    payload: error,
});

export const deleteDocument = (id) => {
    return async () => {
        try {
            const response = await apiBackend.delete(`/file/${id}`);
            if (response.status === 200) {
                toast.success('Document deleted successfully', {
                    position: toast.POSITION.TOP_CENTER,
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
            toast.warning('Document does not exist', {
                position: toast.POSITION.BOTTOM_CENTER,
                style: { top: '10%', transform: 'translateY(-10%)' },
            });
        }
    };
};

export const fetchDocuments = () => {
    return async (dispatch) => {
        dispatch(getDocumentsStart());

        try {
            const response = await apiBackend.get('/file/all');
            dispatch(getDocumentsSuccess(response.data));
        } catch (error) {
            dispatch(getDocumentsFailure(error.message));
        }
    };
};
export const uploadDocument = (formData) => {
    return async (dispatch) => {
        try {
            const response = await apiBackend.post('/file/', formData);
            console.log(response.data);
            if (response.status == 201) dispatch(fetchDocuments());
            toast.success('successful loading ', {
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
        } catch (error) {
            toast.warning('error', {
                position: toast.POSITION.TOP_CENTER, // Set the position to top center
                style: { top: '10%', transform: 'translateY(-10%)' },
            });
        }
    };
};

export const downloadDocument = (id, name, type) => {
    return async () => {
        try {
            const response = await apiBackend.get(`/file/${id}`, {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], { type: type });
            FileSaver.saveAs(blob, name);
            toast.success('Download successful', {
                _position: toast.POSITION.TOP_CENTER,
                get position() {
                    return this._position;
                },
                set position(value) {
                    this._position = value;
                },
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
        } catch (error) {
            toast.error('Download failed', {
                position: toast.POSITION.TOP_CENTER,
                style: { top: '10%', transform: 'translateY(-10%)' },
            });
        }
    };
};
