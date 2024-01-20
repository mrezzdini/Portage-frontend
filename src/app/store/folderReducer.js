const initialState = {
    folders: [], // Tableau des dossiers
    loading: false, // Indicateur de chargement
    error: null, // Erreur éventuelle
};

const folderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FOLDERS_START':
            // Cas où la requête de récupération des dossiers démarre
            return { ...state, loading: true, error: null };
        case 'GET_FOLDERS_SUCCESS':
            // Cas où la requête de récupération des dossiers réussit
            return { ...state, loading: false, folders: action.payload };
        case 'GET_FOLDERS_FAILURE':
            // Cas où la requête de récupération des dossiers échoue
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default folderReducer;
