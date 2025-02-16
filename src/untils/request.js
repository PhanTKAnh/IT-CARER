const API_DOMAIN = "http://localhost:3002/";

// Hàm lấy token từ localStorage
const getToken = () => localStorage.getItem("token");

// Hàm chung để tạo headers có token
const getHeaders = () => {
    const token = getToken();
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}) // Thêm token nếu có
    };
};

// GET request
export const get = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        headers: getHeaders()
    });
    return await response.json();
};

// POST request
export const post = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(options)
    });
    return await response.json();
};

// DELETE request
export const del = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "DELETE",
        headers: getHeaders()
    });
    return await response.json();
};

// PATCH request
export const patch = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(options)
    });
    return await response.json();
};
