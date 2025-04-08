import { postFormData } from "../../untils/request";

// [POST] /upload-file
export const uploadFile = async (formData) => {
    const result = await postFormData("upload-file", formData, null);
    return result;
};
