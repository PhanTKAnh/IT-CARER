import { DownOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FilterSearch(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { dataTag } = props;

  const getTagsFormURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tag') ? params.get('tag').split(',') : [];
  }
  const [selectedTags, setSelectedTags] = useState(getTagsFormURL);

  useEffect(() => {
    // Cập nhật URL khi selectedTags thay đổi
    const params = new URLSearchParams(location.search);
    if (selectedTags.length > 0) {
      params.set('tag', selectedTags.join(','));
    } else {
      params.delete('tag');
    }
    navigate(`/search?${params.toString()}`, { replace: true });
  }, [selectedTags, navigate, location.search]);

  const handleOnclick = () => {
    const dropdown = document.querySelector('#filter');
    if (dropdown) {
      dropdown.classList.toggle('drop-show');
    }
  };

  const handleCheckboxChange = (item) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(item.TagsName)) {
        return prevTags.filter(tag => tag !== item.TagsName);
      } else {
        return [...prevTags, item.TagsName];
      }
    });
  };

  return (
    <>
      <button onClick={handleOnclick} className="inner-filter">
        <p>
          <UnorderedListOutlined /> <span> Ngôn ngữ </span><DownOutlined />
        </p>
      </button>
      <div id="filter" className="dropdown-content">
        {dataTag?.map((item) => (
          <div key={item._id}>
            <label htmlFor={`tag-${item._id}`}>
              <input
                type="checkbox"
                id={`tag-${item._id}`}
                name="tag"
                checked={selectedTags.includes(item.TagsName)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item.TagsName}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default FilterSearch;
