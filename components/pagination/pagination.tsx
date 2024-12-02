import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './pagination.css';
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1} className="pagination-button">
                <FaChevronLeft />
            </button>
            <span className="pagination-info">
                Página {currentPage} de {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination-button">
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
