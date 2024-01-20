const initialState = {
    cvs: [],
    loading: false,
    error: null,
};

const CertificatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CVS_START':
            return { ...state, loading: true, error: null };
        case 'GET_CVS_SUCCESS':
            return { ...state, loading: false, cvs: action.payload };
        case 'GET_CVS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default CertificatReducer;
