import './createFacture.css'; // Import custom CSS for responsive styles

import { UserPlusIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setStatusOfInvoice } from '../../../actions/FactureActions';
import { fetchFactures } from '../../../actions/FactureActions';
import TablePanel from '../../../components/lib/container/table/TablePanel';
const FactureView = () => {
    const dispatch = useDispatch();
    const { factures } = useSelector((state) => state.facture);
    console.log(factures);
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchFactures());
    }, [dispatch]);
    const handlecreateFacture = () => {
        navigate(`/app/createFacture`);
    };
    useEffect(() => {
        const fetchData = () => {
            const pageSize = 4;
            const startIndex = page * pageSize;
            const endIndex = startIndex + pageSize;
            const slicedUsers = factures?.slice(startIndex, endIndex);

            return {
                users: slicedUsers,
                page: {
                    totalElements: factures?.length,
                    totalPages: Math.ceil(factures?.length / pageSize),
                },
            };
        };

        const back = fetchData();
        setTotalElements(back.page.totalElements);
        setTotalPages(back.page.totalPages);

        setPeople(
            back.users &&
                back.users.map((d) => ({
                    numero: <Name person={d} />,
                    dateCalcul: <DateCalcul person={d} />,
                    nomclient: <Nomclient person={d} />,
                    montant: <Title person={d} />,
                    status: <Active invoice={d} />,
                    // role: d.role,
                    edit: (
                        <div>
                            <button
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: '#D8D83D',
                                    border: 'none',
                                    marginLeft: '25px',
                                }}
                            >
                                <ViewBtn invoice={d} />
                            </button>
                        </div>
                    ),
                })),
        );
    }, [factures, page, search, sort]);
    return (
        <>
            <div>
                {' '}
                <div
                    style={{
                        float: 'right',
                    }}
                >
                    <button
                        onClick={() => {
                            handlecreateFacture();
                        }}
                        style={{
                            float: 'center',
                            width: '180px',
                            height: '40px',
                            borderRadius: '15px',
                            margin: '0 auto',
                            display: 'block',
                            fontWeight: 'bold',
                            marginLeft: '220px',
                            color: '#6B6D7C',
                            top: '20px',
                            left: '20px',
                            backgroundColor: '#D8D83D',
                            justifyContent: 'center',
                            marginRight:
                                '10px' /* Ajoute 10 pixels d'espace à droite de l'élément 1 */,
                        }}
                    >
                        Créer une facture
                    </button>
                </div>
                <TablePanel
                    titre="Liste des utilisateurs"
                    column={[
                        { name: 'name', label: 'Référence' },
                        { name: 'Date du calcul', label: 'Date du calcul' },
                        { name: 'nomclient', label: 'Nom du client' },
                        { name: 'montant', label: 'Montant' },

                        { name: 'status', label: 'Etat' },
                        // { name: '', label: '' },
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
                    entityName="Ajouter un utilisateur     "
                    // fields={userFields}
                    // onCreate={handleCreateUser}
                    selectdescription="**** Selectionner un role ****"
                />
            </div>
        </>
    );
};

export default FactureView;

const ViewBtn = ({ invoice }) => {
    let navigate = useNavigate();

    const handleViewFacture = (invoice) => {
        const queryString = `invoice=${encodeURIComponent(JSON.stringify(invoice))}`;

        navigate(`/app/detailFacture?${queryString}`);
    };
    return (
        <button
            type="button"
            onClick={() => handleViewFacture(invoice)}
            className="btn-link-primary"
        >
            <ViewfinderCircleIcon
                style={{
                    color: '#FFFFFF',
                    marginLeft: '5px',
                    width: '25px',
                    height: '30px',
                }}
            />
        </button>
    );
};
const Name = ({ person }) => {
    return (
        <div className="flex items-center">
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {person.invoiceNumber}
                </div>
            </div>
        </div>
    );
};
const Nomclient = ({ person }) => {
    return (
        <div className="flex items-center">
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {person.clientName}
                </div>
            </div>
        </div>
    );
};
const DateCalcul = ({ person }) => {
    return (
        <div className="flex items-center">
            <div className="ml-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {person.calculationDate}
                </div>
            </div>
        </div>
    );
};
const Title = ({ person }) => {
    return (
        <>
            <div className="text-sm text-gray-900 dark:text-gray-100">
                {person.totalTTC}$
            </div>
        </>
    );
};

const Active = ({ invoice }) => {
    const dispatch = useDispatch();

    const handleChangeStatus = () => {
        dispatch(setStatusOfInvoice(invoice));
    };

    return (
        <button
            onClick={handleChangeStatus}
            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                invoice.status === 'Validé'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
            }`}
        >
            {invoice.status === 'Validé' ? 'Validé' : 'En_Cours'}
        </button>
    );
};
