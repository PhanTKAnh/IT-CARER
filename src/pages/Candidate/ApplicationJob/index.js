import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookie";
import { Skeleton } from "antd";
import { getApplication } from "../../../sevices/candidate/application.sevies";

function ApplicationJob() {
  const [jobApplication, setJobApplication] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm state loading
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
            ? // Hiển thị Skeleton khi đang tải dữ liệu
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="job-item">
                  <Skeleton.Image style={{ width: 100, height: 100 }} active />
                  <div className="job-ct">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </div>
                </div>
              ))
            : // Hiển thị dữ liệu khi đã load xong
              jobApplication.map((application) => (
                <div key={application._id} className="job-item">
                  <div className="job-img">
                    <img
                      src={application.company?.logo || "/default-logo.png"}
                      alt={application.company?.name || "Unknown Company"}
                      className="company-logo"
                    />
                  </div>
                  <div className="job-ct">
                    <h3>{application.job?.Name || "Không có dữ liệu"}</h3>
                    <p>Công ty: {application.company?.name || "Không có dữ liệu"}</p>
                    <p>
                      <strong>Trạng thái:</strong>{" "}
                      <span
                        className={`status ${
                          application.StatusRead?.toLowerCase() === "unread" ? "unRead" : "read"
                        }`}
                      >
                        {application.StatusRead?.toLowerCase() === "unread" ? "Chưa đọc" : "Đã xem"}
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
