import { useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { BuildOutlined, SearchOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import DropDown from "../../components/Dropdown";
import FormSearch from "../../components/Candidate/FormSearch";
import logo from "../../asset/image/logo.png";

function Header() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const defaultKeyword = searchParams.get("keyword") || "";
  const defaultCity = searchParams.get("city") || "";
  
  const showSearchForm = location.pathname.startsWith("/search");

  // State quản lý trạng thái mở/đóng menu trên mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="inner-wrap">
       
        <div className="inner-logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
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
            <ul>
              <li>
                <NavLink to="/search">
                  <SearchOutlined /> Ngành nghề/ Địa điểm
                </NavLink>
              </li>
              <li>
                <NavLink to="#">
                  <BuildOutlined /> Công ty
                </NavLink>
              </li>
              <li>
                <NavLink to="#">Cẩm nang việc làm</NavLink>
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
          <div className="inner-link">
            <NavLink to="#">
              <p>Nhà tuyển dụng</p>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
