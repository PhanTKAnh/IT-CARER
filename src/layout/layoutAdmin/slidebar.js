import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaRegNewspaper,
  FaUserShield,
  FaUserLock,
  FaUserCog,
  FaCogs,
} from "react-icons/fa";
import { useSettings } from "../../context/SettingGsneral";

function Sidebar({ collapsed }) {
  const { settings } = useSettings();  // Lấy thông tin từ SettingContext
  const { logo, websiteName } = settings;  // Lấy logo và websiteName

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className={`admin-logo ${collapsed ? "collapsed" : ""}`}>
        {/* Hiển thị logo và tên web từ context */}
        <img src={logo || "/default-logo.png"} alt="Logo" />
        <span>{websiteName || "Admin Panel"}</span>
      </div>

      <nav className="admin-navbar">
        <ul>
          <li>
            <NavLink to="/admin/dashboard" className={`${collapsed ? "collapsed" : ""}`}>
              <FaTachometerAlt style={{ marginRight: "8px" }} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/employer" className={`${collapsed ? "collapsed" : ""}`}>
              <FaUsers style={{ marginRight: "8px" }} />
              <span>Danh sách nhà tuyển dụng</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/candidate" className={`${collapsed ? "collapsed" : ""}`}>
              <FaRegNewspaper style={{ marginRight: "8px" }} />
              <span>Danh sách ứng viên</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/city" className={`${collapsed ? "collapsed" : ""}`}>
              <FaRegNewspaper style={{ marginRight: "8px" }} />
              <span>Danh sách thành phố </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/tag" className={`${collapsed ? "collapsed" : ""}`}>
              <FaRegNewspaper style={{ marginRight: "8px" }} />
              <span>Danh sách ngôn ngữ </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/roles" className={`${collapsed ? "collapsed" : ""}`}>
              <FaUserShield style={{ marginRight: "8px" }} />
              <span>Nhóm quyền</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/admin/permissions" className={`${collapsed ? "collapsed" : ""}`}>
              <FaUserLock style={{ marginRight: "8px" }} />
              <span>Phân quyền</span>
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/admin/accounts" className={`${collapsed ? "collapsed" : ""}`}>
              <FaUserCog style={{ marginRight: "8px" }} />
              <span>Danh sách tài khoản</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" className={`${collapsed ? "collapsed" : ""}`}>
              <FaCogs style={{ marginRight: "8px" }} />
              <span>Cài đặt chung</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
