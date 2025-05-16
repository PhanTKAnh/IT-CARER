import { get, patch, post } from "../../untils/request";


// [GET] /employer/company/application
export const  applicationOfJob = async(slug,tokenCompany) =>{
    const result = await get(`employer/company/application/${slug}`,tokenCompany);
    return result;
}
// [GET] /employer/company/application
export const  applicationChangeStatus = async(idApplication,tokenCompany) =>{
    const result = await patch(`employer/company/application/changeStatus/${idApplication}`,{},tokenCompany);
    return result;
}
//[POST] /employer/company/application/sendEmail
export const  applicationSendEmail = async(options, tokenCompany) =>{
    const result = await post(`employer/company/application/sendEmail`, options,tokenCompany);
    return result;
}
// [GET] /employer/company/application/list?jobName=React&status=pending
export const getListApplication = async (tokenCompany, { jobName, status }) => {
    try {
      const result = await get("employer/company/application", tokenCompany, {
        params: { jobName, status }
      });
      return result;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách ứng tuyển:", error);
      throw error;
    }
  };
  
    