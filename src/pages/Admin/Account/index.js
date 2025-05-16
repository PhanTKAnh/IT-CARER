import React, { useEffect, useState } from "react";
import { Button, Avatar, Tag } from "antd";
import TableAdmin from "../../../components/Admin/TableAdmin";
import { useNavigate } from "react-router-dom";
import { getListAccount } from "../../../sevices/admin/account.sevies";
import { getCookie } from "../../../helpers/cookie";

const ListAccount = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
    const tokenAdmin = getCookie("tokenAdmin")
  

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const result = await getListAccount(tokenAdmin); 
        if (result.code === 200) {
          setData(result.records); 
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tài khoản:", error);
      }
    };

    fetchAccounts();
  }, []);

  const headers = [
    { label: "STT", key: "index" },
    { label: "Avatar", key: "avatar" },
    { label: "Tên người dùng", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Số điện thoại", key: "phone" },
    { label: "Vai trò", key: "role" },
    { label: "Trạng thái", key: "status" },
    { label: "Hành động", key: "actions" },
  ];

  const handleStatusToggle = (slug, currentStatus) => {
    console.log("Click status:", slug, currentStatus);
  };

  const handleAddNewAccount = () => {
    navigate("/admin/accounts/create");
  };

  const handleEditAccount = (slug) => {
    navigate(`/admin/accounts/edit/${slug}`);
  };

  const tableData = data.map((item, index) => ({
    ...item,
    index: index + 1,
    avatar: <Avatar src={item.avatar} alt={item.fullName} />,
    role: item.role?.title|| "Chưa phân quyền",
    status: item.status
      ? <Tag color="green">Hoạt động</Tag>
      : <Tag color="red">Bị khóa</Tag>,
    actions: (
      <Button type="link" onClick={() => handleEditAccount(item.slug)}>
        Sửa
      </Button>
    ),
  }));

  return (
    <div className="account-list-page">
      <div
        className="account-list-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16
        }}
      >
        <h2>Danh sách tài khoản</h2>
        <Button type="primary" onClick={handleAddNewAccount}>
          + Thêm mới
        </Button>
      </div>

      <TableAdmin
        headers={headers}
        data={tableData}
        itemsPerPage={5}
        onStatusToggle={handleStatusToggle}
      />
    </div>
  );
};

export default ListAccount;
