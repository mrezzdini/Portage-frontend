import React from 'react';

import withAuth from '../../common/withAuth';
import LoginForm from '../../components/account/LoginForm';

/**
 * LoginView component: view for the login page. without authentication.
 *
 * @author Peter Mollet
 */
const LoginView = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <LoginForm />
        </div>
    );
};

export default withAuth(LoginView, false);
