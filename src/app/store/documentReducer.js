const initialState = {
    documents: [],
    downloading: false,
    // Tableau des documents
    loading: false, // Indicateur de chargement
    error: null, // Erreur éventuelle
};
const documentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DOCUMENTS_START':
            // Cas où la requête de récupération des documents démarre
            return { ...state, loading: true, error: null };
        case 'GET_DOCUMENTS_SUCCESS':
            // Cas où la requête de récupération des documents réussit
            return { ...state, loading: false, documents: action.payload };
        case 'GET_DOCUMENTS_FAILURE':
            // Cas où la requête de récupération des documents échoue
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default documentReducer;
