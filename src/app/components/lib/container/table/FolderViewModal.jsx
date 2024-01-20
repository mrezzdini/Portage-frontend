import { FolderPlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createFolder, deleteFolder } from '../../../../actions/folderActions';
import Modal from '../ModalF';
import Icon from './Icon';
import TablePanel from './TablePanelM';

const FolderViewModal = ({ icon: IconComponent, className, style, entityName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(null);
    const { folders } = useSelector((state) => state.folder);
    const dispatch = useDispatch();

    function fetchData(page, sort, search) {
        const pageSize = 3;
        const startIndex = page * pageSize;
        const endIndex = startIndex + pageSize;
        const filteredFolders = search
            ? folders.filter((folder) => folder.name.includes(search))
            : folders;
        const sortedFolders = sort
            ? filteredFolders.sort((a, b) => a[sort] - b[sort])
            : filteredFolders;
        const slicedFolders = sortedFolders.slice(startIndex, endIndex);
        const totalElements = sortedFolders.length;
        const totalPages = Math.ceil(totalElements / pageSize);

        return { folders: slicedFolders, page: { totalElements, totalPages } };
    }

    useEffect(() => {
        const back = fetchData(page, sort, search);
        setTotalElements(back.page.totalElements);
        setTotalPages(back.page.totalPages);
        setPeople(
            back.folders.map((d) => ({
                name: <Name folder={d} />,
                edit: (
                    <div>
                        <button onClick={() => deleteFolderhandle(d.id)}>
                            <DeleteBtn />
                        </button>
                    </div>
                ),
            })),
        );
    }, [page, search, sort, folders]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const userFields = [
        { name: 'name', label: 'Nom', type: 'text', placeholder: 'Nom' },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            placeholder: 'Description',
        },
    ];

    const handleCreateFolder = (folderData) => {
        dispatch(createFolder(folderData));
        console.log("Création d'un folder:", folderData);
    };
    const deleteFolderhandle = (id) => {
        dispatch(deleteFolder(id));
        console.log("Création d'un folder:", id);
    };

    return (
        <div>
            <button
                className="btn btn-yellow rounded rounded-r-md bg-primary px-3 text-indigo-200 focus:outline-none hover:bg-primary-dark"
                onClick={openModal}
            >
                <Icon icon={IconComponent} className={className} style={style} />
            </button>

            <Modal isOpen={isOpen} close={closeModal} title={entityName}>
                <TablePanel
                    column={[
                        { name: 'name', label: 'Name', sortable: true },
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
                    IconName={FolderPlusIcon}
                    classNameIcon="h-6 w-6 text-gray-500"
                    style={{ color: 'white', width: '50px' }}
                    entityName="Créer un dossier"
                    fields={userFields}
                    onCreate={handleCreateFolder}
                />
            </Modal>
        </div>
    );
};

export default FolderViewModal;

const DeleteBtn = () => (
    <button type="button" className="btn-link-primary">
        <TrashIcon className="h-6 w-6 text-gray-500" />
    </button>
);

const Name = ({ folder }) => {
    return (
        <div className="flex items-center">
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {folder.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {folder.description}
                </div>
            </div>
        </div>
    );
};
