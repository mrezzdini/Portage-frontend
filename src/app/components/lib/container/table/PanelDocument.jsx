import { FolderIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFolders } from '../../../../actions/folderActions';
import SelectComponent from '../components/SelectComponent';
import UploadComponent from '../components/UploadComponent';
import FolderViewModal from './FolderViewModal';
import Pagination from './Pagination';
// import Searchbar from './Searchbar';
import Table from './Table';
/**
 * Generic component Table panel,
 * with a table a search,
 * the sort,
 * the pagination,
 *
 * @param {array} column: REQUIRED - array representing the header of the table. With {label: String, name: String, sortable: Boolean}
 * @param {array} rows: REQUIRED - array of data to display in the Table. With the same order as the column array.
 * @param {function} onSearch: REQUIRED - function to call when the search is triggered
 * @param {function} onSort: REQUIRED if sortable is used - function to call when the sort is triggered
 * @param {number} totalElements: REQUIRED - total number of elements
 * @param {number} pageSize: REQUIRED - number of elements per page
 * @param {number} totalPages: REQUIRED - total number of pages
 * @param {function} onPageChange: REQUIRED - function to call when page changes
 * @param {number} currentPage: REQUIRED - current page
 * @param {function} setCurrentPage: REQUIRED - function to call when page changes
 * @param {string} className: OPTIONAL - className of the main div
 * @param {string} IconName: OPTIONAL - name of the icon
 * @param {string} classNameIcon: OPTIONAL - className of the icon
 * @param {object} style: OPTIONAL - inline style for the icon
 * @param {string} entityName: OPTIONAL - name of the entity
 * @param {array} fields: OPTIONAL - array representing the fields
 * @param {function} onCreate: OPTIONAL - function to call when creating an entity
 * @param {function} onChange: OPTIONAL - function to call when the select component value changes
 *
 * @author Peter Mollet
 */
const PanelDocument = ({
    column,
    rows,
    onSort,
    IconName,
    classNameIcon,
    style,
    entityName,
    fields,
    onCreate,
    onChange,
    // onSearch,
    totalElements,
    pageSize,
    totalPages,
    onPageChange,
    currentPage,
    setCurrentPage,
}) => {
    console.log(rows);
    const [folderId, setFolderId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFolders());
    }, [dispatch]);

    const folders = useSelector((state) => state.folder.folders);

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setFolderId(value);
        console.log(folderId);
        console.log(value);
        onChange(e);
    };

    return (
        <div>
            <div style={{ display: 'grid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <FolderViewModal
                            icon={FolderIcon}
                            className={classNameIcon}
                            style={style}
                            entityName="Gestion des dossiers"
                        />
                    </div>
                    <div>
                        <UploadComponent
                            icon={IconName}
                            className={classNameIcon}
                            style={style}
                            entityName={entityName}
                            fields={fields}
                            onCreate={onCreate}
                        />
                    </div>
                </div>
            </div>
            <br></br>
            <div style={{ display: 'grid' }}>
                <SelectComponent
                    options={folders}
                    onChange={handleSelectChange}
                    entityName="dossier"
                    className="form-control"
                />{' '}
                {/* <Searchbar onSearch={onSearch} /> */}
                <br></br>
                <Table data={{ column, rows }} onSort={onSort} />
                <Pagination
                    totalElements={totalElements}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default PanelDocument;

PanelDocument.propTypes = {
    column: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            sortable: PropTypes.bool,
        }),
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSearch: PropTypes.func.isRequired,
    onSort: PropTypes.func,
    totalElements: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    IconName: PropTypes.string,
    classNameIcon: PropTypes.string,
    style: PropTypes.object,
    entityName: PropTypes.string,
    fields: PropTypes.array,
    onCreate: PropTypes.func,
    onChange: PropTypes.func,
};
