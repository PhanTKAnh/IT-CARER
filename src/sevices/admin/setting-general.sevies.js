import { get, patch } from "../../untils/request";

export const getSettingGeneral = async (tokenAdmin) => {
    const result = await get(`admin/setting-ganeral/`,tokenAdmin);
    return result;
}
// [PATCH]
export const settingGeneral = async (option,tokenAdmin) => {
    const result = await patch(`admin/setting-ganeral/update`,option, tokenAdmin);
    return result;
}