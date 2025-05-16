import {
    AiOutlineMail,
    AiOutlineHome,
    AiOutlineUser,
    AiOutlinePhone,
    AiOutlineGlobal,
    AiOutlineClockCircle,
    AiOutlineCheckCircle,
    AiOutlineTeam,
    AiOutlinePushpin,
    AiOutlineFileText,
    AiOutlineEdit,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useRef } from "react";
import Swal from "sweetalert2";
import { getProfileCompany, patchProfileCompany } from "../../../sevices/employer/company.sevice";
import { getCookie } from "../../../helpers/cookie";
import { uploadFile } from "../../../sevices/upload/uploadFile";

function InfoCompany() {
    const navigate = useNavigate();
    const { company, setCompany } = useAuth();
    const bannerInputRef = useRef(null);
    const logoInputRef = useRef(null);
    const tokenCompany = getCookie("tokenCompany");


    const handleClick = async (type) => {
        const result = await Swal.fire({
            title: "Cập nhật ảnh",
            text: "Bạn muốn chọn file để cập nhật ảnh?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Chọn file",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            if (type === "banner") {
                bannerInputRef.current?.click();
            } else if (type === "logo") {
                logoInputRef.current?.click();
            }
        }
    };

    const handleFileChange = async (event, type) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const uploadResponse = await uploadFile(formData);
            if (!uploadResponse.linkUrl) {
                throw new Error("Không nhận được URL ảnh từ server");
            }
            const updateData = {
                [type === "banner" ? "avatar" : "logo"]: uploadResponse.linkUrl,
            };

            const res = await patchProfileCompany(updateData, tokenCompany);
            if (res.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Cập nhật thành công!",
                    text: "Thông tin công ty đã được cập nhật.",
                });

                const profile = await getProfileCompany(tokenCompany);
                if (profile.code === 200) {
                    setCompany(profile.data);
                }
            } else {
                throw new Error("Lỗi khi cập nhật thông tin");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Cập nhật thất bại!",
                text: error.message || "Đã xảy ra lỗi, vui lòng thử lại sau.",
            });
        }
    };

    const handleEdit = () => {
        navigate("/nha-tuyen-dung/thong-tin-cong-ty/sua-thong-tin");
    };

    return (
        <div className="company-info">
            <div className="company-info__banner">
                <div onClick={() => handleClick("banner")} style={{ cursor: "pointer" }}>
                    <img
                        src={company?.avatar || "/default-banner.jpg"}
                        alt="Banner công ty"
                        className="company-info__avatar-banner"
                    />
                </div>
                <div onClick={() => handleClick("logo")} style={{ cursor: "pointer" }}>
                    <img
                        src={company?.logo || "/default-logo.jpg"}
                        alt="Logo công ty"
                        className="company-info__logo-float"
                    />
                </div>

                <input
                    type="file"
                    accept="image/*"
                    ref={bannerInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e, "banner")}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={logoInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e, "logo")}
                />
            </div>

            <div className="company-info__header">
                <h3 className="company-info__name">{company?.CompanyName || "Chưa cập nhật tên công ty"}</h3>
                <button onClick={handleEdit} className="edit-button">
                    <AiOutlineEdit />
                    Chỉnh sửa
                </button>
            </div>

            <div className="company-info__body">
                <div className="company-info__details">
                    <p><AiOutlineMail /> <strong>Email:</strong> {company?.Email || "Chưa có email"}</p>
                    <p><AiOutlineHome /> <strong>Địa chỉ:</strong> {company?.Address || "Chưa có địa chỉ"}</p>
                    <p><AiOutlineTeam /> <strong>Quy mô:</strong> {company?.QuantityPeople || "Chưa cập nhật"}</p>
                    <p><AiOutlineUser /> <strong>Người liên hệ:</strong> {company?.ContactPerson || "Chưa có người liên hệ"}</p>
                    <p><AiOutlinePhone /> <strong>Số điện thoại:</strong> {company?.Phone || "Chưa có số điện thoại"}</p>
                    <p>
                        <AiOutlineGlobal /> <strong>Website:</strong>{" "}
                        {company?.Website ? (
                            <a href={company.Website} target="_blank" rel="noopener noreferrer">
                                {company.Website}
                            </a>
                        ) : (
                            "Chưa có website"
                        )}
                    </p>
                    <p><AiOutlineClockCircle /> <strong>Thời gian làm việc:</strong> {company?.WorkingTime || "Chưa có"}</p>
                    <p><AiOutlineCheckCircle /> <strong>Trạng thái:</strong> {company?.Status || "Chưa rõ"}</p>
                </div>
            </div>

            <div className="company-info__desc">
                <h2><AiOutlineFileText /> Mô tả công ty</h2>
                <div
                    dangerouslySetInnerHTML={{
                        __html: company?.Description || "<p>Chưa có mô tả.</p>",
                    }}
                />

                <h2><AiOutlinePushpin /> Chi tiết</h2>
                <div
                    dangerouslySetInnerHTML={{
                        __html: company?.Detail || "<p>Chưa có thông tin chi tiết.</p>",
                    }}
                />
            </div>
        </div>
    );
}

export default InfoCompany;
