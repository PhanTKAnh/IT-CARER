import logo from "../../asset/image/logo.png";
import { BuildOutlined, SearchOutlined} from '@ant-design/icons';
import DropDown from "../../components/Dropdown";
import { NavLink, Outlet } from "react-router-dom"

function LayouCandidate() {

    return (
        <>
            <header className="header">
                <div className="inner-wrap">
                    <div className="inner-logo">
                        <a href="#">
                            <img src={logo} alt="Logo" />
                            <span></span>
                        </a>
                    </div>
                    <div className="inner-menu">
                        <ul>
                            <li>

                                <a href="#"><SearchOutlined /> Ngành nghề/ Địa điểm </a>
                            </li>
                            <li>
                                <a href="#"><BuildOutlined /> Công ty</a>
                            </li>
                            <li>
                                <a href="#">Cẩm nang việc làm</a>
                            </li>
                        </ul>
                    </div>
                    <div className="inner-button">

                        <div className="inner-dropdown">
                            <DropDown />
                        </div>
                        |
                        <div className="inner-link">
                            <a href=""><p>Nhà tuyển dụng</p></a>
                        </div>
                    </div>


                </div>
            </header>
            <div className="main-content">
            <Outlet />
            </div>
            <footer class="footer">
                <div class="footer-top">
                    <ul>
                        <li><a href="#"><img src="" /></a></li>
                        <li><a href="#">Liên hệ với chúng tôi </a></li>
                        <li><a href="#">Tuyển dụng</a></li>
                        <li><a href="#">Giới thiệu</a></li>
                        <li>
                            <a href="#" class="fab fa-facebook"></a>
                            <a href="#" class="fab fa-instagram"></a>
                            <a href="#" class="fab fa-youtube"></a>
                            <a href="#" class="fab fa-tiktok"></a>
                        </li>
                    </ul>
                </div>
                <div class="footer-center">
                    <p>
                        CÔNG TY TNHH IT CARER <br/>
                        MSDN: 0314756693<br/>
                        Địa chỉ đăng ký: Tổ 23,P. Hòa An, Q. Cẩm Lệ, TP Đà Nẵng <br/>
                        Đặt hàng online: <b>0774595547.</b>
                    </p>
                </div>
                <div class="footer-bottom">
                    &copy; 2025 itcarer. Powered by OkHub Việt Nam.
                </div>
            </footer>
        </>
    )
}
export default LayouCandidate