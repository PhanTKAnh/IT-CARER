const API_DOMAIN = "http://localhost:3002/";

// Hàm chung để tạo headers có token
const getHeaders = (token) => ({
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}) // Thêm token nếu có
});

// GET request (nhận token)
export const get = async (path, token) => {
    const response = await fetch(API_DOMAIN + path, {
        headers: getHeaders(token)
    });
    return await response.json();
};

// POST request (nhận token)
export const post = async (path, options, token) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(options)
    });
    return await response.json();
};

// DELETE request
export const del = async (path, token) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "DELETE",
        headers: getHeaders(token)
    });
    return await response.json();
};

// PATCH request
export const patch = async (path, options, token) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PATCH",
        headers: getHeaders(token),
        body: JSON.stringify(options)
    });
    return await response.json();
};

export const postFormData = async (path, formData, token) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {}, // KHÔNG set Content-Type
        body: formData,
    });

    return await response.json();
};