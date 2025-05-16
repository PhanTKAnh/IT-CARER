import React, { useState, useEffect } from "react";
import { Checkbox, Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";

// Danh sách chức năng và các quyền tương ứng
const permissionRecords = [
  {
    function: "Danh sách nhà tuyển dụng",
    permissions: [
      { name: "employer_view", label: "Xem" },
      { name: "employer_add", label: "Thêm" },
      { name: "employer_edit", label: "Sửa" },
      { name: "employer_delete", label: "Xóa" },
    ],
  },
  {
    function: "Danh sách ứng viên",
    permissions: [
      { name: "candidate_view", label: "Xem" },
      { name: "candidate_add", label: "Thêm" },
      { name: "candidate_edit", label: "Sửa" },
      { name: "candidate_delete", label: "Xóa" },
    ],
  },
  {
    function: "Danh sách thành phố",
    permissions: [
      { name: "city_view", label: "Xem" },
      { name: "city_add", label: "Thêm" },
      { name: "city_edit", label: "Sửa" },
      { name: "city_delete", label: "Xóa" },
    ],
  },
  {
    function: "Danh sách ngôn ngữ",
    permissions: [
      { name: "language_view", label: "Xem" },
      { name: "language_add", label: "Thêm" },
      { name: "language_edit", label: "Sửa" },
      { name: "language_delete", label: "Xóa" },
    ],
  },
  {
    function: "Nhóm quyền",
    permissions: [
      { name: "role_view", label: "Xem" },
      { name: "role_add", label: "Thêm" },
      { name: "role_edit", label: "Sửa" },
      { name: "role_delete", label: "Xóa" },
    ],
  }, 
  {
    function: "Phân quyền",
    permissions: [
      { name: "permission_assign", label: "Gán quyền" },
    ],
  },
  {
    function: "Danh sách tài khoản",
    permissions: [
      { name: "account_view", label: "Xem" },
      { name: "account_add", label: "Thêm" },
      { name: "account_edit", label: "Sửa" },
      { name: "account_delete", label: "Xóa" },
    ],
  },
  {
    function: "Cài đặt chung",
    permissions: [
      { name: "settings_view", label: "Xem" },
      { name: "settings_edit", label: "Sửa" },
    ],
  },
];

const AssignPermissions = ({ role }) => {
  const navigate = useNavigate();
  const [adminPermissions, setAdminPermissions] = useState({});
  const [profilePermissions, setProfilePermissions] = useState({});

  useEffect(() => {
    if (role?.permissions) {
      setAdminPermissions(role.permissions.admin || {});
      setProfilePermissions(role.permissions.profile || {});
    }
  }, [role]);

  const handleCheckboxChange = (checkedValues, roleType, funcName) => {
    const updatePermissions = roleType === "admin"
      ? setAdminPermissions
      : setProfilePermissions;

    updatePermissions(prev => ({
      ...prev,
      [funcName]: checkedValues,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cập nhật quyền Quản trị viên:", adminPermissions);
    console.log("Cập nhật quyền Quản lý hồ sơ:", profilePermissions);

    // TODO: Gọi API cập nhật quyền (ví dụ)
    // await updatePermissionsAPI(role.id, {
    //   admin: adminPermissions,
    //   profile: profilePermissions,
    // });

    navigate("/admin/accounts");
  };

  const columns = [
    {
      title: "Chức năng",
      dataIndex: "function",
      key: "function",
    },
    {
      title: "Quản trị viên",
      dataIndex: "admin",
      key: "admin",
      render: (text, row) => (
        <Checkbox.Group
          value={adminPermissions[row.function] || []}
          onChange={(checkedValues) =>
            handleCheckboxChange(checkedValues, "admin", row.function)
          }
        >
          {row.permissions.map((permission) => (
            <Checkbox key={permission.name} value={permission.name}>
              {permission.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      title: "Quản lý hồ sơ",
      dataIndex: "profile",
      key: "profile",
      render: (text, row) => (
        <Checkbox.Group
          value={profilePermissions[row.function] || []}
          onChange={(checkedValues) =>
            handleCheckboxChange(checkedValues, "profile", row.function)
          }
        >
          {row.permissions.map((permission) => (
            <Checkbox key={permission.name} value={permission.name}>
              {permission.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
  ];

  const dataSource = permissionRecords.map((item, index) => ({
    key: index,
    ...item,
  }));

  return (
    <div className="assign-permission-page">
      <h2>Phân quyền cho người dùng</h2>
      <BackButton />
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={false}
        bordered
      />
      <Button
        type="primary"
        htmlType="submit"
        onClick={handleSubmit}
        style={{ marginTop: 20 }}
      >
        Cập nhật quyền
      </Button>
    </div>
  );
};

export default AssignPermissions;
