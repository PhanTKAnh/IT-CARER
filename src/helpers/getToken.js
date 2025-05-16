import { getCookie, setCookie } from "../helpers/cookie";
import { postRefreshToken } from "../sevices/candidate/candidate.sevices"; 
import { postRefreshTokenCompany } from "../sevices/employer/company.sevice";

export const getRefreshToken = async () => {
    let token = getCookie("tokenCandidate");

    if (!token) {
        const refreshTokenCandidate = getCookie("refreshTokenCandidate");
        if (refreshTokenCandidate) {
            try {
                const response = await postRefreshToken({ refreshTokenCandidate });
                if (response.code === 200) {
                    setCookie("tokenCandidate", response.tokenCandidate, 60);
                    return response.tokenCandidate; 
                }
            } catch (error) {
                console.error("Làm mới token thất bại", error);
            }
        }
    }

    return token; // Trả về token (cũ hoặc mới)
};


export const getRefreshTokenCompany = async () => {
    let token = getCookie("tokenCompany");

    if (!token) {
        const refreshTokenCompany = getCookie("refreshTokenCompany");
        if (refreshTokenCompany) {
            try {
                const response = await postRefreshTokenCompany(refreshTokenCompany);
                if (response.code === 200) {
                    setCookie("tokenCompany", response.tokenCompany, 60);
                    return response.tokenCompany; 
                }
            } catch (error) {
                console.error("Làm mới token thất bại", error);
            }
        }
    }

    return token; 
};
