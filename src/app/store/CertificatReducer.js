const initialState = {
    certificats: [],
    loading: false,
    error: null,
};

const CertificatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CERTIFICATS_START':
            return { ...state, loading: true, error: null };
        case 'GET_CERTIFICATS_SUCCESS':
            return { ...state, loading: false, certificats: action.payload };
        case 'GET_CERTIFICATS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default CertificatReducer;
