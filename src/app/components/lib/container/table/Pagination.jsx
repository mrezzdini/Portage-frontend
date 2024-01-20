import {
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
} from '@heroicons/react/24/solid';
import { PropTypes } from 'prop-types';
import { Fragment, useEffect } from 'react';

import { usePagination } from './../../../../hooks/usePagination';

/**
 * Generic component to display a pagination
 *
 * @param {number} pageSize: REQUIRED - number of elements per page
 * @param {number} totalElements: REQUIRED - total number of elements
 * @param {number} totalPage: REQUIRED - total number of pages
 * @param {function} onPageChange: REQUIRED - function to call when page changes
 * @example  <Pagination
                totalElements={dataBackEnd.page.totalElements}
                pageSize={dataBackEnd.page.pageSize}
                totalPages={dataBackEnd.page.totalPages}
                onPageChange={setPage}
            />
 * @author Peter Mollet
 */
const Pagination = ({
    pageSize,
    totalElements,
    totalPages,
    onPageChange,
    currentPage,
    setCurrentPage,
}) => {
    useEffect(() => {
        if (onPageChange) onPageChange(currentPage);
    }, [currentPage]);

    if (totalPages === 1) return null;
    return (
        <div
            className="mt-1 flex items-center justify-between rounded-md mx-6 
            border-t border-gray-200 bg-white px-4 py-3 shadow dark:border-gray-750 dark:bg-gray-700 sm:px-6"
        >
            <div className="flex flex-1 justify-between sm:hidden">
                <MobilePagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <FullPagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default Pagination;

Pagination.propTypes = {
    pageSize: PropTypes.number.isRequired,
    totalElements: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

const FullPagination = ({
    currentPage,
    pageSize,
    totalPages,
    totalElements,
    setCurrentPage,
}) => {
    const pageBtns = usePagination({
        currentPage,
        totalElements,
        pageSize,
        separator: <EllipsisHorizontalIcon className="h-5 w-5" />,
    });

    const renderButton = (onClick, disabled, content) => {
        const isNumber = typeof content === 'number';
        const isCurrentPage = isNumber && content === currentPage + 1;
        return (
            <button
                style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid',
                    paddingTop: '1px',
                    paddingBottom: '1px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#6B7280',
                    zIndex: isCurrentPage ? '50' : 'auto',
                    borderColor: isCurrentPage ? '#E5E7EB' : '#D1D5DB',
                    backgroundColor: isCurrentPage ? '#D8D83D' : '#FFFFFF',
                    textColor: isCurrentPage ? '#D8D83D' : '#6B7280',
                    darkBorderColor: isCurrentPage ? '#1F2937' : '#4B5563',
                    darkTextColor: isCurrentPage ? '#D1D5DB' : '#6B7280',
                    paddingLeft: isNumber ? '0.75rem' : '0.25rem',
                    paddingRight: isNumber ? '0.75rem' : '0.25rem',
                }}
                onClick={onClick}
                disabled={isCurrentPage || disabled}
            >
                {content}
            </button>
        );
    };

    return (
        <>
            <div>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                    résultats{' '}
                    <span className="font-medium">{currentPage * pageSize + 1}</span> à{' '}
                    <span className="font-medium">
                        {currentPage === totalPages
                            ? totalElements
                            : currentPage * pageSize + pageSize}
                    </span>{' '}
                    sur <span className="font-medium">{totalElements}</span>
                </p>
            </div>
            <div>
                <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                >
                    {renderButton(
                        () => setCurrentPage(currentPage - 1),
                        currentPage === 0,
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />,
                        true,
                    )}
                    {pageBtns.map((content, index) => (
                        <Fragment key={index}>
                            {renderButton(
                                () => setCurrentPage(content - 1),
                                typeof content !== 'number',
                                content,
                            )}
                        </Fragment>
                    ))}

                    {renderButton(
                        () => setCurrentPage(currentPage + 1),
                        currentPage + 1 === totalPages,
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />,
                        false,
                        true,
                    )}
                </nav>
            </div>
        </>
    );
};

const MobilePagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const renderButton = (onClick, name, disabled) => (
        <button
            className={`relative inline-flex items-center rounded-md 
                    border border-gray-300 bg-white px-4 py-2 
                    text-sm font-medium text-gray-600 hover:bg-gray-50
                    ${disabled && 'bg-gray-100 text-gray-500 hover:bg-gray-100'}`}
            onClick={onClick}
            disabled={disabled}
        >
            {name}
        </button>
    );

    return (
        <>
            {renderButton(
                () => setCurrentPage(currentPage - 1),
                'précédent',
                currentPage === 0,
            )}
            {renderButton(
                () => setCurrentPage(currentPage + 1),
                'suivant',
                currentPage + 1 === totalPages,
            )}
        </>
    );
};
