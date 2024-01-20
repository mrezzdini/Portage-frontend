import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBarHome from './NavBarHome';

/**
 * LayoutHome component: layout for the home page, with a simple navbar.
 *
 * @author: Peter Mollet
 */
const LayoutHome = () => {
    return (
        <div className="mx-1 h-full">
            <NavBarHome />
            <main className="h-full pt-24">
                <Outlet />
            </main>
        </div>
    );
};

export default LayoutHome;
