import { Input } from "antd";
import SearchCity from "./SeachCity";
import { useState, useEffect} from "react";
import { getListCities } from "../../../sevices/candidate/city.sevices";
import { useNavigate, useLocation } from "react-router-dom";

function FormSearch({ defaultKeyword, defaultCity }) {
  const [dataCities, setDataCities] = useState([]);
  const [keyword, setKeyword] = useState(defaultKeyword || "");
  const [selectedCity, setSelectedCity] = useState(defaultCity ? defaultCity.split(",") : []);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const fetchApi = async () => {
      try {
        const cities = await getListCities();
        if (isMounted) {
          setDataCities(cities);
        }
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };
    fetchApi();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
    } 
    if (selectedCity.length > 0) {
      params.set("city", selectedCity.join(","));
    } else {
      params.delete("city");
    }
    navigate(`/search?${params.toString()}`);
  };
  const handleCityChange = (values) => {
    setSelectedCity(values);
    // const params = new URLSearchParams(location.search);
    // if (values.length > 0) {
    //   params.set("city", values.join(","));
    // } else {
    //   params.delete("city");
    // }
    // navigate(`/search?${params.toString()}`);
  };


  return (
    <>
      <div className="container">
        <form className="inner-search" onSubmit={handleSubmit}>
          <div className="search-suggestion">
            <Input
              placeholder="Nhập tên vị trí, công ty, từ khóa"
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="search-city">
            <SearchCity 
              dataCities={dataCities} 
              defaultValue={selectedCity} 
              onCityChange={handleCityChange} 
            />
          </div>
          <div className="search-button">
            <input type="submit" value="Tìm kiếm" />
          </div>
        </form>
      </div>
    </>
  );
}

export default FormSearch;
