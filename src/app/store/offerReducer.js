const initialState = {
    offers: [], // Tableau des offres
    loading: false, // Indicateur de chargement
    error: null, // Erreur éventuelle
};

const offerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_OFFERS_START':
            // Cas où la requête de récupération des dossiers démarre
            return { ...state, loading: true, error: null };
        case 'GET_OFFERS_SUCCESS':
            // Cas où la requête de récupération des dossiers réussit
            return { ...state, loading: false, offers: action.payload };
        case 'GET_OFFERS_FAILURE':
            // Cas où la requête de récupération des dossiers échoue
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default offerReducer;