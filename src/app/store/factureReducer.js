const initialState = {
    factures: [],
    downloading: false,
    loading: false, // Indicateur de chargement
    error: null, // Erreur éventuelle
};
const factureReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FACTURES_START':
            // Cas où la requête de récupération des documents démarre
            return { ...state, loading: true, error: null };
        case 'GET_FACTURES_SUCCESS':
            // Cas où la requête de récupération des documents réussit
            return { ...state, loading: false, factures: action.payload };
        case 'GET_FACTURES_FAILURE':
            // Cas où la requête de récupération des documents échoue
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default factureReducer;
