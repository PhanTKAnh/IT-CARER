import { FaMapMarkerAlt, FaMoneyBillWave, FaBrain, FaBolt, FaClipboardCheck } from "react-icons/fa";
import BackButton from "../../../components/BackButton";
import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookie";
import { useNavigate, useParams } from "react-router-dom";
import { watchJob } from "../../../sevices/employer/job.sevice";

const JobDetailPage = () => {
  const { slug } = useParams();
  const tokenCompany = getCookie("tokenCompany");
  const [job, setJob] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const res = await watchJob(slug, tokenCompany);
      if (res.code === 200) {
        setJob(res.job); // Sửa chỗ này
      }
    };
    fetchData();
  }, [slug, tokenCompany]);

  const handleEdit = () => {
    navigate(`/nha-tuyen-dung/sua-cong-viec/${slug}`)
  }
  return (
    <>
      <BackButton />
      <div className="employer-job-detail-container">
        <div className="employer-job-card">
          <h1 className="employer-job-title">{job.Name}</h1>
          <p className="employer-company-name">{job.CompanyName}</p>

          <div className="employer-job-info">
            <div className="job-info-item">
              <FaMoneyBillWave className="job-icon" />
              <p>
                <strong>Mức lương:</strong>{" "}
                {job.SalaryMin?.toLocaleString()} -{" "}
                {job.SalaryMax ? job.SalaryMax.toLocaleString() : "Thỏa thuận"} VNĐ
              </p>
            </div>
            <div className="job-info-item">
              <FaBrain className="job-icon" />
              <p><strong>Kinh nghiệm:</strong> {job.Experience} tháng</p>
            </div>
            <div className="job-info-item">
              <FaBolt className="job-icon" />
              <p><strong>Cấp độ:</strong> {job.Level}</p>
            </div>
            <div className="job-info-item">
              <FaClipboardCheck className="job-icon" />
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span className={job.Status === "active" ? "status-active" : "status-closed"}>
                  {job.Status === "active" ? "Đang tuyển" : "Đã đóng"}
                </span>
              </p>
            </div>

            <div className="job-info-item">
              <FaMapMarkerAlt className="job-icon" />
              <p>
                <strong>Thành phố:</strong>{" "}
                {job.cities?.map((city) => city.CityName).join(", ")}
              </p>
            </div>
            <div className="job-info-item">
              <p>
                <strong>Ngôn ngữ:</strong>{" "}
                {job.tags?.map((tag) => tag.TagsName).join(", ")}
              </p>
            </div>
            <div className="job-info-item">
              <p>
                <strong>Ngày đăng:</strong>{" "}
                {job.updatedAt && new Date(job.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="job-info-item">
              <p>
                <strong>Ngày hết hạn:</strong>{" "}
                {job.expirationDate && new Date(job.expirationDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="employer-job-section">
            <h2 className="employer-job-title">📝 Mô tả công việc</h2>
            <div dangerouslySetInnerHTML={{ __html: job.Description }} />
          </div>

          <div className="employer-job-section">
            <h2 className="employer-job-title">✅ Yêu cầu công việc</h2>
            <div dangerouslySetInnerHTML={{ __html: job.Requirements }} />
          </div>


          <div className="employer-job-edit">
            <button onClick={handleEdit} className="employer-edit-btn">Sửa công việc</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailPage;
