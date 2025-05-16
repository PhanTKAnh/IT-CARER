import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { setCookie } from "../../../helpers/cookie";
import { postLoginEmployer } from "../../../sevices/employer/company.sevice";
import { employerLoginSchema } from "../../../untils/validate";
import Swal from "sweetalert2";

function LoginEmployer() {
    const [showPassword, setShowPassword] = useState({
        Password: false,
    });

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(employerLoginSchema),
    });

    const onSubmit = async (data) => {
        const options = {
            Email: data.Email,
            Password: data.Password,
        };

        // Hiện thông báo loading
        Swal.fire({
            title: "Đang đăng nhập...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const response = await postLoginEmployer(options);

            if (response.code === 200) {
                setCookie("tokenCompany", response.tokenCompany, 60); 
                setCookie("refreshTokenCompany", response.refreshTokenCompany, 30 * 24 * 60);
                reset();

                Swal.fire({
                    icon: "success",
                    title: "Đăng nhập thành công!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    navigate("/nha-tuyen-dung/dashboard");
                }, 100);
                
             
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Sai email hoặc mật khẩu.",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Đã có lỗi xảy ra!",
                text: "Vui lòng thử lại sau.",
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
        <div className="employer-login">
            <h2 className="employer-login__title">Đăng Nhập</h2>
            <form className="employer-login__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="employer-login__form-group">
                    <label className="employer-login__label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="employer-login__input"
                        type="email"
                        id="Email"
                        name="Email"
                        placeholder="Nhập email"
                        autoComplete="email"
                        {...register("Email")}
                    />
                    {errors.Email && <span className="error">{errors.Email.message}</span>}
                </div>

                <div className="register-form__group login__input-box">
                    <input
                        type={showPassword.Password ? "text" : "password"}
                        placeholder="Mật khẩu"
                        autoComplete="current-password"
                        {...register("Password")}
                    />
                    <i onClick={() => togglePassword("Password")}>
                        {showPassword.Password ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </i>
                    {errors.Password && <span className="error">{errors.Password.message}</span>}
                </div>

                <div className="login__options">
                    <NavLink className="login__forgot-password" to="/nha-tuyen-dung/reset/forgotPassword">
                        Quên mật khẩu?
                    </NavLink>
                </div>

                <button className="employer-login__button" type="submit">
                    Đăng nhập
                </button>
            </form>

            <p className="employer-login__register">
                Chưa có tài khoản? <NavLink to="/nha-tuyen-dung/register">Đăng ký ngay</NavLink>
            </p>
        </div>
    );
}

export default LoginEmployer;
