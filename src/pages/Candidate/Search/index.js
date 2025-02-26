import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearch } from "../../../sevices/search.sevices";
import FilterSearch from "./filterSearch";
import SearchList from "../../../components/Candidate/JobsList";
import internet from "../../../asset/image/Internet(1).jpg";
import { getTagList } from "../../../sevices/tag.sevices";

function Search() {
  const [searchParams] = useSearchParams();
  const [jobsSearch, setJobsSearch] = useState([]);
  const [dataTag, setDataTag] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const tags = await getTagList();
      setDataTag(tags);

      const searchParamsObject = Object.fromEntries([...searchParams]);
      const jobs = await getSearch(searchParamsObject);
      setJobsSearch(jobs);
    };

    fetchApi();
  }, [searchParams]); // Theo dõi toàn bộ searchParams, nếu có thay đổi thì fetch lại dữ liệu

  return (
    <div className="container">
      <>
        <FilterSearch dataTag={dataTag} />
        <div className="inner-result">
          <h4>Tuyển dụng việc làm {searchParams.get("keyword") || ""}</h4>
          <span>{jobsSearch.length}</span> việc làm
        </div>
        <div className="search-list">
          <div className="search-left">
            <SearchList jobsList={jobsSearch} />
          </div>
          <div className="search-right">
            <div className="search-image">
              <img src={internet} alt="Search banner" />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Search;
