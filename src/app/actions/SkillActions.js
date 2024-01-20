import { toast } from 'react-toastify';

import apiBackend from '../services/api.backend';

const getSkillsSuccess = (skills) => ({
    type: 'GET_SKILLS_SUCCESS',
    payload: skills,
});
const getSkillsFailure = (error) => ({
    type: 'GET_SKILLS_FAILURE',
    payload: error,
});

export const getSkillsAction = (idConsultant) => {
    return async (dispatch) => {
        try {
            const response = await apiBackend.get(
                `/consultants/skills/consultant/${idConsultant}`,
            );
            dispatch(getSkillsSuccess(response.data));
        } catch (error) {
            dispatch(getSkillsFailure(error.message));
        }
    };
};
export const createSkill = (skill) => {
    return async (dispatch) => {
        try {
            const createResponse = await apiBackend.post('/consultants/skills', skill);

            dispatch(getSkillsAction(skill.consultantId));
        } catch (error) {
            toast.warning('Errrreur', {
                position: toast.POSITION.TOP_CENTER, // Set the position to top center
                style: {
                    top: '100px',
                    transform: 'translateY(-50%)',
                    width: '400px',
                    height: '130px',
                    borderRadius: '15px',
                    alignContent: 'center',
                    textAlign: 'center',
                },
            });
        }
    };
};
export const deleteSkill = (id) => {
    return async (dispatch) => {
        try {
            const response = apiBackend.delete(`/consultants/skills/${id.id}`);
            if ((await response).status == 200) {
                dispatch(getSkillsAction(id.consultantId));
                toast.success('Competence supprimé avec  succès', {
                    position: toast.POSITION.TOP_CENTER, // Set the position to top center
                    style: {
                        top: '100px',
                        transform: 'translateY(-50%)',
                        width: '400px',
                        height: '130px',
                        borderRadius: '15px',
                        alignContent: 'center',
                        textAlign: 'center',
                    },
                });
            }
        } catch (error) {
            toast.warning('un erreur est survenu', {
                position: toast.POSITION.TOP_CENTER, // Set the position to top center
                style: { top: '10%', transform: 'translateY(-10%)' },
            });
        }
    };
};
export const UpdateSkill = (skill) => {
    return async (dispatch) => {
        try {
            const response = apiBackend.put(`/consultants/skills/${skill.id}`, skill);
            if ((await response).status == 200) {
                dispatch(getSkillsAction(skill.consultantId));
                toast.success('Competence modifieé avec  succès', {
                    position: toast.POSITION.TOP_CENTER, // Set the position to top center
                    style: {
                        top: '100px',
                        transform: 'translateY(-50%)',
                        width: '400px',
                        height: '130px',
                        borderRadius: '1xpx',
                        alignContent: 'center',
                        textAlign: 'center',
                    },
                });
            }
        } catch (error) {
            toast.warning('un erreur est survenu', {
                position: toast.POSITION.TOP_CENTER, // Set the position to top center
                style: { top: '10%', transform: 'translateY(-10%)' },
            });
        }
    };
};
