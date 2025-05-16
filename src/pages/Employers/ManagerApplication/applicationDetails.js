import { useEffect, useState } from "react";
import TableEmployer from "../../../components/Employer/Table";
import BackButton from "../../../components/BackButton";
import { applicationChangeStatus, applicationOfJob } from "../../../sevices/employer/application.sevice";
import { getCookie } from "../../../helpers/cookie";
import { useParams } from "react-router-dom";
import ComposeMail from "../ComposeMail.js";
import { FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import Swal from "sweetalert2"; // nhớ cài nếu chưa có
import AppointmentModal from "../../../components/Employer/AppointmentModal/index.js";
import { markAsPotentialCandidate } from "../../../sevices/employer/potential.sevice.js";

const ApplicationDetails = () => {
  const [applications, setApplications] = useState([]);
  const { slugJob } = useParams();
  const [jobName, setJobName] = useState("");
  const tokenCompany = getCookie("tokenCompany");
  const [showMailModal, setShowMailModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedForAppointment, setSelectedForAppointment] = useState({});
const fetchApplications = async () => {
      try {
        const response = await applicationOfJob(slugJob, tokenCompany);
        if (response.code === 200) {
          const jobData = response.job;
          const mappedApplications = jobData.applications.map((app, index) => ({
            id: index + 1,
            _id: app._id,
            candidateId: app.IdCandidate._id,
            FullName: app.IdCandidate.FullName,
            Email: app.IdCandidate.Email,
            dateApplied: new Date(app.createdAt).toLocaleDateString("vi-VN"),
            Status: app.Status,
            cvUrl: app.LinkCV,
            IdJob: app.IdJob
          }));

          setApplications(mappedApplications);
          setJobName(jobData.name);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu ứng tuyển:", error);
      }
    };
  useEffect(() => {

    fetchApplications();
  }, [slugJob, tokenCompany]);

  const headers = [
    { key: "index", label: "STT" },
    { label: " Ứng viên", key: "FullName" },
    { label: "Ngày ứng tuyển", key: "dateApplied" },
    { label: "Email", key: "Email" },
    { label: "Trạng thái", key: "Status" },
  ];
const handleStatusClick = (slug, status) => {
 
};

  const data = applications.map((item) => ({
    ...item,
    Status: item.Status,
    slug: item.id,
  }));

  const handleViewCV = async (record) => {
    const changeStatusApp = await applicationChangeStatus(record._id, tokenCompany);
    if (changeStatusApp.code === 200) {
        await fetchApplications();
      window.open(record.cvUrl, "_blank");
            setTimeout(() => {
        setSelectedCandidate(record);
        // setShowMailModal(true);  
      }, 100); 
    }
  };

  const handleMarkPotential = async (record) => {
    try {
      const options = {
        IdCandidate: record.candidateId,
        IdJob: record.IdJob,
      };
      const response = await markAsPotentialCandidate(options, tokenCompany);
      if (response.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Ứng viên đã được đánh dấu là tiềm năng!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: response.message || "Không thể đánh dấu ứng viên.",
        });
      }
    } catch (error) {
      console.error("Lỗi khi đánh dấu ứng viên tiềm năng:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Đã xảy ra lỗi khi đánh dấu ứng viên!",
      });
    }
  };

  const handleSendMail = (record) => {
    setSelectedCandidate(record);
        setTimeout(() => {
      setShowMailModal(true);  
    }, 100);
  };

  const handleCreateAppointment = (record) => {
    setSelectedForAppointment(record);
    setShowAppointmentModal(true);
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
          <AiFillStar style={{ marginRight: 4, color: "gold" }} /> Ứng viên tiềm năng
        </>
      ),
      className: "potential-btn",
      onClick: handleMarkPotential,
    },
    {
      label: (
        <>
          📅 Tạo lịch hẹn
        </>
      ),
      className: "action-btn schedule-btn",
      onClick: handleCreateAppointment,
    }
  ];

  return (
    <div className="application-details-container">
      <BackButton />
      <h2 className="title">Danh sách đơn ứng tuyển cho công việc: {jobName}</h2>
      <TableEmployer
        headers={headers}
        data={data}
        actions={actions}
          onStatusToggle={handleStatusClick}
      />
      <ComposeMail
        showModal={showMailModal}
        setShowModal={setShowMailModal}
        selectedCandidate={selectedCandidate}
      />
<AppointmentModal
  show={showAppointmentModal}  
  setShow={setShowAppointmentModal}  
  data={selectedForAppointment}
/>
    </div>
  );
};

export default ApplicationDetails;
