import { get } from "../untils/request";

export const getTagList = async() =>{
    const result = await get("tags");
    return result;
}; 