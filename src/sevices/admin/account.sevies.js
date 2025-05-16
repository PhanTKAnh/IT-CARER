import { get, patch, post } from "../../untils/request";
export const getListAccount = async (tokenAdmin) => {
    const result = await get("admin/account",tokenAdmin);  
    return result;  
};

export const createAccount = async (option,tokenAdmin) => {
    const result = await post("admin/account/create", option,tokenAdmin);  
    return result;  
};

export const getAccountById = async (slug,tokenAdmin) => {
    const result = await get(`admin/account/${slug}`,tokenAdmin);  
    return result;  
};

export const editAccount = async (slug, values,tokenAdmin) => {
    const result = await patch(`admin/account/edit/${slug}`, values,tokenAdmin);  
    return result;  
};
