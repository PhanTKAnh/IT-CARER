
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

function HeaderPrivate({ company, toggleSidebar, collapsed }) {
  return (
    <header className={`employer-header ${collapsed ? "collapsed" : ""}`}>
      <div className="header-inner-wrap">
        <div className="header-left">

          <button className="menu-toggle-btn" onClick={toggleSidebar}>
            <MenuOutlined />
          </button>

          <span className="company-name">{company?.CompanyName}</span>
        </div>

        <div className="header-right">
          <NavLink className="logout-btn" to={"/nha-tuyen-dung/logout"}>
            <LogoutOutlined /> Đăng xuất
          </NavLink>

        </div>
      </div>
    </header>
  );
}

export default HeaderPrivate;
