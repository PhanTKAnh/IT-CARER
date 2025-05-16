import { EyeInvisibleOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../untils/validate";
import { setCookie } from "../../../helpers/cookie";
import { postLoginCandidate } from "../../../sevices/candidate/candidate.sevices";
import Swal from "sweetalert2";

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(loginSchema) });

    const onSubmit = async (data) => {
        setErrorMessage(""); // Reset error messages

        const option = {
            Email: data.Email,
            Password: data.Password
        };
        console.log(option);

        try {
            const response = await postLoginCandidate(option);
            if (response.code === 200) {
                // Set cookies on successful login
                setCookie("tokenCandidate", response.tokenCandidate, 60); // 1 hour
                setCookie("refreshTokenCandidate", response.refreshTokenCandidate, 30 * 24 * 60); // 30 days

                // Display success message with SweetAlert2
                Swal.fire({
                    title: "Đăng nhập thành công!",
                    icon: "success",
                    confirmButtonText: "OK"
                });

                // Redirect to homepage
                navigate("/");
            } else if (response.code === 401) {
                setErrorMessage("Sai email hoặc mật khẩu!");

                // Display error message with SweetAlert2
                Swal.fire({
                    title: "Lỗi!",
                    text: "Sai email hoặc mật khẩu!",
                    icon: "error",
                    confirmButtonText: "Thử lại"
                });
            }
        } catch (error) {
            setErrorMessage("Có lỗi xảy ra, vui lòng thử lại sau!");

            // Display error message with SweetAlert2
            Swal.fire({
                title: "Có lỗi xảy ra!",
                text: "Vui lòng thử lại sau!",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    const handlePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login__left">
                <h1 className="login__title">Xây dựng sự nghiệp Thành công cùng It Career</h1>
            </div>

            <div className="login__right">
                <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="login__form-title">Người tìm việc đăng nhập</h1>

                    <div className="login__input-box">
                        <input type="text" placeholder="Email" {...register("Email")} />
                        <i><UserOutlined /></i>
                        {errors.Email && <p className="login__error">{errors.Email.message}</p>}
                    </div>

                    <div className="login__input-box">
                        <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" {...register("Password")} />
                        <i onClick={handlePassword} style={{ cursor: "pointer" }}>
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </i>
                        {errors.Password && <p className="login__error">{errors.Password.message}</p>}
                    </div>

                    <div className="login__options">
                        <NavLink className="login__forgot-password" to="/nguoi-tim-viec/reset/forgotPassword">
                            Quên mật khẩu?
                        </NavLink>
                    </div>

                    {errorMessage && <p className="login__error">{errorMessage}</p>}

                    <button className="login__button" type="submit">Đăng nhập </button>

                    <p className="login__register">
                        Bạn chưa có tài khoản? <NavLink to="/nguoi-tim-viec/register"><b>Đăng ký</b></NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
