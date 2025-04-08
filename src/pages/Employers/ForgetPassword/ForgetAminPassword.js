import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postAdminForgot } from "../../../sevices/employer/company.sevice";

// Schema validate chỉ kiểm tra email
const forgotPasswordSchema = yup.object().shape({
    Email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
});

function ForgetAminPassword() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

    const onSubmit = async (data) => {
        setErrorMessage("");

        try {
            const response = await postAdminForgot({ email: data.Email });

            if (response.code === 200) {
                navigate("/nha-tuyen-dung/reset/otpPassword");
            } else {
                setErrorMessage("Không nhận được phản hồi hợp lệ từ server");
            }
        } catch (error) {
            setErrorMessage("Có lỗi xảy ra, vui lòng thử lại sau!");
            message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
    };

    return (
        <div className="container">
            <div className="container-password">
                <div className="reset-password">
                    <h1>Quên mật khẩu cho người tìm việc</h1>
                    <form className="send-email" onSubmit={handleSubmit(onSubmit)}>
                        <p>Hãy nhập email để chúng tôi gửi bạn mã OTP</p>
                        <section className="input-box">
                            <input type="text" placeholder="Email" {...register("Email")} />
                            <i><UserOutlined /></i>
                        </section>
                        {errors.Email && <span className="error">{errors.Email.message}</span>}
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <button type="submit" className="send-button">Xác nhận</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgetAminPassword;
