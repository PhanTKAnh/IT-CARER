import { get, patch } from "../../untils/request";

// [GET] /admin/companies
export const ListCompany =  async(tokenAdmin) =>{
    const result = await get("admin/company/list",tokenAdmin);
    return result;
};
// [GET] /admin/company/watch
export const getCompanyBySlug = async(slug,tokenAdmin) =>{
    const result = await get(`admin/company/watch/${slug}`,tokenAdmin);
    return result;
}
// [PATCH] /admin/company/update-status/:slugCompany
export const updateCompanyStatus = async(slug,newStatus,tokenAdmin) =>{
    const result = await patch(`admin/company/update-status/${slug}`, {
        Status: newStatus,
      },tokenAdmin);
    return result;
}
// [PATCH] /admin/company/deleted/:idCompany
export const deletedCompany = async(id,tokenAdmin) =>{
    const result = await patch(`admin/company/deleted/${id}`,tokenAdmin);
    return result;
}
// [PATCH] /admin/company/approve/:slugCompany
export const approveCompanyAccount = async (slugCompany, status, tokenAdmin) => {
    const result = await patch(`admin/company/approve/${slugCompany}`, { status }, tokenAdmin);
    return result;
  };
  