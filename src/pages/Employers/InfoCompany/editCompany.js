import React, { useEffect, useState } from "react";
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
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { QuantityPeople } from "../../../model/registerCompany";
import TinyEditor from "../../../components/Employer/TinyEditor";
import { patchProfileCompany } from "../../../sevices/employer/company.sevice";
import { getCookie } from "../../../helpers/cookie";
import Swal from 'sweetalert2'; 
import BackButton from "../../../components/BackButton";

function EditCompany() {
    const navigate = useNavigate();
    const { company, setCompany } = useAuth();
    const [form, setForm] = useState({});
    const tokenCompany = getCookie("tokenCompany");

    useEffect(() => {
        setForm(company || {});
    }, [company]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleEditorChange = (content, name) => {
        setForm({ ...form, [name]: content });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const confirmUpdate = await Swal.fire({
            title: 'Bạn có chắc chắn muốn cập nhật?',
            text: "Thông tin công ty sẽ được thay đổi.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Có, cập nhật',
            cancelButtonText: 'Không, thoát',
        });
    
        if (confirmUpdate.isConfirmed) {
            try {
                const res = await patchProfileCompany(form, tokenCompany);
                if (res.code === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cập nhật thành công!',
                        text: 'Thông tin công ty đã được cập nhật.',
                    });
                    setCompany(res.data);
                    navigate("/nha-tuyen-dung/thong-tin-cong-ty");
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Cập nhật thất bại!',
                        text: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
                    });
                }
            } catch (error) {
                console.error("Lỗi cập nhật công ty:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra!',
                    text: 'Vui lòng thử lại sau.',
                });
            }
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Đã hủy cập nhật!',
                text: 'Không có thay đổi nào được thực hiện.',
            });
            navigate("/nha-tuyen-dung/thong-tin-cong-ty");
        }
    };
    
    return (
        <div className="edit-company">
            <BackButton />
            <h2 className="edit-company__title">📝 Chỉnh sửa thông tin công ty</h2>
            <form className="edit-company__form" onSubmit={handleSubmit}>
                <div className="edit-company__field">
                    <label><AiOutlineFileText /> Tên công ty</label>
                    <input type="text" name="CompanyName" value={form.CompanyName || ""} onChange={handleChange} />
                </div>

                <div className="edit-company__field">
                    <label><AiOutlineMail /> Email</label>
                    <input
                        type="email"
                        name="Email"
                        value={form.Email || ""}
                        readOnly
                    />
                </div>

                <div className="edit-company__field">
                    <label><AiOutlineHome /> Địa chỉ</label>
                    <input type="text" name="Address" value={form.Address || ""} onChange={handleChange} />
                </div>

                <div className="edit-company__field">
                    <label><AiOutlineTeam /> Quy mô</label>
                    <select
                        className="register-form__select"
                        name="QuantityPeople"
                        value={form.QuantityPeople || ""}
                        onChange={handleChange}
                    >
                        <option value="">Số nhân viên</option>
                        {QuantityPeople.map((item, index) => (
                            <option key={index} value={item.QuantityPeople}>
                                {item.QuantityPeople}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="edit-company__field">
                    <label><AiOutlineUser /> Người liên hệ</label>
                    <input type="text" name="ContactPerson" value={form.ContactPerson || ""} onChange={handleChange} />
                </div>

                <div className="edit-company__field">
                    <label><AiOutlinePhone /> Số điện thoại</label>
                    <input type="text" name="Phone" value={form.Phone || ""} onChange={handleChange} />
                </div>

                <div className="edit-company__field">
                    <label><AiOutlineGlobal /> Website</label>
                    <input type="text" name="Website" value={form.Website || ""} onChange={handleChange} />
                </div>

                <div className="edit-company__field">
                    <label><AiOutlineClockCircle /> Thời gian làm việc</label>
                    <input type="text" name="WorkingTime" value={form.WorkingTime || ""} onChange={handleChange} />
                </div>

                <div className="edit-company__field">
                    <label><AiOutlineCheckCircle /> Trạng thái</label>
                    <div className={`edit-company__status ${form.Status === "active" ? "active" : "inactive"}`}>
                        {form.Status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                    </div>
                </div>

                <TinyEditor
                    label="Mô tả công ty"
                    name="Description"
                    icon={AiOutlineFileText}
                    value={form.Description || ""}
                    onChange={handleEditorChange}
                />
                <TinyEditor
                    label="Chi tiết"
                    name="Detail"
                    icon={AiOutlinePushpin}
                    value={form.Detail || ""}
                    onChange={handleEditorChange}
                />

                <button type="submit" className="edit-company__submit">💾 Lưu thay đổi</button>
            </form>
        </div>
    );
}

export default EditCompany;
