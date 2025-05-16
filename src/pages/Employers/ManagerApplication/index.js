import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import TableEmployer from "../../../components/Employer/Table";
import { getCookie } from "../../../helpers/cookie";
import SearchFilter from "../../../components/Employer/SearchFilter";
import { getListApplication } from "../../../sevices/employer/application.sevice";

const ApplicationList = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const tokenCompany = getCookie("tokenCompany");
  const [jobsData, setJobsData] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const jobName = queryParams.get("jobName") || ""; 
    const status = queryParams.get("status") || ""; 
    setSearch(jobName); 
    setStatusFilter(status);

    const fetchApi = async () => {
      try {
        const response = await getListApplication(tokenCompany, { jobName, status });
        if (response.length > 0) {
          const grouped = {};
          response.forEach(app => {
            const jobId = app.job?._id;
            if (jobId) {
              if (!grouped[jobId]) {
                grouped[jobId] = {
                  id: jobId,
                  title: app.job?.Name,
                  datePosted: new Date(app.createdAt).toLocaleDateString("vi-VN"),
                  applicationsCount: 1,
                  Status: "active", 
                  slug: app.job?.slug,
                };
              } else {
                grouped[jobId].applicationsCount += 1;
              }
            }
          });
          const jobs = Object.values(grouped);
          setJobsData(jobs);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };

    fetchApi();
  }, [location.search, tokenCompany]); // Chạy lại khi URL thay đổi

  const filteredJobs = jobsData.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "" || job.Status === statusFilter)
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleView = (row) => {
    console.log("Row selected:", row);
    navigate(`/nha-tuyen-dung/don-ung-tuyen/${row.slug}`);
  };

  const handleStatusToggle = async (id, currentStatus) => {
    console.log(`Toggle status of job ${id} from ${currentStatus}`);
  };

  const headers = [
    { key: "index", label: "STT" },
    { label: "Tên công việc", key: "title" },
    { label: "Ngày đăng", key: "datePosted" },
    { label: "Số đơn ứng tuyển", key: "applicationsCount" },
    { label: "Trạng thái", key: "Status" },
  ];

  return (
    <div className="joblist">
      <SearchFilter
        onStatusChange={handleStatusChange}
        onChange={handleSearchChange}
        searchValue={search}
      />
      
      <TableEmployer
        headers={headers}
        data={filteredJobs}
        actions={[{ label: "Xem", className: "view", onClick: handleView }]}
        itemsPerPage={5}
        onStatusToggle={handleStatusToggle}
      />
    </div>
  );
};

export default ApplicationList;
