import { Outlet, useNavigate } from "react-router-dom";
import "../../asset/css/employer.css";
import "../../asset/css/base.css";
import "../../asset/css/reset.css";
import SidebarEmployer from "./slidebar";
import { useEffect, useState } from "react";
import HeaderPrivate from "./headerPrivate";
import HeaderDefault from "./HeaderDefault";
import { useAuth } from "../../context/AuthContext";
import { getCookie } from "../../helpers/cookie";
import Footer from "./footer";

function LayoutEmployer() {
  const { company } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const tokenCompany = getCookie("tokenCompany");

  const handleSidebarToggle = () => {
    setCollapsed((prev) => !prev);
  };

  // useEffect(() => {
  //   if (!tokenCompany) {
  //     navigate("/nha-tuyen-dung/login");
  //   }
  // }, [tokenCompany, navigate]);

  if (!tokenCompany) {
    return (
      <>
        <HeaderDefault />
        <div className="employer-container">
          <Outlet key="auth-guest" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeaderPrivate
        company={company}
        toggleSidebar={handleSidebarToggle}
        collapsed={collapsed}
      />
      <div className="employer-layout-wrapper">
        <SidebarEmployer collapsed={collapsed} />
        <main
          className={`employer-main-content ${collapsed ? "collapsed" : ""}`}
        >
          <Outlet key="auth-true" />
        </main>
      </div>
    </>
  );
}

export default LayoutEmployer;
