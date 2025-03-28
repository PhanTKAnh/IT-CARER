import { useEffect, useState } from "react";
import { getApplication } from "../../../sevices/application.sevies";
import { getCookie } from "../../../helpers/cookie";

function ApplicationJob() {
  const [jobApplication, setJobApplication] = useState([]);
  const tokenCandidate = getCookie("tokenCandidate");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getApplication(tokenCandidate);
        setJobApplication(response);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu ứng tuyển:", error);
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Công việc đã ứng tuyển</h2>
      <div className="app-container">
        <div className="job-list">
          {jobApplication.map((application) => (
            <div key={application._id} className="job-item">
              <div className="job-img">
                <img
                  src={application.company.logo}
                  alt={application.company.name}
                  className="company-logo"
                />
              </div>
              <div className="job-ct">
                <h3>{application.job.Name}</h3>
                <p>Công ty: {application.company.name}</p>
                <p >
                  <strong>Trạng thái:</strong>{" "}
               <span className={`status ${application.StatusRead === "unRead" ? "unRead" : "read"}`}>   {application.StatusRead === "unRead" ? "Chưa đọc" : "Đã xem"}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApplicationJob;
