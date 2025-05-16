import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import Swal from "sweetalert2";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile } from "../../../sevices/upload/uploadFile";
import { createAccount } from "../../../sevices/admin/account.sevies";
import { ListRole } from "../../../sevices/admin/role.sevies";
import { getCookie } from "../../../helpers/cookie";

const { Option } = Select;

const CreateAccount = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [roleList, setRoleList] = useState([]);
    const tokenAdmin = getCookie("tokenAdmin")
  

  const handleFinish = async (values) => {
    setLoading(true);

    // Upload avatar if a file is selected
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const avatarUrl = await uploadFile(formData);  // Sử dụng API uploadFile để upload ảnh
        if (avatarUrl && avatarUrl.linkUrl) {
          values.avatar = avatarUrl.linkUrl;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi khi upload ảnh!',
            text: 'Không thể tải ảnh lên. Vui lòng thử lại.',
          });
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Lỗi khi upload ảnh", error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi khi upload ảnh!',
          text: 'Đã có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.',
        });
        setLoading(false);
        return;
      }
    }

    try {
      // Call API to create account
      const response = await createAccount(values, tokenAdmin);
      console.log("Response from createAccount:", response);

      if (response.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Tạo tài khoản thành công!",
          showConfirmButton: true,
        });
        navigate("/admin/accounts");
      } else {
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra khi tạo tài khoản",
          text: response.message || "Vui lòng thử lại sau.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản:", error);
      Swal.fire({
        icon: "error",
        title: "Đã có lỗi xảy ra",
        text: "Vui lòng thử lại sau.",
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await ListRole();
        console.log("Role List:", roles);
        setRoleList(roles.record || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách quyền:", error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="create-account-page">
      <h2>Thêm tài khoản mới</h2>
      <BackButton />
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Tên người dùng" name="fullName" rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}>
          <Input placeholder="Nhập tên người dùng" />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ" }]}>
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phone">
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item label="Avatar" name="avatar">
          <Upload
            name="avatar"
            listType="picture-card"
            accept="image/*"
            showUploadList={false}
            customRequest={({ file, onSuccess }) => {
              setFile(file);
              setPreviewImage(URL.createObjectURL(file));
              onSuccess("ok");
            }}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
          {previewImage && <div className="preview-image"><img src={previewImage} alt="preview" /></div>}
        </Form.Item>

        <Form.Item label="Vai trò" name="role_id" rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}>
          <Select placeholder="Chọn vai trò">
            {roleList.map((role) => (
              <Option key={role._id} value={role._id}>
                {role.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Trạng thái" name="Status" rules={[{ required: true }]}>
          <Select placeholder="Chọn trạng thái">
            <Option value="active">Đang hoạt động</Option>
            <Option value="inactive">Ngưng hoạt động</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo tài khoản
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAccount;
