import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Select } from "antd";
import {
  dataLevel,
  dataExperience,
  dataSalary,
  dataEducation,
  dataJobType,
} from "../../../model/filterData.js";
 
function FilterSearch({ dataTag }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getParamsFromURL = () => {
    const params = new URLSearchParams(location.search);
    return {
      tag: params.get("tag") ? params.get("tag").split(",") : [],
      level: params.get("level") || [],
      experience: params.get("experience") || [],
      salary: params.get("salary") || [],
      education: params.get("education") || [],
      jobType: params.get("jobType") || [],
    };
  };

  const [filters, setFilters] = useState(getParamsFromURL);

  useEffect(() => {
    const params = new URLSearchParams(location.search); 
  
    for (const key in filters) {
      const value = filters[key];
      if (Array.isArray(value) && value.length) {
        params.set(key, value.join(","));
      } else if (typeof value === "string" && value) {
        params.set(key, value);
      } else {
        params.delete(key); 
      }
    }
  
    navigate(`/search?${params.toString()}`, { replace: true });
  }, [filters, navigate, location.search]); 
  

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, [key]: value };
      return updatedFilters;
    });
  };
  

  return (
    <div className="filter-container">
<Row gutter={[16, 16]}>
  <Col xs={12} sm={8}  lg={6} xl={4}>
    <Select
      mode="multiple"
      allowClear
      size="large"
      placeholder="Ngôn ngữ"
      value={filters.tag}
      onChange={(value) => handleFilterChange("tag", value)}
      style={{ width: "100%" }}
      options={dataTag.map((item) => ({ label: item.TagsName, value: item.TagsName }))}
    />
  </Col>

  <Col xs={12} sm={8}  lg={6} xl={4}>
    <Select
      size="large"
      allowClear
      placeholder="Cấp bậc"
      value={filters.level}
      onChange={(value) => handleFilterChange("level", value)}
      style={{ width: "100%" }}
      options={dataLevel.map((item) => ({ label: item.LevelName, value: item.LevelName }))}
    />
  </Col>

  <Col xs={12} sm={8}  lg={6} xl={4}>
    <Select
      allowClear
      size="large"
      placeholder="Kinh nghiệm"
      value={filters.experience}
      onChange={(value) => handleFilterChange("experience", value)}
      style={{ width: "100%" }}
      options={dataExperience.map((item) => ({ label: item.ExperienceName, value: item.ExperienceName }))}
    />
  </Col>

  <Col xs={12} sm={8}  lg={6} xl={4}>
    <Select
      allowClear
      size="large"
      placeholder="Mức lương"
      value={filters.salary}
      onChange={(value) => handleFilterChange("salary", value)}
      style={{ width: "100%" }}
      options={dataSalary.map((item) => ({ label: item.SalaryName, value: item.SalaryName }))}
    />
  </Col>

  <Col xs={12}  sm={8}  lg={6} xl={4}>
    <Select
      allowClear
      size="large"
      placeholder="Học vấn"
      value={filters.education}
      onChange={(value) => handleFilterChange("education", value)}
      style={{ width: "100%" }}
      options={dataEducation.map((item) => ({ label: item.EducationName, value: item.EducationName }))}
    />
  </Col>

  <Col xs={12} sm={8}  lg={6} xl={4}>
    <Select
      allowClear
      size="large"
      placeholder="Loại công việc"
      value={filters.jobType}
      onChange={(value) => handleFilterChange("jobType", value)}
      style={{ width: "100%" }}
      options={dataJobType.map((item) => ({ label: item.JobTypeName, value: item.JobTypeName }))}
    />
  </Col>
</Row>

  </div>
  );
}

export default FilterSearch;
