import { useState } from "react";

const SearchFilter = ({ onStatusChange, onChange, searchValue }) => {
  const [activeStatus, setActiveStatus] = useState("");

  const handleClick = (status) => {
    setActiveStatus(status);
    if (onStatusChange) {
      onStatusChange(status);
    }
  };

  return (
    <div className="search-filter">
      <div className="search-filter__header">Bộ lọc tìm kiếm</div>
      <div className="search-filter__body">
        <div className="search-filter__row">
          <div className="search-filter__buttons">
            <button
              className={`search-filter__button ${activeStatus === '' ? 'search-filter__button--active' : ''}`}
              onClick={() => handleClick('')}
            >
              Tất cả
            </button>
            <button
              className={`search-filter__button ${activeStatus === 'active' ? 'search-filter__button--active' : ''}`}
              onClick={() => handleClick('active')}
            >
              Hoạt động
            </button>
            <button
              className={`search-filter__button ${activeStatus === 'inactive' ? 'search-filter__button--active' : ''}`}
              onClick={() => handleClick('inactive')}
            >
              Không hoạt động
            </button>
          </div>
          <div className="search-filter__form">
            <form id="form-search" onSubmit={(e) => e.preventDefault()}>
              <div className="search-filter__input-group">
                <input
                  className="search-filter__input"
                  type="text"
                  placeholder="Nhập từ khóa"
                  name="keyword"
                  value={searchValue} 
                  onChange={onChange} 
                />
                <button className="search-filter__submit" type="submit">Tìm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
