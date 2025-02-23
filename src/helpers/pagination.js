export const getTotalPages = (totalItems, pageSize) => {
    return Math.ceil(totalItems / pageSize) || 1; // Tránh lỗi chia 0
};

export const handleNextPage = (page, totalPages, setPage) => {
    if (page < totalPages) {
        setPage(prev => prev + 1);
    }
};

export const handlePrevPage = (page, totalPages, setPage) => {
    if (page > 1) {
        setPage(prev => prev - 1);
    }
};
