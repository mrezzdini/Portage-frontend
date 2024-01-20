import 'react-toastify/dist/ReactToastify.css';

import { FolderArrowDownIcon, FolderIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    deleteDocument,
    downloadDocument,
    fetchDocuments,
} from '../../actions/documentActions';
import { createFolder } from '../../actions/folderActions';
import withAuth from './../../common/withAuth';
import PanelDocument from './../../components/lib/container/table/PanelDocument';
const DocumentView = () => {
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(null);
    const dispatch = useDispatch();
    const { documents } = useSelector((state) => state.document);
    console.log(documents);
    useEffect(() => {
        dispatch(fetchDocuments());
    }, [dispatch]);
    function fetchData() {
        const pageSize = 3;
        const startIndex = 1;
        const endIndex = startIndex + pageSize;
        let filteredDocuments = documents;

        if (search) {
            filteredDocuments = documents.filter((document) =>
                document.filename.includes(search),
            );
        }

        let sortedDocuments = filteredDocuments;

        const slicedDocuments = sortedDocuments.slice(startIndex, endIndex);
        const totalElements = filteredDocuments.length;
        const totalPages = Math.ceil(totalElements / pageSize);

        return {
            documents: slicedDocuments,
            page: { totalElements, totalPages },
        };
    }
    const downloadDocumentf = (id, name, type) => {
        console.log(id);
        dispatch(downloadDocument(id, name, type));
    };
    const [nameFolder, setNameFolder] = useState(null);
    const handleSelectFolder = (e) => {
        setNameFolder(e.target.value);
        console.log(e.target.value);
    };
    const [docId, setDocId] = useState(null);
    const deleteDocumenthandle = (id) => {
        setDocId(id);
        dispatch(deleteDocument(id));
    };
    useEffect(() => {
        const back = fetchData(page, sort, search);
        setTotalElements(back.page.totalElements);
        setTotalPages(back.page.totalPages);
        setPeople(
            documents &&
                documents
                    .filter((d) => d.folder.name === nameFolder)
                    .map((d) => {
                        return {
                            name: <Name folder={d} />,
                            edit: (
                                <div>
                                    {' '}
                                    <button
                                        onClick={() =>
                                            downloadDocumentf(
                                                d.id,
                                                d.filename,
                                                d.fileType,
                                            )
                                        }
                                    >
                                        <DownloadBtn /> {/* Ajout d'un espace */}
                                    </button>
                                    <button onClick={() => deleteDocumenthandle(d.id)}>
                                        <DeleteBtn /> {/* Ajout d'un espace */}
                                    </button>
                                </div>
                            ),
                        };
                    }),
        );
    }, [page, search, sort, documents, nameFolder, docId]);
    const handleCreateFolder = (folderData) => {
        dispatch(createFolder(folderData));
        // Logique de création d'un utilisateur avec les données userData
        console.log("Création d'un folder:", folderData);
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
    return (
        <div className=" border-y ">
            <PanelDocument
                column={[
                    { name: 'name', label: 'Name', sortable: true },
                    { name: 'actions', label: 'Actions' },
                ]}
                rows={people}
                onSearch={(values) => {
                    setSearch(values.search);
                    setPage(0);
                }}
                onSort={(values) => {
                    setSort(values);
                    setPage(0);
                }}
                totalElements={totalElements}
                pageSize={2}
                totalPages={totalPages}
                onPageChange={setPage}
                currentPage={page}
                setCurrentPage={setPage}
                IconName={FolderIcon}
                classNameIcon="h-6 w-6 text-gray-500"
                style={{ color: 'white' }}
                data="hello boutta"
                entityName="Créer un dossier"
                fields={userFields}
                onCreate={handleCreateFolder}
                onChange={handleSelectFolder}
            />
        </div>
    );
};

const DeleteBtn = () => (
    <button type="button" className="btn-link-primary">
        <TrashIcon class="h-6 w-6 text-gray-500" />
    </button>
);
const DownloadBtn = () => (
    <button type="button" className="btn-link-primary">
        <FolderArrowDownIcon class="h-6 w-6 text-gray-500" />
    </button>
);
const Name = ({ folder }) => {
    return (
        <div className="flex items-center">
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {folder.filename}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {folder.creationDate}
                </div>
            </div>
        </div>
    );
};

export default withAuth(DocumentView);
