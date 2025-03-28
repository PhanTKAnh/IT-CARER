import { get } from "../untils/request";

// [GET]/favorite
export const getFavoriteJobs = async (token) =>{
    const result = await get("favorite",token);
    return result;
}