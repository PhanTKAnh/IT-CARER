import { get } from "../../untils/request";

// [Patch] /employer/company/mark-potential/:idCandidate
export const getPotentialCandidates = async(tokenCompany) =>{
    const result = await get(`employer/company/potential-candidates`, tokenCompany);
    return result;
}