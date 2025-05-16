import React, { useEffect, useState } from "react";
import TableEmployer from "../../../components/Employer/Table";
import { AiFillStar } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ComposeMail from "../ComposeMail.js";
import { getCookie } from "../../../helpers/cookie.js";
import { deletePotentialCandidate, getPotentialCandidate } from "../../../sevices/employer/potential.sevice.js";
import Swal from "sweetalert2";


const ManagePotentialCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [showMailModal, setShowMailModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const tokenCompany = getCookie("tokenCompany");

  useEffect(() => {
    const fetchPotentialCandidates = async () => {
      try {
        const res = await getPotentialCandidate(tokenCompany);
  
        if (Array.isArray(res.candidates) && res.candidates.length > 0) {
          setCandidates(res.candidates);
        } else {
          console.error("Dữ liệu ứng viên không hợp lệ hoặc trống.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu ứng viên tiềm năng:", error);
      }
    };
    fetchPotentialCandidates();
  }, [tokenCompany]);

  

  const handleViewCV = (candidate) => {
    window.open(candidate.cvUrl, "_blank");
  };

  const handleSendMail = (candidate) => {
    setSelectedCandidate(candidate);
    setShowMailModal(true);
  };
  const handleDeleteMarkPotential = async (candidate) => {
    try {
      const response = await deletePotentialCandidate(candidate._id, tokenCompany);
  
      if (response.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Ứng viên đã được xóa khỏi danh sách tiềm năng!",
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: response.message || "Không thể xóa ứng viên khỏi danh sách tiềm năng.",
        });
      }
    } catch (error) {
      console.error("Lỗi khi xóa ứng viên tiềm năng:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Đã xảy ra lỗi khi xóa ứng viên khỏi danh sách tiềm năng!",
      });
    }
  };
  
  

  const actions = [
    {
      label: (
        <>
          <FaEye style={{ marginRight: 4 }} /> Xem CV
        </>
      ),
      className: "view-btn",
      onClick: handleViewCV,
    },
    {
      label: (
        <>
          <MdEmail style={{ marginRight: 4 }} /> Soạn mail
        </>
      ),
      className: "mail-btn",
      onClick: handleSendMail,
    },
    {
      label: (
        <>
          <AiFillStar style={{ marginRight: 4, color: "gold" }} /> xóa đánh dấu tiềm năng
        </>
      ),
      className: "potential-btn",
      onClick: handleDeleteMarkPotential,
    },
  ];

  const headers = [
    { label: "STT", key: "index" },
    { label: "Tên Ứng viên", key: "FullName" },
    { label: "Vị trí ứng tuyển", key: "positionApplied" },
    { label: "Ngày ứng tuyển", key: "dateApplied" },
    { label: "Email", key: "Email" },
    { label: "Trạng thái ứng viên", key: "Status" },
  ];

  const data = Array.isArray(candidates) ? candidates.map((candidate) => {
    return {
      ...candidate,
      positionApplied: candidate.job.Name, 
      dateApplied: candidate.dateApplied
        ? new Date(candidate.dateApplied).toLocaleDateString("vi-VN")
        : "Không xác định",
      Status: candidate.Status
    };
  }) : [];

  return (
    <div className="manage-potential-candidates-container">
      <h2 className="title">Danh sách ứng viên tiềm năng</h2>

      <TableEmployer headers={headers} data={data} actions={actions} />

      <ComposeMail
        showModal={showMailModal}
        setShowModal={setShowMailModal}
        selectedCandidate={selectedCandidate}
      />
    </div>
  );
};

export default ManagePotentialCandidates;
