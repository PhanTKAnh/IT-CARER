import { get } from "../untils/request";

export const getListCities = async () =>{
    const result = await get("cities");
    return result;
}