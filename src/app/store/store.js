import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import authReducer from './accountSlice';
import appSettingsReducer from './appSettingsSlice';
import CertificatReducer from './CertificatReducer';
import clientReducer from './clientReducer';
import CvReducer from './CvReducer';
import documentReducer from './documentReducer';
import EducationReducer from './EducationReducer';
import ExperienceReducer from './ExperienceReducer';
import factureReducer from './factureReducer';
import folderReducer from './folderReducer';
import MissionReducer from './MissionReducer';
import offerReducer from './offerReducer';
import payslipsReducer from './payslipsReducer';
import roleReducer from './roleReducer ';
import SkillReducer from './SkillReducer';
import userReducer from './userReducer';
/**
 * Config to handle how the auth slice is persisted
 *
 * @author Peter Mollet
 */
const authPersistConfig = {
    key: 'auth',
    storage: storage,
};
// Dispatching the createFolder action
/**
 * Combine all the reducers. put here all the other reducers (with or without persist)
 */
const rootReducer = combineReducers({
    user: userReducer,
    role: roleReducer,
    client: clientReducer,
    missions: MissionReducer,
    certificats: CertificatReducer,
    educations: EducationReducer,
    experiences: ExperienceReducer,
    skills: SkillReducer,
    folder: folderReducer,
    facture: factureReducer,
    document: documentReducer,
    offers: offerReducer,
    payslips: payslipsReducer,
    cvs: CvReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    settings: persistReducer({ key: 'settings', storage: storage }, appSettingsReducer),
});

/**
 * Create the store
 */
export const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.MODE !== 'production',
    middleware: [thunk],
});

export const persistor = persistStore(store);
