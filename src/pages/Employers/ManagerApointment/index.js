import { useEffect, useState } from "react";
import TableEmployer from "../../../components/Employer/Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cancelInterview, getAllInterviews } from "../../../sevices/employer/interview.sevice";
import { getCookie } from "../../../helpers/cookie";
import Swal from "sweetalert2";


const formatDisplayDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

const formatDate = (dateObj) => {
  const d = new Date(dateObj);
  const year = d.getFullYear();
  const month = (`0${d.getMonth() + 1}`).slice(-2);
  const day = (`0${d.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

const ManagerAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [viewMode, setViewMode] = useState("month");

  const tokenCompany = getCookie("tokenCompany");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getAllInterviews(tokenCompany);
        console.log(response)
        if (response && Array.isArray(response.data)) {
          const mappedAppointments = response.data.map((item, index) => ({
            no:  String(index + 1),
            id: item.id || String(index + 1),
            candidateName: item.candidateName ,
            employerName: item.employerName,
            date: item.date?.split("T")[0] , 
            time: item.time ,
            status: item.status ,
            slug: item.slug || item._id || String(index + 1),
          }));
          setAppointments(mappedAppointments);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách lịch hẹn:", error);
      }
    };

    fetchApi();
  }, [tokenCompany]);

  const headers = [
    { label: "STT", key: "index" },
    { label: "Ứng viên", key: "candidateName" },
    { label: "Nhà tuyển dụng", key: "employerName" },
    {
      label: "Ngày",
      key: "date",
      render: (item) => formatDisplayDate(item.date),
    },
    { label: "Giờ", key: "time" },
    { label: "Trạng thái", key: "status" },
  ];

  const handleStatusChange = (slug, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.slug === slug ? { ...appt, status: newStatus } : appt
      )
    );
  };

  const handleDelete = (slug) => {
    setAppointments((prev) => prev.filter((appt) => appt.slug !== slug));
  };
  const handleCancel = async (id) => {
    try {
      const response = await cancelInterview(id, tokenCompany);
      if (response?.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Hủy lịch hẹn thành công!",
          text: "Lịch hẹn đã được hủy và xóa khỏi danh sách.",
          timer: 2000,
          showConfirmButton: false,
        });
        handleDelete(id); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Hủy không thành công!",
          text: "Có lỗi xảy ra khi hủy lịch hẹn.",
        });
      }
    } catch (error) {
      console.error("Lỗi khi hủy lịch hẹn:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi hệ thống!",
        text: "Đã xảy ra lỗi khi hủy lịch hẹn.",
      });
    }
  };
  


  const actions = [
    {
      label: "Xóa",
      className: "btn-delete",
      onClick: (item) => handleDelete(item.slug),
    },
    {
      label: "Hủy",
      className: "btn-delete",
      onClick: (item) => handleCancel(item.id),
    },
  ];

  const filterAppointmentsByDate = (appointments, selectedDate) => {
    const formattedDate = formatDate(selectedDate);
    return appointments.filter((appt) => appt.date === formattedDate);
  };

  const filterAppointmentsByMonth = (appointments, selectedMonth) => {
    return appointments.filter((appt) => {
      const apptMonth = new Date(appt.date).getMonth() + 1;
      return apptMonth === selectedMonth;
    });
  };

  const filteredData =
    viewMode === "day"
      ? filterAppointmentsByDate(appointments, selectedDate)
      : filterAppointmentsByMonth(appointments, selectedMonth);

  return (
    <div className="manager-appointment-container">
      <h2>Quản lý lịch hẹn</h2>

      <div className="view-mode-toggle">
        <button
          className={viewMode === "month" ? "active" : ""}
          onClick={() => setViewMode("month")}
        >
          Xem theo tháng
        </button>
        <button
          className={viewMode === "day" ? "active" : ""}
          onClick={() => setViewMode("day")}
        >
          Xem theo ngày
        </button>
      </div>

      {viewMode === "day" && (
        <div className="datepicker-container">
          <label>Chọn ngày:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày"
            className="custom-datepicker"
          />
        </div>
      )}

      {viewMode === "month" && (
        <div className="month-select-container">
          <label>Chọn tháng:</label>
          <select
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            value={selectedMonth}
            className="custom-select"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      <TableEmployer
        headers={headers}
        data={filteredData}
        actions={actions}
        onStatusToggle={handleStatusChange}
        itemsPerPage={5}
      />
    </div>
  );
};

export default ManagerAppointment;
