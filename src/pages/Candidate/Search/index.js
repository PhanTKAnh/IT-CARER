import { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { getSearch } from "../../../sevices/search.sevices";
import FilterSearch from "./filterSearch";
import SearchList from "../../../components/Candidate/JobsList";
import internet from "../../../asset/image/Internet(1).jpg"
import { getTagList } from "../../../sevices/tag.sevices";

function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keywordSearch = searchParams.get("keyword") || "";
  const citySearch = searchParams.get("city") || "";
  const tagSearch = searchParams.get("tag") || "";

  const [jobsSearch, setJobsSearch] = useState([]);
  const [dataTag, setDataTag] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const tags = await getTagList();
      setDataTag(tags);
      const jobs = await getSearch(keywordSearch, citySearch, tagSearch);
      setJobsSearch(jobs);
    };
    fetchApi();
  }, [keywordSearch, citySearch, tagSearch]);
  // useEffect(() => {
  //   if (!keywordSearch && !citySearch && !tagSearch) {
  //     navigate("/search/list");
  //   }
  // }, [keywordSearch, citySearch, tagSearch, navigate]);
  return (
    <div className="container">
      { 
        <>
          <FilterSearch dataTag={dataTag} />
          <div className="inner-result">
            <h4>Tuyển dụng việc làm {keywordSearch}</h4>
            <span>{jobsSearch.length}</span> việc làm
          </div>
          <div className=" search-list">
           <div className="search-left"> <SearchList jobsList={jobsSearch} /></div>
           <div className="search-right">
            <div className="search-image">
              <img src={internet} />
            </div>
           </div>
          </div>
        </>
     }
    </div>
  );
}

export default Search;
