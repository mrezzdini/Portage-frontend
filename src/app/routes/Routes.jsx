import { useSelector } from 'react-redux';
import { Route, Routes as RoutesContainer } from 'react-router-dom';

import PasswordChangeForm from '../components/account/ChangePasswordPage';
import ForgotPasswordModal from '../components/account/ForgotPasswordModal';
import LayoutHome from '../components/layout/LayoutHome';
import * as URL from '../constants/url/urlFront';
import ClientsView from '../views/auth/client/ClientView';
import AddConsultant from '../views/auth/consultant/AddConsultant';
import Editprofil from '../views/auth/consultant/Editprofil';
import ListconsultantsView from '../views/auth/consultant/ListconsultantsView';
import ProfileView from '../views/auth/consultant/ProfileView';
import Viewconsultant from '../views/auth/consultant/Viewconsultant';
import Certification from '../views/auth/cv/Certification';
import Cv from '../views/auth/cv/Cv';
import Education from '../views/auth/cv/Education';
import Experience from '../views/auth/cv/Experience';
import ListCv from '../views/auth/cv/ListCv';
import Recapulatif from '../views/auth/cv/Recapulatif';
import Skills from '../views/auth/cv/Skills';
import DocumentView from '../views/auth/DocumentView';
import DetailsFactures from '../views/auth/factures/DetailsFactures';
import FactureForm from '../views/auth/factures/FactureForm';
import FactureView from '../views/auth/factures/FactureView';
import UpdateFacture from '../views/auth/factures/UpdateFacture';
import CRA from '../views/auth/mission/CRA';
import Ecran from '../views/auth/mission/Ecran';
import Mission from '../views/auth/mission/Mission';
import Prestation from '../views/auth/mission/Prestation';
import OfferDetails from '../views/auth/offer/OfferDetails';
import OfferList from '../views/auth/offer/OfferList';
import PayslipView from '../views/auth/paie/PayslipView';
import TablePaieView from '../views/auth/paie/TablePaieView';
import SendMail from '../views/auth/SendMail';
import UsersView from '../views/auth/UsersView';
import HomeView from '../views/no-auth/HomeView';
import LoginView from '../views/no-auth/LoginView';
import LayoutApp from './../components/layout/LayoutApp';
import AppView from './../views/auth/AppView';
import ErrorView from './../views/no-auth/ErrorView';
const Routes = () => {
    const auth = useSelector((state) => state.auth);

    const isAdmin = () => {
        console.log(auth.profile === 'ADMIN');
        return auth.profile === 'ADMIN';
    };

    // Fonction de vérification du rôle CONSULTANT
    const isConsultant = () => {
        console.log(auth.profile === 'CONSULTANT');

        return auth.profile === 'CONSULTANT';
    };

    return (
        <RoutesContainer>
            <Route path={URL.URL_HOME} element={<LayoutHome />}>
                <Route index element={<HomeView />} />
            </Route>

            <Route path={URL.URL_APP} element={<LayoutApp />}>
                <Route index element={<AppView />} />
                <Route path={URL.URL_EDITPROFIL} element={<Editprofil />} />
                <Route path={URL.URL_PASSWORD} element={<PasswordChangeForm />} />

                <Route
                    path={URL.URL_Document}
                    element={isAdmin() ? <DocumentView /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_CLIENT}
                    element={isAdmin() ? <ClientsView /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_FACTURE}
                    element={isAdmin() ? <FactureView /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_CREATE_FACTURE}
                    element={isAdmin() ? <FactureForm /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_USER}
                    element={isAdmin() ? <UsersView /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_CONSULTANTS}
                    element={isAdmin() ? <ListconsultantsView /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_PROFILE}
                    element={isAdmin() || isConsultant ? <ProfileView /> : <ErrorView />}
                />

                <Route
                    path={URL.URL_CONSULTANTS}
                    element={isAdmin() ? <ListconsultantsView /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_OFFERLIST}
                    element={isConsultant() ? <OfferList /> : <ErrorView />}
                />

                <Route
                    path={URL.URL_Liste_PAIE}
                    element={
                        isAdmin() || isConsultant ? <TablePaieView /> : <ErrorView />
                    }
                />
                <Route
                    path={URL.URL_DETAIL_FACTURE}
                    element={
                        isAdmin() || isConsultant ? <DetailsFactures /> : <ErrorView />
                    }
                />
                <Route
                    path={URL.URL_UPDATE_FACTURE}
                    element={
                        isAdmin() || isConsultant ? <UpdateFacture /> : <ErrorView />
                    }
                />
                <Route
                    path={URL.URL_ADDCONSULTANT}
                    element={isAdmin() ? <AddConsultant /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_MISSION}
                    element={isAdmin() ? <Mission /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_PRESTATION}
                    element={isAdmin() ? <Prestation /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_VIEWCONSULTANT}
                    element={isAdmin() ? <Viewconsultant /> : <ErrorView />}
                />
                <Route path={URL.URL_MAIL} element={<SendMail />} />
                <Route
                    path={URL.URL_ECRAN}
                    element={isAdmin() ? <Ecran /> : <ErrorView />}
                />
                <Route path={URL.URL_PAYSLIP} element={<PayslipView />} />
                <Route
                    path={URL.URL_CRA}
                    element={isConsultant() ? <CRA /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_CV}
                    element={isConsultant() ? <Cv /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_SKILL}
                    element={isConsultant() ? <Skills /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_EDUCATION}
                    element={isConsultant() ? <Education /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_CERTIFICATION}
                    element={isConsultant() ? <Certification /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_OFFERDETAILS}
                    element={
                        isConsultant() || isConsultant ? <OfferDetails /> : <ErrorView />
                    }
                />
                <Route
                    path={URL.URL_EXPERIENCE}
                    element={isConsultant() ? <Experience /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_LISTCV}
                    element={isConsultant() ? <ListCv /> : <ErrorView />}
                />
                <Route
                    path={URL.URL_RECAP}
                    element={isConsultant() ? <Recapulatif /> : <ErrorView />}
                />
            </Route>

            <Route path={URL.URL_LOGIN} element={<LoginView />} />
            <Route path={URL.FORGET_PASSWORD} element={<ForgotPasswordModal />} />

            <Route path="*" element={<ErrorView />} />
        </RoutesContainer>
    );
};

export default Routes;
