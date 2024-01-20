import {
    AdjustmentsHorizontalIcon,
    ChevronLeftIcon,
    ClipboardDocumentListIcon,
    DocumentDuplicateIcon,
    EnvelopeIcon,
    IdentificationIcon,
    ListBulletIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
    URL_CLIENT,
    URL_CONSULTANTS,
    URL_CRA,
    URL_Document,
    URL_ECRAN,
    URL_FACTURE,
    URL_LISTCV,
    URL_Liste_PAIE,
    URL_MAIL,
    URL_MISSION,
    URL_OFFERLIST,
    URL_PAYSLIP,
    URL_USER,
} from '../../constants/url/urlFront';
const menuPermissions = {
    Users: ['ADMIN'],
    Documents: ['ADMIN'],
    Profil: ['ADMIN', 'CONSULTANT'],
    Consultants: ['ADMIN'],
    Missions: ['ADMIN'],
    Parametrage: ['ADMIN'],
    CRA: ['CONSULTANT'],
    Préstations: ['ADMIN', 'CONSULTANT'],
    Paie: ['ADMIN', 'CONSULTANT'],
    Listedoffres: ['CONSULTANT'],
    ListCV: ['CONSULTANT'],
};

// Filter the menu items based on the user's profile

/**
 * SideBar component: sidebar for the app page.
 *
 * @param {Boolean} open: if the sidebar is open or not.
 * @param {Function} setOpen: function to set the open state.
 * @author Peter Mollet
 */
// const [showSubMenu, setShowSubMenu] = useState(false);

const AppSidebar = ({ open, setOpen, profile }) => {
    const MENUS = [
        {
            title: 'Users',
            icon: UsersIcon,
            path: URL_USER,
            allowedProfiles: menuPermissions.Users,
        },
        {
            title: 'Documents',
            icon: ClipboardDocumentListIcon,
            gap: true,
            path: URL_Document,
            allowedProfiles: menuPermissions.Documents,
        },
        {
            title: 'Factures',
            icon: ClipboardDocumentListIcon,
            path: URL_FACTURE,
            gap: true,
            allowedProfiles: menuPermissions.Users,
        },
        {
            title: 'Consultants',
            icon: IdentificationIcon,
            path: URL_CONSULTANTS,
            gap: true,
            allowedProfiles: menuPermissions.Consultants,
        },
        {
            title: 'Clients',
            icon: IdentificationIcon,
            path: URL_CLIENT,
            gap: true,
            allowedProfiles: menuPermissions.Consultants,
        },
        {
            title: 'Les fiches de paie',
            icon: IdentificationIcon,
            path: URL_Liste_PAIE,
            gap: true,
            allowedProfiles: menuPermissions.Paie,
        },
        // { title: 'Profil', icon: IdentificationIcon, path: URL_PROFILE },
        // { title: 'Consultants', icon: IdentificationIcon, path: URL_CONSULTANTS },
        // { title: 'Les fiches de paie', icon: IdentificationIcon, path: URL_Liste_PAIE },

        {
            title: 'Missions',
            icon: ListBulletIcon,
            path: URL_MISSION,
            gap: true,
            allowedProfiles: menuPermissions.Missions,
        },
        {
            title: 'Parametrage',
            icon: AdjustmentsHorizontalIcon,
            gap: true,
            path: URL_ECRAN,
            allowedProfiles: menuPermissions.Parametrage,
        },
        {
            title: 'RH',
            icon: UsersIcon,
            gap: true,
            allowedProfiles: menuPermissions.Users,
            subMenu: [
                {
                    title: 'Liste des offres',
                    path: URL_OFFERLIST,
                    allowedProfiles: menuPermissions.Listedoffres,
                },
                // Add more sub-menu items here if needed
            ],
        },

        {
            title: 'CRA',
            icon: DocumentDuplicateIcon,
            gap: true,
            path: URL_CRA,
            allowedProfiles: menuPermissions.CRA,
        },
        {
            title: "Liste d'offres",
            icon: DocumentDuplicateIcon,
            gap: true,
            path: URL_OFFERLIST,
            allowedProfiles: menuPermissions.Listedoffres,
        },
        {
            title: 'Messagerie',
            icon: EnvelopeIcon,
            path: URL_MAIL,
            gap: true,
            allowedProfiles: menuPermissions.Users,
        },
        {
            title: 'Liste fiches de paie',
            icon: IdentificationIcon,
            path: URL_PAYSLIP,
            gap: true,
            allowedProfiles: menuPermissions.Consultants,
        },
        {
            title: 'Mes CVs',
            icon: ClipboardDocumentListIcon,
            path: URL_LISTCV,
            gap: true,
            allowedProfiles: menuPermissions.ListCV,
        },
    ].filter((menuItem) => menuItem.allowedProfiles.includes(profile));
    // const auth = useSelector((state) => state.auth);

    return (
        /* ml-20 */
        <aside
            className={`fixed left-0 top-0 z-50  h-screen w-20 bg-primary-dark pl-5 duration-300
            ${open ? 'md:w-64' : 'md:w-20'}`}
        >
            <ChevronLeftIcon
                className={`absolute -right-3 top-7  z-50   hidden w-7 cursor-pointer
                    rounded-full border-2 border-primary-dark bg-white duration-200
                    md:inline-flex
                    ${!open && 'rotate-180'}
                `}
                onClick={() => setOpen(!open)}
            />
            <ul
                className="mt-20 flex h-full flex-col overflow-x-hidden pb-28 pr-6 scrollbar-thin
          scrollbar-track-primary-light scrollbar-thumb-primary-dark scrollbar-track-rounded-md scrollbar-thumb-rounded-md"
            >
                {' '}
                {/* <p style={{ textAlign: 'center', color: '#D8D83D' }}>
                    {' '}
                    Bonjour {auth.username} !
                </p> */}
                {MENUS.map((menu, index) => {
                    const Icon = menu.icon;
                    return (
                        <li key={index} className={menu.gap ? 'mt-5' : 'mt-2'}>
                            <NavLink
                                to={menu.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-x-4 rounded-md p-2 text-sm text-gray-100 hover:text-[#D8D83D] ${
                                        isActive
                                            ? 'font-roboto rounded-l-full border-l-4 border-primary-light bg-primary-light text-[#D8D83D]'
                                            : ''
                                    }`
                                }
                            >
                                <Icon className="w-5" />
                                <span
                                    className={`hidden origin-left ${
                                        open ? 'md:inline-flex' : 'md:hidden'
                                    }`}
                                >
                                    {menu.title}
                                </span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default AppSidebar;
