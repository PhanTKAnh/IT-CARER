import { get, post,patch } from "../../untils/request"

// [POST] /candidate/register
export const postRegisterCandidate = async(option) =>{
const result = await post("candidate/register",option);
return result;
}

// [POST] /candidate/login
export const postLoginCandidate = async(option) =>{
    const result = await post("candidate/login",option);
    return result;
}

// [GET] / candidate/profie
export const getProfieCandidate = async(token) =>{
    const result = await get("candidate/profile", token);
    return result;
}
// [POST] /candidate/reset/forgotPassword
export const postForgotPassword = async (option) => {
    const result = await post("candidate/reset/forgotPassword", option, null); 
    return result;
};
// [POST] /candidate/reset/otpPassword
export const postOtpPassword = async (option) =>{
    const result = await post("candidate/reset/otpPassword", option, null);
    return result;
}
// [POST] /candidate/reset/otpPassword
export const postResetPassword = async (option,token) =>{
    const result = await post("candidate/reset/resetPassword", option, token);
    return result;
}
// [POST] /candidate/login
export const postRefreshToken = async( refreshToken) =>{
    const result = await post("candidate/refresh-token", refreshToken, null);
    return result;
}
// [POST] /candidate/change-password 
export const patchChangePassword = async( option,token) =>{
    const result = await patch("candidate/change-password", option,token );
    return result;
}
// [PATCH] /candidate/change-password 
export const updateCandidateProfile = async( option,token) =>{
    const result = await patch("candidate/profile", option,token );
    return result;
}


