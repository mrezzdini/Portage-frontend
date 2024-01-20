const initialState = {
    experiences: [],
    loading: false,
    error: null,
};

const ExperienceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_EXPERIENCES_START':
            return { ...state, loading: true, error: null };
        case 'GET_EXPERIENCES_SUCCESS':
            return { ...state, loading: false, experiences: action.payload };
        case 'GET_EXPERIENCES_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default ExperienceReducer;
