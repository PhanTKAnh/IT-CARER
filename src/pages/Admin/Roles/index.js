import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import TableAdmin from "../../../components/Admin/TableAdmin";
import { useNavigate } from "react-router-dom";
import { ListRole } from "../../../sevices/admin/role.sevies";
import { getCookie } from "../../../helpers/cookie";

const ListPermission = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const tokenAdmin = getCookie("tokenAdmin")

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const result = await ListRole(tokenAdmin);  
        if (result.code===200) {
          setData(result. record);  
        } else {
          message.error("Không thể tải danh sách quyền!");
        }
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
        message.error("Có lỗi xảy ra khi tải danh sách quyền!");
      }
    };

    fetchPermissions();
  }, [tokenAdmin]);

  const headers = [
    { label: "STT", key: "index" },
    { label: "Tên quyền", key: "title" },
    { label: "Mô tả", key: "description" },
    { label: "Hành động", key: "actions" },
  ];

  const handleAddNewPermission = () => {
    navigate("/admin/roles/create");
  };

  const handleEditPermission = (slug) => {
    navigate(`/admin/roles/edit/${slug}`);
  };

  const tableData = data.map((item, index) => ({
    ...item,
    index: index + 1,
    actions: (
      <Button type="link" onClick={() => handleEditPermission(item.slug)}>
        Sửa 
      </Button>
    ),
  }));

  return (
    <div className="permission-list-page">
      <div className="permission-list-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Danh sách quyền</h2>
        <Button type="primary" onClick={handleAddNewPermission}>
          + Thêm mới
        </Button>
      </div>

      <TableAdmin
        headers={headers}
        data={tableData}
        itemsPerPage={5}
      />
    </div>
  );
};

export default ListPermission;
