import { UserOutlined } from "@ant-design/icons"
import { otpSchema } from "../../../untils/validate";
import { message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { postOtpPassword } from "../../../sevices/candidate.sevices";
import { setCookie } from "../../../helpers/cookie";

function OtpPassword() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(otpSchema) });

    const onSubmit = async (data) => {
        console.log(data)
        setErrorMessage("");

        try {
            const response = await postOtpPassword({ otp: data.otp });

            if (response.code === 200) {
                setCookie("tokenCandidate", response.tokenCandidate, 1);
                navigate("/nguoi-tim-viec/reset/resetPassword");
            } else {
                setErrorMessage("Không nhận được phản hồi hợp lệ từ server");
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
export default OtpPassword;