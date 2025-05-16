import { get, patch, post } from "../../untils/request"

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
export const getProfileCompany = async(token) =>{
    const result = await get("employer/company/profileCompany", token);
    return result;
}
 // [PATCH] /employer/company/profileCompany
export const patchProfileCompany = async(options,token) =>{
    const result = await patch("employer/company/profileCompany",options, token);
    return result;
}
// [POST]  /employer/company/reset/forgotPassword
export const postForgot = async (option) => {
    const result = await post("employer/company/reset/forgotPassword", option, null); 
    return result;
};
// [POST] /employer/company/reset/otpPassword
export const postOtp = async (option) =>{
    const result = await post("employer/company/reset/otpPassword", option, null);
    return result;
}
// [POST]/employer/company/reset/resetPassword
export const  postReset = async (option,token) =>{
    const result = await post("employer/company/reset/resetPassword", option, token);
            console.log( token)

    return result;
}
// [PATCH]/employer/company/change-password
export const  changePassword = async (option,token) =>{
    const result = await patch("employer/company/change-password", option, token);
    return result;
}

 
// [GET]/employer/company/getRefreshTokenCompany
export const postRefreshTokenCompany = async(refreshTokenCompany) => {
    const result = await post("employer/company/refresh-token", { refreshTokenCompany }, null);
    return result;
  };
  