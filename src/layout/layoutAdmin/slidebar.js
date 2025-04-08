import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaRegNewspaper,
  FaUserShield,
  FaUserLock,
  FaUserCog,
  FaCogs,
  FaHome,
} from "react-icons/fa";
import logo from "../../asset/image/logo.png";

function Sidebar({ collapsed }) {
  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className={`admin-logo ${collapsed ? "collapsed" : ""}`}>
        <img src={logo} alt="Logo" />
        <span>Admin Panel</span>
      </div>

      <nav className="admin-navbar">
        <ul>
          <li >
            <NavLink to="/admin/dashboard" className={`${collapsed ? "collapsed" : ""}`} >
              <FaTachometerAlt style={{ marginRight: "8px" }} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/employer" className={`${collapsed ? "collapsed" : ""}`} >
              <FaUsers style={{ marginRight: "8px" }} />
              <span>Danh sách nhà tuyển dụng</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/posts" className={`${collapsed ? "collapsed" : ""}`} >
              <FaRegNewspaper style={{ marginRight: "8px" }} />
              <span>Danh sách ứng viên</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/roles" className={`${collapsed ? "collapsed" : ""}`} >
              <FaUserShield style={{ marginRight: "8px" }} />
              <span>Nhóm quyền</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/permissions" className={`${collapsed ? "collapsed" : ""}`} >
              <FaUserLock style={{ marginRight: "8px" }} />
              <span>Phân quyền</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/accounts" className={`${collapsed ? "collapsed" : ""}`} >
              <FaUserCog style={{ marginRight: "8px" }} />
              <span>Danh sách tài khoản</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" className={`${collapsed ? "collapsed" : ""}`} >
              <FaCogs style={{ marginRight: "8px" }} />
              <span>Cài đặt chung</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={`${collapsed ? "collapsed" : ""}`} >
              <FaHome style={{ marginRight: "8px" }} />
              <span>Trang chính</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
