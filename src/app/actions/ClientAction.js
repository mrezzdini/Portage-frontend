import { toast } from 'react-toastify';

import apiBackend from '../services/api.backend';
import apiBackEnd from '../services/api.backend';

const getClientsStart = () => ({ type: 'GET_CLIENTS_START' });
const getClientsSuccess = (clients) => ({
    type: 'GET_CLIENTS_SUCCESS',
    payload: clients,
});
const getClientsFailure = (error) => ({
    type: 'GET_CLIENTS_FAILURE',
    payload: error,
});
export const deleteClient = (id) => {
    return async (dispatch) => {
        try {
            const response = await apiBackEnd.delete(`/client/${id}`);
            if (response.status === 200) {
                dispatch(fetchClients());

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
            dispatch(getClientsFailure(error.message));
        }
    };
};
export const createClient = (client) => {
    return async (dispatch) => {
        try {
            console.log(client);
            const createResponse = await apiBackEnd.post('/client/', client);
            console.log(createResponse.data);
            console.log(createResponse.status == 200);
            if (createResponse.status === 201) {
                dispatch(fetchClients());

                toast.success('Client ' + client.firstName + ' crée avec success', {
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
            } else {
                toast.warning('Client   ' + client.firstName + ' existe ', {
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
            toast.warning('error', {
                position: toast.POSITION.BOTTOM_CENTER, // Set the position to top center
                style: { top: '10%', transform: 'translateY(-10%)' },
            });
        }
    };
};
export const fetchClients = () => {
    return async (dispatch) => {
        dispatch(getClientsStart());

        try {
            const response = await apiBackend.get('/client/');
            console.log(response.data);
            dispatch(getClientsSuccess(response.data));
        } catch (error) {
            dispatch(getClientsFailure(error.message));
        }
    };
};
