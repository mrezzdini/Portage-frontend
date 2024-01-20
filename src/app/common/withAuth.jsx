import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { URL_APP, URL_LOGIN } from '../constants/url/urlFront';
import TokenService from '../services/tokenService';

/**
 * withAuth component: HOC to redirect to login page if not authenticated, or to app page if authenticated.
 *
 * @param {node} Component : component to wrap
 * @param {Boolean} needAuthentication : if the component need authentication (like profil page) or need not to be authenticated (like login page)
 * @author Peter Mollet
 */
const withAuth = (Component, needAuthentication = true) => {
    const ComponentWithAuthProp = (props) => {
        const { isAuthenticated, token } = useSelector((state) => state.auth);
        const redirect = () => <Navigate to={URL_LOGIN} />;

        if (!isAuthenticated || !token) return redirect();

        const isValid = TokenService.isTokenValid(token);
        if (!isValid) return redirect();

        return <Component {...props} />;
    };

    const ComponentWithoutAuthProp = (props) => {
        const { isAuthenticated } = useSelector((state) => state.auth);
        const redirect = () => <Navigate to={URL_APP} />;

        if (isAuthenticated) return redirect();

        return <Component {...props} />;
    };

    return needAuthentication ? ComponentWithAuthProp : ComponentWithoutAuthProp;
};

export default withAuth;
