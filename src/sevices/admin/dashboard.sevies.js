import { get } from "../../untils/request";

export const Dashboard= async(tokenAdmin)=>{
        const result = await get("admin/dashboard",tokenAdmin);
        return result;
}
