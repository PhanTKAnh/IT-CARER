import { get, patch, post } from "../../untils/request";

export const createAppointment = async (options,tokenCompany ) =>{
    const result = await post("employer/company/interviews/create", options,tokenCompany);
    return result;
}
 export const getAllInterviews = async(tokenCompany) =>{
    const result = await get("employer/company/interviews",tokenCompany);
    return result;
 }
 export const cancelInterview = async (idInterview,tokenCompany ) =>{
    const result = await patch(`employer/company/interviews/cancel-interview/${idInterview}`, {},tokenCompany);
    return result;
}