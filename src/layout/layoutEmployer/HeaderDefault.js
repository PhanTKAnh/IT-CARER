import { NavLink } from "react-router-dom";
import DropDown from "../../components/Employer/Dropdown";
import { useSettings } from "../../context/SettingGsneral";

function HeaderDefault() {
  const { settings } = useSettings(); 
  const { logo, websiteName } = settings; 

  return (
    <header className="header">
      <div className="inner-wrap">
        <h1 className="inner-logo">
          <NavLink to="/">
            <img src={logo || "/default-logo.png"} alt="Logo" />
            <p>{websiteName || "IT CARRER"}</p>
          </NavLink>
        </h1>

        <div className="inner-button">
          <div className="inner-dropdown">
            <DropDown />
          </div>
          <span>|</span>
          <div className="inner-link">
            <NavLink to="/" className="link-to-user">
              Cho người tìm việc
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderDefault;
