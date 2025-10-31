import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const handleFirst = () => onPageChange(1);
  const handlePrev = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));
  const handleLast = () => onPageChange(totalPages);

  return (
    <div className="pagination">
      <div className="pagination-controls">
        <button onClick={handleFirst} disabled={currentPage === 1}>
          İlk
        </button>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Geri
        </button>

        <span className="page-info">
          Sayfa {currentPage} / {totalPages}
        </span>

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          İleri
        </button>
        <button onClick={handleLast} disabled={currentPage === totalPages}>
          Son
        </button>
      </div>

      <div className="page-size-selector">
        <label htmlFor="pageSize">Sayfa başına:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;