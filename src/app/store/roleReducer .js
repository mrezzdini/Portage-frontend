// roleReducer.js

// Initial state
const initialState = {
    roles: [],
};

// Reducer function
const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_ROLES':
            return {
                ...state,
                roles: action.payload,
            };
        default:
            return state;
    }
};

export default roleReducer;
