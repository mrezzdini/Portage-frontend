import { Disclosure, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo1 from '../../assets/images/logo1.png';
import { URL_HOME, URL_LOGIN, URL_REGISTER } from './../../constants/url/urlFront';
import { logout } from './../../store/accountSlice';

/**
 * NavBarHome component: navbar for the home page.
 *
 * @author Peter Mollet
 */
const NavBarHome = () => {
    return (
        <Disclosure
            as="nav"
            className="fixed left-0 top-0 z-50 w-full bg-white shadow-md"
        >
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                            <div className="flex">
                                <Link to={URL_HOME}>
                                    <img
                                        className="h-8 w-auto cursor-pointer sm:h-10"
                                        src={logo1}
                                        alt=""
                                        width={200}
                                        height={60}
                                    />
                                </Link>
                            </div>

                            <div className="hidden flex-1 items-center justify-end md:flex lg:w-0">
                                <ConnectionBtn />
                            </div>

                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}

                                <Disclosure.Button
                                    className="inline-flex transform items-center justify-center rounded-md p-2 text-primary focus:outline-none 
                                    hover:bg-primary hover:text-white active:scale-95 active:ring-2 active:ring-primary active:ring-offset-2 "
                                >
                                    {open ? (
                                        <XMarkIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Transition
                        enter="transition"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Disclosure.Panel className="p-4 md:hidden ">
                            <hr />
                            <div className="p-4">
                                <ConnectionBtn />
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
};

export default NavBarHome;

const ConnectionBtn = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (isAuthenticated)
        return (
            <button className="btn btn-green ml-8" onClick={() => dispatch(logout())}>
                Sign out
            </button>
        );
    return (
        <div className="flex flex-col justify-center space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <Link to={URL_LOGIN}>
                <div className="link">Valeurs</div>
            </Link>
            <Link to={URL_LOGIN}>
                <div className="link">Portage Salarial</div>
            </Link>
            <Link to={URL_LOGIN}>
                <div className="link">Avantages</div>
            </Link>
            <Link to={URL_LOGIN}>
                <div className="link">Fonctionnement</div>
            </Link>
            <Link to={URL_LOGIN}>
                <div className="link">Contact</div>
            </Link>
            <Link to={URL_LOGIN}>
                <div className="link">Sign in</div>
            </Link>
            <Link to={URL_REGISTER}>
                <button className="btn btn-green">Sign up</button>
            </Link>
        </div>
    );
};
