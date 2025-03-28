import { useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== retypePassword) {
      setError("Mật khẩu không khớp. Hãy nhập lại.");
      return;
    }
    setError("");
    console.log("Đổi mật khẩu thành công!");
    // Gửi dữ liệu lên server tại đây
  };

  return (
    <div className="container-pass">
      <h1 className="title">Thay đổi mật khẩu</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Mật khẩu hiện tại */}
          <div className="form-group">
            <label>Mật khẩu hiện tại <span className="required">*</span></label>
            <input
              type={showPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          {/* Mật khẩu mới */}
          <div className="form-group">
            <label>Mật khẩu mới <span className="required">*</span></label>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Nhập lại mật khẩu */}
          <div className="form-group">
            <label>Gõ lại mật khẩu mới <span className="required">*</span></label>
            <input
              type={showPassword ? "text" : "password"}
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          {/* Hiển thị mật khẩu */}
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="toggle_password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="toggle_password">Hiển thị mật khẩu</label>
          </div>

          {/* Nút gửi form */}
          <button type="submit" className="btn-submit">Cập nhật mật khẩu</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
