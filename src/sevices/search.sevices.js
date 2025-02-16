import { get } from "../untils/request"

export const getSearch = async (keyword,city) =>{
    const result = await get(`search?keyword=${keyword}&city=${city}`);
    return result;
}