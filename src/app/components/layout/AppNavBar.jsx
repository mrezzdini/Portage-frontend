import {
    AdjustmentsVerticalIcon,
    ArrowLeftOnRectangleIcon,
    BellIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import DefaultAvatar from '../../assets/images/default-avatar.png';
import logo from '../../assets/images/logo.png';
import ConsultantService from '../../services/ConsultantService';
import documentService from '../../services/documentService';
import { logout } from '../../store/accountSlice';
import DarkmodeSlider from '../settings/DarkmodeSlider';
import { URL_PASSWORD, URL_PROFILE } from './../../constants/url/urlFront';
import { URL_APP } from './../../constants/url/urlFront';
import NavDropDown from './../lib/container/NavDropDown';

/**
 * AppNavBar component: navbar for the dashboard
 *
 * @author Peter Mollet
 */
const AppNavBar = () => {
    return (
        <nav className="absolute z-40 flex h-16 w-full items-center space-x-4 bg-white px-5 shadow dark:bg-gray-800">
            <div className="hidden flex-1 md:flex"> </div>

            <div className="flex-1 md:flex-none" />

            <div
                className={`w-1440 h-1028.29 absolute top-0 duration-300 ${
                    open ? 'md:w-64' : 'md:w-10'
                }`}
            >
                <Link to={URL_APP} className="flex items-center gap-x-4">
                    <img
                        src={logo}
                        alt=""
                        className={`w-14 duration-500 
                        ${open && 'rotate-[360deg'}`}
                    />
                </Link>
            </div>

            <DarkmodeSlider />

            <NotificationIcon />

            <ProfileIcon />
        </nav>
    );
};

export default AppNavBar;

const NotificationIcon = () => {
    const [hasNotification] = useState(true);

    return (
        <Link to="!#" className="relative text-gray-500 hover:text-gray-800">
            {hasNotification && (
                <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-600" />
            )}
            <BellIcon className="h-6 w-6" />
        </Link>
    );
};

const ProfileIcon = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const items = [
        {
            name: 'Profile',
            icon: UserIcon,
            to: URL_PROFILE,
        },
        {
            name: 'Password',
            icon: AdjustmentsVerticalIcon,
            to: URL_PASSWORD,
        },
        {
            name: 'Logout',
            icon: ArrowLeftOnRectangleIcon,
            onClick: () => dispatch(logout()),
        },
    ];
    const [uploadedImage, setUploadedImage] = useState('');

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await ConsultantService.getConsultantByUserId(
                    auth.userid,
                );
                console.log('imid', response.data.imageId);
                const resptype = {
                    responseType: 'arraybuffer', // Set the responseType to 'arraybuffer'
                };
                const resp = await documentService.getFileByDocId(
                    response.data.imageId,
                    resptype,
                );
                console.log('resp', resp);

                const imageBlob = new Blob([resp.data], {
                    type: resp.headers['content-type'],
                });
                const imageURL = URL.createObjectURL(imageBlob);
                setUploadedImage(imageURL);
            } catch (error) {
                console.log(error);
            }
        };
        getUserById();
    }, [auth.userid]);

    return (
        <NavDropDown items={items}>
            <span className="ml-3 mr-1 font-medium">{auth.username}</span>
            {uploadedImage ? (
                <img
                    className="h-8 w-8 rounded-full border-2 border-yellow-500"
                    src={uploadedImage}
                    alt=""
                />
            ) : (
                <img
                    className="h-8 w-8 rounded-full border-2 border-yellow-500"
                    src={DefaultAvatar}
                    alt=""
                />
            )}
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </NavDropDown>
    );
};
