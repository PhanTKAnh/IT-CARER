import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";

function PrivateEmployerRoute() {
    const tokenCompany = getCookie("tokenCompany");
    
    return tokenCompany ? <Outlet /> : <Navigate to="/nha-tuyen-dung/login"  />;
}
export default PrivateEmployerRoute;