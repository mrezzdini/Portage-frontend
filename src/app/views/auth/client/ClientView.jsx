import { PencilSquareIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createClient, deleteClient, fetchClients } from '../../../actions/ClientAction';
import avatr from '../../../assets/images/default-avatar.png';
import useConfirm from '../../../hooks/useConfirm';
import TablePanel from './../../../components/lib/container/table/TablePanelM';
const ClientsView = () => {
    const dispatch = useDispatch();
    const { clients } = useSelector((state) => state.client);
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(null);

    useEffect(() => {
        dispatch(fetchClients());
        console.log(clients);
    }, [dispatch]);

    useEffect(() => {
        const fetchData = () => {
            const pageSize = 4;
            const startIndex = page * pageSize;
            const endIndex = startIndex + pageSize;
            const slicedUsers = clients.slice(startIndex, endIndex);

            return {
                users: slicedUsers,
                page: {
                    totalElements: clients.length,
                    totalPages: Math.ceil(clients.length / pageSize),
                },
            };
        };

        const back = fetchData();
        setTotalElements(back.page.totalElements);
        setTotalPages(back.page.totalPages);

        setPeople(
            back.users &&
                back.users.map((d) => ({
                    name: <Name person={d} />,
                    title: <Title person={d} />,
                    role: d.role,
                    edit: (
                        <div>
                            <button
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: '#FF7676',
                                    border: 'none',
                                    marginRight: '5px',
                                }}
                                onClick={() => {
                                    handleConfirm(d.id, d.firstName);
                                }}
                            >
                                <DeleteBtn />{' '}
                            </button>
                            <button
                                onClick={() => updateUser(d)}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: '#D8D83D',
                                    border: 'none',
                                    marginLeft: '5px',
                                }}
                            >
                                <UpdateBtn />
                            </button>
                        </div>
                    ),
                })),
        );
    }, [clients, page, search, sort]);

    const confirm = useConfirm();

    const handleConfirm = async (id, username) => {
        const result = await confirm({
            description: `Confirmer la suppression de client  ${username} ?`,
        });
        if (result == true) {
            dispatch(deleteClient(id));
        }
    };
    // dispatch(deleteUser(userId));

    const updateUser = (d) => console.log(d);

    const handleCreateClient = (userData) => {
        dispatch(createClient(userData));
    };

    const userFields = [
        {
            name: 'username',
            label: 'Identifiant ',
            type: 'text',
            placeholder: ' Nom',
        },
        {
            name: 'firstName',
            label: 'Nom',
            type: 'text',
            placeholder: ' Nom',
        },
        {
            name: 'lastName',
            label: 'Prénon',
            type: 'text',
            placeholder: ' Prénon',
        },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Email' },
        {
            name: 'company',
            label: 'Societé ',
            type: 'text',
            placeholder: 'Societé',
        },
    ];

    return (
        <div>
            <TablePanel
                titre="Liste des clients"
                column={[
                    { name: 'name', label: 'Name' },
                    { name: ' Societé', label: ' Societé' },
                    // { name: 'status', label: 'Status', sortable: true },
                    { name: '', label: '' },
                    { name: 'actions', label: 'Actions' },
                ]}
                rows={people}
                onSearch={(values) => {
                    setSearch(values);
                    setPage(0);
                }}
                onSort={(values) => {
                    setSort(values);
                    setPage(0);
                }}
                totalElements={totalElements}
                pageSize={4}
                totalPages={totalPages}
                onPageChange={setPage}
                currentPage={page}
                setCurrentPage={setPage}
                IconName={UserPlusIcon}
                classNameIcon="h-6 w-6 text-gray-500"
                style={{ color: 'white ', with: '50px' }}
                entityName="Ajouter un client     "
                fields={userFields}
                onCreate={handleCreateClient}
            />
        </div>
    );
};

const DeleteBtn = () => (
    <TrashIcon
        style={{
            color: '#FFFFFF',
            width: '20px',
            height: '30px',
            marginLeft: '10px',
        }}
    />
);

const UpdateBtn = () => (
    <PencilSquareIcon
        style={{ color: '#FFFFFF', marginLeft: '10px', width: '20px', height: '30px' }}
    />
);

const Name = ({ person }) => {
    return (
        <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={avatr} alt="" />
            </div>
            <div className="ml-4">
                <div className="dark:text-gray-120 text-sm font-medium text-gray-900">
                    {person.firstName} {'   '}
                    {person.lastName}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {person.email} {'   '}
                </div>
            </div>
        </div>
    );
};

const Title = ({ person }) => {
    return (
        <>
            <div className="text-sm text-gray-900 dark:text-gray-100">
                {'   '} {person.company}
            </div>
        </>
    );
};

// const Active = ({ isActive }) => {
//     return (
//         <span
//             className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
//                 isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//             }`}
//         >
//             {isActive ? 'Active' : 'Inactive'}
//         </span>
//     );
// };

export default ClientsView;
