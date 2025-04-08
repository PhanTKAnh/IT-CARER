import { NavLink } from "react-router-dom";
import { HomeOutlined, ProfileOutlined, SettingOutlined } from "@ant-design/icons";

function SidebarEmployer() {
    return (
        <aside className="sidebar-employer">
            <ul>
                <li>
                    <NavLink to="/nha-tuyen-dung/dashboard">
                        <HomeOutlined /> Trang chính
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/nha-tuyen-dung/jobs">
                        <ProfileOutlined /> Quản lý tin tuyển dụng
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/nha-tuyen-dung/settings">
                        <SettingOutlined /> Cài đặt tài khoản
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default SidebarEmployer;
