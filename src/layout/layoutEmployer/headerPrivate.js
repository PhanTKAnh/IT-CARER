import logo from "../../asset/image/logo.png";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";

function HeaderPrivate() {
    const navigate = useNavigate();



    return (
        <header className="header-private">
            <div className="header-private-left">
                <img src={logo} alt="Logo" />
            </div>
            <div className="header-private-right">
                <span >
                    <LogoutOutlined /> Đăng xuất
                </span>
            </div>
        </header>
    );
}

export default HeaderPrivate;
