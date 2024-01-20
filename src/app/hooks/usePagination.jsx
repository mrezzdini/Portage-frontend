import { useMemo } from 'react';

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * usePagination hook: pagination logic.
 *
 * @param {number} totalRecords: total number of records
 * @param {number} pageSize: number of records per page
 * @param {number} siblingCount: number of sibling pages to show on each side of the current page
 * @param {number} currentPage: current page
 *
 * @returns {object} {currentPage, totalPages, pageNeighbours, hasNextPage, hasPreviousPage, goToNextPage, goToPreviousPage, goToPage, getPageNumbers}
 *
 * @author Peter Mollet
 */
export const usePagination = ({
    totalElements,
    pageSize,
    siblingCount = 1,
    currentPage,
    separator = '...',
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalElements / pageSize);
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, separator, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return [firstPageIndex, separator, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex + 1, rightSiblingIndex + 1);
            return [firstPageIndex, separator, ...middleRange, separator, lastPageIndex];
        }
    }, [totalElements, pageSize, siblingCount, currentPage]);

    return paginationRange;
};
