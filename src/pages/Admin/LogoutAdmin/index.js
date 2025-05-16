import { useEffect } from "react";
import { deleteCookieByName } from "../../../helpers/cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function LogoutAdmin() {
  const navigate = useNavigate();
  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: "Đăng xuất thành công!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      deleteCookieByName("refreshTokenAdmin");
      deleteCookieByName("tokenAdmin");
      navigate("/admin/login");

    });
  }, [navigate]);

  return null;
}

export default LogoutAdmin;
