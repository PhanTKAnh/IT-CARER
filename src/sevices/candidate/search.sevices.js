import { get } from "../../untils/request";

export const getSearch = async (filters,tokenCandidate) => {
    const params = new URLSearchParams();

    for( const key in filters){
        if(filters[key]){
            params.append(key, filters[key]);
        }
    }

    const result = await get(`search?${params.toString()}`,tokenCandidate);
    return result;
};
