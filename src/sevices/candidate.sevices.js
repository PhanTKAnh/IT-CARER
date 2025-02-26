import { get, post } from "../untils/request"

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
    const result = await get("candidate/profie", token);
    return result;
}