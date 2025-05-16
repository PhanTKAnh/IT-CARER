import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EyeInvisibleOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import Swal from "sweetalert2"; // import SweetAlert2
import { useState } from "react";
import { postRegisterCandidate } from "../../../sevices/candidate/candidate.sevices";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../untils/validate";
import { setCookie } from "../../../helpers/cookie";

function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState({
    Password: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setErrorMessage(""); // Xóa lỗi cũ trước khi gửi request

    const option = {
      FullName: data.FullName,
      Email: data.Email,
      Password: data.Password,
    };

    try {
      const response = await postRegisterCandidate(option);
      if (response.code === 200) {
        // Lưu token vào cookie hoặc localStorage
        setCookie("tokenCandidate", response.tokenCandidate, 60); // 1 giờ (60 phút)
        setCookie("refreshTokenCandidate", response.refreshTokenCandidate, 30 * 24 * 60); // 30 ngày

        // Thông báo thành công với SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công!',
          text: 'Chào mừng bạn đến với hệ thống!',
        });

        navigate("/"); // Chuyển hướng sau khi đăng ký thành công
      } else {
        setErrorMessage(response.message || "Đăng ký thất bại, vui lòng thử lại!");
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: response.message || "Đăng ký thất bại, vui lòng thử lại!",
        });
      }
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra, vui lòng thử lại sau!");
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: "Có lỗi xảy ra, vui lòng thử lại sau!",
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
    <>
      <div className="container-register">
        <div className="inner-left">
          <h1> Xây dựng sự nghiệp Thành công cùng It Career</h1>
        </div>

        <div className="inner-right">
          <form className="register" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="login-title">Người tìm việc đăng ký</h1>

            <div className="login__input-box">
              <input type="text" placeholder="Họ và tên" {...register("FullName")} />
              <i> <UserOutlined /></i>
            </div>
            {errors.FullName && <p className="error">{errors.FullName.message}</p>}
            <div className="login__input-box">
              <input type="text" placeholder="Email" {...register("Email")} />
              <i> <UserOutlined /></i>
            </div>
            {errors.Email && <span className="error">{errors.Email.message}</span>}

            <div className="login__input-box">
              <input type={showPassword.Password ? "text" : "password"} placeholder="Mật khẩu" {...register("Password")} />
              <i onClick={() => togglePassword("Password")}> {showPassword.Password ? (<EyeOutlined />) : (<EyeInvisibleOutlined />)}</i>
            </div>
            {errors.Password && <span className="error">{errors.Password.message}</span>}

            <div className="login__input-box">
              <input type={showPassword.confirmPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu" {...register("confirmPassword")} />
              <i onClick={() => togglePassword("confirmPassword")}> {showPassword.confirmPassword ? (<EyeOutlined />) : (<EyeInvisibleOutlined />)}</i>
            </div>
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}

            {/* Hiển thị lỗi từ server */}
            {errorMessage && <p className="error">{errorMessage}</p>}

            <section className="remember-forgot-box"></section>

            <button type="submit" className="register-button">
              Đăng ký tài khoản người tìm việc
            </button>

            <h5 className="dont-have-an-account">
              Bạn là nhà tuyển dụng?
              <NavLink to={"/nha-tuyen-dung/register"}><b> Đăng ký nhà tuyển dụng</b></NavLink>
            </h5>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
