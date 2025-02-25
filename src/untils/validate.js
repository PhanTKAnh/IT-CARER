import * as yup from "yup"

export const registerSchema = yup.object().shape({
    FullName: yup.string ().required("Họ và tên không đươcj để trống! "),
    Email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc!"),
    Password:yup.string().min(6,"Mật khẩu ít nhất 6 ký tự!").required("Mật khẩu là bắt buộc!"),
    confirmPassword: yup 
    .string()
    .oneOf([yup.ref("Password")], "Mật khẩu xác nhận không khớp!")
    .required("Bạn phải nhập lại mật khẩu!"),
})