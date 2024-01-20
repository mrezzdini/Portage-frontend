import { URL_BACK_CONSULTANT, URL_BACK_PAYSLIP } from '../constants/url/urlBack';
import apiBackEnd from './api.backend';
class payslipsService {
    getAllPayslips() {
        return apiBackEnd.get(URL_BACK_PAYSLIP);
    }

    getAllPayslipsByConsultantId(consultantid) {
        return apiBackEnd.get(`${URL_BACK_PAYSLIP}consultantid/${consultantid}`);
    }
}
export default new payslipsService();
