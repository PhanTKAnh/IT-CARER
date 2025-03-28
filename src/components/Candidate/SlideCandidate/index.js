import { useLocation, Link, Outlet } from "react-router-dom";

const SlideCandidate = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="container">
      <div className="my-candidate">
      <div className="sidebar">
      <ul>
        <li className={currentPath === "/nguoi-tim-viec/ho-so-ca-nhan/xem" ? "active" : ""}>
          <Link to="/nguoi-tim-viec/ho-so-ca-nhan/xem">Tài khoản</Link>
        </li>
        <li className={currentPath === "/nguoi-tim-viec/ho-so-ca-nhan/thay-doi-mat-khau" ? "active" : ""}>
          <Link to="/nguoi-tim-viec/ho-so-ca-nhan/thay-doi-mat-khau">Đổi mật khẩu</Link>
        </li>
      </ul>
    </div>

          <Outlet />
      </div>
    </div>
    
  );
};

export default SlideCandidate;
