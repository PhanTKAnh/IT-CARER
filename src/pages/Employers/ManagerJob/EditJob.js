import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import Swal from "sweetalert2"; // Import sweetalert2
import TinyEditor from "../../../components/Employer/TinyEditor";
import { AiOutlineFileText, AiOutlinePushpin } from "react-icons/ai";
import BackButton from "../../../components/BackButton";
import { getCookie } from "../../../helpers/cookie";
import { updateJob, watchJob } from "../../../sevices/employer/job.sevice";
import { getListCities } from "../../../sevices/employer/city.sevices";
import { getTagList } from "../../../sevices/employer/tag.sevices";
import { dataEducation, dataJobType, dataLevel } from "../../../model/filterData";
import { buildTree, flattenTree } from "../../../helpers/tree.helper";

const { Option } = Select;

const EditJob = () => {
  const { slug } = useParams();
  const tokenCompany = getCookie("tokenCompany");

  const [cities, setCities] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    SalaryMin: 0,
    SalaryMax: 0,
    Experience: 0,
    Level: "",
    Education: "",
    WorkTime: "",
    cities: [], 
    tags: [], 
    expirationDate: "",
    Description: "", 
    Requirements: "",
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const fetchedCities = await getListCities();
      setCities(fetchedCities);
      const tags = await getTagList();
      const treeData = buildTree(tags);
      const flatData = flattenTree(treeData);
      setTags(flatData);
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await watchJob(slug, tokenCompany);
      if (res.code === 200) {
        const job = res.job;

        const cityNames = job.cities.map((city) => city.CityName);
        const tagNames = job.tags.map((tag) => tag.TagsName);

        setFormData({
          ...job,
          cities: cityNames,
          tags: tagNames,
          expirationDate: job.expirationDate?.substring(0, 10) || "",
        });
      }
    };
    fetchJob();
  }, [slug, tokenCompany]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCitiesChange = (value) => {
    setFormData((prev) => ({ ...prev, cities: value }));
  };

  const handleTagsChange = (value) => {
    setFormData((prev) => ({ ...prev, tags: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cityIds = cities.filter(city => formData.cities.includes(city.CityName)).map(city => city._id);
      const tagIds = tags.filter(tag => formData.tags.includes(tag.TagsName)).map(tag => tag._id);

      const dataToSend = {
        IdCity: cityIds,
        IdTags: tagIds,
        Name: formData.Name,
        SalaryMin: formData.SalaryMin,
        SalaryMax: formData.SalaryMax,
        Description: formData.Description,
        Status: formData.Status,
        Level: formData.Level,
        Experience: formData.Experience,
        WorkTime: formData.WorkTime,
        Education: formData.Education,
        expirationDate: formData.expirationDate,
        Requirements: formData.Requirements
      };

      const response = await updateJob(slug, dataToSend, tokenCompany);
      if (response.code === 200) {
        Swal.fire({
          title: "Thành công!",
          text: "Cập nhật công việc thành công 🎉",
          icon: "success",
          confirmButtonText: "OK"
        });
        navigate("/nha-tuyen-dung/cong-viec");
      } else {
        Swal.fire({
          title: "Thất bại!",
          text: "Cập nhật công việc thất bại 😢",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Lỗi!",
        text: "Lỗi trong quá trình cập nhật công việc 😥",
        icon: "error",
        confirmButtonText: "OK"
      });
      console.error(error);
    }
  };

  return (
    <div className="add-job-container">
      <BackButton />
      <h1>📝 Chỉnh sửa công việc</h1>
      <form onSubmit={handleSubmit} className="add-job-form">
        <div className="form-group">
          <label>Tên công việc</label>
          <input name="Name" value={formData.Name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Mức lương tối thiểu (VNĐ)</label>
          <input
            type="number"
            name="SalaryMin"
            value={formData.SalaryMin}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mức lương tối đa (VNĐ)</label>
          <input
            type="number"
            name="SalaryMax"
            value={formData.SalaryMax}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Kinh nghiệm (tháng)</label>
          <input
            type="number"
            name="Experience"
            value={formData.Experience}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Cấp độ</label>
          <select name="Level" value={formData.Level} onChange={handleChange}>
            <option value="">-- Chọn cấp độ --</option>
            {dataLevel.map((item) => (
              <option key={item.LevelName} value={item.LevelName}>
                {item.LevelName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Trình độ</label>
          <select
            name="Education"
            value={formData.Education}
            onChange={handleChange}
          >
            <option value="">-- Chọn trình độ --</option>
            {dataEducation.map((item) => (
              <option key={item.EducationName} value={item.EducationName}>
                {item.EducationName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Loại công việc</label>
          <select
            name="WorkTime"
            value={formData.WorkTime}
            onChange={handleChange}
          >
            <option value="">-- Chọn loại công việc --</option>
            {dataJobType.map((item) => (
              <option key={item.JobTypeName} value={item.JobTypeName}>
                {item.JobTypeName}
              </option>
            ))}
          </select>
        </div>

        <div className="city-tag-group">
          <div className="form-group">
            <label>Thành phố</label>
            <Select
              mode="multiple"
              value={formData.cities}
              onChange={handleCitiesChange}
              style={{ width: "100%" }}
            >
              {cities.map((city) => (
                <Option key={city._id} value={city.CityName}>
                  {city.CityName}
                </Option>
              ))}
            </Select>
          </div>

          <div className="form-group">
            <label>Ngôn ngữ (tags)</label>
            <Select
              mode="multiple"
              value={formData.tags}
              onChange={handleTagsChange}
              style={{ width: "100%" }}
            >
              {tags.map((tag) => (
                <Option key={tag._id} value={tag.TagsName}>
                  {tag.TagsName}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="form-group">
          <label>Ngày hết hạn</label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
          />
        </div>

        <TinyEditor
          label="Thông tin chi tiết"
          name="Description" // Updated name
          icon={AiOutlineFileText}
          value={formData.Description}
          onChange={(value) => handleEditorChange("Description", value)} // Updated field name
        />

        <TinyEditor
          label="Yêu cầu công việc"
          name="Requirements"
          icon={AiOutlinePushpin}
          value={formData.Requirements}
          onChange={(value) => handleEditorChange("Requirements", value)}
        />

        <button type="submit" className="submit-btn">
          Cập nhật công việc
        </button>
      </form>
    </div>
  );
};

export default EditJob;
