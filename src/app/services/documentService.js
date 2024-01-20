import { URL_BACK_FILE } from '../constants/url/urlBack';
import apiBackEnd from './api.backend';
class documentService {
    getFileByDocId(docid, resptype) {
        return apiBackEnd.get(`${URL_BACK_FILE}${docid}`, resptype);
    }

    addImage(data) {
        return apiBackEnd.post(URL_BACK_FILE, data);
    }
}
export default new documentService();
