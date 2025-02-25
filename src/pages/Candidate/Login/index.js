import { EyeInvisibleOutlined, UserOutlined } from "@ant-design/icons"
import banner from "../../../asset/image/banner.png"
import { NavLink } from "react-router-dom"
function Login() {
    const handleSubmit = (e) =>{
        e.preventDefault();
    }
    return (
        <>
            <div className="container-login">
                <div className="inner-left">
                    <h1> Xây dựng sự nghiệp Thành công cùng It Career</h1>
                </div>

                <div className="inner-right">
                    <form className="login" onSubmit={handleSubmit}>
                        <h1 className="login-title">Login</h1>
                        <section className="input-box">
                            <input type="text" name="email" placeholder="Email" />
                            <i> <UserOutlined /></i>
                        </section>
                        <section className="input-box">
                            <input type="password" name="password" placeholder="Password" />
                            <i> <EyeInvisibleOutlined /></i>
                        </section>
                        <section className="remember-forgot-box" >
                            <a className="forgot-password" href="#">
                                <h5>Forgot password? </h5>
                            </a>
                        </section>
                        <button className="login-button">
                            Login
                        </button>
                        <h5 className="dont-have-an-account">
                            Don't have an account?
                            <NavLink to={"/nguoi-tim-viec/register"} ><b> Register</b></NavLink>
                        </h5>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Login;