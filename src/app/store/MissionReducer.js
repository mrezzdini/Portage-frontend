const initialState = {
    missions: [],
    loading: false,
    error: null,
};

const MissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MISSIONS_START':
            return { ...state, loading: true, error: null };
        case 'GET_MISSIONS_SUCCESS':
            return { ...state, loading: false, missions: action.payload };
        case 'GET_MISSIONS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default MissionReducer;
