import { get } from "../untils/request";

// [GET] /jobs
export const getListJob = async () =>{
    const result = await get("jobs");
    return result;
}
// [GET] /jobs/company/:idCompany
export const getCompanyJobs = async (idCompany) =>{
    const result = await get(`jobs/company/${idCompany}`);
    return result;
}