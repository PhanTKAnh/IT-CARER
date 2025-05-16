import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearch } from "../../../sevices/candidate/search.sevices";
import FilterSearch from "./filterSearch";
import SearchList from "../../../components/Candidate/JobsList";
import { getTagList } from "../../../sevices/candidate/tag.sevices";
import { getCookie } from "../../../helpers/cookie";

function Search() {
  const [searchParams] = useSearchParams();
  const [jobsSearch, setJobsSearch] = useState([]);
  const [dataTag, setDataTag] = useState([]);
  const tokenCandidate = getCookie("tokenCandidate");


  useEffect(() => {
    const fetchApi = async () => {
      const tags = await getTagList();
      setDataTag(tags);

      const searchParamsObject = Object.fromEntries([...searchParams]);
      const jobs = await getSearch(searchParamsObject,tokenCandidate);
      setJobsSearch(jobs);
    };

    fetchApi();
  }, [searchParams,tokenCandidate ]); 

  return (
    <div className="container"> 
      <>
        <div className="inner-result">
        <FilterSearch dataTag={dataTag} />
          <h4>Tuyển dụng việc làm {searchParams.get("keyword") || ""}</h4>
          <span>{jobsSearch.length}</span> việc làm
        </div>
        <div className="search-list">
          <div className="search-left">
            <SearchList jobsList={jobsSearch} tokenCandidate={tokenCandidate}/>
          </div>
          <div className="search-right">
            <div className="search-image">
              <img src={"https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-recruitment-looking-for-a-bull-poster-background-image_200940.jpg"} alt="Search banner" />
            </div>
             <div className="search-image">
              <img src={"https://inchatluongcao.vn/wp-content/uploads/2021/07/in-chat-luong-cao-tuyen-dung.jpg"} alt="Search banner" />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Search;
