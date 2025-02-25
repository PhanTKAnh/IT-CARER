import { get } from "../untils/request";

// [GET] /jobs
export const getListJob = async () =>{
    const result = await get("jobs");
    return result;
}