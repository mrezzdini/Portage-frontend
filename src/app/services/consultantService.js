import apiBackEnd from './api.backend';
import { URL_BACK_CONSULTANT } from '../constants/url/urlBack';
class consultantService {
    getAllConsultants() {
        return apiBackEnd.get(URL_BACK_CONSULTANT);
    }
    getConsultantByUserId(userId) {
        return apiBackEnd.get(`${URL_BACK_CONSULTANT}userId/${userId}`);
    }
    addConsultant(consultant) {
        return apiBackEnd.post(URL_BACK_CONSULTANT, consultant);
    }

    getConsultantByConsultantId(consultantId) {
        return apiBackEnd.get(`${URL_BACK_CONSULTANT}${consultantId}`);
    }
    updateConsultant(updatedConsultant, userId) {
        return apiBackEnd.put(
            `${URL_BACK_CONSULTANT}consultant/${userId}`,
            updatedConsultant,
        );
    }

    addImageId(userId, imid, nothing) {
        return apiBackEnd.post(
            `${URL_BACK_CONSULTANT}saveImage/${userId}/${imid}`,
            nothing,
        );
    }
}
export default new consultantService();
