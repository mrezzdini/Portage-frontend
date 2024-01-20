import { URL_BACK_CV } from '../constants/url/urlBack';
import apiBackEnd from './api.backend';
class cvService {
    getAllCvByConsultant(id) {
        return apiBackEnd.get(`${URL_BACK_CV}consultantId/${id}`);
    }

  
}
export default new cvService();