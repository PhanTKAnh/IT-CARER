import { useLocation } from "react-router-dom";

const MyCandidate = () => {
  const location = useLocation(); 
  const currentPath = location.pathname;

  return (
        <div className="content-candi">
          <form className="profile-form">
            <label htmlFor="upload" className="avatar-container">
              <div className="pro-title">
                <h1>Tài khoản</h1>
                <p>Hãy cập nhật thông tin mới nhất.</p>
              </div>
              <img src="/web/images/common/avatar_placeholder.png" alt="Avatar" />
            </label>
            <input type="file" id="upload" hidden />
            <p className="note">(JPEG/PNG/GIF, ≦ 1MB)</p>
          </form>

          <ul className="info-list">
            <li>
              <strong>Họ và tên:</strong> anh phan <button>Chỉnh sửa</button>
            </li>
            <li>
              <strong>Email:</strong> phananh01082003@gmail.com <button>Chỉnh sửa</button>
            </li>
            <li>
              <strong>Giới tính:</strong> ... <button>Chỉnh sửa</button>
            </li>
            <li>
              <strong>Ngày sinh:</strong> Nhập ngày sinh của bạn <button>Chỉnh sửa</button>
            </li>
            <li>
              <strong>Hôn nhân:</strong> ... <button>Chỉnh sửa</button>
            </li>
            <li>
              <strong>Số điện thoại:</strong> Thêm số điện thoại của bạn <button>Chỉnh sửa</button>
            </li>
            <li>
              <strong>Địa chỉ:</strong> Viet Nam <button>Chỉnh sửa</button>
            </li>
          </ul>
          <p className="register-date">Ngày đăng ký: 21/11/2024</p>
          <button className="delete-account">Xóa tài khoản</button>
        </div>
  );
};

export default MyCandidate;
