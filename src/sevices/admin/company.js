import { get, patch } from "../../untils/request";

// [GET] /admin/companies
export const ListCompany =  async() =>{
    const result = await get("admin/company/list");
    return result;
};
// [GET] /admin/company/watch
export const getCompanyBySlug = async(slug) =>{
    const result = await get(`admin/company/watch/${slug}`);
    return result;
}
// [PATCH] /admin/company/update-status/:slugCompany
export const updateCompanyStatus = async(slug,newStatus) =>{
    const result = await patch(`admin/company/update-status/${slug}`, {
        Status: newStatus,
      },null);
    return result;
}
// [PATCH] /admin/company/deleted/:idCompany
export const deletedCompany = async(id) =>{
    const result = await patch(`admin/company/deleted/${id}`);
    return result;
}