import { yupResolver } from "@hookform/resolvers/yup";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resetPasswordSchema } from "../../../untils/validate"; 
import { getCookie } from "../../../helpers/cookie";
import { message } from "antd";
import { postResetPassword } from "../../../sevices/candidate.sevices";

function ResetPassword() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const tokenCandidate = getCookie("tokenCandidate"); 

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(resetPasswordSchema), 
    });

    const onSubmit = async (data) => {
        setErrorMessage("");

        if (data.Password !== data.confirmPassword) {
            setErrorMessage("Mật khẩu nhập lại không khớp!");
            return;
        }

        const option = { Password: data.Password };

        try {
            const response = await postResetPassword(option, tokenCandidate); 
            if (response.code === 200) {
                message.success("Đặt lại mật khẩu thành công!");
                navigate("/");
            } else {
                setErrorMessage(response.message || "Đặt lại mật khẩu thất bại!");
            }
        } catch (error) {
            setErrorMessage("Có lỗi xảy ra, vui lòng thử lại sau!");
            message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
    };

    return (
        <>
            <div className="container">
                <div className="container-password">
                    <div className="reset-password">
                        <h1>Mã OTP đã được gửi qua mail, có hiệu lực trong 5 phút</h1>
                        <form className="send-email" onSubmit={handleSubmit(onSubmit)}>
                            <p>Hãy nhập mật khẩu mới để đặt lại</p>

                            <section className="input-box">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mật khẩu"
                                    {...register("Password")}
                                />
                                <i onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </i>
                            </section>
                            {errors.Password && <span className="error">{errors.Password.message}</span>}

                            <section className="input-box">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Nhập lại mật khẩu"
                                    {...register("confirmPassword")}
                                />
                                <i onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </i>
                            </section>
                            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}

                            {errorMessage && <p className="error">{errorMessage}</p>}

                            <button className="send-button">Xác nhận</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
