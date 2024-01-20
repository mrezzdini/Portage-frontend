import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import withAuth from './../../common/withAuth';
import AppNavBar from './AppNavBar';
import AppSidebar from './AppSideBar';

/**
 * LayoutApp component: layout for the dashboard application, with a navbar and a sidebar.
 *
 * @author Peter Mollet
 */
const LayoutApp = () => {
    const auth = useSelector((state) => state.auth);

    const [open, setOpen] = useState(false);
    return (
        <div>
            <AppSidebar open={open} setOpen={setOpen} profile={auth.profile} />
            <main
                className={`
                ${open ? 'md:ml-[16rem]' : 'md:ml-[5rem]'}`}
            >
                <div className="relative">
                    <AppNavBar />
                    <div
                        className="flex h-screen flex-col overflow-y-auto
                        scrollbar-thin scrollbar-track-primary-light scrollbar-thumb-primary-dark"
                    >
                        <div className="mt-16 p-5">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default withAuth(LayoutApp);
