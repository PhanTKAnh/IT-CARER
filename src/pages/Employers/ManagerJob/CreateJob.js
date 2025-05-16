import { Select } from "antd";
import TinyEditor from "../../../components/Employer/TinyEditor";
import { AiOutlineFileText, AiOutlinePushpin } from "react-icons/ai";
import BackButton from "../../../components/BackButton";
import { useForm } from "react-hook-form";
import { jobSchema } from "../../../untils/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { getListCities } from "../../../sevices/employer/city.sevices";
import { getTagList } from "../../../sevices/employer/tag.sevices";
import { dataEducation, dataJobType, dataLevel } from "../../../model/filterData";
import { createJob } from "../../../sevices/employer/job.sevice";
import { getCookie } from "../../../helpers/cookie";
import Swal from "sweetalert2";
import { buildTree, flattenTree } from "../../../helpers/tree.helper";

const { Option } = Select;

const CreateJob = () => {
    const [cities, setCities] = useState([]);
    const [tags, setTags] = useState([]);
    const tokenCompany = getCookie("tokenCompany");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(jobSchema),
    });

    useEffect(() => {
        const fetchApi = async () => {
            const cities = await getListCities();
            setCities(cities);

            const tags = await getTagList();
            const treeData = buildTree(tags);
            const flatData = flattenTree(treeData);
            setTags(flatData);
        };
        fetchApi();
    }, []);


    const onSubmit = async (data) => {
        const options = {
            IdCity: data.City,
            IdTags: data.Tags,
            Name: data.Name,
            SalaryMin: data.SalaryMin,
            SalaryMax: data.SalaryMax,
            Description: data.Detail,
            Status: data.Status,
            Level: data.Level,
            Experience: data.Experience,
            WorkTime: data.JobTypeName,
            Education: data.EducationName,
            expirationDate: data.expirationDate,
            Requirements: data.Requirements
        };

        try {
            const response = await createJob(options, tokenCompany);
            if (response.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Tạo công việc thành công 🎉",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset(); // reset after success
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Tạo công việc thất bại 😢",
                    text: "Vui lòng thử lại sau",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Lỗi trong quá trình tạo công việc 😥",
                text: "Vui lòng kiểm tra lại",
            });
            console.error(error);
        }
    };

    return (
        <div className="add-job-container">
            <BackButton />
            <h1>📝 Thêm công việc mới</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="add-job-form">
                <div className="form-group">
                    <label>Tên công việc</label>
                    <input {...register("Name")} />
                    {errors.Name && <span className="error">{errors.Name.message}</span>}
                </div>

                <div className="form-group">
                    <label>Mức lương tối thiểu (VNĐ)</label>
                    <input type="number" {...register("SalaryMin")} />
                    {errors.SalaryMin && <span className="error">{errors.SalaryMin.message}</span>}
                </div>

                <div className="form-group">
                    <label>Mức lương tối đa (VNĐ)</label>
                    <input type="number" {...register("SalaryMax")} />
                    {errors.SalaryMax && <span className="error">{errors.SalaryMax.message}</span>}
                </div>

                <div className="form-group">
                    <label>Kinh nghiệm (tháng)</label>
                    <input type="number" {...register("Experience")} />
                    {errors.Experience && <span className="error">{errors.Experience.message}</span>}
                </div>

                <div className="form-group">
                    <label>Cấp độ</label>
                    <select {...register("Level")}>
                        <option value="">-- Chọn cấp độ --</option>
                        {dataLevel.map((item) => (
                            <option key={item.LevelName} value={item.LevelName}>
                                {item.LevelName}
                            </option>
                        ))}
                    </select>
                    {errors.Level && <span className="error">{errors.Level.message}</span>}
                </div>

                <div className="form-group">
                    <label>Trình độ</label>
                    <select {...register("EducationName")}>
                        <option value="">-- Chọn trình độ --</option>
                        {dataEducation.map((item) => (
                            <option key={item.EducationName} value={item.EducationName}>
                                {item.EducationName}
                            </option>
                        ))}
                    </select>
                    {errors.EducationName && <span className="error">{errors.EducationName.message}</span>}
                </div>

                <div className="form-group">
                    <label>Loại công việc</label>
                    <select {...register("JobTypeName")}>
                        <option value="">-- Chọn loại công việc --</option>
                        {dataJobType.map((item) => (
                            <option key={item.JobTypeName} value={item.JobTypeName}>
                                {item.JobTypeName}
                            </option>
                        ))}
                    </select>
                    {errors.JobTypeName && <span className="error">{errors.JobTypeName.message}</span>}
                </div>

                <div className="city-tag-group">
                    <div className="form-group">
                        <label>Thành phố</label>
                        <Select
                            mode="multiple"
                            onChange={(value) => setValue("City", value)}
                            style={{ width: '100%' }}
                            placeholder="Chọn thành phố"
                        >
                            {cities.map((city) => (
                                <Option key={city._id} value={city._id}>
                                    {city.CityName}
                                </Option>
                            ))}
                        </Select>
                        {errors.City && <span className="error">{errors.City.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Ngôn ngữ (tags)</label>
                        <Select
                            mode="multiple"
                            onChange={(value) => setValue("Tags", value)}
                            style={{ width: '100%' }}
                            placeholder="Chọn ngôn ngữ"
                        >
                            {tags.map((tag) => (
                                <Option key={tag._id} value={tag._id}>
                                    {tag.TagsName}
                                </Option>
                            ))}
                        </Select>
                        {errors.Tags && <span className="error">{errors.Tags.message}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label>Ngày hết hạn</label>
                    <input type="date" {...register("expirationDate")} />
                    {errors.expirationDate && <span className="error">{errors.expirationDate.message}</span>}
                </div>

                <div className="form-group job-status-group">
                    <label>Trạng thái công việc</label>
                    <div className="status-options">
                        <label className="status-option">
                            <input
                                type="radio"
                                value={true}
                                {...register("Active", { required: true })}
                            />
                            Đang mở
                        </label>
                        <label className="status-option">
                            <input
                                type="radio"
                                value={false}
                                {...register("Active", { required: true })}
                            />
                            Đã đóng
                        </label>
                    </div>
                    {errors.Active && <span className="error">Vui lòng chọn trạng thái</span>}
                </div>

                <TinyEditor
                    label="Thông tin chi tiết"
                    name="Detail"
                    icon={AiOutlineFileText}
                    onChange={(value) => setValue("Detail", value)}
                />
                {errors.Detail && <span className="error">{errors.Detail.message}</span>}

                <TinyEditor
                    label="Yêu cầu công việc"
                    name="Requirements"
                    icon={AiOutlinePushpin}
                    onChange={(value) => setValue("Requirements", value)}
                />
                {errors.Requirements && <span className="error">{errors.Requirements.message}</span>}

                <button type="submit" className="submit-btn">Thêm công việc</button>
            </form>
        </div>
    );
};

export default CreateJob;
