import React from 'react';
import { NavLink } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

function TagItem(props) {
  const { dataTag } = props;
  
  return (
    <>
      {dataTag.map((tag) => (
        <NavLink key={tag._id} to={`/search?tag=${tag.TagsName}`}>
          <div className="inner-card">
            <div className="inner-image">
              <img
                src={tag.thumbnail || "https://static.careerlink.vn/web/images/categories/1.svg"} // Sử dụng ảnh thumbnail hoặc ảnh mặc định nếu không có thumbnail
                alt={tag.TagsName} // Đảm bảo rằng alt là tên của tag
              />
            </div>
            <div className="inner-content">
              <p className="inner-text">{tag.TagsName}</p>
              <p className="inner-count">{tag.jobCount} việc làm</p>
            </div>
          </div>
        </NavLink>
      ))}
    </>
  );
}

export default TagItem;
