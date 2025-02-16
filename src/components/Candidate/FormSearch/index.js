import { Input } from "antd";
import SearchCity from "./SeachCity";
import { useState,useEffect } from "react";
import { getListCities } from "../../../sevices/city.sevices";
import { useNavigate } from "react-router-dom"


function FormSearch(props) {
     const { defaultKeyword, defaultCity } = props;
    const [dataCities,setDataCities] = useState([]);
    const [keyword, setKeyword] = useState(defaultKeyword ? defaultKeyword :"");
    const [selectedCity,setSelectedCity] = useState( defaultCity ? defaultCity.split(",") : []);
    const navigate = useNavigate();

    
    useEffect(()=>{
        const fetchApi = async () =>{
            const cities = await getListCities();
            if(cities){
                setDataCities(cities);
            };
        };

        fetchApi();
    },[]);
    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate(`/search?keyword=${keyword}&city=${selectedCity}`)
    }
    const handleCityCHange = (values) =>{
        setSelectedCity(values);
    }
    
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
                    <SearchCity dataCities={dataCities} defaultValue={selectedCity} onCityChange={handleCityCHange} />
                    </div>
                    <div className="search-button">
                        <input type="submit" value="Tìm kiếm" />
                    </div>

                </form>
            </div>
        </>
    )
};
export default FormSearch;