import { get } from "../../untils/request";

// Lấy token từ cookie một lần

export const listCandidate = async (tokenAdmin) => {
    const result = await get("admin/candidate", tokenAdmin);
    return result;
};
