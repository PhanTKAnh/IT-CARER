import { UserOutlined } from "@ant-design/icons"
import { otpSchema } from "../../../untils/validate";
import { message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../helpers/cookie";
import { postAdminOtp } from "../../../sevices/employer/company.sevice";

function OtpAdminPassword() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(otpSchema) });

    const onSubmit = async (data) => {
        setErrorMessage("");

        try {
            const response = await postAdminOtp({ otp: data.otp });

            if (response.code === 200) {
                setCookie("tokenCompany", response.tokenCompany, 60); // 1 giờ (60 phút)
                setCookie("refreshTokenCompany", response.refreshTokenCompany, 30 * 24 * 60); // 30 ngày
                navigate("/nha-tuyen-dung/reset/resetPassword");
            } else {
                setErrorMessage("OTP không hợp lệ!");
            }

        } catch (error) {
            setErrorMessage("Có lỗi xảy ra, vui lòng thử lại sau!");
            message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
    }
    return (
        <>
            <div className="container">
                <div className="container-password" >
                    <div className="reset-password">
                        <h1>Mã OTP đã được gửi qua mail có hiêuj lực trong 5 phút </h1>
                        <form className="send-email" onSubmit={handleSubmit(onSubmit)}>
                            <p>Hãy nhập mã otp để được đặt lại mật khẩu </p>
                            <section className="input-box">
                                <input type="text" placeholder="OTP" {...register("otp")} />
                                <i> <UserOutlined /></i>
                            </section>
                            {errors.otp && <span className="error">{errors.otp.message}</span>}
                            {errorMessage && <p className="error">{errorMessage}</p>}
                            <button className="send-button">Xác nhận </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OtpAdminPassword;