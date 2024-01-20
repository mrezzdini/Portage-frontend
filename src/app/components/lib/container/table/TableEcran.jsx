import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

const TableEcran = ({ data: { column, rows }, onSort }) => {
    console.log(column);
    console.log(rows);
    if (!column || !Array.isArray(rows)) {
        // Missing data, display an error message or a loading state
        return <div style={{ textAlign: 'center' }}>no data</div>;
    }
    return (
        <div className="mx-6 mt-10 overflow-x-auto rounded-lg">
            <div className="min-w-full">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <THeader column={column} onSort={onSort} />
                    <TBody rows={rows} />
                </table>
            </div>
        </div>
    );
};

TableEcran.propTypes = {
    data: PropTypes.shape({
        column: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                sortable: PropTypes.bool,
                color: PropTypes.string.isRequired, // Added color prop
            }),
        ).isRequired,
        rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    onSort: PropTypes.func,
};

const THeader = ({ column, onSort }) => {
    return (
        <thead className="bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr style={{ color: '#545452' }}>
                {column.map((data, index) => (
                    <Th
                        data={data}
                        key={index}
                        columnIndex={index} // Pass columnIndex to Th component
                        onSort={onSort}
                    />
                ))}
            </tr>
        </thead>
    );
};

const Th = ({ data, onSort, columnIndex }) => {
    const sorted = data.sortable;
    const [sort, setSort] = useState('');

    const handleSort = () => {
        if (sort === 'asc') setSort('desc');
        else if (sort === 'desc') setSort('asc');
        else setSort('desc');
    };

    useEffect(() => {
        if (sorted && data.name && sort) onSort({ name: data.name, direction: sort });
    }, [sort]);

    const color = columnIndex % 2 === 0 ? '#ECEDF8' : '#FAFAFA';
    const textColor = columnIndex === 0 ? '#2E3249' : '#6E7397';

    const thStyle = {
        backgroundColor: color,
        color: textColor,
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '19px',
        letterSpacing: '0em',
        textAlign: 'center',
    };

    return (
        <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium  tracking-wider"
            style={thStyle}
        >
            {sorted && data.name && (
                <button
                    className={`mr-1 ${sort === 'asc' ? 'rotate-180 transform' : ''}`}
                    onClick={handleSort}
                >
                    <ChevronDownIcon className="h-3 w-3" />
                </button>
            )}
            {data.label}
        </th>
    );
};

const TBody = ({ rows }) => {
    return (
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-700">
            {rows.map((row, index) => (
                <TRow key={index} row={row} index={index} />
            ))}
        </tbody>
    );
};

const TRow = ({ row, index }) => {
    const rowStyle = {
        backgroundColor: index === 0 ? '#DBDCE3' : '',
    };
    return (
        <tr style={rowStyle}>
            {Object.entries(row).map(([key, value], columnIndex) => (
                <Td
                    key={columnIndex}
                    data={value}
                    columnIndex={columnIndex}
                    rowIndex={index}
                />
            ))}
        </tr>
    );
};

const Td = ({ data, columnIndex, rowIndex }) => {
    const color = columnIndex % 2 === 0 ? '#ECEDF8' : '#FAFAFA';

    const tdStyle = {
        backgroundColor: color,
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '19px',
        letterSpacing: '0em',
        textAlign: 'center',
    };

    return (
        <td
            className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300"
            style={tdStyle}
        >
            {data}
        </td>
    );
};

export default TableEcran;
