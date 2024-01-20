const initialState = {
    educations: [],
    loading: false,
    error: null,
};

const EducationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_EDUCATIONS_START':
            return { ...state, loading: true, error: null };
        case 'GET_EDUCATIONS_SUCCESS':
            return { ...state, loading: false, educations: action.payload };
        case 'GET_EDUCATIONS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default EducationReducer;
