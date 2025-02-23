import { get } from "../untils/request";

export const getSearch = async (keyword, city, tag) => {
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword);
    if (city) {
        params.append("city", city);
    }
    if (tag) {
        params.append("tag", tag);
    }

    const result = await get(`search?${params.toString()}`);
    return result;
};
