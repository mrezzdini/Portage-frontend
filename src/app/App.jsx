import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { setLocale } from 'yup';

import Intersect_BG from './assets/images/Intersect_BG.svg';
import yupConfig from './common/yupConfig';
import IdleTimerCustom from './components/account/IdleTimerCustom';
import { ConfirmDialogProvider } from './hooks/useConfirm';
import Routes from './routes/Routes';

setLocale(yupConfig);

/**
 * App component: main component of the application
 * Set the Intersect_BG.svg as the background for the app.
 * 
 * @author: Peter Mollet
 */
const App = () => {
    const isAuthentified = useSelector((state) => state.auth.isAuthenticated);

    const appStyle = {
        backgroundImage: `url(${Intersect_BG})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };

    return (
        <ConfirmDialogProvider>
            <BrowserRouter>
                <div className="cursor-default overflow-hidden bg-gray-50 dark:bg-gray-750" style={appStyle}>
                    <Routes />
                    <ToastContainer position="center" autoClose={3000} />
                    {isAuthentified && <IdleTimerCustom />}
                </div>
            </BrowserRouter>
        </ConfirmDialogProvider>
    );
};

export default App;
