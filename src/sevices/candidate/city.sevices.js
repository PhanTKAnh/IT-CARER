import { get } from "../../untils/request";

// [GET] / cities
export const getListCities = async () =>{
    const result = await get("cities");
    return result;
}