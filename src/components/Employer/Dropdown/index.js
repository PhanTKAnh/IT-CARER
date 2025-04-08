import { useEffect, useState, useCallback } from "react";
import {  NavLink, useNavigate } from "react-router-dom";

function DropDown() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);



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
                <p>Đăng ký</p>
            </button>

            {isOpen && (
                <div id="myDropdown" className="dropdown-content">
                 
                        <div className="inner-head">
                            <NavLink to="/nha-tuyen-dung/login">
                                <button className="btn-1">Đăng nhập</button>
                            </NavLink>
                            <NavLink to="/nha-tuyen-dung/register">
                                <button className="btn-2">Đăng ký</button>
                            </NavLink>
                        </div>
                   
                </div>
            )}
        </div>
    );
}

export default DropDown;
