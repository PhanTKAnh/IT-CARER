import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearch } from "../../../sevices/search.sevices";
import { getListCities } from "../../../sevices/city.sevices";
import { getListCompany } from "../../../sevices/company.sevices";
import { getTagList } from "../../../sevices/tag.sevices";
import FilterSearch from "./filterSearch";
import SearchList from "../../../components/Candidate/JobsList";

function Search() {
  const [searchParams] = useSearchParams();
  const keywordSearch = searchParams.get("keyword") || "";
  const citySearch = searchParams.get("city") || "";
  const tagSearch = searchParams.get("tag") || "";

  const [jobsSearch, setJobsSearch] = useState([]);
  const [dataCity, setDataCity] = useState({});
  const [dataCompany, setDataCompany] = useState({});
  const [dataTag, setDataTag] = useState([]);

  // Fetch danh sách thành phố & công ty
  const fetchMetadata = async () => {
    const [cities, companies, tags] = await Promise.all([
      getListCities(),
      getListCompany(),
      getTagList(),
    ]);

    setDataTag(tags);

    const cityMap = cities.reduce((acc, city) => {
      acc[city._id] = city.CityName;
      return acc;
    }, {});
    setDataCity(cityMap);

    const companyMap = companies.reduce((acc, company) => {
      acc[company._id] = {
        CompanyName: company.CompanyName,
        avatar: company.avatar,
      };
      return acc;
    }, {});
    setDataCompany(companyMap);
  };

  // Fetch danh sách công việc
  const fetchJobs = async () => {
    const jobs = await getSearch(keywordSearch, citySearch, tagSearch);
    const updatedJobs = jobs.map(({ IdCompany, IdCity, ...job }) => ({
      ...job,
      company: {
        id: IdCompany,
        name: dataCompany[IdCompany] || {},
      },
      cities: IdCity?.map(cityId => ({
        id: cityId,
        name: dataCity[cityId] || "N/A",
      })) || [],
    }));
    setJobsSearch(updatedJobs);
  };

  useEffect(() => {
    fetchMetadata();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [keywordSearch, citySearch, tagSearch, dataCompany, dataCity]);

  return (
    <div className="container">
      {keywordSearch || citySearch || tagSearch ? (
        <>
          <FilterSearch dataTag={dataTag} />
          <div className="inner-result">
            <h4>Tuyển dụng việc làm {keywordSearch}</h4>
            <span>{jobsSearch.length}</span> việc làm
          </div>
          <div className="search-list">
            <SearchList jobsList={jobsSearch} />
          </div>
        </>
      ) : (
        <h1>Tìm kiếm việc nhanh</h1>
      )}
    </div>
  );
}

export default Search;
