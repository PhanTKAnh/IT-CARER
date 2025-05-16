import { get, patch, post } from "../../untils/request";

// [Patch] /employer/company/mark-potential/:idCandidate
export const getPotentialCandidate  = async( tokenCompany) =>{
    const result = await get(`employer/company/potential-candidates`,tokenCompany);
    return result;
}
// [Patch] employer/company/potential-candidates/addPotential
export const markAsPotentialCandidate = async(options, tokenCompany) =>{
    const result = await post(`employer/company/potential-candidates/addPotential`, options,tokenCompany);
    return result;
}
// [Patch] employer/company/potential-candidates/deletePotential/:id
export const deletePotentialCandidate = async(idCandidate, tokenCompany) =>{
    const result = await patch(`employer/company/potential-candidates/deletePotential/${idCandidate}`, {},tokenCompany);
    return result;
}
