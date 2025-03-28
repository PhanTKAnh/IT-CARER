import { get, patch } from "../untils/request";

// [GET] /jobs
export const getListJob = async (tokenCandidate ) =>{
    const result = await get("jobs",tokenCandidate );
    return result;
}

// [GET] /jobs/detailJob/:slugJob
export const getDetailJob = async (slugJob,tokenCandidate) =>{
    const result = await get(`jobs/detailJob/${slugJob}`,tokenCandidate);
    return result;
}
// [GET] /jobs/similarJob/:slugJob
export const getSimilarJob = async (slugJob) =>{
    const result = await get(`jobs//similarJob/${slugJob}`);
    return result;
}
// [PATCH] /jobs/favorite/:typefavorite/:id
export const patchfavoriteJobs = async (typefavorite,id,token) =>{
    const result = await patch(`jobs/favorite/${typefavorite}/${id}`,{},token);
    return result;
}