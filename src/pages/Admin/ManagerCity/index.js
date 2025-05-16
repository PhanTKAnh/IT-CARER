import React, { useEffect, useState } from "react";
import { Button } from "antd";
import TableAdmin from "../../../components/Admin/TableAdmin";
import AddCityModal from "../../../components/Admin/AddCityModal"; 
import { createCity, deletedCity, ListCity } from "../../../sevices/admin/city.sevies";
import Swal from "sweetalert2";
import { getCookie } from "../../../helpers/cookie";

const ManagerCity = () => {
  const [cities, setCities] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const tokenAdmin = getCookie("tokenAdmin")


  const fetchApi = async () => {
    try {
      const response = await ListCity(tokenAdmin);
      setCities(response);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thành phố:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [tokenAdmin]);

  const headers = [
    { label: "STT", key: "index" },
    { label: "Tên thành phố", key: "CityName" },
  ];

  const handleDeleteCity = async (row) => {
    const result = await Swal.fire({
      title: `Bạn có chắc chắn muốn xóa "${row.CityName}" không?`,
      text: "Thao tác này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
  
    if (result.isConfirmed) {
      try {
        const response = await deletedCity(row._id);
        if (response.code === 200) {
          // Gọi lại fetchApi sau khi xóa thành công
          await fetchApi();
          await Swal.fire({ 
            title: "Đã xóa!",
            text: response.message,
            icon: "success",
          });
        } else {
          await Swal.fire({
            title: "Lỗi!",
            text: response.message || "Đã xảy ra lỗi khi xóa thành phố.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Lỗi khi xóa thành phố:", error);
        await Swal.fire({
          title: "Lỗi!",
          text: "Đã xảy ra lỗi khi xóa thành phố.",
          icon: "error",
        });
      }
    }
  };

  const actions = [
    {
      label: "Xóa",
      onClick: (row) => handleDeleteCity(row),
      className: "delete",
    },
  ];

  const handleAddCity = async (cityName) => {
    try {
      const result = await createCity({ cityName });
      if (result) {
        await fetchApi();
        setIsModalVisible(false);  

        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Thành phố đã được thêm thành công.",
        });
      }
    } catch (error) {
      console.error("Lỗi khi thêm thành phố:", error);
  
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Có lỗi xảy ra khi thêm thành phố.",
      });
    }
  };

  return (
    <div className="admin-cities-page">
      <div className="header-actions" style={{ marginBottom: 16 }}>
        <h1>Danh sách thành phố</h1>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Thêm thành phố
        </Button>
      </div>
      <TableAdmin headers={headers} data={cities} actions={actions} />
      
      <AddCityModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}  
        onAddCity={handleAddCity} 
      />
    </div>
  );
};

export default ManagerCity;
