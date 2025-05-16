import { useEffect } from "react";
import { deleteCookieByName } from "../../../helpers/cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function LogEmployerOut() {
  const navigate = useNavigate();
  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: "Đăng xuất thành công!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      deleteCookieByName("refreshTokenCompany");
      deleteCookieByName("tokenCompany");
      navigate("/nha-tuyen-dung/login");

    });
  }, [navigate]);

  return null;
}

export default LogEmployerOut;
