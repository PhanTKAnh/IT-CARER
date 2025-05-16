import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  ProfileOutlined,
  FileTextOutlined,
  SolutionOutlined,
  SettingOutlined,
} from "@ant-design/icons";

function SidebarEmployer({ collapsed }) {
  return (
    <aside className={`employer-sidebar ${collapsed ? "collapsed" : ""}`}>
      <ul>
        <li>
          <NavLink to="/nha-tuyen-dung/dashboard">
            <HomeOutlined />
            {!collapsed && <span>Trang tổng quan</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/nha-tuyen-dung/thong-tin-cong-ty">
            <ProfileOutlined />
            {!collapsed && <span>Thông tin công ty</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/nha-tuyen-dung/cong-viec">
            <FileTextOutlined />
            {!collapsed && <span>Bài đăng tuyển dụng</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/nha-tuyen-dung/don-ung-tuyen">
            <SolutionOutlined />
            {!collapsed && <span>Đơn ứng tuyển</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/nha-tuyen-dung/ung-vien-tim-nang">
            <SolutionOutlined />
            {!collapsed && <span>Quản lý ứng viên tiềm năng </span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/nha-tuyen-dung/quan-ly-lich-hen">
            <SolutionOutlined />
            {!collapsed && <span>Quản lý lịch hẹn phỏng vấn </span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/nha-tuyen-dung/settings">
            <SettingOutlined />
            {!collapsed && <span>Cài đặt tài khoản</span>}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SidebarEmployer;
