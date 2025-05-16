import { UserOutlined } from "@ant-design/icons";
import { otpSchema } from "../../../untils/validate";
import { message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { postOtp } from "../../../sevices/employer/company.sevice";

function OtpAdminPassword() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(otpSchema) });

    const onSubmit = async (data) => {
        setErrorMessage("");  // Reset lỗi cũ
 
        try {
            const response = await postOtp({ otp: data.otp });
            console.log(response )
            if (response.code === 200) {
                // Truyền token sang trang ResetPassword qua state
                navigate("/nha-tuyen-dung/reset/resetPassword", {
                    state: { tokenCompany: response.tokenCompany ,
                        refreshTokenCompany: response.refreshTokenCompany
                    }, 
                });
                message.success("OTP hợp lệ, vui lòng đặt lại mật khẩu.");
            } else {
                setErrorMessage("Mã OTP không hợp lệ hoặc đã hết hạn.");
                message.error("Mã OTP không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.");
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
                    <h1>Mã OTP đã được gửi qua mail và có hiệu lực trong 5 phút</h1>
                    <form className="send-email" onSubmit={handleSubmit(onSubmit)}>
                        <p>Hãy nhập mã OTP để được đặt lại mật khẩu</p>
                        <section className="input-box">
                            <input type="text" placeholder="OTP" {...register("otp")} />
                            <i><UserOutlined /></i>
                        </section>
                        {errors.otp && <span className="error">{errors.otp.message}</span>}
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <button className="send-button">Xác nhận</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OtpAdminPassword;
