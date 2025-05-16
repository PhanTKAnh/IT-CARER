import TinyEditor from "../../../components/Employer/TinyEditor";
import { applicationSendEmail } from "../../../sevices/employer/application.sevice";
import Swal from "sweetalert2";
import { getCookie } from "../../../helpers/cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "../../../untils/validate";
import { useForm } from "react-hook-form";

const ComposeMail = ({ showModal, setShowModal, selectedCandidate }) => {
  const tokenCompany = getCookie("tokenCompany");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
    defaultValues: {
      subject: "",
      content: "",
    },
  });

  const onSubmit = async (data) => {
    const emailData = {
      recipientEmail: selectedCandidate?.Email,
      subject: data.subject,
      content: data.content,
    };

    try {
      const response = await applicationSendEmail(emailData, tokenCompany);

      if (response.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: `Đã gửi mail cho ${selectedCandidate?.Email}`,
        });
        setShowModal(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Gửi mail thất bại!",
        });
      }
    } catch (error) {
      console.error("Lỗi khi gửi mail:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Đã có lỗi xảy ra khi gửi mail.",
      });
    }
  };

  // Đồng bộ TinyEditor content với react-hook-form
  const handleEditorChange = (value) => {
    setValue("content", value);
  };

  if (!showModal) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mail-modal-overlay">
        <div className="mail-modal">
          <h3>Soạn mail cho {selectedCandidate?.FullName}</h3>
          <p>
            <strong>Email:</strong> {selectedCandidate?.Email}
          </p>

          <input
            type="text"
            placeholder="Chủ đề"
            className="mail-input"
            {...register("subject")}
          />
          {errors.subject && (
            <p style={{ color: "red" }}>{errors.subject.message}</p>
          )}

          <TinyEditor
            value={getValues("content")}
            onChange={handleEditorChange}
            name="emailContent"
            label="Nội dung"
          />
          {errors.content && (
            <p style={{ color: "red" }}>{errors.content.message}</p>
          )}

          <div className="mail-actions">
            <button type="button" onClick={() => setShowModal(false)}>
              Hủy
            </button>
            <button type="submit">Gửi</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ComposeMail;
