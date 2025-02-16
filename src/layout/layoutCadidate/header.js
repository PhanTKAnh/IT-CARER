import logo from "../../asset/image/logo.png";
import { BuildOutlined, SearchOutlined} from '@ant-design/icons';
import DropDown from "../../components/Dropdown";
import { NavLink, useLocation, useSearchParams } from "react-router-dom"
import FormSearch from "../../components/Candidate/FormSearch";

function Header() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const defaultKeyword = searchParams.get("keyword") || "";
    const defaultCity = searchParams.get("city") || "";

    const showSearchForm = location.pathname.startsWith('/search');
    return (
        <>
            <header className="header">
                <div className="inner-wrap">
                    <div className="inner-logo">
                        <NavLink to="/">
                            <img src={logo} alt="Logo" />
                            <span></span>
                        </NavLink>
                    </div>
                    <div className="inner-menu">
                        {
                            showSearchForm ? (
                                <div className="header-search-form">
                                     <FormSearch defaultKeyword={defaultKeyword} defaultCity={defaultCity} />
                                </div>
                            ) : (<ul>
                                <li>

                                    <NavLink to="/search"><SearchOutlined /> Ngành nghề/ Địa điểm </NavLink>
                                </li>
                                <li>
                                    <a href="#"><BuildOutlined /> Công ty</a>
                                </li>
                                <li>
                                    <a href="#">Cẩm nang việc làm</a>
                                </li>
                            </ul>)
                        }

                    </div>
                    <div className="inner-button">

                        <div className="inner-dropdown">
                            <DropDown />
                        </div>
                        |
                        <div className="inner-link">
                            <a href=""><p>Nhà tuyển dụng</p></a>
                        </div>
                    </div>

                </div>
            </header>
        </>
    )
}
export default Header