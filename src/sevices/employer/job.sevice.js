import { get, patch, post } from "../../untils/request"
// [GET] /employer/company/listJobs
export const getListJobs = async (tokenCompany) =>{
    const result = await get("employer/company/job/listJobs",tokenCompany);
    return result;
}
// [PATCH] /employer/company/update-status/:slugJob
export const updateJobStatus = async (slug, newStatus,tokenCompany) =>{
        const result = await patch(`employer/company/job/update-status/${slug}`, {
            Status: newStatus,
          },tokenCompany);
        return result;
}
// [PATCH] /employer/company/deleted/:idCompany
export const deletedJob = async (idJob, tokenCompany) => {
  const result = await patch(`employer/company/job/deleted/${idJob}`, {}, tokenCompany);
  return result;
};
// [GET] /employer/company/watch/:slugJob
export const watchJob = async (slug,tokenCompany) => {
  const result = await get(`employer/company/job/watch/${slug}`, tokenCompany);
  return result;
};
// [POST] /employer/company/createJob
export const createJob = async (options,tokenCompany) => {
  const result = await post(`employer/company/job/createJob`,options, tokenCompany);
  return result;
};
// [POST] /employer/company/createJob
export const updateJob = async (slug,options,tokenCompany) => {
  const result = await patch(`employer/company/job/updateJob/${slug}`,options, tokenCompany);
  return result;
};