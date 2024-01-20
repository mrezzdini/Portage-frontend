const initialState = {
    payslips: [], // payslips
    loading: false, // Indicateur de chargement
    error: null, // Erreur éventuelle
};
const payslipsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PAYSLIPS_START':
            // Cas où la requête de récupération des fiches de paie démarre
            return { ...state, loading: true, error: null };
        case 'GET_PAYSLIPS_SUCCESS':
            // Cas où la requête de récupération des fiches de paie réussit
            return { ...state, loading: false, payslips: action.payload };
        case 'GET_PAYSLIPS_FAILURE':
            // Cas où la requête de récupération des fiches de paie échoue
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default payslipsReducer;
