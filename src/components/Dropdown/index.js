import { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { getProfieCandidate } from "../../sevices/candidate.sevices";
import { getRefreshToken } from "../../helpers/getToken";
import { HeartOutlined, HeartFilled, SendOutlined, ReconciliationOutlined, LogoutOutlined } from "@ant-design/icons";
import logo from "../../asset/image/logo.png";
import LogOut from "../../pages/Candidate/LogOut";

function DropDown() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [dataCandidate, setDataCandidate] = useState({});
    const [tokenCandidate, setTokenCandidate] = useState(getCookie("tokenCandidate"));

    useEffect(() => {
        const checkTokenChange = () => {
            const newToken = getCookie("tokenCandidate");
            if (newToken !== tokenCandidate) {
                setTokenCandidate(newToken);
            }
        };

        const interval = setInterval(checkTokenChange, 500);

        return () => clearInterval(interval); 
    }, [tokenCandidate]);

    const fetchApi = async () => {
        let token = tokenCandidate;

        if (!token) {
            try {
                const refreshedToken = await getRefreshToken();
                if (refreshedToken) {
                    setTokenCandidate(refreshedToken);
                    token = refreshedToken;
                } else {
                    navigate("/nguoi-tim-viec/login");
                    return;
                }
            } catch (error) {
                console.error("Lỗi khi refresh token:", error);
                navigate("/nguoi-tim-viec/login");
                return;
            }
        }

        if (token) {
            try {
                const candidate = await getProfieCandidate(token);
                setDataCandidate(candidate);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu ứng viên:", error);
                navigate("/nguoi-tim-viec/login");
            }
        }
    };

    useEffect(() => {
        fetchApi();
    }, [tokenCandidate]); 

    const handleOnclick = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);
    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest(".dropdown-container")) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="dropdown-container">
            <button onClick={handleOnclick} className="dropbtn">
                <img
                    alt="avatar"
                    height="28"
                    width="28"
                    src="https://static.careerlink.vn/web/images/common/avatar_placeholder.png"
                />
                <p>{tokenCandidate ? dataCandidate?.FullName || "Người dùng" : "Đăng ký"}</p>
            </button>

            {isOpen && (
                <div id="myDropdown" className="dropdown-content">
                    {!tokenCandidate && (
                        <div className="inner-head">
                            <NavLink to="/nguoi-tim-viec/login">
                                <button className="btn-1">Đăng nhập</button>
                            </NavLink>
                            <NavLink to="/nguoi-tim-viec/register">
                                <button className="btn-2">Đăng ký</button>
                            </NavLink>
                        </div>
                    )}
                    <div className="inner-content">
                        <div className="inner-left">
                            <div className="inner-logo">
                                <img src={logo} alt="Logo" />
                            </div>
                        </div>
                        <div className="inner-right">
                            <p> <ReconciliationOutlined /> Hồ sơ xin việc </p>
                            <Link to={"/nguoi-tim-viec/cong-viec-luu"}> <p> <HeartOutlined /> Việc đã lưu</p></Link>
                           <Link to={"/nguoi-tim-viec/viec-da-ung-tuyen"}> <p> <SendOutlined /> Việc đã ứng tuyển</p></Link>
                        </div>
                    </div>

                    {tokenCandidate && (
                        <div className="inner-footer">
                            <hr className="divider" />
                            <NavLink to={"nguoi-tim-viec/ho-so-ca-nhan/xem"}>
                            <div className="inner-infoUser">

<div className="inner-image">
    <img
        alt="avatar"
        height="28"
        width="28"
        src="https://static.careerlink.vn/web/images/common/avatar_placeholder.png"
    />
</div>
<div className="inner-text">
    <p>{dataCandidate.FullName}</p>
    <p>Tài khoản</p>
</div>
</div>
                            </NavLink>
                           
                            <div className="inner-logout">
                                <NavLink to={"/nguoi-tim-viec/logout"}><LogoutOutlined /> Đăng xuất</NavLink>
                            </div>
                        </div>

                    )}
                </div>
            )}
        </div>
    );
}

export default DropDown;
