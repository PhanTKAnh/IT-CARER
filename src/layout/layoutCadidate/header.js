import { useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { BuildOutlined, SearchOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import FormSearch from "../../components/Candidate/FormSearch";
import logo from "../../asset/image/logo.png";
import DropDown from "../../components/Candidate/Dropdown";

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
              <li>
                <NavLink to="#" className="hd-link">Cẩm nang việc làm</NavLink>
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
            <NavLink to="/nha-tuyen-dung/login">
              <p>Nhà tuyển dụng</p>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
