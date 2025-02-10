import { Input } from "antd";
import SearchCity from "./SeachCity";
import { useState,useEffect } from "react";
import { getListCities } from "../../../sevices/city.sevices";


function SearchInput() {
    const [dataCities,setDataCities] = useState([]);
    useEffect(()=>{
        const fetchApi = async () =>{
            const res = await getListCities();
            if(res){
                const objAll = {
                    _id: 0,
                    cityName: "ALL",
                };
                setDataCities([objAll,...res]);
            };
        };

        fetchApi();
    },[])
    return (
        <>
            <div className="container">
                <form className="inner-search">
                    <div className="search-suggestion">
                        <Input
                           placeholder="Nhập tên vị trí, công ty, từ khóa"
                        />
                    </div>
                    <div className="search-city">
                    <SearchCity dataCities={dataCities} />
                    </div>
                    <div className="search-button">
                        <input type="submit" value="Tìm kiếm" />
                    </div>

                </form>
            </div>
        </>
    )
};
export default SearchInput;