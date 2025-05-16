import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BackButton from "../../../components/BackButton";
import { createRole } from "../../../sevices/admin/role.sevies";
import { getCookie } from "../../../helpers/cookie";

const CreatePermission = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const tokenAdmin = getCookie("tokenAdmin")


  const handleFinish = async (values) => {
    try {
      const response = await createRole(values,tokenAdmin);  

      if (response.code===200) {
        Swal.fire({
          icon: "success",
          title: "Tạo quyền thành công!",
          text: "Quyền mới đã được tạo thành công.",
        });
        navigate("/admin/roles"); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Tạo quyền thất bại!",
          text: "Có lỗi xảy ra khi tạo quyền. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        text: "Vui lòng thử lại sau.",
      });  // Thông báo lỗi nếu có sự cố
    }
  };

  return (
    <div className="create-permission-page">
      <h2>Thêm quyền mới</h2>
      <BackButton />
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Tên quyền" name="title" rules={[{ required: true, message: "Vui lòng nhập tên quyền" }]}>
          <Input placeholder="Nhập tên quyền" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả (nếu có)" />
        </Form.Item> 

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo quyền
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePermission;
