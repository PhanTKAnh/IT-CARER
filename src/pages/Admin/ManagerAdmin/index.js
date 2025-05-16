import React, { useEffect, useState } from "react";
import TableAdmin from "../../../components/Admin/TableAdmin";
import { deletedCompany, ListCompany, updateCompanyStatus } from "../../../sevices/admin/company"; // nhớ import API update
import AdminSearchFilter from "../../../components/Admin/AdminSearchFiilter";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { getCookie } from "../../../helpers/cookie";

function ManagerAdmin() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const tokenAdmin = getCookie("tokenAdmin")


  const headers = [
    { key: "index", label: "STT" },
    { key: "CompanyName", label: "Tên công ty" },
    { key: "Email", label: "Email" },
    { key: "Address", label: "Địa chỉ" },
    { key: "QuantityPeople", label: "Quy mô" },
    { key: "Status", label: "Trạng thái" },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await ListCompany(tokenAdmin);
        if (response.code === 200 && Array.isArray(response.listCompany)) {
          setData(response.listCompany);
          setFilteredData(response.listCompany);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công ty:", error);
      }
    };
    fetchApi();
  }, [tokenAdmin]);

  const handleStatusChange = (status) => {
    if (status === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((company) => company.Status === status);
      setFilteredData(filtered); 
    }
  };

  const handleStatusToggle = async (slug, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const result = await updateCompanyStatus(slug, newStatus,tokenAdmin);
      if (result?.code === 200) {
        const updatedCompany = result.company;
        const newData = data.map((item) =>
          item.slug === updatedCompany.slug ? updatedCompany : item 
        );
        setData(newData);
        setFilteredData(newData);
      } else {
        alert(result.message || "Cập nhật trạng thái thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  const handleView = (row) => {
    navigate(`/admin/employer/company/${row.slug}`);
  };
  const handleDelete = async (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Gọi API xóa công ty
          const response = await deletedCompany(row._id);
          
          if (response.code === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your company has been deleted.",
              icon: "success"
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "There was an issue deleting the company.",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("Error deleting company:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the company.",
            icon: "error"
          });
        }
      }
    });
  };
  

  return (
    <div>
      <h2>Danh sách công ty</h2>
      <AdminSearchFilter onStatusChange={handleStatusChange} />
      <TableAdmin
        headers={headers}
        data={filteredData}
        onStatusToggle={handleStatusToggle} 
        actions={[
          { label: "Xem", className: "view", onClick: handleView },
          { label: "Xóa", className: "delete", onClick: handleDelete },
        ]}
      />
    </div>
  );
}

export default ManagerAdmin;
