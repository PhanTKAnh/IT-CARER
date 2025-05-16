import { useState, useEffect } from "react";
import { getSettingGeneral } from "../sevices/admin/setting-general.sevies";  
export const useSettings = () => {
  const [settings, setSettings] = useState({
    websiteName: "",
    logo: null,
    phone: "",
    email: "",
    address: "",
    copyright: "",
    sliderImages: [],
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettingGeneral();
        if (res && res.data) {
          const data = res.data;
          setSettings({
            websiteName: data.websiteName || "",
            logo: data.logo || null,
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
            copyright: data.copyright || "",
            sliderImages: data.sliderImages || [],
          });
        }
      } catch (error) {
        console.error("Lỗi khi tải cài đặt:", error);
      }
    };

    fetchSettings();
  }, []);

  return { settings, setSettings };
};
