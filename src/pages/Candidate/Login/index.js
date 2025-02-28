import { EyeInvisibleOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../untils/validate";
import { message } from "antd";
import { setCookie } from "../../../helpers/cookie";
import { postLoginCandidate } from "../../../sevices/candidate.sevices";

function Login() {
    const navigate = useNavigate(); // Sửa lỗi useNavigate
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
                setCookie("tokenCandidate", response.tokenCandidate, 1);
                navigate("/");
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
        <div className="container-login">
            <div className="inner-left">
                <h1> Xây dựng sự nghiệp Thành công cùng It Career</h1>
            </div>

            <div className="inner-right">
                <form className="login" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="login-title">Người tìm việc đăng nhập</h1>

                    {errors.FullName && <p className="error">{errors.FullName.message}</p>}

                    <section className="input-box">
                        <input type="text" placeholder="Email" {...register("Email")} />
                        <i> <UserOutlined /></i>
                    </section>
                    {errors.Email && <span className="error">{errors.Email.message}</span>}

                    <section className="input-box">
                        <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" {...register("Password")} />
                        <i onClick={handlePassword}> {showPassword ? (<EyeOutlined />) : (<EyeInvisibleOutlined />)}</i>
                    </section>
                    {errors.Password && <span className="error">{errors.Password.message}</span>}
                    
                    <section className="remember-forgot-box">
                        <NavLink className="forgot-password" to={"/nguoi-tim-viec/reset/forgotPassword"}>
                            <h5>Quên mật khẩu?</h5>
                        </NavLink>
                    </section>


                    {errorMessage && <p className="error">{errorMessage}</p>}


                    <button className="login-button">Login</button>

                    <h5 className="dont-have-an-account">
                        Don't have an account?
                        <NavLink to={"/nguoi-tim-viec/register"} ><b> Register</b></NavLink>
                    </h5>
                </form>
            </div>
        </div>
    );
}

export default Login;
