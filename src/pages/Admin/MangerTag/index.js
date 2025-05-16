import React, { useEffect, useState } from "react";
import { Button} from "antd";
import TableAdmin from "../../../components/Admin/TableAdmin";
import { ListTag, changeStatus, deletedTag } from "../../../sevices/admin/tag.sevies";
import { useNavigate } from "react-router-dom";
import { buildTree, flattenTree } from "../../../helpers/tree.helper";
import Swal from "sweetalert2";
import { getCookie } from "../../../helpers/cookie";

const ManagerTag = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const tokenAdmin = getCookie("tokenAdmin")

  const fetchApi = async () => {
    try {
      const response = await ListTag(tokenAdmin);
      const treeData = buildTree(response);
      const flatData = flattenTree(treeData);
      setTags(flatData);  
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thẻ:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [tokenAdmin]);

  const headers = [
    { label: "STT", key: "index" },
    { 
      label: "Hình ảnh", 
      key: "thumbnail", 
      render: (value) => (
        <img src={value} alt="Tag Thumbnail" style={{ width: 50, height: 50, objectFit: "cover" }} />
      ),
    },
    {
      label: "Tên thẻ",
      key: "TagsName",
      render: (value, row) => (
        <span style={{ paddingLeft: row.level * 20 }}>{row.TagsName}</span>
      ),
    },
    { label: "Trạng thái", key: "Status", render: (value) => (value === "active" ? "Hiển thị" : "Ẩn") },
  ];

  const handleDelete = async (_id) => {
    const confirm = await Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Tag này sẽ được đánh dấu đã xóa!",
      icon: "warning", 
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa!",
      cancelButtonText: "Hủy",
    });
  
    if (confirm.isConfirmed) {
      try {
        const result = await deletedTag(_id,tokenAdmin); 
        if (result.code === 200) {
          Swal.fire({
            icon: "success",
            title: "Xóa thành công",
            text: result.message || "Tag đã được xóa!",
          });
          fetchApi(); 
        } else {
          Swal.fire({
            icon: "error",
            title: "Có lỗi xảy ra",
            text: result.message || "Không thể xóa tag. Vui lòng thử lại!",
          });
        }
      } catch (error) {
        console.error("Lỗi khi xóa tag:", error);
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: "Không thể kết nối tới máy chủ. Vui lòng thử lại!",
        });
      }
    }
  };

  const handleEdit = (slug) => {
    navigate(`/admin/tag/edit/${slug}`, { state: { tags } });
  };

  const actions = [
    {
      label: "Xóa",
      className: "delete",
      onClick: (row) => handleDelete(row._id),
    },
    {
      label: "Sửa",
      className: "edit",
      onClick: (row) => handleEdit(row.slug),
    },
  ];

  const handleAddTag = () => {
    navigate("/admin/tag/create");
  };

  const onStatusToggle = async (slug, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";  
    try {
      const result = await changeStatus(slug, newStatus); 
      if (result.code === 200) {  
        Swal.fire({
          icon: "success",
          title: "Cập nhật trạng thái thành công",
          text: result.message,
        });

        setTags((prevTags) =>
          prevTags.map((tag) =>
            tag.slug === slug ? { ...tag, Status: newStatus } : tag
          )
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: result.message || "Không thể cập nhật trạng thái. Vui lòng thử lại sau.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        text: "Không thể cập nhật trạng thái. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <div className="admin-tags-page">
      <div className="header-actions" style={{ marginBottom: 16 }}>
        <h1>Danh sách thẻ</h1>
        <Button type="primary" onClick={handleAddTag}>
          Thêm thẻ
        </Button>
      </div>
      <TableAdmin
        headers={headers}
        data={tags}
        actions={actions}
        onStatusToggle={onStatusToggle}  // Truyền hàm thay đổi trạng thái vào TableAdmin
      />
    </div>
  );
};

export default ManagerTag;
