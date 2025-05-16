import React, { useState, useEffect } from "react";
import TreeSelect from "../../../components/Admin/TreeSelect";
import BackButton from "../../../components/BackButton";
import { CreateTag, ListTag } from "../../../sevices/admin/tag.sevies";
import Swal from 'sweetalert2';
import { buildTree } from "../../../helpers/tree.helper";
import { uploadFile } from "../../../sevices/upload/uploadFile";
import { getCookie } from "../../../helpers/cookie";

const TagCreate = () => {
  const [formData, setFormData] = useState({
    TagsName: "",
    parent_id: "",
    description: "",
    thumbnail: "",
    status: "active",
    position: "",
  });

  const [parentTags, setParentTags] = useState([]);
  const tokenAdmin = getCookie("tokenAdmin")

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await ListTag(tokenAdmin);
        const treeData = buildTree(response);
        setParentTags(treeData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tag:", error);
      }
    };
    fetchApi();
  }, [tokenAdmin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let thumbnailUrl = formData.thumbnail;
    if (formData.thumbnail instanceof File) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", formData.thumbnail);

      const uploadResponse = await uploadFile(formDataUpload,tokenAdmin);
      if (uploadResponse && uploadResponse.linkUrl) {
        thumbnailUrl = uploadResponse.linkUrl; 
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi khi upload ảnh!',
          text: 'Đã có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.',
        });
        return;
      }
    }

    const dataToSend = {
      ...formData,
      thumbnail: thumbnailUrl,
    };
console.log(dataToSend)
    try {
      const response = await CreateTag(dataToSend); 
      if(response.code === 200){
        Swal.fire({
          icon: 'success',
          title: 'Tạo tag thành công!',
          text: 'Tag đã được tạo thành công.',
        });

        setFormData({
          TagsName: "",
          parent_id: "",
          description: "",
          thumbnail: "",
          Status: "active",
          position: "",
        });
      }

    } catch (error) {
      console.error("Lỗi khi tạo tag:", error);
      Swal.fire({
        icon: 'error',
        title: 'Thất bại!',
        text: 'Không thể tạo tag. Vui lòng thử lại.',
      });
    }
  };

  return (
    <div className="tag-create-container">
      <BackButton />
      <h2>Tạo Tag Mới</h2>
      <form onSubmit={handleSubmit} className="tag-form">
        <label>
          Tên Tag:
          <input
            type="text"
            name="TagsName"
            value={formData.TagsName}
            onChange={handleChange}
            required
          />
        </label>

      <label>
  Danh mục cha:
  <select
    name="parent_id"
    value={formData.parent_id}
    onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
  >
    <option value="">-- Chọn danh mục cha --</option>
    <TreeSelect items={parentTags} />
  </select>
</label>


        <label>
          Mô tả:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Thumbnail (File): chọn ảnh
          <input
            type="file"
            accept="image/*"
            name="thumbnail"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFormData({
                  ...formData,
                  thumbnail: file,
                  preview: URL.createObjectURL(file),
                });
              }
            }}
          />
        </label>

        {formData.preview && (
          <div style={{ marginTop: "10px" }}>
            <p>Ảnh xem trước:</p>
            <img
              src={formData.preview}
              alt="Preview"
              style={{ maxWidth: "200px", borderRadius: "8px" }}
            />
          </div>
        )}

        <label>
          Vị trí:
          <input
            type="number"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Tự động nếu để trống"
          />
        </label>

        <button type="submit">Tạo mới</button>
      </form>
    </div>
  );
};

export default TagCreate;
