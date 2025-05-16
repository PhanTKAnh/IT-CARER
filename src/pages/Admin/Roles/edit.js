import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import Swal from "sweetalert2";
import { getRoleBySlug, editRole } from "../../../sevices/admin/role.sevies"; // Import API
import { getCookie } from "../../../helpers/cookie";

const EditPermission = () => {
  const [form] = Form.useForm();
  const { slug } = useParams();  // Lấy slug từ params
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [roleData, setRoleData] = useState(null);
  const tokenAdmin = getCookie("tokenAdmin")


  useEffect(() => {
    const fetchPermissionData = async () => {
      try {
        const response = await getRoleBySlug(slug,tokenAdmin);
        if (response.code === 200) {
          setRoleData(response.record);
          form.setFieldsValue(response.record); 
        } else {
          Swal.fire({
            icon: "error",
            title: "Không tìm thấy quyền!",
            text: response.message || "Có lỗi xảy ra khi lấy dữ liệu.",
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu quyền:", error);
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra!",
          text: "Vui lòng thử lại sau.",
          showConfirmButton: true,
        });
      }
    };

    fetchPermissionData();
  }, [slug, form,tokenAdmin]);

  const handleFinish = async (values) => {
    try {
      setLoading(true); 
      const response = await editRole(slug, values,tokenAdmin); 

      if (response.code === 200) {
        Swal.fire({ 
          icon: "success",
          title: "Cập nhật quyền thành công!",
          showConfirmButton: true,
        });
        navigate("/admin/roles");  
      } else {
        Swal.fire({
          icon: "error",
          title: "Cập nhật quyền thất bại!",
          text: response.message || "Có lỗi xảy ra, vui lòng thử lại.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi chỉnh sửa quyền:", error);
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra!",
        text: "Vui lòng thử lại sau.",
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);  // Đảm bảo tắt loading khi xong
    }
  };

  return (
    <div className="edit-permission-page">
      <h2>Chỉnh sửa quyền</h2>
      <BackButton />
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Tên quyền" name="title" rules={[{ required: true, message: "Vui lòng nhập tên quyền" }]}>
          <Input placeholder="Nhập tên quyền" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả (nếu có)" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật quyền
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPermission;
