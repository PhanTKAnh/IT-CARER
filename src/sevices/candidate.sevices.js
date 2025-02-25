import { post } from "../untils/request"

export const postRegisterCandidate = async(option) =>{
const result = await post("candidate/register",option);
return result;
}