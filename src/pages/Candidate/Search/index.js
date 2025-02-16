import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearch } from "../../../sevices/search.sevices";
import SearchList from "./searchList";
import { getListCities } from "../../../sevices/city.sevices";
import { getListCompany } from "../../../sevices/company.sevices";

function Search() {
  const [searchParams] = useSearchParams();
  const keywordSearch = searchParams.get("keyword") || "";
  const citySearch = searchParams.get("city") || "";
  const [jobsSearch, setJobsSearch] = useState([]);
  const [dataCity, setDataCity] = useState({});
  const [dataCompany, setDataCompany] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const jobs = await getSearch(keywordSearch, citySearch);
      const cities = await getListCities();
      const companies = await getListCompany();

      const dataCity = cities.reduce((acc, city) => {
        acc[city._id] = city.CityName;
        return acc;
      }, {});
      setDataCity(dataCity);

      const dataCompany = companies.reduce((acc, company) => {
        acc[company._id] = {
          CompanyName: company.CompanyName,
          avatar: company.avatar
        };
        return acc;
      }, {});
      
      setDataCompany(dataCompany);

      const updatedJobs = jobs.map(({ IdCompany, IdCity, ...job }) => ({
        ...job,
        company: {
          id: IdCompany,
          name: dataCompany[IdCompany]
        },
        cities: IdCity?.map(cityId => ({
          id: cityId,
          name: dataCity[cityId]
        }))
      }));
      setJobsSearch(updatedJobs);

    };
    fetchApi();
  }, [keywordSearch, citySearch]);

  console.log(jobsSearch);

  return (
    <div className="container">
      {keywordSearch || citySearch ? (
        <>
          <div className="inner-result">
            <h4>Tuyển dụng việc làm {keywordSearch}</h4>
            <span>{jobsSearch.length}</span> việc làm
          </div>
          <div className="search-list">
            <SearchList jobsSearch = {jobsSearch} />
          </div>
        </>
      ) : (
        <h1>Tìm kiếm việc nhanh</h1>
      )}
    </div>

  );
}

export default Search;
