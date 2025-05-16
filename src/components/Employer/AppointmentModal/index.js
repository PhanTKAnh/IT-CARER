import { getCookie } from "../../../helpers/cookie";
import { createAppointment } from "../../../sevices/employer/interview.sevice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TinyEditor from "../TinyEditor";
import { appointmentSchema } from "../../../untils/validate";
import Swal from "sweetalert2";


const AppointmentModal = ({ show, setShow, data }) => {
  const tokenCompany = getCookie("tokenCompany");
  console.log(data)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      time: "",
      location: "",
      notes: "",
    },
  });

  if (!show) return null;

  const onSubmit = async (formData) => {
    const payload = {
      candidateId: data?.candidateId,
      applicationId: data?._id,
      IdJob: data?.IdJob,
      location: formData.location,
      note: formData.notes,
      time: formData.time,
    };
    try {
      const res = await createAppointment(payload, tokenCompany);
      if (res.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Lịch hẹn đã được tạo thành công.",
        });
        reset();
        setShow(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: res.message || "Không thể tạo lịch hẹn.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Đã có lỗi xảy ra. Vui lòng thử lại.",
      });
    }
  };
  

  const handleEditorChange = (content) => {
    setValue("notes", content);
  };

  const handleClose = () => {
    setShow(false);
    reset();
  };

  return (
    <div className="appointment-modal-overlay">
      <div className="appointment-modal">
        <h3>Đặt lịch hẹn phỏng vấn</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="time">Ngày và giờ hẹn</label>
          <input type="datetime-local" id="time" {...register("time")} />
          {errors.time && <p className="error">{errors.time.message}</p>}

          <label htmlFor="location">Địa điểm</label>
          <input type="text" id="location" {...register("location")} />
          {errors.location && <p className="error">{errors.location.message}</p>}

          <label>Ghi chú</label>
          <TinyEditor
            name="notes"
            onChange={handleEditorChange}
            value=""
            label=""
          />
          {errors.notes && <p className="error">{errors.notes.message}</p>}

          <div className="appointment-modal-actions">
            <button type="submit">Xác nhận</button>
            <button type="button" onClick={handleClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
