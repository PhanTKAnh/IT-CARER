import { UserOutlined } from "@ant-design/icons"
function ForgetPassword () {
    return(
        <>
        <div className="container">
           <div className="container-password" >
           <div className="reset-password">
                <h1>Quên mật khẩu cho  người tìm việc</h1>
                <form className="send-email">
                    <p>Hãy nhập email để chúng tôi gửi bạn mã otp</p>
                    <section className="input-box">
                            <input type="text" placeholder="Email"  />
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
export default ForgetPassword