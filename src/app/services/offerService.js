import { URL_BACK_OFFER } from '../constants/url/urlBack';
import apiBackEnd from './api.backend';
class offerService {
    getOfferById(id) {
        return apiBackEnd.get(`${URL_BACK_OFFER}${id}`);
    }

    updateOffer(updatedoffer, offerid) {
        return apiBackEnd.post(
            `${URL_BACK_OFFER}updatedoffer/${offerid}`,
            updatedoffer,
        );
    }

  
}
export default new offerService();