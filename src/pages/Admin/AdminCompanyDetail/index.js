import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyBySlug } from "../../../sevices/admin/company";
import BackButton from "../../../components/Admin/BackButton";

const AdminCompanyDetail = () => {
  const { slug } = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCompanyBySlug(slug);
      if (res && res.detailCompany) {
        setCompany(res.detailCompany);
      }
    };
    fetchData();
  }, [slug]);

  if (!company) return <div className="admin-company__loading">Đang tải thông tin công ty...</div>;

  return (
    <>
    <BackButton to="/admin/employer" />

<div className="admin-company">
  <div className="admin-company__header">
    <img className="admin-company__logo" src={company.logo} alt="logo" />
    <div className="admin-company__info">
      <h1 className="admin-company__name">{company.CompanyName}</h1>
      <p className={`admin-company__status admin-company__status--${company.Status}`}>
        Trạng thái: {company.Status}
      </p>
      <p className="admin-company__email">Email: {company.Email}</p>
    </div>
  </div>

  <div className="admin-company__body">
    <div className="admin-company__section">
      <h3 className="admin-company__section-title">Thông tin chung</h3>
      <p><strong>Địa chỉ:</strong> {company.Address}</p>
      <p><strong>Website:</strong> <a href={company.Website} target="_blank" rel="noreferrer">{company.Website}</a></p>
      <p><strong>Thời gian làm việc:</strong> {company.WorkingTime}</p>
      <p><strong>Quy mô:</strong> {company.QuantityPeople}</p>
    </div>

    <div className="admin-company__section">
      <h3 className="admin-company__section-title">Liên hệ</h3>
      <p><strong>Người liên hệ:</strong> {company.ContactPerson}</p>
      <p><strong>Số điện thoại:</strong> {company.Phone}</p>
    </div>

    <div className="admin-company__section">
      <h3 className="admin-company__section-title">Mô tả</h3>
      <p>{company.Description}</p>
    </div>

    <div className="admin-company__section">
      <h3 className="admin-company__section-title">Chi tiết hoạt động</h3>
      <p>{company.Detail}</p>
    </div>
  </div>
</div>
    </>
  );
};

export default AdminCompanyDetail;
