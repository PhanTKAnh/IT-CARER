import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";  // Import SweetAlert2
import { applyModalSchema } from "../../../untils/validate";
import { postApplication } from "../../../sevices/candidate/application.sevies";
import { uploadFile } from "../../../sevices/upload/uploadFile";

const ApplyModal = ({ show, handleClose, jobDetail, candidateInfo, tokenCandidate }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(applyModalSchema),
    defaultValues: {
      phone: "",
      cv: null,
    },
  });

  const selectedCv = watch("cv");

  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [show]);
  if (!show) return null; 

  const handleUploadImage = async (cv) => {
    setIsLoading(true); 
    const formData = new FormData();
    formData.append("file", cv);
    try {
      const uploadResponse = await uploadFile(formData);
      if (!uploadResponse.linkUrl) {
        throw new Error("Lỗi: Không nhận được URL file từ server");
      }
      return uploadResponse.linkUrl;
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể upload CV",
      });
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true); 
    const LinkCV = await handleUploadImage(data.cv);
    if (!LinkCV) {
      setIsLoading(false);
      return;
    }

    const options = {
      IdCompany: jobDetail.company._id,
      IdJob: jobDetail._id,
      LinkCV: LinkCV,
    };

    const response = await postApplication(options, tokenCandidate);
    if (response.code === 200) {
      Swal.fire({
        icon: "success",
        title: "Nộp đơn thành công!",
        text: "Bạn đã nộp đơn thành công.",
      });
      reset();
      handleClose();
    } else if (response.code === 400) {
      Swal.fire({
        icon: "warning",
        title: "Cảnh báo",
        text: "Bạn đã ứng tuyển công việc này rồi. Vui lòng kiểm tra lại lịch sử ứng tuyển của bạn.",
      });
      reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Nộp đơn thất bại!",
        text: "Đã xảy ra lỗi khi nộp đơn.",
      });
      

    }
    setIsLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setValue("cv", file, { shouldValidate: true });
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="modal-overlay" onClick={isLoading ? null : handleClose}>
      <div className={isLoading ? "modal-content modal-disabled" : "modal-content"} onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={isLoading ? null : handleClose}>&times;</span>
        <h2>Nộp đơn {jobDetail?.Name || "Công việc"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p><strong>{candidateInfo?.FullName}</strong></p>
          <label htmlFor="email">{candidateInfo?.Email}</label>

          <h4>Hồ sơ xin việc*</h4>
          <label htmlFor="cv" className="file-upload">
            {selectedCv ? selectedCv.name : "Chọn hồ sơ"}
          </label>
          <input type="file" id="cv" accept=".pdf" {...register("cv")} onChange={handleFileChange} disabled={isLoading} />
          {errors.cv && <p className="error">{errors.cv.message}</p>}

          {previewUrl && (
            <div className="preview-container">
              <h4>Xem trước:</h4>
              {selectedCv?.type === "application/pdf" ? (
                <iframe src={previewUrl} width="100%" height="400px" title="Preview CV"></iframe>
              ) : selectedCv?.type.startsWith("image/") ? (
                <img src={previewUrl} alt="Preview CV" width="100%" />
              ) : (
                <p>Không thể xem trước loại file này.</p>
              )}
            </div>
          )}

          <label htmlFor="phone">Số điện thoại*</label>
          <input
            type="tel"
            id="phone"
            pattern="[0-9\s\-+.]{8,}"
            placeholder="Nhập số điện thoại"
            {...register("phone")}
            disabled={isLoading}
          />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
          <p>Nhà tuyển dụng có thể liên hệ với bạn qua số điện thoại này.</p>

          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Đang tải..." : "Nộp đơn ngay"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
