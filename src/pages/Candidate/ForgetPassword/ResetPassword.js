function ResetPassword(){
    return(
        <>
        <div className="container">
           <div className="container-password" >
           <div className="reset-password">
                <h1>Mã OTP đã được gửi qua mail có hiêuj lực trong 5 phút </h1>
                <form className="send-email">
                    <p>Hãy nhập mã otp để được đặt lại mật khẩu </p>
                    <section className="input-box">
                            <input type="password" placeholder="Mật khẩu"  />
                            {/* <i onClick={handlePassword}> {showPassword ? (<EyeOutlined />) : (<EyeInvisibleOutlined />)}</i> */}
                        </section>
                        {/* {errors.Password && <span className="error">{errors.Password.message}</span>} */}

                        <section className="input-box">
                            <input type= "password" placeholder="Nhập lại mật khẩu"  />
                            {/* <i onClick={handlePassword}> {showPassword ? (<EyeOutlined />) : (<EyeInvisibleOutlined />)}</i> */}
                        </section>

                    <button className="send-button">Xác nhận </button>
                </form>
            </div>
           </div>
        </div>   
        </>
    )
}
export default ResetPassword