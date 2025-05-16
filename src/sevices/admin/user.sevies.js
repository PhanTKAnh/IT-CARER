import { post } from "../../untils/request";

export const postLoginAdmin = async ( values) => {
    const result = await post(`admin/user/login`, values); 
    return result;  
};
 