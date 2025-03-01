
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