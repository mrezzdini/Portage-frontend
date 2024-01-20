import {
    URL_BACK_ACTIVITY,
    URL_BACK_CLIENT,
    URL_BACK_CONSULTANT,
    URL_BACK_MISSION,
    URL_BACK_NATURE_PRESTATION,
    URL_BACK_TYPE_PRESTATION,
} from '../constants/url/urlBack';
import apiBackEnd from './api.backend';

class MissionService {
    getMissionByID(id) {
        return apiBackEnd.get(`${URL_BACK_MISSION}${id}`);
    }
    getAllMission() {
        return apiBackEnd.get(URL_BACK_MISSION);
    }
    updateMission(id, updatedMission) {
        return apiBackEnd.put(`${URL_BACK_MISSION}${id}`, updatedMission);
    }
    deleteMission(id) {
        return apiBackEnd.delete(`${URL_BACK_MISSION}${id}`);
    }
    createMission(mission) {
        return apiBackEnd.post(URL_BACK_MISSION, mission);
    }
    getAllmissionByIdConsultant(id) {
        return apiBackEnd.get(`${URL_BACK_MISSION}${id}/missions`);
    }
    /******************  Activity_Methods **********************/
    fetchActivities() {
        return apiBackEnd.get(`${URL_BACK_ACTIVITY}/`);
    }
    postActivity(activity) {
        return apiBackEnd.post(URL_BACK_ACTIVITY, activity);
    }
    deleteActivity(id) {
        return apiBackEnd.delete(`${URL_BACK_ACTIVITY}/${id}`);
    }
    updateActivity(id, updatedActivity) {
        return apiBackEnd.put(`${URL_BACK_ACTIVITY}/${id}`, updatedActivity);
    }
    fetchYears() {
        return apiBackEnd.get(`${URL_BACK_ACTIVITY}/years`);
    }
    fetchMonths() {
        return apiBackEnd.get(`${URL_BACK_ACTIVITY}/months`);
    }
    /******************** TypeMission_Methodes **************/
    fetchTypes() {
        return apiBackEnd.get(`${URL_BACK_MISSION}types`);
    }
    deleteType(id) {
        return apiBackEnd.delete(`${URL_BACK_MISSION}types/${id}`);
    }
    updateType(id, updatedType) {
        return apiBackEnd.put(`${URL_BACK_MISSION}types/${id}`, updatedType);
    }
    postType(type) {
        return apiBackEnd.post(`${URL_BACK_MISSION}types`, type);
    }
    /***********************Type_Prestation_Methods ************/

    fetchActivitiesType() {
        return apiBackEnd.get(URL_BACK_TYPE_PRESTATION);
    }
    deleteActivitiesType(id) {
        return apiBackEnd.delete(`${URL_BACK_TYPE_PRESTATION}${id}`);
    }
    updateActivitiesType(id, updatedType) {
        return apiBackEnd.put(`${URL_BACK_TYPE_PRESTATION}${id}`, updatedType);
    }
    postActivitiesType(type) {
        return apiBackEnd.post(`${URL_BACK_TYPE_PRESTATION}`, type);
    }
    /***********************Nature_Prestation_Methods ***********/

    fetchActivitiesNature() {
        return apiBackEnd.get(URL_BACK_NATURE_PRESTATION);
    }
    deleteActivitiesNature(id) {
        return apiBackEnd.delete(`${URL_BACK_NATURE_PRESTATION}${id}`);
    }
    updateActivitiesNature(id, updatedNature) {
        return apiBackEnd.put(`${URL_BACK_NATURE_PRESTATION}${id}`, updatedNature);
    }
    postActivitiesNature(nature) {
        return apiBackEnd.post(`${URL_BACK_NATURE_PRESTATION}`, nature);
    }
    /**************************************Client & Consultant Method used for Mission *****************************/
    fetchClients() {
        return apiBackEnd.get(URL_BACK_CLIENT);
    }
    fetchConsultants() {
        return apiBackEnd.get(URL_BACK_CONSULTANT);
    }
    getConsultantByUserId(id) {
        return apiBackEnd.get(`${URL_BACK_CONSULTANT}userId/${id}`);
    }
}
export default new MissionService();
