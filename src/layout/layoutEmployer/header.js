
import { NavLink } from "react-router-dom";
import logo from "../../asset/image/logo.png";
import DropDown from "../../components/Employer/Dropdown";
import { getCookie } from "../../helpers/cookie";

function Header() {

  const tokenCompany = getCookie("tokenCompany");

  return (
    <header className="header">
      <div className="inner-wrap">
       
        <div className="inner-logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        
        <div className="inner-button">
          <div className="inner-dropdown">
            <DropDown/>
          </div>
          <span>|</span>
          <div className="inner-link">
            <NavLink to="/">
              <p>Cho người tìm việc</p>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
 