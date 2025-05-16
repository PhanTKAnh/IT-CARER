import { get, patch, post } from "../../untils/request";

export const ListRole = async (tokenAdmin) => {
    const result = await get("admin/roles",tokenAdmin); 
    return result;
}
export const createRole = async (option,tokenAdmin) => {
    const result = await post("admin/roles/create", option,tokenAdmin);  
    return result;
}
export const getRoleBySlug = async (slug,tokenAdmin) => {
    const result = await get(`admin/roles/detail/${slug}`,tokenAdmin);  
    return result;
}
export const editRole = async (slug, values,tokenAdmin) => {
    const result = await patch(`admin/roles/edit/${slug}`, values,tokenAdmin); 
    return result;
};

export const updatePermissions = async (permissions,tokenAdmin) => {
    const result = await patch("admin/roles/permissions", { permissions },tokenAdmin);  
    return result;
}
