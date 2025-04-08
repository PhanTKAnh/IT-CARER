import { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function DropDown() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleOnclick = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest(".admin-dropdown-container")) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="admin-dropdown-container">
            <button onClick={handleOnclick} className="admin-dropdown-btn">
                <img
                    alt="avatar"
                    height="28"
                    width="28"
                    src="https://static.careerlink.vn/web/images/common/avatar_placeholder.png"
                />
                <p>Xin chào, Admin</p>
            </button>

            {isOpen && (
                <div id="adminDropdown" className="admin-dropdown-menu">
                    <div className="admin-dropdown-inner">
                        <NavLink to="/nha-tuyen-dung/login">
                        Thông tin cá nhân
                        </NavLink>
                        <NavLink to="/nha-tuyen-dung/register">
                            <button className="admin-dropdown-btn-2">Đăng Xuất</button>
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropDown;
