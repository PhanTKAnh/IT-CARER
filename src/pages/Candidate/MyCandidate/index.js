import { useEffect, useState } from "react";
import { getProfieCandidate, updateCandidateProfile } from "../../../sevices/candidate/candidate.sevices";
import { getCookie } from "../../../helpers/cookie";
import { profileSchema } from "../../../untils/validate";
import { uploadFile } from "../../../sevices/candidate/uploadFile";
import { Skeleton } from "antd";

function MyCandidate() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // State để theo dõi quá trình tải dữ liệu
  const [editingField, setEditingField] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const tokenCandidate = getCookie("tokenCandidate");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfieCandidate(tokenCandidate);
        setProfile(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu hồ sơ:", error);
      } finally {
        setLoading(false); // Dừng loading sau khi dữ liệu được lấy
      }
    }
    fetchProfile();
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
    setEditedValue(
      field === "BirthDate" && profile[field]
        ? new Date(profile[field]).toISOString().split("T")[0]
        : profile[field] || ""
    );
    setErrorMessage("");
  };

  const handleSave = async () => {
    try {
      await profileSchema.validateAt(editingField, { [editingField]: editedValue });
      const options = { [editingField]: editedValue };
      await updateCandidateProfile(options, tokenCandidate);

      const updatedProfile = await getProfieCandidate(tokenCandidate);
      setProfile(updatedProfile);
      setEditingField(null);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await uploadFile(formData);
      if (!uploadResponse.linkUrl) {
        throw new Error("Không nhận được URL ảnh từ server");
      }

      const updateProfileData = { Avatar: uploadResponse.linkUrl };
      await updateCandidateProfile(updateProfileData, tokenCandidate);

      const updatedProfile = await getProfieCandidate(tokenCandidate);
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Lỗi khi cập nhật avatar:", error);
    }
  };

  return (
    <div className="content-candi">
      <form className="profile-form">
        <label htmlFor="upload" className="avatar-container">
          <div className="pro-title">
            <h1>Tài khoản</h1>
            <p>Hãy cập nhật thông tin mới nhất.</p>
          </div>
          {loading ? (
            <Skeleton.Avatar size={100} active />
          ) : (
            <img src={selectedAvatar || profile?.Avatar || "/web/images/common/avatar_placeholder.png"} alt="Avatar" />
          )}
        </label>
        <input type="file" id="upload" hidden onChange={handleAvatarChange} accept="image/*" />
        <p className="note">(JPEG/PNG/GIF, ≤ 1MB)</p>
      </form>

      <ul className="info-list">
        {["FullName", "Email", "Gender", "BirthDate", "MaritalStatus", "PhoneNumber", "Address"].map((field) => (
          <li key={field}>
            <strong>{field}:</strong>
            {loading ? (
              <Skeleton.Input style={{ width: 200 }} active />
            ) : editingField === field ? (
              <div className="info-input">
                {field === "Gender" ? (
                  <select value={editedValue} onChange={(e) => setEditedValue(e.target.value)} onBlur={handleSave} autoFocus>
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                ) : field === "BirthDate" ? (
                  <input
                    type="date"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                    onBlur={handleSave}
                    autoFocus
                  />
                ) : (
                  <input
                    type="text"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                    onBlur={handleSave}
                    autoFocus
                  />
                )}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
              </div>
            ) : (
              <>
                {field === "BirthDate" && profile[field]
                  ? new Date(profile[field]).toLocaleDateString("vi-VN")
                  : profile[field] || "Chưa cập nhật"}
                <button className="edit-btn" onClick={() => handleEdit(field)}>Chỉnh sửa</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <p className="register-date">
        {loading ? <Skeleton.Input style={{ width: 200 }} active /> : `Ngày đăng ký: ${new Date(profile?.RegisteredAt).toLocaleDateString("vi-VN")}`}
      </p>

    </div>
  );
}

export default MyCandidate;
