import { PropTypes } from 'prop-types';

import Pagination from './Pagination';
import Searchbar from './Searchbar';
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
 *
 * @author Peter Mollet
 */
const TablePanel = ({
    column,
    rows,
    onSearch,
    onSort,
    totalElements,
    pageSize,
    totalPages,
    onPageChange,
    className,
    currentPage,
    setCurrentPage,
}) => {
    return (
        <div className={className}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Searchbar onSearch={onSearch} />
            
            </div>
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
    );
};

export default TablePanel;

TablePanel.propTypes = {
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
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    onclick:PropTypes.func
};
