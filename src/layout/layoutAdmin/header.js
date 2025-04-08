import DropDown from "../../components/Admin/Dropdown";
import logo from "../../asset/image/logo.png";
import { NavLink } from "react-router-dom";

function Header({ onToggleSidebar, collapsed }) {
  return (
    <header className={`header-admin ${collapsed ? "collapsed" : ""}`}>
      <div className="inner-wrap">
        <div className="logo_dis">
          <button id="toggle-btn" onClick={onToggleSidebar}>☰</button>
        </div>
        <div className="inner-button">
          <div className="inner-dropdown">
            <DropDown />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
