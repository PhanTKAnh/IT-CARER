import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useForm } from 'react-hook-form';
import { QuantityPeople } from '../../../model/registerCompany';
import { getListCities } from '../../../sevices/candidate/city.sevices';
import { employerRegisterSchema } from '../../../untils/validate';
import { postEmployer } from '../../../sevices/employer/company.sevice';
import Swal from 'sweetalert2'; 

function EmployerRegistration() {
    const [showPassword, setShowPassword] = useState({
        Password: false,
        confirmPassword: false,
    });
    const [dataCities, setDataCities] = useState([]);
    const [loading, setLoading] = useState(false);  
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(employerRegisterSchema),
    });

    useEffect(() => {
        let isMounted = true;
        const fetchApi = async () => {
            try {
                const cities = await getListCities();
                if (isMounted) {
                    setDataCities(cities);
                }
            } catch (error) {
                console.error("Failed to fetch cities", error);
            }
        };
        fetchApi();

        return () => {
            isMounted = false;
        };
    }, []);

    const onSubmit = async (data) => {
        setLoading(true); // Bật loading khi gửi form

        const fullAddress = `${data.Address}, ${data.City}, Việt Nam`;

        const submitData = {
            CompanyName: data.CompanyName,
            Email: data.Email,
            Password: data.Password,
            QuantityPeople: data.QuantityPeople,
            Phone: data.Phone,
            ContactPerson: data.ContactPerson,
            Address: fullAddress,
        };

        try {
            const employer = await postEmployer(submitData);

            if (employer.code === 200) {
                // Sử dụng SweetAlert2 để hiển thị thông báo thành công
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng ký thành công!',
                    text: 'Vui lòng kiểm tra email để xác minh tài khoản.',
                });

                reset();
                setErrorMessage("")
            } else {
                setErrorMessage(employer.message || "Đăng ký thất bại, vui lòng thử lại!");
            }
        } catch (error) {
            setErrorMessage(error.message || "Có lỗi xảy ra!");
        } finally {
            // Đảm bảo set loading = false dù thành công hay thất bại
            setLoading(false);
        }
    };

    const togglePassword = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <div className="register-form__container">
            <div className="register-form__header">
                <h1 className="register-form__title">Nhà tuyển dụng đăng ký</h1>
                <p className="register-form__description">Tạo tài khoản để tiếp cận kho ứng viên chất lượng và bắt đầu đăng việc ngay</p>
            </div>
            <form className="register-form__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="register-form__group">
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("Email")}
                        autoComplete="Email"
                        className="register-form__input"
                    />
                    {errors.Email && <span className="error">{errors.Email.message}</span>}
                </div>

                {/* Password fields */}
                <div className="register-form__group login__input-box">
                    <input
                        type={showPassword.Password ? "text" : "password"}
                        placeholder="Mật khẩu"
                        {...register("Password")}
                        autoComplete="new-password"
                    />
                    <i onClick={() => togglePassword("Password")}>
                        {showPassword.Password ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </i>
                    {errors.Password && <span className="error">{errors.Password.message}</span>}
                </div>

                <div className="register-form__group login__input-box">
                    <input
                        type={showPassword.confirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        {...register("confirmPassword")}
                        autoComplete="new-password"
                    />
                    <i onClick={() => togglePassword("confirmPassword")}>
                        {showPassword.confirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </i>
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                </div>

                {/* Company info */}
                <h5 className="register-form__section-title">Thông tin công ty</h5>
                <div className="register-form__group">
                    <input
                        type="text"
                        placeholder="Tên công ty"
                        {...register("CompanyName")}
                        className="register-form__input"
                    />
                    {errors.CompanyName && <span className="error">{errors.CompanyName.message}</span>}
                </div>

                <div className="register-form__group">
                    <select className="register-form__select" {...register("QuantityPeople")}>
                        <option value="">Số nhân viên</option>
                        {QuantityPeople.map((item, index) => (
                            <option key={index} value={item.QuantityPeople}>{item.QuantityPeople}</option>
                        ))}
                    </select>
                    {errors.CompanySize && <span className="error">{errors.CompanySize.message}</span>}
                </div>

                {/* Contact info */}
                <div className="register-form__contact">
                    <div className="register-form__group">
                        <input
                            type="text"
                            placeholder="Người liên hệ"
                            {...register("ContactPerson")}
                            className="register-form__input"
                        />
                        {errors.ContactPerson && <span className="error">{errors.ContactPerson.message}</span>}
                    </div>

                    <div className="register-form__group">
                        <input
                            type="text"
                            placeholder="Điện thoại"
                            {...register("Phone")}
                            className="register-form__input"
                        />
                        {errors.Phone && <span className="error">{errors.Phone.message}</span>}
                    </div>
                </div>

                {/* Address info */}
                <div className="register-form__address">
                    <div className="register-form__group">
                        <input
                            type="text"
                            placeholder="Số nhà, phường, xã, quận, huyện"
                            className="register-form__input"
                            {...register("Address")}
                        />
                        {errors.Address && <span className="error">{errors.Address.message}</span>}
                    </div>

                    <div className="register-form__group">
                        <select className="register-form__select" {...register("City")}>
                            <option value="">Chọn tỉnh, thành phố</option>
                            {dataCities.length === 0 ? (
                                <option>Đang tải...</option>
                            ) : (
                                dataCities.map((city, index) => (
                                    <option key={index} value={city.CityName}>{city.CityName}</option>
                                ))
                            )}
                        </select>
                        {errors.City && <span className="error">{errors.City.message}</span>}
                    </div>

                    <div className="register-form__group">
                        <input
                            type="text"
                            className="register-form__input"
                            value="Việt Nam"
                            readOnly
                            {...register("Country")}
                        />
                        {errors.Country && <span className="error">{errors.Country.message}</span>}
                    </div>
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}

                <button type="submit" className="register-form__button" disabled={loading}>
                    {loading ? "Đang đăng ký..." : "Đăng ký ngay"}
                </button>
            </form>
        </div>
    );
};

export default EmployerRegistration;
