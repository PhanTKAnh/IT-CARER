import { get } from "../../untils/request"
// [GET] /employer/company/dashboard
export const getDashboard = async (tokenCompany) =>{
    const result = await get("employer/company/dashboard",tokenCompany);
    return result;
}
