import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { uploadFields } from "../../../sevices/upload/uploadFile";
import { settingGeneral, getSettingGeneral } from "../../../sevices/admin/setting-general.sevies";
import { getCookie } from "../../../helpers/cookie";

const GeneralSettings = () => {
  const [form, setForm] = useState({
    websiteName: "",
    logo: null,
    phone: "",
    email: "",
    address: "",
    copyright: "",
    sliderImages: [],
  });

  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const tokenAdmin = getCookie("tokenAdmin")


  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const res = await getSettingGeneral(tokenAdmin);
        if (res && res.data) {
          const data = res.data;
          setForm({
            websiteName: data.websiteName || "",
            logo: data.logo || null,
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
            copyright: data.copyright || "",
            sliderImages: data.sliderImages || [],
          });
        }
      } catch (error) {
        console.error("Lỗi khi tải cài đặt:", error);
      }
    };

    fetchSetting();
  }, [tokenAdmin]); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === "sliderImages") {
        setForm((prevState) => ({
          ...prevState,
          sliderImages: [...prevState.sliderImages, ...Array.from(files)],
        }));
      } else {
        setForm((prevState) => ({
          ...prevState,
          [name]: files[0],
        }));
      }
    } else {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleReplaceSliderImage = (index, newFile) => {
    setForm((prevForm) => {
      const updatedImages = [...prevForm.sliderImages];
      updatedImages[index] = newFile;  // Chỉ thay đổi ảnh tại vị trí index
      return {
        ...prevForm,
        sliderImages: updatedImages,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formData = new FormData();
  
      // Thêm logo nếu có
      if (form.logo instanceof File) {
        formData.append("logo", form.logo);
      } else if (form.logo) {
        formData.append("logo", form.logo);
      }
  
      // Tách ảnh cũ (string) và ảnh mới (File)
      const oldImages = form.sliderImages.filter((img) => typeof img === "string");
      const newImages = form.sliderImages.filter((img) => img instanceof File);
  
      // Thêm các ảnh mới vào formData
      newImages.forEach((file) => {
        formData.append("sliderImages", file);
      });
  
      // Thêm ảnh cũ vào formData
      formData.append("oldSliderImages", JSON.stringify(oldImages));
  
      // Gửi FormData lên backend
      const uploadResponse = await uploadFields(formData);
  
      const { logo, sliderImages } = uploadResponse || {};
      const logoUrl = Array.isArray(logo) ? logo[0] : logo;
  
      const option = {
        websiteName: form.websiteName,
        logo: logoUrl || form.logo,  // Nếu không có logo mới, giữ logo cũ
        phone: form.phone,
        email: form.email,
        address: form.address,
        copyright: form.copyright,
        // Kết hợp ảnh cũ và ảnh mới
        sliderImages: [...oldImages, ...sliderImages], // Giữ lại ảnh cũ và thêm ảnh mới
      };
  
      const result = await settingGeneral(option);
      if (result.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công!",
          text: "Cài đặt đã được cập nhật.",
        });
      } else {
        throw new Error("Phản hồi không hợp lệ");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra!",
        text: "Không thể cập nhật cài đặt. Vui lòng thử lại.",
      });
      console.error("Lỗi khi cập nhật:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const logoPreviewUrl =
    form.logo instanceof File ? URL.createObjectURL(form.logo) : form.logo || "";

  const sliderPreviewUrls = form.sliderImages.map((image) =>
    image instanceof File ? URL.createObjectURL(image) : image
  );

  return (
    <div className="settings">
      <h1 className="settings__title">Cài đặt chung</h1>
      <form
        className="settings__form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="settings__group">
          <label htmlFor="websiteName" className="settings__label">
            Tên Website
          </label>
          <input
            type="text"
            id="websiteName"
            name="websiteName"
            value={form.websiteName}
            onChange={handleChange}
            className="settings__input"
          />
        </div>

        <div className="settings__group">
          <label htmlFor="logo" className="settings__label">
            Logo
          </label>
          <div className="settings__file-upload">
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="settings__input-file"
            />
            <label htmlFor="logo" className="settings__choose-file-label">
              Chọn ảnh
            </label>
          </div>
          {logoPreviewUrl && (
            <img
              src={logoPreviewUrl}
              alt="Logo Preview"
              className="settings__image-preview preview__image"
            />
          )}
          {form.logo && form.logo instanceof File && (
            <span className="settings__file-name">{form.logo.name}</span>
          )}
        </div>

        <div className="settings__group">
          <label htmlFor="phone" className="settings__label">
            Số điện thoại
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="settings__input"
          />
        </div>

        <div className="settings__group">
          <label htmlFor="email" className="settings__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="settings__input"
          />
        </div>

        <div className="settings__group">
          <label htmlFor="address" className="settings__label">
            Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="settings__input"
          />
        </div>

        <div className="settings__group">
          <label htmlFor="copyright" className="settings__label">
            Copyright
          </label>
          <input
            type="text"
            id="copyright"
            name="copyright"
            value={form.copyright}
            onChange={handleChange}
            className="settings__input"
          />
        </div>

        <div className="settings__group">
          <label htmlFor="sliderImages" className="settings__label">
            Chọn ảnh slider
          </label>
          <div className="settings__file-upload">
            <input
              type="file"
              id="sliderImages"
              name="sliderImages"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="settings__input-file"
            />
            <label htmlFor="sliderImages" className="settings__choose-file-label">
              Chọn nhiều ảnh cho slider
            </label>
          </div>

          {sliderPreviewUrls.length > 0 && (
            <div className="settings__slider">
              {sliderPreviewUrls.map((url, index) => (
                <div key={index} className="slider-preview-item">
                  <img
                    src={url}
                    alt={`Slider Preview ${index + 1}`}
                    className="settings__image-preview preview__image"
                  />
                  <button
                    type="button"
                    className="settings__btn-change"
                    onClick={() => inputRefs.current[index].click()}
                  >
                    Thay ảnh
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) =>
                      e.target.files[0] &&
                      handleReplaceSliderImage(index, e.target.files[0])
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="settings__actions">
          <button type="submit" className="settings__btn" disabled={loading}>
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;
