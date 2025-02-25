import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";

function PrivateRoute() {
    const isLogin = getCookie("tokenCandidate"); 

    return isLogin ? <Outlet /> : <Navigate to="/nguoi-tim-viec/login" />;
}
export default PrivateRoute;