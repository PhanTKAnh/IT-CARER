import { EyeInvisibleOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../untils/validate";
import { message } from "antd";
import { setCookie } from "../../../helpers/cookie";
import { postLoginCandidate } from "../../../sevices/candidate/candidate.sevices";

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
        setErrorMessage("");

        const option = {
            Email: data.Email,
            Password: data.Password
        };

        try {
            const response = await postLoginCandidate(option);
            if (response.code === 200) {
                setCookie("tokenCandidate", response.tokenCandidate, 60); 
                setCookie("refreshTokenCandidate", response.refreshTokenCandidate, 30 * 24 * 60); 
                message.success("Đăng nhập thành công!");
                navigate("nha-tuyen-dung/dashbroad");
            } else if (response.code === 401) {
                setErrorMessage("Sai email hoặc mật khẩu!");
            }
        } catch (error) {
            setErrorMessage("Có lỗi xảy ra, vui lòng thử lại sau!");
            message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
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

                    <button className="login__button" type="submit">Login</button>

                    <p className="login__register">
                        Don't have an account? <NavLink to="/nguoi-tim-viec/register"><b>Register</b></NavLink>
                    </p>
                </form>

            </div>
        </div>

    );
}

export default Login;
