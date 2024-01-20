import { PropTypes } from 'prop-types';

import TablePres from './TablePres';

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
const TablePanelPrestation = ({ column, rows, className }) => {
    return (
        <div className={className}>
            <TablePres data={{ column, rows }} />
        </div>
    );
};

export default TablePanelPrestation;

TablePanelPrestation.propTypes = {
    column: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            sortable: PropTypes.bool,
        }),
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string,
};
