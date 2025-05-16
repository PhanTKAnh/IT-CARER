import { get, post }  from "../../untils/request";
// [POST] /application
export const postApplication = async(option,token) =>{
const result = await post("application",option,token);
return result;
}

// [POST] /application/list
export const getApplication = async(token) =>{
    const result = await get("application/list",token);
    return result;
    }
    
    