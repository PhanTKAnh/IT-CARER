import { UserOutlined } from "@ant-design/icons"

function OtpPassword(){
    return(
        <>
        <div className="container">
           <div className="container-password" >
           <div className="reset-password">
                <h1>Mã OTP đã được gửi qua mail có hiêuj lực trong 5 phút </h1>
                <form className="send-email">
                    <p>Hãy nhập mã otp để được đặt lại mật khẩu </p>
                    <section className="input-box">
                            <input type="text" placeholder="OTP"  />
                            <i> <UserOutlined /></i>
                        </section>


                    <button className="send-button">Xác nhận </button>
                </form>
            </div>
           </div>
        </div>   
        </>
    )
}
export default OtpPassword;