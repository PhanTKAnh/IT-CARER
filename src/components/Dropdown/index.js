import { useEffect, useRef, useState } from "react";
import { DownOutlined, HeartOutlined, LogoutOutlined, ReconciliationOutlined, SendOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import logo from "../../asset/image/logo.png";
import { getCookie } from "../../helpers/cookie";
import { getProfieCandidate } from "../../sevices/candidate.sevices";

function DropDown() {
    const tokenCandidate = getCookie("tokenCandidate");
    const [isOpen, setIsOpen] = useState(false);
    const [dataCandidate,setDataCandidate] = useState({});
    const dropdownRef = useRef(null);

    const handleOnclick = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() =>{
        const fetchApi= async () => {
            if(tokenCandidate){
                const candidate = await getProfieCandidate(tokenCandidate);
                setDataCandidate(candidate);
            }
            
        };
        fetchApi();
    },[tokenCandidate])

    // Khi click bên ngoài dropdown => tự động đóng
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="dropdown-container">
            <button onClick={handleOnclick} className="dropbtn">
                <img
                    alt="avatar"
                    height="28"
                    width="28"
                    src="https://static.careerlink.vn/web/images/common/avatar_placeholder.png"
                />
                <p> {tokenCandidate ? <>{dataCandidate.FullName}</> : "Đăng ký"} <DownOutlined /></p>
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
                            <p> <HeartOutlined /> Việc đã lưu</p>
                            <p> <SendOutlined /> Việc đã ứng tuyển</p>
                        </div>
                    </div>

                    {tokenCandidate && (
                        <div className="inner-footer">
                            <hr className="divider" />
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
