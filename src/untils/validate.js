
import * as yup from "yup"

export const registerSchema = yup.object().shape({
    FullName: yup.string ().required("Họ và tên không được để trống! "),
    Email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc!"),
    Password:yup.string().min(6,"Mật khẩu ít nhất 6 ký tự!").required("Mật khẩu là bắt buộc!"),
    confirmPassword: yup 
    .string()
    .oneOf([yup.ref("Password")], "Mật khẩu xác nhận không khớp!")
    .required("Bạn phải nhập lại mật khẩu!"),
});

export const loginSchema = yup.object().shape({
    Email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc!"),
    Password: yup.string().min(6,"Mật khẩu ít nhất 6 ký tự").required("Mật khẩu là bắt buộc!")
});

export const otpSchema = yup.object().shape({
    otp: yup.string()
      .matches(/^\d{6}$/, "Mã OTP phải gồm 6 chữ số")
      .required("Vui lòng nhập mã OTP"),
  });
  export const resetPasswordSchema= yup.object().shape({
    Password:yup.string().min(6,"Mật khẩu ít nhất 6 ký tự!").required("Mật khẩu là bắt buộc!"),
    confirmPassword: yup 
    .string()
    .oneOf([yup.ref("Password")], "Mật khẩu xác nhận không khớp!")
    .required("Bạn phải nhập lại mật khẩu!"),
});

export const applyModalSchema = yup.object().shape({
    phone: yup
      .string()
      .matches(/^[0-9\s\-+.]{8,}$/, "Số điện thoại không hợp lệ")
      .required("Vui lòng nhập số điện thoại"),
  
    cv: yup
      .mixed()
      .test("required", "Vui lòng chọn file hồ sơ", (value) => {
        return value instanceof File; // Kiểm tra có file hay không
      })
      .test("fileSize", "File phải nhỏ hơn 3MB", (value) => {
        return value instanceof File ? value.size <= 3 * 1024 * 1024 : false;
      })
      .test("fileType", "File không đúng định dạng", (value) => {
        if (!(value instanceof File)) return false;
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "image/png",
          "image/jpeg",
        ];
        return allowedTypes.includes(value.type);
      }),
  });
  
  export const changePasswordSchema = yup.object().shape({
    oldPassword:yup.string().min(6,"Mật khẩu ít nhất 6 ký tự!").required("Mật khẩu là bắt buộc!"),
    newPassword:yup.string().min(6,"Mật khẩu ít nhất 6 ký tự!").required("Mật khẩu là bắt buộc!"),
    confirmPassword: yup 
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không khớp!")
    .required("Bạn phải nhập lại mật khẩu!"),
});
export const profileSchema = yup.object().shape({
  FullName: yup.string().required("Họ và tên không được để trống!"),
  Email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc!"),
  Gender: yup.string().oneOf(["Nam", "Nữ", "Khác"], "Giới tính không hợp lệ"),
  BirthDate: yup.date().max(new Date(), "Ngày sinh không hợp lệ"),
  MaritalStatus: yup.string().required("Không được để trống!"),
  PhoneNumber: yup.string().matches(/^[0-9\s\-+.]{8,}$/, "Số điện thoại không hợp lệ").required("Số điện thoại là bắt buộc!"),
  Address: yup.string().required("Địa chỉ không được để trống!"),
});

export const employerRegisterSchema = yup.object().shape({
  Email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc!"),
  Password: yup.string().min(6, "Mật khẩu ít nhất 6 ký tự!").required("Mật khẩu là bắt buộc!"),
  confirmPassword: yup
      .string()
      .oneOf([yup.ref("Password")], "Mật khẩu xác nhận không khớp!")
      .required("Bạn phải nhập lại mật khẩu!"),

  CompanyName: yup.string().required("Tên công ty không được để trống!"),
  QuantityPeople: yup.string().required("Vui lòng chọn số nhân viên!"),

  ContactPerson: yup.string().required("Người liên hệ không được để trống!"),
  Phone: yup
      .string()
      .matches(/^[0-9\s\-+.]{8,}$/, "Số điện thoại không hợp lệ!")
      .required("Vui lòng nhập số điện thoại!"),

  Address: yup.string().required("Địa chỉ không được để trống!"),
  City: yup.string().required("Vui lòng chọn tỉnh, thành phố!"),
  Country: yup.string().required("Vui lòng chọn quốc gia!"),
});
export const employerLoginSchema = yup.object().shape({
  Email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc!"),
  Password: yup.string().min(3, "Mật khẩu ít nhất 6 ký tự!").required("Mật khẩu là bắt buộc!"),
  
});
export const jobSchema = yup.object().shape({
  Name: yup.string().required('Tên công việc là bắt buộc'),
  SalaryMin: yup
    .number()
    .typeError('Lương tối thiểu phải là số')
    .min(0, 'Lương không được âm')
    .required('Lương tối thiểu là bắt buộc'),
  SalaryMax: yup
    .number()
    .typeError('Lương tối đa phải là số')
    .moreThan(yup.ref('SalaryMin'), 'Lương tối đa phải lớn hơn lương tối thiểu')
    .required('Lương tối đa là bắt buộc'),
  Experience: yup
    .number()
    .typeError('Kinh nghiệm phải là số')
    .min(0, 'Kinh nghiệm không được âm')
    .required('Kinh nghiệm là bắt buộc'),
  Level: yup.string().required('Cấp độ là bắt buộc'),
  City: yup.array().min(1, 'Chọn ít nhất 1 thành phố'),
  Tags: yup.array().min(1, 'Chọn ít nhất 1 tag'),
  expirationDate: yup.string().required('Ngày hết hạn là bắt buộc'),
  Detail: yup.string().required('Thông tin chi tiết là bắt buộc'),
  Requirements: yup.string().required('Yêu cầu công việc là bắt buộc'),
});
export const emailSchema = yup.object().shape({
  subject: yup.string().required("Chủ đề không được để trống!"),
  content: yup.string().required("Nội dung không được để trống!"),
});
export const appointmentSchema = yup.object().shape({
  time: yup.date().required("Thời gian không được để trống!"),
  location: yup.string().required("Địa điểm không được để trống!"),
  note: yup.string(),
});