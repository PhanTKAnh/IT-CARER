import logo from "../../asset/image/logo.png";
import { BuildOutlined, SearchOutlined } from "@ant-design/icons";
import DropDown from "../../components/Dropdown";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import FormSearch from "../../components/Candidate/FormSearch";
import { Col, Row } from "antd";

function Header() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const defaultKeyword = searchParams.get("keyword") || "";
  const defaultCity = searchParams.get("city") || "";

  const showSearchForm = location.pathname.startsWith("/search");

  return (
    <header className="header">
      <div className="inner-wrap">
        {/* Logo Section */}
        <div className="inner-logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>

        {/* Menu Section */}
        <div className="inner-menu">
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

        {/* Button Section */}
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
