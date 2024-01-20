/**
 * yupConfig - Configures yup to use the global custom validation messages
 *
 * @author Peter Mollet
 */
const yupConfig = {
    mixed: {
        required: 'Champs requis',
        notType: 'Champs requis',
    },
    string: {
        email: 'Invalide email',
        min: 'Doit être au moins ${min} caractères',
        max: 'Doit être au maximum ${max} caractères',
        length: 'Doit être exactement ${length} caractères',
        url: 'Invalide URL',
        matches: 'Doit correspondre au format ${regex}',
    },
    number: {
        min: 'Doit être au moins ${min}',
        max: 'Doit être au maximum ${max}',
        lessThan: 'Doit être inférieur à ${less}',
        moreThan: 'Doit être supérieur à ${more}',
        positive: 'Doit être positif',
        negative: 'Doit être négatif',
        integer: 'Doit être un entier',
    },
    array: {
        min: 'Doit avoir au moins ${min} items',
        max: 'Doit avoir au maximum ${max} items',
        length: 'Doit avoir exactement ${length} items',
    },
    date: {
        min: 'Doit être après ${min}',
        max: 'Doit être avant ${max}',
    },
};

export default yupConfig;
