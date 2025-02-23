import { get } from "../untils/request"

// [GET] /companies
export const getListCompany =  async() =>{
    const result = await get("companies");
    return result;
};

// [GET] /companies/:slugCompany
export const getCompanyDetail = async(slugCompany) =>{
    const result = await get(`companies/${slugCompany}`);
    return result;
};