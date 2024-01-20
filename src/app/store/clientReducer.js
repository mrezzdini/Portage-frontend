const initialState = {
    clients: [],
    downloading: false,
    loading: false,
    error: null,
};
const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CLIENTS_START':
            return { ...state, loading: true, error: null };
        case 'GET_CLIENTS_SUCCESS':
            return { ...state, loading: false, clients: action.payload };
        case 'GET_CLIENTS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default clientReducer;
