import React, { useState } from "react";
function TableEmployer({ headers = [], data = [], actions = [], itemsPerPage = 10, onStatusToggle }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header.label}</th>
            ))}
            {actions.length > 0 && <th>Thao tác</th>}
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={headers.length + (actions.length > 0 ? 1 : 0)} className="no-data">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            currentData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex}>
                    {header.key === "index"
                      ? startIndex + rowIndex + 1
                      : header.key === "Status" ? (
                        <span
                          className={`status-tag ${row[header.key]}`}
                          onClick={() => onStatusToggle(row.slug, row[header.key])}
                          style={{ cursor: "pointer" }}
                        >
                          {row[header.key]}
                        </span>
                      ) : (
                        row[header.key]
                      )}
                  </td>

                ))}
                {actions.length > 0 && (
                  <td>
                    {actions.map((action, i) => (
                      <button
                        key={i}
                        className={`action-btn ${action.className}`}
                        onClick={() => action.onClick(row)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TableEmployer;
