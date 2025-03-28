import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";

function PrivateRoute() {
    const tokenCandidate = getCookie("tokenCandidate");
    
    return tokenCandidate ? <Outlet /> : <Navigate to="/nguoi-tim-viec/login"  />;
}
export default PrivateRoute;