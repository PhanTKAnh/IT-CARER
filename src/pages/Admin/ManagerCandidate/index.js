import React, { useState, useEffect } from "react";
import TableAdmin from "../../../components/Admin/TableAdmin";
import { listCandidate } from "../../../sevices/admin/candidate.sevies";
import { getCookie } from "../../../helpers/cookie";
const headers = [
  { label: "STT", key: "index" },
  { label: "Họ và tên", key: "FullName" },
  { label: "Email", key: "Email" },
  { label: "Số điện thoại", key: "PhoneNumber" },
  { label: "Trạng thái", key: "Status" },
];

const actions = [];

const ManagerCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const tokenAdmin = getCookie("tokenAdmin")


  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await listCandidate(tokenAdmin); 
        console.log(response)
        if (response.code === 200) {
          setCandidates(response.data); 
        } else {
          console.error("Lỗi khi lấy danh sách ứng viên:", response.message);
        }
      } catch (error) {
        console.error("Lỗi hệ thống:", error);
      }
    };

    fetchCandidates();
  }, [tokenAdmin]);

  return (
    <div className="admin-candidates-page">
      <h1>Danh sách ứng viên</h1>
      <TableAdmin
        headers={headers}
        data={candidates}
        actions={actions}
        itemsPerPage={10}
      />
    </div>
  );
};

export default ManagerCandidates;
 