import apiBackEnd from "./api.backend";
import { URL_BACK_ADDRESS, URL_BACK_CITIES,URL_BACK_COUNTRIES, URL_BACK_STREETS} from "../constants/url/urlBack";
class addressService {



    getAddressByAddressId(addressId){
        return apiBackEnd.get(`${URL_BACK_ADDRESS}${addressId}`);

    }
    addCountry(countryname){
        return apiBackEnd.post(URL_BACK_COUNTRIES,countryname);
    }

    addCities(city){
        return apiBackEnd.post(URL_BACK_CITIES,city);
    }

    addStreet(street){
        return apiBackEnd.post(URL_BACK_STREETS,street);
    }

    getCountries(){
        return apiBackEnd.get(URL_BACK_COUNTRIES);

    }
    addAddress(address){
            
     return apiBackEnd.post(URL_BACK_ADDRESS,address)
    }
    
    getCitiesByCountryId(countryId){
        return apiBackEnd.get(`${URL_BACK_COUNTRIES}${countryId}/cities`)
    }

    getStreetsByCityId(cityId){
        return apiBackEnd.get(`${URL_BACK_CITIES}${cityId}/streets`)
    }

}
export default new addressService();