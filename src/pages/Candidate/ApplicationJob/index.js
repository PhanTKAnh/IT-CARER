import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookie";
import { Skeleton } from "antd";
import { getApplication } from "../../../sevices/candidate/application.sevies";

function ApplicationJob() {
  const [jobApplication, setJobApplication] = useState([]);
  const [loading, setLoading] = useState(true); 
  const tokenCandidate = getCookie("tokenCandidate");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getApplication(tokenCandidate);
        setJobApplication(response);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu ứng tuyển:", error);
      } finally {
        setLoading(false); 
      }
    };
    if (tokenCandidate) fetchApi();
  }, [tokenCandidate]);

  return (
    <div className="container">
      <h2 className="title">
        Công việc đã ứng tuyển ({loading ? "..." : jobApplication.length})
      </h2>
      <div className="app-container">
        <div className="job-list">
          {loading
            ? 
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="job-item">
                  <Skeleton.Image style={{ width: 100, height: 100 }} active />
                  <div className="job-ct">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </div>
                </div>
              ))
            : 
              jobApplication.map((application) => (
                <div key={application._id} className="job-item">
                  <div className="job-img">
                    <img
                      src={application.company?.logo }
                      alt={application.company?.name}
                      className="company-logo"
                    />
                  </div>
                  <div className="job-ct">
                    <h3>{application.job?.Name }</h3>
                    <p>Công ty: {application.company?.name }</p>
                    <p>
                      <strong>Trạng thái:</strong>{" "}
                      <span
                        className={`status ${
                          application.Status?.toLowerCase() === "pending" ? "pending" : "approved"
                        }`}
                      >
                        {application.Status?.toLowerCase() === "pending" ? "Chưa đọc" : "Đã xem"}
                      </span>
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
