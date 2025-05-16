import { get, patch, post } from "../../untils/request";

export const ListTag = async (tokenAdmin) => {
        const result = await get("admin/tag/list",tokenAdmin);
        return result;
}
// [POST]
export const CreateTag = async (dataToSend,tokenAdmin) => {
        const result = await post("admin/tag/create", dataToSend, tokenAdmin);
        return result;
}
// [GET]
export const getTagDetails = async (slugTag,tokenAdmin) => {
        const result = await get(`admin/tag/watch/${slugTag}`, tokenAdmin);
        return result;
}
// [POST]
export const updateTag = async (id,dataToSend,tokenAdmin) => {
        const result = await patch(`admin/tag/edit/${id}`, dataToSend, tokenAdmin);
        return result;
}
// [PATCH]
export const changeStatus = async (slug,status,tokenAdmin) => {
        const result = await patch(`admin/tag/change-status/${slug}`, { status }, tokenAdmin);
        return result;
}
// [PATCH]
export const deletedTag = async (id,tokenAdmin) => {
        const result = await patch(`admin/tag/delete/${id}`, {}, tokenAdmin);
        return result;
}