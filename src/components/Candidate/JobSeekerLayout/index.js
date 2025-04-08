import { NavLink, Outlet } from "react-router-dom";

function JobSeekerLayout() {
  return (
    <>
      <div className="localmenu">
        <div className="container">
          <nav className="navbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                  to="/nguoi-tim-viec/cong-viec-luu"
                >
                  <span className="icon">❤️</span> Việc đã lưu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                  to="/nguoi-tim-viec/viec-da-ung-tuyen"
                >
                  <span className="icon">✈️</span> Việc đã ứng tuyển 
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                  to="/nguoi-tim-viec/ho-so-ca-nhan/xem"
                >
                  <span className="icon">👤</span> Tài khoản
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Outlet sẽ render trang con */}
      <div className="container content">
        <Outlet />
      </div>
    </>
  );
}

export default JobSeekerLayout;
