import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../../helpers/cookie";

function LogOut() {
    const navigate = useNavigate();
    deleteAllCookies(); 
    useEffect(() => {
        
        navigate("/");       
    }, [navigate]);      

    return null; 
}

export default LogOut;
