const initialState = {
    skills: [],
    loading: false,
    error: null,
};

const SkillReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SKILLS_START':
            return { ...state, loading: true, error: null };
        case 'GET_SKILLS_SUCCESS':
            return { ...state, loading: false, skills: action.payload };
        case 'GET_SKILLS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default SkillReducer;
