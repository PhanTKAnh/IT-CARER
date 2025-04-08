import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { message } from "antd";
import { setCookie } from "../../../helpers/cookie";
import { postLoginEmployer } from "../../../sevices/employer/company.sevice";
import { employerLoginSchema } from "../../../untils/validate";

function LoginEmployer() {
    const [showPassword, setShowPassword] = useState({
        Password: false,
    });
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(employerLoginSchema),
    });

    const onSubmit = async (data) => {

        setErrorMessage("");
        const options =
        {
            Email: data.Email,
            Password: data.Password
        }
        try {
            const response = await postLoginEmployer(options);
            console.log(response)
            if (response.code === 200) {
                setCookie("tokenCompany", response.tokenCompany, 60);
                setCookie("refreshTokenCompany", response.refreshTokenCompany, 30 * 24 * 60);
                message.success("Đăng nhập thành công!");
                reset();
            } else {
                setErrorMessage("Sai email hoặc mật khẩu.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
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
                    <label className="employer-login__label" htmlFor="email">Email</label>
                    <input
                        className="employer-login__input"
                        type="email"
                        id="Email"
                        name="Email"
                        placeholder="Nhập email"
                        autoComplete="Email"

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
                {errorMessage && <p className="login__error">{errorMessage}</p>}

                <button className="employer-login__button" type="submit">
                    Đăng nhập
                </button>
            </form>
            <p className="employer-login__register">
                Chưa có tài khoản? <NavLink to={"/nha-tuyen-dung/register"}>Đăng ký ngay</NavLink>
            </p>
        </div>
    );
}

export default LoginEmployer;
