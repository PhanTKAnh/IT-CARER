import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { changePasswordSchema } from "../../../untils/validate";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { getCookie } from "../../../helpers/cookie";
import { changePassword } from "../../../sevices/employer/company.sevice";
import Swal from "sweetalert2"; 

function SettingAcountCompany() {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
    const tokenCompany = getCookie("tokenCompany");
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    setErrorMessage("");

    const option = {
      newPassword: data.newPassword,
      oldPassword: data.oldPassword,
    };

    try {
      const response = await changePassword(option, tokenCompany);

      if (response.code === 200) {
        Swal.fire({
          title: "Thành công!",
          text: "Mật khẩu đã được cập nhật thành công! 🎉",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset()
      } else {
        setErrorMessage(response.message || "Cập nhật thất bại, vui lòng thử lại!");
        // Thông báo thất bại
        Swal.fire({
          title: "Lỗi!",
          text: response.message || "Cập nhật thất bại, vui lòng thử lại!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra, vui lòng thử lại sau!");
      // Thông báo lỗi
      Swal.fire({
        title: "Lỗi!",
        text: "Có lỗi xảy ra, vui lòng thử lại sau!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="employer-change-container">
      <h2 className="employer-change-title">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="employer-change-form">
        <label className="employer-change-label">Mật khẩu hiện tại</label>
        <div className="employer-change-group">
          <input
            type={showPassword.oldPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu cũ"
            {...register("oldPassword")}
          />
          <i onClick={() => togglePassword("oldPassword")}>
            {showPassword.oldPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </i>
        </div>
        {errors.oldPassword && <p className="error">{errors.oldPassword.message}</p>}
        <label className="employer-change-label">Mật khẩu mới</label>
        <div className="employer-change-group">
          <input
            type={showPassword.newPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            {...register("newPassword")}
          />
          <i onClick={() => togglePassword("newPassword")}>
            {showPassword.newPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </i>
        </div>
        {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}
        <label className="employer-change-label">Xác nhận mật khẩu mới</label>
        <div className="employer-change-group">
          <input
            type={showPassword.confirmPassword ? "text" : "password"}
            placeholder="Nhập lại mật khẩu"
            {...register("confirmPassword")}
          />
          <i onClick={() => togglePassword("confirmPassword")}>
            {showPassword.confirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </i>
        </div>
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        {errorMessage && <p className="employer-change-message">{errorMessage}</p>}
        <button type="submit" className="employer-change-btn">
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
}

export default SettingAcountCompany;
