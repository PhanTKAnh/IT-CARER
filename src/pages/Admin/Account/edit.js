import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin, Upload } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import { editAccount, getAccountById } from "../../../sevices/admin/account.sevies";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile } from "../../../sevices/upload/uploadFile";
import { ListRole } from "../../../sevices/admin/role.sevies"; // Assuming this service fetches the roles
import Swal from 'sweetalert2'; // Import SweetAlert2
import { getCookie } from "../../../helpers/cookie";

const { Option } = Select;

const EditAccount = () => {
  const [form] = Form.useForm();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [roleList, setRoleList] = useState([]);
  const tokenAdmin = getCookie("tokenAdmin")


  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await ListRole( tokenAdmin); // Fetch roles dynamically
        setRoleList(roles.record || []);
      } catch (error) {
        console.error("Error fetching roles", error);
      }
    };

    const fetchAccountData = async () => {
      try {
        setLoading(true);
        const data = await getAccountById(slug);
        form.setFieldsValue(data.record);
        setPreviewImage(data.record.avatar); // Display current avatar
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Cannot load account data!',
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
    if (slug) {
      fetchAccountData();
    }
  }, [slug, form, tokenAdmin]);

  const handleFinish = async (values) => {
    try {
      setLoading(true);

      // If a new avatar file is uploaded
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadResult = await uploadFile(formData);
        if (uploadResult?.linkUrl) {
          values.avatar = uploadResult.linkUrl;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'Failed to upload image',
          });
          setLoading(false);
          return;
        }
      }

      await editAccount(slug, values);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Account updated successfully!',
      });
      navigate("/admin/accounts");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update account',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-account-page">
      <h2>Edit Account</h2>
      <BackButton />
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Username" name="fullName" rules={[{ required: true, message: "Please enter the username" }]} >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]} >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item label="Avatar">
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
              <Button icon={<UploadOutlined />}>Choose Avatar</Button>
            </Upload>
            {previewImage && <div className="preview-image"><img src={previewImage} alt="avatar preview" style={{ maxWidth: "200px" }} /></div>}
          </Form.Item>

          <Form.Item label="Role" name="role_id" rules={[{ required: true, message: "Please select a role" }]}>
            <Select placeholder="Select role">
              {roleList.map((role) => (
                <Option key={role._id} value={role._id}>
                  {role.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
              Update Account
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default EditAccount;
