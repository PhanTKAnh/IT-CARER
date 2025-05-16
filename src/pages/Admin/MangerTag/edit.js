import React, { useState, useEffect } from "react";
import BackButton from "../../../components/BackButton";
import { getTagDetails, updateTag } from "../../../sevices/admin/tag.sevies";
import Swal from "sweetalert2";
import { buildTree } from "../../../helpers/tree.helper";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { uploadFile } from "../../../sevices/upload/uploadFile";
import { getCookie } from "../../../helpers/cookie";

const TagEdit = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { state } = useLocation();
  const { tags } = state || {};
  const tokenAdmin = getCookie("tokenAdmin")

  const [formData, setFormData] = useState({
    _id: "",
    TagsName: "",
    parent_id: "",
    description: "",
    thumbnail: "",
    Status: "active",
    position: "",
    preview: "",
  });

  const [parentTags, setParentTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    if (tags && Array.isArray(tags) && tags.length > 0) {
      const treeData = buildTree(tags);
      setParentTags(treeData);
    } else {
      setParentTags([]);
    }
  }, [tags]);

  useEffect(() => {
    const fetchTagDetails = async () => {
      try {
        const response = await getTagDetails(slug,tokenAdmin);
        const tagData = response.data;
        setFormData({
          _id: tagData._id || "",
          TagsName: tagData.TagsName || "",
          parent_id: tagData.parent_id || "",
          description: tagData.description || "",
          thumbnail: tagData.thumbnail || "", 
          Status: tagData.Status || "active",
          position: tagData.position || "",
          preview: typeof tagData.thumbnail === "string" ? tagData.thumbnail : "",
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin tag:", error);
      }
    };
    fetchTagDetails();
  }, [slug,tokenAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Bắt đầu loading khi submit form

    let thumbnailUrl = formData.thumbnail;
    if (formData.thumbnail instanceof File) {
      try {
        const formDataUpload = new FormData();
        formDataUpload.append("file", formData.thumbnail);

        const uploadResponse = await uploadFile(formDataUpload);
        if (uploadResponse && uploadResponse.linkUrl) {
          thumbnailUrl = uploadResponse.linkUrl;
        } else {
          throw new Error("Upload file thất bại");
        }
      } catch (error) {
        console.error("Lỗi upload file:", error);
        Swal.fire({
          icon: "error",
          title: "Lỗi khi upload ảnh!",
          text: "Đã có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.",
        });
        setIsLoading(false); // Dừng loading nếu có lỗi
        return;
      }
    }

    const dataToSend = {
      ...formData,
      parent_id: formData.parent_id || "",
      thumbnail: thumbnailUrl,
    };

    console.log(dataToSend);

    try {
      const response = await updateTag(formData._id, dataToSend);
      if (response.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Cập nhật tag thành công!",
          text: "Tag đã được cập nhật thành công.",
        });
        navigate("/admin/tag");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật tag:", error);
      Swal.fire({
        icon: "error",
        title: "Thất bại!",
        text: "Không thể cập nhật tag. Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false); // Dừng loading khi kết thúc
    }
  };

  return (
    <div className="tag-create-container">
      <BackButton />
      <h2>Chỉnh sửa Tag</h2>
      <form onSubmit={handleSubmit} className="tag-form">
        <label>
          Tên Tag:
          <input
            type="text"
            name="TagsName"
            value={formData.TagsName}
            onChange={handleChange}
            required
            disabled={isLoading} // Vô hiệu hóa input khi đang loading
          />
        </label>

        <label>
          Danh mục cha:
          <select
            name="parent_id"
            value={formData.parent_id || ""}
            onChange={handleChange}
            disabled={isLoading} // Vô hiệu hóa select khi đang loading
          >
            <option value="">Chọn tag cha (Nếu có)</option>
            {parentTags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.TagsName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Mô tả:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={isLoading} // Vô hiệu hóa textarea khi đang loading
          />
        </label>

        <label>
          Thumbnail (File): chọn ảnh
          <input
            type="file"
            accept="image/*"
            name="thumbnail"
            onChange={handleFileChange}
            disabled={isLoading} // Vô hiệu hóa file input khi đang loading
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

        <div className="admin-status-radio-group">
          <label>
            <input
              type="radio"
              name="Status"
              value="active"
              checked={formData.Status === "active"}
              onChange={handleChange}
              disabled={isLoading}
            />
            Hiển thị
          </label>

          <label>
            <input
              type="radio"
              name="Status"
              value="inactive"
              checked={formData.Status === "inactive"}
              onChange={handleChange}
              disabled={isLoading}
            />
            Không hiển thị
          </label>
        </div>

        <label>
          Vị trí:
          <input
            type="number"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Tự động nếu để trống"
            disabled={isLoading}
          />
        </label>

        <button type="submit" disabled={isLoading}>Cập nhật</button>

        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            Đang tải...
          </div>
        )}
      </form>
    </div>
  );
};

export default TagEdit;
