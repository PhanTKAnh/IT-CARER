import { getCookie, setCookie } from "../helpers/cookie";
import { postRefreshToken } from "../sevices/candidate.sevices"; 

export const getRefreshToken = async () => {
    let token = getCookie("tokenCandidate");

    if (!token) {
        const refreshTokenCandidate = getCookie("refreshTokenCandidate");
        if (refreshTokenCandidate) {
            try {
                const response = await postRefreshToken({ refreshTokenCandidate });
                if (response.code == 200) {
                    setCookie("tokenCandidate", response.tokenCandidate, 60);
                    return response.tokenCandidate; // Trả về token mới
                }
            } catch (error) {
                console.error("Làm mới token thất bại", error);
            }
        }
    }

    return token; // Trả về token (cũ hoặc mới)
};
