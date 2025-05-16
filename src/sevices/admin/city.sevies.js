import { get, patch, post } from "../../untils/request";

export const ListCity = async(tokenAdmin)=>{
        const result = await get("admin/city/list",tokenAdmin);
        return result;
}
export const createCity = async(option,tokenAdmin)=>{
    const result = await post("admin/city/create",option,tokenAdmin);
    return result;
}
export const deletedCity = async(id,tokenAdmin)=>{
    const result = await patch(`admin/city/delete/${id}`,{},tokenAdmin);
    return result;
}