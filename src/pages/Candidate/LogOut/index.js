import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCookieByName } from "../../../helpers/cookie";

function LogOut() {
    const navigate = useNavigate();

    useEffect(() => {
        deleteCookieByName("refreshTokenCandidate");
        deleteCookieByName("tokenCandidate");

        navigate("/nguoi-tim-viec/login");
    }, [navigate]);

    return null;

}

export default LogOut;
