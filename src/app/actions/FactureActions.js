import { toast } from 'react-toastify';

import apiBackend from '../services/api.backend';
const getFacturesStart = () => ({ type: 'GET_FACTURES_START' });
const getFacturesSuccess = (factures) => ({
    type: 'GET_FACTURES_SUCCESS',
    payload: factures,
});
const getFacturesFailure = (error) => ({ type: 'GET_FACTURES_FAILURE', payload: error });

export const createFacture = (invoice) => {
    return async (dispatch) => {
        try {
            const createResponse = await apiBackend.post('/invoices/', invoice);
            if (createResponse.status == 200) {
                dispatch(fetchFactures());

                toast.success(
                    'Facture  avec le nom  ' +
                        createResponse.data.invoiceName +
                        ' créé avec succès',
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
            toast.warning('error', {
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
export const setStatusOfInvoice = (invoice) => {
    return async (dispatch) => {
        try {
            console.log(invoice.status);

            const createResponse = await apiBackend.put(`/invoices/`, invoice);
            console.log(createResponse.status);
            if (createResponse.data != '') {
                dispatch(fetchFactures());

                toast.success(
                    createResponse.data,

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
            }
        } catch (error) {
            toast.warning('error', {
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

export const fetchFactures = () => {
    return async (dispatch) => {
        dispatch(getFacturesStart());

        try {
            const response = await apiBackend.get('/invoices/');
            console.log(response.data);
            dispatch(getFacturesSuccess(response.data));
        } catch (error) {
            dispatch(getFacturesFailure(error.message));
        }
    };
};
export const deleteInvoice = (id) => {
    return async (dispatch) => {
        try {
            const response = await apiBackend.delete(`/invoices/${id}`);
            if (response.status === 200) {
                dispatch(fetchFactures());

                toast.success(response.data, {
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
            dispatch(getFacturesFailure(error.message));
        }
    };
};
