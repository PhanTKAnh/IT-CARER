import { get } from "../../untils/request";

// [GET] / cities
export const getListCities = async () =>{
    const result = await get("employer/company/cities");
    return result;
}