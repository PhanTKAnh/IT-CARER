import React, { useEffect, useState } from "react";
import TableEmployer from "../../../components/Employer/Table";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SearchFilter from "../../../components/Employer/SearchFilter";
import { deletedJob, getListJobs, updateJobStatus } from "../../../sevices/employer/job.sevice";
import { getCookie } from "../../../helpers/cookie";

function ManagerJob() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState(""); 
  const [activeStatus, setActiveStatus] = useState(""); 
  const navigate = useNavigate();
  const tokenCompany = getCookie("tokenCompany");

  const headers = [
    { key: "index", label: "STT" },
    { key: "Name", label: "Tên công việc" },
    { key: "Level", label: "Cấp độ" },
    { key: "Experience", label: "Kinh nghiệm (tháng)" },
    { key: "SalaryMin", label: "Lương tối thiểu" },
    { key: "SalaryMax", label: "Lương tối đa" },
    { key: "Status", label: "Trạng thái" },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getListJobs(tokenCompany);
        if (response.code === 200) {
          setData(response.data);
          setFilteredData(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };
    fetchApi();
  }, [tokenCompany]);

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    // Lọc dữ liệu dựa trên trạng thái và từ khóa tìm kiếm
    const filtered = data.filter(
      (job) =>
        job.Name.toLowerCase().includes(searchValue.toLowerCase()) &&
        (status === "" || job.Status === status)
    );
    setFilteredData(filtered);
  };

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchValue(keyword);
    // Lọc dữ liệu khi thay đổi từ khóa tìm kiếm
    const filtered = data.filter(
      (job) =>
        job.Name.toLowerCase().includes(keyword.toLowerCase()) &&
        (activeStatus === "" || job.Status === activeStatus)
    );
    setFilteredData(filtered);
  };

  const handleView = (row) => {
    navigate(`/nha-tuyen-dung/cong-viec/chi-tiet-cong-viec/${row.slug}`);
  };

  const handleDelete = async (row) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Hành động này sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, xóa!",
      cancelButtonText: "Hủy"
    }).then(async (result) => {
      if (result.isConfirmed) { 
        try {
          const response = await deletedJob(row._id, tokenCompany); 
          if (response.code === 200) {
            Swal.fire({
              title: "Đã xóa!",
              text: "Công việc đã được xóa thành công.",
              icon: "success"
            });
            // Cập nhật lại danh sách công việc
            setData(data.filter(job => job._id !== row._id));
            setFilteredData(filteredData.filter(job => job._id !== row._id));
          } else {
            Swal.fire({
              title: "Thất bại!",
              text: "Đã có lỗi khi xóa công việc.",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("Lỗi khi xóa công việc:", error);
          Swal.fire({
            title: "Lỗi!",
            text: "Đã xảy ra lỗi khi xóa công việc.",
            icon: "error"
          });
        }
      }
    });
  };

  const handleFix = async (row) => {
    navigate(`/nha-tuyen-dung/cong-viec/sua-cong-viec/${row.slug}`);
  };

  const handleStatusToggle = async (slug, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const result = await updateJobStatus(slug, newStatus, tokenCompany);
      if (result?.code === 200 && result.job) {
        const updatedJob = result.job;
        const newData = data.map((item) =>
          item.slug === updatedJob.slug ? { ...item, ...updatedJob } : item
        );
        setData(newData);
        setFilteredData(newData);
      } else {
        alert(result.message || "Cập nhật trạng thái thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
  };

  return (
    <div>
   
      <SearchFilter 
        onStatusChange={handleStatusChange} 
        onChange={handleSearchChange} 
        searchValue={searchValue} 
      />
      <button className="create-job-btn" onClick={() => navigate("/nha-tuyen-dung/cong-viec/them-cong-viec")}>
        + Tạo công việc mới
      </button>
      <TableEmployer
        headers={headers}
        data={filteredData}
        onStatusToggle={handleStatusToggle}
        actions={[
          { label: "Xem", className: "view", onClick: handleView },
          { label: "Sửa", className: "fix", onClick: handleFix },
          { label: "Xóa", className: "delete", onClick: handleDelete },
        ]}
      />
    </div>
  );
}

export default ManagerJob;
