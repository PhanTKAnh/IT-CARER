import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { employerLoginSchema } from "../../../untils/validate";
import { postLoginAdmin } from "../../../sevices/admin/user.sevies";
import { setCookie } from "../../../helpers/cookie";

const LoginAdmin = () => {
    const [showPassword, setShowPassword] = useState(false);
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
            email: data.Email,
            password: data.Password,
        }; 

        Swal.fire({
            title: "Đang đăng nhập...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const response = await postLoginAdmin(options);
            if (response.code === 200) {
                setCookie("tokenAdmin", response.tokenAdmin, 60);
                setCookie("refreshTokenAdmin", response.refreshTokenAdmin, 30 * 24 * 60);
                reset();
                Swal.fire({
                    icon: "success", 
                    title: "Đăng nhập thành công!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                setTimeout(() => {
                    navigate("/admin/dashboard");
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

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
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
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu"
                        autoComplete="current-password"
                        {...register("Password")}
                    />
                    <i onClick={togglePassword}>
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </i>
                    {errors.Password && <span className="error">{errors.Password.message}</span>}
                </div>

                <button className="employer-login__button" type="submit">
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

export default LoginAdmin;
