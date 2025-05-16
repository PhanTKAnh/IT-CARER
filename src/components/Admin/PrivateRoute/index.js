import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";

function PrivateRouteAdmin() {
    const tokenAdmin = getCookie("tokenAdmin");
    
    return tokenAdmin? <Outlet /> : <Navigate to="/admin/login"/>;
}
export default PrivateRouteAdmin;