import { get, post } from "../../untils/request"

// [POST] /employer/company/register
export const postEmployer = async (options) =>{
    const result = await post("employer/company/register",options,null);
    return result;
}

// [POST] /employer/company/register
export const postLoginEmployer = async (options) =>{
    const result = await post("employer/company/login",options,null);
    return result;
}
// [GET] /employer/company/profileCompany
export const getProfieCandidate = async(token) =>{
    const result = await get("employer/company/profile", token);
    return result;
}
// [POST]  /employer/company/reset/forgotPassword
export const postAdminForgot = async (option) => {
    const result = await post("employer/company/reset/forgotPassword", option, null); 
    return result;
};
// [POST] /employer/company/reset/otpPassword
export const postAdminOtp = async (option) =>{
    const result = await post("employer/company/reset/otpPassword", option, null);
    return result;
}
// [POST]/employer/company/reset/resetPassword
export const  postAdminReset = async (option,token) =>{
    const result = await post("employer/company/reset/resetPassword", option, token);
    return result;
}