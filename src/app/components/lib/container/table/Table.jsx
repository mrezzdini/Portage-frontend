import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

const Table = ({ data: { column, rows }, onSort }) => {
    console.log(column);
    console.log(rows);
    if (!column || !Array.isArray(rows)) {
        // Missing data, display an error message or a loading state
        return <div style={{ textAlign: 'center' }}>no data</div>;
    }
    return (
        <div className="overflow-x-auto">
            <div className="min-w-full">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <THeader column={column} onSort={onSort} />
                    <TBody rows={rows} />
                </table>
            </div>
        </div>
    );
};

Table.propTypes = {
    data: PropTypes.shape({
        column: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                sortable: PropTypes.bool,
            }),
        ).isRequired,
        rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    onSort: PropTypes.func,
};

const THeader = ({ column, onSort }) => {
    return (
        <thead className="bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr style={{ color: '#2E3249' }}>
                {column.map((data, index) => (
                    <Th data={data} key={index} onSort={onSort} />
                ))}
            </tr>
        </thead>
    );
};

const Th = ({ data, onSort }) => {
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

    return (
        <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
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
                <TRow key={index} row={row} />
            ))}
        </tbody>
    );
};

const TRow = ({ row }) => {
    return (
        <tr>
            {Object.values(row).map((value, index) => (
                <Td key={index} data={value} />
            ))}
        </tr>
    );
};
const Td = ({ data }) => {
    return <td style={{ height: '70px' }}>{data}</td>;
};

export default Table;
