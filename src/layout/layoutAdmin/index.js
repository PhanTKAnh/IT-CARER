import { useState } from "react";
import Header from "./header";
import Sidebar from "./slidebar";
import { Outlet } from "react-router-dom";
import "../../asset/css/admin.css";

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setCollapsed(prevState => !prevState);
  };

  return (
    <>
      <Header onToggleSidebar={handleSidebarToggle} collapsed={collapsed} />
      <div className={`admin-layout ${collapsed ? "collapsed" : ""}`}>
        <Sidebar collapsed={collapsed} />
        <main className={`admin-content ${collapsed ? "collapsed" : ""}`}>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default LayoutAdmin;
