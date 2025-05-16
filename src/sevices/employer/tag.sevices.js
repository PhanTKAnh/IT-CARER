import { get } from "../../untils/request";

export const getTagList = async() =>{
    const result = await get("employer/company/tags");
    return result;
}; 