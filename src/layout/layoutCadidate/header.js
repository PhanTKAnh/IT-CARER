import { useState } from "react";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { BuildOutlined, SearchOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import FormSearch from "../../components/Candidate/FormSearch";
import DropDown from "../../components/Candidate/Dropdown";
import { getCookie } from "../../helpers/cookie";
import { useSettings } from "../../context/SettingGsneral";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const defaultKeyword = searchParams.get("keyword") || "";
  const defaultCity = searchParams.get("city") || "";
  const showSearchForm = location.pathname.startsWith("/search");

  // Sử dụng useSettings để lấy logo và websiteName từ context
  const { settings } = useSettings();
  const { websiteName, logo } = settings;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = () => {
    const tokenCompany = getCookie("tokenCompany");

    if (tokenCompany) {
      navigate("/nha-tuyen-dung/dashboard");
    } else {
      navigate("/nha-tuyen-dung/login");
    }
  };

  return (
    <header className="header">
      <div className="inner-wrap">
        {/* Logo và tên web từ context */}
        <h1 className="inner-logo">
          <NavLink to="/">
            {/* Hiển thị logo từ context */}
            <img src={logo || "/default-logo.png"} alt="Logo" />
            <p>{websiteName || "IT CARRER"}</p> {/* Hiển thị tên web từ context */}
          </NavLink>
        </h1>

        <div className={`inner-menu ${isMenuOpen ? "open" : ""}`}>
          {showSearchForm ? (
            <Row>
              <Col>
                <div className="header-search-form">
                  <FormSearch defaultKeyword={defaultKeyword} defaultCity={defaultCity} />
                </div>
              </Col>
            </Row>
          ) : (
            <ul className="list">
              <li>
                <NavLink to="/search" className="hd-link">
                  <SearchOutlined /> Ngành nghề/ Địa điểm
                </NavLink>
              </li>
              <li>
                <NavLink to="/nha-tuyen-dung-hang-dau" className="hd-link">
                  <BuildOutlined /> Công ty
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        <div className="inner-icon-mobi" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </div>

        <div className="inner-button">
          <div className="inner-dropdown">
            <DropDown />
          </div>
          <span>|</span>
          <div className="inner-link" onClick={handleClick}>
            <p>Nhà tuyển dụng</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
