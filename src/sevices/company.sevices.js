import { get } from "../untils/request"

// [GET] /companies
export const getListCompany =  async() =>{
    const result = await get("companies");
    return result;
}