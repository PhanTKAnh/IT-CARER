import React from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function TagItem(props) {
  const { dataTag, countJobs } = props;
  return (
    <>
      {dataTag.map((tag) => (
          <NavLink key={tag._id} to={`/search?tag=${tag.TagsName}`}>
            <div className="inner-card">
              <div className="inner-image">
                <img
                  src="https://static.careerlink.vn/web/images/categories/1.svg"
                  alt="Tag"
                />
              </div>
              <div className="inner-content">
                <p className="inner-text">{tag.TagsName}</p>
                <p className="inner-count">{countJobs[tag._id] ?? 0} việc làm</p>
              </div>
            </div>
          </NavLink>
        ))
      }
    </>
  );
}

export default TagItem;
