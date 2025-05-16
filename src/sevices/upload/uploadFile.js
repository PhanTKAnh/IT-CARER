import { postFormData } from "../../untils/request";

// [POST] /upload-file
export const uploadFile = async (formData) => {
    const result = await postFormData("upload-file/upload-single", formData, null);
    return result;
};
// [POST] /upload-file
export const uploadFields = async (formData) => {
    const result = await postFormData("upload-file/upload-multi", formData, null);
    return result;
};
