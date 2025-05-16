import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { changePasswordSchema } from "../../../untils/validate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { patchChangePassword } from "../../../sevices/candidate/candidate.sevices";
import { getCookie } from "../../../helpers/cookie";
import Swal from "sweetalert2"; 

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const tokenCandidate = getCookie("tokenCandidate");

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
      const response = await patchChangePassword(option, tokenCandidate);

      if (response.code === 200) {
        // Thông báo thành công
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
    <div className="container-pass">
      <h1 className="title">Thay đổi mật khẩu</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Mật khẩu hiện tại */}
          <div className="form-group">
            <label>
              Mật khẩu hiện tại <span className="required">*</span>
            </label>
            <section className="input-box">
              <input
                type={showPassword.oldPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu cũ"
                {...register("oldPassword")}
              />
              <i onClick={() => togglePassword("oldPassword")}>
                {showPassword.oldPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </i>
            </section>
            {errors.oldPassword && <p className="error">{errors.oldPassword.message}</p>}
          </div>

          {/* Mật khẩu mới */}
          <div className="form-group">
            <label>
              Mật khẩu mới <span className="required">*</span>
            </label>
            <section className="input-box">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                {...register("newPassword")}
              />
              <i onClick={() => togglePassword("newPassword")}>
                {showPassword.newPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </i>
            </section>
            {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}
          </div>

          {/* Nhập lại mật khẩu */}
          <div className="form-group">
            <label>
              Gõ lại mật khẩu mới <span className="required">*</span>
            </label>
            <section className="input-box">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                {...register("confirmPassword")}
              />
              <i onClick={() => togglePassword("confirmPassword")}>
                {showPassword.confirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </i>
            </section>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit" className="btn-submit">
            Cập nhật mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
