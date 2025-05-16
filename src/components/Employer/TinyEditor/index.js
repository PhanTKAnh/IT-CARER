import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { uploadFile } from "../../../sevices/upload/uploadFile";

const TinyEditor = ({ value = "", onChange, name, label, icon: Icon }) => {
  const editorRef = useRef(null); // Theo dõi editor

  const handleImageUpload = async (cb, file, isBlob = false) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadFile(formData);
      const imageUrl = res?.linkUrl;

      if (typeof imageUrl === "string" && imageUrl.startsWith("http")) {
        if (editorRef.current) {
          if (isBlob) {
            cb(imageUrl);
          } else {
            setTimeout(() => {
              cb(imageUrl, {
                title: file.name,
                alt: file.name,
              });
            }, 0);
          }
        } else {
          console.warn("Editor chưa sẵn sàng.");
        }
      } else {
        alert("Upload thành công nhưng link ảnh không hợp lệ.");
      }
    } catch (err) {
      console.error("Upload thất bại:", err);
      alert("Upload thất bại");
    }
  };

  return (
    <div className="edit-company__field">
      <label>
        {Icon && <Icon style={{ marginRight: 5 }} />}
        {label}
      </label>
      <Editor
        onInit={(evt, editor) => {
          editorRef.current = editor; // Lưu editor khi khởi tạo
        }}
        apiKey="a8n6fm053ujhhndm8jifdkb6mxxraj2hjp6a3d4z8z0vbqo6"
        value={value}
        onEditorChange={(content) => onChange(content, name)}
        init={{
          height: 300,
          menubar: false,
          plugins: ["image", "code"],
          toolbar:
            "undo redo | bold italic underline | alignleft aligncenter alignright | image | code",
          convert_urls: false,
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",

          // Cấu hình image handler
          images_upload_handler: async (blobInfo, success, failure) => {
            try {
              const formData = new FormData();
              formData.append("file", blobInfo.blob());

              // Sử dụng chung hàm upload hình ảnh
              await handleImageUpload(success, blobInfo.blob(), true);
            } catch (err) {
              failure("Upload thất bại: " + err.message);
            }
          },

          // Hàm xử lý callback khi chọn hình ảnh từ file picker
          file_picker_callback: function (cb, value, meta) {
            if (meta.filetype === "image") {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");

              input.onchange = async function () {
                const file = this.files[0];
                handleImageUpload(cb, file); // Sử dụng hàm upload chung
              };

              input.click();
            }
          },

        }}
      />
    </div>
  );
};

export default TinyEditor;
