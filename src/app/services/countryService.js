import apiBackEnd from "./api.backend";
import {  URL_BACK_COUNTRIES } from "../constants/url/urlBack";
class countryService {

    addCountry(countryname){
        return apiBackEnd.post(URL_BACK_COUNTRIES,countryname);
    }

}
export default new countryService();